import LocationController from '@/controllers/Location.controller';
import { Router } from 'express';

class LocationRoutes {
  public router: Router;
  private locationController: LocationController;

  constructor() {
    this.router = Router();
    this.locationController = new LocationController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    /**
     * @swagger
     * /locations/{binCode}/exists:
     *   get:
     *    summary: Vérifie l'existence d'un emplacement par son binCode
     *    tags: [Locations]
     *    parameters:
     *      - in: path
     *        name: binCode
     *        required: true
     *        description: Le code de l'emplacement à vérifier
     *        schema:
     *          type: string
     *    responses:
     *     200:
     *      description: Emplacement existe ou non
     *      content:
     *       application/json:
     *        schema:
     *         type: object
     *        properties:
     *         exists:
     *         type: boolean
     *         description: Indique si l'emplacement existe
     *     400:
     *      description: Requête invalide
     *     500:
     *      description: Erreur serveur
     */
    this.router.get('/:binCode/exists', this.locationController.checkExistence);
  }

  public getRouter(): Router {
    return this.router;
  }
}

export default LocationRoutes;
