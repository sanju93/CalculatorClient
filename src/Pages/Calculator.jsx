import Buttons from "../components/Buttons";
import Display from "../components/Display";
import {useState , useEffect,useContext} from 'react';
import axios from "axios";
import {toast} from 'react-toastify';
import {useNavigate} from 'react-router-dom';
import { auth } from "../context/context";




function Calculator(){

    let [exp,setExp] = useState("");
    let [IsNew,setNew] = useState(false);
    let [password,setPassword] = useState("");
    let [confirm_password,setConfirmPassword] = useState("");
    let navigate = useNavigate();
    let userName = useContext(auth); 
   
    

    

    useEffect(() => {
         async function verifyUser(){
            
            try{

                let res = await axios({
                    url : '/users/newUser',
                    method : 'GET',
                    headers : {
                        
                        'Authorization' : `bearer ${localStorage.getItem('token')}`
                    }
                });
               
                if(res.data.user){
                  
                    setNew(true);
                }else{
                    setNew(false);
                }

            }catch(err){

                if (err.response.status === 401){
                     toast.error("User has expired please Relogin with your credentials");

                    }

                    userName.setData(false);
                    userName.setUser({});

                    navigate('/login');



                    

            }
           
         

        
            
         }
         verifyUser();
    },[]);

   async function handleClick(item){

        if (item === 'C'){
            setExp("");
        }else if (item === "="){
          console.log(exp);
          let loggedIn = userName.user;

          if (exp===loggedIn.CalcPass){

            toast.success("verified");
       
           
            navigate('/stuff');


           
          }else{
            toast.error("Wrong Password");
            setExp("");
          }
        }else{
            setExp(exp + item);
        }

       
       
    }

   async function handleSetPassword(){
        if (password === confirm_password){
             let res = await axios({
                url : '/users/CalsPassword',
                method : 'PUT',
                headers : {
                    'Content-Type' : "application/json",
                    'Authorization' : `Bearer ${localStorage.getItem('token')}`
                },
                data : JSON.stringify({password})
             });

         
             if (res.status === 200){
                 userName.setUser(res.data.user);
                 setNew(false);
                 toast.success("Password set seccessfully");
             }



        }else{
           toast.error("write correct confirm Password and password");
            
        }

        setPassword("");
        setConfirmPassword("");
    }


    return <>
   
    {IsNew ? 
    <>
    <div style={{position : "absolute",left : "435px",top : "159px" , border : "1px solid black", height : "200px",width : "360px" ,backgroundColor : "whitesmoke",borderRadius : "10px"}}>
        <p style={{marginLeft : "10px"}}>please enter the characters same as the calculator</p>
        <div style={{display : "flex",flexDirection : "column",justifyContent : "space-around",height : "70%",width : "100%",alignItems : "center"}}>
        <input type = "password" placeholder="Enter the password" value = {password} onChange={(e) => setPassword(e.target.value)}></input>
        <input type = "password" placeholder="Confirm password" value = {confirm_password} onChange={(e) => setConfirmPassword(e.target.value)}></input>
        <input type = "button" value= "Create" onClick={handleSetPassword}></input>
        </div>
    </div>
    </> 
    : ""}

    <Display Exp = {exp}/>
    <Buttons handleButton = {handleClick}/>
  
    
    </>
}


export default Calculator;