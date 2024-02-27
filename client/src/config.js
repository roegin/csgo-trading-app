let SERVER_URL;



if (process.env.BUff_ENV === 'development') {
    SERVER_URL = process.env.REACT_APP_PROD_SERVER_URL || "http://localhost:4000";
}else{
    SERVER_URL = process.env.REACT_APP_DEV_SERVER_URL || "http://alex.shinestu.com:4000";
}

console.log('SERVER_URL',SERVER_URL,process.env.BUff_ENV)

export { SERVER_URL }; //一到两周上连,四月上旬能开出武器 //厚黑学 /资治通鉴