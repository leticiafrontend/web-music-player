# React Vite Boilerplate

A modern boilerplate for React with TypeScript, Vite, and several essential tools for high-quality web application development.

<img width="1462" alt="image" src="https://github.com/user-attachments/assets/91bfde0b-6bb6-4fb7-9aea-f3c663ca9e19" />


## 🚀 Technologies

This boilerplate includes the following technologies and tools:

### 🛠️ Development Environment

- [Vite](https://vitejs.dev/) - Ultra-fast build tool for modern development
- [TypeScript](https://www.typescriptlang.org/) - JavaScript superset with static typing
- [ESLint](https://eslint.org/) - Linter to identify and fix code problems
- [Prettier](https://prettier.io/) - Code formatter to maintain consistency
- [Husky](https://typicode.github.io/husky/) - Git hooks to automate tasks before commits
- [Commitlint](https://commitlint.js.org/) - Ensures commit message standardization

### 📊 State Management

- [Zustand](https://github.com/pmndrs/zustand) - Lightweight and intuitive solution for state management

### 🎨 UI and Animations

- [Tailwind CSS3](https://v3.tailwindcss.com/) - Utility-first CSS framework for fast and responsive design
- [Framer Motion](https://www.framer.com/motion/) - Library for fluid and interactive animations
- [Phosphor Icons](https://phosphoricons.com/) - Flexible and consistent icon set

### 📝 Forms and Validation

- [React Hook Form](https://react-hook-form.com/) - Efficient and performant form management
- [Zod](https://zod.dev/) - TypeScript-first schema validation library

### 🔄 Data Management

- [React Query](https://tanstack.com/query/latest) - Library for server state management and caching

## 🚦 Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/react-vite-boilerplate.git
cd react-vite-boilerplate

# Install dependencies
npm install
# or
yarn
```

### Available Scripts

```bash
# Start the development server
npm run dev

# Build the project for production
npm run build

# Run the production version locally
npm run preview

# Run the linter
npm run lint

# Format code with Prettier
npm run format
```

## 📁 Project Structure

```
/
├── public/              # Static files
├── src/
│   ├── assets/          # Images, fonts, and other resources
│   ├── components/      # Reusable components
│   ├── hooks/           # Custom hooks
│   ├── modules/         # Application modules (pages)
│   ├── routes/          # Route configuration
│   ├── services/        # Services and APIs
│   ├── stores/          # Zustand stores
│   ├── styles/          # Global styles and utilities
│   ├── utils/           # Utility functions
│   ├── App.tsx          # Main component
│   └── main.tsx         # Entry point
├── .eslintrc.js         # ESLint configuration
├── .prettierrc          # Prettier configuration
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
├── tsconfig.json        # TypeScript configuration
└── vite.config.ts       # Vite configuration
```

## 🧩 Features and Examples

The boilerplate includes practical examples of:

- State management with Zustand
- Animations with Framer Motion
- Forms with React Hook Form and Zod validation
- Data fetching with React Query
- Styling with Tailwind CSS
- Icon usage with Phosphor Icons

## 📚 Documentation

For more information about the technologies used, check the Documentation tab in the application interface or visit the links provided in the Technologies section above.

## 📝 License

This project is licensed under the MIT License.
