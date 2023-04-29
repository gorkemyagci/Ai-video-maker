import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie';

const initialState = {
    user: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user')) ?? false : null,
}

export const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload));
            Cookies.set('isLogged',true)
        },
        logout: (state) => {
            state.user = false;
            localStorage.removeItem('user');
            Cookies.remove('isLogged')
        }
    },
})

// Action creators are generated for each case reducer function
export const { login, logout } = auth.actions

export default auth.reducer