import Cookie from 'js-cookie'
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import routes from '../../routes'

function ProtectedRoute() {
  return Cookie.get('user_id')?<Outlet />:<Navigate to={routes.home} />
}

export default ProtectedRoute
