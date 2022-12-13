"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const movimentacoes_controller_1 = __importDefault(require("../controllers/movimentacoes.controller"));
const router = (0, express_1.Router)();
const movimentacoesController = new movimentacoes_controller_1.default();
router.get('/movimentacoes', movimentacoesController.getAll);
router.get('/movimentacoes/:id', movimentacoesController.getById);
router.post('/movimentacoes', movimentacoesController.create);
router.put('/movimentacoes/:id', movimentacoesController.update);
router.delete('/movimentacoes/:id', movimentacoesController.remove);
exports.default = router;
