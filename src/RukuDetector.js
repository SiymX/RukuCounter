import * as tf from '@tensorflow/tfjs';

let model = null;

export async function loadModel() {
  if (!model) {
    model = await tf.loadGraphModel(`${process.env.PUBLIC_URL}/best_web_model/model.json`);
    console.log("TFJS model loaded");
  }
  return model;
}

export async function predictRuku(videoElement) {
    if (!model) return false;
  
    const inputTensor = tf.tidy(() => {
      return tf.browser.fromPixels(videoElement)
        .resizeBilinear([640, 640])
        .toFloat()
        .div(tf.scalar(255.0))
        .expandDims(0); 
    });
  
    let outputs;
  
    try {
      outputs = await model.executeAsync(inputTensor);
    } catch (err) {
      console.error("Model execution failed:", err);
      tf.dispose(inputTensor);
      return false;
    }
  
    const outputArray = Array.isArray(outputs) ? outputs : [outputs];
    if (!outputArray[0]) {
      tf.dispose([inputTensor, ...outputArray]);
      return false;
    }
  
    const outputData = await outputArray[0].array(); 
    tf.dispose([inputTensor, ...outputArray]);
  
    const boxes = [];
    const scores = [];
    const classes = [];
  
    for (let i = 0; i < outputData[0].length; i++) {
        const row = outputData[0][i];
        if (!Array.isArray(row) || row.length < 6) continue;
      
        const [x, y, w, h, objectness, classProb] = row;
        const confidence = objectness * classProb;
      
        // Log for tuning
        console.log(`Objectness: ${objectness.toFixed(2)}, ClassProb: ${classProb.toFixed(2)}, Confidence: ${confidence.toFixed(2)}`);
      
      
        if (objectness > 0.9 && classProb > 0.95 && confidence > 0.92)

            {
          const xMin = x - w / 2;
          const yMin = y - h / 2;
          const xMax = x + w / 2;
          const yMax = y + h / 2;
      
          boxes.push([yMin, xMin, yMax, xMax]);
          scores.push(confidence);
        }
      }
      
      
  
    if (boxes.length === 0) return false;
  
    const boxesTensor = tf.tensor2d(boxes);
    const scoresTensor = tf.tensor1d(scores);
    const nms = await tf.image.nonMaxSuppressionAsync(boxesTensor, scoresTensor, 1, 0.5, 0.5);
  
    const selected = await nms.array();
  
    tf.dispose([boxesTensor, scoresTensor, nms]);
    console.log("Sample output row:", outputData[0]?.[0]);

  
    return selected.length > 0;
    
  }
  
