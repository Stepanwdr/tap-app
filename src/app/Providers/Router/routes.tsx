import { lazy } from 'react'
import { Navigate, createBrowserRouter } from 'react-router-dom'
import { PATH } from '../../../shared/routing/path'
import { Menu } from "../../../widgets/Menu/Menu.tsx";
import { Layout } from '../../../shared/ui/Layout';
import { Header } from "../../../widgets/Header/Header";

const HomePage = lazy(() => import('../../../pages/Home.tsx'))

export const routerNotAuth = createBrowserRouter([
  { 
    path: '*',
    element: <Navigate to={PATH.LOGIN} />,
  },
])

export const routerAuth = createBrowserRouter([
  {
    path: '/',
    element: <Layout slotMenu={<Menu />} slotHeader={<Header/>} />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "*",
        element: <HomePage />,
      },
    ]
  },
])
