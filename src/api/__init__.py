from pathlib import Path

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from starlette.responses import FileResponse
from uvicorn import run

from ..utils.caos_v1 import (
    get
)
from ..sensors import dht_22

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
    dht_22_result = dht_22.get_data(
        web_state.get("ctx").get("config").get("sensor").get("dht_22")
    )
    return {
        "online": get("weather/ip"),
        "offline": {
            "temperature": dht_22_result[0],
            "humidity": dht_22_result[1]
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
