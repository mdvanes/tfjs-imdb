const tf = require('@tensorflow/tfjs');
const {
    performance,
    PerformanceObserver
} = require('perf_hooks');

// Load the binding:
require('@tensorflow/tfjs-node');  // Use '@tensorflow/tfjs-node-gpu' if running with GPU.

// Train a simple model for XOR (example from https://js.tensorflow.org/)
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

// Neural network for XOR (https://medium.com/tensorflow/a-gentle-introduction-to-tensorflow-js-dba2e5257702)

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

// performance.clearMarks should clear all the marks, but it doesn't work. As a workaround, unique mark names are created
// async function run(model, epochs) {
//     performance.mark('fitting1' + epochs);
//     // Fit the model
//     await model.fit(xs, ys, {
//         batchSize: 1,
//         epochs //5000
//     });
//     performance.mark('fitting2' + epochs);
//
//     // Predict the training set
//     model.predict(xs).print();
//     performance.measure('fitting' + epochs, 'fitting1' + epochs, 'fitting2' + epochs);
//     console.log(performance.getEntries()); // TODO should be the same, because of clearMarks()
//     const measure = performance.getEntriesByName('fitting' + epochs)[0];
//     console.log(`Duration of ${measure.name} for ${epochs} epochs: ${Math.round(measure.duration)}ms`);
//     performance.clearMarks();
// }

async function run(model, epochs) {
    performance.mark('fitting1');
    // Fit the model
    await model.fit(xs, ys, {
        batchSize: 1,
        epochs //5000
    });
    performance.mark('fitting2');

    // Predict the training set
    model.predict(xs).print();
    performance.measure('fitting' + epochs, 'fitting1', 'fitting2');
    //console.log(performance.getEntries()); // TODO should also clear "measure" and not only "mark". Or sort descending by "duration"
    const measure = performance.getEntriesByName('fitting' + epochs)[0];
    console.log(`Duration of ${measure.name} for ${epochs} epochs: ${Math.round(measure.duration)}ms`);
    performance.clearMarks();
}

// async function run(model, epochs) {
//     // Fit the model
//     await model.fit(xs, ys, {
//         batchSize: 1,
//         epochs //5000
//     });
//
//     // Predict the training set
//     model.predict(xs).print();
// }
//
// const timedRun = performance.timerify(run);
//
// const obs = new PerformanceObserver((list) => {
//     const measure = list.getEntries()[0];
//     // console.log(measure.duration);
//     console.log(`Duration of ${measure.name}: ${Math.round(measure.duration)}ms`);
//     obs.disconnect();
//     performance.clearFunctions();
// });
// obs.observe({ entryTypes: ['function'] });

run(createModel(), 2);
run(createModel(), 20);
run(createModel(), 50);
run(createModel(), 200);
run(createModel(), 2000);
run(createModel(), 5000);