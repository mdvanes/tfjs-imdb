import 'babel-polyfill';
import * as tf from '@tensorflow/tfjs';

// import modelJson from './model.json';

// import './group1-shard1of1';

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

class PredictImdb {
  constructor(metadata) {
    this.wordIndex = metadata.word_index;
    this.indexFrom = metadata.index_from;
  }

  decodeReview(reviewText) {
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
    const padding = new Array(256 - result.length);
    padding.fill(0);
    result = [...result, ...padding];
    return result;
  }
}

const run = async () => {
  const port = location.port === '1234' ? '1235' : '8080';

  const model = await tf.loadModel(`http://localhost:${port}/model.json`);

  const metadata = await loadHostedMetadata(`http://localhost:${port}/metadata.json`);
  const maxLen = 256; // TODO test with metadata.max_len

  // For this input: '1,591,202,14,31,6,717,10,10,2,2,5,4,360,7,4,177,5760,394,354,4,123,9,1035,1035,1035,10,10,13,92,124,89,488,7944,100,28,1668,14,31,23,27,7479,29,220,468,8,124,14,286,170,8,157,46,5,27,239,16,179,2,38,32,25,7944,451,202,14,6,717,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0'
  // Encoded version of this: <START> please give this one a miss br br <UNK> <UNK> and the rest of the cast rendered terrible performances the show is flat flat flat br br i don't know how michael madison could have allowed this one on his plate he almost seemed to know this wasn't going to work out and his performance was quite <UNK> so all you madison fans give this a miss
  const example = ['1', '591', '202', '14', '31', '6', '717', '10', '10', '2', '2', '5', '4', '360', '7', '4', '177', '5760', '394', '354', '4', '123', '9', '1035', '1035', '1035', '10', '10', '13', '92', '124', '89', '488', '7944', '100', '28', '1668', '14', '31', '23', '27', '7479', '29', '220', '468', '8', '124', '14', '286', '170', '8', '157', '46', '5', '27', '239', '16', '179', '2', '38', '32', '25', '7944', '451', '202', '14', '6', '717', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'];

  const exampleAsText = 'please give this one a miss br br <UNK> <UNK> and the rest of the cast rendered terrible performances the show is flat flat flat br br i don\'t know how michael madison could have allowed this one on his plate he almost seemed to know this wasn\'t going to work out and his performance was quite <UNK> so all you madison fans give this a miss';
  // Translate the text with metadata.word_index and see if the result is equal to `example`
  const predictImdb = new PredictImdb(metadata);
  const decodedExampleAsText = predictImdb.decodeReview(exampleAsText);
  console.assert(example.join('-') === decodedExampleAsText.join('-'));

  const inputBuffer = tf.buffer([1, maxLen], 'float32');
  for (let i = 0; i < example.length; ++i) {
    const word = example[i];
    inputBuffer.set(word, 0, i);
  }
  const input = inputBuffer.toTensor();

  const prediction = model.predict(input);
  // Expect this output: 0
  console.log(`Prediction (target is 0): ${prediction.dataSync()[0]} (${prediction})`);
  prediction.dispose();
};

run();
