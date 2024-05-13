/**
 * 
 * @param a 첫 번째 숫자
 * @param b 두 번째 숫자
 * @returns 
 */



function sum (a: number, b: number) {
    return a+b;
}

let total = sum(10, 20);
total.toFixed(2)

;

let myName : any = 'saelip';
myName = 100;
let myAge : any = 20;

let empty : null = null;
let nothingAssigned : undefined;


function sayMyName(firstName: string, lastName?:string):string {
    return 'myName:' + firstName + '' + lastName
}

sayMyName('Captain'); // my name : Captain

interface User {
    name:string;
    age: number;
}

let seho:User = {name: 'saelip', age: 29}; 
// let seho2: User = {name: '새잎', age: 29, hobby:'game'};

interface Peson {
    name:string;
    age: number;
}


function logAge(someone : Peson) {
    console.log(someone.age);
}

let Captain = {name:'saelip', age: 29};
let captain = {name:'sayho'};

logAge(Captain); // 29
//logAge(captain); // age 속성이 Person 형식에서 필수입니다

function getPerson(someone:Peson) : Peson {
    return someone;
}

let hulk = getPerson({name:'hulk', age: 30});



interface Person2 {
    name:string;
    age: number;
    power:boolean;
}

interface Developer extends Person2 {
    skill:string;
}

let hero : Developer = {
    name : 'ironman',
    age: 30,
    power : true,
    skill: 'make'
   
}

interface StringArray {
    [index:number]:string

}

let companies : StringArray = ['삼성', '네이버', '구글'];
companies[0]; // 삼성
companies[1]; // 네이버

interface SalaryMap {
    [level:string] : number
}

let salary :SalaryMap ={
    junior: 100
};
let momey = salary['junior'];

let money = salary.junior;




