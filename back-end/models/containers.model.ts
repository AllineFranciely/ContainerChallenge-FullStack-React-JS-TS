import { Pool, ResultSetHeader } from 'mysql2/promise';
import Container from '../interfaces/container.interface';

export default class ContainerModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getAll(): Promise<Container[]> {
    const result = await this.connection
      .execute('SELECT * FROM containers');
    const [rows] = result;
    return rows as Container[];
  }

  public async getById(id: number): Promise<Container> {
    const result = await this.connection
      .execute('SELECT * FROM containers WHERE id=?', [id]);
    const [rows] = result;
    const [container] = rows as Container[];
    return container;
  }

  public async create(container: Container): Promise<Container> {
    const { cliente, numero, tipo, situacao, categoria } = container;
    const result = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO containers (cliente, numero, tipo, situacao, categoria) VALUES (?, ?, ?, ? ,?)',
      [cliente, numero, tipo, situacao, categoria],
    );

    const [dataInserted] = result;
    const { insertId } = dataInserted;
    return  { id: insertId, ...container };
  }

  public async update(id: number, container: Container) {
    const { cliente, numero, tipo, situacao, categoria } = container;
    await this.connection.execute(
        'UPDATE containers SET cliente=?, numero=?, tipo=?, situacao=?, categoria=? WHERE id=?',
        [cliente, numero, tipo, situacao, categoria, id]
    );
  }

  public async remove(id: number) {
    await this.connection.execute(
      'DELETE FROM containers WHERE id=?',
      [id],
    );
  }
}
