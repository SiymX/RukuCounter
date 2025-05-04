import './App.css';
import Webcam from 'react-webcam';
import { useRef, useEffect, useState } from 'react';
import { loadModel, predictRuku } from './RukuDetector';

function App() {
  const webcamRef = useRef(null);
  const [inRuku, setInRuku] = useState(false);
  const [rukus, setRukus] = useState(0);
  const [modelLoaded, setModelLoaded] = useState(false);

  const rukuStartRef = useRef(null);
  const cooldownRef = useRef(false);
  const COOLDOWN_MS = 3000;
  const REQUIRED_DURATION = 1500; 

  useEffect(() => {
    let model = null;

    const setup = async () => {
      model = await loadModel();
      setModelLoaded(true);

      const interval = setInterval(async () => {
        if (webcamRef.current && webcamRef.current.video.readyState === 4) {
          const video = webcamRef.current.video;
          const detected = await predictRuku(video);

          const now = Date.now();

          if (detected) {
            setInRuku(true);

            if (!rukuStartRef.current) {
              rukuStartRef.current = now; // mark time
            }

            // if held for enough time and no cooldown
            if (
              !cooldownRef.current &&
              now - rukuStartRef.current >= REQUIRED_DURATION
            ) {
              setRukus((prev) => prev + 1);
              cooldownRef.current = true;
              rukuStartRef.current = null;

              setTimeout(() => {
                cooldownRef.current = false;
              }, COOLDOWN_MS);
            }
          } else {
            setInRuku(false);
            rukuStartRef.current = null;
          }
        }
      }, 200); // i added a cooldown

      return () => clearInterval(interval);
    };

    setup();
  }, []);

  return (
    <div className="App">
      {!modelLoaded && <div className="loading">Loading Model...</div>}
      <Webcam
        ref={webcamRef}
        style={{ display: 'none' }}
        screenshotFormat="image/jpeg"
        videoConstraints={{ facingMode: 'user' }}
      />

      <div className="ruku-container">
        <img
          src="/ruku-icon.png"
          alt="Ruku Icon"
          className={`ruku-icon ${inRuku ? 'active' : ''}`}
        />
        <div className="count">Rukūs: {rukus}</div>
      </div>
    </div>
  );
}

export default App;
