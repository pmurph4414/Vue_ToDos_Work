/* eslint-disable no-console */
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
    },
    async addTodo({ commit }, title) {
        const response = await axios.post('http://jsonplaceholder.typicode.com/todos', 
            {title, completed: false});

        commit('newTodo', response.data);
    },
    async deleteTodo({ commit}, id) {
        await axios.delete(`http://jsonplaceholder.typicode.com/todos/${id}`);

        commit('removeTodo', id);
    },
    async filterTodos({ commit }, e) {
        // get drop down selected number
        const limit = parseInt(e.target.options[e.target.options.selectedIndex].innerText);
        
        const response = await axios.get(
            `http://jsonplaceholder.typicode.com/todos/?_limit=${limit}`);

        commit('setTodos', response.data);
    },
    async updateTodo({ commit }, updTodo) {
        // new object, updTodo, constructed in component gets added 
        const response = await axios.put(
            `http://jsonplaceholder.typicode.com/todos/${updTodo.id}`, updTodo);

        commit('updateTodo', response.data);

    }
};

// adds response to the state
const mutations = {
    setTodos: (state, todos) => (state.todos = todos),
    newTodo: (state, todo) => state.todos.unshift(todo),
    removeTodo: (state, id) => state.todos = state.todos.filter(todo => todo.id !== id),
    updateTodo: (state, updTodo) => {
        // getting index of current todo so update can stay in some index location within the array
        const index = state.todos.findIndex(todo => todo.id === updTodo.id);
        if (index !== -1) {
            state.todos.splice(index, 1, updTodo);
        }
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};