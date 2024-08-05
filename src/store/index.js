import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
    state: {
        posts: [],
        users: [],
        currentPage: 1,
        itemsPerPage: 10
    },
    mutations: {
        setPosts(state, payload) {
            state.posts = payload
        },
        setUsers(state, payload) {
            state.users = payload
        },
        setCurrentPage(state, page) {
            state.currentPage = page
        },
        incrementPage(state) {
            state.currentPage++
        },
        decrementPage(state) {
            state.currentPage--
        },
        deletePost(state, id) {
            state.posts = state.posts.filter(post => post.id !== id)
        }
    },
    actions: {
        async fetchData({ commit }) {
            try {
                const [postsResponse, usersResponse] = await Promise.all([
                    axios.get('https://jsonplaceholder.typicode.com/posts'),
                    axios.get('https://jsonplaceholder.typicode.com/users')
                ])
                commit('setPosts', postsResponse.data)
                commit('setUsers', usersResponse.data)
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        },
        changePage({ commit }, page) {
            commit('setCurrentPage', page)
        },
        nextPage({ commit, state }) {
            if (state.currentPage < state.posts.length / state.itemsPerPage) {
                commit('incrementPage')
            }
        },
        prevPage({ commit, state }) {
            if(state.currentPage > 1) {
                commit('decrementPage')
            }
        },
        deletePost({ commit }, id) {
            commit('deletePost', id)
        }
    },
    getters: {
        getData(state) {
            const start = (state.currentPage - 1) * state.itemsPerPage;
            const end = state.currentPage * state.itemsPerPage;

            const postsWithUserNames = state.posts.map(post => {
                const user = state.users.find(user => user.id === post.userId)
                return {
                    ...post,
                    userName: user ? user.name : 'Unknown'
                }
            })

            return postsWithUserNames.slice(start, end)
        },
        totalPages(state) {
            return Math.ceil(state.posts.length / state.itemsPerPage)
        }
    }
})
