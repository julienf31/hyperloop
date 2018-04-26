var line = {
    name: 'Hyperloop',
    stations: [
        {
            id: 0,
            name: 'Parachute',
            nextStation : 150
        },
        {
            id: 1,
            name: 'Le Pénitentier',
            nextStation : 150
        },
        {
            id: 2,
            name: 'Opéra',
            nextStation : 200
        },
        {
            id: 3,
            name: 'Patachou',
            nextStation : 150
        },
        {
            id: 4,
            name: 'Poire au pinot',
            nextStation : 150
        },
        {
            id: 5,
            name: 'Rue de la paix',
            nextStation : 150
        },
        {
            id: 6,
            name: 'Le verger des muses',
            nextStation : 150
        },
        {
            id: 7,
            name: 'Tripes de peaux',
            nextStation : 150
        },
        {
            id: 8,
            name: 'L\'averse Géante',
            nextStation : 150
        },
        {
            id: 9,
            name: 'Belle-Isle-En-Terre',
            nextStation : 150
        },
    ]
}

function distToNext(id, direction) {
    if (direction == 0) {
        if(id+1>line.stations.length) {
        return line.stations[id-1].nextStation;
        }
        return line.stations[id+1].nextStation;
    }
    else{
       if (id-1 < 0) {
        return line.stations[id+1].nextStation;
        } 
        return line.stations[id-1].nextStation;
    }
}

exports.line = line
exports.distToNext = distToNext