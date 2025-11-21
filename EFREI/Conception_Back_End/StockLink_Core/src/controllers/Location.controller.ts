import LocationService from '@/services/Location.service';
import { NextFunction, Request, Response } from 'express';

class LocationController {
  private locationService: LocationService;

  constructor() {
    this.locationService = new LocationService();
  }

  /**
   * GET /locations/:binCode/exists - Vérifie si un bac existe (bins)
   */
  public checkExistence = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { binCode } = req.params;
      const exists = await this.locationService.checkExistence(binCode);

      res.status(200).json({ exists });
    } catch (error) {
      next(error);
    }
  };
}

export default LocationController;
