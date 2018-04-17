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
    emmergecyBrake: -3
};


speed = function(dist, io) {
    maxSpeed = kmhToMs(metro.speed);
    curDist = 0;
    curSpeed = 0;
    acceleration = metro.acceleration;
    brake = metro.brake;
    dT = .01;

    var interval = setInterval(function () {
        if(curDist < dist){
            if(distToStop(curSpeed) >= dist - curDist){
                //console.log('braking phase')
                curDist += curSpeed*dT + ((brake)*(dT*dT))/2
                curSpeed -= 1*dT
                //console.log('speed : ' + curSpeed)
                //console.log('dist : ' + curDist)
            }else if(curSpeed < maxSpeed){
                // ACCELERATION
                curDist += curSpeed*dT + ((acceleration)*(dT*dT))/2
                curSpeed += 1*dT
                //console.log('acceleration')
                //console.log('speed : ' + curSpeed)
                //console.log('dist : ' + curDist)
            }else{
                curDist += curSpeed*dT
                //console.log('speed : ' + curSpeed)
                //console.log('dist : ' + curDist)
            }
            io.emit('speed', msToKmh(curSpeed))
            io.emit('dist', curDist)
        }
        else{
            console.log('Arrived to station')
            clearInterval(interval)
        }
    }, dT*1000)

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
