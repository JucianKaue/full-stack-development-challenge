import { BrowserRouter, Route, Routes } from 'react-router-dom'
import {Register} from './pages/Register.controller.tsx'
import {Login} from './pages/Login.controller.tsx'
import {Recipes} from './pages/Recipes.controller.tsx'
import { Header } from './components/Header.tsx'
import { RecipeDetails } from './pages/RecipesDetails.controller.tsx'
import { UpdateRecipes } from './pages/RecipesUpdate.controller.tsx'
import { CreateRecipe } from './pages/RecipesCreate.controller.tsx'

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
          <Route path='/recipesUpdate/:id' element={<UpdateRecipes />} />
          <Route path='/recipesCreate' element={<CreateRecipe />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}