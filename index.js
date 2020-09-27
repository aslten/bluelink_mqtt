require('dotenv').config({path: './config/.env' });
const fs = require('fs');
const MQTT = require("async-mqtt");
const BlueLinky = require("bluelinky");


try {
  const bluelinkClient = new BlueLinky({
    username: process.env.BL_USER,
    password: process.env.BL_PW,
    region: "EU",
    pin: process.env.BL_PIN
  })

  bluelinkClient.on("ready", async (theVs) => {
    console.log("BL connected")
    console.log(theVs)
    const mqttClient = await MQTT.connectAsync(process.env.MY_MQTT, { username:process.env.MQTT_USER, password:process.env.MQTT_PW })

    // Get status information for a specific vehicle
    const vehicle = await bluelinkClient.getVehicle(process.env.CAR_VIN);
    const status = await vehicle.status({ parsed: false, refresh: true });

    await mqttClient.publish(
      "BluelinkCarStatus",
      JSON.stringify({
        soc: status.evStatus.batteryStatus,
        locked: status.doorLock,
        battery12V: status.battery.batSoc,
      })
    );
    
    console.log(status)

    await mqttClient.end()
  });
   
  console.log("Done")
 
} catch (e) {
  console.log(e.stack)
  process.exit();
}


