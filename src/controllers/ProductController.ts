import { Request, Response } from 'express';
import db from '../config/db';
import { ResultSetHeader } from 'mysql2';
import { Product } from '../models/Products';

class ProductController {
  // Obtener todos los productos
  public async getProducts(req: Request, res: Response): Promise<void> {
    db.getConnection().query('SELECT * FROM products WHERE enable = 1 ORDER BY name', (err, results) => {
      if (err) {
        res.status(500).json({ error: 'Error al obtener productos' });
      } else {
        res.json(results);
      }
    });
  }

  // Obtener producto por ID
  public async getProductById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    db.getConnection().query('SELECT * FROM products WHERE id = ?', [id], (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Error al obtener el producto' });
      } else {
        res.json(result);
      }
    });
  }

  // Crear nuevo producto
  public async createProduct(req: Request, res: Response): Promise<void> {
    const { provider_id, name, price, description } = req.body;
    db.getConnection().query(
      'INSERT INTO products (provider_id, name, price, description) VALUES (?, ?, ?, ?)',
      [provider_id, name, price, description],
      (err, result) => {
        if (err) {
          res.status(500).json({ error: 'Error al crear el producto' });
        } else {
          const insertResult = result as ResultSetHeader;
          res.json({ id: insertResult.insertId });
        }
      }
    );
  }

  // Actualizar producto
  public async updateProduct(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { provider_id, name, price, description } = req.body;
    db.getConnection().query(
      'UPDATE products SET provider_id = ?, name = ?, price = ?, description = ? WHERE id = ?',
      [provider_id, name, price, description, id],
      (err, result) => {
        if (err) {
          res.status(500).json({ error: 'Error al actualizar el producto' });
        } else {
          res.json({ message: 'Producto actualizado' });
        }
      }
    );
  }

  // Eliminar producto
  public async deleteProduct(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    db.getConnection().query('UPDATE products SET enable = 0 WHERE id = ? AND enable = 1;', [id], (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Error al eliminar el producto' });
      } else {
        res.json({ message: 'Producto eliminado' });
      }
    });
  }

  public async getAllProducts(req: Request, res: Response): Promise<void> {
    db.getConnection().query(
      `SELECT p.id, p.name, v.variety_name as variety, pr.name as provider 
      FROM products p
      LEFT JOIN varieties v ON p.id = v.product_id
      LEFT JOIN providers pr ON p.provider_id = pr.id`,
      (err, result) => {
        if (err) {
          res.status(500).json({ error: 'Error al obtener productos' });
        } else {
          res.json(result);
        }
      }
    );
  }


}

export default new ProductController();
