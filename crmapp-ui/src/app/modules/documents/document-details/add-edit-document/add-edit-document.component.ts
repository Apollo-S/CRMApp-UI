import {Component, Input, OnInit} from '@angular/core';
import {Document} from "../../../../models/Document";

@Component({
  selector: 'app-add-edit-document',
  templateUrl: './add-edit-document.component.html',
  styleUrls: ['./add-edit-document.component.css']
})
export class AddEditDocumentComponent implements OnInit {

  @Input() document: Document;
  @Input() loadingState: boolean;

  constructor() { }

  ngOnInit() {
  }

}
