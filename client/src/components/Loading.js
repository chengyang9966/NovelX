const Loading=()=>{
    return (
        <div style={{width:'100vw',height:'100vh',backgroundColor:'rgba(0,0,0,0.5)'}} className="d-flex align-items-center justify-content-center">
        <div className="spinner-border text-light" style={{width:'8rem',height:'8rem'}} role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <div style={{position:'absolute'}}>
          <img src="/NovelX.png" width="70rem" height="70rem"/>
      </div>
        </div>
    )
}
export default Loading