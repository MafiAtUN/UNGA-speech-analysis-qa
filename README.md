# UNGA Speech Analysis - Q&A Session

A web application for collecting and managing questions from participants during the UNGA Speech Analysis session.

## Features

- 📝 Submit multiple questions with participant information
- 🏷️ Categorize questions (Technical, Features, Others)
- 💾 Automatic local storage of questions
- 📥 Export all questions as JSON file
- 🗑️ Delete individual questions
- 📱 Responsive design for all devices

## Participant Information Collected

- Name (required)
- Title/Position
- Organization
- Contact (Email/Phone) (required)
- Category (required)
- Question (required)

## Getting Started

### Local Development

1. Clone or download this repository
2. Open `index.html` in your web browser
3. Start submitting questions!

### Deploy to GitHub Pages

1. Create a new repository on GitHub
2. Upload all files to the repository
3. Go to Settings → Pages
4. Select the branch (usually `main` or `master`)
5. Select the `/root` folder
6. Click Save
7. Your app will be live at `https://[username].github.io/[repository-name]`

## How It Works

- Questions are stored in the browser's localStorage
- All questions persist across sessions
- Export JSON to download all questions for later review
- The "Add Another Question" button allows quick submission of multiple questions while keeping name and contact info

## File Structure

```
├── index.html      # Main HTML file
├── styles.css      # Styling and design
├── script.js       # Application logic
└── README.md       # This file
```

## Browser Compatibility

Works on all modern browsers that support:
- LocalStorage API
- ES6 JavaScript features
- CSS Grid and Flexbox

## Notes

- Questions are stored locally in the browser
- To share questions across devices, use the Export JSON feature
- Clearing browser data will delete all stored questions

