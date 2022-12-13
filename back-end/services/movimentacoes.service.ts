import connection from '../models/connection';
import MovimentacaoModel from '../models/movimentacoes.models';
import Movimentacao from '../interfaces/movimentacao.interface';
import { BadRequestError, NotFoundError } from 'restify-errors';

const properties = ['tipo', 'dataInicio', 'dataFim', 'container'];

class MovimentacoesService {
  public model: MovimentacaoModel;

  constructor() {
    this.model = new MovimentacaoModel(connection);
  }

  static validateProperties(movimentacao: Movimentacao): [boolean, string | null] {
    for (let i = 0; i < properties.length; i += 1) {
      if (!Object.prototype.hasOwnProperty.call(movimentacao, properties[i])) {
        return [false, properties[i]];
      }
    }
    return [true, null];
  }

  static validateValues(movimentacao: Movimentacao): [boolean, string | null] {
    const entries = Object.entries(movimentacao);
    for (let i = 0; i < entries.length; i += 1) {
      const [property, value] = entries[i];
      if (!value) {
        return [false, property];
      }
    }
    return [true, null];
  }

  static validateMovimentacao(movimentacao: Movimentacao): void | string {
    let [valid, property] = MovimentacoesService.validateProperties(movimentacao);

    if (!valid) {
      return `O campo ${property} é obrigatório!`;
    }
    [valid, property] = MovimentacoesService.validateValues(movimentacao);

    if (!valid) {
      return `O campo ${property} não pode ser nulo ou vazio!`
    }
  }

  public async getAll(): Promise<Movimentacao[]> {
    const movimentacoes = await this.model.getAll();
    return movimentacoes;
  }

  public async getById(id: number): Promise<Movimentacao> {
    const movimentacao = await this.model.getById(id);
    return movimentacao;
  }

  public create(movimentacao: Movimentacao): Promise<Movimentacao> {
    const isValidMovimentacao = MovimentacoesService.validateMovimentacao(movimentacao);

    if (typeof isValidMovimentacao === 'string') {
      throw new BadRequestError(isValidMovimentacao);
    }
    return this.model.create(movimentacao);
  }

  public async update(id: number, movimentacao: Movimentacao): Promise<void> {
    const isValidMovimentacao = MovimentacoesService.validateMovimentacao(movimentacao);

    if (typeof isValidMovimentacao === 'string') {
      throw new BadRequestError(isValidMovimentacao);
    }

    const movimentacaoFound = await this.model.getById(id);

    if(!movimentacaoFound) {
      throw new NotFoundError('Movimentacao não encontrada!');
    }
    return this.model.update(id, movimentacao);
  }

  public async remove(id: number): Promise<void> {
    const movimentacaoFound = await this.model.getById(id);
    
    if(!movimentacaoFound) {
      throw new NotFoundError('Movimentacao não encontrada!');
    }
    this.model.remove(id)
  }
}

export default MovimentacoesService;
