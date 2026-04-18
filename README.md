# Deep Learning for Pneumonia Detection from Chest X-Ray Images — Frontend

**Course:** COMP263-001 Deep Learning — Centennial College, Winter 2026

## Group Members

| # | Name | Role |
|---|------|------|
| 1 | Jaturaput Jongsubcharoen | Frontend UI (React application) |

## Project Description

React single-page application for interacting with the trained deep learning models. Users can select a model, view its test-set metrics (accuracy, precision, recall, F1-score), upload a chest X-ray image, and receive a real-time Normal/Pneumonia prediction.

## Prerequisites

- **Node.js:** 20.x
- **npm:** Included with Node.js
- **Backend server** must be running on http://localhost:8000

## External Libraries / Dependencies

| Library | Purpose |
|---------|--------|
| react 18 | UI component framework |
| react-dom 18 | React DOM renderer |
| vite 5 | Development server and build tool |
| @vitejs/plugin-react 4 | Vite plugin for React JSX/HMR |
| eslint 9 | Code linting |

All dependencies are listed in `package.json`.

## How to Set Up and Run

### Step 1: Navigate to the Frontend Folder

```bash
cd Final_GroupProject_DeepLearning_COMP263_001_frontend
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Start the Backend First

Open a **separate terminal** and start the backend API server (see Backend README for full instructions):

```bash
cd Final_GroupProject_DeepLearning_COMP263_001_backend
.venv\Scripts\activate
uvicorn app:app --reload --port 8000
```

### Step 4: Start the Frontend Development Server

```bash
npm run dev
```

Opens at **http://localhost:5173** in your browser.

### Step 5: Using the Application

1. **Select a Model** — Click one of the 6 model cards (Baseline CNN, Deep CNN, Wide CNN, Autoencoder Transfer, ResNet50 Transfer, ResNet50 From-Scratch). The selected card highlights with a pink border.
2. **View Metrics** — After selecting a model, the 4 gauge rings animate to show Accuracy, Precision, Recall, and F1-Score from the test set.
3. **Upload an Image** — Drag and drop a chest X-ray image onto the upload area, or click to browse files.
4. **Predict** — Click the **Predict** button. The app sends the image to the backend and displays the predicted class (Normal or Pneumonia), confidence percentage, and probability bars.
5. **Clear** — Click **Clear** to reset the image and result.

## Project Structure

```
Final_GroupProject_DeepLearning_COMP263_001_frontend/
├── index.html              # HTML entry point
├── package.json            # Node.js dependencies and scripts
├── vite.config.js          # Vite configuration
├── README.md               # This file
├── .gitignore              # Git ignore rules
├── src/
│   ├── main.jsx            # React entry point
│   ├── App.jsx             # Main application component
│   ├── App.css             # Application styles
│   ├── index.css           # Global styles and CSS variables
│   └── components/
│       ├── ModelSelector.jsx   # Model card grid with icons
│       ├── MetricsPanel.jsx    # 4 metric gauge displays
│       ├── Gauge.jsx           # SVG ring gauge component
│       └── PredictPanel.jsx    # Image upload, predict button, results
```

## Build for Production

```bash
npm run build
```

Output is generated in the `dist/` folder.
