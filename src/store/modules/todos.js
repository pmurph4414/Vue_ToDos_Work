import axios from 'axios';

const state = {
    todos: []
};

const getters = {
    allTodos: state => state.todos
};

// make request, get response and call a mutation, mutations alter state
const actions = {
    async fetchTodos({ commit }) {
        const response = await axios.get('http://jsonplaceholder.typicode.com/todos');

        commit('setTodos', response.data);
    }
};

// adds response to the state
const mutations = {
    setTodos: (state, todos) => (state.todos = todos)
};

export default {
    state,
    getters,
    actions,
    mutations
};