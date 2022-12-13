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
const containers_service_1 = __importDefault(require("../services/containers.service"));
const statusCodes_1 = __importDefault(require("../statusCodes"));
class ContainersController {
    constructor(containersService = new containers_service_1.default()) {
        this.containersService = containersService;
        this.getAll = (_req, res) => __awaiter(this, void 0, void 0, function* () {
            const containers = yield this.containersService.getAll();
            res.status(statusCodes_1.default.OK).json(containers);
        });
        this.getById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id, 10);
            const container = yield this.containersService.getById(id);
            if (!container) {
                return res.status(statusCodes_1.default.NOT_FOUND)
                    .json({ message: 'Containers não encontrado!' });
            }
            res.status(statusCodes_1.default.OK).json(container);
        });
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const container = req.body;
            const containerCreated = yield this.containersService.create(container);
            res.status(statusCodes_1.default.CREATED).json(containerCreated);
        });
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            const container = req.body;
            yield this.containersService.update(id, container);
            res.status(statusCodes_1.default.NO_CONTENT).end();
        });
        this.remove = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            yield this.containersService.remove(id);
            res.status(statusCodes_1.default.NO_CONTENT).end();
        });
    }
}
exports.default = ContainersController;
