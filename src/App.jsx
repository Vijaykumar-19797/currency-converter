import { useState } from "react"
import "./App.css"
import { useEffect } from "react"
import axios from "axios"

function App() {
  const [amount,setAmount] = useState(1)
  const [fromCurrency,setFromCurrency] = useState("USD")
  const [toCurrency,setToCurrency] = useState("INR")
  const [convertedAmount,setConvertedAmount] = useState(null)
  const [exchangeRate,setExchangeRate] = useState(null)
  useEffect(()=> {
    const getExchangeRate = async () => {
      try{
        let url = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
        const res = await axios.get(url)
        setExchangeRate(res.data.rates[toCurrency])
        //console.log(res)
      }catch(err){
        console.log(err)
      }
    }
    getExchangeRate()
  },[fromCurrency,toCurrency])

  useEffect(() => {
    if(exchangeRate!=null){
      setConvertedAmount((amount*exchangeRate).toFixed(2))
    }
  },[amount,exchangeRate])

  return (
      <>
       <div className="currency-converter" >
        <div className="box"></div>
        <div className="data">
          <h1>Currency Converter</h1>
          <div className="input-container">
            <label htmlFor="amt">Amount:</label>
            <input type="number" id="amt" value={amount} onChange={e => setAmount(isNaN(e.target.value)?0:e.target.value)}/>
          </div>
          <div className="input-container">
            <label htmlFor="fromCurrency">From Currency:</label>
            <select id="fromCurrency" value={fromCurrency} onChange={e => setFromCurrency(e.target.value)}>
              <option value="USD">USD - United States Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - British Pound Sterling</option>
              <option value="JPY">JPY - Japanese Yen</option>
              <option value="AUD">AUD - Australian Dollar</option>
              <option value="CAD">CAD - Canadian Dollar</option>
              <option value="CNY">CNY - Chinese Yuan</option>
              <option value="INR">INR - Indian Rupee</option>
              <option value="BRL">BRL - Brazilian Real</option>
              <option value="ZAR">ZAR - South African Rand</option>
            </select>
          </div>
          <div className="input-container">
            <label htmlFor="toCurrency">To Currency:</label>
            <select id="toCurrency" value={toCurrency} onChange={e => setToCurrency(e.target.value)}>
              <option value="USD">USD - United States Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - British Pound Sterling</option>
              <option value="JPY">JPY - Japanese Yen</option>
              <option value="AUD">AUD - Australian Dollar</option>
              <option value="CAD">CAD - Canadian Dollar</option>
              <option value="CNY">CNY - Chinese Yuan</option>
              <option value="INR">INR - Indian Rupee</option>
              <option value="BRL">BRL - Brazilian Real</option>
              <option value="ZAR">ZAR - South African Rand</option>
            </select>
          </div>
          <div className="result">
            <p>{amount} {fromCurrency} is equal to {convertedAmount} {toCurrency}</p>
          </div>
        </div>
       </div>
      </>
  )
}

export default App
