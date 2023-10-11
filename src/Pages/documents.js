import {useState,useRef,useEffect} from 'react';
import {toast} from 'react-toastify';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
function Documents() {
  
  let fileRef = useRef(null);
  let[documents, setDocuments] = useState([]);
  let navigate = useNavigate();
  useEffect(() => {
        async function fetchDocuments(){

          try{

            let res = await axios({
              url : '/users/documents',
              method : 'GET',
              headers : {
                'Authorization' : `Bearer ${localStorage.getItem('token')}`
              }
            });

            if (res.status === 200){
              setDocuments(res.data);
            }
            


          }catch(err){
              console.log(err);
          }
             
        }

        fetchDocuments();
  },[]);

  async function onUpload(){
     if (fileRef.current.files.length !== 0){
      let formData = new FormData();
      formData.append('document',fileRef.current.files[0]);
          let res = await axios({
            url : '/users/upload/document',
            method : 'POST',
            headers : {
              'Authorization' : `Bearer ${localStorage.getItem('token')}`,
              'Content-Type' : 'multipart/form-data',
            },
            data : formData
          });
          if (res.status === 200){
            fileRef.current.value = "";
            toast.success('file Uploaded Successfully');
          }
     }else{
        toast.error("Select atmost one file");
        return;
     }
  }

  function handleClick(name){
    navigate(`/DocumentOne/${name}`)
  }
  
  return (
    <>
      <h2>Documents</h2>
      <input type = "file" ref={fileRef} accept = ".docx,.pdf,.txt,.doc,.ppt"></input>
      <input type = "button" value = "upload" onClick={onUpload}></input>
      {documents.map((item,index) => <p key={index} onClick={() => handleClick(item.name)}>{item.name}</p>)}
    </>
  );
}

export default Documents;
