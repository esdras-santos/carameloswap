import React, { Component } from 'react'
import caramelologo from '../caramelologo.png'
import ethLogo from '../eth-logo.png'
import {add, mult, div} from './Utils'

class LiquidityForm extends Component {
  constructor(props){
    super(props)
    this.state = {
      output: '0'
    }
  }


  amm = (amount) => {
    // const invariant = (this.props.ethPool) * this.props.tokenPool
    // let add_reserve = invariant/ this.props.tokenPool
    // let new_reserve = add_reserve - this.props.tokenPool 
    // let result = new_reserve + amount 
    // if (result == 1000000000000000000){
    //   return 1
    // }
    const a = mult(amount, div(this.props.tokenPool, Number(this.props.ethPool)))
    let result = add(a, '1')
    return result

    // let input_reserve = this.props.ethPool - amount
    // // let input_amount_with_fee = amount * 997
    // let numerator = amount * this.props.tokenPool
    // let denominator = (input_reserve * 1000) + amount
    // return numerator / denominator
  }


  render() {
    
    return (
        <form className="mb-3" onSubmit={(event) => {
            event.preventDefault()
            let etherAmount
            etherAmount = this.input.value.toString()
            const tokenAmount = this.amm(Number(etherAmount))
            console.log(add(etherAmount,'1'))
            // etherAmount = window.web3.utils.toWei(etherAmount, 'Ether')
            this.props.liquidity(etherAmount, tokenAmount)
            
          }}>
          <div>
            <label className="float-left"><b>Token 1</b></label>
            <span className="float-right text-muted">
              Balance: {window.web3.utils.fromWei(this.props.ethBalance, 'Ether')}
            </span>
          </div>
          <div className="input-group mb-4">
            <input
              type="text"
              onChange={(event) => {
                const etherAmount = this.input.value.toString()
                this.setState({
                  output: this.amm(Number(etherAmount))
                })
              }}
              ref={(input) => { this.input = input }}
              className="form-control form-control-lg"
              placeholder="0"
              required />
            <div className="input-group-append">
              <div className="input-group-text">
                <img src={ethLogo} height='32' alt=""/>
                &nbsp;&nbsp;&nbsp; ETH
              </div>
            </div>
          </div>
          <div>
            <label className="float-left"><b>Token 2</b></label>
            <span className="float-right text-muted">
              Balance: {window.web3.utils.fromWei(this.props.tokenBalance, 'Ether')}
            </span>
          </div>
          <div className="input-group mb-2">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="0"
              value={this.state.output}
              disabled
            />
            <div className="input-group-append">
              <div className="input-group-text">
                <img src={caramelologo} height='32' alt=""/>
                &nbsp; CaSw
              </div>
            </div>
          </div>
          <div className="mb-5">
            <span className="float-left text-muted">Exchange Rate</span>
            <span className="float-right text-muted">1 ETH = {this.amm(1000000000000000000).toString()} CaSw</span>
          </div>
          <button type="submit" className="btn btn-primary btn-block btn-lg">PROVIDE!</button>
        </form>


    );
  }
}

export default LiquidityForm;