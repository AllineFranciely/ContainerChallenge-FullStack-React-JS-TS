import { Router } from 'express';
import MovimentacoesController
 from '../controllers/movimentacoes.controller';
const router = Router();

const movimentacoesController = new MovimentacoesController();

router.get('/movimentacoes', movimentacoesController.getAll);
router.get('/movimentacoes/:id', movimentacoesController.getById);
router.post('/movimentacoes', movimentacoesController.create);
router.put('/movimentacoes/:id', movimentacoesController.update);
router.delete('/movimentacoes/:id', movimentacoesController.remove);

export default router;
