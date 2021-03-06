---
title: Learn Python, PHP, Ruby and Javascript in one Blog Post
date: "2021-01-30"
author: "Alex Merced"
category: "other languages"
bannerImage: "/images/postbanner/2021/python-php-ruby-js.png"
tags:
  - python
  - php
  - ruby
  - javascript
---

## Getting Started

Below we will have the patterns for all the main programming concepts in four different languages. To try them out head over the website, repl.it and create a free environment to practice in these languages.

We will follow the process you should always follow when learning a new language:

1. Learn how to print values to the console
2. Learn how to assign variables
3. Conditionals
4. Loops
5. Collections
6. Functions

After these building blocks, you'll be able to begin pushing yourself further and do challenges on websites like CodeWars.com.

## Printing Values to the Console

You will generally interact with a programming language via your command line shell (Bash on mac/linux, cmd/powershell/gitBash on windows). So once you have any of these languages on your computer you'll write files and run them with a command. We can't see what our code is doing visually beyond occasionally printing values to the console to assure us the program is following our instructions.

| Language   | File Extension | run script command | Pkg Mgr  | Dep List         |
| ---------- | -------------- | ------------------ | -------- | ---------------- |
| Javascript | .js            | node file.js       | npm      | package.json     |
| Python     | .py            | python file.py     | pip      | requirements.txt |
| Ruby       | .rb            | ruby file.rb       | Gems     | Gemfile          |
| PHP        | .php           | php file.php       | composer | composer.json    |

This is why the first program you always create is, Hello World.

### Javascript (using NodeJS)

```js
console.log("Hello World");
```

### Ruby

```ruby
puts "hello world"
```

### Python

```python
print("Hello World")
```

### PHP

```php
<?php

echo "hello world";
?>
```

## Variables

Programming is all about creating dynamic code. There are often values we may not know or may change overtime. Instead of hard coding these values and making our code more rigid we use variables to store and refer to the values in our code.

There are different types of data:

1. Numbers - numerical data that can be used in math expressions
2. Strings - a sequence of letters, text, and symbols usually within quotation marks
3. Booleans - a value that can either represent true or false
4. nothing - the absence of value called null, nil, undefined, etc.

We can store these values in little cubby holes called variables we can then use to refer to the value.

### Javascript (using NodeJS)

```js
let myString = "Hello World";
let myNumber = 5;
let myBool = true;

console.log(myString);
console.log(myNumber);
console.log(myBool);
```

### Ruby

```ruby
my_string = "Hello World"
my_number = 5
my_boolean = true

puts my_string
puts my_number
puts my_boolean
```

### Python

```python
my_string = "Hello World"
my_number = 5
my_boolean = True

print(my_string)
print(my_number)
print(my_boolean)
```

### PHP

```php
<?php

$my_string = "Hello World";
$my_number = 5;
$my_boolean = true;

echo $my_string;
echo $my_number;
echo $my_boolean;
?>
```

## Conditionals

What makes a script useful isn't just being able to outline a sequence of actions but having those actions alter based on the state of the data involved. If statements allow us to ask, is this true? Then choose what our script does based on whether it is true or false.

### Javascript (using NodeJS)

```js
let number = 6;

if (number > 5) {
  console.log(true);
} else {
  console.log(false);
}
```

### Ruby

```ruby
number = 6

if number > 5
    puts true
else
    puts false
end
```

### Python

```python
number = 6

if (number > 5):
    print(True)
else:
    print(False)
```

### PHP

```php
<?php
$number = 6

if ($number > 5){
    echo true;
} else {
    echo false;
}
?>
```

## Loops

What if you need to repeat a task several times, it would be very tedious to type it over and over again. For this situation, we have loops that will repeat a set of instructions as long as an expression is true and stop once it becomes false.

### Javascript (using NodeJS)

```js
let counter = 0;

while (count < 10) {
  console.log(count);
  count = count + 1;
}
```

### Ruby

```ruby
counter = 0

while counter < 10
    puts counter
    counter = counter + 1
end
```

### Python

```python
counter = 0

while (counter < 10):
    print(counter)
    counter = counter + 1
```

### PHP

```php
<?php
$counter = 0;

while($counter < 10){
    echo counter;
    $counter = $counter + 1
}
?>
```

## Collections

A Collection is a data structure in a language that can hold multiple values. They generally fall into one of two categories.

- An ordered list of values accessibly by a numerical index starting at 0
- A list of values access by a "key" which is usually a string/symbol

| Language   | Using Numerical Index | Using Keys         |
| ---------- | --------------------- | ------------------ |
| Javascript | Arrays                | Objects            |
| Ruby       | Arrays                | Hashes             |
| Python     | List                  | Dictionaries       |
| PHP        | Arrays                | Associative Arrays |

### Javascript (using NodeJS)

```js
let myArray = ["Alex Merced", 35];
console.log(myArray[0]);
console.log(myArray[1]);

let myObject = { name: "Alex Merced", age: 35 };
console.log(myObject.name);
console.log(myObject.age);
```

### Ruby

```ruby
my_array = ["Alex Merced", 35]
puts my_array[0]
puts my_array[1]

my_hash = {name: "Alex Merced", age: 35}
puts my_hash[:name]
puts my_hash[:age]
```

### Python

```python
my_list = ["Alex Merced", 35]
print(my_list[0])
print(my_list[1])

my_dictionary = {"name": "Alex Merced", "age": 35}
print(my_dictionary["name"])
print(my_dictionary["age"])
```

### PHP

```php
<?php
$my_array = ["Alex Merced", 35];
echo $my_array[0];
echo $my_array[1];

$my_associative = ["name" => "Alex Merced", "age" => 35];
echo $my_associative["name"];
echo $my_associative["age"];
?>
```

## Functions

Functions are like magical spells, they do a specified thing and be used anytime and as many times as you want. Information can be given to functions in the form of arguments, and those arguments are stored in variables called parameters. Functions are key to doing powerful things in programming.

### Javascript (using NodeJS)

```js
// x is parameter variable that will receive the first argument
function addOne(x) {
  //the return value is what the function gives back when its done
  return x + 1;
}

//Several invocations of the function passing different arguments
const result1 = addOne(1);
console.log(result1);

const result2 = addOne(2);
console.log(result2);
```

### Ruby

```ruby
def addOne x
    return x + 1
end

result1 = addOne 1
puts result1

result2 = addOne 2
puts result2
```

### Python

```python
def addOne(x):
    return x + 1

result1 = addOne(1)
print(result1)

result2 = addOne(2)
print(result2)
```

### PHP

```php
<?php
function addOne(x){
    return x + 1;
}

$result1 = addOne(1);
echo $result1;

$result2 = addOne(2);
echo $result2;

?>
```

## Conclusion

Hopefully, this gives you a nice starting place in any of these languages. Here are some topics to look up and try out as you grow your ability in these languages.

- string manipulation (concatenation, interpolation, etc.)
- array/list manipulation (adding, removing, finding items)
- classes and object-oriented programing

Then once you get really comfortable with any of the languages try building a web application with a web framework. These come in minimalist and opinionated flavors. Below is a table showing you the main frameworks for each language.

| Language   | Minimalist Web Framework | Opinionated Web Framework |
| ---------- | ------------------------ | ------------------------- |
| Python     | Flask, FastAPI           | Django, Masonite          |
| Ruby       | Sinatra                  | Ruby on Rails             |
| PHP        | Slim                     | Laravel, Symphony         |
| Javascript | Express, Koa, Fastify    | FoalTS, NestJS, Sails     |
