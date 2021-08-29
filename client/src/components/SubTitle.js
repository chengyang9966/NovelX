const Subtitle=({title})=>{
    return (
        <div className='d-flex align-items-center flex-column'>
        <h2 style={{fontSize:55}}>
            {title.toUpperCase()}
        </h2>
        </div>
    )
}
export default Subtitle