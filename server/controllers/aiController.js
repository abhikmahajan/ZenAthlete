import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import axios from "axios";


dotenv.config();

const ai = new GoogleGenAI({});




export const personalPlans = async (req, res) =>{


  try{
    const {prompt} = req.body;
    console.log('[AI] Received prompt:', prompt);
    const plan = req.plan;

    if(plan === 'freePlan'){
        return res.json({success: false, message: "This feature is only available for premium subscriptions."})
    }

    const response =await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

    // SDK can return different structures; attempt to extract content
    console.log('[AI] Raw response:', response);
    const textContent = response.text || (response.candidates && response.candidates[0] && response.candidates[0].content && response.candidates[0].content[0] && response.candidates[0].content[0].text) || JSON.stringify(response);

    res.json({success: true, content: textContent});
    console.log('[AI] Sent text content:', textContent);
} catch(error){
    console.log(error.message)
    res.json({success: false, message: error.message})
  }
}

  



export const nutrition = async (req, res) =>{


  try{
    const {prompt} = req.body;
    console.log('[AI] Received prompt:', prompt);
    const plan = req.plan;

    if(plan === 'freePlan'){
        return res.json({success: false, message: "This feature is only available for premium subscriptions."})
    }

    const response =await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  console.log('[AI] Raw response:', response);
  const textContent = response.text || (response.candidates && response.candidates[0] && response.candidates[0].content && response.candidates[0].content[0] && response.candidates[0].content[0].text) || JSON.stringify(response);

  res.json({success: true, content: textContent});
  console.log('[AI] Sent text content:', textContent);
} catch(error){
    console.log(error.message)
    res.json({success: false, message: error.message})
  }
}



