const {Kafka} =require("kafkajs");
require('dotenv').config(); // dotenv modülünü yükleyin ve .env dosyasındaki değerleri yükleyin

const dbHost = process.env.HOST;
const broker =`${dbHost}:9092`;

const topic_name = process.argv[2] || "Logs2";
const partition = process.argv[3] || 0;


createProducer();

async function createProducer() {
   try {
    const kafka = new Kafka({
        clientId:"Kafka_example_1",
        brokers:[broker]
    })

    const producer = kafka.producer();
    console.log("Producera bağlanıyor...");
    await producer.connect();
    console.log("Bağlantı başarılı");
   
    const message_result = await producer.send({
        topic:topic_name,
        messages:[
            {
                value:"Bu bir test log mesajıdır..",
                partition:partition
            }
        ]

    })
console.log("Gönderim işlemi başarılıdır..",JSON.stringify(message_result));
producer.disconnect();
   } catch (error) {
        console.log("bir hata oluştu",error)
   }
   finally{
    process.exit(0);
   }
}