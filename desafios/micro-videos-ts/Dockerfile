# imagem baseada no debian, slim ou alpine
FROM node:14.15.4-slim

RUN mkdir -p /usr/share/man/man1 && \
    echo 'deb http://ftp.debian.org/debian stretch-backports main' | tee /etc/apt/sources.list.d/stretch-backports.list && \
    apt update && apt install -y \
    git \
    ca-certificates \
    openjdk-11-jre \
    curl \
    wget 

ENV JAVA_HOME="/usr/lib/jvm/java-11-openjdk-amd64"

# usuario padrão do container - root
# mudando para outro usuário
# echo $UID
USER node

WORKDIR /home/node/app

# prender o container em execução
CMD ["sh","-c","npm install && tail -f /dev/null"]
