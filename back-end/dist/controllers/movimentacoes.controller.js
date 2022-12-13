"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const movimentacoes_service_1 = __importDefault(require("../services/movimentacoes.service"));
const statusCodes_1 = __importDefault(require("../statusCodes"));
class MovimentacoesController {
    constructor(movimentacoesService = new movimentacoes_service_1.default()) {
        this.movimentacoesService = movimentacoesService;
        this.getAll = (_req, res) => __awaiter(this, void 0, void 0, function* () {
            const movimentacoes = yield this.movimentacoesService.getAll();
            res.status(statusCodes_1.default.OK).json(movimentacoes);
        });
        this.getById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id, 10);
            const movimentacao = yield this.movimentacoesService.getById(id);
            if (!movimentacao) {
                return res.status(statusCodes_1.default.NOT_FOUND)
                    .json({ message: 'Movimentação não encontrada!' });
            }
            res.status(statusCodes_1.default.OK).json(movimentacao);
        });
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const movimentacao = req.body;
            const movimentacaoCreated = yield this.movimentacoesService.create(movimentacao);
            res.status(statusCodes_1.default.CREATED).json(movimentacaoCreated);
        });
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            const movimentacao = req.body;
            yield this.movimentacoesService.update(id, movimentacao);
            res.status(statusCodes_1.default.NO_CONTENT).end();
        });
        this.remove = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            yield this.movimentacoesService.remove(id);
            res.status(statusCodes_1.default.NO_CONTENT).end();
        });
    }
}
exports.default = MovimentacoesController;
