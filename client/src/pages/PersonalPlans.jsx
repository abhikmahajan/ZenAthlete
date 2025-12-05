import React from 'react'
import { useState } from 'react'
import Markdown from 'react-markdown';
import axios from 'axios';
import { Edit, Sparkles } from 'lucide-react';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
// Send cookies for Clerk auth (cross-site dev origin -> server cors credentials)
axios.defaults.withCredentials = true;

const PersonalPlans = () => {

  const physiqueType =[
    'Lean & Athletic',
    'Aesthetic / Bodybuilder Lean',
    'Bulked & Strong Physique',

  ]

  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [goalPhysique, setGoalPhysique] = useState("Lean & Athletic");


  const submitted = async (e) =>{
    e.preventDefault();
    setLoading(true);
    try{
      const {data} = await axios.post('/api/personalised-plans', {
        prompt: `Create a personalized 4-week workout plan for a ${age}-year-old ${gender}, ${height}cm, ${weight}kg, aiming to build ${goalPhysique}. Include exercise types, frequency, and intensity but not diet plan. Keep it concise.`,
      });
      console.log('[Client] /api/personalised-plans response:', data);
      if(data && data.success){
        setContent(data.content);
      } else {
        // Not a success, but keep content unchanged; log for debugging
        console.warn('[Client] personal plans returned success:false or invalid response', data)
        setContent('');
      }
    }catch(error){
      console.error(error);
    }
    setLoading(false);
  }

  
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  return (
    <div className='h-full  overflow-y-scroll p-6 bg-slate-900 text-white '>
      <div>
        <h1 className='text-4xl font-bold mb-4'>Personalised Plans</h1>
        <p className='text-slate-400 mb-8'>Fill the details and get a plan for yourself:</p>
      </div>
    <div className=' flex items-start flex-wrap gap-6'>
      
      {/* left col */}
      <form onSubmit={submitted} className='w-1/3 p-4 bg-slate-700 rounded-lg border border-gray-200'>
        <div className='flex gap-4'>
          <Sparkles className='w-6 text-yellow-400'/>
          <h1 className='text-xl font-semibold'>Scheduled Plan </h1>
        </div>

        <div>

        <div className='flex mt-5'>
          <div className='flex-1'>
            <label className='mt-4 text-sm font-medium'>Age</label><br/>
            <input type='number' onChange={(e) => setAge(e.target.value)} value={age} placeholder='' className=' p-2 px-3 mt-2 outline-none text-sm rounded-md bg-zinc-800 border border-gray-300' required />
          </div>
          
          <div className='flex-1'>
          <label className='mt-4 text-sm font-medium'>Gender </label><br/>
          <select onChange={(e) => setGender(e.target.value)} value={gender} className=' p-2 px-3 mt-2 outline-none w-48 text-sm rounded-md bg-zinc-800 border border-gray-300'>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          </div>
          </div>

        <div className='mt-4 flex gap-4'>
          

          <div className='flex-1'>
            <label className='mt-4 text-sm font-medium'>Height (in cm)</label><br/>
            <input type='number' onChange={(e) => setHeight(e.target.value)} value={height} placeholder='' className=' p-2 px-3 mt-2 outline-none text-sm rounded-md bg-zinc-800 border border-gray-300' required />
          </div>
          <div className='flex-1'>
            <label className='mt-4 text-sm font-medium'>Weight (in kg)</label><br/>
            <input type='number' onChange={(e) => setWeight(e.target.value)} value={weight} placeholder='' className=' p-2 px-3 mt-2 outline-none text-sm rounded-md bg-zinc-800 border border-gray-300' required />
          </div>
          
          </div>
        </div>

        <p className='mt-4 text-sm font-medium'>Goal Physique</p>

      <div className='mt-3 flex gap-3 flex-wrap sm:max-w-9/11'>
        {physiqueType.map((item, index)=>(
          <span onClick={() => setGoalPhysique(item)}  key={index} className={`text-xs px-4 py-1 border rounded-full cursor-pointer  ${goalPhysique === item ? 'text-white bg-black':  ' border-gray-300'} `}>{item}</span>
        ))}
      </div>
        
        <button disabled={loading} className='w-full flex justify-center items-center gap-2 bg-linear-to-r from-[#226BFF] to-[#65ADFF] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer '>
          {
            loading ? <span className='w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin'></span>
            : <Edit className='w-5 ' />
          }
          
          Generate Plan
        </button>
      </form>
      {/* right col */}
      <div className='max-w-3xl w-full p-4 bg-slate-700 text-white rounded-lg flex flex-col border border-gray-200 min-h-96 max-h-[600px]'>
        <div className='flex items-center gap-3'>
          <Edit className='w-5 h-5 text-[#4A7AFF]' />
          <h1 className='text-xl font-semibold'>Generated plan</h1>
        </div>


        {!content ? ( <div className='flex-1 flex justify-center items-center'>
          <div className='text-sm flex flex-col items-center gap-5'>
            <Edit className='w-9 h-9'/>
            <p>Enter details and click "Generate plan" to get started</p>
          </div>
          </div>) : (

            <div className='mt-3 overflow-y-scroll text-sm '>
              <div className='reset-tw'>
                <Markdown>{content}</Markdown>
                </div>
            </div>
          )}
       

        
      </div>
    </div>
    </div>
  )
}

export default PersonalPlans