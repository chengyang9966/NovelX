const Slider=({value,onChange})=>{
    return(
        <>
        <div className="TitleContainer">
<input type="range" className="form-range" value={value} onChange={onChange} id="customRange2"/>
<div style={{textAlign:'center',marginTop:'10px'}}>{value} numbers of Taxis</div>
        </div>
</>
    )
}

export default Slider