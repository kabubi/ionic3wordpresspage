import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { App } from '../../app/app.global';

/*
  Generated class for the WpProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WpProvider {

  private BASEURL = App.BASEURL;

  constructor(public http: Http) {
  }

  //To get response of all posts by offset
  getPosts(pageno) {
    return new Promise((resolve, reject) => {
      //this.http.get(this.BASEURL +'?json=1&count=10&page='+pageno)
      this.http.get(this.BASEURL +'?json=get_category_posts&slug=noticias&count=10&page='+pageno)
        .do(this.logResponse)
        .map(this.extractResponse)
        .subscribe(data => {
          resolve(data);
        },
        error => {
          reject(error);
          console.error(error);
        }
        );
    });
  }

  //To get response of categories
  getCategories() {
    return new Promise((resolve, reject) => {
      this.http.get(this.BASEURL + 'api/get_category_index/')
        .do(this.logResponse)
        .map(this.extractResponse)
        .subscribe(data => {
          resolve(data);
        },
        error => {
          reject(error);
          console.error(error);
        }
        );
    });
  }

  //To get response of specific category posts
  getCategoryPosts(slug, pageno) {
    return new Promise((resolve, reject) => {
      this.http.get(this.BASEURL + '?json=get_category_posts&slug='+slug+'&count=10&page='+pageno)
        .do(this.logResponse)
        .map(this.extractResponse)
        .subscribe(data => {
          resolve(data);
        },
        error => {
          reject(error);
          console.error(error);
        }
        );
    });
  }

  //To get response of pages crawled 
  getPages() {
    return new Promise((resolve, reject) => {
      this.http.get(this.BASEURL + 'api/get_page_index/')
        .do(this.logResponse)
        .map(this.extractResponse)
        .subscribe(data => {
          resolve(data);
        },
        error => {
          reject(error);
          console.error(error);
        }
        );
    });
  }

  //To get response of page autoridades
  getPageAutoridades() {
    return new Promise((resolve, reject) => {
      this.http.get(this.BASEURL + '?json=get_page&id=1197')
        .do(this.logResponse)
        .map(this.extractResponse)
        .subscribe(data => {
          resolve(data);
        },
        error => {
          reject(error);
          console.error(error);
        }
        );
    });
  }

  //To get response of search results
  searchPost(pageno, query) {
    return new Promise((resolve, reject) => {
      this.http.get(this.BASEURL + '?json=get_search_results&count=20&page='+pageno+'&search='+query)
        .do(this.logResponse)
        .map(this.extractResponse)
        .subscribe(data => {
          resolve(data);
        },
        error => {
          reject(error);
          console.error(error);
        }
        );
    });
  }

  //Function for replace encoded unicode special symbols
  //with decoded special symbols
  setTitle(title) { 
    var str = title;
    str = str.replace(/&#8217;/gi, "'");
    str = str.replace(/&amp;/gi, "&");
    str = str.replace(/&#038;/gi, "&");
    str = str.replace(/&#8220;/gi, "\“");
    str = str.replace(/&#8221;/gi, "\”");
    str = str.replace(/&#8211;/gi, "\-");
    return str;
  }

  //To display response on console
  private logResponse(res: Response) {
    console.log(res);
  }

  //To extract json response and display on console
  private extractResponse(res: Response) {
    console.log(res.json());
    return res.json();
  }

}
