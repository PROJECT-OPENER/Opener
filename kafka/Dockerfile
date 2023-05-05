FROM kafka:latest

# create-kafka-topic.sh 파일 복사
COPY create-kafka-topic.sh /usr/bin/

# 쉘 스크립트 실행 권한 부여
RUN chmod +x /usr/bin/create-kafka-topic.sh

# entrypoint.sh 파일 복사
COPY entrypoint.sh /usr/bin/

# 쉘 스크립트 실행 권한 부여
RUN chmod +x /usr/bin/entrypoint.sh

# entrypoint.sh를 ENTRYPOINT로 지정
ENTRYPOINT ["/usr/bin/entrypoint.sh"]