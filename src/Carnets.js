import React from 'react'
import Carnet from './Carnet.js'
import NewCarnet from './NewCarnet.js'
import EditCarnet from './EditCarnet.js'
import SearchCarnet from './SearchCarnet.js'
import Alert from './Alert.js'
import CarnetsApi from './CarnetsApi.js'

class Carnets extends React.Component{
    constructor(props){
        super(props);
        this.state={
            errorInfo:null,
            carnets:[],
            isEditing:{},
            allCarnets:[]
        };
        this.handleEdit = this.handleEdit.bind(this);
        this.addCarnet=this.addCarnet.bind(this);
        this.handleCloseError = this.handleCloseError.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleRetire = this.handleRetire.bind(this);
        this.handdleSearch= this.handdleSearch.bind(this);
        this.handleShowAll=this.handleShowAll.bind(this);
    }

    componentDidMount(){
        CarnetsApi.getAllCarnets().then(
            (result)=>{
                this.setState({
                    carnets:result,
                    allCarnets:result
                })
            },
            (error)=>{
                this.setState({
                    errorInfo:"Problemas al cargar los carnets."
                })
            }
        )
    }

    handleShowAll(){
        this.setState({
            carnets: this.state.allCarnets
        });
    }

    handdleSearch(DNI){
        const carnets=this.state.carnets;
        const allCarnets=this.state.allCarnets;

        if(DNI===''){
            this.setState(prevState=>({
                errorInfo:"Introduce un DNI",
                carnets:this.state.allCarnets
            }))
        }

        else if(!allCarnets.find(c=>c.DNI === DNI)){
            this.setState(prevState=>({
                errorInfo:"No existe carnet con el DNI: "+DNI,
                carnets:this.state.allCarnets
            }))
        }

        else{
            this.setState(prevState=>({  
                carnets: prevState.allCarnets.filter((c)=>c.DNI === DNI)                            
            }))  
        }        
         
    }

    handleRetire(carnet){

        CarnetsApi.retireOrRevalidate(carnet.DNI,carnet.valid).then(
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
            })
        );       
    }

    handleDelete(carnet){
        CarnetsApi.deleteCarnet(carnet.DNI).then(
            this.setState(prevState=>({
                carnets: prevState.carnets.filter((c)=>c.DNI!== carnet.DNI),
                allCarnets: prevState.carnets.filter((c)=>c.DNI!== carnet.DNI),
            }))
        )
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
        const name=carnet.name
        const surname=carnet.surname
        const age=carnet.age
        const vehicleType=carnet.vehicleType
        const valid=carnet.valid
        CarnetsApi.updateCarnet(DNI,name,surname,age,vehicleType,valid).then(
            this.setState(prevState =>{
                const isEditing = Object.assign({}, prevState.isEditing);
                delete isEditing[DNI];
    
                if (DNI===carnet.DNI){
                    const carnets = prevState.carnets;
                    const allCarnets = prevState.allCarnets;
                    const pos = carnets.findIndex(c => c.DNI === carnet.DNI);
                    return {
                        carnets: [...carnets.slice(0,pos), Object.assign({}, carnet), ...carnets.slice(pos+1)],
                        allCarnets: [...allCarnets.slice(0,pos), Object.assign({}, carnet), ...allCarnets.slice(pos+1)],
                        isEditing: isEditing
                    }
                }
     
                return{
                    errorInfo: "No se puede modificar el DNI.",
                }
            })
        )
    }

    addCarnet(carnet){
        const name=carnet.name
        const surname=carnet.surname
        const DNI=carnet.DNI
        const age=carnet.age
        const vehicleType=carnet.vehicleType
        const valid=carnet.valid
        CarnetsApi.addNewCarnet(name,surname,DNI,age,vehicleType,valid).then(
            this.setState(prevState =>{
                const carnets=this.state.carnets;
                if(!carnets.find(c=>c.DNI === carnet.DNI)){
                    return({
                        carnets:[...prevState.carnets,carnet],
                        allCarnets:[...prevState.allCarnets,carnet]
                    });
                };
                
                return({
                    errorInfo:"Ya existe el carnet con ese DNI."
                });
            })
        );
        
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
                        
                        <div>
                            <SearchCarnet onAddDNI={this.handdleSearch} showAll={this.handleShowAll}></SearchCarnet><br></br>
                        </div>

                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Apellido</th>
                                    <th>DNI</th>
                                    <th>Edad</th>
                                    <th>Tipo</th>
                                    <th>Válido</th>
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