import axios from 'axios'
console.log('process.env.NODE_ENV',process.env.NODE_ENV)
let apiUrl;
if(process.env.NODE_ENV=="production"||1){
   apiUrl="http://node.itianhuihui.com/translate/lang";
}else{
    apiUrl="http://localhost:3000/lang";
}
export  function getHot(){
    return axios({
          method:"get",
          url:`${apiUrl}/hot`,
        })
}

export  function getLangs(){
    return axios({
        method:"get",
        url:`${apiUrl}/list`,
      })
}


export  function getResult(params){
  return axios({
      method:"post",
      data:params,
      url:`${apiUrl}/result`,
    })
}
