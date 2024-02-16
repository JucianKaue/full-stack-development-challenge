import { FormEvent, useState } from "react"

interface Recipe {
  "title": string,
  "ingredients": string,
  "preparation": string,
  
}


export const CreateRecipe = () => {
  const [token] = useState<string | null>(localStorage.getItem('token'))
  
  const [title, setTitle] = useState('')
  const [ingredients, setIngredients] = useState('')
  const [preparation, setPreparation] = useState('')
  const [file, setFile] = useState<FileList | null | undefined>()

  const [formData, setFormData] = useState<Recipe>()

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()

    if (typeof file === undefined || typeof file === null) return

    const formData = new FormData();
    formData.append('file', file[0])

    const response = await fetch('http://localhost:3333/recipes', {
      method: 'POST',
      headers: {'Authorization': `Bearer ${token}`},
      body: JSON.stringify({
        "title": title,
        "ingredients": ingredients,
        "preparation": preparation,
        "file": file[0]
      })
    }).catch((e) => {
      console.log(e)
    })
  }

  return (
    <div>
      <h1>Editar receitas</h1>
      <form action="" onSubmit={(e) => {handleSubmit(e)}}>
        <input className="bg-slate-600" type="text" placeholder="Titulo" onChange={(e) => {setTitle(e.target.value)}}/><br />
        <input className="bg-slate-600" type="text" placeholder="Ingredientes" onChange={(e) => {setIngredients(e.target.value)}}/><br />
        <input className="bg-slate-600" type="text" placeholder="Preparação" onChange={(e) => {setPreparation(e.target.value)}}/>
        <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" onChange={(e) => {setFile(e.target.files[0]); console.log(e.target.files)}}></input>
        <button type="submit">Enviar</button>
      </form>
    </div>
  )
}

