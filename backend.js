const express = require('express');
const multer = require('multer');
const { OpenAI } = require('openai');
const path = require('path');
const fs = require('fs');
const pdfParse = require('pdf-parse');

const app = express();
const port = process.env.PORT || 3000;

// Set up file upload handling
const upload = multer({ dest: path.join(__dirname, 'uploads') });

// Serve static files from 'User_interface' directory
app.use(express.static(path.join(__dirname, 'User_interface')));

// Function to estimate token count (this is a rough estimate)
function estimateTokenCount(text) {
    return Math.ceil(text.length / 4); // Approximate average tokens per character
}

// Endpoint to handle file upload and OpenAI processing
app.post('/api/upload', upload.single('pdf'), async (req, res) => {
    try {
        const pdfPath = path.resolve(__dirname, 'uploads', req.file.filename);

        if (!fs.existsSync(pdfPath)) {
            return res.status(404).json({ success: false, message: 'Uploaded file not found' });
        }

        const pdfBuffer = fs.readFileSync(pdfPath);
        const data = await pdfParse(pdfBuffer);
        const textContent = data.text;

        const apiKey = req.body.apiKey;
        if (!apiKey) {
            return res.status(400).json({ success: false, message: 'API key is required' });
        }

        const estimatedTokenCount = estimateTokenCount(textContent);
        const tokenLimit = 1500;
        const tokenUsageThreshold = 0.5 * tokenLimit;

        if (estimatedTokenCount > tokenUsageThreshold) {
            return res.status(400).json({ success: false, message: 'Text content is too large to process within the token limit.' });
        }

        const openai = new OpenAI({ apiKey });
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'system',
                    content: 'You are an expert HTML formatter. Convert the following resume text into a well-structured HTML resume.'
                },
                {
                    role: 'user',
                    content: textContent
                }
            ],
            max_tokens: 1500,
            temperature: 0.5,
        });

        const htmlContent = response.choices[0].message.content.trim();
        const htmlFilePath = path.join(__dirname, 'User_interface', 'resume.html');
        fs.writeFileSync(htmlFilePath, htmlContent);
        fs.unlinkSync(pdfPath);

        res.json({ success: true, htmlFileUrl: '/resume.html' });
    } catch (error) {
        console.error('Error processing request:', error); // Log the error

        // Handle OpenAI API errors
        if (error.response) {
            const status = error.response.status;
            const message = error.response.data.error.message;
            if (status === 401 || status === 403) {
                return res.status(status).json({ success: false, message: `Invalid API key: ${message}` });
            }
            if (status === 429) {
                return res.status(status).json({ success: false, message: 'API quota exceeded. Please try again later.' });
            }
        }

        // Handle other errors
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Default route to serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'User_interface', 'index.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
