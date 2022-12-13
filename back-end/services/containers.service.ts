import connection from '../models/connection';
import ContainersModel from '../models/containers.model';
import Container from '../interfaces/container.interface';
import { BadRequestError, NotFoundError } from 'restify-errors';

const properties = ['cliente', 'numero', 'tipo', 'situacao', 'categoria'];

class ContainersService {
  public model: ContainersModel;

  constructor() {
    this.model = new ContainersModel(connection);
  }

  static validateProperties(container: Container): [boolean, string | null] {
    for (let i = 0; i < properties.length; i += 1) {
      if (!Object.prototype.hasOwnProperty.call(container, properties[i])) {
        return [false, properties[i]];
      }
    }
    return [true, null];
  }

  static validateValues(container: Container): [boolean, string | null] {
    const entries = Object.entries(container);
    for (let i = 0; i < entries.length; i += 1) {
      const [property, value] = entries[i];
      if (!value) {
        return [false, property];
      }
    }
    return [true, null];
  }

  static validateContainer(container: Container): void | string {
    let [valid, property] = ContainersService.validateProperties(container);

    if (!valid) {
      return `O campo ${property} é obrigatório!`;
    }
    [valid, property] = ContainersService.validateValues(container);

    if (!valid) {
      return `O campo ${property} não pode ser nulo ou vazio!`
    }
  }

  public async getAll(): Promise<Container[]> {
    const containers = await this.model.getAll();
    return containers;
  }

  public async getById(id: number): Promise<Container> {
    const container = await this.model.getById(id);
    return container;
  }

  public create(container: Container): Promise<Container> {
    const isValidContainer = ContainersService.validateContainer(container);

    if (typeof isValidContainer === 'string') {
      throw new BadRequestError(isValidContainer);
    }
    return this.model.create(container);
  }

  public async update(id: number, container: Container): Promise<void> {
    const isValidContainer = ContainersService.validateContainer(container);

    if (typeof isValidContainer === 'string') {
      throw new BadRequestError(isValidContainer);
    }

    const containerFound = await this.model.getById(id);

    if(!containerFound) {
      throw new NotFoundError('Container não encontrado!');
    }
    return this.model.update(id, container);
  }

  public async remove(id: number): Promise<void> {
    const containerFound = await this.model.getById(id);
    
    if(!containerFound) {
      throw new NotFoundError('Container não encontrado!');
    }
    this.model.remove(id)
  }
}

export default ContainersService;
