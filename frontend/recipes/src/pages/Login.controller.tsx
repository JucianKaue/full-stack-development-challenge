import { Link, useNavigate } from 'react-router-dom'
import { FormEvent, useState } from 'react'

export function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const response = await fetch('http://localhost:3333/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": email,
                "password": password,
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
                console.log(data)
                localStorage.setItem('token', data.token.token)
                localStorage.setItem('user', data.user.id)
                
                navigate('/recipes')
            }
        }
    }


  return (
    <div className='flex h-screen justify-center items-center'>
        <form className='bg-slate-400 p-10 rounded -translate-y-10' onSubmit={handleSubmit}>
            <h2 className='pb-10 text-center text-2xl font-bold'>Login</h2>
            <div className='p-1'>
                <input placeholder='Email' type="email" onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className='p-1'>
                <input placeholder='Senha' type="password" onChange={(e) => {setPassword(e.target.value)}}/>
            </div>

            <div className='justify-center flex'>
                <button className='mt-5 py-3 px-5  bg-lime-300 rounded-xl'>Sign In</button>
            </div>

            <Link to={'/register'}><p className='text-violet-900'>Criar uma conta</p></Link>
        </form>
    </div>
  )
}