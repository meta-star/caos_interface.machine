#!/usr/bin/env python3
# -*- coding: utf-8 -*-

# caOS
# (c) 2022 SuperSonic. (https://github.com/supersonictw)

import yaml
import logging

import uvicorn

from pathlib import Path
from threading import Thread

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from starlette.responses import FileResponse

FORMAT = '%(asctime)s %(levelname)s: %(message)s'
logging.basicConfig(level=logging.DEBUG, format=FORMAT)

CONFIG_FILENAME = "data/config.yaml"
DEV_CONFIG_FILENAME = "data/config.dev.yaml"

config_filename = CONFIG_FILENAME if not Path(DEV_CONFIG_FILENAME).exists() else DEV_CONFIG_FILENAME
with open(config_filename, "r") as configfile:
    config = yaml.load(configfile, Loader=yaml.FullLoader)

if config.get("sys").get("browser"):
    from browser import browser_main

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


def main() -> None:
    uvicorn.run(
        app,
        host=config.get("web").get("host"),
        port=config.get("web").get("port"),
    )


if __name__ == "__main__":
    logging.info('caOS Start')

    if config.get("sys").get("browser"):
        browser_thread = Thread(target=browser_main)
        browser_thread.start()

    main()

    if config.get("sys").get("browser"):
        browser_thread.join()

    logging.info('caOS Stopped')
