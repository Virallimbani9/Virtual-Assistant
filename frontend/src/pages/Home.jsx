import React,{useEffect,useContext , useState, useRef} from 'react'
import axios from 'axios'
import { userDataContext } from '../context/UserContext.jsx'
import { useNavigate } from 'react-router-dom'

function Home() {
  const{userData,setUserData,serverUrl,getGeminiResponse} = useContext(userDataContext);
  const navigate = useNavigate();
  const [listening, setListening] = useState(false);
  const isSpeakingRef = useRef(false);
  const recognitionRef = useRef(null);
  const synth = window.speechSynthesis;

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

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    isSpeakingRef.current = true;
    utterance.onend = () => {
      isSpeakingRef.current = false;
      // Restart recognition if it was not active
      if (recognitionRef.current && !listening) {
        recognitionRef.current.start();
      }
    };
    synth.speak(utterance);
  }

  const handleCommand = async (data) => {
    const { type, userInput, response } = data;
    switch (type) {
      case "get_date":
        speak(`Today's date is ${new Date().toLocaleDateString()}`);
        break;
      case "get_time":
        speak(`Current time is ${new Date().toLocaleTimeString()}`);
        break;
      case "get_day":
        speak(`Today is ${new Date().toLocaleDateString('en-US', { weekday: 'long' })}`);
        break;
      case "get_month":
        speak(`Current month is ${new Date().toLocaleDateString('en-US', { month: 'long' })}`);
        break;
      case "google_search":
        window.open(`https://www.google.com/search?q=${encodeURIComponent(userInput)}`, '_blank');
        break;
      case "youtube_search":
        window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(userInput)}`, '_blank');
        break;
      case "youtube_play":
        window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(userInput)}`, '_blank');
        break;
      case "calculator_open":
        window.open('https://www.online-calculator.com/', '_blank');
        break;
      case "instagram_open":
        window.open('https://www.instagram.com/', '_blank');
        break;
      case "facebook_open":
        window.open('https://www.facebook.com/', '_blank');
        break;
      case "weather_show":
        window.open('https://www.weather.com/', '_blank');
        break;
      case "general":
        speak(response);
        break;
      default:
        speak("I'm sorry, I can't perform that action.");
    }
  }

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognitionRef.current = recognition;

    const isRecognizingRef = { current: false };


    const safeRecognize = () => {
      if (!isRecognizingRef && !isSpeakingRef) {
        try{
          isRecognizingRef.current = true;
          recognition.start();
        }catch(err){
          console.log("Speech Recognition Error:", err);
          isRecognizingRef.current = false;
        }
      } 
    };

    recognition.onStart = () => {
      console.log('Speech recognition started');
      isRecognizingRef.current = true;
      setListening(true);
    }

    recognition.onend = () => {
      console.log('Speech recognition ended');
      isRecognizingRef.current = false;
      setListening(false);
      
      if (!isSpeakingRef.current) {
        setTimeout(() => {
          safeRecognize();
        }, 1000);
      }
    }

    recognition.onerror = (event) => {
      console.log('Speech recognition error', event.error);
      isRecognizingRef.current = false;
      setListening(false);
      setTimeout(() => {
        safeRecognize();
      }, 1000);
    }



    recognition.onresult = async (event) => {
      const lastResultIndex = event.results.length - 1;
      const transcript = event.results[lastResultIndex][0].transcript.trim();
      console.log('You said: ', transcript);

       if (userData?.data?.assistantName) {
      const assistantName = userData.data.assistantName.toLowerCase();
      
      if (transcript.toLowerCase().includes(assistantName)) {
        recognition.stop();
        isRecognizingRef.current = false;
        setListening(false);
        const data = await getGeminiResponse(transcript);
        console.log("Gemini Response:", data);
        if (data && data.response) {
          // speak(data.response);
          await handleCommand(data);
          
        } else {
          speak("I'm sorry, I didn't get that.");
        }
      }
    } 
    };
    const fallbackTimeout = setInterval(() => {
      if(!isRecognizingRef.current && !isSpeakingRef.current){
        safeRecognize();
      }
    }, 5000);
    safeRecognize();

    return () => {
      recognition.stop();
      setListening(false);
      isRecognizingRef.current = false;
      clearInterval(fallbackTimeout);
    };
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