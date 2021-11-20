import React, { Component } from 'react'
import BuyForm from './BuyForm'
import SellForm from './SellForm'
import LiquidityForm from './LiquidityForm'


class Main extends Component {
  constructor(props){
    super(props)
    this.state = {
      currentForm: 'buy'
    }
  }

  render() {
    let content
    if(this.state.currentForm == 'buy'){
      content = <BuyForm 
        ethBalance={this.props.ethBalance}
        tokenBalance={this.props.tokenBalance}
        buyTokens={this.props.buyTokens}
        ethPool={this.props.ethPool}
        tokenPool={this.props.tokenPool}
      />
    } else if (this.state.currentForm == 'sell'){
      content = <SellForm 
        ethBalance={this.props.ethBalance}
        tokenBalance={this.props.tokenBalance}
        sellTokens={this.props.sellTokens}
        ethPool={this.props.ethPool}
        tokenPool={this.props.tokenPool}
      />
    } else{
      content = <LiquidityForm 
        ethBalance={this.props.ethBalance}
        tokenBalance={this.props.tokenBalance}
        liquidity={this.props.liquidity}
        ethPool={this.props.ethPool}
        tokenPool={this.props.tokenPool}
      />
    }
    return (
      <div id="content" className="mt-3">
        <div className="d-flex justify-content-between mb-3">
          <button className="btn btn-light" 
            onClick={(event) =>{
              this.setState({currentForm: 'buy'})
            }}
          >
            buy
          </button>
          <button className="btn btn-light" 
            onClick={(event) =>{
              this.setState({currentForm: 'liquidity'})
            }}>
              Provide Liquidity
          </button>
          <button className="btn btn-light" 
            onClick={(event) =>{
              this.setState({currentForm: 'sell'})
            }}>
            Sell
          </button>
        </div>

        <div className="card mb-4" >

          <div className="card-body">
            {content}
          
          </div>

        </div>

      </div>

    );
  }
}

export default Main;
