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

  eulerV: any = '';
  eulerVisible: any = '';
  

  superior: any = false;

  operatorArray: any = [['+', '-', '*', '/', '%', '**'],['√','π','euler','eulerAlone'],['ac','c']];

  history: any = [];
  historyAnswer: any = [];
  VisibleHistory: string = '';


  operator: any = null;

  VisibleNum: string = '0';

  firstNum: any = null;

  num: number = 0;

  isc: any = false;

  iscomma: any = false;

  new: any = false;
  
  click(val: any){
    if(!isNaN(val)){
      this.putNumber(val);
    } else if(this.operatorArray[0].includes(val)){
      if(val === '%'){
        this.addp()
      } else{
        this.addOperator(val);
      }
    } else if(this.operatorArray[1].includes(val)){
      if(val === 'π'){
        this.putNumber('3.14');
      }else if(val === 'euler') {
        this.euler()
      } else if(val === 'eulerAlone'){
        this.putNumber('2.718')
      } else {
        this.Special()
      }
    } else if(val === '='){
      if(this.firstNum !== null && this.operator !== null){
        this.calcular()
      }
      this.operator = null;
    } else if(this.operatorArray[2].includes(val)) {
      if(val == this.operatorArray[2][0]){
        this.VisibleNum = '0';
        this.firstNum = null;
        this.operator = null;
        this.VisibleHistory = '';
        this.eulerVisible = '';
      } else {
        if(this.VisibleHistory !== ''){
          this.VisibleNum = '0';
          this.firstNum = null;
          this.operator = null;
          this.VisibleHistory = '';
          this.eulerVisible = '';
        }else{
          this.VisibleNum = '0';
          this.isc = false;
        }
      }
    } else if(val === 'W') {
      if(this.superior === true){
        this.superior = false; 
      } else  {
        this.superior = true;
      }
      console.log(this.history)
      console.log(this.historyAnswer)
    } else if(val === ',') {
      this.addcomma()
    } else {
      if(this.num !== 0){
        this.history[this.num] = `${this.firstNum} ${this.operator} ${this.VisibleNum} `;
        this.VisibleHistory = `${this.history[this.num-1]} =`;
        this.firstNum = this.historyAnswer[this.num-1];
        this.VisibleNum = this.firstNum.toString();
      } else {
        console.log("There isnt")
      }
    }
  }

  euler(){
    this.firstNum = parseFloat('2.718');
    this.operator = '**';
    this.eulerVisible = 'e^(';
    this.iscomma = false;
    this.new = true;
    this.VisibleHistory = `${this.eulerVisible}`;
  }

  Special(){
    this.iscomma = false;
    // const para o percentual da valor do VisibleNum (VisiblePercentualValue) :) 
    const Vispval = Math.sqrt(parseInt(this.VisibleNum, 0));
    this.VisibleHistory = `√${this.VisibleNum} =`;
    this.VisibleNum = Vispval.toString();
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
    console.log(op, this.firstNum, this.VisibleNum);
    this.iscomma = false;
    this.operator = op;
    this.new = true;
    this.VisibleHistory = `${this.firstNum} ${this.operator}`;
  }

  calcular(){
    if(this.eulerVisible === ''){
      this.history[this.num] = `${this.firstNum} ${this.operator} ${this.VisibleNum} `;
      this.VisibleHistory = `${this.firstNum} ${this.operator} ${this.VisibleNum} =`;
      this.historyAnswer[this.num] = eval(this.history[this.num]);
      this.firstNum = this.historyAnswer[this.num];
      this.VisibleNum = this.firstNum.toString();
      this.num++;
    } else {
      this.history[this.num] = `${this.firstNum} ${this.operator} ${this.VisibleNum} `;
      this.VisibleHistory = `${this.eulerVisible} ${this.VisibleNum} ) =`;
      this.historyAnswer[this.num] = eval(this.history[this.num]);
      this.firstNum = this.historyAnswer[this.num];
      this.VisibleNum = this.firstNum.toString();
      this.num++;
    }
  }

  addcomma(){
    if(this.iscomma === false){
      this.iscomma = true;
    } else {
      this.iscomma = false;
    }
  }
}
