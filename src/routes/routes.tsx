import { createBrowserRouter, type RouteObject } from 'react-router-dom'

import Home from '@pages/home'

import { HOME_PATH } from './paths'

const routes: RouteObject[] = [{ path: HOME_PATH, element: <Home /> }]

export default createBrowserRouter(routes)
