import { Component, OnInit, Inject, Input } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Texto } from '../Texto';
import { DialogData } from './dialog-data';


@Component({
  selector: 'simple-dialog',
  templateUrl: './simpledialog.component.html',
  styleUrls: ['./simpledialog.component.scss']
})
export class SimpleDialogComponent implements OnInit {



  constructor(
    public dialogRef: MatDialogRef<SimpleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:DialogData,
  ){}


  onNoClick(): void {
    this.dialogRef.close("NO");
  }

  onYesClick(){
    if(this.data.has_input){
      this.dialogRef.close(this.data.input_value);
    }else{
      this.dialogRef.close("YES");
    }
    
  }

  ngOnInit() {
    this.dialogRef.disableClose = true;
  }

}