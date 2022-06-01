from uvicorn import run
from pathlib import Path

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from starlette.responses import FileResponse

app = FastAPI()

current_path = Path(__file__).parent.resolve()

app.mount(
    path="/static",
    app=StaticFiles(directory=f"{current_path}/web/static"),
    name="static"
)


@app.get("/")
async def read_index():
    return FileResponse(f"{current_path}/web/index.html")


def execute(config: dict) -> None:
    run(
        app,
        host=config.get("web").get("host"),
        port=config.get("web").get("port"),
    )
