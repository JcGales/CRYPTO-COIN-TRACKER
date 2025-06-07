import React, { useContext, useEffect, useState } from 'react'
import './Homes.css'
import { CoinContext } from '../../context/CoinContext'
import { Link } from 'react-router-dom'
const Homes = () => {

  const {allCoin, currency} = useContext(CoinContext);
  const [displayCoin, setDisplayCoin] = useState([]);
  const [input, setInput] = useState('');

  const inputHandler = (e)=>{
    setInput(e.target.value);
    if(e.target.value === ""){
      setDisplayCoin(allCoin)
    }

  } 
  
  const searchHandler = async(e)=>{
  e.preventDefault()
  const coins =   await allCoin.filter((item)=>{
    return item.name.toLowerCase().includes(input.toLowerCase())
    })
    setDisplayCoin(coins)
  }

  useEffect(()=>{
    setDisplayCoin(allCoin);
  },[allCoin]);

  return (
  <div className='home'>
    <div className='hero'>
      <div className="hero-content">
        <h1 className="hero-title">
          <span className="gradient-text">CrytoPulse:</span>
          <span className="glow-text">Global Tracker</span>
        </h1>
        <p className="hero-subtitle">
          Track prices of 250+ coins in real time — safe, fast, and easy to use.
        </p>
        
        <form onSubmit={searchHandler} className="search-form">
          <div className="search-container">
            <input 
              type="text" 
              placeholder='Search Bitcoin, Ethereum, Solana...' 
              list='coinlist' 
              onChange={inputHandler} 
              value={input} 
              required
              className="search-input"
            />
            <datalist id='coinlist'>
              {allCoin.map((item, index) => (
                <option key={index} value={item.name}/>
              ))}
            </datalist>
            <button type='submit' className="search-button">
              <svg className="search-icon" viewBox="0 0 24 24">
                <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>

    <div className='crypto-table'>
      <div className='table-header'>
        <p>#</p>
        <p>Coin</p>
        <p>Price</p>
        <p>24h</p>
        <p className='market-cap'>Market Cap</p>
      </div>
      
      {displayCoin.slice(0, 10).map((item, index) => (
        <Link to={`/coin/${item.id}`} className='table-row' key={index}>
          <p className="rank">{item.market_cap_rank}</p>
          <div className="coin-info">
            <img src={item.image} alt={item.name} className="coin-icon" />
            <div>
              <p className="coin-name">{item.name}</p>
              <p className="coin-symbol">{item.symbol.toUpperCase()}</p>
            </div>
          </div>
          <p className="price">{currency.symbol}{item.current_price.toLocaleString()}</p>
          <p className={`change ${item.price_change_percentage_24h > 0 ? "green" : "red"}`}>
            {item.price_change_percentage_24h > 0 ? '+' : ''}
            {Math.floor(item.price_change_percentage_24h * 100) / 100}%
          </p>
          <p className='market-cap'>{currency.symbol}{item.market_cap.toLocaleString()}</p>
        </Link>
      ))}
    </div>
  </div>
)}
export default Homes