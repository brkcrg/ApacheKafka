# ApacheKafka
# Zookeeper Docker ile Kurulumu

Bu belge, Docker kullanarak Zookeeper'ı başlatmanın basit adımlarını içermektedir.

## Gereksinimler

- Docker kurulu olmalıdır. Docker'ı [buradan](https://docs.docker.com/get-docker/) indirebilirsiniz.

## Kurulum Adımları

1. Docker'ı bilgisayarınıza kurun, eğer zaten kurulu değilse.
2. Terminal veya komut istemcisini açın.
3. Aşağıdaki komutu çalıştırarak Zookeeper konteynerını başlatın:

    ```bash
    docker run -d --name my_zookeeper -p 2181:2181 zookeeper
    ```

    Bu komut, Zookeeper konteynerını başlatır ve 2181 portunu dış dünyaya açar.

4. Konteynerın başarılı bir şekilde başlatıldığını kontrol etmek için aşağıdaki komutu kullanabilirsiniz:

    ```bash
    docker ps
    ```

    Çıktıda `my_zookeeper` adında bir konteynerin çalıştığını görmelisiniz.

# Kafka'nın bağlanacağı Zookeeper adresi
```bash
    ZOOKEEPER_CONNECT=my-zookeeper:2181
```
# Kafka'yı Başlatma

Kafka'yı başlatmak için aşağıdaki komutu çalıştırın:

```bash
docker run -d --name my-kafka --network $NETWORK -p 9092:9092 \
    -e KAFKA_ADVERTISED_LISTENERS=INSIDE://my-kafka:9093,OUTSIDE://localhost:9092 \
    -e KAFKA_LISTENER_SECURITY_PROTOCOL_MAP=INSIDE:PLAINTEXT,OUTSIDE:PLAINTEXT \
    -e KAFKA_LISTENERS=INSIDE://0.0.0.0:9093,OUTSIDE://0.0.0.0:9092 \
    -e KAFKA_INTER_BROKER_LISTENER_NAME=INSIDE \
    -e KAFKA_ZOOKEEPER_CONNECT=$ZOOKEEPER_CONNECT \
    wurstmeister/kafka:latest
```
# Kafka Bağımlılıklarını Yükleme

Kafka'yı Node.js uygulamalarında kullanmak için gerekli bağımlılıkları yüklemek için aşağıdaki komutu çalıştırın:

```bash
npm install kafka-node
```
# Kafka Producer ve Consumer Uygulamalarını Başlatma

Kafka Producer ve Consumer uygulamalarını başlatmak için aşağıdaki adımları izleyin.

## Producer Uygulamasını Başlatma

1. `producer.js` dosyasını başlatmak için aşağıdaki komutu çalıştırın:

```bash
node producer.js
```
## Consumer Uygulamasını Başlatma

1. `consumer.js` dosyasını başlatmak için aşağıdaki komutu çalıştırın:

```bash
node consumer.js
```
