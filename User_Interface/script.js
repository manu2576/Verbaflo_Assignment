document.getElementById('uploadForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('pdf', document.getElementById('pdf').files[0]);
    formData.append('api_key', document.getElementById('api_key').value);

    const response = await fetch('/upload', {
        method: 'POST',
        body: formData,
    });

    const result = await response.json();
    if (result.success) {
        document.getElementById('result').innerHTML = `<a href="${result.htmlFileUrl}" target="_blank">Download your HTML resume</a>`;
    } else {
        document.getElementById('result').innerText = `Error: ${result.message}`;
    }
});