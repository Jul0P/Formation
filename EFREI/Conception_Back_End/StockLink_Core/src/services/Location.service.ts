import { LocationModel } from '@/models/Location.model';

class LocationService {
  public async checkExistence(binCode: string): Promise<boolean> {
    try {
      const parts = binCode.split('-');
      if (parts.length !== 4) {
        throw new Error("Le format attendu n'est pas valide");
      }

      const [aisle, rack, levelString, bin] = parts;
      const level = parseInt(levelString.replace('L', '')); // level n'est pas un format L1 mais un entier

      const location = await LocationModel.findOne({
        'layout.aisle': aisle,
        'layout.racks.rack': rack,
        'layout.racks.levels.level': level,
        'layout.racks.levels.bins': bin,
      });

      return location !== null;
    } catch (error) {
      throw new Error('Erreur lors de la vérification');
    }
  }
}

export default LocationService;
