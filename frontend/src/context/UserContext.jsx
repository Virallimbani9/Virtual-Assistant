import React, { createContext ,useEffect,useState } from "react";
import axios from "axios";
export const userDataContext = createContext()

function UserContext({children}) {

    const serverUrl = "http://localhost:3000";
    const [userData, setUserData] = useState(null);
    const [frontendImage, setFrontendImage] = useState(null);
    const [backendImage, setBackendImage] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);

    const handleCurrentUser = async () => {
        try{
            const response = await axios.get(`${serverUrl}/api/users/getUser`, {
                withCredentials: true,
            });
            const data = response.data;
            console.log("User data",data);
            setUserData(data);
        } catch (error) {
            console.error("Error fetching current user:", error);
        }
    }

    const getGeminiResponse = async (command) => {
        try{
            const response = await axios.post(`${serverUrl}/api/gemini/askToAssistant`, { command }, {
                withCredentials: true,
            });
            return response.data;
        } catch(err){
            console.error("Error fetching Gemini response:", err);
        }
    }

    useEffect(() => {
        handleCurrentUser();
    }, []);
    
    const value = {
        serverUrl, userData, setUserData ,frontendImage, setFrontendImage, 
        backendImage, setBackendImage, selectedImage, setSelectedImage,
        getGeminiResponse
    };    
    return(
        <userDataContext.Provider value={value}>
            {children}
        </userDataContext.Provider>
    )
}

export default UserContext;