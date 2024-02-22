import { useContext, useEffect, useState } from 'react'
import { PencilSimple, Trash } from '@phosphor-icons/react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { UserContext } from '../context/UserContext'

export const RecipesDetails = () => {
  const { user } = useContext(UserContext)

  const navigate = useNavigate()

  const [recipe, setRecipe] = useState({
    "id": '',
    "title": '',
    "ingredients": [],
    "preparation": [],
    "author": ''
  })

  let { id } = useParams()
  if (!user) {
    console.log('Não autorizado')
    navigate('/authenticate')
  }

  async function getRecipe() {
    const response = await fetch(`http://localhost:3333/recipes/${id}`, {
            method: 'GET',
            headers: {'Authorization': `Bearer ${user.token}`},
        }).catch((e) => {
            console.log(e)
        })
    
    if (response.status != 200) {
      const data = await response.json()
      alert(data.errors[0].message)
    } else {
      const data = await response.json()
      setRecipe({
        "id": data.recipe.id,
        "title": data.recipe.title,
        "ingredients": data.recipe.ingredients.split(', '),
        "preparation": data.recipe.preparation.split(', '),
        "author": data.recipe.user,
        "image": data.recipe.photoUrl 
      })
    }
  }

  useEffect(() => {
    getRecipe()
  }, [])

  return (
    <>
    <img className='w-full h-80 object-cover' src={`http://localhost:3333/uploads/${recipe.image}`} />
    <div className='w-full flex justify-center'>
      <h1 className='bg-orange-200 px-4 py-2 -translate-y-6 font-bold text-3xl'>{recipe.title}</h1>
    </div>
    <h2 className='p-2 text-xl font-semibold'>Ingredientes</h2>
    <ul className='pl-6'>
      {recipe.ingredients.map((item, index) => {
        return <li key={index}>{item}</li>
      })}
    </ul>
    
    
    <h2 className='p-2 text-xl font-semibold'>Modo de Preparação</h2>
    <ol className='pl-6'>
      {recipe.preparation.map((item, index) => {
        return <li key={index}>{item}</li>
      })}
    </ol>
    
    { recipe.author == user.user
    ?
      <div className='flex flex-row pt-5 p-2'>
        <Link to={`/recipeedit/${id}`}>
          <div className='bg-yellow-200 border-2 rounded-sm hover:bg-yellow-500'>
            <PencilSimple size={32} />
          </div>
        </Link>
        <Link to='/'>
          <div className='bg-red-200 border-2 rounded-sm hover:bg-red-500'>
            <Trash size={32} />
          </div>
        </Link>
        
      </div>
    : <></>
    }
    </>
  )
}
