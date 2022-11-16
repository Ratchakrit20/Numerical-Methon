import React from 'react'
 
import Plotly from 'plotly.js-dist-min'
import { Input, Tooltip,Button } from 'antd'
import './input.css';

const Parser = require('expr-eval').Parser;
class OnePoint extends React.Component{
    constructor(props){
      super(props)
      this.state={
        x0:"",
        funcin:"",
        Arr:[],
        X:[],
        Y:[],
        
        submitted:true
      }
      this.clear=this.clear.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.OnePointMethon=this.OnePointMethon.bind(this);
      
    }
    clear(event){
      // event.preventDefault();
      this.setState({Arr:[]});
      this.setState({X:[]});
      this.setState({Y:[]});
      this.setState({x0:""});
      this.setState({funcin:""});
      this.setState({submitted:true});
    }
    handleSubmit(event) {
      event.preventDefault()
      const {x0,funcin} = this.state
      this.setState({submitted:false});   
      this.OnePointMethon(x0,funcin)
      
      
    }
    handleChange(event){
      this.setState({[event.target.name] : event.target.value})
      // this.setState({submitted:false});
      
      }
    OnePointMethon(x0,funcin){
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
      var data={xm:0,err:10000000,fxm:0,count:1,fxnew:0};
      var t=true;
      // var xOld=0;
      arr=this.state.Arr;
      data.xm=parseFloat(x0);
      data.fxm=(func(data.xm)).toFixed(6);
      data.err=err(data.fxm,data.xm).toFixed(6);
      arr.push({xm:data.xm.toFixed(6),err:data.err,fxm:data.fxm,count:data.count});
      X.push(data.err);
      Y.push(data.fxm);
      
      while(t){
        if(data.count===15){
            t=false;
          }else{
          data.count++;
          data.xm =data.fxm;
          data.fxm=(func(data.xm)).toFixed(6);
          data.err=err(data.fxm,data.xm).toFixed(6);
          X.push(data.err);//ทำกราฟ
          Y.push(data.fxm);
          
          
          arr.push({xm:data.xm,err:data.err,fxm:data.fxm,count:data.count});
          data.xm = data.fxm;
          }
          
          
          // render("xold"+data.xm+"xnew"+data.fxm+"count"+data.count+"err"+data.err)
          
          
        
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
                     "title": "One-point Iterlation graph"}
        
      };
      Plotly.newPlot("myPlot", datachart);
      
      // Plotly.newPlot("myPlot", [{
        
      //   y: this.state.X }], {
      //   margin: { t: 0 },title: 'Quarter 1 Growth',
      //   xaxis: {
      //     title: "Iteration",
      //     showgrid: false,
      //     zeroline: false
      //   },
      //   yaxis: {
      //     title: "ERROR",
      //     showline: false
      //   },width: 1000,
      //   height: 500 });



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
                                        <td>{props.data.fxm}</td>
                                        <td>{props.data.xm}</td>
                                        <td>{props.data.err}</td></tr>);
                            }
    let rows=this.state.Arr.map(x =>{return <DataRow key={x.count} data={x}/>});
    
    
        return(
          <div>
          <form onSubmit={this.handleSubmit}>
          <div className='head'>
            <div >
              <h1>&emsp;One-Point Iteration Method&emsp;</h1>
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
        );
    }

}
export default OnePoint

