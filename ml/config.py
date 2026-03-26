# ml/config.py
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

IMG_SIZE = (224, 224)
BATCH_SIZE = 32
EPOCHS = 3

DATA_DIR = os.path.join(BASE_DIR, "data", "plantvillage dataset", "color")
MODEL_PATH = os.path.join(BASE_DIR, "models", "plant_model.h5")
