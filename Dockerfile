FROM ubuntu

# Setup a working directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

#Setup Envirnment variables
ENV DATABASE_URL "postgres://jobify:j0b1fy@localhost:5432/jobify_dev"

# Running commands to start our image
RUN \
  apt-get update && \
  apt-get install -y build-essential libssl-dev curl

#Postgres
RUN \
  apt-get install -y postgresql postgresql-common postgresql-contrib libpq-dev

#NVM
RUN \
  curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.7/install.sh | bash && \
  export NVM_DIR="/root/.nvm" && [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" && \
  nvm install v4.5.0

#PhantomJS needs this lib
RUN \
  apt-get install -y libfontconfig

ENTRYPOINT \
  service postgresql restart && \
  echo "CREATE ROLE jobify WITH PASSWORD 'j0b1fy' SUPERUSER CREATEDB CREATEROLE INHERIT LOGIN;" > /tmp/init.sql && \
  echo "CREATE DATABASE jobify_dev OWNER jobify;" >> /tmp/init.sql && \
  cat /tmp/init.sql && \
  su - postgres -c psql < /tmp/init.sql && \
  /bin/bash

EXPOSE 5000
