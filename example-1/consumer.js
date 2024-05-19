const {Kafka} =require("kafkajs");
require('dotenv').config(); // dotenv modülünü yükleyin ve .env dosyasındaki değerleri yükleyin

const dbHost = process.env.HOST;
const broker =`${dbHost}:9092`;

//node cpnsumer.js Logs || Logs2
const topic_name = process.argv[2] || "Logs2"

createConsumer();

async function createConsumer() {
   try {
    const kafka = new Kafka({
        clientId:"Kafka_example_1",
        brokers:[broker]
    })

    const consumer = kafka.consumer({
        groupId:"example_1_cg_1"
    });
    console.log("Consumera bağlanıyor...");
    await consumer.connect();
    console.log("Bağlantı başarılı");
   
    //Consumer subscribe...
    await consumer.subscribe({
        topic:topic_name,
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