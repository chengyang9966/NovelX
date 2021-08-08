const Expired=()=>{
    return(
            
        <div style={{height:'100vh'}} className="d-flex align-items-center justify-content-center flex-column">    
        <h1 className="display-1 titleRed">
           404 
        </h1>
        <div style={{textTransform:'uppercase'}}>
        Linked Expired 
        </div>
        <p style={{width:'800px',textAlign:'center'}}>
        The link that you are have are expired or it might been removed or is temporarily unavailable.
        &nbsp;
        <a href="/home" className="titleRed">Return to homepage
            </a> 
        </p>
            </div> 
        
    )
}

export default Expired