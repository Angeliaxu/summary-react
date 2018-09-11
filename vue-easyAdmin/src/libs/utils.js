let local = {
    save (key, value) {
        window.localStorage.setItem(key, JSON.stringify(value))
    },
    clear (key) {
        window.localStorage.removeItem(key)
    },
    fetch (key) {
        return JSON.parse(window.localStorage.getItem(key)) || {}
    } 
}

export default {
    install: function (Vue) {
        Vue.prototype.$util = local
    }
}