import {userActionTypes} from './userTypes'


const INITIAL_STATE ={
    currentUser:null,
}

function userReducer(state=INITIAL_STATE,action) {
    switch (action.type){
        case userActionTypes.SET_CURRENT_USER:
            return{
                ...state,
                currentUser:action.payload
            }
        default:
             return state;
    }
}


export default userReducer;