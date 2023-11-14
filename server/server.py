import json
from fastapi import FastAPI



app = FastAPI()

PATH = "./data.json"

def read_data(path):
    with open(path, 'r') as file:
        data = json.load(file)
    
    return data


data = read_data(path=PATH)

@app.get("/")
def welcome():
    return {
        "status": "SUCCESS",
        "message": "Hello World"
    }

@app.get("/api/v1/movies")
def get_movies(start: int=0, limit: int= 10):
    if start >= limit:
        return {
            "status": "ERROR",
            "message": "start can't be equal or greater than limit"
        }
    return {
        "status": "success",
        "data": data[start:limit]   
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("server:app", host="0.0.0.0", port=8000, reload=True)