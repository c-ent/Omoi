# Omoi

![Omoi App Screenshot](https://github.com/c-ent/NotesNextJS/blob/16f6ee06573aac98c388c443ec01ae2db7f1b145/public/assets/images/web.PNG)

**Omoi** (思い出す - "to remember" in Japanese) is a simple, open-source note-taking app built with Next.js.

## Features

- Clean interface for taking notes quickly
- User authentication with NextAuth.js
- Create, edit, update, and delete notes
- Color-code your notes (yellow, red, blue, green)
- Trash functionality - delete notes and restore them later
- Fully responsive design
- Built with Next.js 15 and MongoDB
- Each user has their own private notes

## Tech Stack

* [![React][React.js]][React-url]
* [![Next][Next.js]][Next-url]
* ![MongoDB]
* ![Tailwind]
* ![NextAuth]

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB database (local or cloud instance)
- npm or yarn package manager

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/c-ent/Omoi.git
   cd Omoi
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up environment variables
   
   Create a `.env.local` file in the root directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_nextauth_secret
   GOOGLE_ID=your_google_oauth_id
   GOOGLE_CLIENT_SECRET=your_google_oauth_secret
   ```

4. Run the development server
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
Omoi/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── auth/          # NextAuth authentication
│   │   ├── note/          # Note CRUD operations
│   │   └── users/         # User-specific operations
│   ├── notes/             # Notes pages
│   │   ├── create-note/   # Create note page
│   │   ├── deletednotes/  # Deleted notes page
│   │   └── update-note/   # Update note page
│   └── page.jsx           # Landing page
├── components/            # React components
│   ├── buttons/           # Button components
│   ├── Form.jsx           # Note form component
│   ├── Nav.jsx            # Navigation bar
│   ├── NoteCard.jsx       # Individual note card
│   ├── Notes.jsx          # Notes list component
│   ├── NotesClient.jsx    # Client-side notes handler
│   └── Sidebar.jsx        # Sidebar component
├── models/                # Mongoose models
│   ├── notes.js           # Note schema
│   └── user.js            # User schema
├── styles/                # Global styles
├── utils/                 # Utility functions
│   └── database.js        # Database connection
└── public/                # Static assets
```

## How It Works

### Note Management
- **Create** - Add notes with titles, body text, and colors
- **Edit** - Update your notes anytime
- **Delete** - Move notes to trash (can be restored)
- **Restore** - Get notes back from trash
- **Permanent Delete** - Remove notes completely

### Color Options
Choose from four colors for your notes:
- Yellow (default)
- Red
- Blue
- Green

### Authentication
Login with Google or credentials via NextAuth.js

## Contributing

Contributions are welcome! Feel free to report bugs, suggest features, or submit pull requests.

## License

Open source - free to use and modify.

<!-- ![image](https://github.com/c-ent/NotesNextJS/blob/16f6ee06573aac98c388c443ec01ae2db7f1b145/public/assets/images/mobile.PNG) -->

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 

[MongoDB]: https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white
[Tailwind]: https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
