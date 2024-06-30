const {Kafka}= require("kafkajs")

exports.kafka=new Kafka({
    clientId:"myapp",
    brokers:['192.168.160.1:9092']
})
