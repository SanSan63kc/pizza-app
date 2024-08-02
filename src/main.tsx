import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Menu } from './pages/Menu/Menu.tsx'
import { Cart } from './pages/Cart/Cart.tsx'
import { Error } from './pages/Error/Error.tsx'
import { Layout } from './layout/Layout/Layout.tsx'
import { ProductPage } from './pages/Product/Product.tsx'
import axios from 'axios'
import { PREFIX } from './helpers/API.ts'

let router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Menu />,
      },
      {
        path: "/cart",
        element: <Cart />
      },
      {
        path: "/product/:id",
        element: <ProductPage />,
        loader: async ({ params }) => {
          await new Promise<void>((resolve) => {
            setTimeout(() => {
                resolve()
            }, 2000)
        })
          let { data } = await axios.get(`${PREFIX}/products/${params.id}`)
          return data
        }
      }
    ]
  },
  {
    path: "*",
    element: <Error />
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
