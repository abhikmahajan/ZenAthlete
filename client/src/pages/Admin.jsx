import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from '@clerk/clerk-react';
import { createClient } from '@supabase/supabase-js';

axios.defaults.withCredentials = true;

const SUPABASE_URL = 'https://gvrzozbenqpsoqpoumkx.supabase.co';
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY || '';

if (!SUPABASE_KEY) {
  console.warn('VITE_SUPABASE_ANON_KEY is not set. Realtime and auth may fail.');
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default function CoachDashboard() {
  const { getToken } = useAuth();
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  // Load users
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const token = await getToken();
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        const res = await axios.get("/api/support/users", { headers });
        setUsers(res.data);
      } catch (err) {
        console.error("Failed to load support users:", err.response?.data || err.message);
      }
    };
    loadUsers();
  }, [getToken]);

  // Load chat of selected user
  useEffect(() => {
    if (!currentUser) return;
    const loadChat = async () => {
      try {
        const token = await getToken();
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        const res = await axios.get(`/api/support/chat/${currentUser}`, { headers });
        setMessages(res.data);
      } catch (err) {
        console.error("Failed to load chat:", err.response?.data || err.message);
      }
    };
    loadChat();
  }, [currentUser, getToken]);

  // Realtime updates
  useEffect(() => {
    if (!currentUser) return;

    const channel = supabase
      .channel("coach-live")
      .on("postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "coach_support_messages",
          filter: `user_id=eq.${currentUser}`
        },
        (payload) => setMessages(prev => [...prev, payload.new])
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [currentUser]);

  const sendMessage = async () => {
    try {
      const token = await getToken();
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      await axios.post("/api/support/coach", {
        userId: currentUser,
        message: text
      }, { headers });
    } catch (err) {
      console.error("Failed to send coach message:", err.response?.data || err.message);
    }
    setText("");
  };

  return (
    <div className='h-full overflow-y-scroll p-6 bg-slate-900 text-white '>
      <div>
        <h3>Users</h3>
        {users.map(u => (
          <button key={u} onClick={() => setCurrentUser(u)}>
            {u}
          </button>
        ))}
      </div>

      <div>
        <h3>Chat</h3>
        {currentUser && (
          <>
            <div className="min-h-100 min-w-200 bg-white">
              {messages.map(m => (
                <p key={m.id} style={{ color: m.sender === "coach" ? "blue" : "black" }}>
                  <b>{m.sender}:</b> {m.message}
                </p>
              ))}
            </div>

            <input value={text} onChange={e => setText(e.target.value)} />
            <button onClick={sendMessage}>Send</button>
          </>
        )}
      </div>
    </div>
  );
}
