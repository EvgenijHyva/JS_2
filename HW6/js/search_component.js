Vue.component('search', {
    data() {
        return {
            userSearch: ''
        }
    },
    template: `
                <form action="#" class="search-form">
                    <input type="text" v-model="userSearch" @input="$parent.filter(userSearch)" class="search-field" placeholder="поиск">
                    <button class="btn-search" type="submit">
                        <i class="fas fa-search"></i>
                    </button>
                </form>
            `
})