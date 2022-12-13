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
Object.defineProperty(exports, "__esModule", { value: true });
class MovimentacaoModel {
    constructor(connection) {
        this.connection = connection;
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.connection
                .execute('SELECT * FROM movimentacoes');
            const [rows] = result;
            return rows;
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.connection
                .execute('SELECT * FROM movimentacoes WHERE id=?', [id]);
            const [rows] = result;
            const [movimentacao] = rows;
            return movimentacao;
        });
    }
    create(movimentacao) {
        return __awaiter(this, void 0, void 0, function* () {
            const { tipo, dataInicio, dataFim, container } = movimentacao;
            const result = yield this.connection.execute('INSERT INTO movimentacoes (tipo, dataInicio, dataFim, container) VALUES (?, ?, ?, ?)', [tipo, dataInicio, dataFim, container]);
            const [dataInserted] = result;
            const { insertId } = dataInserted;
            return Object.assign({ id: insertId }, movimentacao);
        });
    }
    update(id, movimentacao) {
        return __awaiter(this, void 0, void 0, function* () {
            const { tipo, dataInicio, dataFim, container } = movimentacao;
            yield this.connection.execute('UPDATE movimentacoes SET tipo=?, dataInicio=?, dataFim=?, container=? WHERE id=?', [tipo, dataInicio, dataFim, container, id]);
        });
    }
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connection.execute('DELETE FROM movimentacoes WHERE id=?', [id]);
        });
    }
}
exports.default = MovimentacaoModel;
