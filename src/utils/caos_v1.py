from functools import wraps
from cachetools import cached, TTLCache
from requests import (
    get as http_get,
    post as http_post,
    ConnectionError
)
from os.path import join
from urllib3.exceptions import MaxRetryError
from typing import Union

_BASE_URL = "https://caos-api.startw.cf/v1"


def _available(function):
    """
    To wrap a function for preventing to disconnect from the database
    """

    @wraps(function)
    def wrapper(*args, **kwargs):
        if not is_available():
            return None
        return function(*args)

    return wrapper


def _get_general_args(path: str, secret: str):
    return {
        "url": join(_BASE_URL, path),
        "timeout": 5,
        "headers": {
            "Authorization": secret
        }
    }


@cached(cache=TTLCache(maxsize=10, ttl=10))
def is_available() -> bool:
    try:
        r = http_get(**_get_general_args("", ""))
        if r.status_code != 200:
            return False
        data = r.json()
        return \
            isinstance(data, dict) and \
            "status" in data and \
            data["status"] == 200
    except (ConnectionError, MaxRetryError):
        return False


@_available
@cached(cache=TTLCache(maxsize=10, ttl=10))
def get(path: str) -> Union[dict, None]:
    return get_force(path)


@_available
def get_force(path: str, secret: str = "") -> Union[dict, None]:
    r = http_get(**_get_general_args(path, secret))
    if r.status_code != 200:
        return None
    return r.json()


@_available
def post(path: str, data: any, secret: str = "") -> Union[dict, None]:
    r = http_post(data=data, **_get_general_args(path, secret))
    if r.status_code != 200:
        return None
    return r.json()
