import Vue from 'vue';

const list = name => name + 's';
const toUpperCase = name => name.charAt(0).toUpperCase() + name.slice(1);

export const deleteMutation = name => {
    const listName = list(name);
    return {
        ['delete' + toUpperCase(name)](state, item) {
            const index = state[listName].findIndex(
                i => i.id === item[name + 'Id'],
            );
            if (index !== -1) state[listName].splice(index, 1);
        },
    };
};

/** @param {String} name */
export const pushMutation = name => {
    const listName = list(name);
    return {
        ['push' + toUpperCase(name)](state, item) {
            pushMutationFunction(listName, state, item);
        },
    };
};

/** @param {String} name */
export const setListMutation = name => {
    const listName = list(name);
    return {
        ['set' + toUpperCase(listName)](state, list) {
            state[listName] = list;
        },
    };
};

export const pushMutationFunction = (listName, state, item) => {
    const index = state[listName].findIndex(i => i.id === item.id);
    if (index === -1) state[listName].push(item);
    else Vue.set(state[listName], index, item);
};
