# 💬 Real-Time Chat App

A simple real-time chat application built using **React**, **Tailwind CSS**, **Socket.IO**, and **Express.js**. This app allows users to join chat rooms and communicate in real-time with emoji support and light/dark mode switching.

## 🌐 Live Demo

Frontend: [https://chat-app-pink-tau-51.vercel.app](https://chat-app-pink-tau-51.vercel.app)

## 🖼️ Features

- ⚡ Real-time messaging with Socket.IO
- 🌗 Dark/Light theme toggle (auto-detects system preference)
- 😄 Emoji picker support
- 🔐 Join by room ID
- 🎨 Styled with Tailwind CSS
- 🔧 Vite for fast development

## 🛠️ Tech Stack

### Frontend
- React
- Tailwind CSS
- Emoji Picker
- Socket.IO Client
- Vite

### Backend
- Node.js
- Express.js
- Socket.IO
- CORS

## 🗂️ Project Structure

```

chat-app/
├── client/         # React frontend (Vite)
│   ├── public/
│   ├── src/
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── server/         # Express backend
│   ├── index.js
│   └── package.json

````

## 🚀 Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/29sujal/chat-app.git
cd chat-app
````

### 2. Install dependencies

**Client**

```bash
cd client
npm install
```

**Server**

```bash
cd ../server
npm install
```

### 3. Start the app

**Server**

```bash
node index.js
```

**Client (in another terminal)**

```bash
cd client
npm run dev
```

> ⚠️ Make sure the frontend and backend `origin` values in `socket.io` match each other (Vercel & Render URLs in production).

## 📦 Deployment

* Frontend deployed on **Vercel**
* Backend deployed on **Render**

Update the socket connection URL in the frontend:

```js
const socket = io("https://your-backend-url.onrender.com");
```


