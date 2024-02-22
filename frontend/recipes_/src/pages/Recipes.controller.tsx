import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

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

export function Recipes() {
  const [recipes, setRecipes] = useState<Recipe[]>(new Array())
  const navigate = useNavigate();

  const params = new URLSearchParams(useLocation().search)
  const title = params.get('title')
  if (title) {
    title.toString()
  }

  async function loadRecipes() {
    const response = await fetch('http://localhost:3333/recipes', {
      method: 'GET'
    }).catch((e) => {
      console.log(e)
    })

    if (response) {
      const data = await response.json()

      let recipesArray = new Array()
      data.recipes.map((item: Object) => {
        recipesArray.push(item)
      })
      setRecipes(recipesArray)
    }
  }

  useEffect(() => {
    loadRecipes()
  }, [])

  console.log(recipes)

  const listItems = recipes.map((item) => {
    return (
      <div className="bg-white w-52 m-3">
        <p className='p-2 text-center font-semibold m-3' key={item.id}>{item.title}</p>
        <img className="px-3" src="https://img.freepik.com/fotos-gratis/estilo-de-vida-beleza-e-moda-conceito-de-emocoes-de-pessoas-jovem-gerente-de-escritorio-feminino-asiatico-ceo-com-expressao-satisfeita-em-pe-sobre-um-fundo-branco-sorrindo-com-os-bracos-cruzados-sobre-o-peito_1258-59329.jpg?w=996&t=st=1707857917~exp=1707858517~hmac=8eabe97e0a380b3bed21634cc4e4a61fc0572b7cc1a4a6323c8e7c7339056989" alt="" />
        <button className='p-2 bg-slate-600 rounded-2xl m-3' onClick={() => navigate(`/recipes/${item.id}`)}> Detalhes </button>
      </div>
    )
  })

  return (
    <div className='bg-slate-300 h-screen'>
      <form  className='flex py-5 justify-center '>
        <input type="text" placeholder='Pesquisar' className='w-10/12 p-3'/>
        <button type="submit" className='bg-green-500 p-3'>Pesquisar</button>
      </form>
      <div className='flex justify-around items-start w-full flex-wrap'>
        {listItems}
      </div>
    </div>
  )
}

export default Recipes