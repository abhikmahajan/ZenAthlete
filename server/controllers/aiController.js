import dotenv from "dotenv";
dotenv.config();

import { GoogleGenAI } from "@google/genai";

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://gvrzozbenqpsoqpoumkx.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey) 



const ai = new GoogleGenAI({});




export const personalPlans = async (req, res) =>{


  try{
    const userId = req.auth.userId;
    const {prompt} = req.body;
    const plan = req.plan;

    if(plan === 'free'){
        return res.json({success: false, message: "This feature is only available for premium subscriptions."})
    }

    const response =await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

   const textContent = response.text;
 
    const { error } = await supabase
  .from('creations')
  .insert( 
    {user_id: userId, prompt: prompt, type: 'personal-plan',content: response.text});
    if (error) {
      console.log('Error inserting creation:', error.message);
    }
    
   

    res.json({success: true, content: textContent});
} catch(error){
    console.log(error.message)
    res.json({success: false, message: error.message})
  }
}

  



export const nutrition = async (req, res) =>{


  try{
    const userId = req.auth.userId;
    const {prompt} = req.body;
    const plan = req.plan;

    if(plan === 'free'){
        return res.json({success: false, message: "This feature is only available for premium subscriptions."})
    }

    const response =await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  const textContent = response.text;


  const { error } = await supabase
  .from('creations')
  .insert(
    {user_id: userId, prompt: prompt, type: 'nutrition',content: response.text});
    if (error) {
      console.log('Error inserting creation:', error.message);
    }

  res.json({success: true, content: textContent});
} catch(error){
    console.log(error.message)
    res.json({success: false, message: error.message})
  }
}



