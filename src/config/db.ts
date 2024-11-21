import mysql, { Connection } from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

class Database {
  private connection!: Connection;
  private isConnected: boolean = false; // Bandera para el estado de conexión

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
        setTimeout(() => this.connect(), 2000); // Intentar reconectar
      } else {
        console.log('Conectado a la base de datos');
        this.isConnected = true;
      }
    });

    this.connection.on('error', (err) => {
      console.error('Error en la conexión:', err);
      this.isConnected = false;

      if (err.code === 'PROTOCOL_CONNECTION_LOST' || err.code === 'ECONNRESET') {
        console.log('Conexión perdida. Intentando reconectar...');
        this.connect(); // Reconexión automática
      } else if (err.fatal) {
        console.log('Error fatal en la conexión. Reconectando...');
        this.connect();
      } else {
        throw err; // Lanza el error si no es manejable
      }
    });
  }

  public query(sql: string, values?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const attemptQuery = () => {
        if (!this.isConnected) {
          console.log('Conexión no disponible. Reintentando consulta...');
          this.connect();
          setTimeout(attemptQuery, 2000); // Reintenta después de 2 segundos
          return;
        }

        this.connection.query(sql, values, (err, results) => {
          if (err) {
            console.error('Error en la consulta:', err.message);

            if (
              err.code === 'PROTOCOL_CONNECTION_LOST' ||
              err.code === 'ECONNRESET' ||
              err.code === 'ECONNREFUSED'
            ) {
              console.log('Error de conexión. Intentando reconectar...');
              this.connect();
              setTimeout(attemptQuery, 2000); // Reintenta la consulta
            } else {
              reject(err); // Rechaza la consulta si hay un error diferente
            }
          } else {
            resolve(results); // Retorna los resultados si todo está bien
          }
        });
      };

      attemptQuery(); // Ejecuta la consulta inicial
    });
  }

  public getConnection(): Connection {
    if (!this.isConnected) {
      console.log('La conexión no está disponible. Reconectando...');
      this.connect();
    }
    return this.connection;
  }
}

export default new Database();
