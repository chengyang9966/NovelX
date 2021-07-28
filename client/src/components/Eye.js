import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye,faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const EyesIcon=(select,setSelect)=>{

    return(
        <div className="IconView">
           {select? <FontAwesomeIcon onClick={setSelect} icon={faEye}/>:
            <FontAwesomeIcon  onClick={setSelect} icon={faEyeSlash}/>}
        </div>
    )    
}

export default EyesIcon