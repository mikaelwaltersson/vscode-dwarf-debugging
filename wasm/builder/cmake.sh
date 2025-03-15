#!/bin/sh -e

ARCH="$(arch | sed s/arm64/aarch64/)"
VERSION="3.23.5"

CMAKE_DIST_FILE="cmake-${VERSION}-linux-${ARCH}.tar.gz"
CMAKE_DIST_URL="https://github.com/Kitware/CMake/releases/download/v${VERSION}/${CMAKE_DIST_FILE}"

wget "$CMAKE_DIST_URL"
tar --strip-components=1 -xf "$CMAKE_DIST_FILE" -C /usr
rm "$CMAKE_DIST_FILE"

cmake --version | grep "$VERSION"
