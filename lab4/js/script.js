// ЗАВДАННЯ 1
console.log("--- ЗАВДАННЯ 1 ---");

const myString = "Привіт, ХАІ";
const myNumber = 42;
const myBoolean = true;
const myNull = null;
const myUndefined = undefined;
const mySymbol = Symbol("id");
const myBigInt = 9007199254740991n;

console.log("1. Примітивні типи:");
console.log(`Значення: ${myString}, Тип: ${typeof myString}`);
console.log(`Значення: ${myNumber}, Тип: ${typeof myNumber}`);
console.log(`Значення: ${myBoolean}, Тип: ${typeof myBoolean}`);
console.log(`Значення: ${myNull}, Тип: ${typeof myNull}`);
console.log(`Значення: ${myUndefined}, Тип: ${typeof myUndefined}`);
console.log(`Значення: Symbol, Тип: ${typeof mySymbol}`);
console.log(`Значення: ${myBigInt}, Тип: ${typeof myBigInt}`);

console.log("\n2. Явне перетворення типів:");

console.log(`String(100): ${String(100)}`);
console.log(`String(true): ${String(true)}`);

console.log(`Number("123"): ${Number("123")}`);
console.log(`Number(""): ${Number("")}`);
console.log(`Number(true): ${Number(true)}`);
console.log(`Number(false): ${Number(false)}`);
console.log(`Number(null): ${Number(null)}`);
console.log(`Number(undefined): ${Number(undefined)}`);

console.log("Falsy значення:");
console.log(`Boolean(0): ${Boolean(0)}`);
console.log(`Boolean(""): ${Boolean("")}`);
console.log(`Boolean(null): ${Boolean(null)}`);
console.log(`Boolean(undefined): ${Boolean(undefined)}`);
console.log(`Boolean(NaN): ${Boolean(NaN)}`);

console.log("Truthy значення:");
console.log(`Boolean("0"): ${Boolean("0")}`);
console.log(`Boolean([]): ${Boolean([])}`);

const name = "Антон";
const age = 20;
const university = "ХАІ";
console.log(`\n3. Шаблонний рядок: Студент: ${name}, вік: ${age}, університет: ${university}`);

console.log("\n4. Порівняння == та ===:");
console.log(`5 == "5": ${5 == "5"}`);
console.log(`5 === "5": ${5 === "5"}`); 
console.log(`null == undefined: ${null == undefined}`);
console.log(`null === undefined: ${null === undefined}`);
console.log(`0 == false: ${0 == false}`);


// ЗАВДАННЯ 2
console.log("\n--- ЗАВДАННЯ 2 ---");

function getGrade(score) {
    if (typeof score !== 'number' || score < 0 || score > 100) {
        return "невалідний бал";
    }

    if (score >= 90 && score <= 100) {
        return "відмінно";
    } else if (score >= 75) {
        return "добре";
    } else if (score >= 60) {
        return "задовільно";
    } else {
        return "незадовільно";
    }
}

function getSeasonUA(month) {
    switch (month) {
        case 12: case 1: case 2:
            return "зима";
        case 3: case 4: case 5:
            return "весна";
        case 6: case 7: case 8:
            return "літо";
        case 9: case 10: case 11:
            return "осінь";
        default:
            return "невалідний номер місяця";
    }
}

const studentAge = 19;
const status = studentAge >= 18 ? "повнолітній" : "неповнолітній";

console.log("Демонстрація getGrade:");
console.log(getGrade(95));
console.log(getGrade(80)); 
console.log(getGrade(-5)); 
console.log(getGrade("90"));

console.log("\nДемонстрація getSeasonUA:");
console.log(getSeasonUA(1));
console.log(getSeasonUA(6));
console.log(getSeasonUA(13));

console.log("\nДемонстрація тернарного оператора:");
console.log(`Вік: ${studentAge}, Статус: ${status}`);


// ЗАВДАННЯ 3
console.log("\n--- ЗАВДАННЯ 3: МАСИВИ ---");

let students = [
    { name: "Олена Коваленко", grade: 87, courses: ["JavaScript", "HTML", "CSS"] },
    { name: "Ігор Петренко", grade: 55, courses: ["Python", "C++"] },
    { name: "Марія Сидоренко", grade: 92, courses: ["JavaScript", "React"] },
    { name: "Олег Іванов", grade: 78, courses: ["HTML", "Graphic Design"] },
    { name: "Анна Мельник", grade: 64, courses: ["JavaScript", "Node.js"] },
    { name: "Віктор Мороз", grade: 45, courses: ["Java", "SQL"] }
];

console.log("Початковий масив студентів:", students);

students.push({ name: "Світлана Кравченко", grade: 98, courses: ["JavaScript", "Vue.js"] });
console.log("Після push:", students);

const removedLast = students.pop();
console.log("Після pop (видалено):", removedLast.name);

const removedMiddle = students.splice(2, 1);
console.log("Після splice (видалено з середини):", removedMiddle[0].name);

students.splice(1, 0, { name: "Дмитро Бондар", grade: 82, courses: ["PHP", "Laravel"] });
console.log("Після додавання splice на позицію 1:", students);

const topStudent = students.find(s => s.grade > 90);
console.log("Перший студент з оцінкою > 90:", topStudent);

const jsStudents = students.filter(s => s.courses.includes("JavaScript"));
console.log("Студенти курсу JavaScript:", jsStudents);

const averageGrade = students.reduce((acc, s) => acc + s.grade, 0) / students.length;
console.log(`Середня оцінка всіх студентів: ${averageGrade.toFixed(2)}`);


// ЗАВДАННЯ 4
console.log("\n--- ЗАВДАННЯ 4: ФУНКЦІЇ ---");

function getAreaDeclaration(a, b) {
    return a * b;
}

const getAreaExpression = function(a, b) {
    return a * b;
};

const getAreaArrow = (a, b) => a * b;

console.log(`Declaration: ${getAreaDeclaration(5, 10)}, Expression: ${getAreaExpression(5, 10)}, Arrow: ${getAreaArrow(5, 10)}`);

function createCounter() {
    let count = 0;
    return {
        increment() { count++; return count; },
        decrement() { count--; return count; },
        getValue() { return count; }
    };
}
const counter = createCounter();
console.log("Counter Increment:", counter.increment());
console.log("Counter Increment:", counter.increment());
console.log("Counter Decrement:", counter.decrement());
console.log("Final Value:", counter.getValue()); 

function createUser(name, role = "student", isActive = true) {
    return `Користувач: ${name}, Роль: ${role}, Активний: ${isActive}`;
}
console.log(createUser("Антон"));
console.log(createUser("Олексій", "admin", false));

const sumAll = (...numbers) => {
    return numbers.reduce((acc, n) => acc + n, 0);
};
console.log(`Сума (1, 2, 3): ${sumAll(1, 2, 3)}`);
console.log(`Сума (10, 20, 30, 40): ${sumAll(10, 20, 30, 40)}`);

function printStudentInfo({ name, grade, courses }) {
    console.log(`${name} має оцінку ${grade}. Курси: ${courses.join(", ")}`);
}

console.log("Виклик printStudentInfo для першого студента:");
printStudentInfo(students[0]);

const myNewStudent = { name: "Іван", grade: 95, courses: ["Git", "Docker"] };
printStudentInfo(myNewStudent);


// ЗАВДАННЯ 5
console.log("\n--- ЗАВДАННЯ 5: ОБ'ЄКТИ ---");

const studentProfile = {
    firstName: "Антон",
    lastName: "Смірнов",
    age: 20,
    university: "ХАІ",
    grades: { math: 85, physics: 92, programming: 98 },
    isActive: true,
    getFullName() {
        return `${this.firstName} ${this.lastName}`;
    },
    getAverageGrade() {
        const values = Object.values(this.grades);
        const sum = values.reduce((acc, g) => acc + g, 0);
        return sum / values.length;
    }
};

console.log("Доступ через крапку:", studentProfile.university);
const key = "age";
console.log("Динамічний доступ через []:", studentProfile[key]);

console.log("Keys:", Object.keys(studentProfile));
console.log("Values:", Object.values(studentProfile));
console.log("Entries:", Object.entries(studentProfile));


const updatedProfile = { ...studentProfile, isActive: false };
console.log("Оригінал (isActive):", studentProfile.isActive); 
console.log("Копія (isActive):", updatedProfile.isActive);   

const labScore = studentProfile.grades?.lab;
const mentorName = studentProfile.mentor?.name ?? "Не призначено";
console.log(`Оцінка за лабу: ${labScore}, Ментор: ${mentorName}`);


// ЗАВДАННЯ 6
console.log("\n--- ЗАВДАННЯ 6: ЛАНЦЮЖКИ МЕТОДІВ ---");

const products = [
    { name: "Ноутбук", price: 25000, category: "electronics", inStock: true, quantity: 5 },
    { name: "Мишка", price: 800, category: "electronics", inStock: true, quantity: 10 },
    { name: "Клавіатура", price: 1500, category: "electronics", inStock: false, quantity: 0 },
    { name: "Монітор", price: 7000, category: "electronics", inStock: true, quantity: 2 },
    { name: "Футболка", price: 500, category: "clothing", inStock: true, quantity: 20 },
    { name: "Джинси", price: 1200, category: "clothing", inStock: true, quantity: 15 },
    { name: "Кавоварка", price: 4000, category: "appliances", inStock: true, quantity: 3 },
    { name: "Лампа", price: 300, category: "appliances", inStock: false, quantity: 0 }
];

const totalValue = products
    .filter(p => p.inStock)
    .map(p => p.price * p.quantity)
    .reduce((acc, val) => acc + val, 0);
console.log("Загальна вартість товарів у наявності:", totalValue);

const sortedElectronics = products
    .filter(p => p.category === "electronics")
    .sort((a, b) => a.price - b.price)
    .map(p => p.name);
console.log("Електроніка за ціною:", sortedElectronics);

const categoryCount = products.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
}, {});
console.log("Кількість по категоріях:", categoryCount);

const studentsByGrade = [...students].sort((a, b) => b.grade - a.grade);
const studentsByName = [...students].sort((a, b) => a.name.localeCompare(b.name));

console.log("Студенти за оцінкою:", studentsByGrade);
console.log("Студенти за алфавітом:", studentsByName);


// ЗАВДАННЯ 7
console.log("\n--- ЗАВДАННЯ 7: РЯДКИ ---");

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
console.log(`capitalize("javaScript"): ${capitalize("javaScript")}`);

const countWords = (str) => str.trim().split(/\s+/).filter(word => word !== "").length;
console.log(`countWords(" JavaScript це круто "): ${countWords(" JavaScript це круто ")}`); // 3

const truncate = (str, maxLength) => {
    return str.length > maxLength ? str.slice(0, maxLength) + "..." : str;
};
console.log(`truncate("Це довгий текст", 10): ${truncate("Це довгий текст", 10)}`);

function isValidEmail(email) {
    const atIndex = email.indexOf("@");
    const lastAtIndex = email.lastIndexOf("@");
    const lastDotIndex = email.lastIndexOf(".");

    if (atIndex === -1 || atIndex !== lastAtIndex) return false;
    
    if (atIndex === 0) return false;
    
    if (lastDotIndex <= atIndex + 1) return false;
    
    if (email.length - 1 - lastDotIndex < 2) return false;

    return true;
}

console.log("Перевірка Email:");
console.log(`user@example.com: ${isValidEmail("user@example.com")}`);  
console.log(`invalid-email: ${isValidEmail("invalid-email")}`);
console.log(`@example.com: ${isValidEmail("@example.com")}`);        
console.log(`user@.com: ${isValidEmail("user@.com")}`);


