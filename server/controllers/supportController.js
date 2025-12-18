
import dotenv from "dotenv";
dotenv.config();

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://gvrzozbenqpsoqpoumkx.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY ;



const supabase = createClient(supabaseUrl, supabaseKey);


export const userSendMessage = async (req, res) => {
  
  try{
  const userId = req.auth.userId;
  const {message} = req.body;
  const plan = req.plan;

    if(plan === 'free'){
        return res.json({success: false, message: "This feature is only available for premium subscriptions."})
    }

  const { data, error } = await supabase
    .from("coach_support_messages")
    .insert({
      user_id: userId,
      sender: "user",
      message
    })
    .select("*");

  if (error){
    console.log('Error inserting creation:', error.message);
  }
  res.json(data[0]);

  } catch(error){
    console.log(error.message)
    res.json({success: false, message: error.message})
  }
};

// COACH sends message
export const coachSendMessage = async (req, res) => {
  const userId = req.auth.userId;
  const {message } = req.body;

  const { data, error } = await supabase
    .from("coach_support_messages")
    .insert({
      user_id: userId,
      sender: "coach",
      message
    })
    .select("*");

  if (error) return res.status(400).json({ error });
  res.json(data[0]);
};

// Get all chat messages of a single user
export const getUserChat = async (req, res) => {
  const userId = req.auth.userId;
  const plan = req.plan;

    if(plan === 'free'){
        return res.json({success: false, message: "This feature is only available for premium subscriptions."})
    }

  const { data, error } = await supabase
    .from("coach_support_messages")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: true });

  if (error) return res.status(400).json({ error });

  res.json(data);
};

// Get list of all users who messaged
export const getAllSupportUsers = async (req, res) => {
  const { data, error } = await supabase
    .from("coach_support_messages")
    .select("user_id, sender");

  if (error) return res.status(400).json({ error });

  const users = Array.from(
    new Set(
      data
        .filter((row) => row.sender !== "coach")
        .map((row) => row.user_id)
    )
  );

  res.json(users);
};
