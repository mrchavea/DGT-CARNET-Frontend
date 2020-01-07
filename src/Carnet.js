import React from 'react'
import { faCheck} from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Carnet (props){
    if(props.carnet.valid){
        var valid= <FontAwesomeIcon icon={faCheck} size="2x"/>
        var msg="Retirar"

    }
    else{
        var valid= <FontAwesomeIcon icon={faTimes} size="2x"/>
        var msg="Revalidar"
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
                </td>
                <td>
                <button className="btn btn-primary" onClick={() => props.onRetire(props.carnet)}>{msg}</button>

                </td>
                <td>
                    <button className="btn btn-primary" onClick={() => props.onDelete(props.carnet)}>Eliminar</button>
                </td>
            </tr>
    );
}


export default Carnet ;