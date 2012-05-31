
/// <reference path="data.js" />

var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-31797208-1']);
_gaq.push(['_trackPageview']);
(function () {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = 'https://ssl.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

window.onload = function () {
    init();
    restore_options();

    document.getElementById('btn-save').addEventListener('click', function () {
        _gaq.push(['_trackEvent', 'save button', 'clicked']);

        save_options();
    }, false);
};

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
    var day = parseInt(localStorage['day']);
    if (day) {
        document.getElementById('day').item(day).selected = true;
    }

    var month = parseInt(localStorage['month']);
    if (month) {
        document.getElementById('month').item(month + 1).selected = true;
    }

    var year = localStorage['year'];
    if (year) {
        var el = document.getElementById('year');
        for (var i = 0; i < el.children.length; i++) {
            if (el.children[i].value === year) {
                el.children[i].selected = true;
                break;
            }
        }
    }

    var sex = localStorage['sex'];
    if (sex) {
        document.getElementById('sex').item(sex === 'male' ? 1 : 2).selected = true;
    }

    var country = localStorage['country'];
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
    localStorage['day'] = day.children[day.selectedIndex].value;

    var month = document.getElementById('month');
    localStorage['month'] = month.children[month.selectedIndex].value;

    var year = document.getElementById('year');
    localStorage['year'] = year.children[year.selectedIndex].value;

    var sex = document.getElementById('sex');
    localStorage['sex'] = sex.children[sex.selectedIndex].value;

    var country = document.getElementById('country');
    localStorage['country'] = country.children[country.selectedIndex].value;

    var save_status = document.getElementById('save-status');
    save_status.textContent = 'Options saved.';
    setTimeout(function () {
        save_status.textContent = '';
    }, 1000);
}