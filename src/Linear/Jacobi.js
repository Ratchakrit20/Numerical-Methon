import React from "react";
import { render } from "@testing-library/react";
import {Input,Tooltip,Button} from 'antd'
import Plotly from 'plotly.js-dist-min'



export default class Jacobi extends React.Component{
    constructor(props){
        super(props)
        this.state={
          x1:"",
          x2:"",
          x3:"",
          x:[],
          arrx:[],
          arry:[],
          y:[],
          
          a11:"",
          a12:"",
          a13:"",
          a21:"",
          a22:"",
          a23:"",
          a31:"",
          a32:"",
          a33:"",
          b1:"",
          b2:"",
          b3:"",
          Arr1:[],
          X:[],
          Y:[],
          Z:[],
          ans:"",
          submitted:true
        }
        this.clear=this.clear.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        // this.handleChange1 = this.handleChange1.bind(this);
        this.JacobiMethon=this.JacobiMethon.bind(this);
        
        
      }
      clear(event){
        // event.preventDefault();
        this.setState({Arr1:[]});
        // this.setState({X:[]});
        // this.setState({Y:[]});2q
        this.setState({x0:""});
        this.setState({funcin:""});
        this.setState({submitted:true});
      }
      handleSubmit(event) {
        event.preventDefault()
        const {x1,x2,x3} = this.state
        this.setState({submitted:false});   
        this.JacobiMethon(x1,x2,x3)
        
        
      }
      handleChange(event){
        this.setState({[event.target.name] : event.target.value})
        // this.setState({submitted:false});
        
        }
    //   handleChange1(event){
    //         var arrpx = this.state.arrx;
    //         var arrpy = this.state.arry;
    //         const {x,y} = this.state
    //         arrpx.push(parseFloat(x));
    //         arrpy.push(parseFloat(y));
            
    //     }
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
    // C (x2,x1,x,y) {
    //   if(x2===0&&x1===0){
    //     //console.log("c0"+y[0])
    //       return y[0];
    //   }
    //   else if(x2-x1>1){
    //     //console.log("C"+(this.C(x2,(x1+1),x,y)-this.C((x2-1),x1,x,y))/(x[x2]-x[x1]))
    //       return (this.C(x2,(x1+1),x,y)-this.C((x2-1),x1,x,y))/(x[x2]-x[x1]);
    //   }
    //   else{
    //     // for(var i=0;i<1;i++){
    //     //   console.log("C1"+(y[x2]-y[x1])/(x[x2]-x[x1]))
    //     // }
        
    //       return (y[x2]-y[x1])/(x[x2]-x[x1]);
    //   }
    // }
    JacobiMethon(x1,x2,x3){
        
        
        
        var arr;
        arr = this.state.Arr1;
        var data={x1:0,x2:0,x3:0,errx1:100,errx2:100,errx3:100,count:1};
        arr.push({x1:x1,x2:x2,x3:x3,errx1:100,errx2:100,errx3:100,count:data.count})
        var X=this.state.X;
        var Y=this.state.Y;
        var Z=this.state.Z;
        X.push(data.errx1);
        Y.push(data.errx2);
        Z.push(data.errx3);
        var errCheck = 0.000001
        var err=(x0,x1)=>{return Math.abs((x0-x1)/x0)};
        // data.errx1 = err(x1,data.x1);
        // data.errx2 = err(x1,data.x2);
        // data.errx3 = err(x1,data.x3);
        
        while(data.count < 30){
            // (data.errx1<errCheck)&&(data.errx2<errCheck)&&(data.errx3<errCheck)
            data.x1 = (this.state.b1 - this.state.a12*x2 -this.state.a13*x3)/this.state.a11;
            data.x2 = (this.state.b2 - this.state.a21*x1 -this.state.a23*x3)/this.state.a22;
            data.x3 = (this.state.b3 - this.state.a31*x1 -this.state.a32*x2)/this.state.a33;
            data.errx1 = err(data.x1,x1);
            data.errx2 = err(data.x2,x2);
            data.errx3 = err(data.x3,x3);
            data.count++;
            X.push(data.errx1);
            Y.push(data.errx2);
            Z.push(data.errx3);
            arr.push({x1:data.x1.toFixed(6),x2:data.x2.toFixed(6),x3:data.x3.toFixed(6),errx1:data.errx1.toFixed(6),errx2:data.errx2.toFixed(6),errx3:data.errx3.toFixed(6),count:data.count});
            x1 = data.x1;
            x2 = data.x2;
            x3 = data.x3;
            console.log(x1)
            console.log(x2)
            console.log(x3)
        }
        var datachart = {
          // x: [X[0],X[1],X[2]],
          // y: [Y[0],Y[1],Y[2]],
          // x:[1,2,3,4],
          // y:[4,5,6,7],
          "data": [{ "y": this.state.X},{ "y": this.state.Y},{ "y": this.state.Z}],
          "layout": {  
                       "xaxis": { title: "Iteration"},
                       "yaxis": { title: "ERROR"},
                       "title": "Jacobi graph"}
          
        };
        Plotly.newPlot("myPlot", datachart);
        
        
      }
    render(){
      const DataRow=(props)=>{return (<tr><td>{props.data.count}</td>
                                          <td>{props.data.x1}</td>
                                          <td>{props.data.x2}</td>
                                          <td>{props.data.x3}</td>
                                          <td>{props.data.errx1}</td>
                                          <td>{props.data.errx2}</td>
                                          <td>{props.data.errx3}</td>
                                      </tr>);
                                    }
      let rows=this.state.Arr1.map(x =>{return <DataRow key={x.count} data={x}/>});
        return(
            <div>
          <form onSubmit={this.handleSubmit}>
          <div className='head'>
            <div >
              <h1>&emsp;Jacobi Iteration Method&emsp;</h1>
              
              <Tooltip  title={'Input a11!'} placement="topLeft" overlayClassName="numeric-input">
                <Input
                style={{
                  width: '12%',
                }}
                name='a11'
                type="number" 
                placeholder='a11'
                value={this.state.a11}
                onChange={this.handleChange}
                size='30'
                />
              </Tooltip>
              
              <Tooltip  title={'Input a12'} placement="topLeft" overlayClassName="numeric-input">
                <Input
                style={{
                  width: '12%',
                }}
                name='a12'
                type="number" 
                placeholder='Input Y here!'
                value={this.state.a12}
                onChange={this.handleChange}
                size='30'
                />
              </Tooltip>
              <Tooltip  title={'Input a13!'} placement="topLeft" overlayClassName="numeric-input">
                <Input
                style={{
                  width: '12%',
                }}
                name='a13'
                type="number" 
                placeholder='Input Y here!'
                value={this.state.a13}
                onChange={this.handleChange}
                size='30'
                />
              </Tooltip>&emsp;
              <Tooltip  title={'Input b1!'} placement="topLeft" overlayClassName="numeric-input">
                <Input
                style={{
                  width: '12%',
                }}
                name='b1'
                type="number" 
                placeholder='Input Y here!'
                value={this.state.b1}
                onChange={this.handleChange}
                size='30'
                />
              </Tooltip>
              {/* -------------------------------------------------------------------------------- */}
              <p></p>
              <Tooltip  title={'Input a21!'} placement="topLeft" overlayClassName="numeric-input">
                <Input
                style={{
                  width: '12%',
                }}
                name='a21'
                type="number" 
                placeholder='Input X here!'
                value={this.state.a21}
                onChange={this.handleChange}
                size='30'
                />
              </Tooltip>
              {/* <label htmlFor='Y'>&emsp;Y :&emsp;</label> */}
              <Tooltip  title={'Input a22!'} placement="topLeft" overlayClassName="numeric-input">
                <Input
                style={{
                  width: '12%',
                }}
                name='a22'
                type="number" 
                placeholder='Input a22!'
                value={this.state.a22}
                onChange={this.handleChange}
                size='30'
                />
              </Tooltip>
              <Tooltip  title={'Input a23!'} placement="topLeft" overlayClassName="numeric-input">
                <Input
                style={{
                  width: '12%',
                }}
                name='a23'
                type="number" 
                placeholder='Input a23!'
                value={this.state.a23}
                onChange={this.handleChange}
                size='30'
                />
              </Tooltip>&emsp;
              <Tooltip  title={'Input b2!'} placement="topLeft" overlayClassName="numeric-input">
                <Input
                style={{
                  width: '12%',
                }}
                name='b2'
                type="number" 
                placeholder='Input b2!'
                value={this.state.b2}
                onChange={this.handleChange}
                size='30'
                />
              </Tooltip>
              {/* ------------------------------------------------------------------------------------------ */}
              <p></p>
              <Tooltip  title={'Input a31!'} placement="topLeft" overlayClassName="numeric-input">
                <Input
                style={{
                  width: '12%',
                }}
                name='a31'
                type="number" 
                placeholder='Input X here!'
                value={this.state.a31}
                onChange={this.handleChange}
                size='30'
                />
              </Tooltip>
              {/* <label htmlFor='Y'>&emsp;Y :&emsp;</label> */}
              <Tooltip  title={'Input a32!'} placement="topLeft" overlayClassName="numeric-input">
                <Input
                style={{
                  width: '12%',
                }}
                name='a32'
                type="number" 
                placeholder='Input Y here!'
                value={this.state.a32}
                onChange={this.handleChange}
                size='30'
                />
              </Tooltip>
              <Tooltip  title={'Input a33!'} placement="topLeft" overlayClassName="numeric-input">
                <Input
                style={{
                  width: '12%',
                }}
                name='a33'
                type="number" 
                placeholder='Input Y here!'
                value={this.state.a33}
                onChange={this.handleChange}
                size='30'
                />
              </Tooltip>&emsp;
              <Tooltip  title={'Input b3!'} placement="topLeft" overlayClassName="numeric-input">
                <Input
                style={{
                  width: '12%',
                }}
                name='b3'
                type="number" 
                placeholder='Input b3!'
                value={this.state.b3}
                onChange={this.handleChange}
                size='30'
                />
              </Tooltip>
            </div>
            <p></p>
            <div>
         
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
              <label htmlFor='x2'>&emsp;X2 :&emsp;</label>
              <Tooltip  title={'Input x2'} placement="topLeft" overlayClassName="numeric-input">
                <Input
                style={{
                  width: '20%',
                }}
                name='x2'
                type="number"
                placeholder='Starting X2'
                value = {this.state.x2}
                onChange={this.handleChange}
                size='8'
                />
              </Tooltip>
              <label htmlFor='x3'>&emsp;X3 :&emsp;</label>
              <Tooltip  title={'Input X3'} placement="topLeft" overlayClassName="numeric-input">
                <Input
                style={{
                  width: '20%',
                }}
                name='x3'
                type="number"
                placeholder='Starting X3'
                value = {this.state.x3}
                onChange={this.handleChange}
                size='8'
                />
              </Tooltip>
              
            </div>
            <p></p>
            {/* <div><label htmlFor='fx'>&emsp;f({this.state.x0}) = {this.state.ans}&emsp;</label></div> */}
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
                                                              <th>X1</th>
                                                              <th>X2</th>
                                                              <th>X3</th>
                                                              <th>Error(x1)</th>
                                                              <th>Error(x2)</th>
                                                              <th>Error(x3)</th>
                                                              
                                                              
                                                              
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