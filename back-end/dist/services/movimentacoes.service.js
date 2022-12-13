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
const connection_1 = __importDefault(require("../models/connection"));
const movimentacoes_models_1 = __importDefault(require("../models/movimentacoes.models"));
const restify_errors_1 = require("restify-errors");
const properties = ['tipo', 'dataInicio', 'dataFim', 'container'];
class MovimentacoesService {
    constructor() {
        this.model = new movimentacoes_models_1.default(connection_1.default);
    }
    static validateProperties(movimentacao) {
        for (let i = 0; i < properties.length; i += 1) {
            if (!Object.prototype.hasOwnProperty.call(movimentacao, properties[i])) {
                return [false, properties[i]];
            }
        }
        return [true, null];
    }
    static validateValues(movimentacao) {
        const entries = Object.entries(movimentacao);
        for (let i = 0; i < entries.length; i += 1) {
            const [property, value] = entries[i];
            if (!value) {
                return [false, property];
            }
        }
        return [true, null];
    }
    static validateMovimentacao(movimentacao) {
        let [valid, property] = MovimentacoesService.validateProperties(movimentacao);
        if (!valid) {
            return `O campo ${property} é obrigatório!`;
        }
        [valid, property] = MovimentacoesService.validateValues(movimentacao);
        if (!valid) {
            return `O campo ${property} não pode ser nulo ou vazio!`;
        }
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const movimentacoes = yield this.model.getAll();
            return movimentacoes;
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const movimentacao = yield this.model.getById(id);
            return movimentacao;
        });
    }
    create(movimentacao) {
        const isValidMovimentacao = MovimentacoesService.validateMovimentacao(movimentacao);
        if (typeof isValidMovimentacao === 'string') {
            throw new restify_errors_1.BadRequestError(isValidMovimentacao);
        }
        return this.model.create(movimentacao);
    }
    update(id, movimentacao) {
        return __awaiter(this, void 0, void 0, function* () {
            const isValidMovimentacao = MovimentacoesService.validateMovimentacao(movimentacao);
            if (typeof isValidMovimentacao === 'string') {
                throw new restify_errors_1.BadRequestError(isValidMovimentacao);
            }
            const movimentacaoFound = yield this.model.getById(id);
            if (!movimentacaoFound) {
                throw new restify_errors_1.NotFoundError('Movimentacao não encontrada!');
            }
            return this.model.update(id, movimentacao);
        });
    }
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const movimentacaoFound = yield this.model.getById(id);
            if (!movimentacaoFound) {
                throw new restify_errors_1.NotFoundError('Movimentacao não encontrada!');
            }
            this.model.remove(id);
        });
    }
}
exports.default = MovimentacoesService;
