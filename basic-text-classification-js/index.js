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
  // Encode the text with metadata.word_index and see if the result is equal to `example`
  const predictImdb = new PredictImdb(metadata);
  const encodedExampleAsText = predictImdb.encodeReview(exampleAsText);
  console.assert(example.join('-') === encodedExampleAsText.join('-'));

  // TODO (other) examples
  /*
Decoded test_data[0]: <START> please give this one a miss br br <UNK> <UNK> and the rest of the cast rendered terrible performances the show is flat flat flat br br i don't know how michael madison could have allowed this one on his plate he almost seemed to know this wasn't going to work out and his performance was quite <UNK> so all you madison fans give this a miss <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD>
Predicted value for test_data[0]: [0.2222539] vs expected value 0

Decoded test_data[1]: a lot of patience because it focuses on mood and character development the plot is very simple and many of the scenes take place on the same set in frances <UNK> the sandy dennis character apartment but the film builds to a disturbing climax br br the characters create an atmosphere <UNK> with sexual tension and psychological <UNK> it's very interesting that robert altman directed this considering the style and structure of his other films still the trademark altman audio style is evident here and there i think what really makes this film work is the brilliant performance by sandy dennis it's definitely one of her darker characters but she plays it so perfectly and convincingly that it's scary michael burns does a good job as the mute young man regular altman player michael murphy has a small part the <UNK> moody set fits the content of the story very well in short this movie is a powerful study of loneliness sexual <UNK> and desperation be patient <UNK> up the atmosphere and pay attention to the wonderfully written script br br i praise robert altman this is one of his many films that deals with unconventional fascinating subject matter this film is disturbing but it's sincere and it's sure to <UNK> a strong emotional response from the viewer if you want to see an unusual film some might even say bizarre this is worth the time br br unfortunately it's very difficult to find in video stores you may have to buy it off the internet
Predicted value for test_data[1]: [0.9989477] vs expected value 1

Decoded test_data[2]: no improvement and demand a different king irritated <UNK> sends them a <UNK> br br delighted with this <UNK> looking new king who towers above them the <UNK> welcome him with a <UNK> of <UNK> dressed <UNK> the mayor steps forward to hand him the key to the <UNK> as <UNK> cameras record the event to everyone's horror the <UNK> promptly eats the mayor and then goes on a merry rampage <UNK> citizens at random a title card <UNK> reads news of the king's <UNK> throughout the kingdom when the now terrified <UNK> once more <UNK> <UNK> for help he loses his temper and <UNK> their community with lightning <UNK> the moral of our story delivered by a hapless frog just before he is eaten is let well enough alone br br considering the time period when this startling little film was made and considering the fact that it was made by a russian <UNK> at the height of that <UNK> country's civil war it would be easy to see this as a <UNK> about those events <UNK> may or may not have had <UNK> turmoil in mind when he made <UNK> but whatever <UNK> his choice of material the film stands as a <UNK> tale of universal <UNK> <UNK> could be the soviet union italy germany or japan in the 1930s or any country of any era that lets its guard down and is overwhelmed by <UNK> it's a fascinating film even a charming one in its macabre way but its message is no joke
Predicted value for test_data[2]: [0.737358] vs expected value 1

Decoded test_data[3]: <START> i generally love this type of movie however this time i found myself wanting to kick the screen since i can't do that i will just complain about it this was absolutely idiotic the things that happen with the dead kids are very cool but the alive people are absolute idiots i am a grown man pretty big and i can defend myself well however i would not do half the stuff the little girl does in this movie also the mother in this movie is reckless with her children to the point of neglect i wish i wasn't so angry about her and her actions because i would have otherwise enjoyed the flick what a number she was take my advise and fast forward through everything you see her do until the end also is anyone else getting sick of watching movies that are filmed so dark anymore one can hardly see what is being filmed as an audience we are <UNK> involved with the actions on the screen so then why the hell can't we have night vision <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD>
Predicted value for test_data[3]: [0.40470278] vs expected value 0

Decoded test_data[4]: <START> like some other people wrote i'm a die hard mario fan and i loved this game br br this game starts slightly boring but trust me it's worth it as soon as you start your hooked the levels are fun and <UNK> they will hook you <UNK> your mind turns to <UNK> i'm not kidding this game is also <UNK> and is beautifully done br br to keep this spoiler free i have to keep my mouth shut about details but please try this game it'll be worth it br br story 9 9 action 10 1 it's that good <UNK> 10 attention <UNK> 10 average 10 <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD> <PAD>
Predicted value for test_data[4]: [0.96267176] vs expected value 1
   */

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
