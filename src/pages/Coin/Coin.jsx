import React, { useContext, useEffect, useState } from 'react'
import './Coin.css'
import { useParams } from 'react-router-dom'
import { CoinContext } from '../../context/CoinContext'
import LineChart from '../../components/LineChart/LineChart'

const Coin = () => {
  const { coinId } = useParams()
  const [coinData, setCoinData] = useState()
  const [historicalData, setHistoricalData] = useState()
  const { currency } = useContext(CoinContext)
  const [activeTimeframe, setActiveTimeframe] = useState('7')

  const fetchCoinData = async () => {
    const options = {
      method: 'GET',
      headers: { accept: 'application/json', 'x-cg-demo-api-key': 'API_KEY_HERE' }
    };

    try {
      const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
      const data = await response.json()
      setCoinData(data)
    } catch (err) {
      console.error(err)
    }
  }

  const fetchHistoricalData = async (days = '7') => {
    const options = {
      method: 'GET',
      headers: { accept: 'application/json', 'x-cg-demo-api-key': 'API_KEY_HERE' }
    };

    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=${days}`,
        options
      )
      const data = await response.json()
      setHistoricalData(data)
    } catch (err) {
      console.error(err)
    }
  }

  const handleTimeframeChange = (days) => {
    setActiveTimeframe(days)
    fetchHistoricalData(days)
  }

  useEffect(() => {
    fetchCoinData()
    fetchHistoricalData(activeTimeframe)
  }, [currency])

  if (coinData && historicalData) {
    const priceChange24h = coinData.market_data.price_change_percentage_24h
    const priceChangeColor = priceChange24h >= 0 ? '#10b981' : '#ef4444'

    return (
      <div className='coin-page'>
        {/* Header Section */}
        <div className='coin-header'>
          <div className='coin-identity'>
            <img src={coinData.image.large} alt={coinData.name} className='coin-logo' />
            <div>
              <h1 className='coin-name'>{coinData.name} <span className='coin-symbol'>{coinData.symbol.toUpperCase()}</span></h1>
              <div className='coin-rank'>
                Rank #{coinData.market_cap_rank}
              </div>
            </div>
          </div>
          
          <div className='coin-price'>
            <div className='current-price'>
              {currency.symbol}{coinData.market_data.current_price[currency.name].toLocaleString()}
            </div>
            <div className='price-change' style={{ color: priceChangeColor }}>
              {priceChange24h >= 0 ? '+' : ''}{priceChange24h.toFixed(2)}% (24h)
            </div>
          </div>
        </div>

        {/* Chart Section */}
        <div className='chart-container'>
          <div className='chart-timeframes'>
            {['1', '7', '30', '90', '365'].map((days) => (
              <button
                key={days}
                className={`timeframe-btn ${activeTimeframe === days ? 'active' : ''}`}
                onClick={() => handleTimeframeChange(days)}
              >
                {days}D
              </button>
            ))}
          </div>
          <div className='chart-wrapper'>
            <LineChart historicalData={historicalData} />
          </div>
        </div>

        {/* Stats Grid */}
        <div className='stats-grid'>
          <div className='stat-card'>
            <div className='stat-label'>Market Cap</div>
            <div className='stat-value'>
              {currency.symbol}{coinData.market_data.market_cap[currency.name].toLocaleString()}
            </div>
          </div>
          
          <div className='stat-card'>
            <div className='stat-label'>24h Trading Volume</div>
            <div className='stat-value'>
              {currency.symbol}{coinData.market_data.total_volume[currency.name].toLocaleString()}
            </div>
          </div>
          
          <div className='stat-card'>
            <div className='stat-label'>24h High</div>
            <div className='stat-value'>
              {currency.symbol}{coinData.market_data.high_24h[currency.name].toLocaleString()}
            </div>
          </div>
          
          <div className='stat-card'>
            <div className='stat-label'>24h Low</div>
            <div className='stat-value'>
              {currency.symbol}{coinData.market_data.low_24h[currency.name].toLocaleString()}
            </div>
          </div>
          
          <div className='stat-card'>
            <div className='stat-label'>Circulating Supply</div>
            <div className='stat-value'>
              {coinData.market_data.circulating_supply.toLocaleString()} {coinData.symbol.toUpperCase()}
            </div>
          </div>
          
          <div className='stat-card'>
            <div className='stat-label'>All Time High</div>
            <div className='stat-value'>
              {currency.symbol}{coinData.market_data.ath[currency.name].toLocaleString()}
              <div className='ath-change' style={{ color: coinData.market_data.ath_change_percentage[currency.name] >= 0 ? '#10b981' : '#ef4444' }}>
                ({coinData.market_data.ath_change_percentage[currency.name].toFixed(2)}%)
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className='info-section'>
          <h2 className='section-title'>About {coinData.name}</h2>
          <div 
            className='coin-description' 
            dangerouslySetInnerHTML={{ __html: coinData.description.en }}
          />
        </div>
      </div>
    )
  }

  return (
    <div className='loading-container'>
      <div className='crypto-spinner'>
        <div className='spinner-inner'></div>
      </div>
    </div>
  )
}

export default Coin