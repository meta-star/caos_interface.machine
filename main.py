#!/usr/bin/env python3
# -*- coding: utf-8 -*-

# caOS
# (c) 2022 SuperSonic. (https://github.com/supersonictw)

import logging

from threading import Thread

from src.init.config import config
from src.init.cloud_token import cloud_token

from src.api import execute

FORMAT = '%(asctime)s %(levelname)s: %(message)s'
logging.basicConfig(level=logging.DEBUG, format=FORMAT)

if config.get("sys").get("browser"):
    from src.browser import browser_main

if __name__ == "__main__":
    logging.info('caOS Start')

    ctx = {
        "config": config,
        "cloud_token": cloud_token
    }

    browser_thread = None
    if config.get("sys").get("browser"):
        browser_thread = Thread(target=browser_main)
        browser_thread.start()

    execute(ctx)

    if browser_thread and config.get("sys").get("browser"):
        browser_thread.join()

    logging.info('caOS Stopped')
