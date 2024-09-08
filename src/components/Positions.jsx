import React, {useState, useEffect} from "react";
import axios, { all } from "axios";

import { positions } from "../data/data";

const Positions = () => {

  const [allPositions, setAllPositions] = useState([]);

  useEffect(() => {
    axios.get("https://zerodha-31vm.onrender.com/allPositions").then((result) =>{
      console.log(result.data);
      setAllPositions(result.data);
    })
  }, [])


  return (
    <>
      <h3 className="title">Positions ({allPositions.length})</h3>

      <div className="order-table">
        <table>
          <tr>
            <th>Product</th>
            <th>Instrument</th>
            <th>Qty.</th>
            <th>Avg.</th>
            <th>LTP</th>
            <th>P&L</th>
            <th>Chg.</th>
          </tr>
          {allPositions.map((stocks, index) =>{
            const curValue = stocks.price * stocks.qty;
            const isProfit = curValue - stocks.avg * stocks.qty >= 0.0;
            const profitClass = isProfit ? "profit" : "loss";
            const dayClass = stocks.isLoss ? "loss" :"profit";

            return(
              <tr key={index}>
            <td>{stocks.product}</td>
            <td>{stocks.name}</td>
            <td>{stocks.qty}</td>
            <td>{stocks.avg.toFixed(2)}</td>
            <td>{stocks.price.toFixed(2)}</td>
            <td className={profitClass}>{(curValue - stocks.avg * stocks.qty).toFixed(2)}</td>
            <td className={dayClass}>{stocks.day}</td>
          </tr>
            )

          })}
        </table>
      </div>
    </>
  );
};

export default Positions;
