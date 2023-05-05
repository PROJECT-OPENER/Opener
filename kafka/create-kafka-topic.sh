#!/bin/bash

# kafka 준비될 때까지 대기
while ! nc -z k8c104.p.ssafy.io 9092; do
  sleep 1
done

# kafka 토픽 생성
/opt/kafka/bin/kafka-topics.sh \
  --create \
  --topic "$1" \
  --partitions "${2:-1}" \
  --replication-factor "${3:-1}" \
  --if-not-exists \
  --zookeeper k8c104.p.ssafy.io:2181