import PostgreDatabase from '@/config/postgre';
import { IProduct } from '@/types/product.types';

class ProductModel {
  private postgreConfig: PostgreDatabase;

  constructor() {
    this.postgreConfig = PostgreDatabase.getInstance();
  }

  public async findAll(): Promise<IProduct[]> {
    try {
      const products = await this.postgreConfig.query('SELECT * FROM products');
      return products.rows;
    } catch (error) {
      throw new Error('Erreur lors de la récupération des produits');
    }
  }

  public async findById(id: string): Promise<IProduct | null> {
    try {
      const product = await this.postgreConfig.query('SELECT * FROM products WHERE id = $1', [id]);
      return product.rows[0] || null;
    } catch (error) {
      throw new Error('Erreur lors de la récupération du produit');
    }
  }

  public async create(productData: IProduct): Promise<IProduct> {
    try {
      const result = await this.postgreConfig.query(
        'INSERT INTO products (name, reference, quantity, warehouse_id) VALUES ($1, $2, $3, $4) RETURNING *',
        [productData.name, productData.reference, productData.quantity, productData.warehouse_id],
      );
      return result.rows[0];
    } catch (error) {
      throw new Error('Erreur lors de la création du produit');
    }
  }

  public async update(id: string, productData: IProduct): Promise<IProduct> {
    try {
      const result = await this.postgreConfig.query(
        'UPDATE products SET name = $1, reference = $2, quantity = $3, warehouse_id = $4 WHERE id = $5 RETURNING *',
        [productData.name, productData.reference, productData.quantity, productData.warehouse_id, id],
      );
      return result.rows[0];
    } catch (error) {
      throw new Error('Erreur lors de la mise à jour du produit');
    }
  }

  public async delete(id: string): Promise<void> {
    try {
      await this.postgreConfig.query('DELETE FROM products WHERE id = $1', [id]);
    } catch (error) {
      throw new Error('Erreur lors de la suppression du produit');
    }
  }
}

export default ProductModel;
