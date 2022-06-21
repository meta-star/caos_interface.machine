from cachetools import cached, TTLCache
from requests import (
    get as http_get,
    ConnectionError
)
from urllib3.exceptions import MaxRetryError


@cached(cache=TTLCache(maxsize=1024, ttl=10))
def is_internet_available() -> bool:
    try:
        r = http_get('https://alwaysonline.starinc.xyz', timeout=5)
        return r.status_code == 200
    except (ConnectionError, MaxRetryError):
        return False
