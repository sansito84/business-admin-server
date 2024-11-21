import mysql, { Connection } from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

class Database {
  private connection!: Connection;

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
        console.error('Error connecting to the database:', err.message);
        console.error('Full error details:', err);
        console.error('Reintentando en 2 segundos...');
        setTimeout(() => this.connect(), 2000); 
      } else {
        console.log('Connected to the database');
      }
    });

    this.connection.on('error', (err) => {
      console.error('Database error:', err);
      if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        console.log('Conexión perdida. Reintentando...');
        this.connect(); // Reconectar automáticamente
      } else {
        throw err;
      }
    });    
  }

  public getConnection(): Connection {
    return this.connection;
  }
}

export default new Database();
