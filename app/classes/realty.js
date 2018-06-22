"use strict";
var Realty = (function () {
    function Realty(id, typeCode, locality, address, houseNum, district, lat, lon, roomsCount, ownerPrice, floor, floorsCount, squareTotal, conditionId, balconyId, description, addDate, photo, phones) {
        this.id = id;
        this.realty_type = Types.realtyTypeOptions[typeCode];
        this.locale = locality;
        this.address = address + " " + houseNum;
        this.district = district;
        this.lat = lat;
        this.lon = lon;
        this.rooms = roomsCount;
        this.price = ownerPrice;
        this.floor = floor;
        this.floors = floorsCount;
        this.squere = squareTotal;
        this.describe = description;
        this.squere = squareTotal;
        this.condition = Types.conditionOptions[conditionId].label;
        this.balcony = Types.balconyOptions[balconyId].label;
        this.date = this.getDate(addDate);
        this.phones = phones;
        if (photo.length == 0)
            this.photos = ["src/no-image.jpg"];
        else
            this.photos = photo;
        this.facilities = [];
        this.additionally = [];
        this.statistic = [];
    }
    Realty.prototype.getDate = function (mls) {
        var date = new Date(mls);
        return "" + date.getDate() + " " + Types.month[date.getMonth()].label + " " + date.getFullYear();
    };
    return Realty;
}());
exports.Realty = Realty;
var Types = (function () {
    function Types() {
    }
    return Types;
}());
Types.realtyTypeOptions = {
    'room': 'Комната',
    'apartment': 'Квартира',
    'house': 'Дом',
    'townhouse': 'Таунхаус'
};
Types.conditionOptions = [
    { value: 0, label: '-' },
    { value: 1, label: 'социальный ремонт' },
    { value: 2, label: 'сделан ремонт' },
    { value: 3, label: 'дизайнерский ремонт' },
    { value: 4, label: 'требуется ремонт' },
    { value: 5, label: 'требуется косм. ремонт' },
    { value: 6, label: 'после строителей' },
    { value: 7, label: 'евроремонт' },
    { value: 8, label: 'удовлетворительное' },
    { value: 9, label: 'нормальное' }
];
Types.balconyOptions = [
    { value: 0, label: '-' },
    { value: 1, label: 'без балкона' },
    { value: 2, label: 'балкон' },
    { value: 3, label: 'лоджия' },
    { value: 4, label: '2 балкона' },
    { value: 5, label: '2 лоджии' },
    { value: 6, label: 'балкон и лоджия' },
    { value: 7, label: 'балкон застеклен' },
    { value: 8, label: 'лоджия застеклена' }
];
Types.month = [
    { value: 0, label: 'января' },
    { value: 1, label: 'февраля' },
    { value: 2, label: 'марта' },
    { value: 3, label: 'апреля' },
    { value: 4, label: 'мая' },
    { value: 5, label: 'июня' },
    { value: 6, label: 'июля' },
    { value: 7, label: 'августа' },
    { value: 8, label: 'сентября' },
    { value: 9, label: 'октября' },
    { value: 10, label: 'ноября' },
    { value: 11, label: 'декабря' },
];
exports.Types = Types;
//# sourceMappingURL=realty.js.map