import Cookie from 'js-cookie'
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import routes from '../../routes';

function AuthRoute() {
  return Cookie.get('user_id')?<Navigate to={routes.home} />:<Outlet />;
}

export default AuthRoute
