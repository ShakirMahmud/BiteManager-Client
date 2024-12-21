import { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';

const useAuth = () => {
    const useContext = useContext(AuthContext);
    return useContext;
};

export default useAuth;