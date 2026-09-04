const fs = require('fs');
const path = require('path');

const srcPath = 'C:\\Users\\Jatin\\.gemini\\antigravity\\brain\\fa6024bd-1141-4e97-b280-4b5208f9b325\\.system_generated\\steps\\6\\content.md';
const destPath = path.join(__dirname, 'data.json');

function parseCSV(csvText) {
    const result = [];
    let row = [''];
    let inQuotes = false;
    
    for (let i = 0; i < csvText.length; i++) {
        const char = csvText[i];
        const nextChar = csvText[i + 1];
        
        if (char === '"') {
            if (inQuotes && nextChar === '"') {
                row[row.length - 1] += '"';
                i++; // Skip next quote
            } else {
                inQuotes = !inQuotes;
            }
        } else if (char === ',' && !inQuotes) {
            row.push('');
        } else if ((char === '\n' || char === '\r') && !inQuotes) {
            if (char === '\r' && nextChar === '\n') {
                i++;
            }
            // Add row if it's not empty
            if (row.length > 1 || row[0] !== '') {
                result.push(row.map(cell => cell.trim()));
            }
            row = [''];
        } else {
            row[row.length - 1] += char;
        }
    }
    if (row.length > 1 || row[0] !== '') {
        result.push(row.map(cell => cell.trim()));
    }
    return result;
}

try {
    const fileContent = fs.readFileSync(srcPath, 'utf8');
    
    // Split by metadata separator '---'
    const parts = fileContent.split('---');
    if (parts.length < 2) {
        throw new Error("Could not find '---' separator in content file");
    }
    
    // The CSV content is after the first '---'
    const csvContent = parts.slice(1).join('---').trim();
    
    const rows = parseCSV(csvContent);
    if (rows.length === 0) {
        throw new Error("No CSV rows parsed");
    }
    
    // Find headers (usually the first row)
    // Note: The first row might be headers, but let's confirm the columns
    const rawHeaders = rows[0];
    console.log("Headers found:", rawHeaders);
    
    const headers = [
        "order",
        "eligibility",
        "discipline",
        "programmeName",
        "programmeCode",
        "duration",
        "faculty",
        "reportingDate",
        "inductionSchedule",
        "classesStart"
    ];
    
    const dataRows = rows.slice(1);
    const parsedData = dataRows.map((row, idx) => {
        const obj = {};
        headers.forEach((header, colIdx) => {
            obj[header] = row[colIdx] || "";
        });
        
        // Let's clean up fields
        if (obj.order) {
            obj.order = parseInt(obj.order, 10) || (idx + 1);
        } else {
            obj.order = idx + 1;
        }
        
        // Remove internal newlines in simple fields
        obj.eligibility = obj.eligibility.replace(/\s+/g, ' ');
        obj.discipline = obj.discipline.replace(/\s+/g, ' ');
        obj.faculty = obj.faculty.replace(/\s+/g, ' ');
        
        return obj;
    }).filter(item => item.programmeName); // Ensure we have a programme name
    
    fs.writeFileSync(destPath, JSON.stringify(parsedData, null, 2), 'utf8');
    console.log(`Successfully parsed ${parsedData.length} programmes and wrote to data.json`);
} catch (error) {
    console.error("Error running parser:", error);
    process.exit(1);
}
