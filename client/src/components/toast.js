import '../css/toast.css'
import React,{useEffect,useState} from 'react';
import { TYPE } from '../Types/Type';
const Toast=({showToast,time=5000,type=TYPE.DEFAULT,
text='Helloo',
clostToast
})=>{
    useEffect(()=>{
        const timer =setTimeout (()=> clostToast(),time)
       
        return () => clearTimeout(timer);
    })
    useEffect(()=>{
        if(!showToast){
            clostToast()
        }
    },[showToast])
    const BackGroundColor=(type)=>{
        switch (type) {
            case TYPE.WARNING:
                return 'var(--warning)';
            case TYPE.FAIL:
                return 'var(--fail)';

        
            default:
                return 'var(--default)';
        }
    }
    return(
        showToast&&(
        <div
        className='ToastContainer' style={{backgroundColor:BackGroundColor(type)}} >
           <div className='bodyContainter'>
           <div onClick={()=>clostToast()} className='close'></div>
           <div>{text}</div>
           </div>
           <div style={{animationDuration:time,opacity:0.5}} className="toastLine"></div>
       </div>
      )

    )
}

export default Toast