var metro = {
    name: 'metroglou',
    length: 2,
    capacity: 200,
    speed: 60,
    numero: 243,
    faulty: false,
    position: 1,
    acceleration: 1,
    brake: -1,
    emmergecyBrake: -3,
    direction :0  // 0 : sens de 1 à 9; 1 
};


speed = function(dist, io) {
    maxSpeed = kmhToMs(metro.speed);
    curPhase = 'stop';
    curDist = 0;
    curSpeed = 0;
    acceleration = metro.acceleration;
    brake = metro.brake;
    dT = .01;

    var interval = setInterval(function () {
        if(curDist < dist){
            if(distToStop(curSpeed) >= dist - curDist){
                //BRAKE
                curPhase = 'brake'
                curDist += curSpeed*dT + ((brake)*(dT*dT))/2
                curSpeed += brake*dT
            }else if(curSpeed < maxSpeed){
                // ACCELERATION
                curPhase = 'acceleration'
                curDist += curSpeed*dT + ((acceleration)*(dT*dT))/2
                curSpeed += acceleration*dT
            }else{
                //CRUISE
                curPhase = 'cruise'
                curDist += curSpeed*dT
            }
            io.emit('speed', msToKmh(curSpeed), curPhase)
            io.emit('dist', curDist, percentAchieved(curDist,dist))
        }
        else{
            curSpeed = 0;
            curPhase = 'stop'
            io.emit('speed', msToKmh(curSpeed), curPhase)
            console.log('Arrived to station')
            clearInterval(interval)
        }
    }, dT*1000)

}

// Get avancement in %
function percentAchieved(value, target){
    return (100*value) / target
}

// Approximation de la distance d'arret
function distToStop(speed){
    return (speed*speed)/2
}

// Approximation de la distance d'arret d'urgence
function distToEmergencyStop(speed){
    return (speed*speed)/6
}

//Convert ms to kmh
function msToKmh(speed) {
    return speed * 3.6
}

//Convert kmh to ms
function kmhToMs(speed) {
    return speed / 3.6
}

exports.metro = metro;
exports.speed = speed;
