import ProductService from '@/services/Product.service';
import { NextFunction, Request, Response } from 'express';

class ProductController {
  private productService: ProductService;

  constructor() {
    this.productService = new ProductService();
  }

  /**
   * GET /products - Liste tous les produits
   */
  public list = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const products = await this.productService.list();

      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  };

  /**
   * POST /products - Ajoute un produit
   */
  public create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const productData = req.body;
      const newProduct = await this.productService.create(productData);

      res.status(201).json(newProduct);
    } catch (error) {
      next(error);
    }
  };

  /**
   * PUT /products/:id - Met à jour un produit
   */
  public update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const productData = req.body;
      const updatedProduct = await this.productService.update(id, productData);

      res.status(200).json(updatedProduct);
    } catch (error) {
      next(error);
    }
  };

  /**
   * DELETE /products/:id - Supprime un produit
   */
  public delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      await this.productService.delete(id);

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}

export default ProductController;
