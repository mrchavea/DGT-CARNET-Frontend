import React from 'react'
import { faCheck} from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function EditCarnet(props){
    const handleChange = event =>{
        props.onChange({...props.carnet, [event.target.name]: event.target.value})
    }
    if(props.carnet.valid){
        var valid= <FontAwesomeIcon icon={faCheck} size="2x"/>

    }
    else{
        var valid= <FontAwesomeIcon icon={faTimes} size="2x"/>
    }
    return(
        <tr>
            <td><input className="forms-control" name="name" value={props.carnet.name} onChange={handleChange}/> </td>
            <td><input className="forms-control" name="surname" value={props.carnet.surname} onChange={handleChange}/> </td>
            <td><input className="forms-control" name="DNI" readonly value={props.carnet.DNI} onChange={handleChange}/> </td>
            <td><input type="number" min="0" className="forms-control" name="age" value={props.carnet.age} onChange={handleChange}/> </td>
            <td><input className="forms-control" name="vehicleType" value={props.carnet.vehicleType} onChange={handleChange}/> </td>
            <td>{valid}</td>
            <td><button className="btn btn-primary" onClick={()=>props.onSave(props.carnet)}>Guardar</button></td>
            <td><button className="btn btn-primary" onClick={()=>props.onCancel(props.carnet)} >Cancelar</button></td>
        </tr>
    );
}

export default EditCarnet;