import * as tf from "@tensorflow/tfjs/dist/index";

export default class PredictImdb {
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
   * @param (optional) isRaw - boolean to indicate that only the raw prediction, an unrounded float, should be returned.
   * @returns {string} A text containing the prediction, expected value and description
   */
  predict(reviewText, expectedResult, description, isRaw = false) {
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

    return isRaw ? predictionValue : result;
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
