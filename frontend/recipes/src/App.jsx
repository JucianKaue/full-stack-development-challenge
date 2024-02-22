import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { Recipes } from "./pages/Recipes"
import { RecipesDetails } from "./pages/RecipesDetails"
import { RecipesForm } from "./pages/RecipesForm"
import { Auth } from "./pages/Auth"
import { NavBar } from "./components/NavBar"


export default function App() {

  return (
    <>
    <BrowserRouter>
    <NavBar />
      <Routes>
        <Route path="/authentication" element={<Auth />} />
        
        <Route path='/recipes' element={<Recipes />} />
        <Route path='/recipes/:id' element={<RecipesDetails />} />
        <Route path='/recipescreate' element={<RecipesForm typeForm='create'/>} /> {/*It's possible to know that from the existance of "id" or not, but I prefer in this way to be more declarative */}
        <Route path='/recipeEdit/:id' element={<RecipesForm typeForm='edit'/>} />


        <Route path="*" element={<Navigate to="/recipes" />}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}