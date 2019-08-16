export const reducer = (state = {user: {
        _id: '',
        firstName: '',
        lastName: '',
        email: '',
        username: ''
    }}, action) => {
    switch (action.type) {
        case 'USER_AUTH':
            return {user: {...action.payload}};
        default:
            return state;
    }
}