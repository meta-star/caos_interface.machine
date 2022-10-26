#!/bin/bash

# This script is used to bootstrap a development environment
# for the project. It is not intended to be used in production.

# This script is intended to be run on a PC running Debian Linux.
# It is not intended to be run on any other platform/distribution.

# This script is intended to be run as root. It will not work
# if run as a regular user.

# This script is intended to be run from the root of the project
# directory. It will not work if run from any other directory.

# Check platform/distribution
if [ ! -f /etc/debian_version ]; then
    echo "This script is intended to be run on a PC running Debian Linux."
    echo "It is not intended to be run on any other platform/distribution."
    exit 1
fi

# Check EUID and auto SUDO if not root
SUDO=""
if [ "$EUID" -ne 0 ]; then
    SUDO="sudo"
fi

# Install dependencies
$SUDO apt-get update

# Install Node.js 16.x from NodeSource
curl -fsSL https://deb.nodesource.com/setup_16.x | $SUDO -E bash -
$SUDO apt-get install -y nodejs

# Install for node-gtk
$SUDO apt-get install -y libgtk-3-dev libwebkit2gtk-4.0-dev

# Success
echo "Development environment bootstrapped successfully."
