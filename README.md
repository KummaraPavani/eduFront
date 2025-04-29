# EduPair Application

EduPair is an interactive platform designed to connect teachers and students by facilitating session management, credit tracking, and secure authentication. This application has been enhanced with several features and improvements to ensure a smooth user experience and effective session management.

## Features Implemented

### Frontend (React + TailwindCSS)

- **Landing Page with Authentication**: Modern and user-friendly landing page with registration and login functionality.
- **Dashboard with Session Management**: View, create, edit, and manage your sessions directly from your dashboard.
- **Credit System Tracking**: Real-time credit balance tracking, with credits earned and spent visible on the user interface.
- **Session Creation and Joining**: Teachers can create sessions, and students can join by spending their credits.
- **Real-Time Notifications**: Notifications that inform users of session creation, credit changes, and other important actions.

### Backend (Node.js + Express)

- **User Authentication with JWT**: Secure authentication system using JSON Web Tokens (JWT) for user login and session management.
- **Session Management API**: API to manage sessions, including creation, joining, and cancellation.
- **Credit System Implementation**: The ability for users to earn and spend credits in real time.
- **MongoDB Database Integration**: Persistent data storage for session, credit, and user information.

## Key Features

### Session Management

- Create, manage, and edit your teaching sessions.
- Join sessions using credits.
- Cancel your sessions with ease, and see all created sessions listed on your dashboard.
- Real-time updates for session statuses and notifications.

### Credit System

- **Earn Credits**: Earn credits by teaching sessions.
- **Spend Credits**: Use credits to join sessions.
- **Credit Validation**: Before joining a session, your credit balance is checked to ensure you have enough credits.
- **Real-Time Credit Tracking**: See your updated credit balance in real time after each action.

### User Experience

- **Error Handling**: Improved error handling to manage unexpected issues.
- **Success Notifications**: Enhanced notifications to inform users of successful actions, such as session creation, credit deduction, and updates.
- **Credit Requirement Display**: Clear display of the credit requirements for each session, helping users know what’s needed before joining.

### Data Management

- **MongoDB**: Ensures all user, session, and credit data are stored persistently.
- **JWT Authentication**: Secure, token-based authentication for user login.
- **RESTful API Architecture**: Ensures scalability and ease of interaction with the platform.

## New Features and Improvements

### Session Creation

- Proper session creation now includes user ID.
- Sessions are saved correctly to `localStorage`.
- Success notifications are displayed after creating a session.

### Credit Management

- Added `updateUserCredits` function in the `AuthContext`.
- Credits are automatically deducted when joining sessions.
- Added validation to ensure sufficient credits before joining a session.

### Session Management

- Fixed session listing to show only the sessions created by the logged-in user.
- Added functionality to cancel sessions.
- Improved session editing for better flexibility and control.

### User Experience

- Enhanced error handling to provide more meaningful error messages.
- Improved success notifications for a smoother user experience.
- Display of credit requirements before joining a session to ensure clarity.

## How to Try These Features

1. **Create a New Session**: Navigate to the dashboard and create a new session. It will appear in your session list.
2. **Join a Session**: Join a session using your credits. Your credit balance will be updated accordingly.
3. **Cancel or Edit Your Sessions**: Modify or cancel your sessions as needed.
4. **Check Your Credit Balance**: Your current credit balance is always visible on the dashboard.

## Getting Started

### Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (Local or Cloud)

### Steps to Run Locally

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd EduPair
2. Install dependencies:
   npm install
3.Set up environment variables for MongoDB and JWT secrets:

Create a .env file in the root directory.

Add your MongoDB connection string and JWT secret key.
4.Start the backend server:
npm run server
5.In a separate terminal, start the frontend:
npm run client

