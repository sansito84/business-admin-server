import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import ProductRoutes from "./routes/ProductRoutes";
import dotenv from 'dotenv';
import ProviderRoutes from './routes/ProviderRoutes';
import VarietyRoutes from './routes/VarietyRoutes';

dotenv.config();


class Server {
  public app: express.Application;
  private port: string;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || '5000';

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  routes() {
    this.app.use('/api/products', ProductRoutes);
    this.app.use('/api/providers', ProviderRoutes);
    this.app.use('/api/varieties', VarietyRoutes);
    // Aquí agregarás las rutas para proveedores y variedades
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en el puerto ${this.port}`);
    });
  }
}

const server = new Server();
server.listen();
