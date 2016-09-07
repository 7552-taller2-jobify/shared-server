FROM ubuntu

# Setup a working directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Running commands to start our image
RUN \
  apt-get update && \
  apt-get install -y build-essential libssl-dev curl && \
  apt-get install -y postgresql postgresql-common postgresql-contrib libpq-dev && \
  curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.7/install.sh | bash && \
  export NVM_DIR="/root/.nvm" && [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" && \
  nvm install v4.5.0
