import { LocationModel } from '@/models/Location.model';
import WarehouseModel from '@/models/Warehourse.model';
import { ILocation } from '@/types/location.types.';
import { IWarehouse } from '@/types/warehouse.types';

class WarehouseService {
  private warehouseModel: WarehouseModel;

  constructor() {
    this.warehouseModel = new WarehouseModel();
  }

  public async list(): Promise<IWarehouse[]> {
    try {
      const warehouses = await this.warehouseModel.findAll();
      return warehouses;
    } catch (error) {
      throw new Error('Erreur lors de la récupération des entrepôts');
    }
  }

  public async create(warehouseData: IWarehouse): Promise<IWarehouse> {
    try {
      const newWarehouse = await this.warehouseModel.create(warehouseData);
      return newWarehouse;
    } catch (error) {
      throw new Error("Erreur lors de la création de l'entrepôt");
    }
  }

  public async listLocations(warehouseId: string): Promise<any> {
    try {
      const locations = await LocationModel.find({ warehouse_id: parseInt(warehouseId) });
      return locations;
    } catch (error) {
      throw new Error("Erreur lors de la récupération des emplacements de l'entrepôt");
    }
  }

  public async addLocation(warehouseId: string, locationData: ILocation): Promise<any> {
    try {
      const location = new LocationModel({
        ...locationData,
        warehouse_id: parseInt(warehouseId),
      });
      const savedLocation = await location.save();
      return savedLocation;
    } catch (error) {
      throw new Error("Erreur lors de l'ajout d'un emplacement à l'entrepôt");
    }
  }

  public async updateLocation(warehouseId: string, locationData: ILocation): Promise<any> {
    try {
      const updatedLocation = await LocationModel.findOneAndUpdate(
        { warehouse_id: parseInt(warehouseId) },
        {
          code: locationData.code,
          layout: locationData.layout,
        },
        { new: true, upsert: false },
      );
      return updatedLocation;
    } catch (error) {
      throw new Error("Erreur lors de la mise à jour de l'emplacement de l'entrepôt");
    }
  }
}

export default WarehouseService;
