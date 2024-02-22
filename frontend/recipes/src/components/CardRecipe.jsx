import React from 'react'
import { Link } from 'react-router-dom'


export const CardRecipe = (props) => {
    const { title, imageUrl, id } = props

    let imagePath = `http://localhost:3333/uploads/${imageUrl}`

  return (
    <li className='w-52 h-52 bg-orange-200 m-4'>
        <img className='h-32 w-52 object-cover' src={imagePath} alt="" />
        <p className='text-center p-1 font-medium pb-5'>{title}</p>
        <Link className='bg-white px-3 py-1 hover:text-orange-500 font-medium' to={`/recipes/${id}`} >Detalhes</Link>
    </li>
  )
}
