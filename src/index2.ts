/** 기존 index.ts 파일 =>  #7 Blockchain Creating a Block을 위해 2로 변경*/

class Human {
    
    public name: string;
    public age: number;
    public gender: string;

    constructor(name: string, age: number, gender?: string){
        this.name = name;
        this.age = age;
        this.gender = gender;
    }
}

const lynn = new Human("lynn", 223, "female");

/*
interface Human {
    name:string,
    age:number,
    gender:string
}
*/

const person = {
    name: "nicolas",
    age: 223,
    gender: "male"
}

const sayHi = (person:Human): string => {
    return `Hello ${person.name}, you are ${person.age}, you are ${person.gender}!`;
    // return true; => return이 없기 때문에(void) 에러 발생
}  

/*
    1. 변수 타임의 인자 설정
    const sayHi = (name:string, age:number, gender:string): string => {
        return `Hello ${name}, you are ${age}, you are ${gender}!`;
        // return true; => return이 없기 때문에(void) 에러 발생
    }   
*/

/*
    1. 
    실행한 함수의 ?가 붙지 않은 인자가 부족한 경우: 에러 발생
    실행한 함수의 ?가 붙은 인자가 부족한 경우: 에러 없이 undefined로 실행

    예시) 
    const sayHi = (name, age, gender?) => {
        console.log(`Hello ${name}, you are ${age}, you are ${gender}`);
    }
    sayHi(name, age);

    2.
    함수 인자 타입을 설정할 수 있으며, 함수를 호출했을 때 입력한 타입이 다른 경우 에러 발생
    ex) age: string ==> age자리에 그냥 444를 넣으면 에러 발생 

    3.
    함수의 return 타입도 설정 가능
    내가 void로 입력했는데 return boolean 해버리면 에러 발생
*/

//console.log(sayHi("Nicolas", 444, "male or female22"));
console.log(sayHi(person));
console.log(sayHi(lynn));

export {}; // 이 파일이 모듈이 된다는 걸 이해시키기 위해 삽입 필요