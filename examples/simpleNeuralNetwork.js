const tf = require('@tensorflow/tfjs');

// Load the binding:
require('@tensorflow/tfjs-node');  // Use '@tensorflow/tfjs-node-gpu' if running with GPU.

// Train a simple model (example from https://js.tensorflow.org/)
// const model = tf.sequential();
// model.add(tf.layers.dense({units: 100, activation: 'relu', inputShape: [10]}));
// model.add(tf.layers.dense({units: 1, activation: 'linear'}));
// model.compile({optimizer: 'sgd', loss: 'meanSquaredError'});
//
// const xs = tf.randomNormal([100, 10]);
// const ys = tf.randomNormal([100, 1]);
//
// model.fit(xs, ys, {
//     epochs: 100,
//     callbacks: {
//         onEpochEnd: async (epoch, log) => {
//             console.log(`Epoch ${epoch}: loss = ${log.loss}`);
//         }
//     }
// });

// Define the training set
const xs = tf.tensor2d([[0,0],[0,1],[1,0],[1,1]]);
const ys = tf.tensor2d([[0],[1],[1],[0]]);

// Create the model
function createModel()
{
    const model = tf.sequential();
    model.add(tf.layers.dense({units:8, inputShape:2, activation: 'tanh'}));
    model.add(tf.layers.dense({units:1, activation: 'sigmoid'}));
    model.compile({optimizer: 'sgd', loss: 'binaryCrossentropy', lr:0.1});
    return model;
}

async function run(model) {
    // Fit the model
    await model.fit(xs, ys, {
        batchSize: 1,
        epochs: 20 //5000
    });

    // Predict the training set
    model.predict(xs).print();
}

run(createModel());