import React, { useEffect, useContext, useState } from "react";
import { Line, Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { CryptoContext } from "../context/CryptoContext";
import selectIcon from "../assets/select-icon.svg";

Chart.register(...registerables);

//this component contains charts , dropdowns and buttons related to charts
export const CryptoChart = () => {
  const { currency, cryptoId } = useContext(CryptoContext);
  const [chartData, setChartData] = useState([]);
  const [days, setDays] = useState(2);
  const [id, setId] = useState("bitcoin");
  const [interval, setInterval] = useState([]);
  const [chartType, setChartType] = useState("LineChart");

  useEffect(() => {
    fetch(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}&interval=${interval}`
    ).then((response) => {
      const res = response.json();
      res.then((data) => {
        // console.log("chartData", data);
        setChartData(data.prices);
      });
    });
  }, [days, id, currency]);

  const ChartData = chartData.map((value) => ({
    x: value[0],
    y: value[1].toFixed(2),
  }));

  function oneDay() {
    setInterval((prevInterval) => "hourly");
    setDays((prevDays) => 1);
  }
  function oneWeek() {
    setDays((prevDays) => 7);
    setInterval((prevInterval) => "daily");
  }
  function oneMonth() {
    setDays((prevDays) => 30);
    setInterval((prevInterval) => "daily");
  }
  function sixMonths() {
    setDays((prevDays) => 180);
    setInterval((prevInterval) => "monthly");
  }
  function oneYear() {
    setDays((prevDays) => 365);
    setInterval((prevInterval) => "yearly");
  }

  return (
    <div className="container-fluid w-full h-96 border border-gray-100 bg-gray-200 bg-opacity-10 backdrop-blur-md my-5 rounded-lg shadow-sm px-4 pt-3 lg:mt-3">
      
      <div className="text-gray-300 flex py-0 pt-20 ml-4 absolute text-md font-semibold">
          {currency.toUpperCase()}
        </div>
      <div className="flex lg:gap-3 absolute items-center lg:ml-48 md:ml-16 sm:ml-28 ml-16 gap-2 lg:left-34 left-4 md:mt-3 lg:mt-3 sm:mt-3 mt-3">

        <button
          value={1}
          className={`px-3 py-1.5 ${
            days === 1 ? " border-white border text-black" : ""
          } rounded-md text-xs text-white bg-gray-100 bg-opacity-30 backdrop-blur-md font-semibold lg:mt-2`}
          onClick={oneDay}
        >
          1D
        </button>

        <button
          value={7}
          onClick={oneWeek}
          className={`px-3 py-1.5 ${
            days === 7 ? " border-white border text-black" : ""
          } rounded-md text-xs bg-gray-100 font-semibold lg:mt-2 text-white bg-opacity-30 backdrop-blur-md`}
        >
          1W
        </button>
        <button
          value={30}
          onClick={oneMonth}
          className={`px-3 py-1.5 ${
            days === 30 ? " border-white border text-black" : ""
          } rounded-md text-xs bg-gray-100 font-semibold lg:mt-2 text-white bg-opacity-30 backdrop-blur-md`}
        >
          1M
        </button>
        <button
          value={180}
          onClick={sixMonths}
          className={`px-3 py-1.5 ${
            days === 180 ? " border-white border text-black" : ""
          } rounded-md text-xs bg-gray-100 font-semibold lg:mt-2 text-white bg-opacity-30 backdrop-blur-md`}
          >
          6M
        </button>
        <button
          value={365}
          onClick={oneYear}
          className={`px-3 py-1.5 ${
            days === 365 ? " border-white border text-black" : ""
          } rounded-md text-xs bg-gray-100 font-semibold lg:mt-2 text-white bg-opacity-30 backdrop-blur-md`}
        >
          1Y
        </button>
        {/* this menu contains cryptocurrencies */}
        <div className="flex absolute items-center rounded-md bg-gray-100 text-white bg-opacity-30 backdrop-blur-md p-2 w-24 lg:left-[16rem] lg:mt-4 md:left-[25rem] md:mt-4 sm:right-[9rem] mt-20 ml-2">
          <select
            onChange={(e) => {
              setId(e.target.value);
            }}
            className="w-full bg-transparent text-transform: capitalize outline-none -mr-2"
          >
            {cryptoId &&
              Object.values(cryptoId).map((d, k) => (
                <option key={k} value={d.id} name={d.name} className="text-gray-600">
                  {d.id}
                </option>
              ))}
          </select>
          <span>
          <img src={selectIcon} alt="selecticon" className="w-[0.7rem] h-auto relative lg:right-[0.4rem] right-[0.4rem] sm:right-[0.4rem] pointer-events-none" />
          </span>
          {/* user can select different types of charts */}
          <div className="rounded-md bg-gray-100 bg-opacity-30 backdrop-blur-md text-white p-2 absolute lg:left-[6rem] md:left-[6rem] left-[6rem] w-28 ml-5">
            <select
              onChange={(e) => setChartType(e.target.value)}
              className="text-white bg-transparent outline-none w-full sm:justify-center"
            >
              <option className="text-gray-600" value={`LineChart`}>Line Chart</option>
              <option className="text-gray-600" value={`BarChart`}>Bar Chart</option>
              <option className="text-gray-600" value={`BarChartH`}>Bar Chart Horizontal</option>
             
            </select>
            <span className="absolute top-[0.9rem] right-[0.7rem] w-[0.7rem] h-auto">
          <img src={selectIcon} alt="selecticon" className="lg:right-[0.4rem] right-[0.4rem] sm:right-[0.4rem] pointer-events-none" />
          </span>
            
          </div>
        </div>
      </div>

      {chartType === "LineChart" ? (
        <div className="row mx-2">
          <div className="w-full h-[300px] my-8 mt-16 px-2">
            <Line
              height={500}
              datasetIdKey="id"
              data={{
                labels: ChartData.map((val) => {
                  let date = new Date(val.x);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()}PM`
                      : `${date.getHours()}:${date.getMinutes()}AM`;
                  return days === 1 ? time : date.toLocaleDateString("default",{
                    month:"short",
                    day: "numeric",
                    year : "numeric"
                  });
                }),
                datasets: [
                  {
                    spanGaps: true,
                    id: 1,
                    borderColor: "#FFA500",
                    backgroundColor: "#FFA500",
                    pointBorderColor: "transparent",
                    pointBorderWidth: 3,
                    pointRadius: 2,
                    label: `${id} in ${currency}`,
                    data: ChartData.map((val) => val.y),
                  },
                ],
              }}
              options={{
                color: "white",
                responsive: true,
                indexAxis: "x",
                tension: 0.01,
                scales: {
                  x: {
                    grid: {
                      display: false,
                      drawBorder: false,
                      borderDash: [6],
                      border: false,
                    },
                    ticks: {
                      source: "auto",
                      maxTicksLimit: 20,
                      font: {
                        size: "10px",
                      },
                      color: "white",
                    },
                  },
                  y: {
                    grid: {
                      border: false,
                      drawBorder: false,
                    },
                    ticks : {
                      color : "white"
                    }
                  },
                },
                plugins: {
                  tooltip: {
                    displayColors: false,
                    backgroundColor: "gray",
                  },
                  legend: {
                    display: true,
                    align : "end",
                    labels: {
                      color : "white",
                      pointStyleWidth : 15,
                      usePointStyle: true,
                      pointStyle: "circle",
                      padding: 2,
                    },
                  },
                  title: {
                    display: true,
                  },
                },
                maintainAspectRatio: false,
              }}
            />
          </div>
        </div>
      ) : chartType === "BarChart" ? (
        <div className="row mx-2">
          <div
            className="w-full h-[400px] my-10 px-2 mt-16"
            style={{ height: 290 }}
          >
            <Bar
              data={{
                labels: ChartData.map((val) => {
                  let date = new Date(val.x);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()}PM`
                      : `${date.getHours()}:${date.getMinutes()}AM`;
                  return days === 1 ? time : date.toLocaleDateString("default",{
                    month:"short",
                    day: "numeric",
                    year : "numeric"
                  });
                }),
                datasets: [
                  {
                    label: `${id} in ${currency}`,
                    data: ChartData.map((val) => val.y),
                    borderColor: "#FFA500",
                    backgroundColor: "#FFA500",
                  },
                ],
              }}
              options={{
                responsive: true,
                indexAxis: "x",
                scales: {
                  x: {
                    grid: {
                      display: false,
                    },
                    ticks: {
                      maxTicksLimit: 20,
                      color : "white",
                    },
                  },
                  y : {
                    ticks : {
                      color : "white",
                    }
                  }
                },
                plugins: {
                  legend: {
                    display: true,
                    align: "end",
                      labels: {
                        color : "white",
                        pointStyleWidth : 15,
                        usePointStyle: true,
                        pointStyle: "circle",
                        padding: 5,
                      },
                  },
                  title: {
                    display: true,
                  },
                },
                maintainAspectRatio: false,
              }}
            />
          </div>
        </div>
      ) : (
        <div className="row mx-2">
          <div
            className="w-full h-[300px] my-10 px-8 mt-16"
            style={{ height: 290 }}
          >
            <Bar
              data={{
                labels: ChartData.map((val) => {
                  let date = new Date(val.x);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()}PM`
                      : `${date.getHours()}:${date.getMinutes()}AM`;
                  return days === 1 ? time : date.toLocaleDateString("default",{
                    month:"short",
                    day: "numeric",
                    year : "numeric"
                  });
                }),
                datasets: [
                  {
                    label: `${id} in ${currency}`,
                    data: ChartData.map((val) => val.y),
                    borderColor: "#FFA500",
                    backgroundColor: "#FFA500",
                  },
                ],
              }}
              options={{
                indexAxis: "y",
                elements: {
                  bar: {
                    borderWidth: 2,
                  },
                },
                responsive: true,
                scales: {
                  x: {
                    grid: {
                      display: false,
                    },
                    ticks : {
                      color : "white",
                    }
                  },
                  y: {
                    ticks : {
                      color : "white",
                    }
                  }
                },
                plugins: {
                    legend: {
                      display: true,
                      align: "end",
                      labels: {
                        color : "white",
                        pointStyleWidth : 15,
                        usePointStyle: true,
                        pointStyle: "circle",
                        padding: 4,
                      },
                  },
                  title: {
                    display: true,
                  },
                },
                maintainAspectRatio: false,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
