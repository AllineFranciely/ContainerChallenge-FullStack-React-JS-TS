import { Router } from 'express';
import ContainersController from '../controllers/containers.controller';

const router = Router();

const containersController = new ContainersController();

router.get('/containers', containersController.getAll);
router.get('/containers/:id', containersController.getById);
router.post('/containers', containersController.create);
router.put('/containers/:id', containersController.update);
router.delete('/containers/:id', containersController.remove);

export default router;
