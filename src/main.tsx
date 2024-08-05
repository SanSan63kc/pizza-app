import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, defer, RouterProvider } from 'react-router-dom'
import { Cart } from './pages/Cart/Cart.tsx'
import { Error as ErrorPage } from './pages/Error/Error.tsx'
import { Layout } from './layout/Layout/Layout.tsx'
import { ProductPage } from './pages/Product/Product.tsx'
import axios from 'axios'
import { PREFIX } from './helpers/API.ts'
import { AuthLayout } from './layout/Auth/AuthLayout.tsx'
import { Login } from './pages/Login/Login.tsx'
import { Register } from './pages/Register/Register.tsx'
import { RequireAuth } from './helpers/RequireAuth.tsx'

let Menu = lazy(() => import("./pages/Menu/Menu.tsx"))

let router = createBrowserRouter([
  {
    path: "/",
    element: <RequireAuth><Layout /></RequireAuth>,
    children: [
      {
        path: "/",
        element: <Suspense fallback={<>Загрузка...</>}><Menu /></Suspense>,
      },
      {
        path: "/cart",
        element: <Cart />
      },
      {
        path: "/product/:id",
        element: <ProductPage />,
        errorElement: <>Ошибка</>,
        loader: async ({ params }) => {

          return defer({
            data: new Promise((resolve, reject) => {
              setTimeout(() => {
                axios.get(`${PREFIX}/products/${params.id}`).then(data=>resolve(data))
                .catch(e=>reject(e))
              }, 2000)
            })
          })
        }
      }
    ]
  },
  {
    path: "/auth",
    element: <AuthLayout></AuthLayout>,
    children:[
      {
        path: "login",
        element: <Login></Login>
      },
      {
        path: "register",
        element: <Register></Register>
      }
    ]
  },
  {
    path: "*",
    element: <ErrorPage />
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
