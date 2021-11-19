import React, { Component } from 'react'
import Web3 from 'web3'
import Navbar from './Navbar'
import Main from './Main'
import './App.css'

import {FACTORY_ADDRESS, FACTORY, CT_ADDRESS, CT, EXCHANGE} from './config'

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadBlockchainData() {
    const web3 = window.web3

    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })

    const ethBalance = await web3.eth.getBalance(this.state.account)
    
    this.setState({ ethBalance })

    const factory = new web3.eth.Contract(FACTORY, FACTORY_ADDRESS)
    this.setState({factory})

    const token = new web3.eth.Contract(CT, CT_ADDRESS)
    this.setState({token})

    


    const tokenBalance = await token.methods.balanceOf(this.state.account).call()
    
    this.setState({tokenBalance: tokenBalance.toString()})
    this.setState({loading: false})

    const exchange_address = await factory.methods.getExchange(CT_ADDRESS).call()
    
    
    const ethPool = await web3.eth.getBalance(exchange_address)
    this.setState({ethPool: ethPool})
    
    const tokenPoolS = await token.methods.balanceOf(exchange_address).call()
    
    const tokenPool = tokenPoolS.toString()
    this.setState({tokenPool: tokenPool})

  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  buyTokens = async (etherAmount) => {
    const web3 = window.web3
    this.setState({loading: true})
    const timestamp = Math.floor(Date.now() / 1000) + 600
    const exchange_address = await this.state.factory.methods.getExchange(CT_ADDRESS).call()
    const exchange = new web3.eth.Contract(EXCHANGE, exchange_address)
    await exchange.methods.ethToTokenSwapInput(etherAmount, timestamp).send({value: etherAmount, from: this.state.account }).on('transactionHash', (hash) => {
      this.setState({loading: false})
    })
  }

  liquidity = async (ethAmount, tokenAmount) =>{
    const web3 = window.web3
    this.setState({loading: true})
    const timestamp = Math.floor(Date.now() / 1000) + 600
    const exchange_address = await this.state.factory.methods.getExchange(CT_ADDRESS).call()
    const exchange = new web3.eth.Contract(EXCHANGE, exchange_address)
    const token = new web3.eth.Contract(CT, CT_ADDRESS)

    
    await token.methods.approve(exchange_address, tokenAmount).send({from: this.state.account}).on('transactionHash', async (hash) => {
      await exchange.methods.addLiquidity(ethAmount, tokenAmount, timestamp).send({value: ethAmount,from: this.state.account}).on('transactionHash', (hash) => {
        this.setState({loading: false})
      })
    })
  }

  sellTokens = async (tokenAmount, ethAmount) => {
    const web3 = window.web3
    this.setState({loading: true})
    const timestamp = Math.floor(Date.now() / 1000) + 600
    const exchange_address = await this.state.factory.methods.getExchange(CT_ADDRESS).call()
    const exchange = new web3.eth.Contract(EXCHANGE, exchange_address)
    const token = new web3.eth.Contract(CT, CT_ADDRESS)
    await token.methods.approve(exchange_address, tokenAmount).send({from: this.state.account}).on('transactionHash', async (hash) => {
        await exchange.methods.tokenToEthSwapInput(tokenAmount, ethAmount, timestamp).send({from: this.state.account}).on('transactionHash', (hash) => {
          this.setState({loading: false})
      })
    })
    
  }

  

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      token: {},
      factory: {},
      tokenBalance: '0',
      ethBalance: '0',
      ethPool: '0',
      tokenPool: '0',
      loading: true
    }
  }

  render() {
    let content 
    if(this.state.loading){
      content = <p id="loader" className="text-center">Loading...</p>
    }else{
      content = <Main 
        ethBalance={this.state.ethBalance} 
        tokenBalance={this.state.tokenBalance}
        buyTokens={this.buyTokens}
        sellTokens={this.sellTokens}
        liquidity={this.liquidity}
        ethPool={this.state.ethPool}
        tokenPool={this.state.tokenPool}
      />
        
    }
    return (
      <div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 ml-auto mr-auto" style={{maxWidth: '600px'}}>
              <div className="content mr-auto ml-auto">
                <a
                  href="http://www.dappuniversity.com/bootcamp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                </a>
                {content}
                

              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
