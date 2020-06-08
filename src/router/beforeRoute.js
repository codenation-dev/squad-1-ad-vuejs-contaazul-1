import store from '../store/store'

export default  (to, from, next) => {
    if (!store.getters['getToken']) {
        if (to.name == 'logs' || to.name == 'relatorios') {
            next({ name: 'login'})
        } else {
            next()
        }
    } else {
        if(to.name == 'login' || to.name == 'register' || to.name == 'register') {
            next({ name: 'logs'})
        } else {
            next()
        }
    }    
}