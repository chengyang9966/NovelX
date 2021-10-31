const Loading=()=>{
    return (
        <div  className=" popUp-Bg d-flex align-items-center justify-content-center">
        <div className="spinner-border text-light" style={{width:'8rem',height:'8rem'}} role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <div style={{position:'absolute'}}>
          <img src="/NovelX.png" width="70rem" height="70rem" alt='logo'/>
      </div>
        </div>
    )
}
export default Loading