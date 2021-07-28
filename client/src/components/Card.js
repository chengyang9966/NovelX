import CloseBtn from './closeBtn'

const Card=({title,description,button,buttonText,link})=>{
return(
    <div className="popUp-Bg">
    <div style={{width:'100vw',height:'100vh'}} className=" d-flex align-items-center justify-content-center">
    <div style={{width:'400px',borderRadius:10}} className="card text-center " >
        <div className="card-header">
    <h5 className="card-title  mt-2 ">{title}</h5>
  </div>
  <div style={{minHeight:'200px'}} className="card-body px-4">
    <p className="card-text">{description}</p>
  </div>
  <div className="card-body">
    {button&&<a href={link} className="btn btn-primary w-100">{buttonText}</a>}
  </div>
</div>
    <div className="closeBtn">
    {/* <button   type="button" className="btn-close " aria-label="Close"></button> */}
    <CloseBtn/>
    </div>
    </div>
    </div>
)
}

export default Card