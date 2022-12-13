import { Request, Response } from 'express';
import MovimentacoesService from '../services/movimentacoes.service';
import statusCodes from '../statusCodes';

class MovimentacoesController {
  constructor(private movimentacoesService = new MovimentacoesService()) { }

  public getAll = async (_req: Request, res: Response) => {
    const movimentacoes = await this.movimentacoesService.getAll();
    res.status(statusCodes.OK).json(movimentacoes);
  }

  public getById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const movimentacao = await this.movimentacoesService.getById(id);

    if(!movimentacao) {
      return res.status(statusCodes.NOT_FOUND)
      .json({ message: 'Movimentação não encontrada!' });
    }

    res.status(statusCodes.OK).json(movimentacao);
  }

  public create = async (req: Request, res: Response) => {
    const movimentacao = req.body;

    const movimentacaoCreated = await this.movimentacoesService.create(movimentacao);
    res.status(statusCodes.CREATED).json(movimentacaoCreated);
  }

  public update = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const movimentacao = req.body;
    await this.movimentacoesService.update(id, movimentacao);

    res.status(statusCodes.NO_CONTENT).end();
  }

  public remove = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    await this.movimentacoesService.remove(id);

    res.status(statusCodes.NO_CONTENT).end();
  }
}

export default MovimentacoesController;
