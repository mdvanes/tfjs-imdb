// import * as tf from '@tensorflow/tfjs';

// TODO https://medium.com/tensorflow/a-gentle-introduction-to-tensorflow-js-dba2e5257702
// TODO also see jsfiddle

// Define a model for linear regression.
const model = tf.sequential();
model.add(tf.layers.dense({units: 1, inputShape: [1]}));

// Prepare the model for training: Specify the loss and the optimizer.
model.compile({loss: 'meanSquaredError', optimizer: 'sgd'});

// TODO use tf.range(0, 9, 2).print(); ?
function createTrainXs(amount, exclude) {
    const result = [];
    for(let i = 1; i <= amount; i++) {
        if(i !== exclude) {
            result.push(i);
        }
    }
    return tf.tensor2d(result, [amount - 1, 1]);
}

function createTrainYs(amount, exclude) {
    const result = [];
    let counter = 1;
    for(let i = 1; i <= amount; i++) {
        if(i !== exclude) {
            result.push(counter);
        }
        counter = counter + 2;
    }
    return tf.tensor2d(result, [amount - 1, 1]);
}

createTrainYs(11, 5);

// Generate some synthetic data for training.
const xs = createTrainXs(11, 5); //tf.tensor2d([1, 2, 3, 4, 6, 7, 8, 9, 10, 11], [10, 1]);
const ys = createTrainYs(11, 5); // tf.tensor2d([1, 3, 5, 7, 11, 13, 15, 17, 19, 21], [10, 1]);

// Train the model using the data.
model.fit(xs, ys, {epochs: 10}).then(() => {
    // Use the model to do inference on a data point the model hasn't seen before:
    const predictX = 5;
    console.log(`For an x of ${predictX}, the model predicts a y of:`);
    const x = model.predict(tf.tensor2d([5], [1, 1]));
    x.data().then(x1 => console.log(console.log(`For an x of ${predictX}, the model predicts a y of ${x1[0]}`)))

    model.predict(tf.tensor2d([5], [1, 1])).print();
});

export const test = [];