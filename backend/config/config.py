import os 
from dotenv import load_dotenv

load_dotenv()

class Settings:
    # Django configuration
    SECRET_KEY         = os.getenv("SECRET_KEY")
    DEBUG               = os.getenv("DEBUG")                        
    ALLOWED_HOSTS       = os.getenv("ALLOWED_HOSTS", "127.0.0.1").split(",")

    # Frontend hosted url
    FRONTEND_ORIGIN     = os.getenv("FRONTEND_ORIGIN", "http://localhost:5173")

    # Database configurations 
    DATABASE_NAME       = os.getenv("DB_NAME", "Qubicle")
    DATABASE_USERNAME   = os.getenv("DB_USERNAME", "postgres")
    DATABASE_PASSWORD   = os.getenv("DB_PASSWORD", "admin")
    DATABASE_HOST       = os.getenv("DB_HOST", "localhost")
    DATABASE_PORT       = os.getenv("DB_PORT", "5432")

    # Elasticsearch configuration:
    ELASTICSEARCH_HOST  = os.getenv("ELASTICSEARCH_HOST")

settings = Settings()