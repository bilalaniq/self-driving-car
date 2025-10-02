# 🚗 Self-Driving Car

This is a browser-based **self-driving car simulation** built with **JavaScript**.  
It uses a **feed-forward neural network** and **genetic mutation** to train cars to drive autonomously on a road with dummy traffic.

![Demo GIF](rec.gif)

---

## ✨ Features
- **AI Cars** that learn to drive using neural networks.
- **Sensors** detect road borders and other vehicles.
- **Traffic Cars (Dummies)** act as obstacles.
- **Training & Mutation**:
  - Best-performing AI car is saved.
  - Neural networks mutate for improvement.
- **Save & Load AI Brain**:
  - Save trained model to `localStorage`.
  - Export/Import brain as JSON file.
- **Visualizer** that shows the car’s decision-making neural network in real time.

---

## 📂 Project Structure
```

D:\Self-Driving-Car
│── index.html          # Main HTML file
│── style.css           # Basic styling
│── main.js             # Simulation loop & setup
│── car.js              # Car class (AI + movement)
│── controls.js         # Car control logic (manual/AI/Dummy)
│── road.js             # Road & lane rendering
│── sensor.js           # Car sensors (rays)
│── utils.js            # Helper functions (math, intersections, etc.)
│── network.js          # Neural network logic
│── visualizer.js       # Draws neural network visualization
│── bestBrain.json      # Saved trained model
│── car.png             # Car sprite
│── rec.gif             # Demo recording
└── Readme.md           # Documentation

````

---

## 🚀 Getting Started

### 1. Clone this repo
```bash
git clone https://github.com/your-username/Self-Driving-Car.git
cd Self-Driving-Car
````

### 2. Open in browser

Just open `index.html` in your browser (no build tools needed).

---

## 🎮 Controls

* **Keyboard** (for manual cars):

  * `Arrow Up` → Accelerate
  * `Arrow Down` → Reverse
  * `Arrow Left` → Steer left
  * `Arrow Right` → Steer right

* **AI Cars**: Learn automatically using sensors + neural network.

---

## 🧠 Training AI

1. Increase car population in `main.js`:

   ```js
   const cars = generateCars(1000);
   ```
2. Let cars drive → best one survives.
3. Save best brain:

   ```js
   save();
   ```
4. Reload and watch improvement.

You can also **export** and **import** the brain:

* **Download** → Saves `bestBrain.json`
* **Upload** → Loads brain into simulation

---

## 🛠 Tech Used

* **JavaScript (Vanilla)** → Core simulation
* **Canvas API** → Rendering
* **Feed-Forward Neural Network** (custom implementation)
* **Genetic Algorithm** (mutation for learning)

---

## 🎯 Future Improvements

* Add traffic generation dynamically (instead of hardcoded).
* Add different road types (curves, intersections).
* Implement reward-based reinforcement learning.

---

## 📜 License

MIT License © 2025 NULLSECT

```