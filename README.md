# Omoi 📝

**Omoi** (思い出す - "to remember" in Japanese) is a simple, open-source note-taking app built with Next.js.

![Omoi App Screenshot](https://github.com/c-ent/NotesNextJS/blob/16f6ee06573aac98c388c443ec01ae2db7f1b145/public/assets/images/web.PNG)

## Features

- **Clean Interface**: Simple, distraction-free note-taking experience
- **User Authentication**: Secure login with Google OAuth via NextAuth.js
- **Full CRUD Operations**: Create, read, update, and delete notes
- **Color Coding**: Organize notes with four color options (yellow, red, blue, green)
- **Trash Functionality**: Delete notes and restore them later
- **Private Notes**: Each user has their own secure, private note collection
- **Responsive Design**: Works seamlessly on all devices

## Tech Stack

- **Frontend**: Next.js 15, React, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose
- **Authentication**: NextAuth.js with Google Provider

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB database (local or MongoDB Atlas)
- Google OAuth credentials
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/c-ent/Omoi.git
cd Omoi
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:

Create a `.env.local` file in the root directory:
```env
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret
GOOGLE_ID=your_google_oauth_id
GOOGLE_CLIENT_SECRET=your_google_oauth_secret
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
omoi/
├── app/                   # Next.js App Router
│   ├── api/               # API routes (auth, notes, users)
│   ├── notes/             # Note pages (create, update, deleted)
│   └── page.jsx           # Landing page
├── components/            # React components
├── models/                # Mongoose schemas (notes, user)
├── styles/                # Global styles
├── utils/                 # Database connection and utilities
└── public/
    └── assets/            # Icons and images
```

## How It Works

**Note Management:**
- Create notes with titles, body text, and colors
- Edit your notes anytime
- Delete notes (moves to trash)
- Restore notes from trash
- Permanently delete notes from trash

**Color Options:**
- Yellow (default)
- Red
- Blue
- Green

**Authentication:**
- Sign in with Google OAuth
- Each user has private, secure note storage

## Contributing

Contributions are welcome! Feel free to:
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the MIT License - see the `LICENSE` file for details.
