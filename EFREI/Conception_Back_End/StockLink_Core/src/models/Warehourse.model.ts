import PostgreDatabase from '@/config/postgre';

class WarehouseModel {
  private postgreConfig: PostgreDatabase;

  constructor() {
    this.postgreConfig = PostgreDatabase.getInstance();
  }

  public async findAll(): Promise<any[]> {
    try {
      const result = await this.postgreConfig.query('SELECT * FROM warehouses');
      return result.rows;
    } catch (error) {
      throw new Error('Erreur lors de la récupération des entrepôts');
    }
  }

  public async create(warehouseData: { name: string; location: string }): Promise<any> {
    try {
      const result = await this.postgreConfig.query('INSERT INTO warehouses (name, location) VALUES ($1, $2) RETURNING *', [
        warehouseData.name,
        warehouseData.location,
      ]);
      return result.rows[0];
    } catch (error) {
      throw new Error("Erreur lors de la création de l'entrepôt");
    }
  }
}

export default WarehouseModel;
