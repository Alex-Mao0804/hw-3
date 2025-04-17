import { Navigate, useLocation } from 'react-router-dom';
import React from 'react';
import ROUTES from '@/utils/routes';
import rootStore from '@/stores/RootStore/RootStore';
import { observer } from 'mobx-react-lite';

type ProtectedRouteProps = {
  children: React.ReactElement;
  onlyUnAuth?: boolean; 
};

const ProtectedRoute = ({ onlyUnAuth = false, children }: ProtectedRouteProps) => {
  const location = useLocation();
  const { isAuth } = rootStore.user;


  if (isAuth && onlyUnAuth) {
    return <Navigate to={ROUTES.USER} replace />;
  }

  if (!isAuth && !onlyUnAuth) {
    return <Navigate to={ROUTES.AUTHN} state={{ from: location }} replace />;
  }

  return children;
};

export default observer(ProtectedRoute);
