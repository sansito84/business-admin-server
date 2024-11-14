import { Request, Response } from 'express';
import db from '../config/db';
import { ResultSetHeader } from 'mysql2';

class VarietyController {
  // Obtener todas las variedades
  public async getVarieties(req: Request, res: Response): Promise<void> {
    db.getConnection().query('SELECT * FROM varieties', (err, results) => {
      if (err) {
        res.status(500).json({ error: 'Error al obtener variedades' });
      } else {
        res.json(results);
      }
    });
  }

  // Obtener variedad por ID
  public async getVarietyById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    db.getConnection().query('SELECT * FROM varieties WHERE id = ?', [id], (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Error al obtener la variedad' });
      } else {
        res.json(result);
      }
    });
  }

  // Crear nueva variedad
  public async createVariety(req: Request, res: Response): Promise<void> {
    const { product_id, variety_name, stock_quantity } = req.body;
    db.getConnection().query(
      'INSERT INTO varieties (product_id, variety_name, stock_quantity) VALUES (?, ?, ?)',
      [product_id, variety_name, stock_quantity],
      (err, result) => {
        if (err) {
          res.status(500).json({ error: 'Error al crear la variedad' });
        } else {
            const insertResult = result as ResultSetHeader;
          res.json({ id: insertResult.insertId });
        }
      }
    );
  }

  // Actualizar variedad
  public async updateVariety(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { product_id, variety_name, stock_quantity } = req.body;
    db.getConnection().query(
      'UPDATE varieties SET product_id = ?, variety_name = ?, stock_quantity = ? WHERE id = ?',
      [product_id, variety_name, stock_quantity, id],
      (err) => {
        if (err) {
          res.status(500).json({ error: 'Error al actualizar la variedad' });
        } else {
          res.json({ message: 'Variedad actualizada' });
        }
      }
    );
  }

  // Eliminar variedad
  public async deleteVariety(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    db.getConnection().query('DELETE FROM varieties WHERE id = ?', [id], (err) => {
      if (err) {
        res.status(500).json({ error: 'Error al eliminar la variedad' });
      } else {
        res.json({ message: 'Variedad eliminada' });
      }
    });
  }
  
}

export default new VarietyController();
