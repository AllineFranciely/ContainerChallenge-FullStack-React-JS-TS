export const getContainers = async () => {
  try {
    const response = await fetch('http://localhost:8000/containers');
    const data = response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export const getMovimentacoes = async () => {
  try {
    const response = await fetch('http://localhost:8000/movimentacoes');
    const data = response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
