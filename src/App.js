import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Carnets from './Carnets.js';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';




function App() {
  
  const carnets=[{
    name: "Pogu",
    surname:"Pigut",
    DNI: "49075130F",
    age: 22,
    vehicleType:"coche",
    valid:true
  },
  {
    name: "Juan",
    surname:"Perez",
    DNI: "1234K",
    age: 22,
    vehicleType:"coche",
    valid:true

  },
  {
    name: "Juan",
    surname:"Perez",
    DNI: "1111W",
    age: 22,
    vehicleType:"moto",
    valid:true
 
  },
  {
    name: "Pigut",
    surname:"Perez",
    DNI: "343363G",
    age: 22,
    vehicleType:"coche",
    valid:false
 
  },
  {
    name: "Juan",
    surname:"Perez",
    DNI: "233533E",
    age: 22,
    vehicleType:"coche",
    valid:true
  }
];


  return (
    <div class="container-fluid">
            <h1>Carnets</h1>
          <Row>
            <Col>
              <Carnets carnets={carnets}/>
            </Col>
          </Row>
    </div>
  );
}

export default App;
