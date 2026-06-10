# 🏗️ Unit 6: Derived Types — Structures & Unions 🎁

> You've mastered primitive types — now learn to create your own! 🏗️ Use structures and unions to organize complex data elegantly. Essential in real-world applications! 🎁

---

## 🏗️ Structure Introduction

- 📌 **Structure:** A user-defined data type that **groups different types** of data together.
- 💡 Real-world example: A Student record with name, roll number, marks, and address.
- 🎯 Think of a structure as a **template** — create instances (objects) from it.
- 💪 Structures are the foundation of OOP concepts in C!

---

## 📝 Structure Declaration & Object Creation

```c
struct Student {
    int rollNo;
    char name[50];
    float marks;
};

// Create an object (instance)
struct Student s1;
s1.rollNo = 101;
s1.marks  = 95.5;
```

- ⚠️ The `struct` declaration only defines a **template** — no memory allocated yet.
- Memory is allocated only when you create an actual variable (object).

---

## 🔍 Accessing Structure Members

### Dot Operator `.` — For direct objects
```c
struct Student s1;
s1.rollNo = 101;
printf("%s", s1.name);
```

### Arrow Operator `->` — For pointers to structures
```c
struct Student *ptr = &s1;
ptr->rollNo = 102;
(*ptr).marks = 98.0;  // equivalent to arrow
```

---

## 🏷️ typedef — Cleaner Code

```c
// Without typedef:
struct Student s1;
struct Student s2;

// With typedef:
typedef struct Student {
    int rollNo;
    char name[50];
} Student;

Student s1;  // ✅ No need to write "struct" every time!
```

---

## 🪆 Nested Structures

```c
struct Address {
    char city[30];
    int pincode;
};

struct Student {
    int rollNo;
    char name[50];
    struct Address addr;  // nested!
};

// Access nested members:
s1.addr.city    = "Delhi";
s1.addr.pincode = 110001;
```

---

## 📦 Array of Structures

```c
struct Student class[50];  // 50 student records

class[0].rollNo = 101;
class[1].marks  = 95.5;

// Loop through all students:
for (int i = 0; i < 50; i++) {
    printf("%d %s\n", class[i].rollNo, class[i].name);
}
```

---

## 🎯 Passing Structures to Functions

### Pass by Value (copies entire structure)
```c
void printStudent(struct Student s) {
    printf("%d %s %.2f", s.rollNo, s.name, s.marks);
}
printStudent(s1);  // full copy made
```

### Pass by Reference (efficient — only address passed)
```c
void printStudent(struct Student *s) {
    printf("%d %s", s->rollNo, s->name);
}
printStudent(&s1);  // only address passed ✅
```

---

## 🎁 Union — Shared Memory

```c
union Data {
    int   i;
    float f;
    char  c;
};
```

- 📊 **Size** = size of the **largest** member.
- ⚠️ **Only ONE member is valid at a time!**
  - If you set `i`, then `f` becomes invalid garbage.

```c
union Data d;
d.i = 10;          // valid
printf("%d", d.i); // ✅ 10
d.f = 3.14;        // now f is valid, i is garbage
```

---

## ⚖️ Structure vs Union

| Feature      | Structure                      | Union                        |
|--------------|--------------------------------|------------------------------|
| Memory       | Separate for each member       | Shared among all members     |
| Size         | Sum of all members + padding   | Size of largest member       |
| Validity     | All members valid at once      | Only last-assigned is valid  |
| Use case     | Store all fields together      | Store one type at a time     |

---

## 🔢 Bit Fields — Memory Optimization

```c
struct Flags {
    unsigned int flag1 : 1;  // 1 bit
    unsigned int flag2 : 2;  // 2 bits
    unsigned int flag3 : 1;  // 1 bit
};  // uses only 4 bits instead of multiple bytes!
```

- ⚡ Drastically reduces memory for flag/boolean fields.
- ⚠️ Implementation is compiler-dependent.

---

## 🔗 Self-Referential Structures

```c
struct Node {
    int data;
    struct Node *next;  // points to another Node of same type!
};
```

- 💪 Foundation for **Linked Lists**, **Trees**, **Graphs**.

---

## 💾 Saving Structures to Files

```c
struct Student s1 = {101, "Raj", 95.5};
FILE *fp = fopen("students.dat", "wb");
fwrite(&s1, sizeof(struct Student), 1, fp);
fclose(fp);

// Reading back:
struct Student s2;
FILE *fp2 = fopen("students.dat", "rb");
fread(&s2, sizeof(struct Student), 1, fp2);
fclose(fp2);
```

---

## 📏 Structure Memory & Padding

```c
struct Mixed {
    char c;   // 1 byte  → + 3 bytes padding
    int  i;   // 4 bytes
    char d;   // 1 byte  → + 3 bytes padding
};
// sizeof(struct Mixed) = 12 bytes (NOT 6!)
```

- 🎯 CPU requires **aligned memory** for faster access.
- ⚡ Compiler automatically adds padding bytes.
- 🔍 Use `sizeof()` to see the actual size.

---

## 🚨 Common Mistakes to Avoid

| ❌ Mistake | ✅ Fix |
|-----------|--------|
| Comparing structs with `==` | Compare member by member or use `memcmp()` |
| Using all union members simultaneously | Only the last-assigned is valid |
| Wrong malloc size for struct array | Use `n * sizeof(struct Student)` |
| Not using typedef | Use typedef for cleaner code |

---

## 🎓 Key Takeaways from Unit 6

- ✅ Learned to declare, define, and use structures.
- ✅ Understood nested structures and array of structures.
- ✅ Understood unions and how they differ from structures.
- ✅ Understood self-referential structures (needed for linked lists).
- ✅ Learned memory padding, file I/O with structures, bit fields.
- ✅ Ready for Unit 7! 🚀

---

## ❓ Viva Q&A

**Q: What is a structure?**  
User-defined data type combining different types into one unit. 🧠 *User-defined composite type*

**Q: How do you access structure members?**  
Dot operator `.` for direct objects; Arrow operator `->` for pointers. 🧠 *Dot and arrow operators*

**Q: What is typedef?**  
Creates an alias for a structure to reduce typing — e.g., `Student` instead of `struct Student`. 🧠 *Create type alias*

**Q: What is a nested structure?**  
A structure containing another structure as a member. Access via multiple dots: `p.addr.city`. 🧠 *Structure within structure*

**Q: What is a union?**  
All members share the same memory. Only one member can hold a valid value at a time. 🧠 *Shared memory type*

**Q: Structure vs union?**  
Structures have separate memory per member; unions share one block. Union size = largest member. 🧠 *Independent versus shared*

**Q: What is a self-referential structure?**  
Structure containing a pointer to the same type. Essential for linked lists and trees. 🧠 *Points to itself*

**Q: What is padding in structures?**  
Extra bytes added by compiler between members for CPU memory alignment. Increases structure size. 🧠 *Alignment bytes*

**Q: What are bit fields?**  
Structure members defined in bits for memory optimization. e.g., `unsigned int flag : 1`. 🧠 *Bit-level storage*

**Q: Can you return a structure from a function?**  
Yes. Function return type must match the structure type. 🧠 *Return structure data*

**Q: How to compare two structures?**  
Cannot use `==`. Compare member by member or use `memcmp()`. 🧠 *Member-wise comparison*

**Q: What is a dynamic structure?**  
`struct Student *ptr = (struct Student*)malloc(sizeof(struct Student))` — allocated at runtime. 🧠 *Runtime allocation*
