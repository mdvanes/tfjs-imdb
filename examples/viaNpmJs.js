// import * as tf from '@tensorflow/tfjs';

// Define a model for linear regression.
const model = tf.sequential();
model.add(tf.layers.dense({units: 1, inputShape: [1]}));

// Prepare the model for training: Specify the loss and the optimizer.
model.compile({loss: 'meanSquaredError', optimizer: 'sgd'});

// Generate some synthetic data for training.
const xs = tf.tensor2d([1, 2, 3, 4, 6, 7, 8, 9, 10, 11], [10, 1]);
const ys = tf.tensor2d([1, 3, 5, 7, 11, 13, 15, 17, 19, 21], [10, 1]);

// Train the model using the data.
model.fit(xs, ys, {epochs: 10}).then(() => {
    // Use the model to do inference on a data point the model hasn't seen before:
    const predictX = 5;
    console.log(`For an x of ${predictX}, the model predicts a y of:`);
    model.predict(tf.tensor2d([5], [1, 1])).print();
});

export const test = [];