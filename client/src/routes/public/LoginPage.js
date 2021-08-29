import Title from "../../components/Title"
import Login from "../../components/login"
import CopyRight from "../../components/CopyRight"
export default (params) => {
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
