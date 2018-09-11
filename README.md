# Basics

To run the first tutorials from "https://medium.com/tensorflow/a-gentle-introduction-to-tensorflow-js-dba2e5257702":

* nvm use
* http-server
* open http://localhost:8080/examples/viaNpm.html

# XOR

To run the tutorial "simple neural network" for XOR from "https://medium.com/tensorflow/a-gentle-introduction-to-tensorflow-js-dba2e5257702":

* nvm use
* node examples/simpleNeuralNetwork.js

## Results for XOR

Tensor
    [[0.496942 ],
     [0.5540932],
     [0.3484011],
     [0.4005997]]
Duration of fitting2 for 2 epochs: 373ms
Tensor
    [[0.4714509],
     [0.6300936],
     [0.4942772],
     [0.6469296]]
Duration of fitting20 for 20 epochs: 3011ms
Tensor
    [[0.4929234],
     [0.5172341],
     [0.513193 ],
     [0.4820845]]
Duration of fitting50 for 50 epochs: 7969ms
Tensor
    [[0.5441408],
     [0.4532681],
     [0.5565701],
     [0.4678976]]
Duration of fitting200 for 200 epochs: 68880ms
Tensor
    [[0.0317464],
     [0.9274504],
     [0.9193957],
     [0.102644 ]]
Duration of fitting2000 for 2000 epochs: 904853ms
Tensor
    [[0.0089872],
     [0.9860799],
     [0.9856966],
     [0.0176631]]
Duration of fitting5000 for 5000 epochs: 1696989ms

# CNN


# Text classification

* Try to run this (Python): https://www.tensorflow.org/tutorials/keras/basic_text_classification
    * https://www.tensorflow.org/install/install_mac
    * virtualenv --system-site-packages basic-text-classification
    * cd basic-text-classification
    * source ./bin/activate
    * pip install --upgrade tensorflow
    * https://www.tensorflow.org/install/install_mac#run_a_short_tensorflow_program
    * run a small program: `python`
        # Python
        import tensorflow as tf
        hello = tf.constant('Hello, TensorFlow!')
        sess = tf.Session()
        print(sess.run(hello))
    * run (in the same shell) the saved script:
        * cd basic-text-classification
        * source ./bin/activate
        * python run.py
    * TODO run a test against the trained model as a final step in the Python script


* Try to run this (Python): Adversarial Text Classification  https://github.com/tensorflow/models/tree/master/research/adversarial_text
    * cd ~/Document/Projects/ING/models/research/adversarial_text
    * follow readme
    * wget http://ai.stanford.edu/~amaas/data/sentiment/aclImdb_v1.tar.gz \
          -O /tmp/imdb.tar.gz
    * tar -xf /tmp/imdb.tar.gz -C /tmp
* Try to export the model
* Try to import the model in TensorflowJS

* Tensorflow pretrained models https://github.com/tensorflow/tfjs-models/tree/master/object-detection
* https://www.tensorflow.org/guide/premade_estimators
* https://www.tensorflow.org/hub/tutorials/text_classification_with_tf_hub
* Text Classification with Sentence Level Convolutional Neural Networks https://github.com/dust0x/glove-text-cnn
* Library for efficient text classification and representation learning https://fasttext.cc/
* using pretrained Keras models in tensorflowjs (other than the image recognition example) https://js.tensorflow.org/tutorials/import-keras.html
* Use parcel for module bundling
* Research running part of the network in a web worker


