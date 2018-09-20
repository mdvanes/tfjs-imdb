import 'babel-polyfill';
import * as tf from '@tensorflow/tfjs';
import { exampleReviewObj } from './exampleReviews';
import { loadHostedMetadata } from './load-util';
import { compareExample } from './example-util';
import PredictImdb from './PredictImdb';
import './elements/Results';

// This effectively a re-implementation of https://github.com/tensorflow/tfjs-examples/blob/master/sentiment/index.js

const run = async () => {
  const {protocol, hostname, port, href} = location;
  const modelPort = port === '1234' ? '1235' : port;
  const modelHref = port === '1234' ? `${protocol}//${hostname}:${modelPort}/` : href;

  const model = await tf.loadModel(`${modelHref}model.json`);
  const metadata = await loadHostedMetadata(`${modelHref}metadata.json`);
  const predictImdb = new PredictImdb(model, metadata);

  const result = compareExample(predictImdb);

  const resultElem = document.querySelector('t-results');
  resultElem.body = result;

  predictImdb
    .batchPredict(exampleReviewObj)
    .map(result => resultElem.addResult(result));
};

run();
