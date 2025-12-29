# Portfolio Website

A simple, professional portfolio website for showcasing your work as a multimedia and developer graduate.

## Features

- Clean, minimalist design
- Responsive layout (works on all devices)
- Easy to customize
- Project filtering (All, Completed, In Progress)
- Smooth scrolling navigation

## Getting Started

### 1. Personalize Your Information

Open [index.html](index.html) and replace the placeholder text:

- Replace `[Your Name]` with your actual name (appears in multiple places)
- Update the About section with your personal story
- Modify the Skills section to match your actual skills
- Update contact links:
  - Line 92: Replace `your.email@example.com` with your email
  - Line 93: Replace LinkedIn URL with your profile
  - Line 94: Replace GitHub URL with your username

### 2. Add Your Projects

Edit [projects.json](projects.json) to add your actual projects. Each project has:

```json
{
    "title": "Project Name",
    "description": "Brief description of what you built",
    "status": "completed",  // or "in-progress"
    "tags": ["HTML", "CSS", "JavaScript"],  // Technologies used
    "image": "path/to/image.jpg",  // Optional: project screenshot
    "link": "https://project-url.com"  // Optional: live demo or GitHub link
}
```

**Tips:**
- Use clear, concise project titles
- Keep descriptions to 1-2 sentences
- Add relevant technology tags
- Include project images for better visual appeal (recommended size: 600x400px)

### 3. Customize Colors (Optional)

Want to change the color scheme? Edit [styles.css](styles.css) lines 10-16:

```css
:root {
    --primary-color: #2563eb;  /* Main blue color */
    --primary-dark: #1e40af;   /* Darker blue for hover */
    --text-dark: #1f2937;      /* Dark text */
    --text-light: #6b7280;     /* Light text */
    --bg-light: #f9fafb;       /* Light background */
    --bg-white: #ffffff;       /* White background */
}
```

### 4. Add Project Images

1. Create an `images` folder in your portfolio directory
2. Add your project screenshots to this folder
3. Reference them in [projects.json](projects.json): `"image": "images/project-name.jpg"`

### 5. View Your Portfolio

Simply open [index.html](index.html) in your web browser to view your portfolio locally.

## Hosting Your Portfolio

Once you're happy with your portfolio, you can host it for free using:

- **GitHub Pages**: Push to GitHub and enable Pages in settings
- **Netlify**: Drag and drop your folder to deploy
- **Vercel**: Connect your GitHub repo for automatic deployment

## File Structure

```
Portfolio/
├── index.html       # Main HTML file
├── styles.css       # All styling
├── script.js        # JavaScript for dynamic content
├── projects.json    # Your projects data (edit this!)
└── README.md        # This file
```

## Quick Editing Guide

**To add a new project:**
1. Open [projects.json](projects.json)
2. Copy an existing project object
3. Paste it and update with your project details

**To change a section:**
1. Open [index.html](index.html)
2. Find the section (About, Skills, Projects, or Contact)
3. Edit the text directly

**To adjust styling:**
1. Open [styles.css](styles.css)
2. Find the relevant section comment
3. Modify the CSS properties

## Need Help?

The code is well-commented and organized by sections. Each file has clear sections marked with comments to help you find what you need to edit.

Good luck with your job search!
