import axios from "axios";

axios.defaults.baseURL = 'http://localhost:3000';

export default class ApiServices {
    
    static goods = []
    constructor() {
        this.goods = [];
    }

    getGoods(){
        return axios
        .get('goods')
        // .get('http://localhost:3000/goods')
        .then(({data}) => {
            ApiServices.goods = [...ApiServices.goods,...data];
            return data
        })
        .catch(error => console.log(error));
    }

    postGood(data){
        return axios
        .post('orders', data)
        .then(console.log)
        .catch(error => console.log(error))
        
    }
}

const api = new ApiServices();

// api.getGoods().then(console.log);
// api.getGoods().then(resp => console.log(resp));



