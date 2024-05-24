class Person {
  name;
  age;
  email;
  #sin;
  address;
  constructor(name, age, email, sin, address) {
    this.name = name;
    this.age = age;
    this.email = email;
    this.#sin = String(sin).padStart(10, '0');
    this.address = address;
  }
  printWithSin() {
    console.log(`
    Name: ${this.name} 
    Email: ${this.email}
    Address: ${this.address}
    Sin: ${this.#sin}
    `);
  }
  print() {
    console.log(`
    Name: ${this.name} 
    Email: ${this.email}
    Address: ${this.address}
    Sin: ${this.sin}
    `);
  }
  updateSin(val){
    this.#sin=val
  }
  set sin(val){
    this.#sin=String(val).padStart(10, '0');
  }
  get sin() {
    return "XXXXX";
  }
}

class Child extends Person {
  constructor(name, age, email, sin, address) {
    super(name, age, email, sin, address);
  }
  printSinOnly() {
    console.log(`from child ${this.sin}`);
  }
}

let p1 = new Person("John", 23, "test@test.com",null, "123 abd xyz");
p1.print();
console.log(p1.sin)
p1.printWithSin()
p1.sin=98765
p1.updateSin(98765)
p1.printWithSin()
// let c1=new Child("Doe",23,"test@test.com",234234,"123 abd xyz")
// c1.printSinOnly()
