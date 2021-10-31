import Title from "../../components/Title"
import Login from "../../components/login"
import CopyRight from "../../components/CopyRight"
const loginPage= (params) => {
    return(
        <div className='loginOuterContainer'> 
        <Title/>   
        <div className='loginContainter'>
        <Login/>         
        </div>
        <CopyRight/>
        </div>
    )
}
export default loginPage