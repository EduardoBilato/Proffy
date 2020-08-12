import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.0.105:3333", // colocar o endereço na sessão Connection do Expo e a porta do server
});

export default api;
