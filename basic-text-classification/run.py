# IMDB reviews classifier (positive/negative)
# Source: https://www.tensorflow.org/tutorials/keras/basic_text_classification
# To run this file:
# source ./bin/activate
# python run.py

import tensorflow as tf
from tensorflow import keras

import numpy as np

print(tf.__version__)

imdb = keras.datasets.imdb

(train_data, train_labels), (test_data, test_labels) = imdb.load_data(num_words=10000)

print("Training entries: {}, labels: {}".format(len(train_data), len(train_labels)))

# A dictionary mapping words to an integer index
word_index = imdb.get_word_index()

# print(word_index)
# Last entries of the word_index (to get an idea of the entries):
# u'googling': 51983, u"'intentional'": 82114, u'clyde': 8286, u'ska': 51984, u'timecrimes': 88528, u'serbo': 88529, u'ski': 16114, u'knob': 30562, u'saturation': 25238, u"andr\xe9's": 34260, u'branch': 9456, u'refusals': 54834, u'protesters': 21901, u'kristofferson': 8774, u'siemens': 51985, u'deviances': 53304, u'know': 121, u'knot': 30563, u'knox': 9311, u'\xc5ge': 59844, u'renyolds': 40817, u'iberia': 17631, u"annabelle's": 88531, u'bedfellows': 40818, u'praarthana': 88532, u'losted': 88533, u'cloistering': 70961, u'dances': 4200, u"one''willard'": 88534, u'servant': 5382, u'isolytic': 88536, u'starred': 2681, u'traitors': 27626, u'amores': 25239, u'shabby': 12257, u'sequence': 717, u"matrix'": 23376, u'birthmark': 51986, u'mosquitoes': 34696, u'libretto': 34697, u'kattan': 13418, u'holler': 34664, u'soninha': 34040, u'nilsen': 88287, u'dubbers': 88539, u'mancoy': 55997, u"gettin'": 51988, u'zanuck': 17632, u'leaded': 51989, u'strolls': 29326, u'moguls': 40820, u'catepillar': 88540, u'sette': 40821, u'leader': 2118, u'murdock': 23377, u'uneffective': 88541, u'haywood': 51990, u'miniskirts': 88542, u'pensaba': 88543, u'thoroughfare': 88544, u"o'donoghugh": 51991, u'arganauts': 76917, u'swinginest': 88545, u'hitchhiking': 30548, u'wesley': 7915, u'daud': 88546, u'guffaws': 30564, u'empahh': 88547, u'nationalities': 30565, u'throne': 8594, u'intercontenital': 88548, u'throng': 51992, u'getting': 394, u'klineschloss': 51993, u'dependence': 21902, u'dependency': 25240, u'epiphany': 19497, u'fudd': 25241, u'wonk': 76097, u'fitzgibbon': 88549, u'bugle': 27627, u'unoticeable': 88550, u'couldnt': 24879, u'gunther': 30566, u'cultureless': 57756, u"'hall": 88551, u"'dollman'": 88386, u'registration': 21903, u'madhavi': 30567, u'fired': 3426, u'patronisingly': 51994, u'maize': 88554, u'uncontrollably': 21904, u'expeditious': 88555, u'noxious': 51942, u'hypnotism': 27628, u"'half": 88556, u'lederer': 88557, u'uncontrollable': 14359, u'footwork': 34698, u"i've": 204, u'proving': 5974, u'worriedly': 42569, u'baaaaad': 40824, u'gereco': 44477, u"bearings'": 88558, u'kensit': 51997, u'wight': 88559, u'brashness': 34699, u'bratwurst': 51998, u"may's": 14128, u'contradictors': 88560, u'amitabhs': 88561, u'jaffa': 19498, u'jaffe': 11924, u'instructive': 40826, u"olan's": 88562, u'ornella': 51999, u'bitva': 57759, u'reble': 88564, u'percival': 88565, u'lubricated': 88566, u"matsumoto's": 34700, u'heralding': 88567, u'hirschbiegel': 52001, u"baywatch'": 88568, u'odilon': 88569, u'vans': 18508, u'gnawing': 40827, u"markham's": 63863, u"guard's": 88571, u"nemesis'": 88572, u'spookfest': 57761, u"'transporter'": 54907, u'airsoft': 88573, u'abhay': 11306, u'spanky': 23378, u'ev': 88575, u'chicatillo': 88576, u"dance'": 34064, u"'la": 27630, u'percent': 8925, u'oprah': 7996, u'sics': 88578, u'illinois': 11925, u'dogtown': 40828, u'roars': 20595, u'sick': 1192, u'kerouac': 52002, u'wheelers': 88579, u'sica': 20596, u'lance': 6435, u"pipe's": 88580, u'discretionary': 64179, u'contends': 40829, u'copywrite': 88581, u'geysers': 52003, u'artbox': 88582, u'cl\xe9ment': 51107, u'cronyn': 52004, u'hardboiled': 52005, u"voorhees'": 88583, u'35mm': 16815, u"'l'": 88584, u'urrrghhh': 88574, u'expands': 20597}

# The first indices are reserved
word_index = {k:(v+3) for k,v in word_index.items()}
word_index["<PAD>"] = 0
word_index["<START>"] = 1
word_index["<UNK>"] = 2  # unknown
word_index["<UNUSED>"] = 3

reverse_word_index = dict([(value, key) for (key, value) in word_index.items()])

def decode_review(text):
    return ' '.join([reverse_word_index.get(i, '?') for i in text])

my_test = decode_review(train_data[0])

# print(my_test)

train_data = keras.preprocessing.sequence.pad_sequences(train_data,
                                                        value=word_index["<PAD>"],
                                                        padding='post',
                                                        maxlen=256)

test_data = keras.preprocessing.sequence.pad_sequences(test_data,
                                                       value=word_index["<PAD>"],
                                                       padding='post',
                                                       maxlen=256)

# len(train_data[0]), len(train_data[1])

# input shape is the vocabulary count used for the movie reviews (10,000 words)
vocab_size = 10000

model = keras.Sequential()
model.add(keras.layers.Embedding(vocab_size, 16))
model.add(keras.layers.GlobalAveragePooling1D())
model.add(keras.layers.Dense(16, activation=tf.nn.relu))
model.add(keras.layers.Dense(1, activation=tf.nn.sigmoid))

model.summary()

model.compile(optimizer=tf.train.AdamOptimizer(),
              loss='binary_crossentropy',
              metrics=['accuracy'])

# what is the format of the input? the numeric representation or text?

# which one is the train data and which one is the validation data?
x_val = train_data[:10000]
partial_x_train = train_data[10000:]

y_val = train_labels[:10000]
partial_y_train = train_labels[10000:]

history = model.fit(partial_x_train,
                    partial_y_train,
                    epochs=40,
                    batch_size=512,
                    validation_data=(x_val, y_val),
                    verbose=1)

results = model.evaluate(test_data, test_labels)

print(results) # prints [loss, accuracy]

# Graph

history_dict = history.history
history_dict.keys()

import matplotlib.pyplot as plt

acc = history.history['acc']
val_acc = history.history['val_acc']
loss = history.history['loss']
val_loss = history.history['val_loss']

epochs = range(1, len(acc) + 1)

# Loss graph

# "bo" is for "blue dot"
plt.plot(epochs, loss, 'bo', label='Training loss')
# b is for "solid blue line"
plt.plot(epochs, val_loss, 'b', label='Validation loss')
plt.title('Training and validation loss')
plt.xlabel('Epochs')
plt.ylabel('Loss')
plt.legend()

plt.show()

# Accuracy graph

plt.clf()   # clear figure
acc_values = history_dict['acc']
val_acc_values = history_dict['val_acc']

plt.plot(epochs, acc, 'bo', label='Training acc')
plt.plot(epochs, val_acc, 'b', label='Validation acc')
plt.title('Training and validation accuracy')
plt.xlabel('Epochs')
plt.ylabel('Accuracy')
plt.legend()

plt.show()
