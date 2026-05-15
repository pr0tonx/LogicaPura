import { createStore } from 'vuex';

export default createStore({
    state() {
        return {
            user: {}, 
            logged: false,
            registeredUsers: [] // Lista de usuários que se cadastraram
        };
    },
    mutations: {
        // Usada no cadastro
        CREATE_USER(state, userData) {
            state.registeredUsers.push(userData);
        },
        // Usada no login
        SET_LOGGED_USER(state, user) {
            state.user = user;
            state.logged = true; 
        },
        UPDATE_USER_DATA(state, updatedFields) {
            state.user = { ...state.user, ...updatedFields };
        },
        SIGNOFF(state) {
            state.user = {};
            state.logged = false;
        }
    }
});