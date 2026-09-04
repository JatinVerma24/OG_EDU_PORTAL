# Python Zero to Hero Course 🐍

A comprehensive, interactive web-based Python course platform with 9 units covering everything from variables to files & error handling.

## 📚 Course Content

This course includes 9 in-depth units:

1. **Unit 1** - Variables, Expressions & Statements
2. **Unit 2** - Conditional Statements (if, elif, else)
3. **Unit 3** - Loops (for, while)
4. **Unit 4** - Functions
5. **Unit 5** - Strings & Text Manipulation
6. **Unit 6** - Lists
7. **Unit 7** - Dictionaries
8. **Unit 8** - Classes & Object-Oriented Programming
9. **Unit 9** - Files & Error Handling

Each unit contains:
- 📖 Detailed explanations and concepts
- 💻 Multiple code examples
- ❓ Practice questions
- 🎯 Real-world applications

## 🚀 Features

- **Modern Dark Theme** - Easy on the eyes with a professional design
- **Interactive Course Structure** - Click any unit to view detailed content
- **Code Syntax Highlighting** - Python code is highlighted using Highlight.js
- **Responsive Design** - Works on all devices (mobile, tablet, desktop)
- **Inspirational Quotes** - Each unit has a motivational quote
- **Structured Content** - Well-organized subtopics within each unit
- **Professional Typography** - Uses Fira Code and Nunito fonts

## 📁 Project Structure

```
.
├── index.html           # Generated main course website
├── template.html        # HTML template for the course
├── build_course.py      # Build script to generate index.html from JSON data
├── units/               # Course content in JSON format
│   ├── unit1.json
│   ├── unit2.json
│   ├── ...
│   └── unit9.json
└── README.md           # This file
```

## 🛠️ Setup & Development

### Prerequisites
- Python 3.7+

### Installation

1. Clone the repository:
```bash
git clone https://github.com/RaunakRaj567/Python_notesz.git
cd Python_notesz
```

2. Review the course content:
```bash
# All course data is in JSON format in the units/ directory
ls units/
```

### Building the Course

The course website is generated from JSON data files using the build script:

```bash
python build_course.py
```

This will:
- Read all unit JSON files from the `units/` directory
- Process the course data
- Generate `index.html` - the complete course website

### Viewing the Course

1. After building, open `index.html` in your web browser
2. Click on any unit card to view detailed content
3. Each unit contains subtopics with code examples and questions

## 📝 Course Data Format

Each unit JSON file contains:
- `unit_number`: Unit identifier (1-9)
- `icon`: Emoji icon for the unit
- `title`: Full unit name
- `short_title`: Abbreviated name
- `short_description`: One-line description
- `bro_quote`: Inspirational quote for the unit
- `subtopics`: Array of topics with explanations and code snippets
- `questions`: Array of practice questions

### Example Structure:
```json
{
  "unit_number": 1,
  "icon": "🚀",
  "title": "Variables, Expressions & Statements",
  "short_title": "Variables & Statements",
  "short_description": "Learn how to store data and write expressions.",
  "bro_quote": "A variable is a named container...",
  "subtopics": [...],
  "questions": [...]
}
```

## 🌐 Deployment

### Deploy to GitHub Pages

1. Push your code to GitHub
2. Go to your repository settings
3. Scroll to "GitHub Pages" section
4. Select `main` branch as source
5. Your course will be live at `https://yourusername.github.io/Python_notesz`

### Deploy to Other Platforms

- **Netlify**: Connect your GitHub repo directly
- **Vercel**: Import your GitHub repository
- **AWS S3 + CloudFront**: Upload `index.html` and static files
- **Traditional Web Server**: Copy all files to your server's public directory

## 💡 Customization

### Adding New Content
1. Edit the JSON files in the `units/` directory
2. Add new subtopics, code snippets, or questions
3. Run `python build_course.py` to regenerate the website

### Styling
- Modify CSS in `template.html` to change colors, fonts, or layout
- CSS variables are defined at the top of the `<style>` section

### Build Script
- Edit `build_course.py` to customize how the course is generated
- The script reads JSON files and injects content into placeholders

## 📦 Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript
- **Backend Build**: Python 3
- **Code Highlighting**: Highlight.js
- **Fonts**: Google Fonts (Fira Code, Nunito)
- **Themes**: Custom dark theme with accent colors

## 🎨 Color Scheme

- Primary Background: `#0a0a0c`
- Accent Purple: `#8b5cf6`
- Accent Pink: `#ec4899`
- Accent Cyan: `#06b6d4`
- Text Main: `#f3f4f6`
- Text Muted: `#9ca3af`

## 📱 Browser Support

- Chrome/Edge 88+
- Firefox 85+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

To improve the course:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Created by **RON x OG** © 2026

---

**Happy Learning! 🐍✨**
