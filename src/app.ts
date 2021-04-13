import { autoinject } from 'aurelia-dependency-injection';
import { HttpClient, json } from 'aurelia-fetch-client';

class gridStyles {
  NameStyle: string
  constructor() {
    this.NameStyle = '';
  }
}

@autoinject
export class App {
  getmedicinesClient: HttpClient;
  postmedicinesClient: HttpClient;
  medicines = []
  errorStyles: gridStyles;
  
  constructor() {
    this.getmedicinesClient = new HttpClient().configure(a => {
      a.useStandardConfiguration()
        .withBaseUrl("https://localhost:5001/api/Medicines/List")
        .withInterceptor({
          request(request) {
            return request;
          }
        });
    });

    this.getmedicinesClient.fetch('', {
      method: 'get', mode: 'cors',
    })
      .then(response => response.json())
      .then(data => {
        this.medicines = data;
        console.log(this.medicines);
      })
      .catch(error => { console.log(error) });


    this.postmedicinesClient = new HttpClient().configure(cnf => {
      cnf.useStandardConfiguration()
        .withBaseUrl('https://localhost:5001/api/Medicines')
        .withDefaults({
          headers: {
            'content-type': 'application/json',
            'Accept': 'application/json',
            'X-Requested-With': 'Fetch'
          }
        })
        .withInterceptor({
          request(request) {
            return request;
          }
        });
    });
  }

  filters = [
    { value: '', keys: ['name', 'fullName'] }
  ];
  public message = 'Hello World!';

  rowSelected($event) {
    console.log($event.detail.row.expiryDate);
  }
}
