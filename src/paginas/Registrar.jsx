import {useState} from 'react'
import { Link } from "react-router-dom"
import { Alerta } from '../components/Alerta'
import clienteAxios from '../config/axios';


export const Registrar = () => {

  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repetirPassword, setRepetirPassword] = useState('')

  const [alerta, setAlerta] = useState({});


  const handleSubmit = async(e) => {
    e.preventDefault();

    if([nombre, email, password, repetirPassword].includes('')) {
      setAlerta({ msg: 'Hay campos vacios', error: true })
      return;
    }

    if(password !== repetirPassword) {
      setAlerta({ msg: 'los password no son iguales', error: true })
      return;
    }

    if(password.length < 6) {
      setAlerta({ msg: 'el password es menor a 6', error: true })
      return;
    }

    setAlerta({})

    // Crear el usuario en la api
    try {
      const url = `/veterinarios`
      await clienteAxios.post(url, { nombre, email, password })

      setAlerta({
        msg: 'Cuenta creada correctamente, revisa tu correo',
        error: false
      })
      
    } catch (error) {
      const {msg} = error.response.data;
      setAlerta({
        msg,
        error: true
      })
      console.log(error.response)
    }

  }

  const {msg} = alerta;

  return (
    <>
      <div>
          <h1 className="text-indigo-600 font-black text-5xl">Crea tu Cuenta y Administra {""}
            <span className="text-black">tus Pacientes</span>
          </h1>
      </div>

      <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>

        {msg && <Alerta 
          alerta={alerta}
        />}
        <form
          onSubmit={handleSubmit}
        >
          <div className="my-5">
            <label 
                className="uppercase text-gray-600 block font-bold text-xl"
            >
              Nombre
            </label>
            <input 
              type="text"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              placeholder="Tu nombre"
              value={nombre}
              onChange={ e => setNombre(e.target.value) }
            />
          </div>

          <div className="my-5">
            <label 
                className="uppercase text-gray-600 block font-bold text-xl"
            >
              Email
            </label>
            <input 
              type="email"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              placeholder="Email de Registro"
              value={email}
              onChange={ e => setEmail(e.target.value) }
            />
          </div>

          <div className="my-5">
            <label 
                className="uppercase text-gray-600 block font-bold text-xl"
            >
              Password
            </label>
            <input 
              type="password"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              placeholder="Password"
              value={password}
              onChange={ e => setPassword(e.target.value) }
            />
          </div>

          <div className="my-5">
            <label 
                className="uppercase text-gray-600 block font-bold text-xl"
            >
              Repetir Password
            </label>
            <input 
              type="password"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              placeholder="Repetir Password"
              value={repetirPassword}
              onChange={ e => setRepetirPassword(e.target.value) }
            />
          </div>
          <input 
            type="submit" 
            value='Crear Cuenta'
            className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md-w-auto"
          />
        </form>

        <nav className='mt-5 lg:flex lg:justify-between '>
          <Link
              className='block text-center my-5 text-gray-500 hover:text-gray-700'
              to="/">¿Ya tienes cuenta? Login</Link>
        </nav>
      </div>
    </>
  )
}