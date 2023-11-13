import { useEffect, useState } from 'react';
import {useParams, Link} from 'react-router-dom'

import { Alerta } from '../components/Alerta';
import clienteAxios from '../config/axios';




export const ConfirmarCuenta = () => {
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false)
  const [cargando, setCargando] = useState(true)
  const [alerta, setAlerta] = useState({})


  const params = useParams();

  const {id} = params

  useEffect(() => {
    const confirmarCuenta = async() => {
      try {
        const url = `${import.meta.env.VITE_BACKEND_URL}/api/veterinarios/confirmar/${id}`
        const {data} = await clienteAxios(url)
        setCuentaConfirmada(true)
        setAlerta({
          msg: data.msg
        })
      } catch (error) {
        const {msg} = error.response.data;
        setAlerta({msg, error: true})
      }

      setCargando(false)

    }
    confirmarCuenta();
  }, [])

  return (
    <>
      <div>
          <h1 className="text-indigo-600 font-black text-5xl">Confirmatu cuenta y empieza administrar {""}
            <span className="text-black">tus Pacientes</span>
          </h1>
      </div>

      <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
        {
          !cargando && 
          <Alerta 
            alerta={alerta}
          /> 
        }
        {
          cuentaConfirmada && (
            <Link
              className='block text-center my-5 text-gray-500 hover:text-gray-700'
              to="/"
            >Iniciar Sesión
            </Link>
          )
        }
      </div>
    </>
  )
}