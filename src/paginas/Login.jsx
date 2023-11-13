import {Link, useNavigate} from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { useState } from 'react'
import { Alerta } from '../components/Alerta'
import clienteAxios from '../config/axios'

export const Login = () => {

    const {setAuth} = useAuth()

    const [email, setemail] = useState('');
    const [password, setPassword] = useState('');
    const [alerta, setAlerta] = useState({});

    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();

        if([email, password].includes('')) {
            setAlerta({
                msg: 'todos los campos son obligatorios',
                error: true
            })
            return;
        }

        if(password.length < 6) {
            setAlerta({
                msg: 'contraseña debe de contener mas de 6 caracteres',
                error: true
            })
            return;
        }

        setAlerta({})

        // iniciar el usuario
        try {
            const url = '/veterinarios/login';
            const {data} = await clienteAxios.post(url, {email, password});
            localStorage.setItem('token', data.token)
            setAuth(data)

            setAlerta({
                msg: 'inicio de seccion exitosa',
                error: false
            })
            
            navigate('/admin')
        } catch (error) {
            const {msg} = error.response.data;
            setAlerta({
                msg,
                error: true
            })
            // console.log(error.response.data);
        }
    }

    const {msg} = alerta;


  return (
    <>
    
        <div>
            <h1 className="text-indigo-600 font-black text-5xl">Inicia Seccion y Administra tus <span className="text-black">Pacientes</span></h1>
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
                        Email
                    </label>
                    <input 
                        type="email"
                        className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                        placeholder="Email de Registro"
                        value={email}
                        onChange={ e => setemail(e.target.value) }
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
                        placeholder="password"
                        value={password}
                        onChange={ e => setPassword(e.target.value) }
                    />
                </div>

                <input 
                    type="submit" 
                    value='Iniciar Sesion'
                    className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md-w-auto"

                />
            </form>
            <nav className='mt-5 lg:flex lg:justify-between '>
                <Link
                    className='block text-center my-5 text-gray-500 hover:text-gray-700'
                    to="/registrar">¿no tienes cuenta? Registrate</Link>
                <Link
                    className='block text-center my-5 text-gray-500 hover:text-gray-700'
                    to="/olvide-password">Olvide mi password</Link>
            </nav>
        </div>

    </>
  )
}
