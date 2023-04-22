import React, { useContext } from "react";
import paginationArrow from "../assets/pagination-arrow.svg";
import { CryptoContext } from "../context/CryptoContext";


//pagination component resides in the sidebar component 
const Pagination = () => {
  const { cryptoData } = useContext(CryptoContext);

  const { totalPages, page, setPage, perPage } = useContext(CryptoContext);

  const TotalNumber = Math.ceil(totalPages / perPage);

  const next = () => {
    if (page === TotalNumber) {
      return null;
    } else {
      setPage(page + 1);
    }
  };

  const prev = () => {
    if (page === 1) {
      return null;
    } else {
      setPage(page - 1);
    }
  };

  const multiStepNext = () => {
    if (page + 3 >= TotalNumber) {
      setPage(TotalNumber - 1);
    } else {
      setPage(page + 3);
    }
  };

  const multiStepPrev = () => {
    if (page - 3 <= 1) {
      setPage(TotalNumber + 1);
    } else {
      setPage(page - 2);
    }
  };

  if (cryptoData && cryptoData.length >= perPage) {
    return (
      <div className="flex items-center justify-center">
        <ul className="flex items-center justify-end text-sm">
          <li className="flex items-center">
            <button className="outline-0 hover:text-cyan w-8" onClick={prev}>
              <img
                className="w-full h-auto rotate-180"
                src={paginationArrow}
                alt="left"
              />
            </button>
          </li>

          {page - 1 !== TotalNumber && page === TotalNumber ? (
            <li>
              {" "}
              <button
                onClick={multiStepPrev}
                className="ouline-0 hover:text-blue-300  rounded-full w-8 h-8 flex items-center justify-center text-lg    "
              >
                ...
              </button>
            </li>
          ) : null}

          {page - 1 !== 0 ? (
            <li>
              <button
                onClick={prev}
                className="ouline-0 hover:text-blue-300  rounded-full w-8 h-8 flex items-center justify-center bg-gray-200 mx-1.5"
              >
                {" "}
                {page - 1}{" "}
              </button>
            </li>
          ) : null}
          <li>
            <button
              disabled
              className="ouline-0 rounded-full w-8 h-8 flex items-center justify-center bg-blue-300 text-black mx-1.5"
            >
              {page}
            </button>
          </li>

          {page + 1 !== TotalNumber && page !== TotalNumber ? (
            <li>
              <button
                onClick={next}
                className="ouline-0 hover:text-blue-300  rounded-full w-8 h-8 flex items-center justify-center bg-gray-200 mx-1.5"
              >
                {page + 1}
              </button>
            </li>
          ) : null}

          {page + 1 !== TotalNumber && page !== TotalNumber ? (
            <li>
              {" "}
              <button
                onClick={multiStepNext}
                className="ouline-0 hover:text-blue-300  rounded-full w-8 h-8 flex items-center justify-center text-lg text-white"
              >
                ...
              </button>
            </li>
          ) : null}

          {page !== TotalNumber ? (
            <li>
              <button
                onClick={() => setPage(TotalNumber)}
                className="ouline-0 hover:text-blue-300  rounded-full w-8 h-8 flex items-center justify-center bg-gray-200 mx-1.5"
              >
                {TotalNumber}
              </button>
            </li>
          ) : null}
          <li>
            <button className="outline-0 hover:text-cyan w-8" onClick={next}>
              <img
                className="w-full h-auto"
                src={paginationArrow}
                alt="right"
              />
            </button>
          </li>
        </ul>
      </div>
    );
  } else {
    return null;
  }
};

export default Pagination;
