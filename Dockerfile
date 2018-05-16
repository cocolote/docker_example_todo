FROM debian:latest
MAINTAINER Ezequiel Lopez <skiel.j.lopez@gmail.com>

RUN apt-get update && apt-get install -y curl build-essential

RUN curl -sL https://deb.nodesource.com/setup_8.x | bash - && \
apt-get install -y nodejs

COPY todoapp/todoapi /etc/todoapi

RUN cd /etc/todoapi && npm install

EXPOSE 8080

WORKDIR /etc/todoapi

CMD ["node", "/etc/todoapi/server.js"]
