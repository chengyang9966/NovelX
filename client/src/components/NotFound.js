const NotFound=()=>{
    return(
            
        <div style={{height:'100vh'}} className="d-flex align-items-center justify-content-center flex-column">    
        <h1 className="display-1 titleRed">
           404 
        </h1>
        <div style={{textTransform:'uppercase'}}>
        Oops! Nothing Was Found
        </div>
        <p style={{width:'800px',textAlign:'center'}}>
        The page you are looking for might have been removed had its name changed or is temporarily unavailable.
        &nbsp;
        <a href="/home" className="titleRed">Return to homepage
            </a> 
        </p>
            </div> 
        
    )
}

export default NotFound