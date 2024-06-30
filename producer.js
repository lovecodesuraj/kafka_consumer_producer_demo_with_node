const { stdin } = require("process");
const {kafka}=require("./client")


const readline=require("readline")

const rl=readline.createInterface({
    input:process.stdin,
    output:process.stdout,

})

async function init(){
    const producer=kafka.producer();


    console.log("connecting producer");
    await producer.connect();
    console.log("Producer connected succesfully");

    rl.setPrompt('> ')
    rl.prompt();

    rl.on('line',async (line)=>{
        const [riderName,location]=line.split(' ');
        // console.log({location})
        await producer.send({
            topic:"rider-updates",
            messages:[{
                partition:location.toLowerCase() === 'north' ? 0 : 1,
                key:"location_update",
                value:JSON.stringify({name:riderName,location})
            }]
        })
    }).on('close',async ()=>{
        await producer.disconnect();
    })      

    

}


init();