import { useState, useEffect } from 'react';

export interface UserData {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  type: 'USER' | 'COMP';
}

export const useAppData = () => {
    const [isAUTH, setIsAUTH] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<UserData | null>(null);
    const [userType, setUserType] = useState<'USER' | 'COMP' | null>(null);

    const handleLogout = async (): Promise<void> => {
        // Clear all tokens and user data
        localStorage.removeItem('USERtoken');
        localStorage.removeItem('COMPtoken');
        localStorage.removeItem('USERID');
        localStorage.removeItem('COMPID');
        localStorage.removeItem('USERname');
        localStorage.removeItem('COMPname');
        localStorage.removeItem('USERemail');
        localStorage.removeItem('COMPemail');
        localStorage.removeItem('userType');
        
        setIsAUTH(false);
        setUser(null);
        setUserType(null);
        window.location.href = '/';
    };

    const checkUserAuth = async (): Promise<void> => {
        const userToken = localStorage.getItem('USERtoken');
        const compToken = localStorage.getItem('COMPtoken');
        const storedUserType = localStorage.getItem('userType');

        if (!userToken && !compToken) {
            setIsAUTH(false);
            setIsLoading(false);
            return;
        }

        const token = userToken || compToken;
        const type = storedUserType || (userToken ? 'USER' : 'COMP');

        // For now, let's use a simple token-based approach
        // If token exists, consider user authenticated
        if (token) {
            setIsAUTH(true);
            setUserType(type as 'USER' | 'COMP');
            
            // Set user data from localStorage
            if (type === 'USER') {
                setUser({
                    id: localStorage.getItem('USERID') || '',
                    name: localStorage.getItem('USERname') || '',
                    email: localStorage.getItem('USERemail') || '',
                    phone: '', // Add if available
                    address: '', // Add if available
                    type: 'USER'
                });
            } else if (type === 'COMP') {
                setUser({
                    id: localStorage.getItem('COMPID') || '',
                    name: localStorage.getItem('COMPname') || '',
                    email: localStorage.getItem('COMPemail') || '',
                    phone: '', // Add if available
                    address: '', // Add if available
                    type: 'COMP'
                });
            }
        } else {
            // Clear invalid tokens
            localStorage.removeItem('USERtoken');
            localStorage.removeItem('COMPtoken');
            localStorage.removeItem('USERID');
            localStorage.removeItem('COMPID');
            localStorage.removeItem('USERname');
            localStorage.removeItem('COMPname');
            localStorage.removeItem('USERemail');
            localStorage.removeItem('COMPemail');
            localStorage.removeItem('userType');
            
            setIsAUTH(false);
            setUser(null);
            setUserType(null);
        }
        
        setIsLoading(false);
    };

    useEffect(() => {
        checkUserAuth();
    }, []);

    return {
        isAUTH,
        isLoading,
        user,
        userType,
        handleLogout,
        checkUserAuth,
        setIsLoading,
        setUser
    };
};