const clearUser = {
    _id: '',
    firstName: '',
    lastName: '',
    email: '',
    username: ''
}

export const reducer = (state = {user: clearUser}, action) => {
    switch (action.type) {
        case 'USER_AUTH':
            return {user: {...action.payload}};
        case 'LOGOUT':
            return {user: clearUser}
        default:
            return state;
    }
}