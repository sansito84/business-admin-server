import { Router } from "express";
import ProviderController from "../controllers/ProviderController";

const router = Router();

router.get('/providers', ProviderController.getProviders);
router.get('/providers/:id', ProviderController.getProviderById);
router.post('/providers', ProviderController.createProvider);
router.put('/providers/:id', ProviderController.updateProvider);
router.delete('/providers/:id', ProviderController.deleteProvider);

export default router;