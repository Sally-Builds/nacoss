import {Notify, Cookies, Loading, LocalStorage, QSpinnerPie} from 'quasar'
import axios from 'axios'

const state = {
    currencyConverter: false
}

const getters = {
    currencyConverter(state) {
        return state.currencyConverter
    }

}

const mutations = {
    setCurrencyConverterStatus(state, payload) {
        state.currencyConverter = payload
        LocalStorage.set('currencyConverter', payload)

    },
    initialLoadCurrency(state) {
        state.currencyConverter = LocalStorage.getItem('currencyConverter')
    }
}

const actions = {
    getCurrencyConverterStatus({commit}, payload) {
        commit('setCurrencyConverterStatus', payload)
    },
    initialLoadCurrency({commit}) {
        commit('initialLoadCurrency')
    },
    async updateUser({commit, dispatch}, payload) {
        try{
            Loading.show()
            const formData = new FormData()
            for(const [key, value] of Object.entries(payload)){
                if(payload[key] == null || payload[key] == ''){
                    delete payload[key]
                }
            }
            for(const [key, value] of Object.entries(payload)){
                formData.append(`${key}`, value)
            }
            const res = await axios({
                method: 'PATCH',
                data: formData,
                url: 'api/v1/users/updateme',
                withCredentials: true
            })
            dispatch('auth/fetchUser', null, {root: true})
            Loading.hide()
            Notify.create({
                color: 'green-5',
                textColor: 'white',
                icon: 'check',
                message: 'updated successfully!'
              })
        }catch(err) {
            Loading.hide()
            if(err.response.data.message) {
                Notify.create({
                    color: 'negative',
                    textColor: 'white',
                    icon: 'cancel',
                    message: err.response.data.message
                  })
            }else {
                Notify.create({
                    color: 'negative',
                    textColor: 'white',
                    icon: 'cancel',
                    message: 'Error! something went wrong'
                  })
            }
        }
    },
    async updatePassword({commit, dispatch}, payload) {
        try{
            Loading.show({spinner: QSpinnerPie})
            const res = await axios({
                method: 'PATCH',
                data: payload,
                url: 'api/v1/users/updatepassword',
                withCredentials: true,
            })
            Notify.create({
                color: 'green-5',
                textColor: 'white',
                icon: 'check',
                message: 'password updated successfully'
              })
            dispatch('auth/passwordUpdated', res.data.data.user, {root: true})
            Loading.hide()
        }catch(err) {
            Loading.hide()
            if(err.response.data.message) {
                Notify.create({
                    color: 'negative',
                    textColor: 'white',
                    icon: 'cancel',
                    message: err.response.data.message
                  })
            }else {
                Notify.create({
                    color: 'negative',
                    textColor: 'white',
                    icon: 'cancel',
                    message: 'Error! something went wrong'
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
    actions,
}