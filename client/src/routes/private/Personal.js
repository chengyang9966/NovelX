import React, { useEffect, useState } from "react";
import Card from "../../components/Card";
import CardBtn from "../../Types/CardBtnList";
import HeaderText from "../../components/HeaderText";
import Loading from "../../components/Loading";
import {CreateImageHeader,CreateHeader} from '../../utils/createToken';
import axios from "axios"
const PersonalPage = () => {
  const [cardOpen, setcardOpen] = useState(false);
  const [CardDetails, setCardDetails] = useState(CardBtn);
  const [Image,setImage]=useState(null)
  const [data,setdata]=useState(null)
  const [loading,setLoading]=useState(false)
  useEffect(()=>{
    let user=JSON.parse(localStorage.getItem('user'))
    axios.get(`api/images/${user.UserId}`,CreateHeader()).then(res=>{
      setImage(res.data[0].imageurl)
    })
  },[])
  let config=CreateImageHeader()
  useEffect(() => {
    setCardDetails({
      ...CardDetails,
      setClose: () => setcardOpen(false),
    });
  },[]);
  const LoadImage=(event)=>{
      if(event.target.files.length===0){
          return
        }
        setdata(event.target.files)
    let valueName= event.target.files[0].name;

    var reader = new FileReader();
    reader.onload = function(){
      setImage(reader.result);
    };
   reader.readAsDataURL(event.target.files[0]);

}
const uploadImage=(e)=>{
  e.preventDefault();
  if (!data) {
    throw new Error('Select a file first!');
  }
  setLoading(true)
  let user=JSON.parse(localStorage.getItem('user'))
  const formData = new FormData();
      formData.append('file', data[0]);
axios.post(`/api/upload/image/${user.UserId}`,
formData
,config).then(res=>{
  setLoading(false)
  console.log(res)
}).catch(err=>{
  setLoading(false)
  console.log(err)
})
}
  return (
    <>
      <HeaderText >
        <div className="mb-3">
          <form onSubmit={uploadImage}>
          <label for="formFile" className="form-label">
            Upload Avatar
          </label>
          <input className="form-control" type="file" id="formFile" accept="image/*"   onChange={(e)=>LoadImage(e)} />
        {Image&&
        <div style={{marginTop:'10px'}}>
        <img className="ImagePreview" src={Image}/>
        </div>
        }
         <button type="submit" className="btn btn-primary rounded-pill">Submit</button>
          </form>

        </div>
      </HeaderText>
      {cardOpen && (
        <Card
          title={CardDetails.title}
          description={CardDetails.description}
          setClose={CardDetails.setClose}
        />
      )}

      {loading&&<Loading/>}
    </>
  );
};
export default PersonalPage;
