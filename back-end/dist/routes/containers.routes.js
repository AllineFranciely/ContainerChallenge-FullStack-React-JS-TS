"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const containers_controller_1 = __importDefault(require("../controllers/containers.controller"));
const router = (0, express_1.Router)();
const containersController = new containers_controller_1.default();
router.get('/containers', containersController.getAll);
router.get('/containers/:id', containersController.getById);
router.post('/containers', containersController.create);
router.put('/containers/:id', containersController.update);
router.delete('/containers/:id', containersController.remove);
exports.default = router;
