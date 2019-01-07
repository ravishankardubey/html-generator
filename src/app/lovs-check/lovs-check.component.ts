import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lovs-check',
  templateUrl: './lovs-check.component.html',
  styleUrls: ['./lovs-check.component.css']
})
export class LovsCheckComponent implements OnInit {

  lovsList;
  migratedLovsList;
  invalidLovs = [];
  isValid = true;

  constructor() { }

  ngOnInit() {
  }

  validateLovs() {
    let lovsListAr = this.lovsList;
    let migratedLovsListAr = this.migratedLovsList;
    this.invalidLovs = [];
    this.isValid = true;
    lovsListAr = JSON.parse(lovsListAr);
    migratedLovsListAr = JSON.parse(migratedLovsListAr);
    console.log(lovsListAr);
    console.log(migratedLovsListAr);
    const respDiv = document.getElementById('responseDiv');
    respDiv.innerHTML = '';
    for (let i = 0; i < migratedLovsListAr.length; i++) {
      if (lovsListAr.includes(migratedLovsListAr[i])) {
        respDiv.innerHTML += `<font color="green">Value : <b>${migratedLovsListAr[i]}</b> is Valid LOVs Data</font><br>`;
      } else {
        respDiv.innerHTML += `<font color="red">Value : <b>${migratedLovsListAr[i]}</b> is Invalid LOVs Data</font><br>`;
        this.invalidLovs.push(migratedLovsListAr[i]);
        this.isValid = false;
      }
    }
  }

}
