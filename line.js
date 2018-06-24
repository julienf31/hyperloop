var line = {
    name: 'Hyperloop',
    stations: [
        {
        id: 0,
        name: 'Parachute ☂️',
        previousStation: 100,
        nextStation: 100,
        garage: false,
        open: true
        },
        {
            id: 1,
            name: 'Le Pénitentier 👮',
            previousStation: 100,
            nextStation: 150,
            garage: false,
            open: true
        },
        {
            id: 2,
            name: 'Opéra 🎵',
            previousStation: 150,
            nextStation: 200,
            garage: false,
            open: false
        },
        {
            id: 3,
            name: 'Patachou 🥦',
            previousStation: 200,
            nextStation: 150,
            garage: false,
            open: true
        },
        {
            id: 4,
            name: 'Poire au pinot 🍐',
            previousStation: 150,
            nextStation: 150,
            garage: false,
            open: true
        },
        {
            id: 5,
            name: 'Rue de la paix 🕊️',
            previousStation: 150,
            nextStation: 150,
            garage: false,
            open: true
        },
        {
            id: 6,
            name: 'Le verger des muses 👩‍🎨',
            previousStation: 150,
            nextStation: 150,
            garage: false,
            open: true
        },
        {
            id: 7,
            name: 'Tripes de peaux 🍖',
            previousStation: 150,
            nextStation: 150,
            garage: false,
            open: true
        },
        {
            id: 8,
            name: 'L\'averse Géante 🌧️',
            previousStation: 150,
            nextStation: 150,
            garage: false,
            open: true
        },
        {
            id: 9,
            name: 'Belle-Isle-En-Terre 🏝️',
            previousStation: 150,
            nextStation: 150,
            garage: false,
            open: true
        },
        {
            id: 10,
            name: 'Gare age 🏭',
            previousStation: 150,
            nextStation: 150,
            garage: true,
        },
    ]
}

function nextStation(id, direction) {
    if (!direction) {
        if (id + 1 > line.stations.length) {
            return line.stations[id - 1];
        } else {
            console.log('forward')
            return line.stations[id + 1];
        }
    } else {
        if (id - 1 < 0) {
            return line.stations[id + 1];
        } else {
            console.log('backward')
            return line.stations[id - 1];
        }
    }
}

function getGarage() {
    return line.stations[line.stations.length - 1]
}

function distToGarage(id, direction) {
    curStation = line.stations[id]
    dist = 0;
    while (!curStation.garage) {
        dist += curStation.nextStation
        curStation = line.stations[curStation.id + 1]
    }
    return dist;
}

function getDist(id, direction) {
    if (!direction) {
        if (id + 1 > line.stations.length) {
            return line.stations[id - 1].nextStation;
        }
        console.log('forward')
        return line.stations[id].nextStation;
    } else {
        if (id - 1 < 0) {
            return line.stations[id].previousStation;
        }
        console.log('backward')
        return line.stations[id].previousStation;
    }
}

exports.line = line
exports.nextStation = nextStation
exports.distToGarage = distToGarage
exports.getGarage = getGarage
exports.getDist = getDist