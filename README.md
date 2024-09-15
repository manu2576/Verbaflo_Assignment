# Resume Converter Web Application

This project is a simple web application that allows users to upload their LinkedIn resume PDF, input their OpenAI API key, and convert the PDF into a well-structured HTML resume using OpenAI’s API.

## Table of Contents
- [Problem Statement](#problem-statement)
- [Approach](#approach)
- [Solution](#solution)
- [Technologies Used](#technologies-used)
- [How to Run the Application](#how-to-run-the-application)
- [Project Structure](#project-structure)
- [Challenges Faced](#challenges-faced)
- [Future Improvements](#future-improvements)
- [License](#license)

## Problem Statement

The goal was to create a web application where users can upload their LinkedIn resume in PDF format and use OpenAI's GPT models to convert it into a structured HTML format. The HTML format would maintain the integrity of the resume while being web-friendly.

## Approach

### 1. **Understanding the Requirements**
   - The application needed to handle file uploads (specifically PDF format).
   - It should extract text from the PDF and send the text to OpenAI's API for conversion into an HTML resume format.
   - Users must input their OpenAI API key in the form for authentication.
   - The application should be user-friendly and easy to deploy.

### 2. **Frontend Design**
   - A simple form was created using HTML that allows users to upload a PDF and input their OpenAI API key.
   - The form sends the data to the backend for processing using JavaScript’s `FormData()` and `fetch()` API for file uploads.

### 3. **Backend Design**
   - An Express.js server was set up to handle file uploads using `multer`.
   - Upon file upload, the server temporarily stores the PDF file. Though the current solution uses a placeholder for PDF text extraction, future iterations will include proper PDF-to-text extraction.
   - Once the text is extracted (or mocked in this case), the server sends the content to OpenAI's GPT model using the user-provided API key to convert it into HTML format.
   - The generated HTML content is saved to the server and served back to the user as a downloadable file.

## Solution

1. **File Upload Handling**: I used `multer`, a middleware for handling `multipart/form-data` for uploading the PDF file.

2. **Token Estimation**: Before sending the extracted text to OpenAI, I implemented a rough token estimation to ensure the input doesn’t exceed the token limit. This was important to avoid overloading the API, which would lead to errors.

3. **OpenAI Integration**: 
   - The backend connects to OpenAI using the API key provided by the user. It processes the resume content and generates an HTML structure. The GPT-3.5-turbo model was chosen for efficient results.
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
  - fs (for file system operations)

## How to Run the Application

### Prerequisites:
- Node.js and npm installed
- OpenAI API key (provided by the user during form submission)

### Steps:
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/manu2576/Verbaflo_Assignment.git
   cd Verbaflo_Assignment
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start the Server**:
   ```bash
   npm start
   ```

4. **Access the Application**:
   - Open a browser and go to `http://localhost:3000`.
   - Upload a PDF file, provide your OpenAI API key, and click **Upload and Convert**.

5. **Download the Result**:
   - Once processed, a link will be provided to download the generated HTML resume.

## Project Structure

```
├── README.md             # Project documentation
├── User_Interface/       # Frontend files
│   ├── index.html        # Main HTML file
│   ├── script.js         # Frontend JavaScript
│   └── style.css         # Stylesheet
├── backend.js            # Backend server logic
├── package.json          # Node dependencies
├── package-lock.json     # Lock file for exact dependency versions
├── uploads/              # Temporary PDF storage
└── vercel.json           # Vercel deployment configuration
```

## Challenges Faced

1. **OpenAI Token Limit**: Ensuring that the text extracted from the PDF doesn't exceed the token limit of the OpenAI API was crucial. A basic token estimation logic was implemented to handle this, though it could be improved further.
   
2. **OpenAI API Quota**: During testing, issues with the OpenAI API quota being exceeded occurred. This required implementing error handling to inform users when they exceed their API limits.

3. **PDF Text Extraction**: Extracting structured text from a PDF is a non-trivial task. In this iteration, a placeholder for text extraction was used, but future versions will implement a robust solution using libraries like `pdf-parse` or `pdf-lib`.

## Future Improvements

- **PDF Parsing**: Add actual PDF text extraction functionality to replace the placeholder.
- **Error Handling**: Improve error messages and user feedback to cover more edge cases.
- **Token Estimation**: Implement a more accurate token estimation algorithm.
- **Deployment**: Deploy the app to a cloud provider like Vercel or Heroku for public access.
- **UI/UX Enhancements**: Make the UI more appealing and add progress indicators for file upload and processing.

