import { MouseEvent, useState } from 'react'
import Button from './components/Button/Button'
import Input from './components/Input/Input'
import { createBrowserRouter, Link, RouterProvider } from 'react-router-dom'
import { Menu } from './pages/Menu/Menu'
import { Cart } from './pages/Cart/Cart'
import { Error } from './pages/Error/Error'

let router = createBrowserRouter([
  {
    path: "/",
    element: <Menu/>
  },
  {
    path: "/cart",
    element: <Cart/>
  },
  {
    path: "*",
    element: <Error/>
  },
])

function App() {

  let [counter, setCounter] = useState<number>(0)

  let addCounter = (e: MouseEvent) => {
    console.log(e)
  }

  return (
    <>
      <Button onClick={() => { addCounter }}>Кнопка</Button>
      <Button appearence="big" onClick={() => { addCounter }}>Кнопка</Button>
      <Input placeholder='email' />
      <div>
        <Link to="/">Меню</Link>
        <Link to="/cart">Корзина</Link>
      </div>
      <RouterProvider router={router} />
    </>
  )
}

export default App
