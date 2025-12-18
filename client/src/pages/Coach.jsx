import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";
import { createClient } from '@supabase/supabase-js';
import { useUser, useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';

// send cookies for cross-site auth
axios.defaults.withCredentials = true;

const SUPABASE_URL = 'https://gvrzozbenqpsoqpoumkx.supabase.co';
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY ;



const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const Coach = ({ userId }) => {
  const { user } = useUser();
  const { getToken } = useAuth();
  const effectiveUserId = userId || user?.id;

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    if (!effectiveUserId) return;
    const loadMessages = async () => {
      try {
        const token = await getToken();
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        const res = await axios.get(`/api/support/chat/${effectiveUserId}`, { headers });
        setMessages(res.data);
      } catch (err) {
        console.error("Failed to load chat:", err.response?.data || err.message);
        toast.error("Failed to load chat");
      }
    };
    loadMessages();
  }, [effectiveUserId, getToken]);

  useEffect(() => {
    if (!effectiveUserId) return;

    const channel = supabase
      .channel('support-realtime')
      .on('postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'coach_support_messages',
          filter: `user_id=eq.${effectiveUserId}`
        },
        (payload) => setMessages(prev => [...prev, payload.new])
      )
      .subscribe();

    return () => {
      try {
        if (typeof supabase.removeChannel === 'function') {
          supabase.removeChannel(channel);
        } else if (channel && typeof channel.unsubscribe === 'function') {
          channel.unsubscribe();
        }
      } catch (err) {
        console.warn('Error cleaning up realtime channel', err);
      }
    };
  }, [effectiveUserId]);



  const sendMessage = async () => {
    if (!text || !effectiveUserId) return;
    try {
      const token = await getToken();
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      await axios.post("/api/support/user", {
        userId: effectiveUserId,
        message: text
      }, { headers });
      toast.success("Message sent");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send message");
    }
    setText("");
  };



  return (
    <div className='h-full overflow-y-scroll p-6 bg-slate-900 text-white '>
      <div>
        <h1 className='text-4xl font-bold mb-4'>Coach Support</h1>
        <p className='text-slate-400 mb-8'>Chat directly with the coach to get the best results.</p>
      </div>


      <div className='bg-slate-700 border border-gray-300 rounded p-5 overflow-y-scroll min-h-100'>
        {messages.map(m => (
          <p key={m.id} style={{ color: m.sender === "coach" ? "white" : "yellow", margin: 6 }}>
            <b>{m.sender}:</b> {m.message}
          </p>
        ))}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage();
        }}
        style={{ display: 'flex', gap: 8, marginTop: 8 }}
      >
        <input
          type="text"
          placeholder="Type your message..."
          value={text}
          onChange={e => setText(e.target.value)}
          style={{ flex: 1, padding: '8px 10px', borderRadius: 6 }}
        />
        <button type="submit" disabled={!text.trim()} className='px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700 cursor-pointer'>
          Send
        </button>
      </form>
    </div>
  )
}

export default Coach