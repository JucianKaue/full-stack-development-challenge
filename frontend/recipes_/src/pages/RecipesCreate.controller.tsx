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
  const [file, setFile] = useState<FileList | null>(null)

  const [filebase64,setFileBase64] = useState<string>("")

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()

    return <img src={filebase64} width={300} />
    


  }

  function convertFile(files: FileList|null) {
    if (files) {
      const fileRef = files[0] || ""
      const fileType: string= fileRef.type || ""
      console.log("This file upload is of type:",fileType)
      const reader = new FileReader()
      reader.readAsBinaryString(fileRef)
      reader.onload=(ev: any) => {
        // convert it to base64
        setFileBase64(`data:${fileType};base64,${btoa(ev.target.result)}`)
      }
    }
  }

  return (
    <div>
      <h1>Editar receitas</h1>
      <form action="" onSubmit={(e) => {handleSubmit(e)}}>
        <input className="bg-slate-600" type="text" placeholder="Titulo" onChange={(e) => {setTitle(e.target.value)}}/><br />
        <input className="bg-slate-600" type="text" placeholder="Ingredientes" onChange={(e) => {setIngredients(e.target.value)}}/><br />
        <input className="bg-slate-600" type="text" placeholder="Preparação" onChange={(e) => {setPreparation(e.target.value)}}/>
        <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" onChange={(e) => {convertFile(e.target.files)}}></input>
        <button type="submit">Enviar</button>
      </form>
    </div>
  )
}

