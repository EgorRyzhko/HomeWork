//Генератор
function* pow(a, b) {
	console.log('Результат генератора:');
	let result = a;
	while(b != 1) {
		yield result *= a;
		b--;
	}
	return result;
}

let genPow = pow(2, 3)
console.log(genPow.next().value);
console.log(genPow.next().value);
console.log(genPow.next().value);
console.log(genPow.next().value);

//1-й итератор
function fib() {
	console.log('Результат 1-го итератора:');
	let fib1 = 1;
	let fib2 = 1;
	return {
		next: function() {
			let current = fib1;
			fib1 = fib2;
			fib2 += current;
			return { 
				value: current,
				done: false
				};
		}
	}
} 

let fibIter = fib();

for (let i = 0; i < 7; i++) {
	console.log(fibIter.next().value);
}

//2-й итератор
function factorialIter(a) {
	console.log('Результат 2-го итератора:');
	let factorial = {
		num: a
	}

	factorial[Symbol.iterator] = function() {

		let res = 1;
		let last = this.num;
		let counter = 1;

		return {
			next() {
				if (counter <= a) {
					res *= counter;
					counter++;
					return {
						done: false,
						value: `${counter-1}: ${res}`
					};				
				} 	else {
						return {
							done: true
						};
					}
			}
		}
	};
	for (let num of factorial) {
		console.log(num);
	}
}

factorialIter(5);

//Mix-ins
class Person{
	constructor(firstName, lastName) {
		this.firstName = firstName;
		this.lastName = lastName;
	}

	get fullName() {
		return `${firstName} ${lastName}`;
	}
	set fullName(newFullName) {
		[this.firstName, this.lastName] = newFullName.split(' ');
	}
	mixins() {
		console.log('Пример использования Mix-ins:');
	}
	sayHi() {
		console.log(`Hello, my name is ${this.firstName} ${this.lastName}`);
	}
}

//1-й Mix-in
const Student = Sup => class extends Sup {
	checking() {
		console.log('Из наследника Student.');
	}
};

//2-й Mix-in
const Expansion = Sup => class extends Sup {
	checkingFromExp() {
		console.log('Из наследника Expansion.');
	}
};

class Mixins extends Expansion(Student(Person)){
	checkingFromMixin() {
		console.log('Из наследника Mixin.');
	}
}

let test = new Mixins();
test.mixins();
test.fullName = 'Egor Ryzhko';
test.sayHi();
test.checking();
test.checkingFromExp();
test.checkingFromMixin();

//Локализация даты
console.log("Локализация даты:");
console.log(new Intl.DateTimeFormat().format(new Date()));
console.log(new Intl.DateTimeFormat('th-TH-u-nu-thai').format(new Date()));
console.log(new Intl.DateTimeFormat('en-GB').format(new Date()));
console.log(new Intl.DateTimeFormat('zh-Hans-CN').format(new Date()));