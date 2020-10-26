import axios from 'axios'
import {Loading, Notify, Cookies, LocalStorage, QSpinnerPie} from 'quasar'
const state = {
    user: null,
    isLoggedIn: null,
    role: null
}

const getters = {
    user(state){
        return state.user.payments
    },
    userRole(state){
        return state.role
    }
}

const mutations = {
    setUser(state, user) {
        state.user = user;
        state.isLoggedIn = true;
        state.role = user.role
    },
    clearUser(state, {user}){
        state.user = user,
        state.isLoggedIn = false
    }
}

const actions = {
    async login({commit, dispatch}, data) {
        try{
            Loading.show({spinner: QSpinnerPie})
            const result = await axios({
                method: 'POST',
                url: 'api/v1/users/login',
                withCredentials: true,
                data,
            })
            Notify.create({
                message: 'Login Successful',
                icon: 'check',
                color: 'positive',
                textColor: 'white',
            })
            Cookies.set('jwt', result.data.token)
                // Loading.hide()
            LocalStorage.set('isLoggedIn', true)
            if(result.data.data.user.role === 'admin'){
                    LocalStorage.set('role', 1)
                    dispatch('fetchUser')
                this.$router.push('/dashboard/admin')
                }else{
                    LocalStorage.set('role', 0)
                    dispatch('fetchUser')
                    this.$router.push('/dashboard')
                }
        }catch(e){
            Loading.hide()
            if(e.response.data.message){
                Notify.create({
                    message: e.response.data.message,
                    icon: 'warning',
                    color: 'negative',
                    textColor: 'white',
                })
            }else {
                Notify.create({
                    message: 'Error!!! Something went wrong.',
                    icon: 'warning',
                    color: 'negative',
                    textColor: 'white',
                })
            }
        }
    },
    async signup({commit, dispatch}, data) {
        try{
            Loading.show()
            const result = await axios({
                method: 'POST',
                url: 'api/v1/users/signup',
                withCredentials: true,
                data,
            })
            Notify.create({
                message: 'Successful',
                icon: 'check',
                color: 'positive',
                textColor: 'white',
            })
            Cookies.set('jwt', result.data.token)
            // Loading.hide()
            LocalStorage.set('isLoggedIn', true)
            if(result.data.data.user.role === 'admin'){
                    LocalStorage.set('role', 1)
                    dispatch('fetchUser')
                this.$router.push('/dashboard/admin')
                }else{
                    LocalStorage.set('role', 0)
                    dispatch('fetchUser')
                    this.$router.push('/dashboard')
                }
        }catch(e){
            Loading.hide()
            if(e.response.data.message){
                Notify.create({
                    message: e.response.data.message,
                    icon: 'warning',
                    color: 'negative',
                    textColor: 'white',
                })
            }else {
                Notify.create({
                    message: 'Error!!! Something went wrong.',
                    icon: 'warning',
                    color: 'negative',
                    textColor: 'white',
                })
            }
        }
    },
    async fetchUser({commit, dispatch}) {
        try{
            Loading.show({spinner: QSpinnerPie})
            const result = await axios({
                method: 'GET',
                url: 'api/v1/users/me',
                withCredentials: true,
            })
            commit('setUser', result.data.user)
            if(result.data.user.role === 'admin'){
                LocalStorage.set('role', 1)
                dispatch('admin/getUsers', null, {root: true})
            }else{
                LocalStorage.set('role', 0)
            }
            Loading.hide()
        }catch(e){
            console.log(e)
            Cookies.remove('jwt')
            LocalStorage.set('isLoggedIn', false)
            LocalStorage.remove('role')
            Loading.hide()
            this.$router.replace('/')
        }
    },
    async logout({commit, dispatch}) {
        try{
            Loading.show({spinner: QSpinnerPie})
            await axios({
                method: 'GET',
                url: 'api/v1/users/logout',
                withCredentials: true,
            })
            commit('clearUser', {user: null})
            Cookies.remove('jwt')
            LocalStorage.set('isLoggedIn', false)
            LocalStorage.remove('role')
            this.$router.replace('/')
            Loading.hide()
        }catch(e){
            Loading.hide()
            if(e.response.data.message){
                Notify.create({
                    message: e.response.data.message,
                    icon: 'warning',
                    color: 'negative',
                    textColor: 'white',
                })
            }else {
                Notify.create({
                    message: 'Error!!! Something went wrong.',
                    icon: 'warning',
                    color: 'negative',
                    textColor: 'white',
                })
            }
        }
    },
    passwordUpdated({commit}, payload) {
        commit('setUser',payload)
    },
    async forgotPassword({}, data){
        try {
            Loading.show()
            const res = await axios({
                method: 'POST',
                url: 'api/v1/users/forgotPassword',
                withCredentials: true,
                data,
            })
            console.log(res)
            Loading.hide()
            Notify.create({
                message: res.data.message,
                icon: 'check',
                color: 'positive',
                textColor: 'white',
            })
        }catch(e){
            Loading.hide()
            if(e.response.data.message){
                Notify.create({
                    message: e.response.data.message,
                    icon: 'warning',
                    color: 'negative',
                    textColor: 'white',
                })
            }else {
                Notify.create({
                    message: 'Error!!! Something went wrong.',
                    icon: 'warning',
                    color: 'negative',
                    textColor: 'white',
                })
            }
        }
    },
    async resetPassword({commit}, {data, token}){
        try {
            Loading.show({spinner: QSpinnerPie})
            const result = await axios({
                method: 'PATCH',
                url: `api/v1/users/resetpassword/${token}`,
                withCredentials: true,
                data,
            })
            Notify.create({
                message: 'password changed successfully',
                icon: 'check',
                color: 'positive',
                textColor: 'white',
            })
            commit('setUser', result.data.data.user)
            Cookies.set('jwt', result.data.token)
            LocalStorage.set('isLoggedIn', true)
            Loading.hide()
            if(result.data.data.user.role == 'user'){
                LocalStorage.set('role', 0)
                this.$router.push('/dashboard')
            }else{
            LocalStorage.set('role', 1)
            this.$router.push('/dashboard/admin')
            }
        }catch(e){
            Loading.hide()
            if(e.response.data.message){
                Notify.create({
                    message: e.response.data.message,
                    icon: 'warning',
                    color: 'negative',
                    textColor: 'white',
                })
            }else {
                Notify.create({
                    message: 'Error!!! Something went wrong.',
                    icon: 'warning',
                    color: 'negative',
                    textColor: 'white',
                })
            }
        }
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}