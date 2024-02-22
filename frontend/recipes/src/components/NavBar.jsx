import { useContext} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'

export const NavBar = () => {
    const { user, setUser } = useContext(UserContext)
    const navigate = useNavigate()

    const handleLogout = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:3333/logout', {
            method: 'GET',
            headers: {'Authorization': `Bearer ${user.token}`},
        }).catch((e) => {
            console.log(e)
        })

        if (response) {
            if (response.status != 200) {
                const data = await response.json()
                alert(data.errors[0].message)
            } else {
                localStorage.removeItem('user')
                localStorage.removeItem('token')
                setUser()
            }
        }
    }

  return (
    <nav className='flex flex-row justify-between h-16'>
        <p className='my-auto ml-3 text-xl font-bold'>Recipe Spot</p>

        <ul className='flex flex-row justify-around mt-auto mb-auto mr-4'>
            { user
            ?
            <>
                <li className='p-2 w-36 font-semibold'>
                    <Link className='hover:text-green-500' to="/recipescreate">CRIAR RECEITA</Link>
                </li>
            </>
            :
                <></>
            }
            <li className='p-2 w-28 font-semibold'>
                <Link className='hover:text-green-500' to="/recipes">RECEITAS</Link>
            </li>
            <li>
                {user.user != undefined 
                    ? <button className='bg-red-400 p-2 w-28 font-semibold rounded-xl hover:bg-red-600 duration-150' onClick={handleLogout}>Sair</button>
                    : <button className='bg-green-400 p-2 w-28 font-semibold rounded-xl hover:bg-green-600 duration-150' onClick={() => {navigate('/authentication')}}>Logar</button>
                }
            </li>
        </ul>
    </nav>
  )
}
