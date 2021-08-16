import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAd,faPlus,faClock,faFolder } from "@fortawesome/free-solid-svg-icons"
const SmallCard=({title,displayArray,onClick,AddBtn,cardClick})=>{
return(

        <div className="card text-center SmallCardWrapper" >
        <div style={{backgroundColor:'white',fontWeight:'bold',paddingBottom:'0px'}} className="card-body d-flex justify-content-between align-items-center px-5">
    <h5 className="card-title  mt-2 titleText">Hewr</h5>
    {AddBtn&& <FontAwesomeIcon className='iconClick' onClick={onClick} icon={faPlus}/>}
  </div>
  <div className="card-body px-5 SmallCardBodyWrapper">
    {
        displayArray.map((w,i)=>{
            return(
                <div key={w+i} onClick={onClick?()=>cardClick(w):null} className={`${onClick&&'pointer'} ${i===0&&'border-top-round'} ${i===displayArray.length-1&&'border-bottom-round'} card-body-Layout d-flex justify-content-between align-items-center px-3`} >
                  <div  className="iconSm">
                  <FontAwesomeIcon icon={w.icon==='Clock'?faClock:faFolder}/>
                    </div>
                    <div style={{width:'100%'}} className=" d-flex justify-content-between align-items-center px-3" >
                    <div>{w.title}</div>
                    <div className="Hdivider"/>
                    </div>
                    <div>{w.desc}</div>
                    </div>
            )
        })
    }
  </div>
        </div>
 
)
}
export default SmallCard