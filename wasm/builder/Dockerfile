FROM node:20

WORKDIR /

# Install python, ninja and cmake
RUN apt-get update && apt-get install -y python3 git ninja-build
ADD cmake.sh /
RUN ./cmake.sh && rm cmake.sh


# Install emsdk
RUN git config --global init.defaultBranch main
RUN git clone https://github.com/emscripten-core/emsdk.git
WORKDIR /emsdk
ENV EMSDK_VERSION=3.1.14
ENV EMSCRIPTEN=/emsdk/upstream/emscripten
RUN ./emsdk install "$EMSDK_VERSION" && ./emsdk activate "$EMSDK_VERSION"

WORKDIR /wasm

ENTRYPOINT [ "/bin/sh", "build.sh" ]