import WarehouseService from '@/services/Warehourse.service';
import { NextFunction, Request, Response } from 'express';

class WarehouseController {
  private warehouseService: WarehouseService;

  constructor() {
    this.warehouseService = new WarehouseService();
  }

  /**
   * GET /warehouses - Récupère la liste des entrepôts
   */
  public list = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const warehouses = await this.warehouseService.list();
      res.status(200).json(warehouses);
    } catch (error) {
      next(error);
    }
  };

  /**
   * POST /warehouses - Crée un nouvel entrepôt
   */
  public create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const warehouseData = req.body;
      const newWarehouse = await this.warehouseService.create(warehouseData);

      res.status(201).json(newWarehouse);
    } catch (error) {
      next(error);
    }
  };

  /**
   * GET /warehouses/:id/locations - Récupère la structure Mongo d'un entrepôt
   */
  public listLocations = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const locations = await this.warehouseService.listLocations(id);

      res.status(200).json(locations);
    } catch (error) {
      next(error);
    }
  };

  /**
   * POST /warehouses/:id/locations - Crée la structure interne d'un entrepôt
   */
  public addLocation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const locationData = req.body;
      const newLocation = await this.warehouseService.addLocation(id, locationData);

      res.status(201).json(newLocation);
    } catch (error) {
      next(error);
    }
  };

  /**
   * PUT /warehouses/:id/locations - Met à jour la structure interne d'un entrepôt
   */
  public updateLocation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const locationData = req.body;
      const updatedLocation = await this.warehouseService.updateLocation(id, locationData);

      res.status(200).json(updatedLocation);
    } catch (error) {
      next(error);
    }
  };
}

export default WarehouseController;
