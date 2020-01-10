import React from 'react'

class SearchCarnet extends React.Component{
    constructor(props){
        super(props);
        this.state={
            DNI:''
        };
        this.changeDNI=this.changeDNI.bind(this);
        this.clickAdd=this.clickAdd.bind(this);
    }

    changeDNI(event){
        const DNI = event.target.name;
        const value= event.target.value;
        this.setState({
            [DNI]:value
        });  
    }

    clickAdd(){
        this.props.onAddDNI(this.state.DNI);
        this.setState({
            DNI:''
        });  
    }

    render(){
        return(
            <div>
                <input type="text" placeholder="Buscar por DNI..." className="forms-control" name="DNI" value={this.state.DNI} onChange={this.changeDNI}/> <button onClick={this.clickAdd} className="btn btn-primary">Buscar</button> <button onClick={()=>this.props.showAll()} className="btn btn-primary">Mostrar todos</button>       
            </div>
        );
    }
}

    

export default SearchCarnet;