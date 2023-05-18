// import { isAuthenticated } from '../../contexts'
import { AuthenticatedRoutes } from '../AuthenticatedRoutes';
import { SignRoutes } from '../SignRoutes';
import { useAuth } from '@/hooks'


export function BaseRoutes() {
    const { authenticated } = useAuth();
    return authenticated ? <AuthenticatedRoutes /> : <SignRoutes />;
    
}