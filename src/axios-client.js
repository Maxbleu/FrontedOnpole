import axios from "axios";

//  Indicamos al cliente axios donde esta la ruta de la api
//  para trabajar con ella.
const axiosClient = axios.create({
    baseURL : import.meta.env.VITE_API_BASE_URL
});

axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("ACCESS_TOKEN");
    config.headers.Authorization= `Bearer ${token}`
    return config;
});

axiosClient.interceptors.response.use((response) => {
    return response;
}, (error) => {
    try{
        const {response} = error;
        if(response.status === 401){
            localStorage.removeItem("ACCESS_TOKEN");
        }
    }catch(error){
        console.log(error);
    }
    throw error;
})

export default axiosClient;
