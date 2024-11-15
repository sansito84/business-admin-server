import mysql, { Connection } from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

class Database {
  private connection: Connection;

  constructor() {
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
      } else {
        console.log('Connected to the database');
      }
    });
    
  }

  public getConnection(): Connection {
    return this.connection;
  }
}

export default new Database();
