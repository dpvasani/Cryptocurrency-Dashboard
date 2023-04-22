import React, { useContext } from "react";
import { CryptoContext } from "../context/CryptoContext";
import selectIcon from "../assets/select-icon.svg";
import Pagination from "./Pagination";


/* sidebar contains crypto details such as CoinName, market cap,
and 24h price change, filter options like sorting and reset button */
 
export const SideBar = () => {
  const { cryptoData, setSortBy, resetFunction, currency } = useContext(CryptoContext);


  return (
    <div className="bg-gray-300 bg-opacity-10 backdrop-blur-md border border-gray-100 rounded-lg shadow-lg">
      <div data-testid="Sidebar-1">
        <p className="text-white text-md text-center mt-4 font-semibold">
          Cryptocurrency By Market Cap
        </p>
      </div>

      {/* user can sort between cryptocurrencies */}
      <label className="flex relative justify-end mt-2 items-center ">
        <select
          id="Sorting Options"
          name="sortby"
          onChange={(e) => setSortBy(e.target.value)}
          className="rounded text-white bg-gray-100 bg-opacity-30 backdrop-blur-md text-[14px] mr-20 pr-4 pl-2 py-0.5 capitalize focus:outline-0 cursor-pointer"
        >
          <option className="text-gray-600" value="">sortby</option>
          <option className="text-gray-600" value="market_cap_desc">market cap desc</option>
          <option className="text-gray-600" value="market_cap_asc">market cap asc</option>
          <option className="text-gray-600" value="volume_desc">volume desc</option>
          <option className="text-gray-600" value="volume_asc">volume asc</option>
          <option className="text-gray-600" value="id_desc">id desc</option>
          <option className="text-gray-600" value="id_asc">id asc</option>
          <option className="text-gray-600" value="gecko_desc">gecko desc</option>
          <option className="text-gray-600" value="gecko_asc">gecko asc</option>
        </select>
        <img
          src={selectIcon}
          alt="submit"
          className="w-[0.7rem] h-auto absolute 
          right-[5.2rem] pointer-events-none"
        />

      {/* user can reset the sidebar with reset button */}
      <button
          className="w-[1.6rem] flex absolute hover:scale-110 transition-all transition-ease"
          onClick={resetFunction}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            className="w-full h-full fill-gray-200"
            style={{
              msTransform: "rotate(360deg)",
              WebkitTransform: "rotate(360deg)",
              transform: "rotate(360deg)",
            }}
          >
            <path d="M12 16c1.671 0 3-1.331 3-3s-1.329-3-3-3-3 1.331-3 3 1.329 3 3 3z" />
            <path d="M20.817 11.186a8.94 8.94 0 0 0-1.355-3.219 9.053 9.053 0 0 0-2.43-2.43 8.95 8.95 0 0 0-3.219-1.355 9.028 9.028 0 0 0-1.838-.18V2L8 5l3.975 3V6.002c.484-.002.968.044 1.435.14a6.961 6.961 0 0 1 2.502 1.053 7.005 7.005 0 0 1 1.892 1.892A6.967 6.967 0 0 1 19 13a7.032 7.032 0 0 1-.55 2.725 7.11 7.11 0 0 1-.644 1.188 7.2 7.2 0 0 1-.858 1.039 7.028 7.028 0 0 1-3.536 1.907 7.13 7.13 0 0 1-2.822 0 6.961 6.961 0 0 1-2.503-1.054 7.002 7.002 0 0 1-1.89-1.89A6.996 6.996 0 0 1 5 13H3a9.02 9.02 0 0 0 1.539 5.034 9.096 9.096 0 0 0 2.428 2.428A8.95 8.95 0 0 0 12 22a9.09 9.09 0 0 0 1.814-.183 9.014 9.014 0 0 0 3.218-1.355 8.886 8.886 0 0 0 1.331-1.099 9.228 9.228 0 0 0 1.1-1.332A8.952 8.952 0 0 0 21 13a9.09 9.09 0 0 0-.183-1.814z" />
            <path fill="rgba(0, 0, 0, 0)" d="M0 0h24v24H0z" />
          </svg>
        </button>

        
      </label>
      
      <div>
        {cryptoData ? (
          <table className="w-full table-auto">
            <tbody>
              {cryptoData.map((cryptoData) => {
                return (
                  <div
                    key={cryptoData.id}
                    className="text-center text-lg border-b border-gray-100 hover:bg-gray-600 last:border-b-0"
                  >
                    <img
                      src={cryptoData.image}
                      alt={cryptoData.name}
                      className="flex absolute w-[1.1rem] h-[1.1rem] ml-3 mt-2"
                    />

                    <span className="flex flex-row pl-9 mt-2 text-[13px] font-semibold text-white">
                      {cryptoData.name}
                    </span>

                    <div className="flex flex-row justify-end mr-2">
                      <div
                        className={`text-[12px] font-semibold ${
                          cryptoData.market_cap_change_percentage_24h > 0
                            ? "text-green-500 "
                            : "text-orange-400 "
                        }`}
                      >
                        <i
                          className={`mr-1 text-xs ${
                            cryptoData.market_cap_change_percentage_24h > 0
                              ? "fa-solid fa-caret-up"
                              : "fa-solid fa-caret-down"
                          }`}
                        ></i>
                        <span>
                          {parseFloat(
                            cryptoData.market_cap_change_percentage_24h
                          ).toFixed(2)} %
                        </span>
                      </div>
                    </div>

                    <div className="-ml-9">
                      <span className="text-[11px] -mt-8 ml-3 text-gray-200 font-semibold flex pl-8 mx-4 mb-4 truncate">
                        Mkt.Cap{" "}
                        {new Intl.NumberFormat("en-IN", {
                          style: "currency" ,
                          currency: currency,
                        }).format(cryptoData.market_cap)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </tbody>
          </table>
        ) : null}
      </div>

      <Pagination />
    </div>
  );
};

export default SideBar;
