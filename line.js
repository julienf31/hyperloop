var line = {
    name: 'Hyperloop',
    stations: [
        {
            id: 0,
            name: 'Parachute 1',
            previousStation : 10,
            nextStation : 10
        },
        {
            id: 1,
            name: 'Le Pénitentier 2',
            previousStation : 10,
            nextStation : 150
        },
        {
            id: 2,
            name: 'Opéra 3',
            previousStation : 150,
            nextStation : 200
        },
        {
            id: 3,
            name: 'Patachou',
            previousStation : 200,
            nextStation : 150
        },
        {
            id: 4,
            name: 'Poire au pinot',
            previousStation : 150,
            nextStation : 150,
        },
        {
            id: 5,
            name: 'Rue de la paix',
            previousStation : 150,
            nextStation : 150,
        },
        {
            id: 6,
            name: 'Le verger des muses',
            previousStation : 150,
            nextStation : 150,
        },
        {
            id: 7,
            name: 'Tripes de peaux',
            previousStation : 150,
            nextStation : 150,
        },
        {
            id: 8,
            name: 'L\'averse Géante',
            previousStation : 150,
            nextStation : 150,
        },
        {
            id: 9,
            name: 'Belle-Isle-En-Terre',
            previousStation : 150,
            nextStation : 150,
        },
    ]
}

function nextStation(id, direction) {
    if (!direction) {
        if(id+1>line.stations.length) {
            return line.stations[id-1];
        } else {
            console.log('forward')
            return line.stations[id+1];
        }
    }
    else{
        if (id-1 < 0) {
            return line.stations[id+1];
        } else {
            console.log('backward')
            return line.stations[id-1];
        }
    }
}

function getDist(id,direction){
    if (!direction) {
        if(id+1>line.stations.length) {
            return line.stations[id-1].nextStation;
        }
        console.log('forward')
        return line.stations[id].nextStation;
    }
    else{
        if (id-1 < 0) {
            return line.stations[id].previousStation;
        }
        console.log('backward')
        return line.stations[id].previousStation;
    }
}

exports.line = line
exports.nextStation = nextStation
exports.getDist = getDist