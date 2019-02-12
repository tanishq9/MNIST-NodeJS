import sys
from keras.models import load_model
from keras.preprocessing import image

def predict():
    #print(sys.path)
    #print("Process started")
    new_model = load_model('mnist_model_keras_collab.h5')
    #print('model_loaded')
    img = image.load_img(path='input.png',color_mode="grayscale",target_size=(28,28,1))
    #print('image_loaded')
    img = image.img_to_array(img)
    #print('running_inference')
    output = new_model.predict(img.reshape(1,28,28,1)) # To do it for a new data point
    #print('Got the result !')
    output.argmax()
    print(output.argmax())

if __name__ == "__main__":
    predict()