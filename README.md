# TIU PageXpress

> **Create professional front pages and index pages for Techno India University assignments in seconds!**

TIU PageXpress is a modern web application specifically designed for Techno India University students to generate professional, university-compliant front pages and index pages for their academic assignments and projects. No more struggling with Word formatting or design skills -- just fill in your details and get publication-ready documents instantly.

![TIU PageXpress Preview](https://github.com/user-attachments/assets/5f4ee849-025b-4a47-985d-f705bad79eaa)

## Key Features

### Front Page Generator
- **Individual Project**: Generate a front page with your name, student ID, stream, semester, subject, and more
- **Group Project**: Create a group front page with a dynamic team member list, topic field, and shared academic details
- **Professional Templates**: Choose from 3 beautifully designed, university-compliant templates (individual) or a dedicated group layout
- **Auto-formatting**: All templates follow TIU's official formatting guidelines
- **Instant Preview**: See your front page before downloading -- works on both desktop and mobile
- **Optional Fields**: Section and Group fields are optional; if left empty they are omitted from the output
- **Custom Streams**: Search from a predefined list or type your own stream name

### Index Page Generator
- **Multiple Layouts**: Classic, Modern, and Minimalist template options
- **Dynamic Tables**: Add up to 10 assignments with descriptions and dates
- **Auto-numbering**: Serial numbers are automatically managed
- **Signature Columns**: Built-in space for faculty signatures
- **Blank Index Download**: Download a blank index page in JPG, PNG, or PDF without filling in any data

### Template System
- **University Branding**: Official TIU logos and branding elements
- **Mobile Preview**: Templates render a scaled-down preview on mobile screens; downloads are generated at full A4 quality
- **Print-ready**: Optimized for A4 printing with proper margins

### Export Options
- **PDF Export**: High-quality PDF files for submission
- **Image Export**: PNG and JPG formats available
- **Timestamped Filenames**: All downloads include the date and time in the filename (e.g., `front_page_2026-06-06_10-19-11.pdf`)
- **Instant Download**: No registration or sign-up required

## Why Choose TIU PageXpress?

- **No Microsoft Word Required** -- Generate documents without any software installation
- **Zero Advertisements** -- Clean, distraction-free experience
- **No Watermarks** -- Professional output without any branding
- **University-Specific** -- Designed exclusively for Techno India University standards
- **Mobile Friendly** -- Full preview and download support on mobile devices
- **Free to Use** -- Completely free with no hidden costs

## Technology Stack

- **Frontend Framework**: React 18 with Hooks
- **Build Tool**: Vite for lightning-fast development
- **UI Library**: Material-UI (MUI) for modern, accessible components
- **Routing**: React Router DOM for seamless navigation
- **PDF Generation**: jsPDF for high-quality document export
- **Image Capture**: html2canvas for pixel-perfect rendering
- **Styling**: CSS-in-JS with MUI's sx prop and custom CSS

## Quick Start

### Prerequisites

Make sure you have the following installed:
- **Node.js** (version 16.0 or higher) - [Download here](https://nodejs.org/)
- **npm** (version 7.0 or higher) - Usually comes with Node.js

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/NabarupDev/TIU-PageXpress-Dev.git
   cd TIU-PageXpress-Dev
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   
   Navigate to `http://localhost:5173` to see the application running.

### Production Build

To create a production-ready build:

```bash
npm run build
```

The optimized files will be generated in the `dist/` directory.

## Project Structure

```
TIU-PageXpress-Dev/
├── public/                     # Static assets
├── src/
│   ├── assets/                # Images, logos, and media files
│   ├── components/
│   │   ├── common/            # Shared utility components (ScrollToTop)
│   │   ├── indexGenerator/    # Index page form, templates, preview, and routing
│   │   ├── layout/            # Navbar, Footer, HomeNavbar
│   │   ├── pages/             # FormPage, PreviewPage, TemplateSelection, HomePage, GeneratePage
│   │   ├── sections/          # Landing page sections (HowItWorks, WhyUseThis, Instructions)
│   │   └── templates/         # Front page templates (Template1-3, GroupTemplate, previews)
│   ├── App.jsx                # Main App component with theme
│   ├── main.jsx               # Entry point with BrowserRouter
│   └── index.css              # Global styles
├── remove-comments.cjs        # Script to strip comments from source files
├── package.json               # Dependencies and scripts
├── vite.config.js             # Vite configuration
└── README.md                  # Project documentation
```

## Usage Guide

### Creating an Individual Front Page

1. **Navigate to the application** and click "Generate Front Page"
2. **Select "Individual Project"** (selected by default)
3. **Fill in your details**:
   - Full Name
   - Student ID
   - Stream / Department (search or type your own)
   - Section and Group (optional -- omitted from output if left empty)
   - Semester
   - Subject Name
   - Academic Year
4. **Select a template** from the 3 available options
5. **Preview your document** and make any necessary adjustments
6. **Download** in your preferred format (PDF, PNG, or JPG)

### Creating a Group Project Front Page

1. **Navigate to the application** and click "Generate Front Page"
2. **Select "Group Project"** using the toggle at the top
3. **Fill in shared details**:
   - Stream, Section (optional), Group (optional), Semester, Subject, Year
   - Topic (the project/assignment topic)
4. **Add team members** (minimum 2):
   - Each member has a Name and Student ID field
   - Use "Add Member" to add more rows; use the remove button to delete
5. **Preview your document** -- group projects use a single dedicated template and skip template selection
6. **Download** in your preferred format

### Creating an Index Page

1. **Click "Generate Index Page"** from the home page
2. **Add your assignments**:
   - Assignment descriptions
   - Assignment dates
   - Submission dates
3. **Choose a template style** (Classic, Modern, or Minimalist)
4. **Preview and download** your index page

## 🎨 Available Templates

### Front Page Templates (Individual)
- **Template 1**: Traditional layout with university header and student details table
- **Template 2**: Modern design with centered logo and listed details
- **Template 3**: Minimalist approach with clean typography

### Front Page Template (Group)
- **Group Template**: Centered layout with Subject, Topic, academic details, and a "Prepared by" table listing all team members with Name and ID

### Index Page Templates
- **Classic**: Professional table with borders and alternating colors
- **Modern**: Clean design with subtle styling
- **Minimalist**: Simple layout focusing on content

## Contributing

We welcome contributions from the community! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Make your changes** and test thoroughly
4. **Commit your changes** (`git commit -m 'Add some amazing feature'`)
5. **Push to the branch** (`git push origin feature/amazing-feature`)
6. **Open a Pull Request**

### Development Guidelines

- Follow the existing code style and conventions
- Write clear, descriptive commit messages
- Test your changes across different browsers
- Ensure mobile responsiveness
- Update documentation if needed

## Support & Contact

Need help or have suggestions? We'd love to hear from you!

- **Email**: [nabaruproy.dev@gmail.com](mailto:nabaruproy.dev@gmail.com)
- **GitHub Issues**: [Report bugs or request features](https://github.com/NabarupDev/TIU-PageXpress-Dev/issues)
- **LinkedIn**: [Connect with the developer](https://www.linkedin.com/in/nabarup-roy/)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- **Techno India University** for the institutional guidelines and standards
- **Material-UI Team** for the excellent component library
- **React Community** for the amazing ecosystem
- **All contributors** who help make this project better

---

<div align="center">
  <p><strong>Made for TIU Students</strong></p>
  <p>2026 Nabarup Roy. All rights reserved.</p>
</div>
