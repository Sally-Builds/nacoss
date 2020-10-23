import axios from 'axios'
import {Loading, Notify, Cookies, LocalStorage} from 'quasar'
import store from '../store/auth'
const state = {
    users: null,
    levelModels: 'all',
    levelOptions: ['all', 'first', 'second', 'third', 'fourth'],
    paymentStatusModels: 'all',
    paymentStatusOptions: ['all', 'PAID', 'N/A'],
    semesterModels: 'all',
    semesterOptions: ['all', 'first', 'second'],
    search: '',
    dues: null
}

const getters = {
    dues(state){
        return state.dues
    },
    firstSemesterAmount(state) {
        let amount = 0
        if(state.users){
            state.users.forEach(user => {
                if(user.firstAmount){
                    amount += user.firstAmount
                }
            })
        }
        
        return amount
    },
    secondSemesterAmount(state) {
        let amount = 0
        if(state.users){
            state.users.forEach(user => {
                if(user.secondAmount){
                amount += user.secondAmount
                }
            })
        }
        
        return amount
    },
    getUsers(state) {
        let filteredUsers = []
        if(state.levelModels !== 'all'){
            filteredUsers = state.users.filter(e => e.level === state.levelModels)
        }else{
            filteredUsers = state.users
        }

        if(state.paymentStatusModels !== 'all'){
            filteredUsers = filteredUsers.filter(e => e.first === state.paymentStatusModels || e.second === state.paymentStatusModels)
        }
        if(state.semesterModels !== 'all' && state.paymentStatusModels !== 'all'){
            filteredUsers = filteredUsers.filter(e => e[state.semesterModels] == state.paymentStatusModels)
        }
        if(state.search){
            filteredUsers = []
            state.users.forEach(user => {
                if(user.email.includes(state.search.toLowerCase())){
                    filteredUsers.push(user)
                }
            })
        }
        return filteredUsers
    }
}

const mutations = {
   getUsers(state, payload){
        let users = payload
       users.forEach(user => {
            for(const data in user){
                if(data === 'payments'){
                    user.payments.forEach(payment => {
                        if(payment.semester === 'first'){
                            user.first = 'PAID'
                            user.firstAmount = payment.amount
                        }
                        else if(payment.semester === 'second'){
                            user.second = 'PAID'
                            user.secondAmount = payment.amount
                        }
                    })
                }
            }
       })
       users.forEach(user => {
           if(!user.first){
            user.first = 'N/A'
           }
           if(!user.second){
            user.second = 'N/A'
           }
       })
       state.users = users
   },
   setLevelModels(state, payload){
        state.levelModels = payload
   },
   setPaymentStatusModels(state, payload){
       state.paymentStatusModels = payload
    },
    setSemesterModels(state, payload){
       state.semesterModels = payload
    },
    setSearch(state, payload){
        state.search = payload
    },
    getDues(state, payload){
        state.dues = payload
    }
}

const actions = {
    async getUsers({commit}, data) {
        try{
            const result = await axios({
                method: 'GET',
                url: 'api/v1/users',
                withCredentials: true,
            })
            commit('getUsers', result.data.users)
        }catch(e){
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
    setLevelModels({commit}, payload){
        commit('setLevelModels', payload)
    }, 
    setPaymentStatusModels({commit}, payload){
        commit('setPaymentStatusModels', payload)
    },
    setSemesterModels({commit}, payload){
        commit('setSemesterModels', payload)
    },
    setSearch({commit}, payload) {
        commit('setSearch', payload)
    },
    async changePrice({dispatch}, {id, amount}){
        try{
            const data = {amount}
            const res = await axios({
                method: 'PATCH',
                url: 'api/v1/dues/' + id,
                withCredentials: true,
                data,
            })
            dispatch('dues/getDues', null, {root: true})
            Notify.create({
                    message: 'update successful',
                    icon: 'check',
                    color: 'positive',
                    textColor: 'white',
                })
        }catch(e){
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
    async makeUserPayment({dispatch}, data){
        try{
            const res = await axios({
                method: 'POST',
                url: 'api/v1/payments/adminpayments',
                withCredentials: true,
                data,
            })
            dispatch('getUsers')
            Notify.create({
                    message: 'successful',
                    icon: 'check',
                    color: 'positive',
                    textColor: 'white',
                })
        }catch(e){
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