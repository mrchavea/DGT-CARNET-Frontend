import Carnet from './Carnet.js'

class CarnetsApi{
    static API_BASE_URL = "/traffic_management";

    static requestHeaders(){
        return{}
    }

    static getAllCarnets(){
        const headers= this.requestHeaders();
        const request= new Request(CarnetsApi.API_BASE_URL,{
            method:'GET',
            headers:headers
        });

        return fetch(request).then(response=>{
            return response.json();          
        });
    }

    static addNewCarnet(name,surname,DNI,age,vehicleType,valid){
        const headers= this.requestHeaders();
        const request= new Request(CarnetsApi.API_BASE_URL,{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                "name":name,"surname":surname,"DNI":DNI,"age":age,"vehicleType":vehicleType,"valid":valid
            })
            });

        return fetch(request).then(response=>{
            return response.json();          
        });
    }

    static deleteCarnet(DNI){
        const headers= this.requestHeaders();
        const request= new Request(CarnetsApi.API_BASE_URL+"/remove/"+DNI,{
            method:'DELETE',
            headers:{'Content-Type':'text/plain; charset=utf-8'}
            });

        return fetch(request).then(response=>{
            return response.json();          
        });
    }

    static retireOrRevalidate(DNI,valid){
        const headers= this.requestHeaders();
        if(valid){
            const request= new Request(CarnetsApi.API_BASE_URL+"/retire/"+DNI,{
                method:'PUT',
                headers:{'Content-Type':'application/json'}
                });
    
            return fetch(request).then(response=>{
                return response.json();          
            });
        }
        else{
            const request= new Request(CarnetsApi.API_BASE_URL+"/revalidate/"+DNI,{
                method:'PUT',
                headers:{'Content-Type':'application/json'}
                });
    
            return fetch(request).then(response=>{
                return response.json();          
            });
        }
    }

    static updateCarnet(DNI,name,surname,age,vehicleType,valid){
        const headers= this.requestHeaders();
        const request= new Request(CarnetsApi.API_BASE_URL+"/edit/"+DNI,{
            method:'PUT',
            headers:{'Content-Type':'text/plain; charset=utf-8'},
            body:JSON.stringify({
                "name":name,"surname":surname,"DNI":DNI,"age":age,"vehicleType":vehicleType,"valid":valid
            })
            });

        return fetch(request).then(response=>{
            return response.json();          
        });
    }
}

export default CarnetsApi;