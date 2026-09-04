# 📦 Unit 4: Arrays in C 🎯

> Arrays are super important for storing collections of data! 📚 Access multiple values with a single name using indices. Learn from 1D arrays to 2D matrices and master sorting algorithms! 🎯

---

## 📦 Array Introduction

- 🎯 **Array:** A collection of elements of the **same data type** stored in contiguous memory.
- 💡 Example: `int arr[5] = {10, 20, 30, 40, 50};`
- 📍 Indexing starts from **0** (zero-based indexing).
- 💾 Fixed size determined at declaration time.

---

## 📝 Array Declaration and Initialization

```c
int arr[5];                         // Declaration (garbage values)
int arr[5] = {10, 20, 30, 40, 50}; // Full initialization
int arr[5] = {10, 20};              // Partial — rest are 0
int arr[]  = {10, 20, 30};          // Size auto-determined = 3
```

---

## 🔢 Array Indexing

```c
int arr[5] = {10, 20, 30, 40, 50};
arr[0] = 10;   // First element
arr[4] = 50;   // Fifth element (last valid)
arr[5];        // ❌ Out of bounds! Undefined behavior
arr[2] = 99;   // Modify element
```

---

## 📐 2D Arrays (Matrices)

- **Syntax:** `data_type array_name[rows][cols];`

```c
int matrix[3][4] = {
    {1, 2, 3, 4},
    {5, 6, 7, 8},
    {9, 10, 11, 12}
};
// Access: matrix[row][col]
// matrix[0][0] = 1,  matrix[2][3] = 12
```

---

## 🔄 Array Traversal with Loops

```c
// 1D Array
for (int i = 0; i < 5; i++) {
    printf("%d ", arr[i]);
}

// 2D Array
for (int i = 0; i < 3; i++) {
    for (int j = 0; j < 4; j++) {
        printf("%d ", arr[i][j]);
    }
    printf("\n");
}
```

---

## 🔤 Strings (Character Arrays)

- A **string** is a character array ending with null terminator `\0`.
- `"Hello"` → `H e l l o \0`

```c
char str1[6] = "Hello";  // 5 + 1 (null character)
char str2[] = "World";   // Size automatically 6
```

### String Functions (from `<string.h>`)

| Function   | Description                    |
|------------|--------------------------------|
| `strlen()` | Get string length              |
| `strcpy()` | Copy one string to another     |
| `strcat()` | Concatenate two strings        |
| `strcmp()` | Compare two strings            |

---

## 🔎 Linear Search

- Check elements one by one from start to end.
- ⏱️ Time Complexity: **O(n)** — Works on unsorted arrays.

```c
for (int i = 0; i < n; i++) {
    if (arr[i] == target) {
        printf("Found at index %d", i);
        return;
    }
}
```

---

## 🔍 Binary Search

- Fast search — but array **must be sorted**!
- ⏱️ Time Complexity: **O(log n)**

```c
int left = 0, right = n-1;
while (left <= right) {
    int mid = (left + right) / 2;
    if (arr[mid] == target) return mid;
    else if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
}
```

---

## 🫧 Bubble Sort

- Repeatedly compares adjacent elements and swaps if in wrong order.
- ⏱️ Time Complexity: **O(n²)** — Simple, good for learning.

```c
for (int i = 0; i < n; i++) {
    for (int j = 0; j < n-1-i; j++) {
        if (arr[j] > arr[j+1]) {
            int temp = arr[j];
            arr[j] = arr[j+1];
            arr[j+1] = temp;
        }
    }
}
```

---

## 🎯 Selection Sort

- Find minimum element and place it in correct position repeatedly.
- ⏱️ Time Complexity: **O(n²)**

```c
for (int i = 0; i < n-1; i++) {
    int minIdx = i;
    for (int j = i+1; j < n; j++) {
        if (arr[j] < arr[minIdx]) minIdx = j;
    }
    int temp = arr[i]; arr[i] = arr[minIdx]; arr[minIdx] = temp;
}
```

---

## 📝 Sorting Algorithms Comparison

| Algorithm      | Time Complexity | Notes                              |
|----------------|-----------------|------------------------------------|
| Bubble Sort    | O(n²)           | Simple, slow, stable               |
| Selection Sort | O(n²)           | Simple, slightly more efficient    |
| Insertion Sort | O(n²)           | Adaptive, good for partial sorts   |
| Merge Sort     | O(n log n)      | Guaranteed, stable, extra space    |
| Quick Sort     | O(n log n) avg  | In-place, widely preferred         |

---

## 🔗 Arrays and Pointers Relationship

```c
int arr[5] = {10, 20, 30, 40, 50};
arr == &arr[0]    // Always true — array name = pointer to first element
*(arr)   = 10
*(arr+1) = 20
*(arr+2) = 30
```

---

## 🚨 Common Array Mistakes

| ❌ Mistake | ✅ Fix |
|-----------|--------|
| Out of bounds: `arr[10]` when size is 5 | Stay within `0` to `size-1` |
| `printf("%d", str)` — prints address | Use `%s` for strings |
| `arr1 = arr2` — copies pointer only | Use loop or `memcpy()` |
| `scanf("%d", arr)` — arrays already are pointers | `&` not needed for arrays |
| Returning local array from function | Use global/static/dynamic array |

---

## 🎓 Key Takeaways from Unit 4

- ✅ Learned to declare, initialize, and access 1D and 2D arrays.
- ✅ Understood string handling and character arrays.
- ✅ Can implement Linear and Binary search algorithms.
- ✅ Mastered Bubble Sort and Selection Sort.
- ✅ Understood the relationship between arrays and pointers.
- ✅ Ready for Unit 5! 🚀

---

## ❓ Viva Q&A

**Q: What is an array?**  
Collection of same-type elements in contiguous memory, accessed by index. 🧠 *Collection of same type*

**Q: How does indexing work?**  
Starts at 0. `arr[0]` is first, `arr[n-1]` is last. Out of bounds = undefined behavior. 🧠 *Zero-based indexing*

**Q: What is a 2D array?**  
Array of arrays — a matrix. `int arr[3][4]` = 3 rows, 4 columns. 🧠 *Array of arrays*

**Q: What is linear search?**  
Checks elements one by one. O(n). Works on unsorted arrays. 🧠 *Sequential element search*

**Q: Binary search requirements?**  
Array must be sorted. Algorithm eliminates half elements each step. O(log n). 🧠 *Requires sorted array*

**Q: What does bubble sort do?**  
Repeatedly compares adjacent elements and swaps if wrong order. O(n²). 🧠 *Compare and swap adjacent*

**Q: Is array name a pointer?**  
Yes. Array name decays to pointer to first element. `arr == &arr[0]`. 🧠 *Pointer to first element*

**Q: What is a string?**  
Character array terminated by `\0` null character. 🧠 *Null-terminated char array*

**Q: sizeof with arrays?**  
`sizeof(arr)` = total size. Elements = `sizeof(arr) / sizeof(arr[0])`. 🧠 *Total size division*
