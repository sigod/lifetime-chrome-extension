
var storage = new function () {
    var storageKey = '__storage';

    var Storage = function () {
        this._init();
    };

    Storage.prototype = {
        local: {},

        save: function () {
            var stringified = JSON.stringify(this.local);
            
            if (window.localStorage.getItem(storageKey) !== stringified) {
                window.localStorage.setItem(storageKey, stringified);
            }
        },

        _init: function () {
            var self = this;

            self.local = JSON.parse(window.localStorage.getItem(storageKey)) || {};
            
            window.addEventListener('beforeunload', function () {
                self.save();
            });
        }
    };

    return new Storage();
};