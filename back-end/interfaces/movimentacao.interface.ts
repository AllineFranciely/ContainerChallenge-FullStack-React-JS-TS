interface Movimentacao {
  id?: number;
  tipo: string;
  dataInicio: Date;
  dataFim: Date;
  container: number
}

export default Movimentacao;
