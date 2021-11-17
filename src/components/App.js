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
    console.log("token balance: ",tokenBalance.toString())
    this.setState({tokenBalance: tokenBalance.toString()})
    this.setState({loading: false})
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
    const swaped = await exchange.methods.ethToTokenSwapInput(etherAmount, timestamp).send({value: etherAmount, from: this.state.account }).on('transactionHash', (hash) => {
      this.setState({loading: false})
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
        buyToken={this.buyTokens}
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
