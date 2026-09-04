import os
import json

def build_units():
    workspace_dir = os.path.dirname(os.path.abspath(__file__))
    units_dir = os.path.join(workspace_dir, "units")
    if not os.path.exists(units_dir):
        os.makedirs(units_dir)

    print("Writing simplified, fresh course content with 10 questions per unit...")

    # ===================== UNIT 1 =====================
    unit1 = {
        "unit_number": 1,
        "icon": "🚀",
        "title": "Variables, Expressions & Statements",
        "short_title": "Variables & Statements",
        "short_description": "Learn how to store data, write expressions, and use operators.",
        "bro_quote": "Think of a variable like a labeled box. You put something inside it, give it a name, and open it whenever you need what's inside! 📦",
        "subtopics": [
            {
                "name": "What is a Variable?",
                "explanation": """<ul>
<li>📦 <b>A variable is a named storage container.</b> When you write <code>age = 20</code>, you are telling Python: "Create a box, label it 'age', and put the number 20 inside it."</li>
<li>🏷️ <b>The name is on the left, the value is on the right.</b> The <code>=</code> sign means "store this value".</li>
<li>🔄 <b>You can change a variable's value anytime.</b> The old value is simply replaced.</li>
<li>🧩 <b>Variable names should be descriptive.</b> Use <code>age</code> instead of just <code>x</code>.</li>
</ul>""",
                "snippets": [
                    {
                        "comment": "Store values in variables",
                        "filename": "variables.py",
                        "code": "name = \"Alice\"\nage = 20\nprint(name, age)"
                    },
                    {
                        "comment": "Update a variable",
                        "filename": "update.py",
                        "code": "score = 10\nscore = 50\nprint(score)  # Prints 50"
                    }
                ]
            },
            {
                "name": "Naming Rules for Variables",
                "explanation": """<ul>
<li>✅ <b>Names can contain letters, numbers, and underscores ( _ ).</b></li>
<li>🚫 <b>Names CANNOT start with a number.</b></li>
<li>🚫 <b>Names CANNOT have spaces.</b> Use an underscore instead.</li>
<li>🔡 <b>Python is case-sensitive.</b> <code>age</code> and <code>Age</code> are different.</li>
</ul>""",
                "snippets": [
                    {
                        "comment": "Good variable names",
                        "filename": "naming.py",
                        "code": "user_name = \"Bob\"\ntotal_score = 95\nprint(user_name)"
                    },
                    {
                        "comment": "Case sensitivity",
                        "filename": "case.py",
                        "code": "name = \"Alice\"\nName = \"Bob\"\nprint(name, Name)"
                    }
                ]
            },
            {
                "name": "The print() Function",
                "explanation": """<ul>
<li>🖨️ <b><code>print()</code> shows output on the screen.</b> It is how your program talks to you.</li>
<li>📝 <b>You can print text, variables, or numbers.</b> Just put them inside the parentheses.</li>
<li>➕ <b>You can print multiple things at once.</b> Separate them with commas.</li>
</ul>""",
                "snippets": [
                    {
                        "comment": "Printing text and variables",
                        "filename": "print.py",
                        "code": "name = \"Alice\"\nprint(\"Hello\")\nprint(name)"
                    },
                    {
                        "comment": "Printing multiple items",
                        "filename": "print_multiple.py",
                        "code": "age = 20\nprint(\"I am\", age, \"years old.\")"
                    }
                ]
            },
            {
                "name": "Data Types — What Kind of Data Can You Store?",
                "explanation": """<ul>
<li>🔢 <b>Integer (int) — Whole numbers.</b> Like <code>5</code> or <code>100</code>.</li>
<li>🌊 <b>Float — Decimal numbers.</b> Like <code>3.14</code> or <code>9.99</code>.</li>
<li>📝 <b>String (str) — Text wrapped in quotes.</b> Like <code>"Hello"</code>.</li>
<li>✅ <b>Boolean (bool) — True or False.</b> Like a light switch.</li>
</ul>""",
                "snippets": [
                    {
                        "comment": "The four main types",
                        "filename": "types.py",
                        "code": "age = 20        # int\nprice = 9.99    # float\nname = \"Alice\"  # str\nis_on = True    # bool"
                    },
                    {
                        "comment": "Checking types",
                        "filename": "check.py",
                        "code": "age = 20\nprint(type(age))  # <class 'int'>"
                    }
                ]
            },
            {
                "name": "Basic Operators — Doing Math in Python",
                "explanation": """<ul>
<li>➕ <b>Addition ( + )</b> and <b>Subtraction ( - )</b></li>
<li>✖️ <b>Multiplication ( * )</b> and <b>Division ( / )</b></li>
<li>📐 <b>Floor Division ( // ) — removes the decimal.</b></li>
<li>🔁 <b>Modulus ( % ) — gives the remainder.</b></li>
</ul>""",
                "snippets": [
                    {
                        "comment": "Basic math",
                        "filename": "math.py",
                        "code": "a = 10\nb = 3\nprint(a + b)  # 13\nprint(a * b)  # 30"
                    },
                    {
                        "comment": "Remainder (Modulus)",
                        "filename": "mod.py",
                        "code": "number = 10\nprint(number % 3)  # 1 (10 / 3 is 9, remainder 1)"
                    }
                ]
            },
            {
                "name": "Order of Operations",
                "explanation": """<ul>
<li>📚 <b>Follows standard math rules.</b> Parentheses first, then Multiply/Divide, then Add/Subtract.</li>
<li>💡 <b>When in doubt, use parentheses.</b> They make your code clear.</li>
</ul>""",
                "snippets": [
                    {
                        "comment": "Order matters",
                        "filename": "order.py",
                        "code": "print(2 + 3 * 4)    # 14\nprint((2 + 3) * 4)  # 20"
                    }
                ]
            },
            {
                "name": "Working with Strings (Text)",
                "explanation": """<ul>
<li>➕ <b>Join strings using +.</b> This is called concatenation.</li>
<li>🔗 <b>f-strings make mixing text and variables easy.</b> Use <code>f"Text {variable}"</code>.</li>
</ul>""",
                "snippets": [
                    {
                        "comment": "Joining text",
                        "filename": "join.py",
                        "code": "word1 = \"Hello\"\nword2 = \"World\"\nprint(word1 + \" \" + word2)"
                    },
                    {
                        "comment": "Using f-strings",
                        "filename": "fstring.py",
                        "code": "name = \"Alice\"\nprint(f\"My name is {name}\")"
                    }
                ]
            }
        ],
        "questions": [
            "1. Assign your favorite number to a variable and print it. (Variable Assignment)",
            "2. Create a variable that stores a decimal number, like the price of an item. (Float Type)",
            "3. Create a boolean variable representing whether it is raining today. (Boolean Type)",
            "4. Add two different variables together and store the result in a third variable. (Arithmetic)",
            "5. Calculate the remainder when you divide 25 by 4. (Modulus Operator)",
            "6. Join two separate text strings to form a complete sentence. (String Concatenation)",
            "7. Use an f-string to embed a variable inside a printed greeting. (F-Strings)",
            "8. Check and print the data type of the word 'Hello'. (type() function)",
            "9. Name a variable using an underscore to separate two words. (Naming Conventions)",
            "10. Re-assign an existing variable to a completely new value. (Variable Reassignment)"
        ]
    }

    # ===================== UNIT 2 =====================
    unit2 = {
        "unit_number": 2,
        "icon": "🔀",
        "title": "Conditional Statements",
        "short_title": "Conditionals",
        "short_description": "Learn to make your program take decisions using if, elif, and else.",
        "bro_quote": "A conditional is like a traffic light. Your code goes one way when it's green, and a different way when it's red! 🚦",
        "subtopics": [
            {
                "name": "Comparison Operators",
                "explanation": """<ul>
<li>⚖️ <b><code>==</code> checks if two values are equal.</b> Example: <code>5 == 5</code> gives True.</li>
<li>🚫 <b><code>!=</code> checks if two values are NOT equal.</b> Example: <code>5 != 3</code> gives True.</li>
<li>📊 <b><code>&gt;</code> checks if the left value is bigger.</b> Example: <code>10 &gt; 3</code> gives True.</li>
<li>📉 <b><code>&lt;</code> checks if the left value is smaller.</b> Example: <code>2 &lt; 8</code> gives True.</li>
<li>💡 <b>All comparison operators always return either True or False.</b></li>
</ul>""",
                "snippets": [
                    {
                        "comment": "Equal == and Not Equal !=",
                        "filename": "equal.py",
                        "code": "print(5 == 5)   # True\nprint(5 != 3)   # True\nprint(5 != 5)   # False"
                    },
                    {
                        "comment": "Greater and Less Than",
                        "filename": "compare.py",
                        "code": "a = 10\nb = 5\nprint(a > b)   # True\nprint(a < b)   # False"
                    }
                ]
            },
            {
                "name": "The if Statement",
                "explanation": """<ul>
<li>🚦 <b><code>if</code> runs code ONLY if true.</b></li>
<li>🔵 <b><code>else</code> runs if false.</b></li>
<li>🔶 <b><code>elif</code> checks additional conditions.</b></li>
</ul>""",
                "snippets": [
                    {
                        "comment": "Making a decision",
                        "filename": "if_else.py",
                        "code": "age = 18\nif age >= 18:\n    print(\"Adult\")\nelse:\n    print(\"Minor\")"
                    },
                    {
                        "comment": "Multiple choices",
                        "filename": "elif.py",
                        "code": "score = 85\nif score >= 90:\n    print(\"A\")\nelif score >= 80:\n    print(\"B\")\nelse:\n    print(\"C\")"
                    }
                ]
            },
            {
                "name": "Logical Operators",
                "explanation": """<ul>
<li>✅ <b><code>and</code> — BOTH must be True.</b></li>
<li>🔓 <b><code>or</code> — AT LEAST ONE must be True.</b></li>
<li>🔄 <b><code>not</code> — Reverses True/False.</b></li>
</ul>""",
                "snippets": [
                    {
                        "comment": "Combining rules",
                        "filename": "logic.py",
                        "code": "is_sunny = True\nhas_time = True\nif is_sunny and has_time:\n    print(\"Go to park!\")"
                    }
                ]
            }
        ],
        "questions": [
            "1. Write a condition that checks if a number is strictly greater than 100. (Greater than)",
            "2. Check if two string variables contain the exact same text. (Equality)",
            "3. Use the != operator to verify that a number is not zero. (Not equal)",
            "4. Write a simple if statement that prints 'Passed!' if a score is over 50. (Simple If)",
            "5. Create an if-else block that prints 'Even' or 'Odd' based on a condition. (If-Else)",
            "6. Use an if-elif-else structure to print a letter grade (A, B, or C). (If-Elif-Else)",
            "7. Use the 'and' operator to check if a user is logged in AND has admin rights. (Logical AND)",
            "8. Use the 'or' operator to check if it's Saturday OR Sunday. (Logical OR)",
            "9. Use the 'not' keyword to execute code only when a condition is false. (Logical NOT)",
            "10. Combine a comparison and a logical operator to check if a number is between 1 and 10. (Combining conditions)"
        ]
    }

    # ===================== UNIT 3 =====================
    unit3 = {
        "unit_number": 3,
        "icon": "🔄",
        "title": "Loops",
        "short_title": "Loops",
        "short_description": "Repeat actions automatically using while and for loops.",
        "bro_quote": "Loops save you enormous amounts of repetitive work. 🔄",
        "subtopics": [
            {
                "name": "The while Loop",
                "explanation": """<ul>
<li>🔄 <b>Keeps running as long as it's True.</b></li>
<li>🛑 <b>Use <code>break</code> to stop early.</b></li>
</ul>""",
                "snippets": [
                    {
                        "comment": "Count to 3",
                        "filename": "while.py",
                        "code": "count = 1\nwhile count <= 3:\n    print(count)\n    count += 1"
                    }
                ]
            },
            {
                "name": "The for Loop",
                "explanation": """<ul>
<li>📋 <b>Goes through items one by one.</b></li>
<li>🔢 <b>Use <code>range()</code> for numbers.</b></li>
</ul>""",
                "snippets": [
                    {
                        "comment": "Loop with range",
                        "filename": "for_range.py",
                        "code": "for i in range(3):\n    print(\"Hello\")"
                    },
                    {
                        "comment": "Loop through a list",
                        "filename": "for_list.py",
                        "code": "items = [\"apple\", \"banana\"]\nfor item in items:\n    print(item)"
                    }
                ]
            }
        ],
        "questions": [
            "1. Write a while loop that counts down from 5 to 1. (While Loop)",
            "2. Create a while loop that runs until a variable named 'power' reaches 0. (While condition)",
            "3. Use a for loop and range() to print 'Hello' exactly 10 times. (For with range)",
            "4. Use a for loop to print the numbers from 5 to 10. (For with range start/end)",
            "5. Loop over a list of your three favorite movies and print each one. (Iterating list)",
            "6. Loop through the word 'Python' and print each letter on a new line. (Iterating string)",
            "7. Use a break statement to exit a loop prematurely when a target is found. (Break)",
            "8. Use a continue statement to skip printing the number 3 in a loop. (Continue)",
            "9. Write a loop inside another loop (a nested loop) to print coordinates. (Nested loops)",
            "10. Write a loop that adds numbers together until the sum is greater than 50. (Accumulation loop)"
        ]
    }

    # ===================== UNIT 4 =====================
    unit4 = {
        "unit_number": 4,
        "icon": "⚙️",
        "title": "Functions",
        "short_title": "Functions",
        "short_description": "Write reusable blocks of code and pass inputs.",
        "bro_quote": "Write code once, use it everywhere! 🍳",
        "subtopics": [
            {
                "name": "Creating Functions",
                "explanation": """<ul>
<li>📦 <b>Use <code>def</code> to create a function.</b></li>
<li>📞 <b>Call it by its name.</b></li>
</ul>""",
                "snippets": [
                    {
                        "comment": "A simple function",
                        "filename": "func.py",
                        "code": "def greet():\n    print(\"Hi there!\")\n\ngreet()"
                    }
                ]
            },
            {
                "name": "Parameters and Returns",
                "explanation": """<ul>
<li>🎛️ <b>Parameters give functions input.</b></li>
<li>🎁 <b><code>return</code> sends results back.</b></li>
</ul>""",
                "snippets": [
                    {
                        "comment": "Function with input and output",
                        "filename": "return.py",
                        "code": "def add(a, b):\n    return a + b\n\nresult = add(5, 3)\nprint(result)"
                    }
                ]
            }
        ],
        "questions": [
            "1. Define a function called say_hello that prints a greeting. (Defining function)",
            "2. Call a function you just defined to execute its code. (Calling function)",
            "3. Write a function that takes one parameter (a name) and greets that person. (Single parameter)",
            "4. Create a function that accepts two numbers and calculates their product. (Multiple parameters)",
            "5. Write a function that returns the square of a number instead of printing it. (Return value)",
            "6. Make a function return both the sum and difference of two numbers. (Returning multiple values)",
            "7. Add a default value of 'Guest' to a name parameter in a greeting function. (Default parameter)",
            "8. Call a function explicitly mentioning the parameter names. (Keyword args)",
            "9. Create a variable inside a function and try to print it outside to see what happens. (Local scope)",
            "10. Call a previously created math function twice with different sets of numbers. (Reusability)"
        ]
    }

    # ===================== UNIT 5 =====================
    unit5 = {
        "unit_number": 5,
        "icon": "🎯",
        "title": "Strings & Text",
        "short_title": "Strings",
        "short_description": "Index, slice, and manipulate text.",
        "bro_quote": "Strings are just sequences of characters! 🎬",
        "subtopics": [
            {
                "name": "Slicing and Indexing",
                "explanation": """<ul>
<li>💺 <b>Start counting from 0.</b></li>
<li>✂️ <b>Use <code>[start:end]</code> to slice.</b></li>
</ul>""",
                "snippets": [
                    {
                        "comment": "Get parts of a word",
                        "filename": "slice.py",
                        "code": "word = \"Python\"\nprint(word[0])    # P\nprint(word[0:2])  # Py"
                    }
                ]
            },
            {
                "name": "String Methods",
                "explanation": """<ul>
<li>🔡 <b><code>.lower()</code> / <code>.upper()</code> for case.</b></li>
<li>🔄 <b><code>.replace()</code> to swap words.</b></li>
</ul>""",
                "snippets": [
                    {
                        "comment": "Modify text",
                        "filename": "methods.py",
                        "code": "text = \"Hello World\"\nprint(text.lower())\nprint(text.replace(\"World\", \"Bro\"))"
                    }
                ]
            }
        ],
        "questions": [
            "1. Extract the very first character of the string 'Programming'. (Indexing)",
            "2. Use negative indexing to get the last character of a string. (Negative indexing)",
            "3. Slice the first three letters out of a word. (Slicing)",
            "4. Use the len() function to find out how many characters are in a sentence. (String length)",
            "5. Convert a messy string like 'hElLo' completely into uppercase. (Changing case)",
            "6. Replace the word 'bad' with 'good' in a sentence. (Replace text)",
            "7. Split a sentence by spaces to turn it into a list of individual words. (Splitting)",
            "8. Use the 'in' keyword to check if the letter 'z' is inside a word. (Checking contents)",
            "9. Remove the extra spaces from the beginning and end of a padded string. (Stripping)",
            "10. Count how many times the letter 'a' appears in 'banana'. (Counting)"
        ]
    }

    # ===================== UNIT 6 =====================
    unit6 = {
        "unit_number": 6,
        "icon": "📦",
        "title": "Lists",
        "short_title": "Lists",
        "short_description": "Store and modify collections of data.",
        "bro_quote": "A list holds everything you need in one place! 🛒",
        "subtopics": [
            {
                "name": "Working with Lists",
                "explanation": """<ul>
<li>📋 <b>Use <code>[]</code> to make a list.</b></li>
<li>➕ <b><code>.append()</code> adds items.</b></li>
<li>❌ <b><code>.remove()</code> deletes items.</b></li>
</ul>""",
                "snippets": [
                    {
                        "comment": "List basics",
                        "filename": "lists.py",
                        "code": "fruits = [\"apple\"]\nfruits.append(\"banana\")\nprint(fruits)"
                    }
                ]
            }
        ],
        "questions": [
            "1. Create a list containing four different types of fruit. (Creating list)",
            "2. Print the third item in your list using its index number. (Accessing)",
            "3. Change the value of the second item in your list to something else. (Modifying)",
            "4. Add a completely new item to the very end of your list. (Appending)",
            "5. Insert a new item exactly at the beginning (index 0) of the list. (Inserting)",
            "6. Remove a specific value (like 'apple') from your list. (Removing)",
            "7. Use the .pop() method to remove and print the last item. (Popping)",
            "8. Sort a list of numbers from lowest to highest. (Sorting)",
            "9. Reverse the order of all items currently in your list. (Reversing)",
            "10. Use len() to figure out exactly how many items your list currently holds. (List length)"
        ]
    }

    # ===================== UNIT 7 =====================
    unit7 = {
        "unit_number": 7,
        "icon": "🏗️",
        "title": "Dictionaries",
        "short_title": "Dicts",
        "short_description": "Use key-value dictionaries to organize data.",
        "bro_quote": "Look up a key, get the value! 📖",
        "subtopics": [
            {
                "name": "Using Dictionaries",
                "explanation": """<ul>
<li>📚 <b>Stores key-value pairs.</b></li>
<li>🔑 <b>Use <code>{}</code> and colons.</b></li>
</ul>""",
                "snippets": [
                    {
                        "comment": "Key and Value",
                        "filename": "dicts.py",
                        "code": "user = {\"name\": \"Alice\", \"age\": 25}\nprint(user[\"name\"])"
                    }
                ]
            }
        ],
        "questions": [
            "1. Create a dictionary storing your name, age, and favorite color. (Creating dictionary)",
            "2. Retrieve and print just the value associated with the 'name' key. (Accessing value)",
            "3. Add a brand new key-value pair for 'hobby' to the dictionary. (Adding pair)",
            "4. Update your existing 'age' value to make yourself one year older. (Updating value)",
            "5. Use del or .pop() to completely remove the favorite color key. (Deleting pair)",
            "6. Check if the key 'email' exists in the dictionary using the 'in' keyword. (Checking keys)",
            "7. Print a list of all the keys currently in your dictionary. (Getting keys)",
            "8. Print a list of all the values currently in your dictionary. (Getting values)",
            "9. Use a for loop with .items() to print both keys and values together. (Iterating items)",
            "10. Use the .get() method to try to fetch a key that might not exist without crashing. (Using get)"
        ]
    }

    # ===================== UNIT 8 =====================
    unit8 = {
        "unit_number": 8,
        "icon": "🧱",
        "title": "Classes (OOP)",
        "short_title": "OOP",
        "short_description": "Learn Object-Oriented Programming basics.",
        "bro_quote": "A class is a blueprint. An object is the actual thing! 🏠",
        "subtopics": [
            {
                "name": "Creating Classes",
                "explanation": """<ul>
<li>🏠 <b>Use <code>class</code> to define a blueprint.</b></li>
<li>⚙️ <b><code>__init__</code> sets up data.</b></li>
</ul>""",
                "snippets": [
                    {
                        "comment": "Simple class",
                        "filename": "class.py",
                        "code": "class Dog:\n    def __init__(self, name):\n        self.name = name\n\nd = Dog(\"Buddy\")\nprint(d.name)"
                    }
                ]
            }
        ],
        "questions": [
            "1. Define an empty class named Robot. (Defining class)",
            "2. Add an __init__ method to initialize a robot's name. (Init method)",
            "3. Create a specific instance (object) from your class and store it in a variable. (Creating instance)",
            "4. Print out the name attribute of your created instance. (Instance attribute)",
            "5. Write a method inside the class that makes the robot say 'Beep boop!'. (Instance method)",
            "6. Create two entirely separate robot instances with different names. (Multiple instances)",
            "7. Change the name attribute of one of your robots after it has been created. (Modifying attributes)",
            "8. Call the speaking method you wrote on one of your robot instances. (Calling methods)",
            "9. Understand the 'self' parameter by writing a method that prints the robot's own name. (Self parameter)",
            "10. Create a method that takes an external parameter and adds it to the robot's power level. (Method parameters)"
        ]
    }

    # ===================== UNIT 9 =====================
    unit9 = {
        "unit_number": 9,
        "icon": "⚡",
        "title": "Files & Errors",
        "short_title": "Files",
        "short_description": "Read and write files, handle errors.",
        "bro_quote": "Files save your data even after the program closes! 🛡️",
        "subtopics": [
            {
                "name": "Reading and Writing",
                "explanation": """<ul>
<li>📂 <b>Use <code>open()</code> to write or read.</b></li>
<li>🤝 <b><code>with</code> automatically closes files.</b></li>
</ul>""",
                "snippets": [
                    {
                        "comment": "Write a file",
                        "filename": "write.py",
                        "code": "with open(\"data.txt\", \"w\") as f:\n    f.write(\"Hello!\")"
                    }
                ]
            },
            {
                "name": "Handling Errors",
                "explanation": """<ul>
<li>💥 <b><code>try/except</code> prevents crashes.</b></li>
</ul>""",
                "snippets": [
                    {
                        "comment": "Catching errors",
                        "filename": "error.py",
                        "code": "try:\n    print(10 / 0)\nexcept ZeroDivisionError:\n    print(\"Cannot divide by zero!\")"
                    }
                ]
            }
        ],
        "questions": [
            "1. Use the open() function to create a brand new text file in 'w' mode. (Opening file)",
            "2. Write a single sentence into the text file you just opened. (Writing file)",
            "3. Open an existing text file in 'r' mode and print its contents to the screen. (Reading file)",
            "4. Open a text file in 'a' mode (append) to add a new line without deleting the old ones. (Appending)",
            "5. Rewrite your file reading code to use the 'with' statement so it closes automatically. (With statement)",
            "6. Deliberately try to divide a number by 0 and wrap it in a try/except block. (ZeroDivisionError)",
            "7. Try to open a file that doesn't exist and catch the specific FileNotFoundError. (FileNotFoundError)",
            "8. Write a try block that has two different except blocks for different types of errors. (Multiple excepts)",
            "9. Add a finally block that prints 'Execution finished' regardless of whether an error happened. (Finally block)",
            "10. Use the raise keyword to force a custom error if a user inputs a negative age. (Raising errors)"
        ]
    }

    # ---- Write all units to disk ----
    units = [unit1, unit2, unit3, unit4, unit5, unit6, unit7, unit8, unit9]
    for unit in units:
        path = os.path.join(units_dir, f"unit{unit['unit_number']}.json")
        with open(path, "w", encoding="utf-8") as f:
            json.dump(unit, f, indent=2, ensure_ascii=False)
        print(f"Written: unit{unit['unit_number']}.json")

    print("\nAll 9 simplified units written successfully with 10 questions each!")

if __name__ == "__main__":
    build_units()
