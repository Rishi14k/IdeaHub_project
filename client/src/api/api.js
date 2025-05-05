import axios from 'axios';
import toast from 'react-hot-toast';

const API_URL = "http://localhost:5000/api";

export const register = async(userData)=>{
    try {
        const response = await axios.post(`${API_URL}/auth/register`,userData);
        return response.data;
    } catch (error) {
        console.error("Registration failed:", error.response?.data?.message || error.message);
        throw error;
    }
}

export const login = async(userData)=>{
    try {
        const response = await axios.post(`${API_URL}/auth/login`,userData)
        return response.data;
    } catch (error) {
        console.error("Login failed:", error.response?.data?.message || error.message);
        throw error;
    }
}

export const createIdea = async(ideaData,token)=>{
    try {
        const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };

          const response = await axios.post(`${API_URL}/idea/create`,ideaData,config);
          return response.data;
    } catch (error) {
        console.error("Idea creation failed:", error.response?.data?.message || error.message); 
        throw error;
    }
}


// export const sendRequest = async (userId, ideaId) => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       toast.error("You need to be logged in to send a request.");
//       return;
//     }
//     try {
//         const config = {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           };
//       const response = await axios.post(`${API_URL}/collab/sendRequest/${ideaId}`, { userId },config);
//       toast.success(response.data.message);
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Something went wrong");
//       console.error("Error sending request:", error.response?.data?.message || error.message);
//     }
//   };
  
//   export const acceptRequest = async (userId, ideaId) => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       toast.error("You need to be logged in to send a request.");
//       return;
//     }
//     try {
//         const config = {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           };
//       const response = await axios.post(`${API_URL}/collab/acceptRequest/${ideaId}`, { userId },config);
//       toast.success(response.data.message);
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Something went wrong");
//     }
//   };
  
//   export const rejectRequest = async (userId, ideaId) => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       toast.error("You need to be logged in to send a request.");
//       return;
//     }
//     try {
//         const config = {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           };
//       const response = await axios.post(`${API_URL}/collab/rejectRequest/${ideaId}`, { userId },config);
//       toast.success(response.data.message);
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Something went wrong");
//     }
//   };
  