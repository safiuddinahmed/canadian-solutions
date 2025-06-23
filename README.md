# Canadian Solutions

A full-stack web application built with React and Node.js that provides a platform for Canadian businesses, blogs, forums, and community interaction.

## Features

- **User Authentication**: Secure login/registration system
- **Business Directory**: Browse and discover Canadian businesses
- **Blog Platform**: Read and share blog posts
- **Community Forums**: Engage in discussions
- **User Profiles**: Manage personal information
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

### Frontend

- React 17
- Material-UI
- Redux for state management
- React Router for navigation

### Backend

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs for password hashing

## Quick Start

### Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account
- Git

### Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd canadian-solutions
```

2. Install server dependencies:

```bash
npm install
```

3. Install client dependencies:

```bash
cd client
npm install
cd ..
```

4. Set up environment variables:

   - Copy `.env.example` to `.env`
   - Update the MongoDB URI and JWT secret

5. Run the application:

```bash
# Run both client and server
npm run dev

# Or run separately:
npm run server  # Backend only
npm run client  # Frontend only
```

## Environment Variables

Create a `.env` file in the root directory:

```
MONGODB_URI=your-mongodb-connection-string
JWT_SECRET=your-super-secret-jwt-key
NODE_ENV=development
```

## Deployment

This app is configured for deployment on platforms like Render, Railway, or Heroku.

### Environment Variables for Production:

- `MONGODB_URI`: Your MongoDB Atlas connection string
- `JWT_SECRET`: A strong, random secret key
- `NODE_ENV`: Set to "production"

## Scripts

- `npm start`: Start production server
- `npm run server`: Start development server with nodemon
- `npm run client`: Start React development server
- `npm run dev`: Run both client and server concurrently
- `npm run build`: Build client for production

## Project Structure

```
canadian-solutions/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── Components/     # React components
│   │   ├── actions/        # Redux actions
│   │   ├── reducers/       # Redux reducers
│   │   └── store/          # Redux store
├── config/                 # Configuration files
├── middleware/             # Express middleware
├── models/                 # MongoDB models
├── routes/                 # API routes
└── server.js              # Express server entry point
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License.
