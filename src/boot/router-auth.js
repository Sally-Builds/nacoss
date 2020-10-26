import { LocalStorage, Cookies } from 'quasar'
import { boot, route } from 'quasar/wrappers'
import store from '../store/auth'

export default async({router, app}) => {
    router.beforeEach((to, from, next) => {
        const isLoggedIn = LocalStorage.getItem('isLoggedIn')
        const userRole = LocalStorage.getItem('role')
        if(to.matched.some(record => record.meta.auth)){
            if(isLoggedIn){
                if(userRole === 1){
                    if(to.matched.some(record => record.meta.user)) {
                        let path = from.path
                        next(`${path}`)
                    }else {
                        next()
                    }
                }else if(userRole === 0){
                    if(to.matched.some(record => record.meta.adminUser)) {
                        let path = from.path
                        next(`${path}`)
                    }else {
                        next()
                    }
                }else {
                    next('/')
                }
            }else {
                next('/')
            }
        }else if(to.matched.some(record => record.meta.noAuth)){
            if(isLoggedIn){
                if(userRole === 0){
                    next('/dashboard')
                }else {
                    next('/dashboard/admin')
                }
            }else {
                next()
            }
        }
        else {
            next()
        }

    })
}
