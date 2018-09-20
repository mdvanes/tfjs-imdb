import 'babel-polyfill';
import * as tf from '@tensorflow/tfjs';
import {exampleReviewObj} from "./exampleReviews";
import './elements/Result';

// This effectively a re-implementation of https://github.com/tensorflow/tfjs-examples/blob/master/sentiment/index.js

const loadHostedMetadata = async (url) => {
  console.log('Loading metadata from ' + url);
  try {
    const metadataJson = await fetch(url);
    console.log(metadataJson)
    const metadata = await metadataJson.json();
    // ui.status('Done loading metadata.');
    return metadata;
  } catch (err) {
    console.error(err);
    // ui.status('Loading metadata failed.');
  }
};

// TODO add more examples

// TODO extract
class PredictImdb {
  constructor(model, metadata) {
    this.model = model;
    this.wordIndex = metadata.word_index;
    this.indexFrom = metadata.index_from;
    this.maxLen = 256; // TODO test with metadata.max_len
  }

  encodeReview(reviewText) {
    // const reviewTextArr = reviewText.split(' ');
    // console.log(x, x[0], this.wordIndex[x[0]]  + this.indexFrom);
    // // TODO would be interesting to do this with RxJs
    // for(let i = 0; i < reviewTextArr.length; i++) {
    //   const word = reviewTextArr[i];
    //   const mapped =
    // }
    let result = reviewText
      .split(' ')
      .map(word => {
        const codedWord = this.wordIndex[word];
        // Unknown words should get index "2"
        return codedWord ? codedWord + this.indexFrom : 2;
      });
    // Prepend with "1" for start
    result = [1, ...result]; // same as result.unshift(1)

    // Pad with "0" until length is 256
    const emptyLength = 256 - result.length;
    const padding = emptyLength > 0 ? new Array(256 - result.length) : new Array();
    padding.fill(0);

    result = [...result, ...padding];

    // Limit to 256 length?
    // result.slice()
    return result;
  }

  /**
   * Run a prediction for reviewText
   * @param (required) reviewText
   * @param (optional) expectedResult - add this expected result to the output
   * @param (optional) description - add this description of the reviewText to the output
   * @returns {string} A text containing the prediction, expected value and description
   */
  predict(reviewText, expectedResult, description) {
    // Encode the text with metadata.word_index and see if the result is equal to `example`
    const encodedReview = this.encodeReview(reviewText);

    const inputBuffer = tf.buffer([1, this.maxLen], 'float32');
    for (let i = 0; i < encodedReview.length; ++i) {
      const word = encodedReview[i];
      inputBuffer.set(word, 0, i);
    }
    const input = inputBuffer.toTensor();

    const prediction = this.model.predict(input);

    const expectedResultLabel = expectedResult ? ` (target is ${expectedResult})` : '';
    const descriptionLabel = description ? ` for "${description}"` : '';
    // const result = `Prediction${descriptionLabel}${expectedResultLabel}: ${prediction.dataSync()[0]} (${prediction})`;
    const predictionValue = prediction.dataSync()[0];
    const result = `Prediction${descriptionLabel}${expectedResultLabel} is ${Math.round(predictionValue)} (${predictionValue} before rounding)`;
    prediction.dispose();

    return result;
  }

  batchPredict(reviewsObj) {
    // return reviewsObj.map(review => this.predict(...review));
    return reviewsObj
      .map(({reviewText, expectedResult, description}) => {
        // console.log(reviewText)
        return this.predict(reviewText, expectedResult, description)
      });
  }
}

const run = async () => {
  const {protocol, hostname, port} = location;
  const modelPort = port === '1234' ? '1235' : port;
  const modelOrigin = `${protocol}//${hostname}:${modelPort}`;

  const model = await tf.loadModel(`${modelOrigin}/model.json`);
  const metadata = await loadHostedMetadata(`${modelOrigin}/metadata.json`);
  const predictImdb = new PredictImdb(model, metadata);

  // For this input: '1,591,202,14,31,6,717,10,10,2,2,5,4,360,7,4,177,5760,394,354,4,123,9,1035,1035,1035,10,10,13,92,124,89,488,7944,100,28,1668,14,31,23,27,7479,29,220,468,8,124,14,286,170,8,157,46,5,27,239,16,179,2,38,32,25,7944,451,202,14,6,717,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0'
  // Encoded version of this: <START> please give this one a miss br br <UNK> <UNK> and the rest of the cast rendered terrible performances the show is flat flat flat br br i don't know how michael madison could have allowed this one on his plate he almost seemed to know this wasn't going to work out and his performance was quite <UNK> so all you madison fans give this a miss
  const example = ['1', '591', '202', '14', '31', '6', '717', '10', '10', '2', '2', '5', '4', '360', '7', '4', '177', '5760', '394', '354', '4', '123', '9', '1035', '1035', '1035', '10', '10', '13', '92', '124', '89', '488', '7944', '100', '28', '1668', '14', '31', '23', '27', '7479', '29', '220', '468', '8', '124', '14', '286', '170', '8', '157', '46', '5', '27', '239', '16', '179', '2', '38', '32', '25', '7944', '451', '202', '14', '6', '717', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'];

  const exampleAsText = 'please give this one a miss br br <UNK> <UNK> and the rest of the cast rendered terrible performances the show is flat flat flat br br i don\'t know how michael madison could have allowed this one on his plate he almost seemed to know this wasn\'t going to work out and his performance was quite <UNK> so all you madison fans give this a miss';
  // Encode the text with metadata.word_index and see if the result is equal to `example`
  const encodedExampleAsText = predictImdb.encodeReview(exampleAsText);
  console.assert(example.join('-') === encodedExampleAsText.join('-'));

  const result = predictImdb.predict(exampleAsText, '0', 'my example');
  console.log(result);

  const resultElem = document.querySelector('t-result');
  resultElem.body = result;
  // resultElem.addResult(result);

  predictImdb
    .batchPredict(exampleReviewObj)
    .map(result => resultElem.addResult(result));
};

run();
