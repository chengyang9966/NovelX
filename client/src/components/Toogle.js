import React from 'react'

const Toogle=({checked,onChange})=>{
    return(
        <>
      <div className="d-flex TitleContainer">
      <label className="form-check-label" >Splyt Singapore Pte. Ltd</label>

        <div className="form-check form-switch">
  <input className="form-check-input" value={checked} onChange={onChange} type="checkbox" id="flexSwitchCheckDefault"/>
  <label className="form-check-label" for="flexSwitchCheckDefault">Splyt (London)</label>
    </div>
      </div>
        </>
    )
}
export default Toogle


  {/* <div className="d-flex">
        <input readOnly value="Splyt Singapore Pte. Ltd."/>
        <input type="checkbox" checked={checked} data-toggle="toggle" data-size="normal"/>
        <input readOnly value="Splyt (London)"/>
        </div> */}