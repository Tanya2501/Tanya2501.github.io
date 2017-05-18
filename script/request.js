//import * as app from './app';
//import { main } from './app';
//import { variables } from './utils';
//import { Application } from './app';
 // 
export function getRequest(searchTerm, nextPage) {
    !nextPage?nextPage = '':nextPage = '&pageToken='+nextPage;
    return new Promise((resolve, reject) => {
        let XHR = ('onload' in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
        let xhr = new XHR();
        xhr.open('GET',"https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=15&order=viewCount&type=video&key=AIzaSyDDFIjNyqjHvS9w7cZyEj27sw_M_-buQLQ&q="+searchTerm+nextPage, true);
        xhr.onload = function() {
            if (this.status == 200) {
                resolve(this.response);
            } 
            else {
                var error = new Error(this.statusText);
                error.code = this.status;
                reject(error);
            }
        };
        xhr.onerror = function() {
        reject(new Error(''));
        }
        xhr.send();
    });
    console.log(xhr);
}

export function searchStatistics(id) {
    return new Promise((resolve, reject) => {
        let XHRStatistic = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
        let xhrStatistic = new XHRStatistic();
        xhrStatistic.open('GET',"https://www.googleapis.com/youtube/v3/videos?part=statistics&key=AIzaSyDDFIjNyqjHvS9w7cZyEj27sw_M_-buQLQ&id="+id);
        xhrStatistic.onload = function() {
            if (this.status == 200) {
                resolve(this.response);
            } 
            else {
                var error = new Error(this.statusText);
                error.code = this.status;
                reject(error);
            }
        };
        xhrStatistic.onerror = function() {
            reject(new Error(""));
        }
        xhrStatistic.send();
    });
}   




