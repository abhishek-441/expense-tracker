import React, { useEffect, useState } from 'react'
import { LuPlus } from "react-icons/lu";
import { prepareExpenseLineChartData } from '../../utils/helper';
import CustomLineChart from '../Charts/CustomLineChart';

const ExpenseOverview = ({ transactions, onExpenseIncome }) => {
  const [chartData, SetChartData] = useState([]);

  useEffect(() => {
    const result = prepareExpenseLineChartData(transactions);
    SetChartData(result);
  
    return () => {}
  }, [transactions]);


//   useEffect(() => {
//   if (Array.isArray(transactions)) {
//     try {
//       const result = prepareExpenseLineChartData(transactions);
//       SetChartData(result);
//     } catch (err) {
//       console.error("Error preparing expense chart data:", err);
//       SetChartData([]); // fallback if helper crashes
//     }
//   } else {
//     SetChartData([]); // fallback if transactions is not an array
//   }

//   return () => {}
// }, [transactions]);


  
  return(
  <div className="card">
    <div className="flex items-center justify-between">
      <div className="">
        <h5 className="text-lg">Expense Overview</h5>
        <p className="text-xs text-gray-400 mt-0.5">
          Track your spending trends over time and gain insights into where your money goes.
        </p>
      </div>
      <button className="add-btn" onClick={onExpenseIncome}>
        <LuPlus className="text-lg" />
        Add Expense
      </button>
    </div>

    <div className="mt-10">
      <CustomLineChart data={chartData} />
    </div>
  </div>
  );
}

export default ExpenseOverview