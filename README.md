# Grindline: The Plan for Your Comeback

Grindline is an app for students who want to get back on track and be stronger, sharper, and more consistent.
Whether you want to get to the top of the rankings or change your habits, Grindline can help you stay on track, keep track of your progress, and carry out your comeback plan.

Why I Made This
I was behind in school and needed more than just a list of things to do.
I wanted:

A way to keep track of how hard I work every day

Tools to help me plan my studies around my classes and coaching

A dashboard that keeps me on track

That's why I made Grindline, my "comeback planner."

## Key Features:

- Important Features Intelligent Task Management

  Make tasks with tags for the subject, the level of difficulty, and the due date.

- Tracker for Consistency

  With heatmaps and streak graphs, you can see how often you're showing up.

- Integrated Timer and Pomodoro Features

  Study in concentrated bursts that are connected to assignments.

- Your daily wins are tracked in Comeback Mode. promotes starting over guilt-free.

- Dark Mode + Simple User Interface

  To keep the focus on the grind, keep things tidy and composed.

- Gamified Progress

  Level up, earn streaks, and unlock achievement badges as you complete tasks.

- Leaderboard & Competition

  Compare your progress with friends or classmates to stay motivated.

- Daily Challenges & XP System

  Complete challenges to earn experience points and climb your rank.

- Smooth Animations & Interactive Dashboard

  Subtle animations make tracking progress and using tools engaging and fun.

## How to Use Grindline

1. **Clone the Repository**
```bash
git clone https://github.com/your-username/grindline.git
cd grindline
```

2. **Install Dependencies**
```bash
npm install
```

3. **Run Locally**
```bash
npm run dev
```
- This starts the app locally on port `http://localhost:5173` (or the port shown in your terminal)

4. **Access AI Features**
- Open the Chat/AI page inside the app.
- Make sure you have own local AI backend running or your API key configured if using an online model
- You can now ask questions, get study guidance, or interact with the AI-powered features.

5. **Making Changes**
- Edit any React components in `src/components` or pages in `src/pages`
- Changes will hot-reload automatically in your browser

6. **Building for Production**
```bash
npm run build
```
- Outputs a production-ready version in the dist folder

## Tech Stack: 

- React + TailwindCSS

- Zustand (management of the state)

- Vite

- Motion Framer

- LocalStorage (for now)

- GSAP

---

 Key Notes for AI locally:
- If you’re using something like **OpenAI’s API**, you need a `.env` file with your `OPENAI_API_KEY`.  
- If it’s a **local AI model**, make sure the server is running before opening the Chat page.  

---
