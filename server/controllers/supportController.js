
import dotenv from "dotenv";
dotenv.config();

import { createClient } from "@supabase/supabase-js";

// Use the same Supabase URL as other controllers. Fall back to the project DB URL if env var missing.
const supabaseUrl = process.env.SUPABASE_URL || 'https://gvrzozbenqpsoqpoumkx.supabase.co';
// Prefer a service role key on the server, otherwise fall back to SUPABASE_KEY if set.
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE || process.env.SUPABASE_KEY || '';

if (!supabaseUrl) {
  // eslint-disable-next-line no-console
  console.error('SUPABASE_URL is not set. Please add it to your server .env');
}
if (!supabaseKey) {
  // eslint-disable-next-line no-console
  console.warn('No Supabase key found (SUPABASE_SERVICE_ROLE or SUPABASE_KEY). Some operations may fail.');
}

const supabase = createClient(supabaseUrl, supabaseKey);

// USER sends message
export const userSendMessage = async (req, res) => {
  
  const {userId} = req.auth();
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

  if (error) return res.status(400).json({ error });
  res.json(data[0]);
};

// COACH sends message
export const coachSendMessage = async (req, res) => {
  const { userId} = req.auth();
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
  const { userId } = req.auth();

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
