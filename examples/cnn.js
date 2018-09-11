/**
 * Convolutional neural network from https://medium.com/tensorflow/a-gentle-introduction-to-tensorflow-js-dba2e5257702
 * this model is used for the recognizing hand-written digits in the so called MNIST dataset. http://yann.lecun.com/exdb/mnist/
 * That is why the output has 10 units
 * @example node examples/cnn.js
 */
const tf = require('@tensorflow/tfjs');

// Load the binding:
require('@tensorflow/tfjs-node');  // Use '@tensorflow/tfjs-node-gpu' if running with GPU.

// Create sequential model
const model = tf.sequential();

// Add layers
/*
Here we created a conv layer that takes input of size [28,28,1].
The input will be a gray image of size 28 x 28.
Then we apply 8 kernels of size 5x5 and stride equals to 1 initialized with VarianceScaling.
After that, we apply an activation function which basically takes the negative values in the tensor and replaces them with zeros.
*/
const convlayer = tf.layers.conv2d({
    inputShape: [28,28,1],
    kernelSize: 5,
    filters: 8,
    strides: 1,
    activation: 'relu',
    kernelInitializer: 'VarianceScaling'
});

// Evaluate the convlayer
// const input = tf.zeros([1,28,28,1]);
// const output = convlayer.apply(input);

// inspecting the shape of the output tensor we see it has shape[1,24,24,8].
// This is evaluated using the formula
// const outputSize = Math.floor((inputSize-kernelSize)/stride +1);

// Add the convlayer to the model
model.add(convlayer);

// create a max pooling layer
model.add(tf.layers.maxPooling2d({
    poolSize: [2, 2],
    strides: [2, 2]
}));

// create the second conv layer
model.add(tf.layers.conv2d({
    kernelSize: 5,
    filters: 16,
    strides: 1,
    activation: 'relu',
    kernelInitializer: 'VarianceScaling'
}));

// create a max pooling layer
model.add(tf.layers.maxPooling2d({
    poolSize: [2, 2],
    strides: [2, 2]
}));


// flatten the layers to use it for the dense layers - dense layer does not accept 2d array
model.add(tf.layers.flatten());

// dense layer with output 10 units
model.add(tf.layers.dense({
    units: 10,
    kernelInitializer: 'VarianceScaling',
    activation: 'softmax'
}));

// create adam optimizer
const LEARNING_RATE = 0.0001;
const optimizer = tf.train.adam(LEARNING_RATE);

// compile the model (attaching the model with the optimizer)
model.compile({
    optimizer: optimizer,
    loss: 'categoricalCrossentropy',
    metrics: ['accuracy'],
});

// Train the model on the dataset
const batch = tf.zeros([BATCH_SIZE,28,28,1]);
const labels = tf.zeros([BATCH_SIZE, NUM_CLASSES]);

async function run() {
    const h = await model.fit(batch, labels,
        {
            batchSize: BATCH_SIZE,
            validationData: validationData,
            epochs: BATCH_EPOCHs
        });
}

run();
// TODO this is not done yet and will not give a proper result