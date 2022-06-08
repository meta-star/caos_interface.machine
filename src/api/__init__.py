from pathlib import Path

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from starlette.responses import FileResponse
from uvicorn import run

from ..utils.caos_v1 import (
    get,
    get_force,
    post,
    put,
    delete,
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
            "humidity": data[0],
            "temperature": data[1],
        }
    }


@app.get("/automate/devices")
async def read_automate_devices():
    return get_force(
        "automate/devices",
        web_state.get("ctx").get("cloud_token").get("secret")
    )


@app.post("/automate/device")
async def add_automate_device(machine_id: str, assign_code: int):
    return post(
        "automate/device",
        {
            "machine_id": machine_id,
            "assign_code": assign_code
        },
        web_state.get("ctx").get("cloud_token").get("secret")
    )


@app.get("/automate/device/{device_id}")
async def read_automate_device(device_id: str):
    return get_force(
        f"automate/device/{device_id}",
        web_state.get("ctx").get("cloud_token").get("secret")
    )


@app.put("/automate/device/{device_id}")
async def update_automate_device(device_id: str, state: bool):
    return put(
        f"automate/device/{device_id}",
        {"message": "ON" if state else "OFF"},
        web_state.get("ctx").get("cloud_token").get("secret")
    )


@app.delete("/automate/device/{device_id}")
async def remove_automate_device(device_id: str):
    return delete(
        f"automate/device/{device_id}",
        web_state.get("ctx").get("cloud_token").get("secret")
    )


def execute(ctx: dict) -> None:
    web_state["ctx"] = ctx
    web_config = ctx.get("config").get("web")
    run(
        app,
        host=web_config.get("host"),
        port=web_config.get("port"),
    )
