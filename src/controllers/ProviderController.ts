import { Request, Response } from 'express';
import db from '../config/db';
import { ResultSetHeader } from 'mysql2';

class ProviderController {
    // Obtener todos los proveedores
    public async getProviders(req: Request, res: Response): Promise<void> {
        db.getConnection().query('SELECT * FROM providers', (err, results) => {
            if (err) {
                res.status(500).json({ error: 'Error al obtener proveedores' });
            } else {
                res.json(results);
            }
        });
    }

    // Obtener proveedor por ID
    public async getProviderById(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        db.getConnection().query('SELECT * FROM providers WHERE id = ?', [id], (err, result) => {
            if (err) {
                res.status(500).json({ error: 'Error al obtener el proveedor' });
            } else {
                res.json(result);
            }
        });
    }

    // Crear nuevo proveedor
    public async createProvider(req: Request, res: Response): Promise<void> {
        const { name, contact_info } = req.body;
        db.getConnection().query(
            'INSERT INTO providers (name, contact_info) VALUES (?, ?)',
            [name, contact_info],
            (err, result) => {
                if (err) {
                    res.status(500).json({ error: 'Error al crear el proveedor' });
                } else {
                    const insertResult = result as ResultSetHeader;
                    res.json({ id: insertResult.insertId });
                }
            }
        );
    }

    // Actualizar proveedor
    public async updateProvider(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { name, contact_info } = req.body;
        db.getConnection().query(
            'UPDATE providers SET name = ?, contact_info = ? WHERE id = ?',
            [name, contact_info, id],
            (err) => {
                if (err) {
                    res.status(500).json({ error: 'Error al actualizar el proveedor' });
                } else {
                    res.json({ message: 'Proveedor actualizado' });
                }
            }
        );
    }

    // Eliminar proveedor
    public async deleteProvider(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        db.getConnection().query('DELETE FROM providers WHERE id = ?', [id], (err) => {
            if (err) {
                res.status(500).json({ error: 'Error al eliminar el proveedor' });
            } else {
                res.json({ message: 'Proveedor eliminado' });
            }
        });
    }
}

export default new ProviderController();
