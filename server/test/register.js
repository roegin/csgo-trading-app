const axios = require('axios'); // 如果你在浏览器环境下，不需要这一行

async function registerUser(username, password) {
    try {
        const response = await axios.post(SERVER_URL+'/users/register', {  // 修改为你自己的服务器地址
            username,
            password
        });

        console.log(response.data.msg);  // "User created successfully"
    } catch (error) {
        console.error(`Error: ${error.response.data.msg}`);  // "User already exists" 或其他错误信息
    }
}


// 使用你自己的用户名和密码调用这个函数
registerUser('wangbuai', '1234');