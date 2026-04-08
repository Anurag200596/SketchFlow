# 🎨 SketchFlow – Real-Time Collaborative Whiteboard

SketchFlow is a full-featured, real-time collaborative whiteboard application inspired by tools like Miro. It allows multiple users to interact, draw, and collaborate on a shared canvas with advanced features like layers, real-time synchronization, authentication, and organizational workspaces.

Built using modern technologies, SketchFlow demonstrates scalable frontend architecture, real-time systems, and interactive UI design.

---

## 🚀 Overview

SketchFlow is designed as a collaborative platform where users can visually brainstorm, plan, and create together in real time.

This project showcases:

* Real-time collaboration across multiple users
* Layer-based canvas rendering system
* Authentication and organization-based access
* Persistent real-time database integration
* Modern UI/UX with scalable architecture

---

## ✨ Core Features

### 🛠️ Whiteboard System

* Fully custom-built canvas from scratch
* Smooth and responsive drawing experience
* Optimized rendering for real-time updates

---

### 🧰 Drawing & Tools

* ✏️ Pencil / Freehand drawing
* 🔤 Text tool
* 🔷 Shapes (Rectangles, Ellipses)
* 🗒️ Sticky Notes support
* Selection and transformation tools

---

### 🧱 Layering System

* Create and manage multiple layers
* Layer selection and multi-selection
* Resize, move, and transform layers
* Control layer depth (z-index handling)

---

### 🎨 Styling & Customization

* Color system for shapes and drawings
* Dynamic color updates
* Clean and consistent UI

---

### 🔁 Undo / Redo

* Full history tracking system
* Efficient state management
* Smooth reversal of actions

---

### ⌨️ Productivity Features

* Keyboard shortcuts for faster workflow
* Selection box & selection net
* Drag, resize, and translate elements

---

### 🤝 Real-Time Collaboration

* Multiple users editing simultaneously
* Live cursor presence
* Real-time updates across all clients
* Shared interactive workspace

---

### 💾 Real-Time Database

* Persistent board state
* Instant syncing across users
* Backend-powered data consistency

---

### 🔐 Authentication & Organizations

* Secure user authentication
* Organization-based collaboration
* Invite system for team access
* Role-based workspace interaction

---

### ⭐ Additional Features

* Favoriting boards
* Search functionality
* Dashboard for managing boards
* Sidebar navigation & organization panel

---

## 🛠️ Tech Stack

* **Next.js 14** – Full-stack React framework
* **TypeScript** – Type safety and scalability
* **Tailwind CSS** – Utility-first styling
* **Shadcn UI** – Modern UI components
* **Convex** – Real-time database
* **Liveblocks** – Real-time collaboration & presence
* **Clerk** – Authentication and user management

---

## 🧠 System Design Highlights

* **Real-time sync** powered by Liveblocks ensures low-latency updates
* **Convex database** maintains consistent shared state
* **Layer-based architecture** enables complex canvas interactions
* **Presence system** tracks active users and cursors
* **Separation of concerns** between UI, state, and networking

---

## 📂 Project Structure

```id="h9k2fp"
src/
│── app/                # Next.js app directory
│── components/         # Reusable UI components
│── canvas/             # Drawing & rendering logic
│── hooks/              # Custom React hooks
│── store/              # State management
│── lib/                # Utilities & helpers
│── convex/             # Backend (Convex functions)
│── liveblocks/         # Real-time collaboration logic
```

---

## 🎯 Use Cases

* Team brainstorming & whiteboarding
* Collaborative design discussions
* Product planning & ideation
* Educational and teaching tools

---

## 🧑‍💻 Key Learnings

* Building real-time collaborative systems
* Managing shared state across multiple users
* Designing scalable frontend architecture
* Implementing layer-based rendering
* Integrating authentication and backend services

---

## 👨‍💻 Author

**Anurag Sharma**
GitHub: https://github.com/Anurag200596

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!
