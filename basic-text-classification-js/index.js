import 'babel-polyfill';
import * as tf from '@tensorflow/tfjs';
import { exampleReviewObj } from './exampleReviews';
import { loadHostedMetadata } from './load-util';
import { compareExample } from './example-util';
import PredictImdb from './PredictImdb';
import './elements/Result';

// This effectively a re-implementation of https://github.com/tensorflow/tfjs-examples/blob/master/sentiment/index.js

// TODO add more examples

const run = async () => {
  const {protocol, hostname, port} = location;
  const modelPort = port === '1234' ? '1235' : port;
  const modelOrigin = `${protocol}//${hostname}:${modelPort}`;

  const model = await tf.loadModel(`${modelOrigin}/model.json`);
  const metadata = await loadHostedMetadata(`${modelOrigin}/metadata.json`);
  const predictImdb = new PredictImdb(model, metadata);

  const result = compareExample(predictImdb);

  const resultElem = document.querySelector('t-result');
  resultElem.body = result;

  predictImdb
    .batchPredict(exampleReviewObj)
    .map(result => resultElem.addResult(result));
};

run();
