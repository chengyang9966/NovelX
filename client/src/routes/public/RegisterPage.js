import Title from "../../components/Title"
import Register from "../../components/register"
import CopyRight from "../../components/CopyRight"
export default (params) => {
    return(
        <div className='loginOuterContainer'> 
        <Title/>   
        <div className='loginContainter'>
        <Register/>         
        </div>
        <CopyRight/>
        </div>
    )
}
