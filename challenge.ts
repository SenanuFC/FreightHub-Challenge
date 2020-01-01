async function sleep(ms: number) {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(), ms)
    })
}

async function randomDelay() {
    const randomTime = Math.round(Math.random() * 1000)
    return sleep(randomTime)
}

class ShipmentSearchIndex {
    async updateShipment(id: string, shipmentData: any) {
        const startTime = new Date()
        await randomDelay()
        const endTime = new Date()
        console.log(`update ${id}@${
            startTime.toISOString()
            } finished@${
            endTime.toISOString()
            }`
        )

        return { startTime, endTime }
    }
}

// Implementation needed
interface ShipmentUpdateListenerInterface {
    receiveUpdate(id: string, shipmentData: any)
}

class updateRequest {
    id: string
    startTime:Date;
    retry: boolean = false;
    constructor(newId:string, startTime:Date){
        this.id=newId;
        this.startTime=startTime;
    }
}

//Temp Memory
let ids: updateRequest[] = []

const noneQueued = (id: string) =>  ids.filter(a => a.id = id).length === 0

class ShipmentUpdateListener implements ShipmentUpdateListenerInterface {
    async receiveUpdate(id: string, shipmentData: any){
        //implementation
        let index = new ShipmentSearchIndex();

        //Check if in memory
        if(noneQueued(id)){
            console.log("Request not in memory")
                    
            //Add to memory
            let newUpdate = new updateRequest(id, (new Date()))
            ids.push(newUpdate);


            await index.updateShipment(id, shipmentData)
            ids = ids.filter(d => d.id !== id) 
        }
        else{
            console.log("Already request pending for " + id + ". Queuing...")
            //Delay 
            await setTimeout(async () => await this.receiveUpdate(id, shipmentData).then(
                //do nothing
            ), 1100)
        }
        
    }
}