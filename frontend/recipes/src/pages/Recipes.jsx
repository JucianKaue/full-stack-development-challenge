import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import { CardRecipe } from '../components/CardRecipe'

export const Recipes = () => {
  const [ recipes, setRecipes ] = useState([])

  async function getRecipes() {
    const response = await fetch('http://localhost:3333/recipes', {
            method: 'GET',
        }).catch((e) => {
            console.log(e)
        })
    if (response.status != 200) {
      const data = await response.json()
      alert(data.errors[0].message)
    } else {
      const data = await response.json()
      setRecipes(data.recipes)
    }
  }

  console.log(recipes)

  useEffect(() => {
    getRecipes()
  }, [])

  const listRecipes = () => {
    const list = recipes.map((item) => {
      console.log()
      return <CardRecipe key={item.id} id={item.id} title={item.title} imageUrl={item.photoUrl}/>
    })
    return <ul className='flex flex-row justify-around mx-4 mt-16 px-20 flex-wrap'>{list}</ul>
  }

  return (
    <>
      <div className='bg-orange-50'>
        <h1 className='text-center text-2xl font-bold'>Receitas</h1>
        <p className='text-center w-2/4 mx-auto pt-5 font-serif text-lg'>As receitas culinárias são mais do que simples instruções para preparar alimentos; são testemunhas da história, da geografia e das tradições de um povo. Da cozinha camponesa à alta gastronomia, cada prato conta uma história, revelando os segredos dos ingredientes locais e as técnicas transmitidas de geração em geração.</p>

        {listRecipes()}
      </div>
    </>
  )
}
