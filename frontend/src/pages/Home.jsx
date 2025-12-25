import React,{useEffect} from 'react'
import { useContext } from 'react'
import axios from 'axios'
import { userDataContext } from '../context/UserContext.jsx'
import { useNavigate } from 'react-router-dom'

function Home() {
  const{userData,setUserData,serverUrl} = useContext(userDataContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try{
      const response = await axios.get(`${serverUrl}/api/auth/logOut`, {withCredentials:true});
      if(response.status === 200){
        setUserData(null);
        navigate('/');
      }
    } catch(err){
      setUserData(null);
      console.log("Error in Logout",err);
    }
  }

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      const lastResultIndex = event.results.length - 1;
      const transcript = event.results[lastResultIndex][0].transcript.trim();
      console.log('You said: ', transcript);

      
    };
    recognition.start();
  }
  , []);
  return (
    <div>
      <button className='cursor-pointer' onClick={()=> handleLogout()}>LogOut</button>
      <button className='cursor-pointer' onClick={()=>navigate("/custmize")}>Custmize your Assistant</button>
    <div>
     <img src={userData?.data?.assistantImage} alt="Assistant" />
       <p>Hello I am : {userData?.data?.assistantName}</p>
    </div>
    </div>
  )
}

export default Home