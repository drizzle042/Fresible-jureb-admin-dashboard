


import React from "react";
import MuiAlert from "@mui/material/Alert";
import { Snackbar } from "@mui/material";

const Feedback = (openToaster,setOpenToaster) =>{

  

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

// function objToString(obj, ndeep) {
//   if(obj == null){ return String(obj); }
//   //if(obj.length!=null)obj=obj[0]
//   switch(typeof obj){
//     case "string": return '"'+obj+'"';
//     case "function": return obj.name || obj.toString();
//     case "object":
//       var indent = Array(ndeep||1).join('\t'), isArray = Array.isArray(obj);
//       return '{['[+isArray] + Object.keys(obj).map(function(key){
//            return '\n\t' + indent + key + ': ' + objToString(obj[key], (ndeep||1)+1);
//          }).join(',') + '\n' + indent + '}]'[+isArray];
//     default: return obj.toString();
//   }
// }

function objToString(obj, ndeep) {
  if(obj == null){ return String(obj); }
  //if(obj.length!=null)obj=obj[0]
  switch(typeof obj){
    case "string": return ''+obj+'';
    case "function": return obj.name || obj.toString();
    case "object":
      var indent = Array(ndeep||1).join('\t'), isArray = Array.isArray(obj);
      return  Object.keys(obj).map(function(key){
           return  objToString(obj[key], (ndeep||1)+1);
         }).join(',') + '\n';
    default: return obj.toString();
  }
}


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenToaster({ ...openToaster, open: false });
  };
  const archor={vertical:'top',horizontal:'right'}

    let message= objToString(openToaster?.message)
      
    return (
      <Snackbar  anchorOrigin={archor }
      open={openToaster?.open} autoHideDuration={6000} onClose={handleClose}>
        <div>
          <Alert onClose={handleClose} severity={openToaster?.severity}>
            {message}
          </Alert>
        </div>
    </Snackbar>
    )
   
}

export default Feedback;

  