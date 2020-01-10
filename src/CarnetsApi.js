var cors = require('cors')

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
}

export default CarnetsApi;