function Dog(name, age, color){
    this.name = name;
    this.age = age;
    this.color = color;

    this.bark = function(){
        console.log("BARK BARK");
    }
}

class Cat{
    constructor(name, age, color){
        this.name = name;
        this.age = age;
        this.color = color;
    }

    meow(){
        console.log("MEOW MEOW");
    }
}

function testObjects(){
        //Object Literal
    let dog1 = {
        name: "Spikey",
        age: 2,
        color: "Black"
    }

    let dog2 = {
        name: "Violet",
        age: 4
    }
    console.log("OBJECT LITERAL", dog1, dog2);

        //Object Constructor
    let dog3 = new Dog("Pluto", 6, "White");
    let dog4 = new Dog("Scooby", 8, "Brown");
    console.log("OBJECT CONSTRUCTOR", dog3, dog4, dog3.name);
    dog3.bark();

        //Classes
    let cat1 = new Cat("Mittens", 1, "Gray");
    let cat2 = new Cat("Tom", 3, "Golden");
    console.log("CLASSES", cat1, cat2, cat1.name);
    cat1.meow();
}

function runTests(){
    console.log("----- TESTS -----");
    testObjects();
}