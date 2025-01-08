import uvicorn
from modelinit import *
import warnings
from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from pydub import AudioSegment
from pydub.utils import mediainfo
import os
from io import BytesIO
from fastapi.middleware.cors import CORSMiddleware

warnings.filterwarnings("ignore")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/get_prediction")
async def main(file: UploadFile = File(...)):
    """
    Accept a file (blob), process it using librosa, and return the prediction.
    """
    try:
        save_directory = "uploaded_files"
        os.makedirs(save_directory, exist_ok=True)
        file_path = os.path.join(save_directory, file.filename)
        
        # Save the uploaded file
        with open(file_path, "wb") as f:
            f.write(await file.read())

        # Convert .webm to .wav if necessary
        if file_path.endswith(".webm"):
            wav_path = os.path.splitext(file_path)[0] + ".wav"
            audio = AudioSegment.from_file(file_path)
            audio.export(wav_path, format="wav")
            file_path = wav_path  # Update file path to .wav

        # Load the model and make predictions
        model_file = "model.pth"
        pretrained_model = ModelInit(model_file, "cpu")
        pred = pretrained_model.predict(file_path)

        return JSONResponse(content={"prediction": pred})
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)

if __name__ == '__main__':
    uvicorn.run(app, host="0.0.0.0", port=8000)
