import React, { Component } from 'react'
import caramelologo from '../caramelologo.png'
import ethLogo from '../eth-logo.png'

class SellForm extends Component {
  constructor(props){
    super(props)
    this.state = {
      output: '0'
    }
  }

  amm = (amount) => {
    let input_amount_with_fee = amount * 997
    let numerator = input_amount_with_fee * this.props.ethPool
    let denominator = (this.props.tokenPool * 1000) + input_amount_with_fee
    return numerator / denominator
  }

  render() {
    return (
        <form className="mb-3" onSubmit={(event) => {
            event.preventDefault()
            let tokenAmount
            tokenAmount = this.input.value.toString()
            // tokenAmount = window.web3.utils.toWei(tokenAmount, 'Ether')
            this.props.sellTokens(tokenAmount, Math.trunc(this.amm(tokenAmount)).toString())
          }}>
          <div>
            <label className="float-left"><b>Input</b></label>
            <span className="float-right text-muted">
              Balance: {window.web3.utils.fromWei(this.props.tokenBalance, 'Ether')}
            </span>
          </div>
          <div className="input-group mb-4">
            <input
              type="text"
              onChange={(event) => {
                let tokenAmount = this.input.value.toString()
                this.setState({
                  output: this.amm(Number(tokenAmount))
                })
              }}
              ref={(input) => { this.input = input }}
              className="form-control form-control-lg"
              placeholder="0"
              required />
            <div className="input-group-append">
              <div className="input-group-text">
                <img src={caramelologo} height='32' alt=""/>
                &nbsp; CaSw
              </div>
            </div>
          </div>
          <div>
            <label className="float-left"><b>Output</b></label>
            <span className="float-right text-muted">
              Balance: {window.web3.utils.fromWei(this.props.ethBalance, 'Ether')}
            </span>
          </div>
          <div className="input-group mb-2">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="0"
              value={Math.trunc(this.state.output)}
              disabled
            />
            <div className="input-group-append">
              <div className="input-group-text">
                <img src={ethLogo} height='32' alt=""/>
                &nbsp;&nbsp;&nbsp; ETH
              </div>
            </div>
          </div>
          <div className="mb-5">
            <span className="float-left text-muted">Exchange Rate</span>
            <span className="float-right text-muted">1 Casw = {Math.trunc(Number(this.amm(1000000000000000000).toString()))} ETH</span>
          </div>
          <button type="submit"  className="btn btn-primary btn-block btn-lg">SWAP!</button>
        </form>


    );
  }
}

export default SellForm;
