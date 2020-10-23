import axios from 'axios'
import {Loading, Notify, Cookies, LocalStorage} from 'quasar'
const state = {
    user: null,
    isLoggedIn: null
}

const getters = {
    user(state){
        return state.user.payments
    },
    userRole(state){
        return state.user
    }
}

const mutations = {
    setUser(state, user) {
        state.user = user;
        state.isLoggedIn = true;
    },
    clearUser(state, {user}){
        state.user = user,
        state.isLoggedIn = false
    }
}

const actions = {
    async login({commit, dispatch}, data) {
        try{
            Loading.show()
            const result = await axios({
                method: 'POST',
                url: 'api/v1/users/login',
                withCredentials: true,
                data,
            })
            // console.log(result.data.data.user, 'Login')
            // commit('setUser', result.data.data.user)
            Cookies.set('jwt', result.data.token)
            dispatch('fetchUser')
            // LocalStorage.set('isLoggedIn', true)
            Loading.hide()
            if(result.data.data.user.role == 'user'){
                this.$router.push('/dashboard')
            }else{
                dispatch('admin/getUsers', null, {root: true})
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
    },
    async signup({commit, dispatch}, data) {
        try{
            Loading.show()
            dispatch('dues/getDues', null, {root: true})
            const result = await axios({
                method: 'POST',
                url: 'api/v1/users/signup',
                withCredentials: true,
                data,
            })
            // console.log(result.data.data.user, 'signup')
            // commit('setUser', result.data.data.user)
            Cookies.set('jwt', result.data.token)
            dispatch('fetchUser')
            Notify.create({
                message: 'Successful',
                icon: 'check',
                color: 'positive',
                textColor: 'white',
            })
            LocalStorage.set('isLoggedIn', true)
            Loading.hide()
            if(result.data.data.user.role == 'user'){
                this.$router.push('/dashboard')
            }else{
                dispatch('admin/getUsers', null, {root: true})
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
    },
    async fetchUser({commit, dispatch}) {
        try{
            Loading.show()
            const result = await axios({
                method: 'GET',
                url: 'api/v1/users/me',
                withCredentials: true,
            })
            commit('setUser', result.data.user)
            if(result.data.user.role == 'admin'){
                dispatch('admin/getUsers', null, {root: true})
            }
            LocalStorage.set('isLoggedIn', true)
            Loading.hide()
            return result.data.user
        }catch(e){
            Cookies.remove('jwt')
            LocalStorage.set('isLoggedIn', false)
            this.$router.push('/')
            Loading.hide()
        }
    },
    async logout({commit}) {
        try{
            Loading.show()
            await axios({
                method: 'GET',
                url: 'api/v1/users/logout',
                withCredentials: true,
            })
            commit('clearUser', {user: null})
            Cookies.remove('jwt')
            LocalStorage.set('isLoggedIn', false)
            this.$router.push('/')
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
            Loading.show()
            console.log(token)
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
                this.$router.push('/dashboard')
            }else{
                this.$router.push('/dashboard/admin')
            }
        }catch(e){
            Loading.hide()
            console.log(e)
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