from pathlib import Path

import yaml

DEFAULT_CONFIG_FILENAME = "default.yaml"
CONFIG_FILENAME = "data/config.yaml"

config_filename = DEFAULT_CONFIG_FILENAME if not Path(CONFIG_FILENAME).exists() else CONFIG_FILENAME
with open(config_filename, "r") as config_file:
    config = yaml.load(config_file, Loader=yaml.FullLoader)
