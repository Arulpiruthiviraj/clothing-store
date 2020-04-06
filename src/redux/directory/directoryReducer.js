import sections from "../../data/directoryData"

const INITIAL_STATE ={
    sections
}

function directoryReducer(state=INITIAL_STATE,action) {
    switch (action.type){
        default:
             return state;
    }
}

export default directoryReducer;