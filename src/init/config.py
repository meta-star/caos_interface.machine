import yaml

from pathlib import Path

CONFIG_FILENAME = "default.yaml"
DEV_CONFIG_FILENAME = "data/config.dev.yaml"

config_filename = CONFIG_FILENAME if not Path(DEV_CONFIG_FILENAME).exists() else DEV_CONFIG_FILENAME
with open(config_filename, "r") as config_file:
    config = yaml.load(config_file, Loader=yaml.FullLoader)
