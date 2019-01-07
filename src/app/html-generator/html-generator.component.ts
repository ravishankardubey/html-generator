import { Component, OnInit } from '@angular/core';
import { NgxXml2jsonService } from 'ngx-xml2json';

@Component({
  selector: 'app-html-generator',
  templateUrl: './html-generator.component.html',
  styleUrls: ['./html-generator.component.css']
})
export class HtmlGeneratorComponent implements OnInit {

  constructor(
    private ngxXml2jsonService: NgxXml2jsonService
  ) { }

  xmlInputValue = '';
  htmlOutputValue = '';
  jsonOutputValue;
  reavtiveFormValue;

  ngOnInit() {
  }

  getHTMLFromXML() {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(this.xmlInputValue, 'text/xml');
    const obj = this.ngxXml2jsonService.xmlToJson(xmlDoc);
    this.jsonOutputValue = obj['productConfig'].field;
    const str = JSON.stringify(this.jsonOutputValue);
    const strReplaced = str.replace(/@attributes/g, 'attributes');
    this.jsonOutputValue = JSON.parse(strReplaced);
    console.log(this.jsonOutputValue);

    this.htmlOutputValue = ``;

    this.generateHTML(this.jsonOutputValue);

    this.reavtiveFormValue = ``;
    this.reavtiveFormValue += `
    const productConfigReactiveForm: FormGroup = new FormGroup({
    `;
    this.generateReactiveForm(this.jsonOutputValue);
    this.reavtiveFormValue += `});`;
  }

  generateHTML(fieldList) {

    for (const field of fieldList) {
      if (field.attributes.maxOccurance) {
        if (field.attributes.tab) {

          this.htmlOutputValue += `
          <div class="tab-container margin-20px" formArrayName="${field.attributes.name}">
          <h4 class="secondary-heading uppercase tab-header">${this.createLabel(field.attributes.name)}</h4>
          <div class="tabs-div">
            <button class="left-scroll">
              <span class="glyphicon-menu-left glyphicon"></span>
            </button>
            <ul class="nav nav-tabs tabs-list truncate-text">
              <li class="active">
                <a class="hovered-tab" class="red-text" data-toggle="tab">Tab
                  <button class="tab-remove-btn">
                    <span class="glyphicon glyphicon-remove-circle"></span>
                  </button>
                </a>
              </li>
            </ul>
            <button class="right-scroll">
              <span class="glyphicon-menu-right glyphicon"></span>
            </button>
          </div>
          <div class="tab-content">
          <div class="access-info access-info-tab tab-pane fade in active">
          <div class="width-100-full">
            <div class="section-container width-100-full bg-white">`;
          this.generateHTML(field.field);
          this.htmlOutputValue += ` </div></div></div></div></div>`;

        } else if (field.field.length) {
          this.htmlOutputValue += `
            <div class="section-container width-100 bg-grey padding-20">
              <h2 class="secondary-heading uppercase margin-1">${this.createLabel(field.attributes.name)}</h2>`;
          this.generateHTML(field.field);
          this.htmlOutputValue += `</div>`;
        } else {
          this.htmlOutputValue += `
          <div class="section-container width-100 bg-grey padding-20">
            <h2 class="secondary-heading uppercase margin-1">${this.createLabel(field.attributes.name)}</h2>`;
          this.createHTMLElements(field.field);
          this.htmlOutputValue += `</div>`;
        }
      } else {
        this.createHTMLElements(field);

      }

    }
  }

  createHTMLElements(field) {
    const type = field.attributes.type.toUpperCase();
    const req = field.attributes.required.toUpperCase();

    if ((type === 'STRING' || type === 'INTEGER') && req === 'FALSE') {
      this.htmlOutputValue += `
      <div class="width-25">
        <label class="config-label uppercase">${this.createLabel(field.attributes.name)}
        </label>
        <input class="config-input" formControlName="${field.attributes.name}" type="text" maxLength="${field.attributes.size}">
        <app-show-error [control]="productConfigForm['controls'].${field.attributes.name}"></app-show-error>
      </div>\n`;
    } else if ((type === 'STRING' || type === 'INTEGER') && req === 'TRUE') {
      this.htmlOutputValue += `
      <div class="width-25">
        <label class="config-label uppercase">${this.createLabel(field.attributes.name)}
          <span *ngIf="productConfigForm.get('${field.attributes.name}')?.validator('')?.required" class="mandatory-asterik">*</span>
        </label>
        <input class="config-input" formControlName="${field.attributes.name}" type="text" maxLength="${field.attributes.size}">
        <app-show-error [control]="productConfigForm['controls'].${field.attributes.name}"></app-show-error>
      </div>\n`;
    } else if (type === 'BOOLEAN' && req === 'FALSE') {
      this.htmlOutputValue += `
      <div class="width-25">
        <label class="config-label uppercase">${this.createLabel(field.attributes.name)}
        </label>
        <div class="onoffswitch1">
          <input class="onoffswitch1-checkbox" formControlName="${field.attributes.name}" type="checkbox" id="${field.attributes.name}">
          <label class="onoffswitch1-label" for="${field.attributes.name}">
           <span class="onoffswitch1-inner"></span>
           <span class="onoffswitch1-switch"></span>
         </label>
        </div>
        <app-show-error [control]="productConfigForm['controls'].${field.attributes.name}"></app-show-error>
      </div>\n`;
    } else if (type === 'BOOLEAN' && req === 'TRUE') {
      this.htmlOutputValue += `
      <div class="width-25">
        <label class="config-label uppercase">${this.createLabel(field.attributes.name)}
          <span *ngIf="productConfigForm.get('${field.attributes.name}')?.validator('')?.required" class="mandatory-asterik">*</span>
        </label>
        <div class="onoffswitch1">
          <input class="onoffswitch1-checkbox" formControlName="${field.attributes.name}" type="checkbox" id="${field.attributes.name}">
          <label class="onoffswitch1-label" for="${field.attributes.name}">
           <span class="onoffswitch1-inner"></span>
           <span class="onoffswitch1-switch"></span>
         </label>
        </div>
        <app-show-error [control]="productConfigForm['controls'].${field.attributes.name}"></app-show-error>
      </div>\n`;
    }
  }

  createLabel(key) {
    const splitNumber = key.match(/[0-9]+|[a-z|A-Z]+/g).join('-');    /* genAttr5 --> genAttr-25 */
    const label = splitNumber.match(/[A-Z]+[^A-Z]*|[^A-Z]+/g).join(' ');    /* genAttr-25 --> gen Attr-25 */
    return label;
  }

  generateReactiveForm(fieldList) {
    for (const field of fieldList) {
      if (field.attributes.maxOccurance) {
        if (field.field.length) {
          this.reavtiveFormValue += `\n'${field.attributes.name}': new FormArray([
            new FormGroup({`;
          this.generateReactiveForm(field.field);
          this.reavtiveFormValue += `})\n]),\n`;
        } else {
          this.reavtiveFormValue += `\n'${field.attributes.name}': new FormArray([
            new FormGroup({`;
          this.createFormControl(field.field);
          this.reavtiveFormValue += `})\n]),\n`;
        }
      } else {
        this.createFormControl(field);
      }

    }
  }

  createFormControl(field) {
    const type = field.attributes.type.toUpperCase();
    const req = field.attributes.required.toUpperCase();
    if (type === 'STRING' && req === 'FALSE') {

      this.reavtiveFormValue += `
        '${field.attributes.name}': new FormControl(data.${field.attributes.name} || '' ),`;

    } else if (type === 'STRING' && req === 'TRUE') {

      this.reavtiveFormValue += `
        '${field.attributes.name}': new FormControl(data.${field.attributes.name} || '', [Validators.required]),`;

    } else if (type === 'INTEGER' && req === 'FALSE') {

      this.reavtiveFormValue += `
        '${field.attributes.name}': new FormControl(data.${field.attributes.name} || '', [Validators.pattern('^[0-9]*$')]),`;

    } else if (type === 'INTEGER' && req === 'TRUE') {

      this.reavtiveFormValue += `
        '${field.attributes.name}': new FormControl(data.${field.attributes.name} || '',
        [Validators.required], [Validators.pattern('^[0-9]*$')]),`;

    } else if (type === 'BOOLEAN' && req === 'FALSE') {

      this.reavtiveFormValue += `
        '${field.attributes.name}': new FormControl(data.${field.attributes.name} || false ),`;

    } else if (type === 'BOOLEAN' && req === 'TRUE') {

      this.reavtiveFormValue += `
        '${field.attributes.name}': new FormControl(data.${field.attributes.name} || false, [Validators.required] ),`;

    }
  }



}
