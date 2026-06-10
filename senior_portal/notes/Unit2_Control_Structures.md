# ⚡ Unit 2: Control Structures & Input/Output Functions 🎛️

> Yo check this out! Now we're getting into the real stuff! 🚀 Control structures are how you give your code the brain to make decisions. If-else, switch, and loops — we're about to lock in and master it all! No cap!

---

## 🤔 Conditional Statements — if

- ✅ The `if` statement checks a condition before doing anything.
- 📝 **Syntax:** `if (condition) { statements; }`
- 💭 If the condition is **true**, the statements will execute.
- ❌ If it's **false**, the block gets completely skipped.
- 🎯 **Example:**
  ```c
  if (age >= 18) { printf("You can vote! W"); }
  ```
- 💡 Always wrap the condition in parentheses!

---

## 🔀 if-else Statement

- 📌 Pair an `if` with an `else` to handle both outcomes.
- 📝 **Syntax:** `if (condition) { statements1; } else { statements2; }`
- 🎭 If true → `statements1` executes.
- ⚖️ If false → `statements2` executes.
- 💡 **Example:**
  ```c
  if (score >= 50) { printf("Passed! 🎉"); }
  else { printf("Failed! L ❌"); }
  ```
- 🎯 It's literally one or the other — never both!

---

## 🔗 else-if Ladder

- 📊 Chain `else-if` blocks to check a bunch of conditions in a row.
- 📝 **Syntax:** `if (cond1) { } else if (cond2) { } else if (cond3) { } else { }`
- 🎯 If the first condition fails, it checks the next one.
- 💡 **Example: Grading a test score!**
  ```c
  if (marks >= 90)      { printf("A+ GOAT 🌟"); }
  else if (marks >= 80) { printf("A Based 👍"); }
  else if (marks >= 70) { printf("B Mid 🎯"); }
  else                  { printf("C Copium 📚"); }
  ```
- ⚠️ The moment it finds a true condition, it skips the rest of the ladder!

---

## 🪆 Nested if Statements

- 🎪 Putting an `if` statement inside another `if` statement.
- 📝 Used to check conditions deeply, step-by-step.
- 💡 **Example:**
  ```c
  if (age >= 18) {
      if (hasLicense == true) {
          printf("You can drive bro! 🚗");
      }
  }
  ```
- ⚠️ Going too deep makes the code unreadable — keep it clean!

---

## 🎮 switch Statement

- 🎯 A much cleaner way to check exact value matches.
- 📝 Instead of 50 if-elses, just `switch` on the variable.
- ⚡ Cases check for literal values (like `case 1:`, `case 'A':`).
- 🛑 You **MUST** use the `break` keyword to stop it from running the next cases.
- 🎁 `default:` is like the final `else` block when nothing else matches.
- 💡 **Example:**
  ```c
  switch(choice) {
    case 1: printf("Pizza 🍕"); break;
    case 2: printf("Burger 🍔"); break;
    default: printf("Salad 🥗"); break;
  }
  ```

---

## 🔄 Loops — while & do-while

- 🔁 Loops let you run the same code over and over without copying it.
- ⏰ **while loop:** Checks the condition first, then runs. If false initially, it never runs.
  ```c
  int i = 1;
  while(i <= 5) { printf("%d", i); i++; }
  ```
- 🎪 **do-while loop:** Runs the code first, THEN checks. Guaranteed to run at least once!
  ```c
  int j = 1;
  do { printf("%d", j); j++; } while(j <= 5);
  ```
- ⚠️ Don't forget to update your variable (like `i++`) or you'll spawn an infinite loop and crash your PC!

---

## 📐 The for Loop

- 🏆 The GOAT of all loops. Packs initialization, condition, and increment all in one line.
- 📝 **Syntax:** `for (init; condition; update) { code; }`
- 💡 **Example: Printing 1 to 5**
  ```c
  for (int i = 1; i <= 5; i++) {
      printf("%d ", i);
  }
  ```
- 🎯 Perfect when you know exactly how many times you need to loop.

---

## 🚦 break vs continue

| Keyword    | Effect                                                          |
|------------|-----------------------------------------------------------------|
| `break`    | Completely exits the loop immediately                           |
| `continue` | Skips the rest of the current iteration, moves to the next one |

---

## 🎓 Key Takeaways from Unit 2

- ✅ Mastered making decisions with `if`, `else-if`, and `switch`.
- ✅ Understood how loops work so we don't repeat ourselves.
- ✅ Learned the crucial difference between `break` and `continue`.
- ✅ Discovered how `do-while` guarantees at least one execution.
- ✅ You're officially ready for Unit 3! Let's gooo! 🚀

---

## ❓ Viva Questions & Answers

**Q: What are Control structures?**
> Control structures direct program execution flow by making decisions about which code blocks to execute. They include conditional statements and loops.
> 🧠 **Brain Booster:** Direct execution flow

**Q: How does an if statement work?**
> An `if` statement evaluates a condition and executes the code block only if the condition is true.
> 🧠 **Brain Booster:** Execute if true

**Q: What's the point of else-if?**
> `else-if` allows checking multiple conditions in sequence until one evaluates true. Cleaner alternative to nested if statements.
> 🧠 **Brain Booster:** Check multiple conditions

**Q: Why use switch over if-else?**
> Switch statements cleanly handle multiple exact value matches without long if-else chains. More readable and efficient for many discrete alternatives.
> 🧠 **Brain Booster:** Clean multiple match selection

**Q: Why is break so important?**
> Break exits the switch block immediately, preventing code from the next case from executing (fall-through).
> 🧠 **Brain Booster:** Prevent fall-through execution

**Q: How does while loop work?**
> While loop checks a condition first before executing the code block. If false initially, the block never executes.
> 🧠 **Brain Booster:** Check condition first

**Q: What about do-while loops?**
> Do-while executes the code block first, then checks the condition. Guarantees at least one execution.
> 🧠 **Brain Booster:** Execute then check condition

**Q: break vs continue?**
> Break completely exits the loop; continue skips the rest of the current iteration.
> 🧠 **Brain Booster:** Exit versus skip iteration

**Q: What is the ternary operator?**
> `condition ? true_value : false_value` — a one-line alternative to if-else for simple conditional assignments.
> 🧠 **Brain Booster:** Inline if-else alternative

**Q: List logical operators?**
> `&&` (AND) requires both conditions true, `||` (OR) requires at least one true, `!` (NOT) inverts a condition.
> 🧠 **Brain Booster:** Combine multiple conditions

**Q: What is short-circuit evaluation?**
> In logical operations, if the first part determines the result, the second part is not evaluated. Prevents unnecessary evaluations.
> 🧠 **Brain Booster:** Skip unnecessary evaluation

**Q: Is == okay for strings?**
> No, `==` compares memory addresses, not string content. Use `strcmp()` to properly compare string content.
> 🧠 **Brain Booster:** Compare addresses not content

**Q: gets() vs fgets()?**
> `gets()` is unsafe and causes buffer overflows; `fgets()` safely limits input size. Always use `fgets()`.
> 🧠 **Brain Booster:** fgets safer than gets
