# 🕌 Rukū Counter App

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
![Status](https://img.shields.io/badge/status-in%20development-yellow)
![Built with React](https://img.shields.io/badge/built%20with-React-blue)
![Built with TensorFlow.js](https://img.shields.io/badge/TensorFlow.js-Enabled-orange)

> ⚠️ This project is currently **under development**. Features and accuracy will continue to improve over time.

---

## 📖 Overview

This is a privacy-respecting ReactJS web application that uses a machine learning model (trained in YOLO format and converted to TensorFlow.js) to detect the **Rukū** posture during Islamic prayer and **count the number of times** it is performed.

The app does **not display your webcam feed**, in accordance with Islamic etiquette regarding prayer.

---

## 📸 Features

- ✅ Detects the **Rukū** posture using your device's webcam
- ✅ Counts how many times Rukū has been performed
- ✅ Works **in real-time**, even on mobile browsers
- ✅ Uses a **transparent Rukū icon** instead of your actual image
- ✅ Offline-capable once deployed

---

## 🛠️ Tech Stack

- **ReactJS** – Frontend framework
- **TensorFlow.js** – For running the trained ML model in-browser
- **YOLOv8** – Original training format
- **ONNX → TFJS conversion** – Model optimized for web
- **react-webcam** – To capture live video frames
- **Custom pose classification logic** – To control sensitivity and debounce counts

---

## 🚀 Installation

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/ruku-counter.git
cd ruku-counter
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm start
```

---

## 📂 Project Structure

```
ruku-counter/
├── public/
│   ├── best_web_model/         # TFJS model files (model.json, shards)
│   ├── ruku-icon.png           # Transparent icon shown when Rukū is detected
├── src/
│   ├── App.js                  # Main app logic
│   ├── App.css                 # Styles
│   ├── RukuDetector.js         # Detection & model loading logic
├── README.md
├── package.json
```

---

## 🤖 Model Info

- Trained on custom Rukū images using YOLOv8
- Exported to ONNX and converted to TensorFlow.js
- Model only detects **one class: `ruku`**
- Detection thresholds and debounce logic fine-tuned to reduce false positives

---

## 📱 Mobile Use

You can test the app on your Android device (e.g., Galaxy S24+) using:

1. Local network (with IP + port from your computer)
2. Or deploy using tools like **Vercel**, **Netlify**, or **GitHub Pages**

---

## ⚠️ Known Issues

- May still trigger false positives due to lack of diverse negative training samples
- Will be improved with more training data (e.g., standing, bowing halfway, background noise)

---

## ✍️ License

MIT License — feel free to use, contribute, and adapt with attribution.

---

## 🤝 Acknowledgments

- [YOLOv8 by Ultralytics](https://github.com/ultralytics/yolov5)
- [TensorFlow.js](https://www.tensorflow.org/js)
- [React Webcam](https://www.npmjs.com/package/react-webcam)
- [Arginoa](https://github.com/Arginoa)

---

**Built with purpose to assist mindful worship through computer vision.**
