import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CondbService {
  host: any;
  user: any;
  password: any;
  database: any;
  rs: any;
  mysql: any;
  conn: any;
  constructor() {
    this.mysql = require('mysql');
    this.conn = this.mysql.createConnection({  host: "localhost",  user: "root",  password: "046158931", database: "kaijae" });
    this.conn.connect(function(err) {  if (err) throw err;  console.log("Connected!");});
   }
}
