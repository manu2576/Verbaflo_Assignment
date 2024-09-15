# Resume Converter Web Application

This project is a simple web application that allows users to upload their LinkedIn resume PDF, input their OpenAI API key, and convert the PDF into a well-structured HTML resume using OpenAI’s API.

## Table of Contents
- [Problem Statement]
- [Approach]
- [Solution]
- [Technologies Used]
- [How to Run the Application]
- [Project Structure]
- [Challenges Faced]
- [Future Improvements]

## Problem Statement

The goal was to create a web application where users can upload their LinkedIn resume in PDF format, and using OpenAI's GPT models, convert it into a structured HTML format. The HTML format would maintain the integrity of the resume while being web-friendly.

## Approach

### 1. **Understanding the Requirements**
   - The application needs to handle file uploads (specifically PDF format).
   - It should extract text from the PDF and send the text to OpenAI's API for conversion into an HTML resume format.
   - Users must provide their OpenAI API key to ensure the conversion works within their usage limits.
   - The application should be user-friendly and easy to deploy.

### 2. **Frontend Design**
   - I created a simple form using HTML that allows users to upload a PDF and input their OpenAI API key.
   - The form sends the data to the backend for processing using JavaScript’s `FormData()` and `fetch()` API for file uploads.
   
### 3. **Backend Design**
   - I set up an Express.js server to handle file uploads using `multer`.
   - Upon file upload, the server temporarily stores the PDF file, and although the current solution has a placeholder for PDF text extraction, future iterations will include proper PDF-to-text extraction.
   - Once the text is extracted (or mocked in this case), the server sends the content to OpenAI's GPT model to convert it into HTML format.
   - The generated HTML content is saved to the server and served back to the user as a downloadable file.

## Solution

1. **File Upload Handling**: I used `multer`, a middleware for handling `multipart/form-data` for uploading the PDF file.

2. **Token Estimation**: Before sending the extracted text to OpenAI, I implemented a rough token estimation to ensure the input doesn’t exceed the token limit. This was important to avoid overloading the API, which would lead to errors.

3. **OpenAI Integration**: 
   - The backend connects to OpenAI using the provided API key to process the resume content and generate an HTML structure. I chose the GPT-3.5-turbo model for efficient results.
   - The API call is wrapped in error handling to catch potential issues like exceeding quota limits or API errors.

4. **Serving the Result**: Once the HTML is generated, the server saves the HTML file and provides a link for the user to download or view the formatted HTML resume.

## Technologies Used

- **Frontend**:
  - HTML5
  - CSS3 (for basic styling)
  - JavaScript (for handling file uploads and interacting with the server)
  
- **Backend**:
  - Node.js (runtime environment)
  - Express.js (server framework)
  - Multer (for handling file uploads)
  - OpenAI API (for generating HTML from text)
  - dotenv (for managing environment variables like the OpenAI API key)

## How to Run the Application

### Prerequisites:
- Node.js and npm installed
- OpenAI API key

### Steps:
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/resume-converter.git
   cd resume-converter
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Create `.env` File**:
   - Create a `.env` file in the root directory with the following content:
     ```
     OPENAI_API_KEY=your_openai_api_key_here
     ```

4. **Start the Server**:
   ```bash
   npm start
   ```

5. **Access the Application**:
   - Open a browser and go to `http://localhost:3000`.
   - Upload a PDF file, provide your OpenAI API key, and click **Upload and Convert**.

6. **Download the Result**:
   - Once processed, a link will be provided to download the generated HTML resume.

## Project Structure

```
├── User_interface/       # Frontend files
│   ├── index.html        # Main HTML file
│   ├── style.css         # Stylesheet
│   ├── script.js         # Frontend JavaScript
├── uploads/              # Temporary PDF storage
├── backend.js            # Backend server logic
├── .env                  # Environment variables
├── package.json          # Node dependencies
├── README.md             # Project documentation
```

## Challenges Faced

1. **OpenAI Token Limit**: Ensuring that the text extracted from the PDF doesn't exceed the token limit of the OpenAI API was crucial. I implemented a basic token estimation logic to handle this, though it could be improved further.
   
2. **OpenAI API Quota**: During testing, I encountered issues with the OpenAI API quota being exceeded. This required implementing error handling to inform users when they exceed their API limits.

3. **PDF Text Extraction**: Extracting structured text from a PDF is a non-trivial task. In this iteration, I used a placeholder for text extraction, but in future versions, I plan to implement a robust solution using libraries like `pdf-parse` or `pdf-lib`.

## Future Improvements

- **PDF Parsing**: Add actual PDF text extraction functionality to replace the placeholder.
- **Error Handling**: Improve error messages and user feedback to cover more edge cases.
- **Token Estimation**: Implement a more accurate token estimation algorithm.
- **Deployment**: Deploy the app to a cloud provider like Vercel or Heroku for public access.
- **UI/UX Enhancements**: Make the UI more appealing and add progress indicators for file upload and processing.

