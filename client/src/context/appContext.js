import React, { useContext, useReducer } from 'react'
import axios from 'axios';
import reducer from './reducers'
import { 
    DISPLAY_ALERT, 
    CLEAR_ALERT, 
    REGISTER_USER_BEGIN, 
    REGISTER_USER_SUCCESS, 
    REGISTER_USER_ERROR 
} from './actions' 

const token = localStorage.getItem('token')
const user = localStorage.getItem('user')
const userLocation = localStorage.getItem('location')

const initialState = {
    isLoading: false,
    showAlert: false,
    alertType: '',
    alertText: '',
    user: user ? JSON.parse(user) : null,
    token: null,
    userLocation: userLocation || '',
    jobLocation: userLocation || ''
}


const AppContext = React.createContext()


const AppProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const displayAlert = () => {
        dispatch({ type: DISPLAY_ALERT });
        clearAlert();
      };
    
    const clearAlert = () => {
        setTimeout(() => {
          dispatch({ type: CLEAR_ALERT });
        }, 3000);
    };

    const addUserToLocalStorage = () => {
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('token', JSON.stringify(token))
        localStorage.setItem('location', JSON.stringify(location))
    }

    const removeUserFromLocalStorage = () => {
        localStorage.removeItem('user', JSON.stringify(user))
        localStorage.removeItem('token', JSON.stringify(token))
        localStorage.removeItem('location', JSON.stringify(location))
    }

    const registerUser = async (currentUser) => {
        // console.log(currentUser)
        dispatch({ type: REGISTER_USER_BEGIN });
        try {
            const response = await axios.post('api/auth/register', currentUser)
            console.log(response)
            const {user, token, location} = response.data
            
            dispatch({
                type: REGISTER_USER_SUCCESS,
                payload: { user, token, location}
            })
            addUserToLocalStorage({user, token, location})

        } catch(error){
            // console.log(error.response)
            dispatch({
                type: REGISTER_USER_ERROR,
                payload: { msg: error.response.data.msg}
            })
        }
        clearAlert()
    }

    return (
        <AppContext.Provider value={{...state, displayAlert, registerUser}}>{children}</AppContext.Provider>
    )
}

const useAppContext = () => {
    return useContext(AppContext)
}

export { AppProvider, initialState, useAppContext }