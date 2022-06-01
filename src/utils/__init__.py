from requests import (
    get as http_get,
    ConnectionError
)
from urllib3.exceptions import MaxRetryError


def is_internet_available() -> bool:
    try:
        r = http_get('https://alwaysonline.starinc.xyz', timeout=5)
        return r.status_code == 200
    except (ConnectionError, MaxRetryError):
        return False


def is_caos_cloud_service_v1_available() -> bool:
    try:
        r = http_get('https://caos-api.startw.cf/v1', timeout=5)
        if r.status_code != 200:
            return False
        data = r.json()
        return \
            isinstance(data, dict) and \
            "status" in data and \
            data["status"] == 200
    except (ConnectionError, MaxRetryError):
        return False
