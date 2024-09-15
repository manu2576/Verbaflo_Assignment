// document.getElementById('uploadForm').addEventListener('submit', async (event) => {
//     event.preventDefault();

//     const formData = new FormData();
//     formData.append('pdf', document.getElementById('pdf').files[0]);
//     formData.append('apiKey', document.getElementById('api_key').value); // Use 'apiKey' here

//     const response = await fetch('/upload', {
//         method: 'POST',
//         body: formData,
//     });

//     const result = await response.json();
//     if (result.success) {
//         document.getElementById('result').innerHTML = `<a href="${result.htmlFileUrl}" target="_blank">Download your HTML resume</a>`;
//     } else {
//         document.getElementById('result').innerText = `Error: ${result.message}`;
//     }
// });

document.getElementById('uploadForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const apiKey = document.getElementById('api_key').value;
    const fileInput = document.getElementById('pdf').files[0];

    if (!fileInput || !apiKey) {
        alert('Please provide both the PDF file and OpenAI API key.');
        return;
    }

    // Convert PDF to text using a client-side library like pdf-lib
    const reader = new FileReader();
    reader.onload = async (event) => {
        const arrayBuffer = event.target.result;

        // Use pdf-lib or any other PDF library to extract text from PDF
        const pdfDoc = await PDFLib.PDFDocument.load(arrayBuffer);
        const textContent = await pdfDoc.getText(); // Use the appropriate method for text extraction

        // Check token count and limit
        const estimatedTokenCount = Math.ceil(textContent.length / 4);
        const tokenLimit = 1500;
        const tokenUsageThreshold = 0.5 * tokenLimit;

        if (estimatedTokenCount > tokenUsageThreshold) {
            alert('Text content is too large to process within the token limit.');
            return;
        }

        // Make API call to OpenAI
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'system',
                        content: 'You are an expert HTML formatter. Convert the following resume text into a well-structured HTML resume.',
                    },
                    {
                        role: 'user',
                        content: textContent,
                    },
                ],
                max_tokens: 1500,
                temperature: 0.5,
            }),
        });

        const result = await response.json();
        if (result.choices) {
            const htmlContent = result.choices[0].message.content.trim();
            document.getElementById('result').innerHTML = `<pre>${htmlContent}</pre>`;
        } else {
            document.getElementById('result').innerText = 'Error generating HTML resume.';
        }
    };

    reader.readAsArrayBuffer(fileInput);
});
