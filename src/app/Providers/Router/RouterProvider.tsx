import { type FC } from 'react'
import { RouterProvider as ReactDOMProvider } from 'react-router-dom'

import {  routerAuth } from './routes'

// import { useStoreApp } from 'shared/model'

const RouterProvider: FC = () => {
  // const isLogin = useStoreApp(state => state.isLogin)
  // const hasToken = !!localStorage.getItem('accessToken')

  return <ReactDOMProvider router={ routerAuth} />
}

export default RouterProvider