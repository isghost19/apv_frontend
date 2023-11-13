import { AdminNav } from "../components/AdminNav"
import { Alerta } from "../components/Alerta";
import { useState } from "react";
import useAuth from "../hooks/useAuth";

export const CambiarPassword = () => {

  const {alerta, setAlerta, guardarPassword} = useAuth();
  const [password, setPassword] = useState({
    pwd_actual: '',
    pwd_nuevo: '',
    pwd_repetir: ''
  })

  const handleSubmit = e => {
    e.preventDefault();

    if( Object.values(password).some(campo => campo === '') ) {
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      })
      return
    }

    if( password.pwd_nuevo.length < 6 ) {
      setAlerta({
        msg: 'Coloca un password que tenga mas de 6 caracteres',
        error: true
      })
      return
    }

    if( password.pwd_nuevo !== password.pwd_repetir ) {
      setAlerta({
        msg: 'Tu password nuevo no coincide',
        error: true
      })
      return
    }
    guardarPassword(password);

    setTimeout(() => {
      setAlerta({})
    }, 4000);
  }

  const {msg} = alerta;

  return (
    <>
        <AdminNav />

        <h2 className="font-black text-3xl text-center mt-10">Cambiar password </h2>
        <p className="text-xl mt-5 mb-10 text-center">Modifica tu {''} <span className="text-indigo-600 font-bold">Password aqui</span></p>

        <div className="flex justify-center">
          <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
            {msg && <Alerta
                alerta={alerta}
            />}

            <form onSubmit={handleSubmit}>
              <div className="my-3">
                <label className="uppercase font-bold text-gray-600">Password actual</label>
                <input 
                    type="password" 
                    className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                    name="pwd_actual"
                    placeholder="escribe tu password actual"
                    onChange={ e => setPassword({
                      ...password,
                      [e.target.name] : e.target.value
                    }) }
                />
              </div>

              <div className="my-3">
                <label className="uppercase font-bold text-gray-600">Password Nuevo</label>
                <input 
                    type="password" 
                    className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                    name="pwd_nuevo"
                    placeholder="escribe tu nuevo password"
                    onChange={ e => setPassword({
                      ...password,
                      [e.target.name] : e.target.value
                    }) }
                />
              </div>

              <div className="my-3">
                <label className="uppercase font-bold text-gray-600">Repite tu nuevo Password</label>
                <input 
                    type="password" 
                    className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                    name="pwd_repetir"
                    placeholder="Repetir password"
                    onChange={ e => setPassword({
                      ...password,
                      [e.target.name] : e.target.value
                    }) }
                />
              </div>

              <input 
                  type="submit" 
                  value="Actualizar password"
                  className="bg-indigo-700 px-10 py-3 font-bold text-white rounded-lg uppercase mt-5 w-full"
              />
            </form>
          </div>
        </div>
    </>
  )
}
