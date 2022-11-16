import { render } from "@testing-library/react";
import React,{ Component } from 'react'
import Plotly from 'plotly.js-dist-min'
import { Input,Tooltip,Button } from "antd";
const Parser = require('expr-eval').Parser;

//var X,Y;
class False extends React.Component{
  constructor(props){
    super(props);
    // X=[];
    // Y=[];
    this.state={
          Arr:[],
          xl:"",
          xr:"",
          E:"",
          error:"",
          X:[],
          Y:[],
          submitted:true
        };
    this.clear=this.clear.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.BisectionMethod=this.BisectionMethod.bind(this);
  }
  clear(event){
    //event.preventDefault()
    this.setState({Arr:[]});
    this.setState({xl:""});
    this.setState({xr:""});
    this.setState({E:""});
    this.setState({submitted:true});
  }
  
  handleSubmit(event) {
    
    const {xl,xr,E} = this.state
    this.setState({submitted:false});   
    this.BisectionMethod(xl,xr,E)
    event.preventDefault()
    
    
    
  }
  handleChange(event){
    this.setState({[event.target.name] : event.target.value})
    // this.setState({submitted:false});
    
    }
  BisectionMethod(xl,xr,E){
      var X=this.state.X;
      var Y=this.state.Y;
      const parser = new Parser();
      function func(x)
      {
        let expr = parser.parse(E)
        console.log("fx = "+expr.evaluate({ x: (x) }))
        return expr.evaluate({ x: (x) })
      }
      var err=(x0,x1)=>{return Math.abs((x0-x1)/x0)};
      var arr;
      var data={xl:0,xr:0,xm:0,err:0,fxl:0,fxr:0,fxm:0,count:1};
      // var t=true;
      var xOld=0;
      data.xl=parseFloat(xl);
      X.push(data.err);
      data.xr=parseFloat(xr);
      
      while(data.count<30){
        
        data.xm=((data.xl*func(data.xr))-(data.xr*func(data.xl)))/(func(data.xr)-func(data.xl));
        data.fxl=(func(data.xl)).toFixed(6);
        data.fxr=(func(data.xr)).toFixed(6);
        data.fxm=(func(data.xm)).toFixed(6);
        data.err=err(data.xm,xOld);
        X.push(data.err);
        arr=this.state.Arr;
        arr.push({xl:data.xl.toFixed(6),xr:data.xr.toFixed(6),xm:data.xm.toFixed(6),err:data.err.toFixed(6),fxl:data.fxl,fxr:data.fxr,fxm:data.fxm,count:data.count});
        if(func(data.xm)===0||data.count===30){
          break;
        }
        else if(func(data.xl)*func(data.xm)<0){
          xOld=data.xr;
          data.xr=data.xm;
        }
        else if(func(data.xl)*func(data.xm)>0){
          xOld=data.xl;
          data.xl= data.xm;
        }
        data.count++;
        
          
          
        //ทำกราฟ
        // Y.push(func(data.xl));//ทำกราฟ
          // render("X"+X+"thisdata.xm"+data.xm+"thisdata.xl"+data.fxl+"thisdata.xr"+data.fxr+"thisdata.fxm"+data.fxm+"test"+func(10))
          //render ("Error is "+data.err.toFixed(6)+"XM"+data.xm.toFixed(6))
        
      }
      
      
      
      
      //กราฟ
      // Define Data
      var datachart = {
        // x: [X[0],X[1],X[2]],
        // y: [Y[0],Y[1],Y[2]],
        // x:[1,2,3,4],
        // y:[4,5,6,7],
        "data": [{ "y": this.state.X }],
        "layout": {  
                     "xaxis": { title: "Iteration"},
                     "yaxis": { title: "Error"},
                     "title": "False Position Method"}
        
      };
      Plotly.newPlot("myPlot", datachart);
      // // Define Layout
      // const layout = {
      // xaxis: {range: [0, 10], title: "X"},
      // yaxis: {range: [0, 10], title: "Y"},
      // title: "House Prices vs. Size",
      
      // };
      
      // var Xtest = [0,1,2,3,4];
      // var Ytest = [0,1,2,3,4];
      //  var data_plot=[];
      //  data_plot.push(Xtest);
      // for ( var i = 0 ; i < Xtest.length ; i++ ) {
      //   var datachart = {
      //     x: Xtest[i],
      //     y: Ytest[i],
      //     mode: "lines",
      //     type: "scatter",
          
      //   };
      //   data_plot.push(datachart);
      // }
      //Plotly.newPlot("myPlot", data_plot, layout);



      // Plotly.newPlot("myPlot", /* JSON object */ {
      //   "data": [{ "y": this.state.X },{ "x": this.state.Y }],
      //   "layout": { "width": 800, "height": 600,
      //               "xaxis": {range: [0, 16], title: "Iteration"},
      //               "yaxis": {range: [0, 10], title: "XL"}}
      // })
      
       
  }
  

  render(){
    const DataRow=(props)=>{return (<tr><td>{props.data.count}</td>
                                        <td>{props.data.xl}</td>
                                        <td>{props.data.xr}</td>
                                        <td>{props.data.xm}</td>
                                        <td>{props.data.fxl}</td>
                                        <td>{props.data.fxr}</td>
                                        <td>{props.data.fxm}</td>
                                        <td>{props.data.err}</td></tr>);
                            }
    let rows=this.state.Arr.map(x =>{return <DataRow key={x.count} data={x}/>});
    
    return (
      <div>
      <form >
        <div className="head">
          <div>
              <h1>&emsp;Flase-Position Method&emsp;</h1>
              <label htmlFor='XL'>&emsp;XL :&emsp;</label>
              <Tooltip  title={'Input XL!'} placement="topLeft" overlayClassName="numeric-input">
                  <Input
                  style={{
                    width: '20%',
                  }}
                  name='xl'
                  type="number"
                  placeholder='Starting XL'
                  value = {this.state.xl}
                  onChange={this.handleChange}
                  size='8'
                  />
                </Tooltip>
              {/* <input
                name='xl'
                type="number"
                placeholder='Starting XL'
                value = {this.state.xl}
                onChange={this.handleChange}
                size='8'
              /> */}
              <label htmlFor='XR'>&emsp;XR :&emsp;</label>
              <Tooltip  title={'Input XR!'} placement="topLeft" overlayClassName="numeric-input">
                  <Input
                  style={{
                    width: '20%',
                  }}
                  name='xr'
                  type="number" 
                  placeholder='Starting XR'
                  value={this.state.xr}
                  onChange={this.handleChange}
                  size='8'
                  />
                </Tooltip>
              {/* <input
                name='xr'
                type="number" 
                placeholder='Starting XR'
                value={this.state.xr}
                onChange={this.handleChange}
                size='8'
              /> */}
              
            </div>
            <p></p>
            <div>
            <label htmlFor='E'>&emsp;Funct :&emsp;</label>
            <Tooltip  title={'Input function here!'} placement="topLeft" overlayClassName="numeric-input">
                <Input
                style={{
                  width: '30%',
                }}
                name='E'
                type="text" 
                placeholder='Input function here!'
                value={this.state.E}
                onChange={this.handleChange}
                size='30'
                />
              </Tooltip>
            {/* <input
              name='E'
              type="text" 
              placeholder='Input function here!'
              value={this.state.E}
              onChange={this.handleChange}
              size='30'
            /> */}
            
              </div>
              <p></p>
              <div>
              &emsp;<Button onClick={this.handleSubmit}>Calculate</Button>
              &emsp;<Button onClick={this.clear}>Clear</Button>
              </div>
          </div>
      
      {/* <div>
      <table>
      <thead>
      <tr><th>iteration</th>
          <th>XL</th>
          <th>XR</th>
          <th>XM</th>
          <th>Func(Xl)</th>
          <th>Func(Xr)</th>
          <th>Func(Xm)</th>
          <th>Error</th>
      </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
      </table>
      </div>
      <div id='myPlot'></div>
      <div id='myPlot1'></div> */}
      {/* ตารางไม่ขึ้น */}  
    <p></p>
    <div>{(this.state.submitted)?<div></div>:<div>
                                                  <div><center>
                                                    <table >
                                                    <thead>
                                                    <tr><th>iteration</th>
                                                        <th>XL</th>
                                                        <th>XR</th>
                                                        <th>XM</th>
                                                        <th>Func(Xl)</th>
                                                        <th>Func(Xr)</th>
                                                        <th>Func(Xm)</th>
                                                        <th>Error</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                      {rows}
                                                    </tbody>
                                                    </table></center>
                                                    </div>
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

export default False
