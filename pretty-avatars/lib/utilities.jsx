export var hashCode = function (name) {
    var hash = 0;
    for (var i = 0; i < name.length; i++) {
        var character = name.charCodeAt(i);
        hash = (hash << 5) - hash + character;
        hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
};
export var getModulus = function (num, max) {
    return num % max;
};
export var getDigit = function (number, ntn) {
    return Math.floor((number / Math.pow(10, ntn)) % 10);
};
export var getBoolean = function (number, ntn) {
    return !(getDigit(number, ntn) % 2);
};
export var getAngle = function (x, y) {
    return (Math.atan2(y, x) * 180) / Math.PI;
};
export var getUnit = function (number, range, index) {
    var value = number % range;
    if (index && getDigit(number, index) % 2 === 0) {
        return -value;
    }
    else
        return value;
};
export var getRandomColor = function (number, colors, range) {
    return colors[number % range];
};
export var getContrast = function (hexcolor) {
    // If a leading # is provided, remove it
    if (hexcolor.slice(0, 1) === '#') {
        hexcolor = hexcolor.slice(1);
    }
    // Convert to RGB value
    var r = parseInt(hexcolor.substring(0, 2), 16);
    var g = parseInt(hexcolor.substring(2, 2), 16);
    var b = parseInt(hexcolor.substring(4, 2), 16);
    // Get YIQ ratio
    var yiq = (r * 299 + g * 587 + b * 114) / 1000;
    // Check contrast
    return yiq >= 128 ? '#000000' : '#FFFFFF';
};
