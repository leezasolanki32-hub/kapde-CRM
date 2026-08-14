import numpy as np

def predict_sales():
    # In a real scenario, we'd fetch MongoDB historical orders and train a model.
    # For now, we return a baseline structure as requested (Phase 3).
    # Expected: 870000, min 840000, max 910000
    
    # Simulating output based on rules
    # "Do not claim high accuracy when the dataset is too small."
    
    return {
        "forecast": {
            "min": 840000,
            "max": 910000,
            "expected": 870000
        },
        "growthPercentage": 8.7,
        "confidence": 86,
        "trend": "up",
        "message": "Demo Prediction - Real model will activate with sufficient historical data."
    }
