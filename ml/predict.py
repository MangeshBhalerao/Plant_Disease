# ml/predict.py
import os
os.environ["TF_CPP_MIN_LOG_LEVEL"] = "2"

import tensorflow as tf
import numpy as np
from PIL import Image
from config import IMG_SIZE, MODEL_PATH, DATA_DIR

# Load the trained model
print("Loading model...")

# Keras 3 compatibility fix for models trained in older versions
class PatchedDense(tf.keras.layers.Dense):
    @classmethod
    def from_config(cls, config):
        config.pop("quantization_config", None)
        return super().from_config(config)

class PatchedConv2D(tf.keras.layers.Conv2D):
    @classmethod
    def from_config(cls, config):
        config.pop("quantization_config", None)
        return super().from_config(config)

model = tf.keras.models.load_model(
    MODEL_PATH, 
    custom_objects={'Dense': PatchedDense, 'Conv2D': PatchedConv2D}
)
print("Model loaded successfully!")

# Get class names (from the dataset)
if os.path.exists(DATA_DIR):
    temp_ds = tf.keras.preprocessing.image_dataset_from_directory(
        DATA_DIR,
        image_size=IMG_SIZE,
        batch_size=1,
        shuffle=False
    )
    class_names = temp_ds.class_names
    print(f"\nModel can identify {len(class_names)} plant conditions")
else:
    print(f"\nWarning: Dataset not found at {DATA_DIR}. Class names fallback disabled.")
    # Fallback if dataset isn't loaded on this computer
    class_names = ["Unknown___Unknown"] * 38 

def predict_image(image_path):
    """Predict disease from an image"""
    # Load and preprocess image
    img = Image.open(image_path).convert('RGB')
    img = img.resize(IMG_SIZE)
    img_array = np.array(img) / 255.0  # Normalize to [0,1]
    img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension
    
    # Make prediction
    predictions = model.predict(img_array, verbose=0)
    predicted_class = np.argmax(predictions[0])
    confidence = predictions[0][predicted_class] * 100
    
    # Format result
    disease_name = class_names[predicted_class]
    if "___" in disease_name:
        plant, condition = disease_name.split("___")
    else:
        plant, condition = "Unknown", disease_name
    
    print(f"\n{'='*60}")
    print(f"🌱 Plant: {plant.replace('_', ' ')}")
    print(f"🔬 Condition: {condition.replace('_', ' ')}")
    print(f"📊 Confidence: {confidence:.2f}%")
    print(f"{'='*60}")
    
    return disease_name, confidence

# Example usage
if __name__ == "__main__":
    import sys
    
    if len(sys.argv) > 1:
        # If image path provided as argument
        image_path = sys.argv[1]
        predict_image(image_path)
    else:
        # Test with a random image from the dataset
        print("\nNo image provided. Testing with a sample from dataset...")
        test_image = os.path.join(DATA_DIR, "Tomato___Early_blight", "0012b9d2-2130-4a06-a834-b1f3af34f57e___RS_Erly.B 8389.JPG")
        
        if os.path.exists(test_image):
            predict_image(test_image)
        else:
            print(f"❌ Test image not found at {test_image}. Provide an image path:")
            print("Usage: python predict.py <path_to_image>")
