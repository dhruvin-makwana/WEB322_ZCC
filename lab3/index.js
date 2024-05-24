class Job {
  #name;
  #age;
  #occupation;

  constructor(setName = "", setAge = 0) {
    this.#name = setName;
    this.#age = setAge;
  }

  outputNameDelay() {
    setTimeout(() => console.log(this.#name), 1000);
  }

  set name(newName) {
    this.#name = newName;
  }

  set age(newAge) {
    this.#age = newAge;
  }

  get name() {
    return this.#name;
  }

  get age() {
    return this.#age;
  }
}

class Architect extends Job {
  currentSite;
  constructor(name, age, currentSite) {
    super(name, age);
    this.currentSite = currentSite;
  }

  constructThings() {
    console.log(`My name is ${this.name} and I am at ${this.currentSite}. `);
  }
}
// let job1 = new Job("SmapleJob", 1);
// job1.outputNameDelay();

let architect = new Architect("John", 34, "Toronto");
architect.constructThings();
