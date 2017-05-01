const initialState = {
    messages: []
}

export default function messageReducer(state=initialState, action) {
    switch (action.type) {
        case 'ADD_MESSAGE':
            return {...state, messages: [...state.messages, action.message]}

        case 'LOGIN':
            return{...state, username: action.username}
             
        default:
            return state
    }
}