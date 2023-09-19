import axios from "axios";

const fetchProducts= axios.create({
baseURL : 'http://localhost:5000/api',
timeout:10000,
})
export default fetchProducts;