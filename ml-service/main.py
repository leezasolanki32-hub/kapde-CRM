from fastapi import FastAPI, Body
from fastapi.middleware.cors import CORSMiddleware
from services.sales_forecasting import predict_sales
from services.product_forecast import predict_product_demand
from services.lead_scoring import score_lead
from services.customer_segmentation import get_segmentation_stats

app = FastAPI(title="Kaapde AI Service")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Kaapde AI Service is running!"}

@app.post("/predict-sales")
def get_sales_forecast():
    # In production, this would securely fetch data or take historical sales as input
    return predict_sales()

@app.post("/predict-product-demand")
def get_product_forecast():
    return predict_product_demand()

@app.post("/score-lead")
def api_score_lead(lead_data: dict = Body(...)):
    return score_lead(lead_data)

@app.get("/customer-segments")
def api_customer_segments():
    try:
        stats = get_segmentation_stats()
        return stats
    except Exception as e:
        return {"error": str(e)}

if __name__ == "__main__":
    import uvicorn
    import config
    uvicorn.run(app, host="0.0.0.0", port=config.PORT)
