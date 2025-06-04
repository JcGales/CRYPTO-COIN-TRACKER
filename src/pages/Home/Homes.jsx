import React, { useContext, useState } from 'react'
import './Homes.css'
import { CoinContext } from '../../context/CoinContext'
const Homes = () => {

  const {allCoin, currency} = useContext(CoinContext);
  const [displayCoin, setDisplayCoin] = useState([])
  return (
    <div className='home'>
      <div className='hero'>
        <h1>Largest Crypto Marketplace</h1>
        <p>
          Welcome to the World's largest cryptocurrency
          marketplace. Sign up to explore more about cryptos.
        </p>
        <form>
          <input type="text" placeholder='Search Crypto..' />
          <button type='submit'>Search</button>
        </form>
      </div>

      <div className='cypto-table'>
        <div className='table-layout'>
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p style={{textAlign:"center"}}>24H Change</p>
          <p className='market-cap'>Market Cap</p>
        </div>
      </div>
    </div>
  )
}

export default Homes