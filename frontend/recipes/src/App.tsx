import { BrowserRouter, Route, Routes } from 'react-router-dom'
import {Register} from './pages/Register.controller.tsx'
import {Login} from './pages/Login.controller.tsx'
import {Recipes} from './pages/Recipes.controller.tsx'
import { Header } from './components/Header.tsx'
import { RecipeDetails } from './pages/RecipesDetails.controller.tsx'

export function App() {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/recipes' element={<Recipes />} />
          <Route path='/recipes/:id' element={<RecipeDetails />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}