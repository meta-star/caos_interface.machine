#!/usr/bin/env python3
# caOS
# (c) 2022 SuperSonic. (https://github.com/supersonictw)

import yaml

import uvicorn

from pathlib import Path

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from starlette.responses import FileResponse

with open("data/config.yaml", "r") as configfile:
    config = yaml.load(configfile, Loader=yaml.FullLoader)

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


if __name__ == "__main__":
    uvicorn.run(
        app,
        host=config.get("web").get("host"),
        port=config.get("web").get("port"),
    )
