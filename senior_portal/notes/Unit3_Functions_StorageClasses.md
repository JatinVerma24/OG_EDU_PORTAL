# 🔧 Unit 3: User Defined Functions & Storage Classes 🎯

> Alright squad! Time to write your own functions! 💪 Functions take your programming from mid to ultra-professional W status!

---

## 🎬 Intro to Functions

- 🔄 **Function:** A reusable block of code that handles one specific task.
- 🎯 **Wins:** Reusability, Modularity, Clean code, Easy debugging.
- 📝 Execution ALWAYS starts from the `main()` function!

---

## 🏗️ The 3 Pillars of Functions

| Pillar | Description | Syntax |
|--------|-------------|--------|
| Declaration (Prototype) | Tells compiler the function's type before use | `return_type name(params);` |
| Definition | Actual logic | `return_type name(params) { code }` |
| Call | Execute the function | `name(arguments);` |

```c
int add(int a, int b);            // prototype
int add(int a, int b) { return a+b; } // definition
int result = add(5, 3);           // call
```

---

## 📤 Call by Value vs Call by Reference

### 📦 Call by Value
- Sends a **copy** of the data. Original is NOT affected.
- Safe, no side effects.

### 🔗 Call by Reference
- Sends the **memory address (pointer)**. Original IS modified.
- Powerful but requires careful handling.

```c
void byValue(int x)  { x++;    }  // original unchanged
void byRef(int *x)   { (*x)++; }  // original changed
```

---

## 🪆 Recursion

- A function that calls **itself** with a smaller problem.
- Must have a **Base Case** to stop — else Stack Overflow!

```c
int fact(int n) {
    if(n == 1) return 1;    // Base case!
    return n * fact(n-1);   // Recursive call
}
```

---

## 🏢 Storage Classes — Summary Table

| Class      | Scope     | Lifetime     | Default | Location  |
|------------|-----------|--------------|---------|-----------|
| `auto`     | Local     | Block ends   | Garbage | RAM Stack |
| `static`   | Local     | Program ends | 0       | RAM Data  |
| `extern`   | Global    | Program ends | 0       | RAM       |
| `register` | Local     | Block ends   | Garbage | CPU Cache |

### 🚙 auto — Default local variable. Garbage until initialized.
### 🔐 static — Retains value across function calls. Default = 0.
### 🌍 extern — Access a global variable from another file.
### 🏎️ register — Stored in CPU cache for speed. Cannot use `&` operator.

---

## 🎓 Key Takeaways from Unit 3

- ✅ Modularize code with functions.
- ✅ Call by Value vs Call by Reference — know the difference!
- ✅ Recursion requires a base case.
- ✅ Mastered all 4 storage classes: auto, static, extern, register.
- ✅ On to Unit 4! 🚀

---

## ❓ Viva Q&A

**Q: What is a function?**  
A reusable code block performing a specific task. 🧠 *Reusable code block*

**Q: What is function prototype?**  
Declares function to compiler before use. Allows calling before definition. 🧠 *Declare before definition*

**Q: Actual vs formal parameters?**  
Formal = definition variables; Actual = values passed during call. Must match in type. 🧠 *Definition versus call*

**Q: Call by value vs call by reference?**  
Value passes a copy (safe); Reference passes address (modifies original). 🧠 *Copy vs address*

**Q: What is recursion?**  
Function calling itself. Requires base case to stop. 🧠 *Function calls itself*

**Q: What does static do?**  
Retains value between calls, initializes to 0. 🧠 *Retain value across calls*

**Q: Can we get address of register variable?**  
No — register variables live in CPU, not RAM. No memory address. 🧠 *No memory address*

**Q: What is extern?**  
Declares a global variable from another file. 🧠 *Access external variables*

**Q: What is tail recursion?**  
Recursive call is the last operation. Compiler can optimize it. 🧠 *Last operation recursion*
