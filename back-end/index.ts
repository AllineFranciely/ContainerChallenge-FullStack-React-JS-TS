import express, { NextFunction, Request, Response } from 'express';
import statusCodes from './statusCodes';
import 'express-async-errors';
import ContainersRoutes from './routes/containers.routes';
import MovimentacoesRoutes from './routes/movimentacoes.routes';
import cors from 'cors';
const allowedOrigins = ['http://localhost:3000'];
const corsOption = {
  origin: allowedOrigins,
};

const app = express();

app.use(express.json());
app.use(cors(corsOption));

const PORT = 8000;

app.get('/', (_req: Request, res:Response) => {
  res.status(statusCodes.OK).send('Back-end rodando')
});

app.use(ContainersRoutes);
app.use(MovimentacoesRoutes);

app.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
  const { name, message, details } = err as any;
  console.log(`name:${name}`);

  switch(name) {
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
