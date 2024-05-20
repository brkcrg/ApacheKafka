const {Kafka} =require("kafkajs");
require('dotenv').config(); // dotenv modülünü yükleyin ve .env dosyasındaki değerleri yükleyin

const dbHost = process.env.HOST;
const broker =`${dbHost}:9092`;
createTopic();

async function createTopic() {
   try {
         //Admin Stuff
    const kafka = new Kafka({
        clientId:"Kafka_log_store_client",
        brokers:[broker]
    })

    const admin = kafka.admin();
    console.log("Kafka Broker'a bağlanıyor...");
    await admin.connect();
    console.log("Kafka Broker'a bağlantı başarılı,Topic üretilecek");
    await admin.createTopics({
        topics:[
            {
                topic:"LogStoreTopic",
                numPartitions:2
            }
        ]
    });
    console.log("Topic başarılı bir şekilde oluşturulmuştur..");
    await admin.disconnect();
   } catch (error) {
        console.log("bir hata oluştu",error)
   }
   finally{
    process.exit(0);
   }
}