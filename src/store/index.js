import Vue from 'vue';
import Vuex from 'vuex';
import router from "../router";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        ToDoLists: [],
        checkedArray: null,
        id: 0,
    },
    getters: {
        ToDoLists: state => state.ToDoLists,
        getId: state => state.id,
    },
    mutations: {
        addToDoLists(state, inputData) {
            state.ToDoLists.push(inputData);
        },

        updateToDoLists(state, inputData) {
            let id = inputData.id;

            for (let i = 0; i < state.ToDoLists.length; i++) {
                if (state.ToDoLists[i].id == Number(id)) {
                    state.ToDoLists[i] = inputData;
                    break;
                }
            }
        },

        recreateToDoLists(state, inputData) {
            state.ToDoLists = [];
            for (let i = 0; i < inputData.length; i++) {
                state.ToDoLists.push(inputData[i]);
            }
        },

        incrementId(state) {
            state.id++;
        }

    },
    actions: {
        createToDo({ commit }, inputData) {
            commit('addToDoLists', inputData);
            router.push('/');
        },

        editToDo({ commit }, inputData) {
            commit('updateToDoLists', inputData);
            router.push('/list/' + inputData.id);
        },

        recreateToDo({ commit }, inputData) {
            commit('recreateToDoLists', inputData);
            router.push('/');
        },

        updateId({ commit }) {
            commit('incrementId');
        }
    }
});