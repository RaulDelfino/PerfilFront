import style from './App.module.css'
import FormLogin from "./pages/formLogin/formLogin"
import FormRegister from "./pages/formRegister/formRegister"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home  from "./pages/home/home.jsx"
import { Provider } from "react-redux"
import { createStore } from "redux"
import tokenReducer from "../src/reducers/userReducer"
import PrivateRoute from './components/PrivateRoute';




function persistState(state){
    localStorage.setItem("token", JSON.stringify(state))
}
function loadState(){
    const actualState = localStorage.getItem("token")
    if (actualState){
      return JSON.parse(actualState)
    }else{
      return {}
    }
}

const store = createStore(tokenReducer, loadState())

store.subscribe(()=>{
    persistState(store.getState())
})


function App() {

  return (
    <Provider store={store}>
      <div className={style.main}>
        <BrowserRouter > 
            <Routes>
              <Route path='/home' element={<PrivateRoute redirectTo={"/"}>
                <Home/>
              </PrivateRoute>}>
              </Route>
              <Route path='/' element={ <FormLogin /> }/>
              <Route path='/register' element={<FormRegister />}/>
            </Routes>

        </BrowserRouter>
      </div>
    </Provider>
  )
}

export default App
