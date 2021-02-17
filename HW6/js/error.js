Vue.component("connection-error", {
    props: ["error"],
    data() {
        return {
            msg: 'Cоедение с сервером отсутствует, проверьте наличие интернета !'
        }
    },
    template: `<div v-if="error" class="error">
                <h4> {{msg}} </h4>
                </div>`
})