import { Router } from 'express';
import ProductController from '../controllers/ProductController';


const router = Router();

router.get('/', ProductController.getProducts);
router.get('/all', ProductController.getAllProducts);  // Obtener todos los productos con sus variedades y proveedores asociados
router.get('/:id', ProductController.getProductById);
router.post('/', ProductController.createProduct);
router.put('/:id', ProductController.updateProduct);
router.delete('/:id', ProductController.deleteProduct);

export default router;
