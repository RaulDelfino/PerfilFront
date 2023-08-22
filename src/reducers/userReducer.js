const stateInitial = {
    token: null
}

export default function tokenReducer(state = stateInitial, action){
    switch(action.type){
        case "LOGIN":
            console.log(state)
            return {...state , token: action.payload} 
        case "LOGOUT":
            return {...state , token: null}
        default: 
            return state
    }
}