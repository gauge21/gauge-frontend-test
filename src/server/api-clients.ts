import axios from "axios";
import * as $ from "jquery"


export const fetchUserData = async () => {
    try {
        const response = await axios.get("https://gauge-functions.azurewebsites.net/api/Input?");
        const data = response.data;
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Rethrow the error to handle it further up the call stack if needed
    }
};

export const addUserData = async (userInfo:any) => {

    const resp = await axios.post("https://gauge-functions.azurewebsites.net/api/Output", JSON.stringify(userInfo))
    .then(response => {
        const data = response.data
    })
    .catch(error => {
        console.error('Server responded with status:', error.response.status);
        console.error('Response data:', error.response.data);
    })

    
    return resp
}