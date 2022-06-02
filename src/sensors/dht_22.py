from typing import List

try:
    import Adafruit_DHT
except ModuleNotFoundError:
    Adafruit_DHT = None


def get_data(ctx: dict) -> List[int]:
    if Adafruit_DHT is None:
        return [-1, -1]
    pin = ctx.get("sensor").get("dht_22").get("pin")
    return Adafruit_DHT.read_retry(Adafruit_DHT.DHT22, pin)
