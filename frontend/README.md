# Login System

A modern, secure, and type-safe login system built with React and TypeScript.

## Features

- 🔒 Secure authentication system
- 🎯 Form validation using Zod
- 📝 Form management with React Hook Form
- 🔄 State management with React Query
- 📱 Responsive design
- 🎨 Clean and modern UI
- 🚀 TypeScript support
- 🔔 Toast notifications

## Tech Stack

- **Frontend Framework**: React with TypeScript
- **Form Management**: React Hook Form
- **Validation**: Zod
- **State Management**: React Query
- **HTTP Client**: Axios
- **Notifications**: React Toastify
- **Styling**: CSS

## Getting Started

### Prerequisites

- Node.js (v18.18.0 or higher recommended)
- npm (v8.0.0 or higher)

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd login
   ```

2. Install dependencies:

   ```bash
   cd frontend
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5173`

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   └── Login.tsx       # Login component with form logic
│   ├── styles/
│   │   └── login.css      # Styles for login component
│   ├── App.tsx            # Main application component
│   └── main.tsx          # Application entry point
├── package.json
└── README.md
```

## Features in Detail

### Form Validation

- UID validation
- Password requirements (minimum 6 characters)
- Real-time validation feedback

### State Management

- Form state handled by React Hook Form
- API state managed by React Query
- Toast notifications for user feedback

### Security

- Type-safe data handling with TypeScript
- Secure password handling
- Token-based authentication

## API Integration

The login system connects to a backend API at `http://localhost:5000` with the following endpoint:

- `POST /api/auth/login`: Authenticates user credentials

  ```typescript
  {
    uid: string,
    password: string
  }
  ```

  Example request:

  ```json
  {
    "uid": "testuser",
    "password": "testpass"
  }
  ```

  Successful response:

  ```json
  {
    "token": "your-jwt-token"
  }
  ```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
