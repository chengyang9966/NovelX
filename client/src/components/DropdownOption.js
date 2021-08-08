
const DropdownList=({displayName,onChange,value,dataArray})=>{
    return(
    <select  name={displayName} onChange={onChange} value={value}   className="form-control rounded-pill" >
      <option>Please select an Option</option>
        {
            Array.isArray(dataArray)&&dataArray.length>0
            &&dataArray.map((w,i)=>{
              return(
                <option key={w} value={w}>{w}</option>
            )
            })

        }

      </select>
    )
}

export default DropdownList