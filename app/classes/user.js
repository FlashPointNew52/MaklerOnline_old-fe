"use strict";
var User = (function () {
    function User(id, name, time, can_estimate, favourite) {
        this.id = 0;
        this.name = "";
        this.time = "";
        this.id = id;
        this.name = name;
        this.time = time;
        this.can_estimate = can_estimate;
        this.favourite = favourite;
        this.left_time = new Dates();
    }
    User.prototype.countTime = function () {
        this.stop_timer();
        var interval = new Date(this.time).getTime() - new Date().getTime() - 10 * 3600 * 1000;
        if (interval > 0) {
            this.left_time.days = Math.floor(interval / (1000 * 3600 * 24));
            interval -= this.left_time.days * 1000 * 3600 * 24;
            this.left_time.hours = Math.floor(interval / (1000 * 3600));
            interval -= this.left_time.hours * 1000 * 3600;
            this.left_time.minute = Math.floor(interval / (1000 * 60));
            interval -= this.left_time.minute * 1000 * 60;
            this.left_time.second = Math.floor(interval / 1000);
            this.start_timer();
            return true;
        }
        else {
            return false;
        }
    };
    ;
    User.prototype.newLeft_time = function () {
        this.stop_timer();
        this.left_time = new Dates();
    };
    User.prototype.start_timer = function () {
        var _this = this;
        this.id_timer = setInterval(function () {
            var have_time = _this.left_time.reduce_the_time();
            if (!have_time)
                clearInterval(_this.id_timer);
        }, 1000);
    };
    User.prototype.stop_timer = function () {
        clearInterval(this.id_timer);
    };
    User.prototype.hasTime = function () {
        return this.left_time.hasTime();
    };
    return User;
}());
exports.User = User;
var Dates = (function () {
    function Dates() {
        this.days = 0;
        this.hours = 0;
        this.minute = 0;
        this.second = 0;
    }
    Dates.prototype.getTime = function () {
        var str = "";
        if (this.hours > 9)
            str += this.hours;
        else
            str += "0" + this.hours;
        str += ":";
        if (this.minute > 9)
            str += this.minute;
        else
            str += "0" + this.minute;
        str += ":";
        if (this.second > 9)
            str += this.second;
        else
            str += "0" + this.second;
        return str;
    };
    Dates.prototype.hasTime = function () {
        if (this.days || this.hours || this.minute || this.second) {
            return true;
        }
        else
            return false;
    };
    Dates.prototype.reduce_the_time = function () {
        if (this.second > 0) {
            this.second -= 1;
            return true;
        }
        else {
            this.second = 59;
            if (this.minute > 0) {
                this.minute -= 1;
                return true;
            }
            else {
                this.minute = 59;
                if (this.hours > 0) {
                    this.hours -= 1;
                    return true;
                }
                else {
                    this.hours = 23;
                    if (this.days > 0) {
                        this.days -= 1;
                        return true;
                    }
                    else {
                        this.hours = 0;
                        this.minute = 0;
                        this.second = 0;
                        return false;
                    }
                }
            }
        }
    };
    return Dates;
}());
exports.Dates = Dates;
//# sourceMappingURL=user.js.map