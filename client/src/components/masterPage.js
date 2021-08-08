import Navbar,{SideMenu} from './navbar';

const MasterPageLayout=(props)=>{
    return(
        <div style={{display:'flex'}}>
            <div style={{width:'10%',backgroundColor:'white',minWidth:'170px'}}>
           <SideMenu/>
            </div>
            <div className="Container-Right">
           {props.children}
            </div>
        </div>
    )
}

export default  MasterPageLayout