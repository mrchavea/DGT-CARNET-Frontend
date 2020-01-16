class CarnetsApi{
    static API_BASE_URL = "/api/v1";

    static requestHeaders(){
        return{}
    }

    static getAllCarnets(){
        const headers= this.requestHeaders();
        const request= new Request(CarnetsApi.API_BASE_URL+"/carnets/?apikey=373db4ad-cecc-44bd-8b31-ebae590bfb37",{
            method:'GET',
            headers:{'Content-Type': 'application/json',
            'Accept': 'application/json'}
        });

        return fetch(request).then(response => {
            return response.json();
        });
    }

    static addNewCarnet(name,surname,DNI,age,vehicleType,valid){
        const headers= this.requestHeaders();
        const request= new Request(CarnetsApi.API_BASE_URL+"/carnets/?apikey=373db4ad-cecc-44bd-8b31-ebae590bfb37",{
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
        const request= new Request(CarnetsApi.API_BASE_URL+"/carnets/remove/"+DNI+"/?apikey=373db4ad-cecc-44bd-8b31-ebae590bfb37",{
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
            const request= new Request(CarnetsApi.API_BASE_URL+"/carnets/retire/"+DNI+"/?apikey=373db4ad-cecc-44bd-8b31-ebae590bfb37",{
                method:'PUT',
                headers:{'Content-Type':'application/json'}
                });
    
            return fetch(request).then(response=>{
                return response.json();          
            });
        }
        else{
            const request= new Request(CarnetsApi.API_BASE_URL+"/carnets/revalidate/"+DNI+"/?apikey=373db4ad-cecc-44bd-8b31-ebae590bfb37",{
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
        const request= new Request(CarnetsApi.API_BASE_URL+"/carnets/edit/"+DNI+"/?apikey=373db4ad-cecc-44bd-8b31-ebae590bfb37",{
            method:'PUT',
            headers:{'Content-Type':'application/json'},
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