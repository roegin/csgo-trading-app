const axios = require('axios');

// Please replace with your SERVER_URL
const SERVER_URL = "http://alex.shinestu.com:4000";

axios.get(SERVER_URL + '/headers')
    .then(response => {
        console.log("Headers:", response.data);
    })
    .catch(error => {
        console.error("Error:", error);
    });