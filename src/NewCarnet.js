import React from 'react'
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class NewCarnet extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name:'',
            surname: '',
            DNI:'',
            age:null,
            vehicleType:'',
            valid:true
        };
        this.changeCarnet=this.changeCarnet.bind(this);
        this.clickAdd=this.clickAdd.bind(this);
        this.resetState=this.resetState.bind(this);
    }

    resetState(){
        this.setState({
            name:'',
            surname: '',
            DNI:'',
            age:null,
            vehicleType:'',
            valid:true
        });
    }

    changeCarnet(event){
        const name = event.target.name;
        const value= event.target.value;
        this.setState({
            [name]:value
        });  
    }

    clickAdd(){
        this.props.onAddCarnet(this.state);
        this.setState({
            name:'',
            surname: '',
            DNI:'',
            age:null,
            vehicleType:'',
            valid:true
        });
    }

    render(){
        return(
            <tr>
                <td><input className="forms-control" name="name" value={this.state.name} onChange={this.changeCarnet} /> </td>
                <td><input className="forms-control" name="surname" value={this.state.surname} onChange={this.changeCarnet} /> </td>
                <td><input className="forms-control" name="DNI" value={this.state.DNI} onChange={this.changeCarnet} /> </td>
                <td><input type="number" min="0" className="forms-control" name="age" value={this.state.age} onChange={this.changeCarnet} /> </td>
                <td><input className="forms-control" name="vehicleType" value={this.state.vehicleType} onChange={this.changeCarnet} /> </td>
                <td><FontAwesomeIcon icon={faCheck} size="2x"/></td>
                <td><button className="btn btn-primary" onClick={this.clickAdd} >Añadir carnet</button></td>
            </tr>
        );
    }
}

export default NewCarnet;