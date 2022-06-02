from pathlib import Path

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from starlette.responses import FileResponse
from uvicorn import run

from ..utils import (
    is_internet_available,
    is_caos_cloud_service_v1_available
)

app = FastAPI()
web_state = {}

current_path = Path(__file__).parent.resolve()

app.mount(
    path="/static",
    app=StaticFiles(directory=f"{current_path}/../../web/static"),
    name="static"
)


@app.get("/")
async def read_index():
    return FileResponse(f"{current_path}/../../web/index.html")


@app.get("/state")
async def read_state():
    web_state["internet_available"] = is_internet_available()
    web_state["cloud_available"] = is_caos_cloud_service_v1_available()
    return web_state


def execute(ctx: dict) -> None:
    web_state["ctx"] = ctx
    web_config = ctx.get("config").get("web")
    run(
        app,
        host=web_config.get("host"),
        port=web_config.get("port"),
    )
