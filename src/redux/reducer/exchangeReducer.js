import actionTypes from "../action/types";

const initialState = {
    projectName:"Crypto Exchange",
    coinList:  [],
}

const exchangeReducer = (state=initialState, action) => {

    switch(action.type) {

        case actionTypes.EXCHANGE_SUCCESS:
            return {
                ...state,
                coinList : action.payload
            }

        case actionTypes.EXCHANGE_ERROR:
            alert(action.payload)
            return state

        default: return state
    }
}

export default exchangeReducer;