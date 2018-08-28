/**
 * Convolutional neural network from https://medium.com/tensorflow/a-gentle-introduction-to-tensorflow-js-dba2e5257702
 * @example node examples/cnn.js
 */

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


// flatten the layers to use it for the dense layers
model.add(tf.layers.flatten());

// dense layer with output 10 units
model.add(tf.layers.dense({
    units: 10,
    kernelInitializer: 'VarianceScaling',
    activation: 'softmax'
}));