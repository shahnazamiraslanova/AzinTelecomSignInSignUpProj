import { Navigate, Outlet } from 'react-router-dom';
import { Routes } from '../routes';
import { IAuthProtectedRouteProps } from './auth-protected';

const AuthProtectedComponent = ({ children, layout = 'public' }: IAuthProtectedRouteProps) => {
    const isAuthenticated = localStorage.getItem('isLoggedIn') === 'true';

    if (!isAuthenticated) {
        return <Navigate to={Routes.signin} />;
    }

    return (
        <div className={`layout-${layout}`}>
            
            {children}
            <Outlet />
        </div>
    );
};

export default AuthProtectedComponent;
