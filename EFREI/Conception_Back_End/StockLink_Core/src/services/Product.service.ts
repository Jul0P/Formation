import ProductModel from '@/models/Product.model';
import { IProduct } from '@/types/product.types';

class ProductService {
  private productModel: ProductModel;

  constructor() {
    this.productModel = new ProductModel();
  }

  public async list(): Promise<IProduct[]> {
    try {
      const products = await this.productModel.findAll();
      return products;
    } catch (error) {
      throw new Error('Erreur lors de la récupération des produits');
    }
  }

  public async getById(id: string): Promise<IProduct | null> {
    try {
      const product = await this.productModel.findById(id);
      return product;
    } catch (error) {
      throw new Error('Erreur lors de la récupération du produit');
    }
  }

  public async create(productData: IProduct): Promise<IProduct> {
    try {
      const newProduct = await this.productModel.create(productData);
      return newProduct;
    } catch (error) {
      throw new Error('Erreur lors de la création du produit');
    }
  }

  public async update(id: string, productData: IProduct): Promise<IProduct> {
    try {
      const updatedProduct = await this.productModel.update(id, productData);
      return updatedProduct;
    } catch (error) {
      throw new Error('Erreur lors de la mise à jour du produit');
    }
  }

  public async delete(id: string): Promise<void> {
    try {
      await this.productModel.delete(id);
    } catch (error) {
      throw new Error('Erreur lors de la suppression du produit');
    }
  }
}

export default ProductService;
