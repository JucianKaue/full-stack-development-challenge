export const Header = () => {
  const token = localStorage.getItem('token')
  
  async function handleButton() {
    await fetch(`http://localhost:3333/logout`, {
      method: 'GET',
      headers: {'Authorization': `Bearer ${token}`},
    }).catch((e) => {
      console.log(e)
    })

    localStorage.removeItem('token')
  }

  return (
    <header className='w-100 bg-gray-800 text-center flex flex-row justify-between'>
        <h1 className='text-3xl sm:text-5xl text-white items-center font-semibold py-2'>Receitas</h1>
        {token ? <button onClick={handleButton} className="bg-neutral-700 my-5 p-2 rounded-2xl me-2">LogOut</button> : <></> } 
    </header>
  )
}
