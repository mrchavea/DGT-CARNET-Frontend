class CarnetsApi{
    static API_BASE_URL = "/api/v1";

    static requestHeaders(){
        return{}
    }

    static getAllCarnets(){
        const headers= this.requestHeaders();
        const request= new Request(CarnetsApi.API_BASE_URL+"/carnets/?apikey=1d1a4c71-f4bf-4e27-aa24-c4c67d22dc92",{
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
        const request= new Request(CarnetsApi.API_BASE_URL+"/carnets/?apikey=1d1a4c71-f4bf-4e27-aa24-c4c67d22dc92",{
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
        const request= new Request(CarnetsApi.API_BASE_URL+"/carnets/remove/"+DNI+"/?apikey=1d1a4c71-f4bf-4e27-aa24-c4c67d22dc92",{
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
            const request= new Request(CarnetsApi.API_BASE_URL+"/carnets/retire/"+DNI+"/?apikey=1d1a4c71-f4bf-4e27-aa24-c4c67d22dc92",{
                method:'PUT',
                headers:{'Content-Type':'application/json'}
                });
    
            return fetch(request).then(response=>{
                return response.json();          
            });
        }
        else{
            const request= new Request(CarnetsApi.API_BASE_URL+"/carnets/revalidate/"+DNI+"/?apikey=1d1a4c71-f4bf-4e27-aa24-c4c67d22dc92",{
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
        const request= new Request(CarnetsApi.API_BASE_URL+"/carnets/edit/"+DNI+"/?apikey=1d1a4c71-f4bf-4e27-aa24-c4c67d22dc92",{
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