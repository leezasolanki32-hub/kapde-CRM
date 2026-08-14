import os
from dotenv import load_dotenv

load_dotenv()

MONGODB_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/kaapde")
PORT = int(os.getenv("PORT", 8000))
