import React from "react";
import { render } from "@testing-library/react";
import {Input,Tooltip,Button} from 'antd'
import Plotly from 'plotly.js-dist-min'
import * as math from 'mathjs'
const Parser = require('expr-eval').Parser;
export default class Newton extends React.Component{
    constructor(props){
        super(props)
        this.state={
          x0:"",
          funcin:"",
          Arr1:[],
          X:[],
          Y:[],
          submitted:true
        }
        this.clear=this.clear.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.NewTon=this.NewTonMethon.bind(this);
        
      }
      clear(event){
        // event.preventDefault();
        this.setState({Arr1:[]});
        // this.setState({X:[]});
        // this.setState({Y:[]});
        this.setState({x0:""});
        this.setState({funcin:""});
        this.setState({submitted:true});
      }
      handleSubmit(event) {
        event.preventDefault()
        const {x0,funcin} = this.state
        this.setState({submitted:false});   
        this.NewTonMethon(x0,funcin)
        
        
      }
      handleChange(event){
        this.setState({[event.target.name] : event.target.value})
        // this.setState({submitted:false});
        
        }
    NewTonMethon(x0,funcin){
        var X=this.state.X;
        var Y=this.state.Y;
        const parser = new Parser();
        
        function func(funcin,x)
        {
          let expr = math.parse(funcin)
          console.log("fx = "+expr.evaluate({ x: (x) }))
          return expr.evaluate({ x: (x) })
        }
        // function diff(x)
        
        // {
        //     // let diff = math.derivative(funcin,'x');
        //   let expr = parser.parse(math.derivative(funcin,'x'))
        //   console.log("fx = "+expr.evaluate({ x: (x) }))
        //   return expr.evaluate({ x: (x) })
        // }
        // function func(equation, xq) {

        //     try {
        //         let eq = math.parse(equation)
        //         console.log(eq)
        //         return eq.evaluate({ x: xq })
        //     } catch (error) {
                
        //     }
        // }
        var err=(x0,x1)=>{return Math.abs((x0-x1)/x0)};
        var arr;
        var data={x0:0,err:0,fxm:0,count:1,fxnew:0};
        var t=true;
        // var xOld=0;
        var x_temp;
        X.push(data.err);//ทำกราฟ
        Y.push(data.fxm);
        data.x0=parseFloat(x0);
        // data.fxm=(func(data.xm)).toFixed(6);
        // data.err=err(data.fxm,data.xm).toFixed(6);
        // arr.push({x0:data.x0.toFixed(6),err:data.err,fxm:data.fxm,count:data.count});
        // X.push(data.err);
        // Y.push(data.fxm);
        
        while(t){
          if(data.count===15){
              t=false;
            }else{
                // data.fxm = func(data.x0)
                
                // console.log(x_temp)
                // data.count++
                // render(x_temp)
            // data.count++;
            // data.x0 =data.fxm;
            // data.fxm=(func(data.x0)).toFixed(6);
            // data.err=err(data.fxm,data.x0).toFixed(6);
            // X.push(data.err);//ทำกราฟ
            // Y.push(data.fxm);
            // arr.push({x0:data.x0,err:data.err,fxm:data.fxm,count:data.count});
            // data.x0 = data.fxm;


            x_temp = func(funcin, data.x0) / func(math.derivative(funcin, 'x').toString(),data.x0)
            data.fxm = data.x0-x_temp
            data.err=err(data.fxm,data.x0).toFixed(6);
            arr=this.state.Arr1;
            
            arr.push({x0:data.x0,err:data.err,fxm:data.fxm,count:data.count});
            X.push(data.err);//ทำกราฟ
            Y.push(data.fxm);
            data.count++;
            data.x0 = data.fxm;
            // render("xold"+data.xm+"xnew"+data.fxm+"count"+data.count+"err"+data.err)

            }
            
             
            
            
          
    }
        
        
        
        
        //กราฟ
        // Define Data
        var datachart = {
          // x: [X[0],X[1],X[2]],
          // y: [Y[0],Y[1],Y[2]],
          // x:[1,2,3,4],
          // y:[4,5,6,7],
          "data": [{ "y": this.state.X },{ "y": this.state.Y }],
          "layout": {  
                       "xaxis": { title: "Iteration"},
                       "yaxis": { title: "ERROR"},
                       "title": "Newton-Raphson graph"}
          
        };
        Plotly.newPlot("myPlot", datachart);
        
        
      }
    render(){
        const DataRow=(props)=>{return (<tr><td>{props.data.count}</td>
                                        <td>{props.data.fxm}</td>
                                        <td>{props.data.x0}</td>
                                        <td>{props.data.err}</td></tr>);
                            }
        let rows=this.state.Arr1.map(x =>{return <DataRow key={x.count} data={x}/>});
        return(
            <div>
          <form onSubmit={this.handleSubmit}>
          <div className='head'>
            <div >
              <h1>&emsp;Newton-Raphson Method&emsp;</h1>
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
                                                              <th>XNEW</th>
                                                              <th>XOLD</th>
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
        )
    }
}