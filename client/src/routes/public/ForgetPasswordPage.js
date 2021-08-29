import Title from "../../components/Title"
import ForgetPassword from "../../components/ForgetPassword"
import CopyRight from "../../components/CopyRight"
export default (params) => {
    return(
        <div className='loginOuterContainer'> 
        <Title/>   
        <div className='loginContainter'>
        <ForgetPassword/>         
        </div>
        <CopyRight/>
        </div>
    )
}
