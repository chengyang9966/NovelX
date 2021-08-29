const Query=require('../db').query;
const UpdateOne=require('../db').updateOne;
const Auth=require('../utils/jwtToken').Auth
const HashPassword=require('../utils/password').HashPassword



const Contact=function(app){
    app.get('/api/getusercontact/:id',(req,res,next)=>{
        Query(`SELECT u.email,u.fname,u.lname,r.name as rolename,u.roleid ,c.address1,c.address2,c.city,c.state,c.postcode,c.phonenumber,c.dob,c.username  FROM users u
        left join roles r on  u.roleid = r.id 
        left join contact c on u.id= c.userid
        WHERE u.id=$1`,[req.params.id]).then(respone=>{
            if(respone.length>0){
                res.status(200).json(respone)
            }else{
                res.status(400).json({message:'user not found'})
            }
    
        }).catch(err=>{
            res.status(400).json(err)
        })
    });
    app.post('/api/updateusercontact/:id',Auth,async(req,res,next)=>{
        console.log('req: ', req.body);

        try {
            console.log("[PUT] {api/v1/users}");
            const userId = req.params.id;
            let fields = {
              fname: req.body.fname,
              lname: req.body.lname,
             
            };
            let updatedUser='';
            const conditions = { id: userId };
            if(req.body.password){
                HashPassword(req.body.password).then(result=>{
                    fields.password=result
                })
                updatedUser = await UpdateOne("users", conditions, fields);
            }
        
            const fieldsForContact={
                phonenumber:req.body.phonenumber,
                address1:req.body.address1,
                address2:req.body.address2,
                city:req.body.city,
                state:req.body.state,
                postcode:req.body.postcode,
                country:req.body.country,
                dob:req.body.dob,
                username:req.body.username,
                userId: userId 
            }
            const conditionsContact = { userId: userId };
            updatedUser = await UpdateOne("users", conditions, fields);
            let CheckExists=`SELECT contacid FROM contact WHERE userid=$1`
            const updatedContact = await UpdateOne("contact", conditionsContact, fieldsForContact,CheckExists,[userId]);
        
            if (updatedUser&&updatedContact) {
              return res.status(200).json({...updatedUser,...updatedContact,message:'update Contact Successfully'});
            }
            res.status(404).json({ msg: "Bad request" });
        } catch (error) {
            console.error('error: ', error);
            res.status(400).json({message:'update Contact Failed'})
        }

    })
}



exports.Contact=Contact;