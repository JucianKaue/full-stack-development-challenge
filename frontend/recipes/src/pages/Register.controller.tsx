import { Link, useNavigate } from 'react-router-dom'
import { FormEvent, useState } from 'react'

export function Register() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const response = await fetch('http://localhost:3333/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "username": name,
                "email": email,
                "password": password,
            })
        }).catch((e) => {
            console.log(e)
        })

        if (response) {
            if (response.status != 201) {
                const data = await response.json()
                alert(data.errors[0].message)
            } else {
                navigate('/login')
            }
        }
    }

  return (
    <div className='flex h-screen justify-center items-center'>
        <form className='bg-slate-400 p-10 rounded -translate-y-10' onSubmit={handleSubmit}>
            <h2 className='pb-10 text-center text-2xl font-bold'>Criar uma conta</h2>
            <div className='p-1'> 
                <input className='sm:w-72' type="text" placeholder='Nome' onChange={(e) => {setName(e.target.value)}} />
            </div>
            <div className='p-1'>
                <input className='sm:w-72' type="email" placeholder='Email' onChange={(e) => {setEmail(e.target.value)}}/>
            </div>
            <div className='p-1'>
                <input className='sm:w-72' type="password" placeholder='Senha' onChange={(e) => {setPassword(e.target.value)}}/>
            </div>

            <div className='justify-center flex'>
                <button className='mt-5 py-3 px-5  bg-lime-300 rounded-xl'>Sign In</button>
            </div>
           
            
            <Link to={'/login'}><p className='text-violet-900'>Já tenho uma conta</p></Link> 
            
        </form>
    </div>
  )
}

export default Register