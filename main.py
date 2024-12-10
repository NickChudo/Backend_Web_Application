# import uvicorn as uvicorn
#
# from modelinit import *
# import warnings
# warnings.filterwarnings("ignore")
#
# from fastapi import FastAPI
#
# app = FastAPI()
#
#
# @app.get("/get_prediction")
# def main():
#     model_file= 'model.pth'
#     pretrained_model = ModelInit(model_file, 'cpu')
#
#     pred = pretrained_model.predict("E:/Speeches/Speeches/39.1.wav")
#     print(pred)
#     return pred
#
# if __name__ == '__main__':
#     uvicorn.run(app, host="0.0.0.0", port=8000)
#

import uvicorn
from modelinit import *
import warnings
from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from pydub import AudioSegment
from pydub.utils import mediainfo
import os
from io import BytesIO

warnings.filterwarnings("ignore")

app = FastAPI()

@app.post("/get_prediction")
async def main(file: UploadFile = File(...)):
    try:
        file_content = await file.read()

        audio = AudioSegment.from_file(BytesIO(file_content))

        wav_file_path = f"temp_{file.filename.split('.')[0]}.wav"
        audio.export(wav_file_path, format="wav")

        model_file = 'model.pth'
        pretrained_model = ModelInit(model_file, 'cpu')
        pred = pretrained_model.predict(wav_file_path)
        os.remove(wav_file_path)

        return JSONResponse(content={"prediction": pred})
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)


if __name__ == '__main__':
    uvicorn.run(app, host="0.0.0.0", port=8000)
