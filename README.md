# 🎓 TIU PageXpress

> **Create professional front pages and index pages for Techno India University assignments in seconds!**

TIU PageXpress is a modern web application specifically designed for Techno India University students to generate professional, university-compliant front pages and index pages for their academic assignments and projects. No more struggling with Word formatting or design skills – just fill in your details and get publication-ready documents instantly.

![TIU PageXpress Preview](https://github.com/user-attachments/assets/5f4ee849-025b-4a47-985d-f705bad79eaa)

## ✨ Key Features

### 📄 Front Page Generator
- **Professional Templates**: Choose from 3 beautifully designed, university-compliant templates
- **Auto-formatting**: All templates follow TIU's official formatting guidelines
- **Student Information**: Include name, ID, department, semester, subject, and more
- **Instant Preview**: See your front page before downloading

### 📑 Index Page Generator
- **Multiple Layouts**: Classic, Modern, and Minimalist template options
- **Dynamic Tables**: Add up to 10 assignments with descriptions and dates
- **Auto-numbering**: Serial numbers are automatically managed
- **Signature Columns**: Built-in space for faculty signatures

### 🎨 Template System
- **University Branding**: Official TIU logos and branding elements
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Print-ready**: Optimized for A4 printing with proper margins

### 💾 Export Options
- **PDF Export**: High-quality PDF files for submission
- **Image Export**: PNG and JPG formats available
- **Instant Download**: No registration or sign-up required

## 🚀 Why Choose TIU PageXpress?

- ✅ **No Microsoft Word Required** - Generate documents without any software installation
- ✅ **Zero Advertisements** - Clean, distraction-free experience
- ✅ **No Watermarks** - Professional output without any branding
- ✅ **University-Specific** - Designed exclusively for Techno India University standards
- ✅ **Mobile Friendly** - Works on all devices (desktop recommended for best experience)
- ✅ **Free to Use** - Completely free with no hidden costs

## 🛠️ Technology Stack

- **Frontend Framework**: React 18 with Hooks
- **Build Tool**: Vite for lightning-fast development
- **UI Library**: Material-UI (MUI) for modern, accessible components
- **Routing**: React Router DOM for seamless navigation
- **PDF Generation**: jsPDF for high-quality document export
- **Image Capture**: html2canvas for pixel-perfect rendering
- **Styling**: CSS-in-JS with MUI's sx prop and custom CSS

## 🏃‍♂️ Quick Start

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

## 📁 Project Structure

```
TIU-PageXpress-Dev/
├── public/                 # Static assets
├── src/
│   ├── assets/            # Images, logos, and media files
│   ├── components/        # React components
│   │   ├── indexGenerator/ # Index page related components
│   │   ├── templates/     # Front page template components
│   │   ├── FormPage.jsx   # Main form component
│   │   ├── HomePage.jsx   # Landing page
│   │   ├── Navbar.jsx     # Navigation component
│   │   └── ...
│   ├── App.jsx           # Main App component
│   ├── main.jsx          # Entry point
│   └── index.css         # Global styles
├── package.json          # Dependencies and scripts
├── vite.config.js       # Vite configuration
└── README.md            # Project documentation
```

## 🎯 Usage Guide

### Creating a Front Page

1. **Navigate to the application** and click "Generate Front Page"
2. **Fill in your details**:
   - Full Name
   - Student ID
   - Stream/Department
   - Section and Group
   - Semester
   - Subject Name
   - Academic Year
3. **Select a template** from the available options
4. **Preview your document** and make any necessary adjustments
5. **Download** in your preferred format (PDF, PNG, or JPG)

### Creating an Index Page

1. **Click "Generate Index Page"** from the home page
2. **Add your assignments**:
   - Assignment descriptions
   - Assignment dates (DD-MM-YYYY format)
   - Submission dates (DD-MM-YYYY format)
3. **Choose a template style** (Classic, Modern, or Minimalist)
4. **Preview and download** your index page

## 🎨 Available Templates

### Front Page Templates
- **Template 1**: Traditional layout with university header
- **Template 2**: Modern design with centered logo
- **Template 3**: Minimalist approach with clean typography

### Index Page Templates
- **Classic**: Professional table with borders and alternating colors
- **Modern**: Clean design with subtle styling
- **Minimalist**: Simple layout focusing on content

## 🤝 Contributing

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

## 📧 Support & Contact

Need help or have suggestions? We'd love to hear from you!

- **Email**: [nabaruproy.dev@gmail.com](mailto:nabaruproy.dev@gmail.com)
- **GitHub Issues**: [Report bugs or request features](https://github.com/NabarupDev/TIU-PageXpress-Dev/issues)
- **LinkedIn**: [Connect with the developer](https://www.linkedin.com/in/nabarup-roy/)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🏆 Acknowledgments

- **Techno India University** for the institutional guidelines and standards
- **Material-UI Team** for the excellent component library
- **React Community** for the amazing ecosystem
- **All contributors** who help make this project better

---

<div align="center">
  <p><strong>Made with ❤️ for TIU Students</strong></p>
  <p>© 2024 Nabarup Roy. All rights reserved.</p>
</div>
