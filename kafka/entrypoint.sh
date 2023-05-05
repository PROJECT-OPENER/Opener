#!/bin/bash

# create-kafka-topic.sh 스크립트를 사용하여 토픽을 생성합니다.
/usr/bin/create-kafka-topic.sh member 3 2

# Kafka 컨테이너를 실행합니다.
/usr/bin/docker-entrypoint.sh kafka-server-start.sh /opt/kafka/config/server.properties