import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

interface Recipe {
  id: number,
  title: string,
  ingredients: string,
  preparation: string,
  photoId: string,
  user: number,
  createdAt: string,
  updatedAt: string
}


export const RecipeDetails = () => {
  const [token] = useState<string | null>(localStorage.getItem('token'))
  const [recipe, setRecipe] = useState<Recipe | null>()
  const navigate = useNavigate()
  let { id } = useParams()

  async function loadRecipe() {
    const response = await fetch(`http://localhost:3333/recipes/${id}`, {
      method: 'GET',
      headers: {'Authorization': `Bearer ${token}`},
    }).catch((e) => {
      console.log(e)
    })

    if (response) {
      if (response.status == 404) {
        navigate('/recipes')
      } if (response.status == 401) {
        navigate('/login')
      } else {
        const data = await response.json()
        setRecipe(data.recipe)
      }
    } 
  }

  useEffect(() => {
    loadRecipe()
  }, [])

  const ingredients = recipe?.ingredients.split(', ').map((ingredient, index) => {
    return (
      <li key={index} className="list-disc">{ingredient}</li>
    )
  })

  
  const preparation = recipe?.preparation.split(', ').map((step, index) => {
    return <li key={index} className="list-disc">{step}</li>
  })

  return (
    <div>
      <h1 className="text-center font-bold text-2xl">{recipe?.title}</h1>
      <h2 className="ml-1 font-semibold text-xl">Ingredientes</h2>
      <ul className="ml-10">
        {ingredients}
      </ul>
      <h2 className="ml-1 font-semibold text-xl pt-4">Modo de preparo</h2>
      <ul className="ml-10">
        {preparation}
      </ul>

      <button onClick={() => {navigate('/recipes')}}>Voltar</button>
      

    </div>
  )
}
