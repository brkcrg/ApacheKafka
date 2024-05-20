const {Kafka} =require("kafkajs");
require('dotenv').config(); // dotenv modülünü yükleyin ve .env dosyasındaki değerleri yükleyin
const system_data =require("./system_logs.json");


const dbHost = process.env.HOST;
const broker =`${dbHost}:9092`;



createProducer();

async function createProducer() {
   try {
    const kafka = new Kafka({
        clientId:"Kafka_log_store_client",
        brokers:[broker]
    })

    const producer = kafka.producer();
    console.log("Producera bağlanıyor...");
    await producer.connect();
    console.log("Bağlantı başarılı");

    let messages =system_data.map(item =>{
        return{
            value:JSON.stringify(item),
            partition:item.type=="system" ? 0 :1
        };
    });

    const message_result = await producer.send({
        topic:"LogStoreTopic",
        messages:messages

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