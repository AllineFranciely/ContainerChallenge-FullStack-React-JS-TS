import { Pool, ResultSetHeader } from 'mysql2/promise';
import Movimentacao from '../interfaces/movimentacao.interface';

export default class MovimentacaoModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getAll(): Promise<Movimentacao[]> {
    const result = await this.connection
      .execute('SELECT * FROM movimentacoes');
    const [rows] = result;
    return rows as Movimentacao[];
  }

  public async getById(id: number): Promise<Movimentacao> {
    const result = await this.connection
      .execute('SELECT * FROM movimentacoes WHERE id=?', [id]);
    const [rows] = result;
    const [movimentacao] = rows as Movimentacao[];
    return movimentacao;
  }

  public async create(movimentacao: Movimentacao): Promise<Movimentacao> {
    const { tipo, dataInicio, dataFim, container } = movimentacao;
    const result = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO movimentacoes (tipo, dataInicio, dataFim, container) VALUES (?, ?, ?, ?)',
      [tipo, dataInicio, dataFim, container],
    );

    const [dataInserted] = result;
    const { insertId } = dataInserted;
    return  { id: insertId, ...movimentacao };
  }

  public async update(id: number, movimentacao: Movimentacao) {
    const { tipo, dataInicio, dataFim, container } = movimentacao;
    await this.connection.execute(
        'UPDATE movimentacoes SET tipo=?, dataInicio=?, dataFim=?, container=? WHERE id=?',
        [tipo, dataInicio, dataFim, container, id]
    );
  }

  public async remove(id: number) {
    await this.connection.execute(
      'DELETE FROM movimentacoes WHERE id=?',
      [id],
    );
  }
}
