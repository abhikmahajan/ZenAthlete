# ZenAthlete 🏋️‍♂️

A comprehensive AI-powered fitness and wellness platform that combines personalized workout plans, nutrition guidance, and real-time coach support to help users achieve their fitness goals.

## 🌟 Features

### Core Features
- **AI-Powered Personalized Workout Plans** - Generate customized 4-week workout plans based on user profile and fitness goals
- **Nutrition Planning** - Get personalized nutrition and macro plans with meal suggestions tailored to your physique goals
- **Workout Tracking** - Track completed workouts, calories burned, and view comprehensive fitness statistics
- **Pre-built Workout Programs** - Full Body, Chest, Arms, Back, Cardio, and Abs focused routines with built-in timers
- **Real-time Coach Support** - Get instant support from fitness coaches through real-time messaging powered by Supabase
- **Admin Dashboard** - Coaches can manage support tickets and communicate with users

### Advanced Capabilities
- **Smart Plan Generation** - Uses Google Gemini 2.5 Flash AI to generate context-aware plans
- **Subscription Tiers** - Free and Premium plans with feature restrictions
- **Real-time Updates** - Supabase real-time subscriptions for live chat updates
- **Secure Authentication** - Clerk-based authentication with role-based access control

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI framework
- **Vite** - Lightning-fast build tool
- **Tailwind CSS 4** - Utility-first styling
- **React Router v7** - Client-side routing
- **Framer Motion** - Smooth animations
- **Axios** - HTTP client
- **Clerk React** - Authentication
- **Supabase JS** - Real-time database client
- **Lucide React** - Icon library
- **React Markdown** - Markdown rendering
- **React Hot Toast** - Toast notifications

### Backend
- **Node.js & Express** - Server framework
- **Google GenAI** - AI model for plan generation
- **Supabase** - PostgreSQL database & real-time features
- **Clerk Express** - Authentication middleware
- **Nodemon** - Development server
- **CORS** - Cross-origin resource sharing
- **Dotenv** - Environment variables

## 📁 Project Structure

```
ZenAthlete/
├── client/                          # Frontend React application
│   ├── src/
│   │   ├── app.jsx                 # Main app with routing
│   │   ├── index.css               # Global styles with Tailwind
│   │   ├── main.jsx                # Entry point
│   │   ├── pages/                  # Page components
│   │   │   ├── Landing.jsx         # Landing page with hero, testimonials
│   │   │   ├── Dashboard.jsx       # User dashboard with stats
│   │   │   ├── WorkoutPlans.jsx    # Pre-built workout execution
│   │   │   ├── WorkoutSplit.jsx    # Workout split selection
│   │   │   ├── PersonalPlans.jsx   # AI-generated personalized plans
│   │   │   ├── Nutrition.jsx       # AI-generated nutrition plans
│   │   │   ├── Coach.jsx           # User coach support chat
│   │   │   ├── Admin.jsx           # Coach admin dashboard
│   │   │   └── Layout.jsx          # Main layout wrapper
│   │   ├── components/             # Reusable components
│   │   │   ├── Navbar.jsx          # Navigation bar
│   │   │   ├── Hero.jsx            # Hero section
│   │   │   ├── Choose.jsx          # Feature showcase
│   │   │   ├── Plan.jsx            # Pricing plans
│   │   │   ├── Testimonial.jsx     # User testimonials
│   │   │   ├── Footer.jsx          # Footer
│   │   │   ├── Main.jsx            # Main content wrapper
│   │   │   ├── Sidebar.jsx         # Navigation sidebar
│   │   │   ├── BMICalculator.jsx   # BMI calculation tool
│   │   │   └── CreationItem.jsx    # Plan display item
│   │   └── assets/                 # Images and static files
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   ├── .env                        # Environment variables
│   └── eslint.config.js
│
├── server/                          # Backend Node.js application
│   ├── server.js                   # Express server entry point
│   ├── package.json
│   ├── .env                        # Server environment variables
│   ├── controllers/                # Business logic
│   │   ├── aiController.js         # AI plan generation endpoints
│   │   ├── userController.js       # User data and stats endpoints
│   │   └── supportController.js    # Coach support endpoints
│   ├── middlewares/                # Express middlewares
│   │   └── auth.js                 # Clerk authentication & plan validation
│   └── routes/                     # API endpoints
│       ├── aiRoutes.js             # /api/personalised-plans routes
│       ├── userRoutes.js           # /api/user routes
│       └── supportRoutes.js        # /api/support routes
│
└── readme.md                        # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Clerk account (for authentication)
- Supabase project (for database and real-time features)
- Google GenAI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/abhikmahajan/ZenAthlete.git
   cd ZenAthlete
   ```

2. **Setup Frontend**
   ```bash
   cd client
   npm install
   ```

   Create `.env` file in `client/`:
   ```env
   VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   VITE_SUPABASE_KEY=your_supabase_anon_key
   VITE_BASE_URL=http://localhost:5000
   ```

3. **Setup Backend**
   ```bash
   cd ../server
   npm install
   ```

   Create `.env` file in `server/`:
   ```env
   SUPABASE_KEY=your_supabase_service_key
   GOOGLE_GENAI_API_KEY=your_google_genai_api_key
   CLIENT_URL=http://localhost:5173
   PORT=5000
   ```

### Running the Application

**Development Mode:**

Terminal 1 - Start Backend:
```bash
cd server
npm run server
```

Terminal 2 - Start Frontend:
```bash
cd client
npm run dev
```

The application will be available at `http://localhost:5173`

**Production Build:**

Frontend:
```bash
cd client
npm run build
npm run preview
```

Backend:
```bash
cd server
npm start
```

## 📚 API Documentation

### Authentication
All protected routes require Clerk authentication with Bearer token in Authorization header.

### Base URL
- Development: `http://localhost:5000`
- Production: `https://zen-athlete-server.vercel.app`

### Endpoints

#### AI & Plans (`/api/personalised-plans`)
- `POST /` - Generate personalized workout plan
  - Body: `{ prompt: string }`
  - Requires: Premium subscription
  - Returns: AI-generated workout plan

- `POST /nutrition` - Generate nutrition plan
  - Body: `{ prompt: string }`
  - Requires: Premium subscription
  - Returns: AI-generated nutrition plan

#### User Data (`/api/user`)
- `GET /creations` - Get all user's generated plans
  - Returns: Array of creation objects with metadata

- `POST /complete-workout` - Log a completed workout
  - Body: `{ workoutPlanName: string, totalCalories: number, duration: number }`
  - Returns: Success confirmation

- `GET /workout-stats` - Get user's fitness statistics
  - Returns: `{ totalWorkouts: number, totalCalories: number }`

#### Coach Support (`/api/support`)
- `POST /user` - User sends message to coach
  - Body: `{ message: string }`
  - Requires: Premium subscription
  - Returns: Created message object

- `POST /coach` - Coach sends message to user
  - Body: `{ message: string }`
  - Returns: Created message object

- `GET /chat/:userId` - Get chat history for a user
  - Returns: Array of messages ordered by creation time
  - Requires: Premium subscription

- `GET /users` - Get all users with support messages
  - Returns: Array of user IDs (coaches only)

## 🎯 Key Components

### Pages

**Landing Page**
- Hero section with CTA
- Feature showcase
- Testimonials
- Pricing tiers
- Footer

**Dashboard**
- Statistics overview (calories, workouts, creations)
- Recent generated plans and diets
- Quick navigation to features
- User welcome message

**Workout Plans**
- 6 pre-built programs (Full Body, Chest, Arms, Back, Cardio, Abs)
- Real-time timer for exercises
- Calorie tracking per exercise
- Progress tracking
- Completion logging

**Personalized Plans**
- Form for user profile (age, gender, height, weight, goal)
- AI-generated 4-week workout plans
- Markdown rendering for easy reading
- Plan history and editing

**Nutrition**
- User profile inputs
- Meal preference selection
- Personalized 4-week nutrition plans
- Macro and calorie targets
- Meal suggestions

**Coach Support**
- Real-time chat with fitness coaches
- Message history
- Live updates via Supabase subscriptions

**Admin Dashboard**
- List of users needing support
- Real-time chat interface
- Ability to send responses to users

## 🔐 Subscription Model

### Free Tier
- Access to pre-built workout plans
- Dashboard and statistics
- Cannot access:
  - AI-generated personalized plans
  - Nutrition planning
  - Coach support

### Premium Tier
- Full access to all features
- Unlimited AI plan generation
- Priority coach support
- Advanced analytics

## 🗄️ Database Schema (Supabase)

### Tables
- `creations` - Stores user-generated plans and content
- `workouts` - Logs completed workouts
- `coach_support_messages` - Stores chat messages

## 🌐 Deployment

### Frontend (Vercel)
```bash
cd client
npm run build
# Deploy build/ folder to Vercel
```

### Backend (Vercel)
```bash
cd server
# Deploy to Vercel using vercel.json configuration
```

Deployed URLs:
- Frontend: `https://zen-athlete.vercel.app`
- Backend: `https://zen-athlete-server.vercel.app`

## 🔄 Real-time Features

The application uses Supabase real-time subscriptions for:
- Live coach messages appearing instantly in chat
- Message history updates
- Real-time user notifications

## 🛡️ Security

- **Authentication**: Clerk handles all user authentication and JWT tokens
- **Authorization**: Role-based access control with subscription validation
- **Environment Variables**: Sensitive data stored in `.env` files
- **CORS**: Cross-origin requests limited to whitelisted domains
- **API Protection**: Most endpoints require authentication via Clerk

## 🤖 AI Integration

**Provider**: Google GenAI (Gemini 2.5 Flash)

The application uses advanced prompting to generate:
- Personalized 4-week workout plans based on user metrics
- Customized nutrition plans with macro splits
- Exercise recommendations
- Meal suggestions (including dietary alternatives)

## 🎨 UI/UX Highlights

- Modern dark theme with slate color palette
- Responsive design for all screen sizes
- Smooth animations with Framer Motion
- Toast notifications for user feedback
- Accessible component structure
- Intuitive sidebar navigation

## 📱 Responsive Design

The application is fully responsive:
- Mobile (320px+)
- Tablet (768px+)
- Desktop (1024px+)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License - see the LICENSE file for details.

## 👨‍💻 Author

**Abhik Mahajan**
- GitHub: [@abhikmahajan](https://github.com/abhikmahajan)

## 📞 Support

For issues and feature requests, please create an issue on the [GitHub repository](https://github.com/abhikmahajan/ZenAthlete/issues).

## 🚦 Project Status

- ✅ MVP Launched
- ✅ Real-time Coach Support
- ✅ AI Plan Generation
- 🔄 Performance Optimization
- 📋 Advanced Analytics (Upcoming)
- 📋 Mobile App (Planned)

## 🙏 Acknowledgments

- Google Gemini for AI capabilities
- Supabase for real-time database
- Clerk for authentication
- Tailwind CSS for styling
- React community for excellent libraries

---

**Made with ❤️ by Abhik Mahajan**