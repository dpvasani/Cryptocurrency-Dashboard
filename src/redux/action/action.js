import axios from "axios";
import actionTypes from "./types";

// fetchCoins action 
export const fetchCoins = () => {
      return (dispatch) => {
          axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&page=1&per_page=9`)
          .then(response =>{
              const data = response.data
              dispatch({
                type: actionTypes.COIN_API_SUCCESS,
                payload: data
              })
          })
          .catch(error =>{
              const errorMsg = error.message
              dispatch({
                type: actionTypes.COIN_API_ERROR,
                payload : errorMsg
              })
          })
      }
  }

// exchange rate action
export const fetchCoinList = () => {
  return (dispatch) => {
    axios.get('https://api.coingecko.com/api/v3/exchange_rates')
    .then(response =>{
      const data = response.data
      dispatch({
        type: actionTypes.EXCHANGE_SUCCESS,
        payload: data
      })
    })
      .catch(error => {
        const errorMsg = error.message 
        dispatch({
          type: actionTypes.EXCHANGE_ERROR,
          payload: errorMsg  
      })
    })
  }
}

