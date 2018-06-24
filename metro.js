class Metro {

    constructor(id) {
        this.metro = {
            id: id,
            name: 'metroglou',
            length: 3,
            capacity: 200,
            speed: 60,
            numero: 243,
            faulty: false,
            position: 1,
            acceleration: 1,
            brake: -1,
            emmergecyBrake: -3,
            direction: false,  // 0 : sens de 1 à 9; 1
            station: 1,
            emergency: false,
            garage: false,
        };

    }

    // Get avancement in %
    percentAchieved(value, target) {
        return (100 * value) / target
    }

    // Approximation de la distance d'arret
    distToStop(speed) {
        return (speed * speed) / 2
    }

    // Approximation de la distance d'arret d'urgence
    distToEmergencyStop(speed) {
        return (speed * speed) / 6
    }

    //Convert ms to kmh
    msToKmh(speed) {
        return speed * 3.6
    }

    //Convert kmh to ms
    kmhToMs(speed) {
        return speed / 3.6
    }



    speed(dist, io, callback) {
        let maxSpeed = this.kmhToMs(this.metro.speed);
        let curPhase = 'stop';
        let curDist = 0;
        let curSpeed = 0;
        let acceleration = this.metro.acceleration;
        let brake = this.metro.brake;
        let dT = .01;
        let emergencyBrake = this.metro.emmergecyBrake;

        console.log(this.metro);
        var interval = setInterval(function () {
            if (curDist < dist) {
                if (this.metro.emergency) {
                    if (curSpeed > 0){
                        curPhase = 'emergency'
                        curDist += curSpeed * dT + ((emergencyBrake) * (dT * dT)) / 2
                        curSpeed += emergencyBrake * dT
                    }
                } 
                else if (this.distToStop(curSpeed) >= dist - curDist) {
                    //BRAKE
                    curPhase = 'brake'
                    curDist += curSpeed * dT + ((brake) * (dT * dT)) / 2
                    curSpeed += brake * dT
                } else if (curSpeed < maxSpeed) {
                    // ACCELERATION
                    curPhase = 'acceleration'
                    curDist += curSpeed * dT + ((acceleration) * (dT * dT)) / 2
                    curSpeed += acceleration * dT
                } else {
                    //CRUISE
                    curPhase = 'cruise'
                    curDist += curSpeed * dT
                }
                io.emit('speed', this.msToKmh(curSpeed), curPhase)
                io.emit('dist', curDist, this.percentAchieved(curDist, dist))
            }
            else {
                curSpeed = 0;
                curPhase = 'stop'
                io.emit('speed', this.msToKmh(curSpeed), curPhase)
                console.log('Arrived to station')
                callback()
                clearInterval(interval)
            }
        }.bind(this), dT * 1000)

    }
}

module.exports = Metro