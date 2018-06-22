export class Realty {
  id: number;
  realty_type: string;
  locale: string;
  address: string;
  district: string;
  lat: number;
  lon: number;
  rooms: number;
  price: number;
  floor: number;
  floors: number;
  squere: number;
  condition: string;
  balcony: string;
  describe: string;
  date: string;
  phones: string[];
  photos: string[];

  facilities: boolean[];
  additionally: boolean[];
  statistic: number[];

  constructor(id: number, typeCode: string, locality: string, address: string, houseNum: string, district: string, lat: number , lon: number,
            roomsCount: number, ownerPrice: number, floor: number, floorsCount: number, squareTotal: number,
            conditionId: number, balconyId: number, description: string, addDate: number, photo: string[], phones: string[]){
                this.id = id;
                this.realty_type = Types.realtyTypeOptions[typeCode];
                this.locale = locality;
                this.address = address+" "+houseNum;
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
                if(photo.length == 0)
                    this.photos = ["src/no-image.jpg"];
                else this.photos = photo;

                this.facilities = [];
                this.additionally = [];
                this.statistic = [];

  }

  private getDate(mls: number): string{
      var date = new Date(mls);
      return ""+date.getDate()+" "+Types.month[date.getMonth()].label+ " " +date.getFullYear();
  }
 }


export class Types{
    static realtyTypeOptions ={
        'room': 'Комната',
        'apartment': 'Квартира',
        'house': 'Дом',
        'townhouse': 'Таунхаус'

};
    static conditionOptions = [
           {value: 0, label: '-'},
           {value: 1, label: 'социальный ремонт'},
           {value: 2, label: 'сделан ремонт'},
           {value: 3, label: 'дизайнерский ремонт'},
           {value: 4, label: 'требуется ремонт'},
           {value: 5, label: 'требуется косм. ремонт'},
           {value: 6, label: 'после строителей'},
           {value: 7, label: 'евроремонт'},
           {value: 8, label: 'удовлетворительное'},
           {value: 9, label: 'нормальное'}
    ];
    static balconyOptions = [
           {value: 0, label: '-'},
           {value: 1, label: 'без балкона'},
           {value: 2, label: 'балкон'},
           {value: 3, label: 'лоджия'},
           {value: 4, label: '2 балкона'},
           {value: 5, label: '2 лоджии'},
           {value: 6, label: 'балкон и лоджия'},
           {value: 7, label: 'балкон застеклен'},
           {value: 8, label: 'лоджия застеклена'}
    ];

    static month = [
           {value: 0, label: 'января'},
           {value: 1, label: 'февраля'},
           {value: 2, label: 'марта'},
           {value: 3, label: 'апреля'},
           {value: 4, label: 'мая'},
           {value: 5, label: 'июня'},
           {value: 6, label: 'июля'},
           {value: 7, label: 'августа'},
           {value: 8, label: 'сентября'},
           {value: 9, label: 'октября'},
           {value: 10, label: 'ноября'},
           {value: 11, label: 'декабря'},
    ];
}
