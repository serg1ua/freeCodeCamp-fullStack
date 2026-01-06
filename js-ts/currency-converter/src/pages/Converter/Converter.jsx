import { useState, useEffect, useMemo } from "react";
import "./styles.css";

const currenciesRates = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.78,
  JPY: 156.7,
};

const currencies = Object.keys(currenciesRates);

function Converter() {
  const [amount, setAmount] = useState(1);
  const [start, setStart] = useState(currencies[0]);
  const [target, setTarget] = useState(currencies[1]);
  const [result, setResult] = useState("");

  const calculate = (startAmount, fromCurrency, toCurrency) => {
    if (!amount || amount < 0) {
      return;
    }
    return (
      (Number(startAmount) / currenciesRates[fromCurrency]) *
      currenciesRates[toCurrency]
    ).toFixed(2);
  };

  const convertedAmount = useMemo(() => calculate(amount, start, target), [amount, start]);

  useEffect(() => {
    setResult(convertedAmount);
  }, [convertedAmount]);

  return (
    <div className="converter-container">
      <h2 className="currency-converter-title">Currency Converter</h2>
      <section>
        <div className="inputs">
          <label htmlFor="amount">
            {" "}
            {start} to {target} Conversion
          </label>
          <input
            min={0}
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value.trim())}
            required
          />
        </div>
        <div className="inputs">
          <label htmlFor="start">Start Conversion</label>
          <select
            id="start"
            defaultValue={start}
            required
            onChange={(e) => setStart(e.target.value.trim())}
          >
            {currencies.map((curr) => (
              <option key={curr} value={curr}>
                {curr}
              </option>
            ))}
          </select>
        </div>
        <div className="inputs">
          <label htmlFor="target">Target Conversion</label>
          <select
            id="target"
            defaultValue={target}
            required
            onChange={(e) => {
              const targetCurrency = e.target.value.trim();
              setTarget(targetCurrency);
              setResult(calculate(amount, start, targetCurrency));
            }}
          >
            {currencies.map((curr) => (
              <option key={curr} value={curr}>
                {curr}
              </option>
            ))}
          </select>
        </div>
      </section>
      <section>
        <p>
          Converted Amount:{result && <span> {result} </span>}
          {target}
        </p>
      </section>
    </div>
  );
}

export default Converter;
