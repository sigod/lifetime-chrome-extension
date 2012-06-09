
/// <reference path="data.js" />
/// <reference path="storage.js" />

(function () {
    var _gaq = _gaq || [];
    _gaq.push(['_setAccount', 'UA-31797208-1']);
    _gaq.push(['_trackPageview']);
    (function () {
        var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
        ga.src = 'https://ssl.google-analytics.com/ga.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
    })();

    var times = new Array(6);
    function toInTimeFormat(time) {
        /// <summary>Converts time from seconds to "In Time" format.</summary>

        // seconds
        times[5] = parseInt(time % 60);
        if (times[5] < 10) { times[5] = '0' + times[5]; }
        time /= 60;

        // minutes
        times[4] = parseInt(time % 60);
        if (times[4] < 10) { times[4] = '0' + times[4]; }
        time /= 60;

        // hours
        times[3] = parseInt(time % 24);
        if (times[3] < 10) { times[3] = '0' + times[3]; }
        time /= 24;

        // days
        times[2] = parseInt(time % 7);
        time /= 7;

        // weeks
        times[1] = parseInt(time % 52);
        if (times[1] < 10) { times[1] = '0' + times[1]; }
        time /= 52;

        // years
        times[0] = parseInt(time);

        if (times[0] < 10) { times[0] = '000' + times[0]; }
        else if (times[0] < 100) { times[0] = '00' + times[0]; }
        else if (times[0] < 1000) { times[0] = '0' + times[0]; }

        return times.join(':');
    }

    var interval;
    var element;
    var finishTime = function () {
        var day = storage.local.day;
        var month = storage.local.month;
        var year = storage.local.year;
        var sex = storage.local.sex;
        if (sex !== 'male' && sex !== 'female') {
            sex = 'average';
        }

        var country = storage.local.country;
        if (country) {
            for (var i = 0; i < data.length; i++) {
                if (data[i].country === country) {
                    country = i;
                    break;
                }
            }
        }

        if (day && typeof month === 'number' && year) {
            year += (typeof country === 'number' ? parseFloat(data[country][sex]) : 64);
            month += (year - Math.floor(year)) * 12;
            day += (month - Math.floor(month)) * 31;

            return (new Date(year, month, day)).getTime();
        }

        return 0;
    } ();
    var lastTime;

    function work() {
        var time = finishTime - (new Date()).getTime();
        time = parseInt(time / 1000);

        if (time < 0) { time = 0; }

        if (lastTime !== time) {
            lastTime = time;

            element.textContent = toInTimeFormat(time);
        }
    }

    function start() {
        element = document.getElementById('time');

        interval = setInterval(function () {
            work();
        }, 33);
    }

    window.addEventListener('DOMContentLoaded', start, false);
})();