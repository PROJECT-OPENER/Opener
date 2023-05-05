#!/bin/bash

# kafka 토픽 생성
/opt/kafka/bin/kafka-topics.sh \
  --create \
  --topic "$1" \
  --bootstrap-server k8c104.p.ssafy.io:9092 \
  --partitions "${2:-1}"
  --if-not-exists