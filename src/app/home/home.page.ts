import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { addPlatform } from '@capacitor/core';
import { IonicModule } from '@ionic/angular';
import { first } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class HomePage {

  

  operator: any = null;

  VisibleNum: string = '0';

  firstNum: any = null;

  isc: any = false;

  iscomma: any = false;

  new: any = false;

  click(val: any){
    switch (val){
      case 'ac':
        this.VisibleNum = '0';
        this.firstNum = 0;
        this.operator = null;
        break;
      case 'c':
        this.VisibleNum = '0';
        this.isc = false;
        break;
      case '+/-':
        if(Math.sign(parseInt(this.VisibleNum, 0)) === 1){
          const sign = -Math.abs(parseInt(this.VisibleNum, 0));
        } else if(Math.sign(parseInt(this.VisibleNum, 0)) === -1){
          const sign = -Math.abs(parseInt(this.VisibleNum, 0));
        } else {
          this.VisibleNum = this.VisibleNum;
        }
        break
      case '%':
        this.addp();
        break;
      case ':':
        this.addOperator(":");
        break;
      case 'X':
        this.addOperator("X");
        break;
      case '-':
        this.addOperator("-");
        break;
      case '+':
        this.addOperator("+");
        break;
      case '=':
        if(this.firstNum !== null && this.operator !== null){
          this.calcular()
        }
        this.operator = null;
        break;
      case '0':
        this.putNumber('0');
        break;
      case '1':
        this.putNumber('1');
        break;
      case '2':
        this.putNumber('2');
        break;
      case '3':
        this.putNumber('3');
        break;
      case '4':
        this.putNumber('4');
        break;
      case '5':
        this.putNumber('5');
        break;
      case '6':
        this.putNumber('6');
        break;
      case '7':
        this.putNumber('7');
        break;
      case '8':
        this.putNumber('8');
        break;
      case '9':
        this.putNumber('9');
        break;
      case ',':
        this.addcomma();
        break;
    }
  }

  putNumber(val: string){
      if(val === '0'){
        if(this.new === true){
          this.VisibleNum = val;
          this.new = false;
        } else if(this.VisibleNum !==  '0'){
          if(this.iscomma === true){
            this.VisibleNum = `${this.VisibleNum.toString()}.${val}`;
          } else {
            this.VisibleNum = this.VisibleNum.toString() + val
          }
        } else if(this.VisibleNum === '0'){
          if(this.iscomma === true){
            this.VisibleNum = `${this.VisibleNum.toString()}.${val}`;
          }
        }
      } else {
        if(this.new === true){
          this.VisibleNum = val;
          this.new = false;
        } else if(this.VisibleNum === '0'){
          if(this.iscomma === true){
            if(this.VisibleNum.toString().indexOf('.') > -1){
              this.VisibleNum = this.VisibleNum.toString() + val
            } else {
              this.VisibleNum = `${this.VisibleNum.toString()}.${val}`;
            }
          } else {
            this.VisibleNum = val
          }
        } else {
          if(this.iscomma === true){
            if(this.VisibleNum.toString().indexOf('.') > -1){
              this.VisibleNum = this.VisibleNum.toString() + val
            } else {
              this.VisibleNum = `${this.VisibleNum.toString()}.${val}`;
            }
          } else {
            this.VisibleNum = this.VisibleNum.toString() + val
          }
        }
      }
    this.isc = true;
  }
  addp(){
    this.iscomma = false;
    // const para o percentual da valor do VisibleNum (VisiblePercentualValue) :) 
    const Vispval = parseInt(this.VisibleNum, 0) / 100;
    this.VisibleNum = Vispval.toString();
  }

  addOperator(op: string){
    if(this.new === false){
      if(this.firstNum === null){
        if(this.iscomma === true){
          this.firstNum = parseFloat(this.VisibleNum);
        } else {
          this.firstNum = parseInt(this.VisibleNum, 0);
        }
      }
      if(this.firstNum !== null && this.operator !== null){
        this.calcular();
      }
    }
    this.iscomma = false;
    this.operator = op;
    this.new = true;
  }

  calcular(){
    switch(this.operator){
      case ':':
        if(this.iscomma === true) {
          this.firstNum = (this.firstNum / parseFloat(this.VisibleNum));
        } else {
          this.firstNum = (this.firstNum / parseInt(this.VisibleNum, 0));
        }
        break;
      case 'X':
        if(this.iscomma === true) {
          this.firstNum = (this.firstNum * parseFloat(this.VisibleNum));
        } else {
          this.firstNum = (this.firstNum * parseInt(this.VisibleNum, 0));
        }
        break;
      case '-':
        if(this.iscomma === true) {
          this.firstNum = (this.firstNum - parseFloat(this.VisibleNum));
        } else {
          this.firstNum = (this.firstNum - parseInt(this.VisibleNum, 0));
        }
        break;
      case '+':
        if(this.iscomma === true) {
          this.firstNum = (this.firstNum + parseFloat(this.VisibleNum));
        } else {
          this.firstNum = (this.firstNum + parseInt(this.VisibleNum, 0));
        }
        break;
    }
    this.VisibleNum = this.firstNum.toString();
  }

  addcomma(){
    if(this.iscomma === false){
      this.iscomma = true;
    } else {
      this.iscomma = false;
    }
  }
}
