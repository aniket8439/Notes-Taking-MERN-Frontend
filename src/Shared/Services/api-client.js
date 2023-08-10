//Backend calls
//CRUD
import axios from 'axios'
export const apiClient = {
    async read() {
        try {
            const response = await axios.get(process.env.REACT_APP_NOTES_URL);
            console.log("response is ", response);
            return response.data.notes; //[{},{},{}]
        } catch (err) {
            throw err;
        }
        //promise State - Pending, Fullfilled, rejected
        // const promise = axios.get(process.env.REACT_APP_NOTES_URL); //Async
        // console.log("Promise is ", promise);
        // promise.then(result => {
        //     console.log("Result is ", result)
        // }).catch(err => {
        //     console.log(err);
        // })
    },
    async readUser() {
        try {
            const response = await axios.get(process.env.REACT_APP_USERS_URL);
            console.log("response is ", response);
            return response.data.users; //[{},{},{}]
        } catch (err) {
            throw err;
        }
        //promise State - Pending, Fullfilled, rejected
        // const promise = axios.get(process.env.REACT_APP_NOTES_URL); //Async
        // console.log("Promise is ", promise);
        // promise.then(result => {
        //     console.log("Result is ", result)
        // }).catch(err => {
        //     console.log(err);
        // })
    },
    insert() {

    },
    update() {

    }
}