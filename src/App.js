import React, { useState } from "react";

function App() {
  const [date, setDate] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [message, setMessage] = useState("Fill the inputs to proceed");
  const [correct, setCorrect] = useState(true);
  const [isDisplay, setIsDisplay] = useState(false);
  const [result, setResult] = useState("");

  const d = new Date();

  function checkInput() {
    setIsDisplay(false);
    if (date.length !== 2 || date > 31 || date < 1)
      setMessage("Error in date: should be between 1 - 31");
    else if (month.length !== 2 || month > 12 || month < 1)
      setMessage("Error in month: should be between 1 - 12");
    else if (year.length !== 4 || year > 2024 || year < 0)
      setMessage("Error in year : should be between 0 - 2024");
    else {
      setMessage("Select from the given options");
      setCorrect(false);
    }
  }

  function clearInput() {
    setDate("");
    setMonth("");
    setYear("");
    setMessage("Fill the inputs to proceed");
    setCorrect(true);
    setIsDisplay(false);
  }

  const d2 = new Date(`${month}/${date}/${d.getFullYear()}`);
  const d3 = new Date(`${month}/${date}/${year}`);

  //
  //
  //

  const tsecond = Math.round((d.getTime() - d3.getTime()) / 1000);
  const tmin = Math.round(tsecond / 60);
  const thour = Math.round(tmin / 60);
  const tdays = Math.round(thour / 24);
  const totalDaysYear =
    Math.round((d.getTime() - d2.getTime()) / (1000 * 3600 * 24)) - 1;

  let tyear = d.getFullYear() - year;
  let monthInYr = d.getMonth() - month + 1;

  if (monthInYr <= 0) {
    if (date > d.getDate()) monthInYr = 12 - month;
    else monthInYr = 12 - month + 1;
    tyear = tyear - 1;
  } else {
    monthInYr = d.getMonth() - month;
  }

  if (monthInYr === 12) {
    monthInYr = 0;
    tyear = tyear + 1;
  }
  let totalMonth = tyear * 12 + monthInYr;

  if (Number(date) === d.getDate() && monthInYr === 12) monthInYr = 0;

  const leapYear = d.getFullYear() - (1 % 4) === 0;

  const totalDaysInYear =
    totalDaysYear < 0
      ? leapYear
        ? 366 + totalDaysYear
        : 365 + totalDaysYear
      : totalDaysYear;

  let totalDaysInMonth =
    d.getDate() > date ? d.getDate() - date : d.getDate() + 31 - date;

  function calcAge(option) {
    if (option === "ym") {
      setResult(`${tyear} Years and ${monthInYr} Months`);
    } else if (option === "yd") {
      setResult(`${tyear} Years and ${totalDaysInYear} Days`);
    } else if (option === "md") {
      setResult(
        `${totalMonth} Months and ${
          totalDaysInMonth === 31 ? 0 : totalDaysInMonth
        } Days`
      );
    } else if (option === "ty") {
      setResult(`${tyear} Years`);
    } else if (option === "tm") {
      setResult(`${totalMonth} Months`);
    } else if (option === "td") {
      setResult(`${tdays} Days`);
    } else if (option === "th") {
      setResult(`${thour} Hours`);
    } else if (option === "tmin") {
      setResult(`${tmin} Minutes`);
    } else if (option === "ts") {
      setResult(`${tsecond} Seconds`);
    } else if (option === "aa") {
      setResult(
        `${tyear} Years, ${monthInYr} months, ${
          totalDaysInMonth === 31 ? 0 : totalDaysInMonth
        } Days ,${d.getHours()} hours, ${d.getMinutes()} Minutes and ${d.getSeconds()} seconds`
      );
    }
    setIsDisplay(true);
  }

  return (
    <div className="container">
      <h1>CalcAge</h1>
      <div className="clock">
        <div className="inputCheck">
          <div className="DOB">
            <p className="font-normal text-center text-3xl">Enter DOB</p>
            <div className="flex justify-center align-middle">
              <div className="date">
                <label>Date</label>
                <input
                  className="input"
                  type="text"
                  placeholder="dd"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div className="date">
                <label>Month</label>
                <input
                  className="input"
                  type="text"
                  placeholder="mm"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                />
              </div>
              <div className="date">
                <label>Year</label>
                <input
                  className="input"
                  type="text"
                  value={year}
                  placeholder="yyyy"
                  onChange={(e) => setYear(e.target.value)}
                />
              </div>
            </div>

            <div className="btnGroup">
              <button onClick={() => checkInput()} className="btn">
                Submit
              </button>
              <button onClick={() => clearInput()} className="btn">
                Clear
              </button>
            </div>
          </div>
          <p
            className={`message p-2 mb-1 rounded-xl text-2xl m-auto w-[50%] bg-[#0000002f] ${
              message.includes("Error") ? "text-red-500" : "text-lime-400"
            }`}
          >
            {message}
          </p>
        </div>
        <div className="mainComp">
          {isDisplay ? (
            <ResultDisplay
              result={result}
              isDisplay={isDisplay}
              setIsDisplay={setIsDisplay}
            />
          ) : (
            <ResultContainer correct={correct} calcAge={calcAge} />
          )}
        </div>
      </div>
    </div>
  );
}

function ResultDisplay({ result, setIsDisplay }) {
  return (
    <div className={`resultDisplayContainer w-[80%] md:w-[50%]`}>
      <button
        onClick={() => setIsDisplay(false)}
        className="cross text-xl font-bold h-fit w-full rounded-full"
      >
        X
      </button>
      <p>{result}</p>
    </div>
  );
}

function ResultContainer({ correct, calcAge }) {
  return (
    <div className="resultContainer ">
      <button disabled={correct} onClick={() => calcAge("ym")} className="btn">
        Year/Month
      </button>
      <button
        disabled={correct}
        className={`btn ${correct ? "disable_btn" : ""}`}
        onClick={() => calcAge("yd")}
      >
        Year/Days
      </button>
      <button
        disabled={correct}
        className={`btn ${correct ? "disable_btn" : ""}`}
        onClick={() => calcAge("md")}
      >
        Month/Days
      </button>
      <button
        disabled={correct}
        className={`btn ${correct ? "disable_btn" : ""}`}
        onClick={() => calcAge("ty")}
      >
        Total Year
      </button>
      <button
        disabled={correct}
        className={`btn ${correct ? "disable_btn" : ""}`}
        onClick={() => calcAge("tm")}
      >
        Total Month
      </button>
      <button
        disabled={correct}
        className={`btn ${correct ? "disable_btn" : ""}`}
        onClick={() => calcAge("td")}
      >
        Total Days
      </button>
      <button
        disabled={correct}
        className={`btn ${correct ? "disable_btn" : ""}`}
        onClick={() => calcAge("th")}
      >
        Total Hours
      </button>
      <button
        disabled={correct}
        className={`btn ${correct ? "disable_btn" : ""}`}
        onClick={() => calcAge("tmin")}
      >
        Total Minutes
      </button>
      <button
        disabled={correct}
        className={`btn ${correct ? "disable_btn" : ""}`}
        onClick={() => calcAge("ts")}
      >
        Total Seconds
      </button>
      <button
        disabled={correct}
        className={`btn ${correct ? "disable_btn" : ""}`}
        onClick={() => calcAge("aa")}
      >
        Actual Age
      </button>
    </div>
  );
}

export default App;
