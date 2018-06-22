import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Realty } from '../classes/realty'
import { Observable }  from 'rxjs/Observable';
import {UserService} from '../services/user.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class RealtyListService {
    private Url = "http://import.rplusmgmt.com:19050/api/offer/search";
    private UrlGet = "http://192.168.5.81:4567/api/v1/offer/get/";
    FavRealtes: Realty[] =[];
    FindRealtes: Realty[] =[];
    constructor (private http: Http, private autr: UserService) {}

    getList(query: string, page: number, typeCode: string){
        if(query == ''){

            if(typeCode == ''){
                //console.log("Q1: "+this.Url+"?page="+page+"&per_page=10&api_key=18l8lIwH9r0D3777OR3E0W1t4Pu1r8oY");
                this.http.get(this.Url+"?query=&offer_type=rent&page="+page+"&per_page=10").map(response => response.json())
                    .subscribe(data => {this.extractData(data)}, error => {console.log("fff")});
            }
            else{
                //console.log(this.Url+"?page="+page+"&per_page=10&filter={typeCode=\""+typeCode+"\"}");
                this.http.get(this.Url+"?page="+page+"&per_page=10&api_key=18l8lIwH9r0D3777OR3E0W1t4Pu1r8oY&search_query=\"Квартира\"&filter={typeCode=\""+typeCode+"\"}")
                    .map(response => response.json()).subscribe(data => {this.extractData(data)});
                }
        }
        else {
            if(typeCode == '')
                this.http.get(this.Url+"?page="+page+"&per_page=10&api_key=18l8lIwH9r0D3777OR3E0W1t4Pu1r8oY&search_query=\""+query+"\"")
                .map(response => response.json()).subscribe(data => {this.extractData(data)});
            else
                this.http.get(this.Url+"?page="+page+"&per_page=10&api_key=18l8lIwH9r0D3777OR3E0W1t4Pu1r8oY&search_query=\""+query+"\"&filter={typeCode=\""+typeCode+"\"}")
                    .map(response => response.json()).subscribe(data => {this.extractData(data)});
        }
    }

    getFavouriteList(idList: number[]){
        for(let i=0; i<idList.length; ++i){
            this.http.get(this.UrlGet+idList[i]).map(response => response.json()).subscribe(data => {
                if(data.response == "ok"){
                    let relt: Realty = new Realty(
                        data.result.id,
                        data.result.typeCode || "не указано",
                        data.result.locality || "не указано",
                        data.result.address || "не указано",
                        data.result.houseNum || "",
                        data.result.district || "не указано",
                        data.result.locationLat || undefined,
                        data.result.locationLon || undefined,
                        data.result.roomsCount || "не указано",
                        data.result.ownerPrice || "не указано",
                        data.result.floor || "-",
                        data.result.floorsCount || "-",
                        data.result.squareTotal || "не указано",
                        data.result.conditionId || 0,
                        data.result.balconyId || 0,
                        data.result.description || "описание отсутствует",
                        data.result.addDate || "не указано",
                        data.result.photoUrl,
                        (data.result.person) ? data.result.person.phones : [],
                    )
                    let have: boolean = false;
                    for(let i=0; i<this.FavRealtes.length; i++){
                        if(this.FavRealtes[i].id == relt.id)
                            have = true;
                    }
                    if(!have)
                        this.FavRealtes.push(relt);
                } else{
                    this.autr.editFavList(idList[i],false);
                } });
        }
    }

    private extractData(data) {
        //console.log(data.result);
        if(data.response == "ok"){
            for(var i=0; i<data.result.length;++i){
                this.FindRealtes.push(new Realty(
                    data.result[i].id,
                    data.result[i].typeCode || "не указано",
                    data.result[i].locality || "не указано",
                    data.result[i].address || "не указано",
                    data.result[i].houseNum || "",
                    data.result[i].district || "не указано",
                    data.result[i].locationLat,
                    data.result[i].locationLon,
                    data.result[i].roomsCount || "не указано",
                    data.result[i].ownerPrice || "не указано",
                    data.result[i].floor || "-",
                    data.result[i].floorsCount || "-",
                    data.result[i].squareTotal || "не указано",
                    data.result[i].conditionId || 0,
                    data.result[i].balconyId || 0,
                    data.result[i].description || "описание отсутствует",
                    data.result[i].addDate || "не указано",
                    data.result[i].photoUrl || [],
                    (data.result[i].person) ? data.result[i].person.phones : [],
                ));
            }
        }
        else {};
    }



    private handleError (error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw("");
    }
}
