import { useState } from "react";
import { PenSquare } from "lucide-react";

export default function BMICalculator() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState("");

  const plans = {
    Underweight: [
      {
        title: "Beginner (3-Day Split)",
        days: [
          "Day 1: Push – Bench Press, Shoulder Press, Incline Press, Tricep Dips",
          "Day 2: Pull – Lat Pulldown, Row, Biceps Curl, Face Pulls",
          "Day 3: Legs – Squat, Leg Press, Lunges, Calf Raises",
        ],
      },
      {
        title: "Intermediate (4-Day Split)",
        days: [
          "Upper Strength – Bench, Barbell Row, OHP",
          "Lower Strength – Squat, RDL, Leg Press",
          "Push Hypertrophy – Incline DB Press, Lateral Raises",
          "Pull Hypertrophy – Pull-ups, Cable Row, Hammer Curls",
        ],
      },
      {
        title: "Mass Gain (5-Day Split)",
        days: [
          "Chest + Abs – Bench, Cable Fly",
          "Back – Deadlift, Row, Pulldown",
          "Shoulders – OHP, Lateral Raises",
          "Arms – Curls, Tricep Extensions",
          "Legs – Squats, Leg Press",
        ],
      },
    ],

    "Normal Weight": [
      {
        title: "Beginner (3-Day Balanced)",
        days: [
          "Full Body A – Squat, Push-ups, Lat Pulldown",
          "Full Body B – Deadlift, DB Shoulder Press",
          "Full Body C – Lunges, Bench Press",
        ],
      },
      {
        title: "Intermediate (4-Day Upper/Lower)",
        days: [
          "Upper – Bench, Row, Shoulder Press",
          "Lower – Squat, RDL, Leg Press",
          "Upper (Hypertrophy) – Incline Press, Lat Pulldown",
          "Lower (Volume) – Front Squat, Hip Thrust",
        ],
      },
      {
        title: "Athletic (5-Day)",
        days: [
          "Push – Bench, OHP, Dips",
          "Pull – Deadlift, Pulldown",
          "Legs – Squats",
          "Conditioning – HIIT",
          "Mobility – Stretch + Bands",
        ],
      },
    ],

    Overweight: [
      {
        title: "Beginner Fat-Loss (3-Day)",
        days: [
          "Full Body A – Squats, Push-ups",
          "Cardio – 30 min walk/cycle",
          "Full Body B – Deadlift, Bench",
        ],
      },
      {
        title: "Intermediate (4-Day)",
        days: [
          "Upper Strength – Bench, Row",
          "Lower Strength – Squats, RDL",
          "HIIT – 20–25 min",
          "Full Body Conditioning – Kettlebell Swings, Circuit",
        ],
      },
      {
        title: "High Fat-Loss (5-Day)",
        days: [
          "Push + Cardio",
          "Pull + Cardio",
          "Legs + Core",
          "HIIT",
          "Mobility",
        ],
      },
    ],

    Obese: [
      {
        title: "Beginner Low-Impact (3-Day)",
        days: [
          "Machine Strength – Leg Press, Chest Press",
          "Cardio – 20–30 min walk",
          "Strength B – Light Squats, DB Shoulder Press",
        ],
      },
      {
        title: "Intermediate (4-Day Safe)",
        days: [
          "Upper Body Machines",
          "Lower Body Machines",
          "Incline walk or cycling",
          "Full Body Low-Impact Circuit",
        ],
      },
      {
        title: "Progressive (5-Day)",
        days: [
          "Strength Upper",
          "Strength Lower",
          "Cardio – 25–30 min bike",
          "Conditioning – Bands + Stepper",
          "Flexibility + Core",
        ],
      },
    ],
  };

  const calculateBMI = () => {
    if (!height || !weight) return;

    const h = height / 100;
    const result = (weight / (h * h)).toFixed(1);
    setBmi(result);

    let cat = "";
    if (result < 18.5) cat = "Underweight";
    else if (result >= 18.5 && result < 24.9) cat = "Normal Weight";
    else if (result >= 25 && result < 29.9) cat = "Overweight";
    else cat = "Obese";

    setCategory(cat);
  };

  return (
    <div className="bg-slate-700 p-8 rounded-2xl max-w-3xl mx-auto border border-gray-300 shadow-xl ">
      <h2 className="text-3xl font-bold text-white text-center mb-6">
        Get Your Workout Split
      </h2>

      <div className="flex flex-col md:flex-row gap-4 justify-center">
        <input
          type="number"
          placeholder="Height (cm)"
          className="p-3 rounded-xl bg-zinc-800 text-white border border-gray-300 outline-none w-full md:w-1/2"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />

        <input
          type="number"
          placeholder="Weight (kg)"
          className="p-3 rounded-xl bg-zinc-800 text-white border border-gray-300 outline-none w-full md:w-1/2"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
      </div>

      <div className="w-full flex justify-center items-center gap-2 bg-linear-to-r from-[#226BFF] to-[#65ADFF] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer ">
      <button
        onClick={calculateBMI}
        className="flex justify-center gap-2"
      >
        <PenSquare className="w-5 h-5" />
        Get Your Split
      </button>
      </div>

      {bmi && (
        <div className="mt-6 text-center">
          <p className="text-2xl font-bold text-white">BMI: {bmi}</p>
          <p className="text-gray-300 text-lg">{category}</p>
        </div>
      )}

      {category && (
        <div className="mt-8">
          <h3 className="text-2xl font-bold text-white mb-4">
            Workout Plans for {category}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {plans[category].map((plan, idx) => (
              <div
                key={idx}
                className="bg-zinc-800 p-5 rounded-xl border border-zinc-700"
              >
                <h4 className="text-xl font-semibold text-white mb-3">
                  {plan.title}
                </h4>
                <ul className="text-gray-300 text-sm space-y-2">
                  {plan.days.map((d, i) => (
                    <li key={i}>• {d}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
