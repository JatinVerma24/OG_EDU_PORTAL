# ⭐ Unit 7: Concepts & Basics of C++ Programming 🚀

> Welcome to C++ — the advanced evolution of C! 🚀 Dive into Object-Oriented Programming with classes, objects, and inheritance. C++ combines C's power with OOP sophistication! Master modern programming paradigms! ⭐

---

## 🚀 C++ Introduction

- 📌 **C++ = C + Classes + OOP** (Object Oriented Programming)
- 🎯 **Bjarne Stroustrup** developed it in **1983**.
- 💪 Backward compatible with C — most C code runs in C++.
- ⭐ **Key Features:**
  - Classes and objects
  - Inheritance and polymorphism
  - Exception handling
  - Templates (generic programming)
  - Standard Template Library (STL)

---

## 🏛️ Classes and Objects

```cpp
class ClassName {
private:
    int rollNo;
public:
    void setRollNo(int r) { rollNo = r; }
    int  getRollNo()      { return rollNo; }
};

ClassName obj1;        // Object creation
obj1.setRollNo(101);   // Calling member function
```

- 📌 **Class** = Blueprint (groups data + functions)
- 🎯 **Object** = An instance of a class (contains actual data)
- 💡 **Difference from struct:** Class defaults to `private`, struct defaults to `public`

---

## 🔐 Access Modifiers

| Modifier    | Accessible From               |
|-------------|-------------------------------|
| `private`   | Only inside the class         |
| `public`    | Anywhere                      |
| `protected` | Inside class + derived classes |

- 🎯 Best practice: Keep data **private**, use **getter/setter** for controlled access (Encapsulation).

---

## 🏗️ Constructors and Destructors

### Constructor — Auto called when object is created
```cpp
class Student {
public:
    Student() { rollNo = 0; marks = 0.0; }  // Constructor
};
```

### Destructor — Auto called when object is destroyed
```cpp
~Student() { cout << "Object deleted!"; }  // Destructor
```

- 💾 If dynamic memory was allocated, **free it in the destructor!** (RAII principle)

---

## 📦 Encapsulation (Data Hiding)

```cpp
class Account {
private:
    double balance;  // private data — cannot be accessed directly
public:
    void deposit(double amount)  { balance += amount; }
    void withdraw(double amount) {
        if (amount <= balance) balance -= amount;
    }
    double getBalance() { return balance; }
};
```

- 🎯 **Advantages:**
  - Data can't go into invalid state
  - Implementation can change, interface stays same
  - Validation logic in one place

---

## 👨‍👦 Inheritance

```cpp
class Base    { /* ... */ };
class Derived : public Base { /* ... */ };
```

### Types of Inheritance

| Type        | Description                          |
|-------------|--------------------------------------|
| Single      | One base class                       |
| Multiple    | Multiple base classes                |
| Multilevel  | Grandparent → Parent → Child         |
| Hierarchical| Multiple derived from one base       |

- 🎯 **Benefits:** Code reuse, logical hierarchy, foundation for polymorphism.

---

## 🎭 Polymorphism

> Same name, different behavior!

### Method Overloading (Compile-time)
```cpp
void func(int a)        { }
void func(float a)      { }
void func(int a, int b) { }
// Compiler picks correct version based on arguments
```

### Method Overriding (Runtime)
```cpp
class Animal { public: virtual void sound() { } };
class Dog : public Animal { void sound() { cout << "Woof"; } };
class Cat : public Animal { void sound() { cout << "Meow"; } };
```

---

## 👻 Virtual Functions

```cpp
class Shape {
public:
    virtual void draw() = 0;  // pure virtual — must be implemented!
};

class Circle : public Shape {
public:
    void draw() { cout << "Drawing Circle"; }
};
```

- ⚡ Dynamic binding selects the correct function at **runtime**.
- A class with a pure virtual function (`= 0`) is an **Abstract Class** — cannot be instantiated.

---

## 📝 Exception Handling

```cpp
try {
    if (x == 0) throw "Division by zero!";
    int result = 10 / x;
}
catch (const char* msg) {
    cout << "Error: " << msg;
}
catch (...) {      // catch any exception
    cout << "Unknown error";
}
```

- ✅ Program doesn't crash — errors are handled gracefully!

---

## 📦 STL — Standard Template Library

```cpp
// Vector (Dynamic array)
vector<int> v;
v.push_back(10);  // add element
v[0];             // access element
v.size();         // get size

// Map (Key-value pairs)
map<string, int> age;
age["Raj"] = 20;
```

| Container | Description               |
|-----------|---------------------------|
| `vector`  | Dynamic array             |
| `list`    | Doubly linked list        |
| `map`     | Key-value pairs (sorted)  |
| `set`     | Unique sorted elements    |
| `queue`   | FIFO structure            |
| `stack`   | LIFO structure            |

---

## 🔤 String Class

```cpp
string str1 = "Hello";
string str2 = " World";
string result = str1 + str2;  // "Hello World" — no buffer headache!

str1.length();     // get length
str1.substr(0, 3); // "Hel"
str1.find("ell");  // find position
str1.replace(0, 3, "Bye");
```

- 💪 Much easier and safer than C character arrays!

---

## 📄 Templates (Generic Programming)

```cpp
// Function template
template <typename T>
T add(T a, T b) { return a + b; }

add(5, 10);     // works for int
add(5.5, 3.2);  // works for float — same function!

// Class template
template <typename T>
class Stack { /* ... */ };
```

---

## ➕ Operator Overloading

```cpp
Complex operator+(const Complex &other) {
    Complex result;
    result.real = real + other.real;
    result.imag = imag + other.imag;
    return result;
}

Complex c1(3, 4), c2(1, 2);
Complex c3 = c1 + c2;  // uses overloaded +
```

---

## 🧠 Smart Pointers (Modern C++)

```cpp
// unique_ptr — exclusive ownership
unique_ptr<int> ptr(new int(10));

// shared_ptr — shared ownership (reference counted)
shared_ptr<int> ptr1(new int(10));
shared_ptr<int> ptr2 = ptr1;  // reference count increases
```

- ✅ **Auto-delete** when out of scope — no memory leaks!

---

## 🎭 Lambda Expressions

```cpp
auto add = [](int a, int b) { return a + b; };
cout << add(5, 3);  // 8

// Sort in descending order using lambda
vector<int> v = {1, 2, 3, 4};
sort(v.begin(), v.end(), [](int a, int b) {
    return a > b;
});
```

- ⚡ Anonymous inline functions — perfect for callbacks!

---

## 💡 Important C++ Features Summary

| Feature                   | Benefit                                   |
|---------------------------|-------------------------------------------|
| Classes & Objects         | Encapsulate data and behavior             |
| Inheritance               | Code reuse, logical hierarchy             |
| Polymorphism              | One interface, multiple implementations   |
| Exception Handling        | Graceful error management                 |
| Templates                 | Write once, use with any type             |
| STL                       | Ready-made data structures & algorithms   |
| Operator Overloading      | Intuitive syntax for custom types         |
| Smart Pointers            | Automatic memory management               |
| Lambda Expressions        | Concise inline functions                  |

---

## 🚨 Common C++ Mistakes

| ❌ Mistake | ✅ Fix |
|-----------|--------|
| Forgetting to free dynamic memory | Use smart pointers |
| Not writing virtual destructor | Always write `virtual ~Base() {}` |
| Wrong choice of pass by value vs reference | Use reference for performance |
| No copy constructor with dynamic memory | Default does shallow copy — write deep copy |
| Creating object of abstract class | Implement all pure virtual functions first |

---

## 🎓 Key Takeaways from Unit 7

- ✅ Understood basic C++ structure and OOP concepts.
- ✅ Learned classes, objects, and constructors thoroughly.
- ✅ Understood inheritance, polymorphism, and virtual functions.
- ✅ Learned exception handling and templates.
- ✅ Understood STL containers and smart pointers.
- ✅ Learned advanced features like lambda expressions.
- ✅ You now have a solid understanding of C++ basics! 🚀

---

## ❓ Viva Q&A

**Q: What makes C++ different from C?**  
C++ adds OOP features: classes, objects, inheritance, polymorphism, templates, and STL. Maintains C compatibility. 🧠 *Adds OOP features*

**Q: What is a class?**  
Blueprint combining data members and member functions. Defaults to private access. 🧠 *Object blueprint*

**Q: What is an object?**  
An instance of a class with actual values for data members. 🧠 *Class instance*

**Q: What are access modifiers?**  
`private` = class only; `public` = everywhere; `protected` = class + derived. 🧠 *Control member access*

**Q: What is a constructor?**  
Auto-called when object is created. Same name as class, no return type. 🧠 *Automatic initialization*

**Q: What is a destructor?**  
Auto-called when object is destroyed. Named `~ClassName()`. Used for cleanup. 🧠 *Automatic cleanup*

**Q: What is encapsulation?**  
Bundling data and functions together while hiding internal details via private access. 🧠 *Data hiding and control*

**Q: What is inheritance?**  
Derived class inherits properties and methods from base class. Enables code reuse. 🧠 *Extend base class*

**Q: What is a virtual function?**  
Enables runtime polymorphism. Correct function called based on actual object type at runtime. 🧠 *Runtime overriding*

**Q: What is polymorphism?**  
Same interface, different implementations. Overloading (compile-time) + Overriding (runtime). 🧠 *Same name, different behavior*

**Q: What is STL?**  
Standard Template Library — containers, algorithms, iterators ready to use. 🧠 *Reusable components*

**Q: What is a template?**  
Generic programming — same function/class works with any data type. 🧠 *Generic programming*

**Q: Shallow vs deep copy?**  
Shallow copies pointer (shares memory); Deep copies actual data (independent). 🧠 *Copy type difference*

**Q: What are smart pointers?**  
`unique_ptr` / `shared_ptr` — auto-delete memory when out of scope. No leaks. 🧠 *Automatic memory management*

**Q: What are lambda functions?**  
Anonymous inline functions: `[captures](params) { code }`. Great for callbacks. 🧠 *Anonymous inline function*

---

> 🎉 **Congratulations!** You've completed the entire C and C++ basics course!  
> 🌟 Now you can move forward to Advanced topics, Data Structures, and Algorithms.  
> 💪 Keep coding, keep building, keep learning from errors.  
> *"Practice makes perfect — just stay consistent!"* 🎯
