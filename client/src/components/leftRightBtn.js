const LeftRightBtn=({text,totalPage,leftBtn,rigthBtn})=>{
    return(
        <div style={{display:'flex',backgroundColor:'white',alignItems:'center'}}>
      <button style={{pointerEvents:Number(text)===1&&'none'}} onClick={leftBtn&&leftBtn} className='arrowBtn'><i className='arrow left'></i> </button>
        {text&&
        <div style={{fontSize:'18px',margin:'0px 10px'}}>
            {text} of {totalPage}
        </div>
        }
      <button style={{pointerEvents:Number(totalPage)===Number(text)&&'none'}} onClick={rigthBtn&&rigthBtn} className='arrowBtn'><i  className='arrow right'></i></button>

        </div>
    )
}

export default LeftRightBtn