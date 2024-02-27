let SERVER_URL;

if (process.env.NODE_ENV === 'development') {
 SERVER_URL = process.env.REACT_APP_DEV_SERVER_URL || "http://localhost:4000";
} else if (process.env.NODE_ENV === 'production') {
 SERVER_URL = process.env.REACT_APP_PROD_SERVER_URL || "http://alex.shinestu.com:4000";
}

console.log('SERVER_URL',SERVER_URL,process.env.NODE_ENV)

export { SERVER_URL };