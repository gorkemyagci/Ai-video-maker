import { createSlice } from '@reduxjs/toolkit'

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
        },
        logout: (state) => {
            state.user = false;
            localStorage.removeItem('user');
        }
    },
})

// Action creators are generated for each case reducer function
export const { login, logout } = auth.actions

export default auth.reducer