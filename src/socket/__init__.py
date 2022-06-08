import socket

from os.path import exists
from json import loads
from typing import Generator


def read(socket_config: dict) -> Generator[list, None, None]:
    if not exists(socket_config.get("address")):
        yield [-1, -1]
    sock = socket.socket(socket.AF_UNIX, socket.SOCK_STREAM)
    sock.connect(socket_config.get("address"))
    while data := sock.recv(100):
        if len(data) != 0:
            yield loads(data.decode("utf-8"))
    sock.close()
