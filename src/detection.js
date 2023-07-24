const tf = require('@tensorflow/tfjs-node');

// URL to the TensorFlow 2.0 Saved Model
const modelURL = 'https://tfhub.dev/tensorflow/faster_rcnn/inception_resnet_v2_640x640/1';

// Function to load the model
const loadModel = async () => {
  const model = await tf.node.loadSavedModel(modelURL, ['serve'], 'serving_default');
  return model;
};

// Global variable to store the model
let modelPromise = loadModel();

// Function to perform object detection using the loaded model
const performObjectDetection = async (imageBuffer) => {
  try {
    // Load the model (if not already loaded)
    const model = await modelPromise;

    // Preprocess the image using TensorFlow
    const tensor = tf.node.decodeImage(imageBuffer).toFloat();
    const expanded = tensor.expandDims();

    // Make predictions
    const predictions = await model.predict({ image_tensor: expanded });

    // Parse the prediction results to get bounding boxes and class labels
    const boxes = predictions[0].arraySync();
    const classes = predictions[1].arraySync();
    const scores = predictions[2].arraySync();

    // Filter predictions with confidence score greater than a threshold (e.g., 0.5)
    const filteredPredictions = [];
    const threshold = 0.5;
    for (let i = 0; i < scores[0].length; i++) {
      if (scores[0][i] > threshold) {
        filteredPredictions.push({
          box: boxes[0][i],
          class: classes[0][i],
          score: scores[0][i],
        });
      }
    }

    return filteredPredictions;
  } catch (error) {
    console.error('Error during object detection:', error);
    return [];
  }
};

module.exports = performObjectDetection;