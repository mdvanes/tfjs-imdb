// JavaScript

import * as tf from '@tensorflow/tfjs';

const run = async () => {
  const model = await tf.loadModel('https://foo.bar/tfjs_artifacts/model.json');
};

run();
