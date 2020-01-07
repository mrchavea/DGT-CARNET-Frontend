import React from 'react'
import Carnet from './Carnet.js'
import NewCarnet from './NewCarnet.js'
import EditCarnet from './EditCarnet.js'
import Alert from './Alert.js'

class Carnets extends React.Component{
    constructor(props){
        super(props);
        this.state={
            errorInfo:null,
            carnets:this.props.carnets,
            isEditing:{}
        };
        this.handleEdit = this.handleEdit.bind(this);
        this.addCarnet=this.addCarnet.bind(this);
        this.handleCloseError = this.handleCloseError.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleRetire = this.handleRetire.bind(this);
    }

    handleRetire(carnet){

        this.setState(prevState =>{
            if(carnet.valid){
                carnet.valid=false
            }
            else{
                carnet.valid=true
            }
            const carnets = prevState.carnets;
            const pos = carnets.findIndex(c => c.DNI === carnet.DNI);
            return {
                carnets: [...carnets.slice(0,pos), Object.assign({}, carnet), ...carnets.slice(pos+1)],
            }
        });

        // this.setState(prevState=>({
        //     carnets:prevState.carnets.filter((c)=>c.DNI === carnet.DNI)

        // }))
    }

    handleDelete(carnet){
        this.setState(prevState=>({
            carnets: prevState.carnets.filter((c)=>c.DNI!== carnet.DNI)
        }))
    }

    handleCancel(DNI,carnet){
        this.setState(prevState=>{
            const isEditing=Object.assign({},prevState.isEditing);
            delete isEditing[DNI];
            return{
                isEditing:isEditing
            }
        })
    }

    handleChange(DNI,carnet){
        this.setState(prevState=>({
            isEditing:{...prevState.isEditing, [DNI]:carnet}
        }))
    }

    handleSave(DNI, carnet){
        this.setState(prevState =>{
            const isEditing = Object.assign({}, prevState.isEditing);
            delete isEditing[DNI];

            if (DNI===carnet.DNI){
                const carnets = prevState.carnets;
                const pos = carnets.findIndex(c => c.DNI === carnet.DNI);
                return {
                    carnets: [...carnets.slice(0,pos), Object.assign({}, carnet), ...carnets.slice(pos+1)],
                    isEditing: isEditing
                }
            }
 
            return{
                errorInfo: "No se puede modificar el DNI.",
            }
        });
    }

    addCarnet(carnet){

        this.setState(prevState =>{
            const carnets=this.state.carnets;
            if(!carnets.find(c=>c.DNI === carnet.DNI)){
                return({
                    carnets:[...prevState.carnets,carnet]
                });
            };
            
            return({
                errorInfo:"Ya existe el carnet con ese DNI."
            });
        });
    }

    handleEdit(carnet){
        this.setState(prevState=>({
            isEditing: {...prevState.isEditing,[carnet.DNI]:carnet}
        }));
    }

    handleCloseError(){
        this.setState({
            errorInfo: null
        });
    }
    
        render(){
            return(
                <div>

                    <Alert message={this.state.errorInfo} onClose={this.handleCloseError}/>
                
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Surname</th>
                                    <th>DNI</th>
                                    <th>Age</th>
                                    <th>Type</th>
                                    <th>Valid</th>
                                </tr>
                            </thead>
                            <tbody>
                                <NewCarnet onAddCarnet={this.addCarnet} ></NewCarnet>
                                {this.state.carnets.map((carnet)=>
                                    !this.state.isEditing[carnet.DNI]?
                                    <Carnet key={carnet.DNI} carnet = {carnet} 
                                    onEdit={this.handleEdit}
                                    onDelete={this.handleDelete}
                                    onRetire={this.handleRetire}/>
                                    :
                                    <EditCarnet key={carnet.DNI} carnet = {this.state.isEditing[carnet.DNI]} 
                                    onCancel={this.handleCancel.bind(this,carnet.DNI)}
                                    onChange={this.handleChange.bind(this,carnet.DNI)}
                                    onSave={this.handleSave.bind(this,carnet.DNI)}/>

                                )}
                            </tbody>
                        </table>  
                </div>

        );
    }
    
}




export default Carnets ;