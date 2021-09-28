import Title from "../../components/Title"
import Register from "../../components/register"
import CopyRight from "../../components/CopyRight"
 const RegisterPage= () => {
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
export default RegisterPage