const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const pdfParse = require('pdf-parse');

const app = express();
const port = process.env.PORT || 3000;

// Set up file upload handling
const upload = multer({ dest: path.join(__dirname, '../uploads') });

// Serve static files from 'User_interface' directory
app.use(express.static(path.join(__dirname, '../User_interface')));

// Function to estimate token count (this is a rough estimate)
function estimateTokenCount(text) {
    return Math.ceil(text.length / 4); // Approximate average tokens per character
}

// Simulated AI processing function
function simulateAIProcessing(text) {
    // Simulated HTML conversion
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Resume</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .container { width: 80%; margin: 0 auto; }
            h1 { font-size: 24px; }
            p { font-size: 18px; }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Resume</h1>
            <p>${text.replace(/\n/g, '<br>')}</p>
        </div>
    </body>
    </html>
    `;
}

// Endpoint to handle file upload and simulate AI processing
app.post('/upload', upload.single('pdf'), async (req, res) => {
    try {
        const pdfPath = path.resolve(__dirname, '../uploads', req.file.filename);
        if (!fs.existsSync(pdfPath)) {
            return res.status(404).json({ success: false, message: 'Uploaded file not found' });
        }

        // Extract text from PDF
        const pdfBuffer = fs.readFileSync(pdfPath);
        const data = await pdfParse(pdfBuffer);
        const textContent = data.text;

        // Estimate the token usage
        const estimatedTokenCount = estimateTokenCount(textContent);
        const tokenLimit = 15000;
        const tokenUsageThreshold = 0.5 * tokenLimit;

        if (estimatedTokenCount > tokenUsageThreshold) {
            return res.status(400).json({ success: false, message: 'Text content is too large to process within the token limit.' });
        }

        // Simulate AI processing
        const htmlContent = simulateAIProcessing(textContent);

        const htmlFilePath = path.join(__dirname, '../User_interface', 'resume.html');
        fs.writeFileSync(htmlFilePath, htmlContent);
        fs.unlinkSync(pdfPath);

        res.json({ success: true, htmlFileUrl: '/resume.html' });
    } catch (error) {
        console.error('Error processing PDF:', error);
        res.status(500).json({ success: false, message: 'Error processing PDF' });
    }
});

// Default route to serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../User_interface', 'index.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
