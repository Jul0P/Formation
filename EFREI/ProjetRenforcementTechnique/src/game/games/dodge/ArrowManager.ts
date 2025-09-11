import { GameConfig } from "../../../config/GameConfig";
import type { IArrow } from '../../types';

export class ArrowManager {
    private gameArea: HTMLElement;
    private gridElement: HTMLElement;
    private arrows: Map<string, IArrow>;
    private arrowCounter = 0;
    
    private static readonly ARROW_OFFSET = 15;
    private static readonly COLLISION_RANGE = 25;
    private static readonly SPAWN_OFFSET = 50;
    
    constructor(gameArea: HTMLElement, gridElement: HTMLElement) {
        this.gameArea = gameArea;
        this.gridElement = gridElement;
        this.arrows = new Map();
    }
    
    public spawn(lane: number, onHit: (lane: number) => boolean): void {
        const id = `arrow-${++this.arrowCounter}`;
        const fromTop = Math.random() < 0.5;
        
        const arrow = this.createArrowElement(id, fromTop);
        const position = this.calculatePosition(lane, fromTop);
        
        arrow.style.left = `${position.horizontalPosition}px`;
        arrow.style.top = `${position.launchPosition}px`;
        this.gameArea.appendChild(arrow);

        const animation = this.startAnimation(arrow, position.launchPosition, position.destinationPosition, lane, onHit, id);

        this.arrows.set(id, {
            lane,
            element: arrow,
            fromTop,
            stop: animation.stop
        });
    }
    
    private createArrowElement(id: string, fromTop: boolean): HTMLElement {
        const arrow = document.createElement('div');
        arrow.id = id;
        arrow.className = fromTop ? 'arrow-top' : 'arrow-bottom';
        return arrow;
    }
    
    private calculatePosition(lane: number, fromTop: boolean) {
        const cells = this.gridElement.querySelectorAll('.cell');
        const targetCell = cells[lane];
        const cellRect = targetCell.getBoundingClientRect();
        const containerRect = this.gameArea.getBoundingClientRect();

        const horizontalPosition = cellRect.left - containerRect.left + ArrowManager.ARROW_OFFSET;
        const destinationPosition = cellRect.top - containerRect.top + ArrowManager.ARROW_OFFSET;
        const launchPosition = fromTop ? 
            -ArrowManager.SPAWN_OFFSET : 
            containerRect.height + ArrowManager.SPAWN_OFFSET;

        return { horizontalPosition, launchPosition, destinationPosition };
    }
    
    private startAnimation(
        arrow: HTMLElement, 
        launchPosition: number, 
        destinationPosition: number, 
        lane: number, 
        onHit: (lane: number) => boolean,
        id: string
    ) {
        const startTime = Date.now();
        let stopped = false;
        
        const animate = () => {
            if (stopped) return;
            
            const progress = (Date.now() - startTime) / GameConfig.ARROW_SPEED;
            
            if (progress >= 1) {
                this.removeArrow(id);
                return;
            }
            
            const distanceFromTarget = launchPosition + (destinationPosition - launchPosition) * progress;
            arrow.style.top = `${distanceFromTarget}px`;
            
            if (Math.abs(distanceFromTarget - destinationPosition) < ArrowManager.COLLISION_RANGE) {
                if (onHit(lane)) {
                    this.removeArrow(id);
                    return;
                }
            }
            
            requestAnimationFrame(animate);
        };
        
        requestAnimationFrame(animate);
        return { stop: () => stopped = true };
    }
    
    private removeArrow(id: string): void {
        const arrow = this.arrows.get(id);
        if (arrow) {
            arrow.element.remove();
            this.arrows.delete(id);
        }
    }
    
    public clear(): void {
        this.arrows.forEach(arrow => {
            arrow.stop?.();
            arrow.element.remove();
        });
        this.arrows.clear();
    }
}