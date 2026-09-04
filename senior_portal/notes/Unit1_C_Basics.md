# 📚 Unit 1: C Language Basics & Introduction

> Yo let's go! Welcome to the C programming lobby bro! 🚀 This unit is the literal foundation of your entire dev arc. From basic characters to variables, we're boutta drop some hardcore knowledge! W's in the chat!

---

## 🔤 Character Set of C

- 📝 **Letters:** A-Z and a-z (52 letters)
- 🔢 **Digits:** 0-1-2-3-4-5-6-7-8-9 (10 digits)
- ⚡ **Special Characters:** `+ - * / = ( ) [ ] { } , ; : ' " < > ! & % ^ ~ . ? |`
- 🤍 **White Spaces:** Space, Tab, Newline, Carriage Return
- 💾 Combine these and you get valid, bussin C code!
- 🎯 The C compiler scans these to see if your code is legit or straight garbage.

---

## 🏷️ Identifiers and Keywords

- 👤 **Identifiers:** The custom names you give to variables, functions, and arrays.
- ✅ **Valid identifier rule:** Must start with a letter or an underscore (`_`).
- ❌ **NEVER** start with a number (`x1` is a W, `1x` is an L).
- 🚫 No spaces, no special characters, and definitely no keywords.
- 🔑 **Keywords:** The sacred reserved words baked into C itself.
- 📚 List of GOAT keywords: `int`, `float`, `if`, `else`, `while`, `return`, `struct`, etc.
- ⚠️ Never try to name your variable `int` or `while` — the compiler will roast you!

---

## 📊 Data Types (Super Important!)

| Type     | Description                         | Size    | Range             |
|----------|-------------------------------------|---------|-------------------|
| `char`   | Stores a single character           | 1 byte  | -128 to 127       |
| `int`    | Stores whole numbers                | 4 bytes | ~-2B to +2B       |
| `float`  | Decimals (single precision)         | 4 bytes | —                 |
| `double` | Massive decimals (double precision) | 8 bytes | —                 |
| `void`   | Literally nothing                   | —       | Used for no-return functions |

- 🎯 Declaring a type tells the compiler exactly how much RAM to block out for you.

---

## 🔀 Type Modifiers (Tweaking Specs!)

- 🔵 `signed` — Handles both negative and positive numbers (this is the default vibe).
- 🟢 `unsigned` — Drops the negatives, letting you store way bigger positive numbers.
- 📏 `short` — Caps at 2 bytes to save memory when numbers are small.
- 📈 `long` — Bumps capacity up to 4 or 8 bytes for absolute massive numbers.
- 💡 Examples: `unsigned int`, `long double`.
- ⚡ Pick optimal modifiers so you don't waste precious memory!

---

## 📝 Variables and Constants

- 🎁 **Variable:** A named locker in memory where you can store and update values.
- 💾 **Syntax:** `data_type variable_name = value;` (e.g., `int level = 99;`)
- 🔒 **Constant:** A locked value that can **NEVER** be changed once set.
- 🌟 **Two ways to lock it in:**
  - `#define PI 3.14` — Using the preprocessor at the very top
  - `const float PI = 3.14;` — Using the `const` keyword
- ⭐ Constants prevent accidental bugs and make your code bulletproof.

---

## 🔢 Variable Scope

- 🌍 **Global Variable:** Declared outside all functions. Everyone can see it, everyone can touch it.
- 🏠 **Local Variable:** Declared inside curly braces. Only exists inside that specific block.
- ⏱️ Global variables take up memory for the entire lifecycle of the app.
- 💨 Local variables get spawned in, and automatically deleted when the function ends.
- 🎯 **Static Variable:** Remembers its value across multiple function calls. Doesn't get wiped!
- 🔗 **Extern Variable:** Used to link to a global variable hiding in a different file.

---

## 📄 Input and Output Functions

- 🖨️ **printf()** — Dumps formatted text directly to the console screen.
  - `printf("Hello chat");` → just prints text.
  - `printf("Level: %d", 99);` → uses a placeholder to inject numbers.
- 📥 **scanf()** — Grabs input directly from the user's keyboard.
  - `scanf("%d", &age);` → The `&` symbol is **CRITICAL**. It points to the RAM address!
- 🎫 **Format Specifiers:**
  - `%d` = int, `%f` = float/double, `%s` = string, `%c` = char

---

## 🔀 Escape Sequences

| Sequence | Meaning                      |
|----------|------------------------------|
| `\n`     | Newline (hits enter for you) |
| `\t`     | Horizontal Tab               |
| `\r`     | Carriage Return              |
| `\b`     | Backspace                    |
| `\a`     | Alert (system bell/beep)     |
| `\\`     | Prints an actual backslash   |
| `\"`     | Prints a double quote        |
| `\'`     | Prints a single quote        |

💡 You strictly use these inside strings to format your terminal output!

---

## 🎁 Literals (Raw Values)

- 🔢 **Integer Literals:** `10`, `-50`, `9000` (No decimals allowed)
- 📊 **Float Literals:** `3.14`, `-2.5` (Always rocking a decimal)
- 🔤 **Character Literals:** `'a'`, `'Z'` (Must use single quotes)
- 📝 **String Literals:** `"Hello world"`, `"123"` (Must use double quotes)
- 🌟 These are the raw, raw values you hardcode directly into your source file.

---

## 📏 sizeof() Operator

- `sizeof()` flexes how many bytes a variable or data type is holding hostage in RAM.
- `sizeof(int)` = Usually **4 bytes**
- `sizeof(char)` = Exactly **1 byte**
- `sizeof(double)` = Huge **8 bytes**
- 💾 Essential for advanced memory allocation later when we get to pointers!

---

## 🏗️ C Program Memory Layout

| Segment          | Description                                              |
|------------------|----------------------------------------------------------|
| Text Segment     | Compiled binary code (read-only, untouchable)            |
| Initialized Data | Global/Static variables with starting values             |
| BSS Segment      | Global/Static vars left empty (default to 0)             |
| Heap             | Dynamic memory requested at runtime using malloc/calloc  |
| Stack            | Local variables and function calls (grows and shrinks!)  |

💡 This is literally how your OS organizes your program while it's running.

---

## 🎓 Key Takeaways from Unit 1

- ✅ Aced the history and base concepts of C.
- ✅ Locked in the rules for Identifiers, Keywords, and Data Types.
- ✅ Learned how to snatch user input with `scanf()` and print with `printf()`.
- ✅ Grasped how memory is allocated for variables and scopes.
- ✅ Escaped the matrix with escape sequences and format specifiers.
- ✅ You're ready for Unit 2! Let's secure this bag! 🚀

---

## ❓ Viva Questions & Answers

**Q: When was C made and by who?**
> Dennis Ritchie developed C in 1972 at Bell Labs alongside Unix operating system. It became the foundation for modern programming languages and systems software.
> 🧠 **Brain Booster:** Dennis Ritchie, Bell Labs, 1972

**Q: Why is C called a mid/low-level language?**
> C provides direct memory access through pointers and bitwise operations for hardware manipulation. It allows programmers to write efficient code close to machine level while maintaining readability and portability.
> 🧠 **Brain Booster:** Pointers, memory access, efficiency

**Q: What is the difference between Identifiers and Keywords?**
> Identifiers are user-defined names for variables, functions, and arrays. Keywords are reserved words like `int`, `if`, `while` that have special meaning and cannot be used as identifiers.
> 🧠 **Brain Booster:** Custom names versus reserved words

**Q: Why do we even need Data types?**
> Data types inform the compiler how much memory to allocate and what operations are valid on stored values. Different types like `int`, `char`, `float` occupy different memory sizes and have different ranges.
> 🧠 **Brain Booster:** Allocate memory, validate operations

**Q: What are Constants and why use them?**
> Constants are immutable values defined using `#define` or `const` that cannot be modified after initialization. They improve code safety by preventing accidental changes.
> 🧠 **Brain Booster:** Fixed values, prevent modification

**Q: Signed vs Unsigned variables?**
> Signed variables can represent both negative and positive numbers. Unsigned variables can only represent positive numbers but have double the maximum positive range.
> 🧠 **Brain Booster:** Signed: negative, Unsigned: positive only

**Q: What is variable Scope?**
> Scope defines the region of code where a variable is visible. Global variables are accessible everywhere, local variables only within their declaring block.
> 🧠 **Brain Booster:** Visible where declared

**Q: What are Tokens?**
> Tokens are the smallest meaningful units of C code: keywords, identifiers, operators, constants, and special symbols.
> 🧠 **Brain Booster:** Smallest code units

**Q: What are Escape sequences?**
> Escape sequences use backslash followed by a character to represent special characters within strings (e.g., `\n`, `\t`).
> 🧠 **Brain Booster:** Special character representations

**Q: What does sizeof() do?**
> Returns the number of bytes a variable or data type occupies in memory. Essential for memory allocation and writing portable code.
> 🧠 **Brain Booster:** Returns memory size in bytes

**Q: What are Type modifiers?**
> Type modifiers like `signed`, `unsigned`, `short`, `long` alter the memory size and signedness properties of basic data types.
> 🧠 **Brain Booster:** Alter size and signedness

**Q: What is Void?**
> Void represents the absence of a type. Void functions return no value, void pointers can point to any data type.
> 🧠 **Brain Booster:** No type, nothing, absence

**Q: What does the Static keyword do?**
> Static variables are initialized once and retain their value between function calls instead of being reset.
> 🧠 **Brain Booster:** Retains value across calls

**Q: What is the Extern keyword?**
> Extern declares a global variable defined in another source file, allowing multiple files to share data.
> 🧠 **Brain Booster:** Access external file variables

**Q: What is Typecasting?**
> Typecasting converts a value from one data type to another. Explicit casting uses syntax like `(int)3.14`.
> 🧠 **Brain Booster:** Convert between data types
