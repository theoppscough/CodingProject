import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const isAuthenticated = !!localStorage.getItem('token'); //Check if token exists

    return (
        <Route {...rest} render={(props) => isAuthenticated ? (
            <Component />
        ) : ( 
            <Navigate to='/login' />
        )}
        />
    );
};

export default ProtectedRoute;