import React, { useState, useEffect } from "react";
import axios, { all } from "axios";
import { VerticalGraph } from "./VerticalGraph";
// import { holdings } from "../data/data";

// import { holdings } from "../data/data";

const Holdings = () => {

  const [allHoldings, setAllHoldings] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3002/allHoldings").then((result) =>{
      console.log(result.data);
      setAllHoldings(result.data);
    })
  }, [])

  const labels = allHoldings.map((subArray) => subArray["name"]);

  const data = {
    labels,
    datasets: [
      {
        label: "Stock Price",
        data: allHoldings.map((stock) => stock.price),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  
  return (
    <>
      <h3 className="title">Holdings ({allHoldings.length})</h3>

      <div className="order-table">
        <table>
          <tr >
            <th>Instrument</th>
            <th>Qty.</th>
            <th>Avg. cost</th>
            <th>LTP</th>
            <th>Cur. val</th>
            <th>P&L</th>
            <th>Net chg.</th>
            <th>Day chg.</th>
          </tr>

          {allHoldings.map((stocks, index) =>{
            const curValue = stocks.price * stocks.qty;
            const isProfit = curValue - stocks.avg * stocks.qty >= 0.0;
            const profitClass = isProfit ? "profit" : "loss";
            const dayClass = stocks.isLoss ? "loss" :"profit";

            return(
              <tr key={index}>
            <td>{stocks.name}</td>
            <td>{stocks.qty}</td>
            <td>{stocks.avg.toFixed(2)}</td>
            <td>{stocks.price.toFixed(2)}</td>
            <td>{curValue.toFixed(2)}</td>
            <td className={profitClass}>{(curValue - stocks.avg * stocks.qty).toFixed(2)}</td>
            <td className={profitClass}>{stocks.net}</td>
            <td className={dayClass}>{stocks.day}</td>
          </tr>
            )

          })}
        </table>
      </div>

      <div className="row">
        <div className="col">
          <h5>
            29,875.<span>55</span>{" "}
          </h5>
          <p>Total investment</p>
        </div>
        <div className="col">
          <h5>
            31,428.<span>95</span>{" "}
          </h5>
          <p>Current value</p>
        </div>
        <div className="col">
          <h5>1,553.40 (+5.20%)</h5>
          <p>P&L</p>
        </div>
      </div>
      <VerticalGraph data={data} />
    </>
  );
};

export default Holdings;
