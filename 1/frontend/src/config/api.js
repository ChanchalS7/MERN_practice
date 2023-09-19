import axios from "axios";
const API_BASE_URL='https://fakestoreapi.com/products'
export const fetchProduct=()=>{
    return axios.get(`${API_BASE_URL}`)
}
