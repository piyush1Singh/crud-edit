// https://jsonplaceholder.typicode.com
import axios from "axios";

const api= axios.create({
baseURL: "https://jsonplaceholder.typicode.com"
})

export const addData = ()=>{
    return api.post('/posts')
    }


    export const viewData = ()=>{
        return api.get('/posts')
        }
        export const deleteData = (id)=>{
            return api.delete(`/posts/${id}`)
            }
            export const updateData = (id,post)=>{
                return api.put(`/posts/${id}`,post)
                }