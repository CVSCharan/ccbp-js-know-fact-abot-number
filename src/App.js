import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [spinnerStatus, setSpinnerStatus] = useState(true);
  const [data, setData] = useState(
    "0 is the atomic number of the theoretical element tetraneutron."
  );
  const [number, setNumber] = useState(0);

  useEffect(() => {
    let url = "https://apis.ccbp.in/numbers-fact?number=" + number;
    console.log(url);
    let options = {
      method: "GET",
    };
    fetch(url, options)
      .then(function (response) {
        setSpinnerStatus(false);
        return response.json();
      })
      .then(function (jsonData) {
        setData(jsonData.fact);
      });
  }, [number]);

  const onChangeInput = (e) => {
    setNumber(e.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      console.log(event.target.value);
      setNumber(event.target.value);
    }
  };

  return (
    <div className="p-2 bg-container d-flex flex-column justify-content-center text-center">
      <h1 className="heading">
        Enter a number to know interesting facts about the number
      </h1>
      <input
        id="userInput"
        type="search"
        className="form-control user-input ml-auto mr-auto mt-4"
        placeholder="Enter a Number"
        onKeyPress={handleKeyPress}
      />
      {spinnerStatus && (
        <div className="spinner" id="spinner">
          <div className="d-flex flex-row justify-content-center mt-4">
            <div className="spinner-border" role="status"></div>
          </div>
        </div>
      )}
      <p id="fact" className="fact-text mt-4">
        {data}
      </p>
    </div>
  );
}

export default App;
