function cloneObject(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    var temp = obj.constructor(); // give temp the original obj's constructor
    for (var key in obj) {
        if (key === 'connection') {
            continue;
        }
        temp[key] = cloneObject(obj[key]);
    }

    return temp;
}