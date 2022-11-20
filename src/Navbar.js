import React from "react";
import { Button, Dropdown, Menu, Space } from 'antd';
import 'antd/dist/antd.css';
import './App.css';
import {Link} from 'react-router-dom';

const menu = (
        <Menu
          items={[
            {
              key: '1',
              label: (
                <div><Link to="/Bisection">Bisection</Link></div>
              ),
            },
            {
              key: '2',
              label: (
                <div><Link to="/False">False Position Method</Link></div>
              ),
            },
            {
              key: '3',
              label: (
                <div><Link to="/OnePoint">One Point Method</Link></div>
              ),
            },
            {
                key: '4',
                label: (
                    <div><Link to="/Newton">Newton Raphson Method</Link></div>
                ),
            },
            {
              key: '5',
              label: (
                  <div><Link to="/Secant">Secant Method</Link></div>
              ),
          },
          ]}
        />
      );
const menu1 = (
        <Menu
          items={[
            {
              key: '1',
              label: (
                <div><Link to="/Crammer">Crammer's Rule</Link></div>
              ),
            },
            {
              key: '2',
              label: (
                <div><Link to="/False">Gauss Elimination Method</Link></div>
              ),
            },
            {
              key: '3',
              label: (
                <div><Link to="/OnePoint">Gauss Jordan Method</Link></div>
              ),
            },
            {
                key: '4',
                label: (
                    <div><Link to="/Jacobi">Jacobi Method</Link></div>
                ),
            },
            {
                key: '5',
                label: (
                    <div><Link to="/Gauss_si">Gauss Seidel Method</Link></div>
                ),
            },
            {
                key: '6',
                label: (
                    <div><Link to="/Newton">Conjugate Method</Link></div>
                ),
            },
          ]}
        />
      );
      const menu2 = (
        <Menu
          items={[
            {
              key: '1',
              label: (
                <div><Link to="/Newton's">Newton's divided-differences</Link></div>
              ),
            },
            {
              key: '2',
              label: (
                <div><Link to="/Lagrange">Lagrange polynomials</Link></div>
              ),
            },
            {
              key: '3',
              label: (
                <div><Link to="/Spline">Spline interpolation</Link></div>
              ),
            }
          ]}
        />
      );
      const menu3 = (
        <Menu
          items={[
            {
              key: '1',
              label: (
                <div><Link to="/">Least-Squares Regression</Link></div>
              ),
            },
            {
              key: '2',
              label: (
                <div><Link to="/">Polynomial Regression</Link></div>
              ),
            },
            {
              key: '3',
              label: (
                <div><Link to="/">Multiple Linear Regression</Link></div>
              ),
            }
          ]}
        />
      );


function Navbar(){
    
      
return (
    <>
    <header className="Navbar">Numerical Method 
    &nbsp;
    <Space direction="vertical">
        <Space wrap>
            <Button ghost>
                <Link to="/">HOME</Link>
            </Button>
            <Dropdown overlay={menu} placement="bottomLeft">
                <Button ghost>ROOT OF EQUATIONS</Button>
            </Dropdown>
            <Dropdown overlay={menu1} placement="bottomLeft">
                <Button ghost>LINEAR ALGEBRA</Button>
            </Dropdown>
            <Dropdown overlay={menu2} placement="bottomLeft">
                <Button ghost>Interpolation and Extrapolation</Button>
            </Dropdown>
            <Dropdown overlay={menu3} placement="bottomLeft">
                <Button ghost>Regression</Button>
            </Dropdown>
        </Space> 
    </Space>     
    </header>
    
    
    </>
    )
}
export default Navbar