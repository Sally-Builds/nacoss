import { LocalStorage } from 'quasar'
import { boot, route } from 'quasar/wrappers'
// import store from '../store/auth'

export default boot(async ({router, app, store}) => {
    // console.log(store.getters['auth/userRole'] === 'admin')
    // if(window.location.reload && window.location.href.includes('dashboard')){
    // app.store.dispatch('auth/fetchUser').then((res)=> {console.log(res)})
    // console.log(window.location.host)
    //     console.log(window.location.href)
    //     console.log('reloaded')
    // }
    app.store.dispatch('dues/getDues')
    // app.store.dispatch('auth/fetchUser').then((res)=> {console.log(res)})
            router.beforeEach((to, from, next) => {

            let isLoggedIn = store.state.auth.isLoggedIn
            let user = store.state.auth.user
            // console.log(user, isLoggedIn)
            
            if(to.matched.some(record => record.meta.adminUser) && isLoggedIn){
                if(user.role === 'admin'){
                    next()
                }else {
                    next('/dashboard')
                }
            }else if(to.matched.some(record => record.meta.user) && isLoggedIn){
                if(user.role === 'user'){
                    next()
                }else {
                    next('/dashboard/admin')
                }
            }else if(to.matched.some(record => record.meta.isLoggedIn) && isLoggedIn){
                next()
            }else {
                next()
            }
            
        // })
    })
})

        //     if(to.matched.some(record => record.meta.adminUser)){
        //     if(store.state.auth.user !== null && store.state.auth.user.role == 'admin'){
        //         next()
        //     }else{
        //         const watcher = store.watch(state => state.auth.user, user => {
        //             watcher();
        //             if(user) {
        //                 if(user.role == 'admin'){
        //                     next()
        //                 }else {
        //                     next('/dashboard')
        //                 }
        //             }
        //         })
        //     }
        //     }else if(to.matched.some(record => record.meta.requiresAuth)){
        //     if(store.state.auth.user !== null && store.state.auth.user.role == 'user'){
        //         next()
        //     }else{
        //         const watcher = store.watch(state => state.auth.user, user => {
        //         watcher();
        //         if(user) {
        //             if(user.role == 'admin'){
        //                 next('/dashboard/admin')
        //             }else {
        //                 next()
        //             }
        //         }
        //     })
        // }
        // }
        // else if(to.matched.some(record => record.meta.noAuth)){
        //     if(isLoggedIn){
        //         next('/dashboard')
        //     }else{
        //         next()
        //     }
        // }