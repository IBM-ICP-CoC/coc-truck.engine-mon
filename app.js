const random = require('random');

const appVersion = "1.0.0";

const DEVICE_ID=process.env.HZN_DEVICE_ID;

console.log('coc-truck.engine-mon Simulator');
console.log(`Version: ${appVersion}`  );
console.log(`Device: ${DEVICE_ID}`  );

function deg2rad(deg) {
    return deg * (Math.PI/180)
}

// num generators
const oil_dist = random.normal(mu = 50, sigma = 10);     // psi
const engine_dist = random.normal(mu = 175, sigma = 10);  // deg F
const trans_dist = random.normal(mu = 175, sigma = 10);   // deg F
const speed_dist = random.normal(mu = 60, sigma = 10);   // mph

// initial conditions

var oil_pressure = oil_dist();
var engine_temp = engine_dist();
var transmission_temp = trans_dist();
var odometer = 78000.0;

var readingTimestamp = Date.now();

function updateData(){

    var timestamp = Date.now();

    oil_pressure = oil_dist();
    engine_temp = engine_dist();
    transmission_temp = trans_dist();
    speed = speed_dist();

    var dt = Math.floor( ( timestamp - readingTimestamp )/1000 ); // time in seconds since last reading
    if( dt > 0 ) {
        var distance = speed * dt / 60 / 60;
        odometer += distance;
    }
}

function sendToHub(){

    data = {
        "oil_pressue": oil_pressure,
        "engine_temp": engine_temp,
        "transmission_temp": transmission_temp,
        "odometer": odometer,
        "time": new Date()
    }

    console.log( JSON.stringify(data,null,4) );

}

function update(){
    updateData();
    sendToHub();
}

updateData();
sendToHub();

setInterval(update,60*1000); 
