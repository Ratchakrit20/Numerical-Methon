import React from "react";
import { render } from "@testing-library/react";
import {Input,Tooltip,Button} from 'antd'
import Plotly from 'plotly.js-dist-min'



export default class Crammer extends React.Component{
    constructor(props){
        super(props)
        this.state={
            val:[[]],
            show_total:[],
            size_array:'',
            show_martix_web:[]
        }
        
        this.handleChange = this.handleChange.bind(this)
        this.handleAdd = this.handleAdd.bind(this)
        this.CarmersCalcFunction = this.CarmersCalcFunction.bind(this)
        
        
      }
      CarmersCalcFunction(size_array,val,show_web)
    {
      console.log(val)
      var a = [[]]
      var k=0,i=0,j=0
      for(i=0;i<size_array;i++)
      {
        a[i]= [];
        for(k=0;k<size_array+1;k++)
        {
            a[i][k] = val[i][k]
        }
  
      }
     var x = []
      for(k=0;k<size_array;k++){
          for(i=k+1;i<size_array;i++){
              var temp = a[i][k]/a[k][k]
              for(j=k+1;j<=size_array;j++){
                  a[i][j] = a[i][j] - temp*a[k][j]
              }
          }
      }
      for(i=size_array-1;i>=0;i--){
          x[i] = a[i][size_array]
          for(j=i+1;j<size_array;j++){
              x[i] = x[i]-a[i][j]*x[j]
          }
          x[i] = x[i]/a[i][i]
      }
      
      for(i=0;i<size_array;i++){
          console.log(x[i])
     
      }
      this.setState({show_total:(x)})
      show_web =[[]]
      for(i=0;i<size_array;i++)
      {
        show_web[i]= [];
        for(k=0;k<size_array+1;k++)
        {
          if(k<size_array-1)
          {
          show_web[i][k] = val[i][k] *x[k]
          }
          else if(k<size_array)
          {
            show_web[i][k] = val[i][k] *x[k]
          }
          else if(k===size_array){
            show_web[i][k] = val[i][k]
          }
        }
  
  
      }
      console.log(show_web)
      this.setState({show_martix_web:(show_web)})
    }
      
    handleChange(rowIndex, columnIndex,event){
      this.state.val[rowIndex][columnIndex] =  Number(event.target.value);
        
    }
    handleAdd=(e)=>{
            var array = [[]]
            for(var i=0;i<Number(e.target.value);i++)
            {
              array[i]= [];
              for(var k=0;k<Number(e.target.value)+1;k++)
              {
                array[i][k]= 0;
              }
            }
            console.log(array);
            this.setState({val:(array)})
            this.setState({size_array:(Number(e.target.value))})
           }
      
    
    render(){
      
        return(
            <div>
          <form onSubmit={this.handleSubmit}>
          <div className='head'>
            <div >
              <h1>&emsp;Crammer  Method&emsp;</h1>
              <Tooltip  title={'Input Matrix!'} placement="topLeft" overlayClassName="numeric-input">
                <Input
                style={{
                  width: '12%',
                }} 
                
                type="number" 
                placeholder='N*N'
                
                onChange={this.handleAdd}
                size='30'
                />
              </Tooltip>
              <center>
                                                        <div>
                                                          <table >
                                                          
                                                          <tbody>
                                                            {this.state.val.map((row, rowIndex) => (
                                                                    <tr>
                                                                        {row.map((column, columnIndex) => (
                                                                        <td>
                                                                            <Tooltip  title={'Input X3'} placement="topLeft" overlayClassName="numeric-input">
                                                                                <Input
                                                                                id={column} 
                                                                                onChange={e => this.handleChange(rowIndex, columnIndex, e)}
                                                                                />
                                                                            </Tooltip>
                                                                            
                                                                        </td>
                                                                        ))}
                                                                    </tr>
                                                                    ))}
                                                            </tbody>
                                                          </table>
                                                        </div>
                                                        
                                                        
                                                        </center>
              
              
            </div>
            <p></p>
            <div>
            {this.state.show_total.map((total,i)=>(
                    // <h1 id={i}>X{i+1}&nbsp; &nbsp;{total}</h1>
                    <label id={i}>&emsp;X{i+1} = {total}&emsp;</label>
                   ))
                   }
            
            </div>
            <p></p>
            <div>
                &emsp;<Button onClick={()=>this.CarmersCalcFunction(this.state.size_array,this.state.val,this.state.show_web)}>Cal</Button>
                
            </div> 
          </div>
          <p></p>
        
        </form>
      </div>
        )
    }
}