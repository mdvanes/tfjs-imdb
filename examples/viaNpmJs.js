// import * as tf from '@tensorflow/tfjs';

// TODO https://medium.com/tensorflow/a-gentle-introduction-to-tensorflow-js-dba2e5257702
// TODO also see jsfiddle

function log(...keys) {
    console.log(...keys);
    document.querySelector('pre').innerHTML = `${document.querySelector('pre').innerHTML}
${keys.join('')}`;
}

const tensor_s = tf.tensor([2,2]).shape;
log('The shape of tensor[2,2] = ', tensor_s);

const a = tf.tensor([1,2,3]);
a.square().square().print();
a.dispose();
// is disposed - a.square().square().print();

(function() {
    const x = tf.tensor([1,2,3]);
    tf.tidy(()=>{
        const y = x.square();
    const z = x.mul(y);
    z.data().then(val => console.log(val[2]))
    //return z
    z.print();
});
})();

(function() {
    const trainAmount = 14;

    // Define a model for linear regression.
    const model = tf.sequential();
    model.add(tf.layers.dense({units: 1, inputShape: [1]}));

    // Prepare the model for training: Specify the loss and the optimizer.
    model.compile({loss: 'meanSquaredError', optimizer: 'sgd'});

    // TODO use tf.range(0, 9, 2).print(); ?
    function createTrainXs(amount, exclude) {
        const result = [];
        for(let i = 1; i <= amount; i++) {
            if(i !== exclude) {
                result.push(i);
            }
        }
        return tf.tensor2d(result, [amount - 1, 1]);
    }

    function createTrainYs(amount, exclude) {
        const result = [];
        let counter = 1;
        for(let i = 1; i <= amount; i++) {
            if(i !== exclude) {
                result.push(counter);
            }
            counter = counter + 2;
        }
        return tf.tensor2d(result, [amount - 1, 1]);
    }

    //createTrainYs(11, 5);

    // Generate some synthetic data for training.
    const xs = createTrainXs(trainAmount + 1, 5); //tf.tensor2d([1, 2, 3, 4, 6, 7, 8, 9, 10, 11], [10, 1]);
    const ys = createTrainYs(trainAmount + 1, 5); // tf.tensor2d([1, 3, 5, 7, 11, 13, 15, 17, 19, 21], [10, 1]);

    // Train the model using the data.
    model.fit(xs, ys, {epochs: 10}).then(() => {
        // Use the model to do inference on a data point the model hasn't seen before:
        const predictX = 5;
    //log(`For an x of ${predictX}, the model predicts a y of:`);
    const x = model.predict(tf.tensor2d([5], [1, 1]));
    x.data().then(x1 => log(`
Training against ${trainAmount} entries.
      For an x of ${predictX}, the model predicts an y of ${x1[0]} 
      (For x=5 it should be that y=9)`))

    //model.predict(tf.tensor2d([5], [1, 1])).print();
});
})();

(function() {
// Function that should be optimized f(x) = xˆ6 + 2xˆ4 + 3xˆ2+1
    function f(x) {
        const f1 = x.pow(tf.scalar(6, 'int32')) //x^6
        const f2 = x.pow(tf.scalar(4, 'int32')).mul(tf.scalar(2)) //2x^4
        const f3 = x.pow(tf.scalar(2, 'int32')).mul(tf.scalar(3)) //3x^2
        const f4 = tf.scalar(1) //1
        return f1.add(f2).add(f3).add(x).add(f4)
    }

    function minimize(epochs, lr) {
        let y = tf.variable(tf.scalar(2)) //initial value
        const optim = tf.train.adam(lr);  //gradient descent algorithm
        for(let i = 0 ; i < epochs ; i++) //start minimization
            optim.minimize(() => f(y));
        return y
    }
    minimize(200, 0.9).data().then(minimum => log(`\nMinimum of f(x) = xˆ6 + 2xˆ4 + 3xˆ2+1 is ${minimum}`));
})();

(() => {
// Neural network for XOR

// Training set
    const xs = tf.tensor2d([[0,0],[0,1],[1,0],[1,1]])
    const ys = tf.tensor2d([[0],[1],[1],[0]])
})();

export const test = [];