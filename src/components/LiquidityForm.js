import React, { Component } from 'react'
import caramelologo from '../caramelologo.png'
import ethLogo from '../eth-logo.png'

class LiquidityForm extends Component {
  constructor(props){
    super(props)
    this.state = {
      output: '0'
    }
  }
  add = (arg1, arg2) => {
    var sum = "";
    var r = 0;
    var a1, a2, i;
  
    // Pick the shortest string as first parameter and the longest as second parameter in my algorithm
    if (arg1.length < arg2.length) {
      a1 = arg1;
      a2 = arg2;
    }
    else {
      a1 = arg2;
      a2 = arg1;
    }
    a1 = a1.split("").reverse();
    a2 = a2.split("").reverse();
  
    // Sum a1 and a2 digits
    for (i = 0; i < a2.length; i++) {
      var t = ((i < a1.length) ? parseInt(a1[i]) : 0) + parseInt(a2[i]) + r;
      
      sum += t % 10;
  
      r = t < 10 ? 0 : Math.floor(t / 10);
    }
    // Append the last remain
    if (r > 0)
      sum += r;
  
    sum = sum.split("").reverse();
    
    // Trim the leading "0"
    while (sum[0] == "0")
      sum.shift();
  
    return sum.length > 0 ? sum.join("") : "0";
  }
  
  amm = (amount) => {
    // const invariant = (this.props.ethPool) * this.props.tokenPool
    // let add_reserve = invariant/ this.props.tokenPool
    // let new_reserve = add_reserve - this.props.tokenPool 
    // let result = new_reserve + amount 
    // if (result == 1000000000000000000){
    //   return 1
    // }
    const a = amount * this.props.tokenPool / this.props.ethPool
    let result = this.add(a.toString(), '1')
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
            console.log(this.add(etherAmount,'1'))
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
