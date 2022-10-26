#!/bin/ash

# This script is used to bootstrap a production environment
# for the project. It is not intended to be used in development.

# This script is intended to be run on a Raspberry Pi 3 running Alpine Linux.
# It is not intended to be run on any other platform/distribution.

# This script is intended to be run as root. It will not work
# if run as a regular user.

# This script is intended to be run from the root of the project
# directory. It will not work if run from any other directory.

# If there are any errors, exit immediately.
set -e

# Check platform/distribution
if [ ! -f /etc/alpine-release ]; then
    echo "This script is intended to be run on a Raspberry Pi 3 running Alpine Linux."
    echo "It is not intended to be run on any other platform/distribution."
    exit 1
fi

# Check SUDO command availability
if ! command -v sudo &>/dev/null; then
    echo "This script is intended to be run as root. It will not work"
    echo "if run as a regular user."
    exit 1
fi

# Check EUID and auto SUDO if not root
SUDO=""
if [ "$EUID" -ne 0 ]; then
    SUDO="sudo"
fi

# Install dependencies
$SUDO apk update

# Install Node.js 16.x
$SUDO apk add nodejs

# Install for node-gtk
$SUDO apk add gtk+3.0-dev webkit2gtk-dev

# Success
echo "Production environment bootstrapped successfully."
