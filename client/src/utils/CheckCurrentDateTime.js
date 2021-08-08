import moment from 'moment';

const CurrentDateTimeInString=()=>{
    let current =new Date();
    current= moment(current).format('hh')
    let temp= Number(current.slice(0,2))
    if(temp<12){
        return 'Good Morning'
    }else if(temp<20){
        return 'Good Evening'
    }else{
        return 'Good Night'
    }
}
export {CurrentDateTimeInString}