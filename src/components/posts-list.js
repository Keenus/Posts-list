import { mapGetters, mapActions, mapState } from 'vuex';

export default {
    computed: {
        ...mapGetters(['getData', 'totalPages']),
        ...mapState(['currentPage'])
    },
    data() {
        return {
            expandedPosts: new Set()
        };
    },
    methods: {
        ...mapActions(['changePage', 'nextPage', 'prevPage']),
        shortenText(text, id) {
            if (this.expandedPosts.has(id)) {
                return text;
            }
            return text.length > 100 ? text.slice(0, 100) + '...' : text;
        },
        shortenTitle(title) {
            return title.length > 20 ? title.slice(0, 20) + '...' : title;
        },
        toggleText(id) {
            if (this.expandedPosts.has(id)) {
                this.expandedPosts.delete(id);
            } else {
                this.expandedPosts.add(id);
            }
        },
        deletePost() {
            console.log('delete post');
        },
        getAllData() {
            return this.$store.getters.getData;
        }
    },
}
