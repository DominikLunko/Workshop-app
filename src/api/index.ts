import axios from 'axios';
import { Order } from '../redux/actions/orderActionTypes';

const API = axios.create({baseURL: 'https://dominiklunko-workshop-app.herokuapp.com'});



export const getMaxCountOfCategory = (category:string) => API.get(`/workshops?category=${category}`);
export const getCategoryByPage = (page:number, category:string) => API.get(`/workshops?category=${category}&_page=${page}&_limit=9`);
export const getAllCategoryByPage = (page:number) => API.get(`/workshops?_page=${page}&_limit=9`);
export const getMaxCountOfAllCategory = () => API.get('/workshops');


export const getWorkshopById = (id:number) => API.get(`/workshops/${id}`);
export const getUserByWorkshopUserID = (userId:number) => API.get(`/users/${userId}`);
export const getSimilarWorkshops = (category:string, id:number) => API.get(`/workshops?category=${category}&id_ne=${id}&_limit=3`);

export const addToCartURL = (id:number) => API.get(`/workshops?id=${id}`)

export const createOrder = (order:Order) => API.post('/orders', order);