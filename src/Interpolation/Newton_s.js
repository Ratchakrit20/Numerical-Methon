import React from "react";
import { render } from "@testing-library/react";
import {Input,Tooltip,Button} from 'antd'
import Plotly from 'plotly.js-dist-min'



export default class Newton_s extends React.Component{
    constructor(props){
        super(props)
        this.state={
          x0:"",
          x:[],
          arrx:[],
          arry:[],
          y:[],
          // fx:[[0,9.81],[20000,9.7487],[40000,9.6879],[60000,9.6879],[80000,9.5682]],
          Arr1:[],
          X:[],
          Y:[],
          ans:"",
          submitted:true
        }
        this.clear=this.clear.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChange1 = this.handleChange1.bind(this);
        this.NewTon=this.NewTonMethon.bind(this);
        this.C=this.C.bind(this);
        
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
        const {x0} = this.state
        this.setState({submitted:false});   
        this.NewTonMethon(x0)
        
        
      }
      handleChange(event){
        this.setState({[event.target.name] : event.target.value})
        // this.setState({submitted:false});
        
        }
      handleChange1(event){
            var arrpx = this.state.arrx;
            var arrpy = this.state.arry;
            const {x,y} = this.state
            arrpx.push(parseFloat(x));
            arrpy.push(parseFloat(y));
            
        }
    // C (x2,x1,fx) {
    //     if(x2===0&&x1===0){
    //         return fx[0][1];
    //     }
    //     else if(x2-x1>1){
    //         return (this.C(x2,(x1+1),fx)-this.C((x2-1),x1,fx))/(fx[x2][0]-fx[x1][0]);
    //     }
    //     else{
    //         return (fx[x2][1]-fx[x1][1])/(fx[x2][0]-fx[x1][0]);
    //     }
    // }
    C (x2,x1,x,y) {
      if(x2===0&&x1===0){
          return y[0];
      }
      else if(x2-x1>1){
          return (this.C(x2,(x1+1),x,y)-this.C((x2-1),x1,x,y))/(x[x2]-x[x1]);
      }
      else{
          return (y[x2]-y[x1])/(x[x2]-x[x1]);
      }
  }
    NewTonMethon(x0){
        var ans = 0;
        for(var i=0;i<this.state.arrx.length;i++){
            var c = this.C(i,0,this.state.arrx,this.state.arry);
            for(var j=0;j<i;j++){
                c = c * (x0-this.state.arrx[j]);
            }
            ans = ans + c;
        }
        this.state.ans = ans;
        console.log(ans);
        console.log(this.state.fx);
        // render("f("+this.state.x0+") = "+ans);
        var arr;
        var data={x:0,y:0,count:1};
        
        var X=this.state.X;
        var Y=this.state.Y;
        for(var i=0;i<this.state.arrx.length;i++){
            data.x = this.state.arrx[i];
            data.y = this.state.arry[i];
            X.push(data.x);//ทำกราฟ
            Y.push(data.y);
            console.log("data.x :"+data.x);
            console.log("data.y :"+data.y);
            arr=this.state.Arr1;
            arr.push({x:data.x,y:data.y,count:data.count});
            // render("Interation : "+data.count+" X : "+data.x+"  Y : "+data.y);
            data.count++;
        }
        console.log(this.state.Arr1);
        console.log(this.state.arrx);
        console.log(this.state.arry);
        var datachart = {
          // x: [X[0],X[1],X[2]],
          // y: [Y[0],Y[1],Y[2]],
          // x:[1,2,3,4],
          // y:[4,5,6,7],
          "data": [{ "x": this.state.X,"y": this.state.Y}],
          "layout": {  
                       "xaxis": { title: "Iteration"},
                       "yaxis": { title: "ERROR"},
                       "title": "Newton's divided-differences graph"}
          
        };
        Plotly.newPlot("myPlot", datachart);
        
        
      }
    render(){
      const DataRow=(props)=>{return (<tr><td>{props.data.count}</td>
                                          <td>{props.data.x}</td>
                                          <td>{props.data.y}</td>
                                      </tr>);
                                    }
      let rows=this.state.Arr1.map(x =>{return <DataRow key={x.count} data={x}/>});
        return(
            <div>
          <form onSubmit={this.handleSubmit}>
          <div className='head'>
            <div >
              <h1>&emsp;Newton's divided-differences&emsp;</h1>
              <label htmlFor='X'>&emsp;X :&emsp;</label>
              <Tooltip  title={'Input X here!'} placement="topLeft" overlayClassName="numeric-input">
                <Input
                style={{
                  width: '30%',
                }}
                name='x'
                type="number" 
                placeholder='Input X here!'
                value={this.state.x}
                onChange={this.handleChange}
                size='30'
                />
              </Tooltip>
              <label htmlFor='Y'>&emsp;Y :&emsp;</label>
              <Tooltip  title={'Input Y here!'} placement="topLeft" overlayClassName="numeric-input">
                <Input
                style={{
                  width: '30%',
                }}
                name='y'
                type="number" 
                placeholder='Input Y here!'
                value={this.state.y}
                onChange={this.handleChange}
                size='30'
                />
              </Tooltip>
              &emsp;<Button onClick={this.handleChange1}>Calculate</Button>
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
              
            </div>
            <p></p>
            <div><label htmlFor='fx'>&emsp;f({this.state.x0}) = {this.state.ans}&emsp;</label></div>
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
                                                              <th>X</th>
                                                              <th>Y</th>
                                                              
                                                              
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