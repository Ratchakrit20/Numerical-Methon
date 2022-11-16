import React from 'react'
 
import Plotly from 'plotly.js-dist-min'
import { Input, Tooltip,Button } from 'antd'
import './input.css';
import { count } from 'mathjs';

const Parser = require('expr-eval').Parser;
export default class Secant extends React.Component{
    constructor(props){
      super(props)
      this.state={
        x0:"",
        x1:"",
        funcin:"",
        Arr:[],
        X:[],
        Y:[],
        submitted:true
      }
      this.clear=this.clear.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.SecanMethon=this.SecanMethon.bind(this);
      
    }
    clear(event){
      // event.preventDefault();
      this.setState({Arr:[]});
      this.setState({X:[]});
      this.setState({Y:[]});
      this.setState({x0:""});
      this.setState({x1:""});
      this.setState({funcin:""});
      this.setState({submitted:true});
    }
    handleSubmit(event) {
      event.preventDefault()
      const {x0,x1,funcin} = this.state
      this.setState({submitted:false});   
      this.SecanMethon(x0,x1,funcin)
      
      
    }
    handleChange(event){
      this.setState({[event.target.name] : event.target.value})
      // this.setState({submitted:false});
      }
    SecanMethon(x0,x1,funcin){
      var X=this.state.X;
      var Y=this.state.Y;
      const parser = new Parser();
      function func(x)
      {
        let expr = parser.parse(funcin)
        console.log("fx = "+expr.evaluate({ x: (x) }))
        return expr.evaluate({ x: (x) })
      }
      var err=(x0,x1)=>{return Math.abs((x0-x1)/x0)};
      var arr;
      var data={x0:0,x1:0,err:10000000,fx:0,count:1};
      var t=true;
      // var xOld=0;
      arr=this.state.Arr;
      data.x0=parseFloat(x0);
      data.x1=parseFloat(x1);
      
      
      while(t){
        if(data.count===15){
            t=false;
          }else{
          data.fx = data.x1-func(data.x1)*((data.x1-data.x0)/(func(data.x1)-func(data.x0)));
          console.log(data.fx)
          data.err=err(data.fx,data.x0).toFixed(6);
          X.push(data.err);//ทำกราฟ
          Y.push(data.fx);
          
          
          arr.push({x0:data.x0,x1:data.x1,err:data.err,fx:data.fx,count:data.count});
          data.x0=data.x1;
          data.x1 = data.fx;
          data.count++;
          }
          
          
          // render("xold"+data.xm+"xnew"+data.fxm+"count"+data.count+"err"+data.err)
          
          
        
      }
      
      
      
      
      //กราฟ
      // Define Data
      var datachart = {
        
        "data": [{ "y": this.state.X },{ "y": this.state.Y }],
        "layout": {  
                     "xaxis": { title: "Iteration"},
                     "yaxis": { title: "ERROR"},
                     "title": "Secant Methon graph"}
        
      };
      Plotly.newPlot("myPlot", datachart);
      
      
    }
    
    render(){
      const DataRow=(props)=>{return (<tr><td>{props.data.count}</td>
                                        <td>{props.data.x0}</td>
                                        <td>{props.data.x1}</td>
                                        <td>{props.data.err}</td></tr>);
                            }
    let rows=this.state.Arr.map(x =>{return <DataRow key={x.count} data={x}/>});
    
    
        return(
          <div>
          <form onSubmit={this.handleSubmit}>
          <div className='head'>
            <div >
              <h1>&emsp;Secant Method&emsp;</h1>
              <label htmlFor='funcin'>&emsp;Funct :&emsp;</label>
              <Tooltip  title={'Input function here!'} placement="topLeft" overlayClassName="numeric-input">
                <Input
                style={{
                  width: '30%',
                }}
                name='funcin'
                type="text" 
                placeholder='Input function here!'
                value={this.state.funcin}
                onChange={this.handleChange}
                size='30'
                />
              </Tooltip>
              {/* <input
                
                name='funcin'
                type="text" 
                placeholder='Input function here!'
                value={this.state.funcin}
                onChange={this.handleChange}
                size='30'
              /> */}
            </div>
            <p></p>
            <div>
         
              <label htmlFor='x0'>&emsp;X0 :&emsp;</label>
              <Tooltip  title={'Input X0'} placement="topLeft" overlayClassName="numeric-input">
                <Input
                style={{
                  width: '20%',
                }}
                name='x0'
                type="number"
                placeholder='Starting X0'
                value = {this.state.x0}
                onChange={this.handleChange}
                size='8'
                />
              </Tooltip>
              <label htmlFor='x1'>&emsp;X1 :&emsp;</label>
              <Tooltip  title={'Input X1'} placement="topLeft" overlayClassName="numeric-input">
                <Input
                style={{
                  width: '20%',
                }}
                name='x1'
                type="number"
                placeholder='Starting X1'
                value = {this.state.x1}
                onChange={this.handleChange}
                size='8'
                />
              </Tooltip>
              {/* <input
                name='x0'
                type="number"
                placeholder='Starting X0'
                value = {this.state.x0}
                onChange={this.handleChange}
                size='8'
              /> */}
            </div>
            <p></p>
            <div>
                &emsp;<Button onClick={this.handleSubmit}>Calculate</Button>
                &emsp;<Button onClick={this.clear}>Clear</Button>
            </div> 
          </div>
          <p></p>
          <div>{(this.state.submitted)?<div></div>:<div>
                                                      <center>
                                                        <div>
                                                          <table >
                                                          <thead>
                                                          <tr><th>iteration</th>
                                                              <th>XOLD</th>
                                                              <th>XNEW</th>
                                                              <th>ERROR</th>
                                                              
                                                          </tr>
                                                          </thead>
                                                          <tbody>
                                                            {rows}
                                                          </tbody>
                                                          </table>
                                                        </div>
                                                        
                                                        
                                                        </center>
                                                        
                                                      </div>
                                                      
              }
        </div>
        
        <br></br>
        <div id='myPlot'></div>
        
        </form>
      </div>
        );
    }

}


