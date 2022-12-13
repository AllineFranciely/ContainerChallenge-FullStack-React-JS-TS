import { Request, Response } from 'express';
import ContainersService from '../services/containers.service';
import statusCodes from '../statusCodes';

class ContainersController {
  constructor(private containersService = new ContainersService()) { }

  public getAll = async (_req: Request, res: Response) => {
    const containers = await this.containersService.getAll();
    res.status(statusCodes.OK).json(containers);
  }

  public getById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const container = await this.containersService.getById(id);

    if(!container) {
      return res.status(statusCodes.NOT_FOUND)
      .json({ message: 'Containers não encontrado!' });
    }

    res.status(statusCodes.OK).json(container);
  }

  public create = async (req: Request, res: Response) => {
    const container = req.body;

    const containerCreated = await this.containersService.create(container);
    res.status(statusCodes.CREATED).json(containerCreated);
  }

  public update = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const container = req.body;
    await this.containersService.update(id, container);

    res.status(statusCodes.NO_CONTENT).end();
  }

  public remove = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    await this.containersService.remove(id);

    res.status(statusCodes.NO_CONTENT).end();
  }
}

export default ContainersController;
