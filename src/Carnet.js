import React from 'react'
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Carnet (props){
    if(props.carnet.valid){
        var valid= <FontAwesomeIcon icon={faCheckCircle} size="2x"/>

    }
    else{
        var valid= <FontAwesomeIcon icon={faTimesCircle} size="2x"/>
    }
    return(
            <tr>
                <td>{props.carnet.name}</td>
                <td>{props.carnet.surname}</td>
                <td>{props.carnet.DNI}</td>
                <td>{props.carnet.age}</td>
                <td>{props.carnet.vehicleType}</td>
                <td>{valid}</td>
                <td>
                    <button className="btn btn-primary" onClick={() => props.onEdit(props.carnet)}>Editar</button>
                    <button className="btn btn-primary" onClick={() => props.onDelete(props.carnet)}>Retirar</button>
                    <button className="btn btn-primary" onClick={() => props.onDelete(props.carnet)}>Eliminar</button>
                </td>
            </tr>
    );
}


export default Carnet ;