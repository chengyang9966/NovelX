import React, { useEffect, useState } from "react";
import Card from "../../components/Card";
import CardBtn from "../../Types/CardBtnList";
import HeaderText from "../../components/HeaderText";

const PersonalPage = () => {
  const [cardOpen, setcardOpen] = useState(false);
  const [CardDetails, setCardDetails] = useState(CardBtn);
  const [Image,setImage]=useState(null)

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
    let valueName= event.target.files[0].name;

    var reader = new FileReader();
    reader.onload = function(){
      setImage(reader.result);
    };
   reader.readAsDataURL(event.target.files[0]);

}
  return (
    <>
      <HeaderText >
        <div className="mb-3">
          <label for="formFile" className="form-label">
            Upload Avatar
          </label>
          <input className="form-control" type="file" id="formFile" accept="image/*"   onChange={(e)=>LoadImage(e)} />
        {Image&&
        <div style={{marginTop:'10px'}}>
        <img className="ImagePreview" src={Image}/>
        </div>
        }
        </div>
      </HeaderText>
      {cardOpen && (
        <Card
          title={CardDetails.title}
          description={CardDetails.description}
          setClose={CardDetails.setClose}
        />
      )}
    </>
  );
};
export default PersonalPage;
