
/// <reference path="data.js" />
/// <reference path="storage.js" />

var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-31797208-1']);
_gaq.push(['_trackPageview']);
(function () {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = 'https://ssl.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

window.addEventListener('DOMContentLoaded', function () {
    init();
    restore_options();

    document.getElementById('btn-save').addEventListener('click', function () {
        _gaq.push(['_trackEvent', 'save button', 'clicked']);

        save_options();
    }, false);
}, false);

function init() {
    var day = document.getElementById('day');

    function setDays(days) {
        for (var i = day.children.length - 1; i < days; i++) {
            day.add(new Option(i + 1, i + 1));
        }
        for (var i = day.children.length; i > days; i--) {
            day.remove(i);
        }
    }

    setDays(31);

    var month = document.getElementById('month');
    month.addEventListener('change', function () {
        var value = this.children[this.selectedIndex].value;
        value = parseInt(value);

        if (value === 1) {
            var year_value = parseInt(year.children[year.selectedIndex].value);

            setDays(year_value % 4 === 0 ? 29 : 28);
        }
        else {
            var is30 = [3, 5, 8, 10].indexOf(value) !== -1;

            setDays(is30 ? 30 : 31);
        }
    }, false);

    var year = document.getElementById('year');
    var today = (new Date()).getFullYear();

    for (var i = today - 12; i > today - 93; i--) {
        year.add(new Option(i, i));
    }

    year.addEventListener('change', function () {
        // if selected february
        if (month.children[month.selectedIndex].value === '1') {
            var value = parseInt(this.children[this.selectedIndex].value);

            setDays(value % 4 === 0 ? 29 : 28);
        }
    }, false);

    var country = document.getElementById('country');
    data.forEach(function (item) {
        country.add(new Option(item.country, item.country));
    });
}

function restore_options() {
    var day = storage.local.day;
    if (day) {
        document.getElementById('day').item(day).selected = true;
    }

    var month = storage.local.month;
    if (month) {
        document.getElementById('month').item(month + 1).selected = true;
    }

    var year = storage.local.year;
    if (year) {
        year = year.toString();
        var el = document.getElementById('year');
        for (var i = 0; i < el.children.length; i++) {
            if (el.children[i].value === year) {
                el.children[i].selected = true;
                break;
            }
        }
    }

    var sex = storage.local.sex;
    if (sex) {
        document.getElementById('sex').item(sex === 'male' ? 1 : 2).selected = true;
    }

    var country = storage.local.country;
    if (country) {
        var el = document.getElementById('country');
        for (var i = 0; i < el.children.length; i++) {
            if (el.children[i].value === country) {
                el.children[i].selected = true;
                break;
            }
        }
    }
}

function save_options() {
    var day = document.getElementById('day');
    storage.local.day = parseInt(day.children[day.selectedIndex].value);

    var month = document.getElementById('month');
    storage.local.month = parseInt(month.children[month.selectedIndex].value);

    var year = document.getElementById('year');
    storage.local.year = parseInt(year.children[year.selectedIndex].value);

    var sex = document.getElementById('sex');
    storage.local.sex = sex.children[sex.selectedIndex].value;

    var country = document.getElementById('country');
    storage.local.country = country.children[country.selectedIndex].value;

    storage.save();

    var save_status = document.getElementById('save-status');
    save_status.textContent = 'Options saved.';
    setTimeout(function () {
        save_status.textContent = '';
    }, 1000);
}