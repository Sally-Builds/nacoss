import axios from 'axios'
import {Loading, Notify, Cookies, LocalStorage} from 'quasar'
const state = {
}

const getters = {}

const mutations = {
    
}

const actions = {
    async makePayment({commit}, data) {
        try{
            Loading.show()
            const result = await axios({
                method: 'POST',
                url: 'api/v1/payments/makepayments',
                withCredentials: true,
                data: {duesId: data},
            })
          window.location = result.data.data.data.link
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
    async verifyPayment({dispatch}) {
        try {
            let y = window.location.href
            y = y.split('?')[1]
            if(y !== undefined) {
                let x = `${y}`.split('&')
                const data = {}
                data.status = x[0].split('=')[1]
                data.tx_ref = x[1].split('=')[1]
                if(x[2]){
                    data.transaction_id = x[2].split('=')[1]
                }
                if(data.status === 'successful'){
                    const x = await axios({
                        method: 'POST',
                        url: 'api/v1/payments',
                        withCredentials: true,
                        data,
                    })
                    Notify.create({
                        message: 'Payment successful',
                        icon: 'check',
                        color: 'positive',
                        textColor: 'white',
                    })
                    dispatch('auth/fetchUser', null, {root: true})
                    this.$router.replace('/dashboard')
                }
            }
        }catch(e) {
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