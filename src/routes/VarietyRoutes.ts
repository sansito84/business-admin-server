import { Router } from "express";
import VarietyController from "../controllers/VarietyController";

const router = Router();

router.get('/varieties', VarietyController.getVarieties);
router.get('/varieties/:id', VarietyController.getVarietyById);
router.post('/varieties', VarietyController.createVariety);
router.put('/varieties/:id', VarietyController.updateVariety);
router.delete('/varieties/:id', VarietyController.deleteVariety);

export default router;