"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const statusCodes_1 = __importDefault(require("./statusCodes"));
require("express-async-errors");
const containers_routes_1 = __importDefault(require("./routes/containers.routes"));
const movimentacoes_routes_1 = __importDefault(require("./routes/movimentacoes.routes"));
const cors_1 = __importDefault(require("cors"));
const allowedOrigins = ['http://localhost:3000'];
const corsOption = {
    origin: allowedOrigins,
};
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)(corsOption));
const PORT = 8000;
app.get('/', (_req, res) => {
    res.status(statusCodes_1.default.OK).send('Back-end rodando');
});
app.use(containers_routes_1.default);
app.use(movimentacoes_routes_1.default);
app.use((err, _req, res, next) => {
    const { name, message, details } = err;
    console.log(`name:${name}`);
    switch (name) {
        case 'BadRequestError':
            res.status(400).json({ message });
            break;
        case 'ValidationError':
            res.status(400).json({ message: details[0].message });
            break;
        case 'NotFoundError':
            res.status(404).json({ message });
            break;
        case 'ConflictError':
            res.status(409).json({ message });
            break;
        default:
            console.error(err);
            res.sendStatus(500);
    }
    next();
});
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
