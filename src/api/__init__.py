from pathlib import Path

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from starlette.responses import FileResponse
from uvicorn import run

from ..utils.caos_v1 import (
    get
)
from ..socket import (
    read
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
    return web_state


@app.get("/weather")
async def read_weather():
    data = next(read(web_state.get("ctx").get("config").get("socket")))
    return {
        "online": get("weather/ip"),
        "offline": {
            "temperature": data[0],
            "humidity": data[1],
        }
    }


def execute(ctx: dict) -> None:
    web_state["ctx"] = ctx
    web_config = ctx.get("config").get("web")
    run(
        app,
        host=web_config.get("host"),
        port=web_config.get("port"),
    )
