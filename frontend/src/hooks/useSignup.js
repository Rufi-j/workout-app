// import { useState } from 'react';
// import { useAuthContext } from './useAuthContext';

// export const useSignup = () => {
//     const [error, setError] = useState(null)
//     const [isLoading, setIsLoading] = useState(null)
//     const { dispatch } = useAuthContext()

//     const signup = async (email, password) => {
//         setIsLoading(true)
//         setError(null)

//         const response = await fetch('/api/user/signup', {
//             method: 'POST',
//             headers: {'Content-Type': 'application/json'},
//             body: JSON.stringify({email, password})
//         })
//         const json = await response.json()

//         if (!response.ok) {
//             setIsLoading(false)
//             setError(json.error)
//         }
//         if (response.ok) {
//             //save the user to local storage
//             localStorage.setItem('user', JSON.stringify(json))

//              //update the auth context
//             dispatch({type: 'LOGIN', payload: json})

//             setIsLoading(false)
//         }
        
//     }
    
//     return { signup, isLoading, error }
// }

import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Initialize isLoading to false
  const { dispatch } = useAuthContext();

  // Determine the backend API URL based on the environment
  const API_URL =
    process.env.NODE_ENV === 'production'
      ? process.env.REACT_APP_API_URL // Use environment variable for the deployed backend URL
      : ''; // Empty for development (assuming a proxy is set up)

  const signup = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/api/user/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const json = await response.json();

      if (!response.ok) {
        // If the response is not OK, set the error message
        setIsLoading(false);
        setError(json.error || 'Signup failed, please check your inputs.');
      } else {
        // Save the user to local storage on successful signup
        localStorage.setItem('user', JSON.stringify(json));

        // Update the authentication context with the user data
        dispatch({ type: 'LOGIN', payload: json });

        setIsLoading(false); // Stop loading once signup is complete
      }
    } catch (err) {
      // Handle any network errors or unexpected issues
      setIsLoading(false);
      setError('Network error, please try again later.');
    }
  };

  // Return the signup function along with loading and error states
  return { signup, isLoading, error };
};