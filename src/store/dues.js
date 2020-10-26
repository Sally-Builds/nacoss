import axios from 'axios'
import {Loading, Notify, Cookies, LocalStorage, QSpinnerPie} from 'quasar'
const state = {
    dues: null
}

const getters = {
    getDues(state, getters, rootState, rootGetters) {
        const x =  rootState['auth']['user']
        // console.log(x)
        const dues = state.dues
        if(x){
        dues.forEach(el => {
        const me = x.payments.find(e => e.semester === el.semester)
            if(me) {
                el.status = 'PAID'
            }else {
                el.status = 'N/A'
            }
        })
        }
        return dues
    }
}

const mutations = {
    setDues(state, payload) {
        state.dues = payload
    }
}

const actions = {
    async getDues({commit}, data) {
        try{
            const result = await axios({
                method: 'GET',
                url: 'api/v1/dues',
                withCredentials: true,
            })
            commit('setDues', result.data.data )
            commit('admin/getDues', result.data.data, {root: true})
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
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}