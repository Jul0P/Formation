import type { MediaItem, TMDBResponse } from './types';
import { fetchPopularMovies, fetchPopularTV, fetchTrendingAll, fetchMoviesByGenre, searchContent } from './services/api';
import { populateSection, populateTop10, updateHeroBanner, loadFallbackContent } from './utils/dom';
import { getImageUrl, truncateText, getYear } from './utils/helpers';

const $ = (id: string) => document.getElementById(id);

let currentMedia: MediaItem | null = null;
let isSearchActive: boolean = false;
let isProfileMenuActive: boolean = false;
let searchTimeout: number | null = null;

let currentSearchQuery: string = '';
let currentSearchPage: number = 1;
let totalSearchPages: number = 1;

async function loadContent(): Promise<void> {
    try {
        const trending = await fetchTrendingAll();
        
        if (trending?.results?.[0]) {
            updateHeroBanner(trending.results[0], (media) => currentMedia = media);
        }

        if (trending?.results) {
            populateSection('trending-row', trending.results.slice(1, 11));
        }
        
        const popularTV = await fetchPopularTV();
        if (popularTV?.results) {
            populateSection('originals-row', popularTV.results.slice(0, 10));
            populateTop10('top10-container', popularTV.results.slice(0, 10));
        }
        
        loadSecondaryContent();

    } catch (error) {
        console.error('Erreur lors du chargement :', error);
        loadFallbackContent();
    }
}

async function loadSecondaryContent(): Promise<void> {
    setTimeout(async () => {
        try {
            const popularMovies = await fetchPopularMovies();
            
            if (popularMovies?.results) {
                populateSection('movies-row', popularMovies.results.slice(0, 10));
                populateSection('continue-row', popularMovies.results.slice(10, 20));
            }
            
            loadTertiaryContent();
        } catch (error) {
            console.warn('Erreur phase 2:', error);
        }
    }, 100);
}

async function loadTertiaryContent(): Promise<void> {
    setTimeout(async () => {
        try {
            const [action, comedies, horror, documentaries] = await Promise.all([
                fetchMoviesByGenre(28), // Action
                fetchMoviesByGenre(35), // Comédie
                fetchMoviesByGenre(27), // Horreur
                fetchMoviesByGenre(99)  // Documentaire
            ]);

            action?.results && populateSection('action-row', action.results.slice(0, 10));
            comedies?.results && populateSection('comedies-row', comedies.results.slice(0, 10));
            horror?.results && populateSection('horror-row', horror.results.slice(0, 10));
            documentaries?.results && populateSection('documentaries-row', documentaries.results.slice(0, 10));
        } catch (error) {
            console.warn('Erreur phase 3:', error);
        }
    }, 200);
}

function updateActiveNavLink(): void {
    const sections = [
        { id: 'hero-section', href: '#' },
        { id: 'series', href: '#series' },
        { id: 'films', href: '#films' },
        { id: 'top10', href: '#top10' },
        { id: 'genres', href: '#genres' },
        { id: 'ma-liste', href: '#ma-liste' }
    ];
    
    let activeSection = '#';
    
    if (window.scrollY < 100) {
        activeSection = '#';
    } else {
        for (const section of sections.slice(1)) {
            const element = $(section.id);
            if (element) {
                const rect = element.getBoundingClientRect();
                const navbarHeight = 80;
                
                if (rect.top <= navbarHeight + 50 && rect.bottom > navbarHeight) {
                    activeSection = section.href;
                }
            }
        }
    }
    
    const navLinks = document.querySelectorAll('.navbar-menu a, .mobile-navbar-menu a');
    navLinks.forEach((link: Element) => {
        const linkElement = link as HTMLElement;
        const href = linkElement.getAttribute('href');
        
        if (href === activeSection) {
            linkElement.classList.add('active');
        } else {
            linkElement.classList.remove('active');
        }
    });
}

function setupNavbar(): void {
    window.addEventListener('scroll', () => {
        const navbar: HTMLElement | null = $('navbar');
        if (navbar) {
            if (window.scrollY > 68) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
        
        updateActiveNavLink();
    });

    const mobileToggle = $('mobile-toggle');
    const mobileMenu = $('mobile-menu');
    
    if (mobileToggle && mobileMenu) {
        mobileToggle.addEventListener('click', () => {
            const navbar: HTMLElement | null = $('navbar');
            const isOpen = mobileMenu.classList.contains('active');
            
            mobileMenu.classList.toggle('active');
            
            mobileToggle.setAttribute('aria-expanded', (!isOpen).toString());
            mobileToggle.setAttribute('aria-label', !isOpen ? 'Fermer le menu de navigation' : 'Ouvrir le menu de navigation');
            mobileMenu.setAttribute('aria-hidden', isOpen.toString());
            
            const icon = mobileToggle.querySelector('i');
            if (icon && navbar) {
                if (!isOpen) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                    navbar.classList.add('menu-active');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                    navbar.classList.remove('menu-active');
                }
            }
        });
        
        const mobileNavLinks: NodeListOf<HTMLElement> = document.querySelectorAll('.mobile-navbar-menu a');
        mobileNavLinks.forEach((link, index) => {
            link.addEventListener('click', (e: Event) => {
                e.preventDefault();
                const href = link.getAttribute('href');
                
                mobileMenu.classList.remove('active');
                const icon = mobileToggle.querySelector('i');
                const navbar: HTMLElement | null = $('navbar');
                if (icon && navbar) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                    navbar.classList.remove('menu-active');
                }
                
                if (href === '#') {
                    goToHome();
                    
                    document.querySelectorAll('.navbar-menu a').forEach(l => {
                        l.classList.remove('active');
                    });
                    const homeMainLink = document.querySelector('.navbar-menu a[href="#"]:first-child');
                    if (homeMainLink) {
                        homeMainLink.classList.add('active');
                    }
                } else if (href) {
                    hideSearchPage();
                    closeSearch();
                    
                    const targetSection = document.querySelector(href);
                    if (targetSection) {
                        targetSection.scrollIntoView({ 
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                    
                    document.querySelectorAll('.navbar-menu a').forEach(l => {
                        l.classList.remove('active');
                    });
                    const correspondingMainLink = document.querySelectorAll('.navbar-menu a')[index + 1];
                    if (correspondingMainLink) {
                        correspondingMainLink.classList.add('active');
                    }
                }
            });
        });
        }
    
    const searchIcon = $('search-icon');
    const searchInput = $('search-input') as HTMLInputElement;
    
    if (searchIcon) {
        searchIcon.addEventListener('click', () => {

            toggleSearch();
        });
        }
    
    if (searchInput) {
        searchInput.addEventListener('input', handleSearchInput);
    }
    
    const profileContainer = $('profile-container');
    
    if (profileContainer) {
        profileContainer.addEventListener('click', toggleProfileMenu);
    }
    
    const logoLink: HTMLElement | null = document.querySelector('.logo');
    const homeLink: HTMLElement | null = document.querySelector('.navbar-menu a[href="#"]:first-child');
    
    if (logoLink) {
        logoLink.addEventListener('click', (e: Event) => {
            e.preventDefault();
            goToHome();
        });
    }
    
    if (homeLink) {
        homeLink.addEventListener('click', (e: Event) => {
            e.preventDefault();
            goToHome();
            
            document.querySelectorAll('.navbar-menu a').forEach(link => {
                link.classList.remove('active');
            });
            homeLink.classList.add('active');
        });
    }

    document.addEventListener('click', (e: Event) => {
        const searchContainer: HTMLElement | null = document.querySelector('.search-container');
        if (profileContainer && !profileContainer.contains(e.target as Node)) {
            closeProfileMenu();
        }
        if (searchContainer && !searchContainer.contains(e.target as Node)) {
            closeSearch();
        }
        
        if (mobileMenu && mobileToggle && 
            !mobileMenu.contains(e.target as Node) && 
            !mobileToggle.contains(e.target as Node)) {
            mobileMenu.classList.remove('active');
            const navbar: HTMLElement | null = $('navbar');
            if (navbar) {
                navbar.classList.remove('menu-active');
            }
            const icon = mobileToggle.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
}

function toggleSearch(): void {
    const searchInput: HTMLInputElement | null = $('search-input') as HTMLInputElement;
    
    isSearchActive = !isSearchActive;
    
    if (isSearchActive) {
        if (searchInput) {
            searchInput.classList.add('active');
            setTimeout(() => {
                searchInput.focus();
            }, 300);
        }
    } else {
        if (searchInput) {
            searchInput.classList.remove('active');
            searchInput.value = '';
        }
        hideSearchPage();
    }
}

function closeSearch(): void {
    if (isSearchActive) {
        isSearchActive = false;
        toggleSearch();
    }
}

function toggleProfileMenu(): void {
    const profileMenu: HTMLElement | null = $('profile-menu');
    isProfileMenuActive = !isProfileMenuActive;
    
    if (profileMenu) {
        if (isProfileMenuActive) {
            profileMenu.classList.add('active');
        } else {
            profileMenu.classList.remove('active');
        }
    }
}

function closeProfileMenu(): void {
    if (isProfileMenuActive) {
        toggleProfileMenu();
    }
}

function closeMobileMenu(): void {
    const mobileMenu: HTMLElement | null = $('mobile-menu');
    const mobileToggle: HTMLElement | null = $('mobile-toggle');
    const navbar: HTMLElement | null = $('navbar');
    
    if (mobileMenu) {
        mobileMenu.classList.remove('active');
    }
    
    if (navbar) {
        navbar.classList.remove('menu-active');
    }
    
    if (mobileToggle) {
        const icon = mobileToggle.querySelector('i');
        if (icon) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    }
}

async function handleSearchInput(e: Event): Promise<void> {
    const target = e.target as HTMLInputElement;
    const query: string = target.value.trim();
    
    if (searchTimeout) {
        clearTimeout(searchTimeout);
    }
    
    if (query.length > 0) {
        showSearchPage(query);
        
        if (query.length >= 2) {
            searchTimeout = window.setTimeout(async () => {
                await performSearch(query);
            }, 300);
        }
    } else {
        hideSearchPage();
    }
}

async function performSearch(query: string, page: number = 1): Promise<void> {
    try {
        const results: TMDBResponse<MediaItem> | null = await searchContent(query, page);
        
        if (results?.results && results.results.length > 0) {
            currentSearchQuery = query;
            currentSearchPage = page;
            totalSearchPages = results.total_pages || 1;
            
            displaySearchPageResults(results.results, query);
            updatePagination();
        } else {
            showNoResults(query);
        }
    } catch (error) {
        console.error('Erreur lors de la recherche:', error);
        showNoResults(query);
    }
}

function selectSearchResult(item: MediaItem): void {
    closeSearch();
    openModal(item);
}

function goToHome(): void {
    hideSearchPage();
    
    closeSearch();
    
    closeMobileMenu();
    
    closeModal();
    
    window.scrollTo({ 
        top: 0, 
        behavior: 'smooth' 
    });
}

function showSearchPage(query: string): void {
    const searchPage: HTMLElement | null = $('search-page');
    const mainContent: HTMLElement | null = $('main-content');
    const heroSection: HTMLElement | null = document.querySelector('.hero-banner');
    const searchTitle: HTMLElement | null = $('search-page-title');
    const searchSubtitle: HTMLElement | null = $('search-page-subtitle');
    
    if (searchPage && mainContent && heroSection) {
        mainContent.classList.add('hidden');
        heroSection.classList.add('hidden');
        
        searchPage.classList.remove('hidden');
        
        if (searchTitle) searchTitle.textContent = `Résultats pour "${query}"`;
        if (searchSubtitle) searchSubtitle.textContent = `Recherche en cours...`;
    }
}

function hideSearchPage(): void {
    const searchPage: HTMLElement | null = $('search-page');
    const mainContent: HTMLElement | null = $('main-content');
    const heroSection: HTMLElement | null = document.querySelector('.hero-banner');
    const paginationContainer: HTMLElement | null = $('pagination-container');
    
    if (searchPage && mainContent && heroSection) {
        mainContent.classList.remove('hidden');
        heroSection.classList.remove('hidden');
        searchPage.classList.add('hidden');
        
        if (paginationContainer) {
            paginationContainer.style.display = 'none';
        }
        
        currentSearchQuery = '';
        currentSearchPage = 1;
        totalSearchPages = 1;
    }
}



function updatePagination(): void {
    const paginationContainer = $('pagination-container');
    const prevButton = $('prev-page') as HTMLButtonElement;
    const nextButton = $('next-page') as HTMLButtonElement;
    const pageInfo = $('pagination-info');
    
    if (paginationContainer && prevButton && nextButton && pageInfo) {
        if (totalSearchPages > 1) {
            paginationContainer.style.display = 'flex';
            
            pageInfo.textContent = `Page ${currentSearchPage} sur ${totalSearchPages}`;
            
            prevButton.disabled = currentSearchPage <= 1;
            nextButton.disabled = currentSearchPage >= totalSearchPages;
        } else {
            paginationContainer.style.display = 'none';
        }
    }
}

function setupPagination(): void {
    const prevButton = $('prev-page');
    const nextButton = $('next-page');
    
    if (prevButton) {
        prevButton.addEventListener('click', async () => {
            if (currentSearchPage > 1) {
                await performSearch(currentSearchQuery, currentSearchPage - 1);
            }
        });
    }
    
    if (nextButton) {
        nextButton.addEventListener('click', async () => {
            if (currentSearchPage < totalSearchPages) {
                await performSearch(currentSearchQuery, currentSearchPage + 1);
            }
        });
    }
}

function displaySearchPageResults(results: MediaItem[], query: string): void {
    const filteredResults = results.filter(item => 
        item.poster_path && 
        item.poster_path !== null && 
        item.poster_path !== ''
    );
    
    const searchGrid: HTMLElement | null = $('search-results-grid');
    const searchSubtitle: HTMLElement | null = $('search-page-subtitle');
    
    if (searchGrid) {
        if (filteredResults.length > 0) {
            const cardsHtml = filteredResults.map(item => createSearchResultCard(item)).join('');
            searchGrid.innerHTML = cardsHtml;
        } else {
            showNoResults(query);
            return;
        }
    }
    
    if (searchSubtitle && filteredResults.length > 0) {
        searchSubtitle.textContent = `${filteredResults.length} résultat${filteredResults.length > 1 ? 's' : ''} trouvé${filteredResults.length > 1 ? 's' : ''} pour "${query}"`;
    }
}

function showNoResults(query: string): void {
    const searchGrid: HTMLElement | null = $('search-results-grid');
    const searchSubtitle: HTMLElement | null = $('search-page-subtitle');
    
    if (searchGrid) {
        searchGrid.innerHTML = `
            <div class="no-results">
                <div class="no-results-icon">
                    <i class="fas fa-search"></i>
                </div>
                <div class="no-results-title">Aucun résultat trouvé</div>
                <div class="no-results-text">
                    Nous n'avons trouvé aucun résultat pour "${query}". 
                    Essayez avec d'autres mots-clés.
                </div>
            </div>
        `;
    }
    
    if (searchSubtitle) {
        searchSubtitle.textContent = `Aucun résultat pour "${query}"`;
    }
}

function createSearchResultCard(item: MediaItem): string {
    const title: string = item.title || item.name || 'Titre inconnu';
    const year: string = getYear(item.release_date || item.first_air_date);
    const poster: string = getImageUrl(item.backdrop_path || item.poster_path);
    const type: string = item.media_type === 'movie' ? 'Film' : item.media_type === 'tv' ? 'Série' : 'Contenu';
    const overview: string = truncateText(item.overview, 120);
    
    return `
        <div class="search-result-card" onclick="openModal(${JSON.stringify(item).replace(/"/g, '&quot;')})">
            <img src="${poster}" alt="${title}" class="search-result-image" loading="lazy">
            <div class="search-result-content">
                <h3 class="search-result-title">${title}</h3>
                <div class="search-result-meta">
                    <span class="search-result-type">${type}</span>
                    ${year ? `<span>${year}</span>` : ''}
                </div>
                ${overview ? `<p class="search-result-description">${overview}</p>` : ''}
            </div>
        </div>
    `;
}

(window as any).selectSearchResult = selectSearchResult;

function openModal(media: MediaItem = currentMedia || {} as MediaItem): void {
    if (!media) return;
    
    const overlay: HTMLElement | null = $('modal-overlay');
    const modalImage: HTMLImageElement | null = $('modal-image') as HTMLImageElement;
    const modalTitle: HTMLElement | null = $('modal-title');
    const modalDetails: HTMLElement | null = $('modal-details');
    
    if (modalImage) modalImage.src = getImageUrl(media.backdrop_path, 'original');
    if (modalTitle) modalTitle.textContent = media.title || media.name || '';
    if (modalDetails) {
        modalDetails.innerHTML = `
            <p><strong>Année:</strong> ${getYear(media.release_date || media.first_air_date)}</p>
            <p><strong>Synopsis:</strong> ${media.overview || 'Aucune description disponible.'}</p>
        `;
    }
    
    if (overlay) {
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(): void {
    const overlay: HTMLElement | null = $('modal-overlay');
    if (overlay) {
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    setupNavbar();
    setupPagination();
    setupCarousels();
    await loadContent();
    
    document.addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
});

function setupCarousels(): void {
    const carousels = document.querySelectorAll('.carousel-container');
    
    carousels.forEach((carousel) => {
        const leftButton = carousel.querySelector('.carousel-button-left') as HTMLElement;
        const rightButton = carousel.querySelector('.carousel-button-right') as HTMLElement;
        const cardsRow = carousel.querySelector('.cards-row') as HTMLElement;
        
        if (!leftButton || !rightButton || !cardsRow) return;
        
        leftButton.addEventListener('click', () => scrollCarousel(cardsRow, 'left'));
        rightButton.addEventListener('click', () => scrollCarousel(cardsRow, 'right'));
        
        updateCarouselButtons(carousel as HTMLElement, cardsRow);
        
        const observer = new MutationObserver(() => {
            updateCarouselButtons(carousel as HTMLElement, cardsRow);
        });
        
        observer.observe(cardsRow, { childList: true });
    });
}

function scrollCarousel(cardsRow: HTMLElement, direction: 'left' | 'right'): void {
    const cardWidth = 280;
    const gap = 16;
    const scrollAmount = (cardWidth + gap) * 6;
    
    const currentTransform = getTranslateX(cardsRow);
    let newTransform: number;
    
    if (direction === 'left') {
        newTransform = Math.min(0, currentTransform + scrollAmount);
    } else {
        const maxScroll = getMaxScroll(cardsRow);
        newTransform = Math.max(maxScroll, currentTransform - scrollAmount);
    }
    
    cardsRow.style.transform = `translateX(${newTransform}px)`;
    
    setTimeout(() => {
        const carousel = cardsRow.closest('.carousel-container') as HTMLElement;
        updateCarouselButtons(carousel, cardsRow);
    }, 100);
}

function getTranslateX(element: HTMLElement): number {
    const transform = window.getComputedStyle(element).transform;
    if (transform === 'none') return 0;
    
    const matrix = new DOMMatrixReadOnly(transform);
    return matrix.m41;
}

function getMaxScroll(cardsRow: HTMLElement): number {
    const container = cardsRow.parentElement;
    if (!container) return 0;
    
    const containerWidth = container.offsetWidth - 120;
    const rowWidth = cardsRow.scrollWidth;
    
    return Math.min(0, containerWidth - rowWidth);
}

function updateCarouselButtons(carousel: HTMLElement, cardsRow: HTMLElement): void {
    const leftButton = carousel.querySelector('.carousel-button-left') as HTMLButtonElement;
    const rightButton = carousel.querySelector('.carousel-button-right') as HTMLButtonElement;
    
    if (!leftButton || !rightButton) return;
    
    const currentTransform = getTranslateX(cardsRow);
    const maxScroll = getMaxScroll(cardsRow);
    
    leftButton.disabled = currentTransform >= -10;
    
    rightButton.disabled = currentTransform <= maxScroll + 10;
}

declare global {
    interface Window {
        openModal: (media?: MediaItem) => void;
        closeModal: () => void;
        goToHome: () => void;
        closeMobileMenu: () => void;
    }
}

window.openModal = openModal;
window.closeModal = closeModal;
window.goToHome = goToHome;
window.closeMobileMenu = closeMobileMenu;