import uvicorn as uvicorn

from modelinit import *
import warnings
warnings.filterwarnings("ignore")

from fastapi import FastAPI

app = FastAPI()


@app.get("/get_prediction")
def main():
    model_file= 'model.pth'
    pretrained_model = ModelInit(model_file, 'cpu')

    pred = pretrained_model.predict("D:/new_disorder_speeches_over_2000/Speeches/39.1.wav")
    print(pred)
    return pred

if __name__ == '__main__':
    uvicorn.run(app, host="127.0.0.1", port=8000)
