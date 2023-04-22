import debounce from "lodash.debounce";
import React, { useContext, useRef, useState } from "react";
import { CryptoContext } from "../context/CryptoContext";
import selectIcon from "../assets/select-icon.svg";
import "../App.css";

// user can search cryptos which will result in sidebar
const SearchInput = ({ handleSearch }) => {
  const [searchText, setSearchText] = useState("");
  const { searchData, setCoinSearch, setSearchData } =  useContext(CryptoContext);

  let handleInput = (e) => {
    e.preventDefault();
    let query = e.target.value;
    setSearchText(query);
    handleSearch(query);
  };

  const selectCoin = (coin) => {
    setCoinSearch(coin);
    setSearchText("");
    setSearchData();
  };

  return (
    <>
      <form className="flex pl-2 w-full font-body">
        <div className="flex flex-grow rounded-sm shadow-md">
          <div className="flex flex-grow items-center text-white">
            <span className="absolute text-[13px] lg:text-[13px] sm:text-[12px] md:text-[14px] ml-6 z-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2em"
                height="2em"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 24 24"
              >
                <path
                  fill="white"
                  d="m18.031 16.617l4.283 4.282l-1.415 1.415l-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9s9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7c-3.868 0-7 3.132-7 7c0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z"
                />
              </svg>
            </span>
            <input
              type="search"
              name="searchText"
              id="searchTextDesktop"
              required
              value={searchText}
              onChange={handleInput}
              className="flex border border-gray-100 shadow-lg focus:ring-1 bg-white bg-opacity-10 backdrop-blur-md
               md:text-md sm:text-md w-full pl-14 py-3 pr-2 p rounded-lg overflow-hidden focus-within:shadow-none outline-none sm:items-center"
              placeholder="Search by coin"
            />
          </div>
        </div>
      </form>
      {searchText.length > 0 ? (
        <ul
        id="searchbar"
          className="absolute top-14 -right-2 w-full h-96 mr-2 rounded
overflow-x-hidden py-2 bg-gray-300 bg-opacity-60 overflow-scroll scrollbar-thin
backdrop-blur-md z-10
"
        >
          {searchData ? (
            searchData.map((coin) => {
              return (
                <li
                  className="flex items-center ml-4 my-2 cursor-pointer"
                  key={coin.id}
                  onClick={() => selectCoin(coin.id)}
                >
                  <img className="w-[1rem] h-[1rem] mx-1.5" src={coin.thumb} />

                  <span>{coin.id}</span>
                </li>
              );
            })
          ) : (
            <div className="w-full h-full mt-8 flex justify-center items-center">
              <div
                className="w-8 h-8 flex border-4 border-gray-600 rounded-full border-b-gray-200 animate-spin"
                role="status"
              />
              <span className="ml-2 font-semibold">Searching...</span>
            </div>
          )}
         <div className="w-full h-full mt-4 flex justify-center items-center font-semibold">Not found</div>
        </ul>
      ) : null }
    </>
  );
};

export const SearchBar = () => {
  const { getSearchResult, setCurrency, currency } = useContext(CryptoContext);
  const currencyRef = useRef();

  const handleCurrency = (e) => {
    e.preventDefault();
    let val = currencyRef.current.value;
    setCurrency(val);
    currencyRef.current.value = "";
  };

  /* lodash debounce function returns a debounced function 
  that when called will execute a function after X milliseconds pass since its last execution. */
  
  const debounceFunc = debounce(function (val) {
    getSearchResult(val);
  }, 2000);

  return (
    <>
      <div className="flex">
        <span className="flex shadow-md rounded-lg">
          <select
            value={currency}
            onChange={handleCurrency}
            ref={currencyRef}
            className="border border-gray-100 text-gray-100 outline-none font-body pr-3 pl-2 rounded-lg w-[90px] md:w-[90px] sm:w-[90px] cursor-pointer bg-white bg-opacity-10 backdrop-blur-md z-1"
          >
            <option className="text-gray-600" value={"usd"}>USD</option>
            <option className="text-gray-600" value={"inr"}>INR</option>
            <option className="text-gray-600" value={"eur"}>EUR</option>
            <option className="text-gray-600" value={"jpy"}>JPY</option>
            <option className="text-gray-600" value={"aud"}>AUD</option>
            <option className="text-gray-600" value={"nzd"}>NZD</option>
            <option className="text-gray-600" value={"cad"}>CAD</option>
            <option className="text-gray-600" value={"gbp"}>GBP</option>
          </select>
          <img
          src={selectIcon}
          alt="submit"
          className=" w-[0.7rem] relative h-[1rem] top-4 right-[0.9rem] cursor-pointer"
        />
          
        </span>
        

        <div className="relative w-full">
          <SearchInput handleSearch={debounceFunc} />
        </div>
      </div>
    </>
  );
};
