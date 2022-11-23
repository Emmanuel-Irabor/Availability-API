var googleDate = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})\.(\d{1})([+-]\d{2}):(\d{2})$/;

function parseGoogleDate(d) {
    var m = googleDate.exec(d);
    var year   = +m[1];
    var month  = +m[2];
    var day    = +m[3];
    var hour   = +m[4];
    var minute = +m[5];
    var second = +m[6];
    var msec   = +m[7];
    var tzHour = +m[8];
    var tzMin  = +m[9];
    var tzOffset = tzHour * 60 + tzMin;

    return Date.UTC(year, month - 1, day, hour, minute - tzOffset, second, msec);
}

module.exports = { parseGoogleDate }