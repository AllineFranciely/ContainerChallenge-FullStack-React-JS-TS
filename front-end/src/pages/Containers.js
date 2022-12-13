import React, { useState } from 'react';
import { useAsyncValue, useNavigate } from 'react-router-dom';
import TableContainers from '../components/ContainerTable';

function Containers() {
  const navigate = useNavigate();

  const [state, setState] = useState({
    cliente: '',
    numero: 11,
    tipo: 20,
    situacao: 'Cheio',
    categoria: 'Importação',
  });
  const { cliente, numero, tipo, situacao, categoria } = state;

  const handleChange = ({ target }) => {
    const { name } = target;
    let { value } = target;

    setState((prevState) => ({
      ...prevState,
      [name]: useAsyncValue,
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const obj = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(state)
    };
    const data = await fetch('http://localhost:8000/container', obj);
    return data;
  }
  return (
    <div>
      <p>Cadastrar novo Container</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="cliente"
          value={cliente}
          onChange={handleChange}
          placeholder="Cliente"
        />
        <input
          type="text"
          name="numero"
          value={numero}
          onChange={handleChange}
          placeholder="Número do container"
        />
        <select
        name="tipo"
        value={tipo}
        onChange={handleChange}>

        </select>
      </form>
      <TableContainers />
    </div>
  );
}

export default Containers;
