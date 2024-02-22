import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'

export const Auth = () => {
    const [typeForm, setTypeForm] = useState('login')

    const { user, setUser } = useContext(UserContext)

    const navigate = useNavigate()

    const [loginEmail, setLoginEmail] = useState('')
    const [loginPassword, setLoginPassword] = useState('')

    const [registerName, setRegisterName] = useState('')
    const [registerEmail, setRegisterEmail] = useState('')
    const [registerPassword, setRegisterPassword] = useState('')

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:3333/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": loginEmail,
                "password": loginPassword,
            })
        }).catch((e) => {
            console.log(e)
        })

        if (response) {
            if (response.status != 200) {
                const data = await response.json()
                alert(data.errors[0].message)
            } else {
                const data = await response.json()
                
                localStorage.setItem('user', data.user.id)
                localStorage.setItem('token', data.token.token)
                setUser({
                    "user": data.user.id,
                    "token": data.token.token
                })
                
                navigate('/recipes')
            }
        }
    }

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:3333/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "username": registerName,
                "email": registerEmail,
                "password": registerPassword,
            })
        }).catch((e) => {
            console.log(e)
        })

        if (response) {
            if (response.status != 201) {
                const data = await response.json()
                alert(data.errors[0].message)
            } else {
                alert('Usuário criado com sucesso')
                setLoginEmail('')
                setLoginPassword('')
                setTypeForm('login')
            }
        }
    }


    if (typeForm === 'login') {
        return (
            <>
                <div className=' bg-slate-100 grid h-screen place-items-center'>
                    <div className='bg-slate-500 w-96 h-max pt-4 rounded-tr-2xl rounded-bl-2xl'>
                        <h2 className='text-center font-bold from-neutral-600 text-xl'>Login</h2>
                        <form className=' px-4 flex flex-col' onSubmit={handleLoginSubmit}>
                            <div className='w-full flex flex-col py-4'>
                                <label >Email</label>
                                <input className='h-8' type="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)}/>
                            </div>
                            <div className='w-full flex flex-col'>
                                <label >Senha</label>
                                <input className='h-8' type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)}/>
                            </div>
                            <div className='w-full grid place-content-center'>
                                <button className="bg-emerald-500 font-bold my-8 py-2 px-6 rounded-xl hover:bg-green-500" type="submit">Entrar</button>
                            </div>
                        </form>
                        <div className='flex flex-row justify-around'>
                            <button className='border-l-2 border-t-2 w-1/2 text-center p-2 font-semibold bg-green-500' onClick={() => {setTypeForm('login')}}>Login</button>
                            <button className='border-l-2 border-t-2 w-1/2 text-center p-2 font-semibold' onClick={() => {setTypeForm('register')}}>Criar Conta</button>
                        </div>
                    </div>
                </div>
            </>
        )
    } else if (typeForm === 'register') {
        return (
            <>
                <div className=' bg-slate-100 grid h-screen place-items-center'>
                    <div className='bg-slate-500 w-96 h-max pt-4 rounded-tr-2xl rounded-bl-2xl'>
                        <h2 className='text-center font-bold from-neutral-600 text-xl'>Criar uma conta</h2>
                        <form className='px-4 flex flex-col' onSubmit={handleRegisterSubmit}>
                            <div className='w-full flex flex-col py-4'>
                                <label >Nome</label>
                                <input className='h-8' type="text" value={registerName} onChange={(e) => {setRegisterName(e.target.value)}}/>
                            </div>
                            <div className='w-full flex flex-col pb-4'>
                                <label >Email</label>
                                <input className='h-8' type="email" value={registerEmail} onChange={(e) => {setRegisterEmail(e.target.value)}}/>
                            </div>
                            <div className='w-full flex flex-col'>
                                <label >Senha</label>
                                <input className='h-8' type="password" value={registerPassword} onChange={(e) => {setRegisterPassword(e.target.value)}}/>
                            </div>
                            <div className='w-full grid place-content-center'>
                                <button className="bg-emerald-500 font-bold my-8 py-2 px-6 rounded-xl hover:bg-green-500" type="submit">Criar Usuário</button>
                            </div>
                        </form>
                        <div className='flex flex-row justify-around'>
                            <button className='border-l-2 border-t-2 w-1/2 text-center p-2 font-semibold' onClick={() => {setTypeForm('login')}}>Login</button>
                            <button className='border-l-2 border-t-2 w-1/2 text-center p-2 font-semibold bg-green-500 ' onClick={() => {setTypeForm('register')}}>Criar Conta</button>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
