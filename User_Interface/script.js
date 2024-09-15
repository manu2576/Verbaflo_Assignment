document.getElementById('uploadForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('pdf', document.getElementById('pdf').files[0]);
    formData.append('apiKey', document.getElementById('api_key').value); // Use 'apiKey' here

    try {
        const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
        });

        // Check if the response is in JSON format
        const contentType = response.headers.get('Content-Type');
        if (contentType && contentType.includes('application/json')) {
            const result = await response.json();
            if (result.success) {
                document.getElementById('result').innerHTML = `<a href="${result.htmlFileUrl}" target="_blank">Download your HTML resume</a>`;
            } else {
                document.getElementById('result').innerText = `Error: ${result.message}`;
            }
        } else {
            // Handle unexpected content type
            const text = await response.text();
            document.getElementById('result').innerText = `Unexpected response format: ${text}`;
        }
    } catch (error) {
        // Handle network errors or JSON parsing errors
        document.getElementById('result').innerText = `Error: ${error.message}`;
    }
});
