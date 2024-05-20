const {Kafka} =require("kafkajs");
require('dotenv').config(); // dotenv modülünü yükleyin ve .env dosyasındaki değerleri yükleyin


const dbHost = process.env.HOST;
const broker =`${dbHost}:9092`;



createProducer();

async function createProducer() {
   try {
    const kafka = new Kafka({
        clientId:"Kafka_pub_sub_client",
        brokers:[broker]
    })

    const producer = kafka.producer();
    console.log("Producera bağlanıyor...");
    await producer.connect();
    console.log("Bağlantı başarılı");

    

    const message_result = await producer.send({
        topic:"raw_video_topic",
        messages:[
            {
                value:"Yeni bir video içeriği üretildi...",
                partition:0
            }
        ]

    });
console.log("Gönderim işlemi başarılıdır..",JSON.stringify(message_result));
producer.disconnect();
   } catch (error) {
        console.log("bir hata oluştu",error)
   }
   finally{
    process.exit(0);
   }
}