# 🎯 Unit 5: Pointers, Pointer Memory & Strings 🔗

> Pointers may seem confusing at first, but they're the true power of C! 💪 Once you understand addresses and dereferencing, everything becomes easy. Master dynamic memory allocation, string manipulation, and memory management! 🔗

---

## 🔗 Pointer Introduction

- 💾 A **pointer** is a variable that stores the **address** of another variable.
- 📍 Every variable in memory has a unique address.

```c
int x = 10;
int *ptr = &x;
// x has value 10, ptr stores the address of x (e.g., 1000)
```

- 🎯 Pointers enable:
  - Dynamic memory allocation
  - Pass-by-reference in functions
  - Efficient array handling

---

## ⚡ & and * Operators

| Operator | Name              | Purpose                             |
|----------|-------------------|-------------------------------------|
| `&`      | Address-of        | Returns the memory address of a variable |
| `*`      | Dereference       | Returns the value at an address     |

```c
int x = 10;
int *ptr = &x;       // ptr holds address of x
printf("%d", *ptr);  // Output: 10 (value at address)
*ptr = 20;           // Changes x to 20
```

- 🎯 `&` and `*` are **opposite** operations!

---

## 🎯 Pointer Declaration

```c
int   *iptr;   // int pointer
float *fptr;   // float pointer
char  *cptr;   // char pointer

int x = 5;
int *ptr = &x; // ✅ Correct — points to x
int *ptr2;     // ❌ Wrong — points to random garbage memory!
```

- 🔒 **Always initialize pointers!** Uninitialized pointers = wild pointers = crash!

---

## 🚫 Null Pointer

```c
int *ptr = NULL;  // or int *ptr = 0;

if (ptr == NULL) {
    printf("Pointer is null, cannot use!");
}
```

- ⚠️ **Dereferencing a null pointer = program crash!**
- 💡 Always validate pointers before using them.

---

## 🔢 Pointer Arithmetic

```c
int arr[5] = {10, 20, 30, 40, 50};
int *ptr = arr;  // points to first element

*(ptr)   = 10   // arr[0]
*(ptr+1) = 20   // arr[1]
*(ptr+2) = 30   // arr[2]
```

- ➕ `ptr + 1` → moves to next element (not next byte — depends on type size)
- 💡 For `int*`, `ptr + 1` moves **4 bytes** ahead.
- 💪 Use pointer arithmetic to traverse arrays!

---

## 🔗🔗 Double Pointer

```c
int x = 10;
int *ptr  = &x;    // ptr points to x
int **pptr = &ptr; // pptr points to ptr

*pptr  = ptr value (address of x)
**pptr = 10 (value of x)
```

- 💪 Used to modify pointers inside functions (pass by reference for pointers).

---

## 💾 Dynamic Memory Allocation

| Function    | Description                              | Syntax |
|-------------|------------------------------------------|--------|
| `malloc()`  | Allocates uninitialized memory           | `(int*)malloc(n * sizeof(int))` |
| `calloc()`  | Allocates zero-initialized memory        | `(int*)calloc(n, sizeof(int))` |
| `realloc()` | Resizes previously allocated memory      | `ptr = realloc(ptr, newSize)` |
| `free()`    | Releases allocated memory                | `free(ptr)` |

```c
int *ptr = (int*)malloc(5 * sizeof(int));  // 5 integers

if (ptr == NULL) {
    printf("Memory allocation failed!");
}
// ... use memory ...
free(ptr);    // release
ptr = NULL;   // avoid dangling pointer
```

- ⚠️ `malloc()` and `calloc()` return `NULL` on failure — always check!

---

## 🔤 Strings and Pointers

```c
char *str  = "Hello";    // str is a pointer (read-only string literal)
char arr[] = "Hello";    // arr is a modifiable array
```

| Type          | Modifiable | Location       |
|---------------|------------|----------------|
| `char *str`   | ❌ No      | Read-only segment |
| `char arr[]`  | ✅ Yes     | Stack           |

---

## 📏 String Functions (`#include <string.h>`)

### strlen() — Get Length
```c
size_t len = strlen("Hello");  // 5 (does NOT count \0)
```

### strcpy() — Copy String ⚠️
```c
char dest[20];
strcpy(dest, "Hello");          // DANGEROUS — no size check
strncpy(dest, "Hello", 19);    // SAFER — limits to 19 chars
```

### strcat() — Concatenate
```c
char str1[30] = "Hello";
strcat(str1, " World");  // "Hello World"
// str1 must have enough space!
```

### strcmp() — Compare
```c
strcmp("abc", "abc") == 0   // Equal
strcmp("a", "b")    <  0    // "a" is less
strcmp("b", "a")    >  0    // "b" is greater
```

---

## 🎯 Function Pointers

```c
int add(int a, int b) { return a + b; }

int (*funcPtr)(int, int) = add;  // declare function pointer
int result = funcPtr(5, 3);      // call via pointer → 8
```

- 💪 Used for callbacks and dynamic function calls.

---

## 🌫️ Void Pointer

```c
void *ptr;        // generic pointer — can point to any type
int x = 10;
ptr = &x;         // OK — no cast needed for assignment

int val = *(int*)ptr;  // cast required for dereferencing!
```

- 💡 `malloc()` and `calloc()` return `void *`.

---

## 🚨 Common Pointer Mistakes

| ❌ Mistake | What Happens |
|-----------|-------------|
| Using uninitialized pointer | Crash / undefined behavior |
| Dereferencing NULL pointer | Crash |
| Returning pointer to local variable | Dangling pointer (variable no longer exists) |
| Using freed memory | Undefined behavior |
| Array out of bounds via pointer | Memory corruption |

---

## 🎓 Key Takeaways from Unit 5

- ✅ Understand what pointers are and how they work.
- ✅ Master `&` (address-of) and `*` (dereference) operators.
- ✅ Learned dynamic memory allocation: `malloc`, `calloc`, `realloc`, `free`.
- ✅ Expert in string functions: `strlen`, `strcpy`, `strcat`, `strcmp`.
- ✅ Understand function pointers and void pointers.
- ✅ Learned to avoid common pointer mistakes.
- ✅ Ready for Unit 6! 🚀

---

## ❓ Viva Q&A

**Q: What is a pointer?**  
A variable storing the memory address of another variable. 🧠 *Variable stores address*

**Q: What are & and * operators?**  
`&` returns a variable's address; `*` accesses the value at an address. Inverse operations. 🧠 *Address versus value*

**Q: What is a null pointer?**  
Points to nothing (NULL or 0). Dereferencing it causes a crash. 🧠 *Pointer to nothing*

**Q: What does malloc do?**  
Allocates uninitialized memory from heap at runtime. Returns NULL on failure. 🧠 *Dynamic memory allocation*

**Q: Why use free()?**  
Releases allocated memory to prevent memory leaks. 🧠 *Release memory*

**Q: calloc vs malloc?**  
`malloc` = uninitialized; `calloc` = zero-initialized and takes count + size params. 🧠 *Initialization difference*

**Q: What is a dangling pointer?**  
A pointer referencing freed or out-of-scope memory. Causes undefined behavior. 🧠 *Points to freed memory*

**Q: What is a wild pointer?**  
An uninitialized pointer containing a garbage address. Always initialize! 🧠 *Uninitialized pointer*

**Q: strcpy safety concern?**  
`strcpy()` has no size limit — causes buffer overflow. Use `strncpy()` instead. 🧠 *Size limit required*

**Q: What is a void pointer?**  
Generic pointer `void *ptr` that can point to any type. Cast required for dereferencing. 🧠 *Generic pointer type*

**Q: What is a function pointer?**  
Stores address of a function. Enables callbacks and dynamic dispatch. 🧠 *Store function address*

**Q: What does memset do?**  
Fills a memory block with a specific byte value (e.g., zero). 🧠 *Fill memory with value*
