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

from browser import browser_main

FORMAT = '%(asctime)s %(levelname)s: %(message)s'
logging.basicConfig(level=logging.DEBUG, format=FORMAT)

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


def main() -> None:
    uvicorn.run(
        app,
        host=config.get("web").get("host"),
        port=config.get("web").get("port"),
    )


if __name__ == "__main__":
    logging.info('caOS Start')

    browser_thread = Thread(target=browser_main)
    browser_thread.start()
    main()
    browser_thread.join()

    logging.info('caOS Stopped')
