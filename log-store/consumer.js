const {Kafka} =require("kafkajs");
require('dotenv').config(); // dotenv modülünü yükleyin ve .env dosyasındaki değerleri yükleyin

const dbHost = process.env.HOST;
const broker =`${dbHost}:9092`;


createConsumer();

async function createConsumer() {
   try {
    const kafka = new Kafka({
        clientId:"Kafka_log_store_client",
        brokers:[broker]
    })

    const consumer = kafka.consumer({
        groupId:"log_store_consumer_group"
    });
    console.log("Consumera bağlanıyor...");
    await consumer.connect();
    console.log("Bağlantı başarılı");
   
    //Consumer subscribe...
    await consumer.subscribe({
        topic:"LogStoreTopic",
        fromBeginning:"true" //başlangıçtan başla

    });

    await consumer.run({
        eachMessage: async result =>{
            console.log(`${result.message.value}: Partition : => ${result.partition}`)//producer içerisindeki mesajı alıyoruz
        }
    });
   } catch (error) {
        console.log("bir hata oluştu",error)
   }
   
}