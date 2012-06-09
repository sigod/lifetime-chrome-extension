
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


    window.addEventListener('DOMContentLoaded', function () {
        (new Time('time')).init();
    }, false);


    function Time(id) {
        this.id = id;
    }

    Time.prototype = {
        init: function () {
            var self = this;
            this.tag = document.getElementById(this.id);
            this.end = this._getEndTime();

            check();

            function check() {
                self.update();

                // wait for next second come in to update
                self.timeout = window.setTimeout(check, 1001 - (new Date()).getTime() % 1000);
            }
        },

        update: function () {
            var time = parseInt((this.end - (new Date()).getTime()) / 1000);

            if (time < 0) { // time is up!
                time = 0;
                window.clearTimeout(this.timeout); // stop timer
            }

            this.tag.textContent = this._format(time);
        },

        _getEndTime: function () {
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
        },
        _format: function (time) {
            /// <summary>Converts time from seconds to "In Time" format.</summary>

            var times = new Array(6);

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
    };
})();