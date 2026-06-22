

const validateEditData=(req)=>{
            const {name,description,price,image}=req.body;
        
            const allowedEdits=["name","description","price","image"];
            const isAllowedEdits=Object.keys(req.body).every((k)=>allowedEdits.includes(k));
            return isAllowedEdits;        
        }

        module.exports=validateEditData;