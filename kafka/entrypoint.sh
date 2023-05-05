#!/bin/bash

# Kafka 컨테이너를 실행합니다.
/opt/kafka/bin/kafka-server-start.sh /opt/kafka/config/server.properties

# create-kafka-topic.sh 스크립트를 사용하여 토픽을 생성합니다.
/usr/bin/create-kafka-topic.sh member_topic 3 2