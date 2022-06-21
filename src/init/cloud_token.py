import json
import requests

from pathlib import Path

CLOUD_TOKEN_FILENAME = "data/cloud_token.json"

if not Path(CLOUD_TOKEN_FILENAME).exists():
    token_downloaded = requests.get("https://caos-api.startw.cf/v1/machine/register")
    with open(CLOUD_TOKEN_FILENAME, "w") as token_file:
        token_file.write(token_downloaded.text)
    cloud_token = token_downloaded.json()
else:
    with open(CLOUD_TOKEN_FILENAME, "r") as token_file:
        cloud_token = json.load(token_file)
