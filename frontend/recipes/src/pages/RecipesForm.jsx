import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import { Trash } from '@phosphor-icons/react'

export const RecipesForm = (props) => {
  let { id } = useParams()
  let { typeForm } = props

  const { user } = useContext(UserContext)
  console.log(user.token)

  const [title, setTitle] = useState('')
  const [file, setFile] = useState()
  const [ingredientsForm, setIngredientsForm] = useState('')
  const [preparationForm, setPreparationForm] = useState('')

  const [ingredient, setIngredient] = useState('')
  const [step, setStep] = useState('')

  const [ingredients, setIngredients] = useState([])
  const [preparation, setPreparation] = useState([])

  async function loadRecipe() {
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
      setTitle(data.recipe.title)
      setIngredients(data.recipe.ingredients.split(', '))
      setPreparation(data.recipe.preparation.split(', '))
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setIngredientsForm(ingredients.join(', '))
    setPreparationForm(preparation.join(', '))
    if (typeForm == 'create') {
      let data = new FormData()
      data.append('title', title)
      data.append('ingredients', ingredientsForm)
      data.append('preparation', preparationForm)
      data.append('photo', file)
      
      let request = new XMLHttpRequest()
      request.open("POST", 'http://localhost:3333/recipes')
      request.withCredentials = true
      request.setRequestHeader('Authorization', `Bearer ${user.token}`)
      let response = request.send(data)

      if (response) {
        if (response.status != 201) {
          const data = await response.json()
          console.log(  data)
          alert(data.errors[0].message)
        } else {
          setTitle('')
          setStep('')
          setIngredient('')
          setIngredients([])
          setPreparation([])
          setFile()
          alert('Receita criada com sucesso')
        }
      }
    } else if (typeForm == 'edit') {

    }
  }

  function handleIngredients(e) {
    e.preventDefault()
    setIngredients(ingredients => [...ingredients, ingredient])
    setIngredient('')
  }

  function handlePreparation(e) {
    e.preventDefault()
    setPreparation(preparation => [...preparation, step])
    setStep('')
  }

  function ListIngredients() {
    const listItems = ingredients.map((item, index) => {
      return <li className='flex flex-row justify-between' key={index}>{item}<Trash className='bg-red-400 ml-2 mt-1 hover:bg-red-600 cursor-pointer' onClick={(e) => {ingredients.splice(index, 1)}} size={20} /></li>
    })
    return <ul>{listItems}</ul>
  }

  function ListPreparation() {
    const listItems = preparation.map((item, index) => {
      return <li className='flex flex-row justify-between' key={index}>{item}<Trash className='bg-red-400 ml-2 mt-1 hover:bg-red-600 cursor-pointer' onClick={(e) => {preparation.splice(index, 1)}} size={20} /></li>
    })
    return <ul>{listItems}</ul>
  }

  if (typeForm == 'edit') {
    useEffect(() => {
      loadRecipe()
    }, [])
  }

  return (
    <>
      <h1 className='text-center text-2xl font-bold'>{typeForm == 'edit' ? 'Editar Receitas' : 'Criar Receita'}</h1>
      <div className='grid pt-24 place-items-center'>
        <form className='bg-orange-50 justify-center w-96 p-4' onSubmit={handleSubmit}>
          <div className='flex flex-col pb-4'>
            <label className='font-semibold'>Titulo da Receita</label>
            <input type="text" value={title} onChange={(e) => {setTitle(e.target.value)}} />
          </div>
          <div className='flex flex-col pb-4'>
            <label className='font-semibold'>Ingredientes</label>
            <div className='flex flex-col'>
              <div className='bg-red-500'>
                <input className='w-11/12' type="text" value={ingredient} onChange={(e) => setIngredient(e.target.value)}/>
                <button className='w-1/12 bg-green-500' onClick={handleIngredients}>add</button>
              </div>
            </div>
            <ListIngredients/>
          </div>
          <div className='flex flex-col pb-4'>
            <label className='font-semibold'>Preparação</label>
            <div className='flex flex-col'>
              <div className='bg-red-500'>
                <input className='w-11/12' type="text" value={step} onChange={(e) => setStep(e.target.value)} />
                <button className='w-1/12 bg-green-500' onClick={handlePreparation}>add</button>
              </div>
            </div>
            <ListPreparation/>
          </div>
          <div>
            <input className='pb-4' type="file" src="" alt="" onChange={(e) => {setFile(e.target.files[0])}}/>
          </div>
          <div>
            <button type="submit">Enviar</button>
          </div>
        </form>
      </div>
    </>
  )
}
