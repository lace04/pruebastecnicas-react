import { useState, useEffect } from 'react';

const URL = 'https://parallelum.com.br/fipe/api/v1';

function App() {
  const TIPOS = [
    { codigo: 'carros', nome: 'Carros' },
    { codigo: 'motos', nome: 'Motos' },
    { codigo: 'caminhoes', nome: 'Camiones' },
  ];

  const [tipoVehiculo, setTipoVehiculo] = useState('carros');
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [anio, setAnio] = useState('');
  const [marcas, setMarcas] = useState([]);
  const [modelos, setModelos] = useState([]);
  const [anios, setAnios] = useState([]);
  const [isDisabledTipo, setIsDisabledTipo] = useState(false);
  const [isDisabledMarca, setIsDisabledMarca] = useState(false);
  const [isDisabledModelo, setIsDisabledModelo] = useState(false);
  const [detallesVehiculo, setDetallesVehiculo] = useState(null);
  const [impuesto, setImpuesto] = useState(0);

  useEffect(() => {
    fetch(`${URL}/${tipoVehiculo}/marcas`)
      .then((respuesta) => respuesta.json())
      .then((datos) => setMarcas(datos));
  }, [tipoVehiculo]);

  useEffect(() => {
    if (marca !== '') {
      fetch(`${URL}/${tipoVehiculo}/marcas/${marca}/modelos`)
        .then((respuesta) => respuesta.json())
        .then((datos) => setModelos(datos.modelos));
    }
  }, [tipoVehiculo, marca]);

  useEffect(() => {
    if (modelo !== '') {
      fetch(`${URL}/${tipoVehiculo}/marcas/${marca}/modelos/${modelo}/anos`)
        .then((respuesta) => respuesta.json())
        .then((datos) => setAnios(datos));
    }
  }, [tipoVehiculo, marca, modelo]);

  const handleTipoVehiculo = (event) => {
    setTipoVehiculo(event.target.value);
    setIsDisabledTipo(true);
  };

  const handleMarca = (event) => {
    setMarca(event.target.value);
    setIsDisabledMarca(true);
  };

  const handleModelo = (event) => {
    setModelo(event.target.value);
    setIsDisabledModelo(true);
  };

  const handleAnio = (event) => {
    setAnio(event.target.value);
  };

  const handleReset = () => {
    setTipoVehiculo('carros');
    setMarca('');
    setModelo('');
    setAnio('');
    setModelos([]);
    setAnios([]);
    setIsDisabledTipo(false);
    setIsDisabledMarca(false);
    setIsDisabledModelo(false);
  };

  //mostrar por consola la URL con sus cambios
  useEffect(() => {
    console.log(
      `${URL}/${tipoVehiculo}/marcas/${marca}/modelos/${modelo}/anos/${anio}`
    );
  }, [tipoVehiculo, marca, modelo, anio]);

  //Muestra los datos del vehiculo seleccionado
  useEffect(() => {
    if (anio !== '') {
      fetch(
        `${URL}/${tipoVehiculo}/marcas/${marca}/modelos/${modelo}/anos/${anio}`
      )
        .then((respuesta) => respuesta.json())
        .then((datos) => setDetallesVehiculo(datos));
    }
  }, [tipoVehiculo, marca, modelo, anio]);

  //Calcular el impuesto del vehiculo seleccionado
  useEffect(() => {
    if (anio !== '') {
      fetch(
        `${URL}/${tipoVehiculo}/marcas/${marca}/modelos/${modelo}/anos/${anio}`
      )
        .then((respuesta) => respuesta.json())
        .then((datos) => {
          let impuesto;
          // Elimina el símbolo de la moneda y las comas, y convierte el valor en un número
          const valor = Number(datos.Valor.replace('R$ ', '').replace(',', ''));
          switch (datos.Combustivel) {
            case 'Gasolina':
              impuesto = valor * 0.05; // 5% para vehículos a gasolina
              break;
            case 'Diesel':
              impuesto = valor * 0.025; // 2.5% para vehículos diesel
              break;
            case 'Eléctrico':
              impuesto = valor * 0.01; // 1% para vehículos eléctricos
              break;
            default:
              impuesto = 0; // Si el tipo de combustible no coincide con ninguno de los anteriores
          }

          setImpuesto(impuesto);
        });
    }
  }, [tipoVehiculo, marca, modelo, anio]);

  return (
    <div className='p-10'>
      <h1>Prueba ingreso</h1>

      <button
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        onClick={handleReset}
      >
        Reiniciar
      </button>

      <h2 className='text-2xl'>Tipo de Vehiculo</h2>

      <select
        className='border border-gray-400 rounded-md p-1'
        onChange={handleTipoVehiculo}
        disabled={isDisabledTipo}
      >
        {TIPOS.map((tipo) => (
          <option key={tipo.codigo} value={tipo.codigo}>
            {tipo.nome}
          </option>
        ))}
      </select>

      <h2 className='text-2xl'>Marca</h2>

      <select
        className='border border-gray-400 rounded-md p-1'
        onChange={handleMarca}
        disabled={isDisabledMarca}
      >
        {marcas.map((marca) => (
          <option key={marca.codigo} value={marca.codigo}>
            {marca.nome}
          </option>
        ))}
      </select>

      <h2 className='text-2xl'>Modelos</h2>

      <select
        className='border border-gray-400 rounded-md p-1'
        onChange={handleModelo}
        disabled={isDisabledModelo}
      >
        {modelos.map((modelo) => (
          <option key={modelo.codigo} value={modelo.codigo}>
            {modelo.nome}
          </option>
        ))}
      </select>

      <h2 className='text-2xl'>Años</h2>

      <select
        className='border border-gray-400 rounded-md p-1'
        onChange={handleAnio}
      >
        {anios.map((anio) => (
          <option key={anio.codigo} value={anio.codigo}>
            {anio.codigo}
          </option>
        ))}
      </select>

      {/* Mostrar tarjeta con informacion del vehiculo */}
      {detallesVehiculo && (
        <div className='border border-gray-400 rounded-md p-1'>
          <h2 className='text-2xl'>Informacion del vehiculo</h2>
          <p>
            <strong>Marca: </strong>
            {detallesVehiculo.Marca}
          </p>
          <p>
            <strong>Modelo: </strong>
            {detallesVehiculo.Modelo}
          </p>
          <p>
            <strong>Año: </strong>
            {detallesVehiculo.AnoModelo}
          </p>
          <p>
            <strong>Combustible: </strong>
            {detallesVehiculo.Combustivel}
          </p>
          <p>
            <strong>Valor: </strong>
            {/* detallesVehiculo.Valor convertir de reales a pesos colombianos*/}
            {detallesVehiculo.Valor}
          </p>
          <p>
            <strong>Impuesto: </strong>
            R${impuesto}
          </p>
          <p>
            <strong>Código Fipe: </strong>
            {detallesVehiculo.CodigoFipe}
          </p>
          <p>
            <strong>Mes de referencia: </strong>
            {detallesVehiculo.MesReferencia}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
