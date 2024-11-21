import mysql, { Connection } from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

class Database {
  private connection!: Connection;
  private isConnected: boolean = false; // Bandera para controlar el estado de la conexión

  constructor() {
    this.connect();
  }

  private connect() {
    this.connection = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
    });

    this.connection.connect((err) => {
      if (err) {
        console.error('Error al conectar a la base de datos:', err.message);
        console.error('Reintentando en 2 segundos...');
        this.isConnected = false;
        setTimeout(() => this.connect(), 2000); // Reintentar conexión
      } else {
        console.log('Conectado a la base de datos');
        this.isConnected = true;
      }
    });

    this.connection.on('error', (err) => {
      console.error('Error en la conexión:', err);
      this.isConnected = false; // Actualizar bandera de estado
      if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        console.log('Conexión perdida. Reintentando...');
        this.connect(); // Reconectar automáticamente
      } else {
        throw err;
      }
    });
  }

  public query(sql: string, values?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!this.isConnected) {
        console.log('Reconexión necesaria antes de ejecutar la consulta...');
        this.connect();
      }

      this.connection.query(sql, values, (err, results) => {
        if (err) {
          console.error('Error en la consulta:', err);
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }

  public getConnection(): Connection {
    if (!this.isConnected) {
      console.log('Reconexión necesaria antes de devolver la conexión...');
      this.connect();
    }
    return this.connection;
  }
}

export default new Database();
