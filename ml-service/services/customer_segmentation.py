import pandas as pd
import numpy as np
import os
import joblib
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler

DATA_PATH = os.path.join(os.path.dirname(__file__), '..', 'data', 'marketing_campaign.csv')
MODEL_DIR = os.path.join(os.path.dirname(__file__), '..', 'models')
MODEL_PATH = os.path.join(MODEL_DIR, 'kmeans_model.pkl')
SCALER_PATH = os.path.join(MODEL_DIR, 'scaler.pkl')
STATS_PATH = os.path.join(MODEL_DIR, 'cluster_stats.pkl')

def train_segmentation_model():
    """Reads the CSV, processes RFM, trains KMeans, and saves the models."""
    if not os.path.exists(DATA_PATH):
        raise FileNotFoundError(f"Dataset not found at {DATA_PATH}")
        
    os.makedirs(MODEL_DIR, exist_ok=True)
    
    # Read data (tab separated)
    df = pd.read_csv(DATA_PATH, sep='\t')
    
    # Drop rows with missing values in Income
    df = df.dropna(subset=['Income'])
    
    # Calculate RFM Features
    # Recency: Already exists
    # Frequency: Total purchases
    df['Frequency'] = df['NumWebPurchases'] + df['NumCatalogPurchases'] + df['NumStorePurchases']
    # Monetary: Total spent
    df['Monetary'] = df['MntWines'] + df['MntFruits'] + df['MntMeatProducts'] + df['MntFishProducts'] + df['MntSweetProducts'] + df['MntGoldProds']
    
    # Select features for clustering
    features = ['Recency', 'Frequency', 'Monetary']
    X = df[features]
    
    # Scale features
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)
    
    # Train KMeans (3 clusters: VIP, Regular, At-Risk)
    kmeans = KMeans(n_clusters=3, random_state=42, n_init=10)
    df['Cluster'] = kmeans.fit_predict(X_scaled)
    
    # Identify cluster meanings based on Monetary average
    cluster_centers = pd.DataFrame(scaler.inverse_transform(kmeans.cluster_centers_), columns=features)
    cluster_centers['Cluster'] = range(3)
    
    # Sort by Monetary to define High (VIP), Medium (Regular), Low (At-Risk)
    cluster_centers = cluster_centers.sort_values(by='Monetary', ascending=False)
    
    vip_cluster = cluster_centers.iloc[0]['Cluster']
    regular_cluster = cluster_centers.iloc[1]['Cluster']
    at_risk_cluster = cluster_centers.iloc[2]['Cluster']
    
    # Calculate stats
    stats = {
        'total_customers': len(df),
        'vip_count': int((df['Cluster'] == vip_cluster).sum()),
        'regular_count': int((df['Cluster'] == regular_cluster).sum()),
        'at_risk_count': int((df['Cluster'] == at_risk_cluster).sum()),
        'vip_avg_spent': float(df[df['Cluster'] == vip_cluster]['Monetary'].mean()),
        'at_risk_avg_recency': float(df[df['Cluster'] == at_risk_cluster]['Recency'].mean())
    }
    
    # Save artifacts
    joblib.dump(kmeans, MODEL_PATH)
    joblib.dump(scaler, SCALER_PATH)
    joblib.dump(stats, STATS_PATH)
    
    print("Training complete! Model and stats saved.")
    return stats

def get_segmentation_stats():
    """Returns the cluster stats if available, otherwise trains the model."""
    if os.path.exists(STATS_PATH):
        return joblib.load(STATS_PATH)
    else:
        return train_segmentation_model()

if __name__ == "__main__":
    train_segmentation_model()
