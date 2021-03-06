import 'babel-polyfill';
import {loadModel} from '@tensorflow/tfjs';
import {exampleReviewObj} from './exampleReviews';
import {loadHostedMetadata} from './load-util';
import {compareExample} from './example-util';
import PredictImdb from './PredictImdb';
import './elements/Results';
import './elements/RealTimePredict';
import './elements/Donut';

// This effectively a re-implementation of https://github.com/tensorflow/tfjs-examples/blob/master/sentiment/index.js

const run = async () => {
  const {protocol, hostname, port, href} = location;
  const modelPort = port === '1234' ? '1235' : port;
  const modelHref = port === '1234'
    ? `${protocol}//${hostname}:${modelPort}/`
    : href;

  const model = await loadModel(`${modelHref}model.json`);
  const metadata = await loadHostedMetadata(`${modelHref}metadata.json`);
  const predictImdb = new PredictImdb(model, metadata);

  const result = compareExample(predictImdb);

  const resultElem = document.querySelector('t-results');
  resultElem.body = result;

  predictImdb
      .batchPredict(exampleReviewObj)
      .map((result) => resultElem.addResult(result));

  const realTimePredictElem = document.querySelector('real-time-predict');
  realTimePredictElem.predictor = predictImdb;
};

run();
