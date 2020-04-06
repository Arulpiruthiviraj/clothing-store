import ShopData from "../../data/shopData"

const INITIAL_STATE ={
    collections:ShopData
}

function shopReducer(state=INITIAL_STATE,action) {
    switch (action.type){
        default:
             return state;
    }
}

export default shopReducer;