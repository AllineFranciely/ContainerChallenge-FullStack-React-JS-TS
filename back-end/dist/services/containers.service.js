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
const containers_model_1 = __importDefault(require("../models/containers.model"));
const restify_errors_1 = require("restify-errors");
const properties = ['cliente', 'numero', 'tipo', 'situacao', 'categoria'];
class ContainersService {
    constructor() {
        this.model = new containers_model_1.default(connection_1.default);
    }
    static validateProperties(container) {
        for (let i = 0; i < properties.length; i += 1) {
            if (!Object.prototype.hasOwnProperty.call(container, properties[i])) {
                return [false, properties[i]];
            }
        }
        return [true, null];
    }
    static validateValues(container) {
        const entries = Object.entries(container);
        for (let i = 0; i < entries.length; i += 1) {
            const [property, value] = entries[i];
            if (!value) {
                return [false, property];
            }
        }
        return [true, null];
    }
    static validateContainer(container) {
        let [valid, property] = ContainersService.validateProperties(container);
        if (!valid) {
            return `O campo ${property} é obrigatório!`;
        }
        [valid, property] = ContainersService.validateValues(container);
        if (!valid) {
            return `O campo ${property} não pode ser nulo ou vazio!`;
        }
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const containers = yield this.model.getAll();
            return containers;
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const container = yield this.model.getById(id);
            return container;
        });
    }
    create(container) {
        const isValidContainer = ContainersService.validateContainer(container);
        if (typeof isValidContainer === 'string') {
            throw new restify_errors_1.BadRequestError(isValidContainer);
        }
        return this.model.create(container);
    }
    update(id, container) {
        return __awaiter(this, void 0, void 0, function* () {
            const isValidContainer = ContainersService.validateContainer(container);
            if (typeof isValidContainer === 'string') {
                throw new restify_errors_1.BadRequestError(isValidContainer);
            }
            const containerFound = yield this.model.getById(id);
            if (!containerFound) {
                throw new restify_errors_1.NotFoundError('Container não encontrado!');
            }
            return this.model.update(id, container);
        });
    }
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const containerFound = yield this.model.getById(id);
            if (!containerFound) {
                throw new restify_errors_1.NotFoundError('Container não encontrado!');
            }
            this.model.remove(id);
        });
    }
}
exports.default = ContainersService;
