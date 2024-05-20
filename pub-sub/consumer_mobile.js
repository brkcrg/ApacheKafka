const {Kafka} =require("kafkajs");
require('dotenv').config(); // dotenv modülünü yükleyin ve .env dosyasındaki değerleri yükleyin

const dbHost = process.env.HOST;
const broker =`${dbHost}:9092`;


createConsumer();

async function createConsumer() {
   try {
    const kafka = new Kafka({
        clientId:"Kafka_pub_sub_client",
        brokers:[broker]
    })

    const consumer = kafka.consumer({
        groupId:"mobile_encoder_consumer_group"
    });
    console.log("Consumera bağlanıyor...");
    await consumer.connect();
    console.log("Bağlantı başarılı");
   
    //Consumer subscribe...
    await consumer.subscribe({
        topic:"raw_video_topic",
        fromBeginning:"true" //başlangıçtan başla

    });

    await consumer.run({
        eachMessage: async result =>{
            console.log(`İşlenen Video:${result.message.value}_mobile_encoder`);
        }
    });
   } catch (error) {
        console.log("bir hata oluştu",error)
   }
   
}