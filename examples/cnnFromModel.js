/**
 * Convolutional neural network from https://medium.com/tensorflow/a-gentle-introduction-to-tensorflow-js-dba2e5257702
 * Uses the MobileNet model
 * @example node examples/cnnFromModel.js
 */
global.fetch = require('node-fetch');
const tf = require('@tensorflow/tfjs');

// Load the binding:
require('@tensorflow/tfjs-node');  // Use '@tensorflow/tfjs-node-gpu' if running with GPU.

async function run() {
    let mobilenet = await tf.loadModel(
        'https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/model.json');

    //The input size is [null, 224, 224, 3]
    const input_s = mobilenet.inputs[0].shape;

    //The output size is [null, 1000]
    const output_s = mobilenet.outputs[0].shape;

    console.log(`input_s ${input_s} | output_s ${output_s}`);

    const pred = mobilenet.predict(tf.zeros([1, 224, 224, 3]));
    pred.argMax().print();

    // The number of layers in the model '88'
    const len = mobilenet.layers.length;

    // this outputs the name of the 3rd layer 'conv1_relu'
    const name3 = mobilenet.layers[3].name;

    console.log(`len ${len} | name3 ${name3}`);

    const layer = mobilenet.getLayer('conv_pw_13_relu');

    mobilenet = tf.model({inputs: mobilenet.inputs, outputs: layer.output});

    //this outputs a layer of size [null, 7, 7, 256]
    const layerOutput = layer.output.shape;

    trainableModel = tf.sequential({
        layers: [
            tf.layers.flatten({inputShape: [7, 7, 256]}),
            tf.layers.dense({
                units: 100,
                activation: 'relu',
                kernelInitializer: 'varianceScaling',
                useBias: true
            }),
            tf.layers.dense({
                units: 2,
                kernelInitializer: 'varianceScaling',
                useBias: false,
                activation: 'softmax'
            })
        ]
    });
}

run();
