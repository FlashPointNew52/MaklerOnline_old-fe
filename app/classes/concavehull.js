"use strict";
var ConcaveHull = (function () {
    function ConcaveHull(latLngs, maxDistance) {
        var result = this.convertLatLngs(latLngs);
        this.points = result.points;
        this.max_distance = isFinite(maxDistance) ? maxDistance : (result.maxDistance + 1);
    }
    ConcaveHull.prototype.convertLatLngs = function (latLngs) {
        var longestDistance = 0, convertedPoints = latLngs.map(function (latLng, idx) {
            // Transform the lat/long values into those the concave hull algorithm expects.
            latLng.x = latLng.lng;
            latLng.y = this.lat2y(latLng);
            if (latLngs[idx - 1]) {
                var distance = this.distanceTo(latLng, latLngs[idx - 1]);
                if (distance > longestDistance) {
                    longestDistance = distance;
                }
            }
            return latLng;
        }.bind(this));
        return { points: convertedPoints, maxDistance: longestDistance };
    };
    ConcaveHull.prototype.distanceTo = function (firstLatLng, secondLatLng) {
        var R = 6378137, d2r = Math.PI / 180, dLat = (secondLatLng.lat - firstLatLng.lat) * d2r, dLon = (secondLatLng.lng - firstLatLng.lng) * d2r, lat1 = firstLatLng.lat * d2r, lat2 = secondLatLng.lat * d2r, sin1 = Math.sin(dLat / 2), sin2 = Math.sin(dLon / 2);
        var a = sin1 * sin1 + sin2 * sin2 * Math.cos(lat1) * Math.cos(lat2);
        return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    };
    ConcaveHull.prototype.getLatLngs = function () {
        if (this.points.length <= 3) {
            return this.points;
        }
        var byY = this.points.slice().sort(function sort(a, b) {
            return a.y - b.y;
        });
        var hull = [], start = byY[0], current = start, previous = { x: current.x, y: current.y - 1 };
        hull.push(start);
        var next, count = 0;
        /**
        * @method sortPoints
        * @type {Function}
        */
        var sortPoints = function (a, b) {
            return this.getAngle(current, previous, b) - this.getAngle(current, previous, a);
        }.bind(this);
        while (true) {
            count++;
            var byAngle = this.points.slice().sort(sortPoints);
            for (var i = 0, l = byAngle.length; i < l; i++) {
                if (this.distanceTo(current, byAngle[i]) < this.max_distance && !this.isIntersecting(hull, byAngle[i])) {
                    next = byAngle[i];
                    break;
                }
            }
            if (!next) {
                // No polygon can be found.
                return this.points;
            }
            if (next === current) {
                // Concave hull algorithm has gone very wrong indeed.
                return this.points;
            }
            hull.push(next);
            if (next === start) {
                // Everything is okay!
                return hull;
            }
            previous = current;
            current = next;
            next = undefined;
            if (count > 1000) {
                // Concave hull algorithm has gone very wrong... again.
                return this.points;
            }
        }
    };
    ConcaveHull.prototype.isIntersecting = function (latLngs, otherLatLngs) {
        for (var i = 1, l = latLngs.length - 1; i < l; i++) {
            if (this.intersect(latLngs[i - 1], latLngs[i], latLngs[l], otherLatLngs)) {
                return true;
            }
        }
        return false;
    };
    ConcaveHull.prototype.intersect = function (p1, p2, q1, q2) {
        if ((p1.x === q1.x && p1.y === q1.y || p2.x === q2.x && p2.y === q2.y) ||
            (p1.x === q2.x && p1.y === q2.y || p2.x === q1.x && p2.y === q1.y)) {
            return false;
        }
        return (this.ccw(p1, p2, q1) * this.ccw(p1, p2, q2) <= 0) && (this.ccw(q1, q2, p1) * this.ccw(q1, q2, p2) <= 0);
    };
    ConcaveHull.prototype.lat2y = function (latLng) {
        return 180.0 / Math.PI * Math.log(Math.tan(Math.PI / 4.0 + latLng.lat * (Math.PI / 180.0) / 2.0));
    };
    ConcaveHull.prototype.ccw = function (p0, p1, p2) {
        var epsilon = 1e-13, dx1 = p1.x - p0.x, dy1 = p1.y - p0.y, dx2 = p2.x - p0.x, dy2 = p2.y - p0.y, d = dx1 * dy2 - dy1 * dx2;
        if (d > epsilon) {
            return 1;
        }
        if (d < -epsilon) {
            return -1;
        }
        if ((dx1 * dx2 < -epsilon) || (dy1 * dy2 < -epsilon)) {
            return -1;
        }
        if ((dx1 * dx1 + dy1 * dy1) < (dx2 * dx2 + dy2 * dy2) + epsilon) {
            return 1;
        }
        return 0;
    };
    ConcaveHull.prototype.getAngle = function (current, previous, next) {
        if (next.x === current.x && next.y === current.y) {
            return -9000;
        }
        if (next.x === previous.x && next.y === previous.y) {
            return -360.0;
        }
        var a = { x: current.x - previous.x, y: current.y - previous.y }, b = { x: next.x - current.x, y: next.y - current.y };
        var vector = (a.x * b.y) - (b.x * a.y), scale = (a.x * b.x) + (a.y * b.y), angle;
        if (scale === 0) {
            if (vector > 0) {
                angle = 90.0;
            }
            if (vector < 0) {
                angle = -90.0;
            }
        }
        else {
            angle = Math.atan(vector / scale) * 180.0 / Math.PI;
            if (scale < 0) {
                if (vector >= 0) {
                    angle += 180.0;
                }
                if (vector < 0) {
                    angle -= 180.0;
                }
            }
        }
        if (angle === 360.0) {
            angle = 0;
        }
        return 180.0 - angle;
    };
    return ConcaveHull;
}());
exports.ConcaveHull = ConcaveHull;
//# sourceMappingURL=concavehull.js.map