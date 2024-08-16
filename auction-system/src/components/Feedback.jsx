import React,{useState} from "react";
import Navbar from "./navbar";
import Footer from "./Footer";

export default function Feedback() {

    const[feedback,setfeedback] = useState("");
    const[message,setmessage] = useState("");
    const[isSucess,setIsSucess] = useState("");

    const handlesubmit = async(e) =>{
        e.preventDefault();

        try{
            const token = localStorage.getItem("token");
            const response = await fetch("http://localhost:8000/api/auth/feedback",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                      Authorization: `Bearer ${token}`,
                },
                body:JSON.stringify({feedback}),
            })

            const data = await response.json();
            if(response.ok){
                setmessage(data.message);
                setfeedback("");
                setIsSucess(true);
            }else{
                setmessage("Failed to send Feedbck.Please try again later");
                setIsSucess(false);
            }
        }catch(error){
            console.error("Error submitting Feedback",error);
            setmessage("Server Error . Please try again later");
            setIsSucess(false);
        }
    };



   return (
     <div className="min-h-screen flex flex-col">
       <Navbar />
       <div className="flex-grow flex items-center justify-center">
         <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
           <h2 className="text-2xl font-bold text-center mb-6">Feedback</h2>
           {message && (
             <div
               className={`mb-4 text-center ${
                 isSucess ? "text-green-500" : "text-red-500"
               }`}
             >
               {message}
             </div>
           )}
           <form onSubmit={handlesubmit}>
             <div className="mb-4">
               <label
                 htmlFor="feedback"
                 className="block text-gray-700 font-medium mb-2"
               >
                 Your Feedback
               </label>
               <textarea
                 id="feedback"
                 name="feedback"
                 rows="4"
                 value={feedback}
                 onChange={(e) => setfeedback(e.target.value)}
                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                 placeholder="Write your feedback here..."
                 required
               ></textarea>
             </div>
             <div className="text-center">
               <button
                 type="submit"
                 className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
               >
                 Submit
               </button>
             </div>
           </form>
         </div>
       </div>
       <Footer />
     </div>
   );
}
