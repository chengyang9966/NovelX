import CryptoJS from "crypto-js";


const EncrytionObj=(data)=>{
    if(data){
       let temp= CryptoJS.AES.encrypt(JSON.stringify(data), 'secret key 123').toString();
       console.log('temp: ', temp);
        return  JSON.stringify(data)
    }

}

const DescrytionObj=(data)=>{
    if(data){

        return JSON.parse(data)
    }
}

export {EncrytionObj,DescrytionObj}