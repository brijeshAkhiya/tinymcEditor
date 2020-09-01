import { Component } from '@angular/core';
import papa from 'papaparse';
import tinymce from '../../node_modules/tinymce';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'editor';
  constructor() { }
  public myConf = {
    apiKey: 'nvsvq45tb1esljm07di11pexcy4yw6k92weffmri4j6b1hnf',
    selector: 'textarea',
    height: 500,
    menubar: true,
    setup(editor) {
      editor.ui.registry.addButton('InsertImage', {
        text: 'Insert .csv file',
        icon: 'Upload',
        onAction() {
          const input = document.createElement('input');
          input.setAttribute('type', 'file');
          input.click();
          input.onchange = (event) => {
            console.log();
            const eve: any = event.composedPath();
            const type = eve[0].files[0].type.split('/');
            if (type[1] !== 'csv') {
              alert('Please enter a csv file');
            } else {
              const reader = new FileReader();
              reader.readAsDataURL(eve[0].files[0]);
              const promise = new Promise((resolve, reject) => {
                input.setAttribute('value', eve[0].files[0]);
                const table = document.createElement('table');
                papa.parse(eve[0].files[0], {
                  complete(results) {
                    results.data.forEach((element, index) => {
                      const row = table.insertRow(-1);
                      element.forEach((ele, i) => {
                        const cell = row.insertCell(-1);
                        cell.innerHTML = ele;
                      });
                    });
                  }
                });
                if (table) {
                  tinymce.activeEditor.dom.add(tinymce.activeEditor.getBody(), 'div', { title: 'my title' }, table);
                  resolve();
                } else {
                  reject();
                }
              });
              promise.then(() => {
                console.log('Data Loaded');
              })
                .catch((error) => {
                  console.log('Error Found', error);
                })
                .finally(() => {
                  console.log('Everything workin properly');
                });
            }

          };
        }
      });
    },
    plugins: [
      'advlist autolink lists link image charmap print preview anchor',
      'searchreplace visualblocks code fullscreen',
      'insertdatetime media table paste code help wordcount code table'
    ],
    toolbar: 'formatselect | bold italic | bullist numlist | blockquote align | \
    strikethrough hr forecolor | pastetext removeformat charmap | undo redo |  \
    indent outdent | InsertImage | table | help',
  };
}
