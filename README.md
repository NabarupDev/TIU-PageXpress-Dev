# TIU PageXpress

TIU PageXpress is a web application designed to help students of Techno India University create professional front and index pages for their assignments and projects. With a few clicks, you can generate university-compliant documents ready for submission.

## Features

- **Front Page Generator**: Create a professional cover page with your project details.
- **Index Page Generator**: Generate a structured table of contents for your documents.
- **Template Selection**: Choose from multiple professionally designed templates.
- **Preview and Download**: Review your document before finalizing and download it in PDF, PNG, or JPG format.

## Technologies Used

- **React**: For building the user interface.
- **Vite**: For fast development and build tooling.
- **Material-UI**: For UI components and styling.
- **html2canvas**: For capturing the document as an image.
- **jsPDF**: For generating PDF files.
- **React Router**: For client-side routing.

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm (version 6 or higher)

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/NabarupDev/frontpage-generator.git
   cd frontpage-generator
   ```

2. Install the dependencies:
   ```sh
   npm install
   ```

### Running the Application

To start the development server, run:
```sh
npm run dev
```

This will start the application on `http://localhost:3000`.

### Building for Production

To build the application for production, run:
```sh
npm run build
```

The production-ready files will be in the `dist` directory.

### Linting

To lint the code, run:
```sh
npm run lint
```

## Project Structure

- `src/`: Contains the source code of the application.
  - `components/`: Contains React components.
  - `assets/`: Contains static assets like images.
  - `index.css`: Global CSS styles.
  - `main.jsx`: Entry point of the application.
- `public/`: Contains the public assets and `index.html`.
- `vite.config.js`: Vite configuration file.
- `package.json`: Project metadata and dependencies.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

If you have any questions or feedback, feel free to reach out to us via email at [nabaruproy.dev@gmail.com](mailto:nabaruproy.dev@gmail.com).
