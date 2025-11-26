# 📚 CourseHive - Online Course Platform

A modern full-stack course-selling platform built with React, Node.js, Express, and MongoDB. CourseHive enables educators to create and manage courses while providing students with seamless course access, video/PDF lessons, and secure content delivery via AWS S3.

## ✨ Features

### For Students
- 🔐 **Secure Authentication** - JWT-based user authentication
- 🎓 **Course Browsing** - Explore available courses with detailed information
- 💳 **Course Purchase** - Simple one-click course enrollment
- 📹 **Rich Content Access** - Watch video lessons and read PDF materials
- 🎯 **Personalized Dashboard** - Track purchased courses and progress

### For Educators
- 👨‍🏫 **Separate Educator Portal** - Dedicated sign-in and dashboard
- ➕ **Course Creation** - Create courses with metadata (name, price, level, duration, category)
- 🖼️ **Thumbnail Upload** - Upload course images via ImgBB integration
- 📊 **Course Management** - View and manage all created courses
- 📦 **Lesson Organization** - Structure courses with video and PDF lessons

### Technical Highlights
- ⚡ **Fast Development** - Vite + React with HMR
- 🎨 **Modern UI** - Material-UI (MUI) components with responsive design
- 🔒 **Secure Content** - Pre-signed S3 URLs with time-limited access (5 min expiry)
- 🌐 **RESTful API** - Express backend with protected routes
- 🗄️ **MongoDB Atlas** - Cloud database with Mongoose ODM
- 🚀 **Cloud Storage** - AWS S3 for scalable video/PDF hosting

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern React with hooks
- **Vite 7** - Lightning-fast build tool
- **Material-UI (MUI) 7** - Component library for polished UI
- **React Router Dom 7** - Client-side routing
- **ESLint** - Code linting and quality

### Backend
- **Node.js** - JavaScript runtime
- **Express 5** - Web framework
- **MongoDB + Mongoose** - Database and ODM
- **JWT** - Token-based authentication
- **AWS SDK v3** - S3 client for content delivery
- **Multer** - File upload handling
- **CORS** - Cross-origin resource sharing

### Cloud Services
- **AWS S3** - Video and PDF storage
- **MongoDB Atlas** - Managed MongoDB hosting
- **ImgBB** - Course thumbnail hosting

## 📁 Project Structure

```
Course-selling/
├── backend/
│   ├── controllers/
│   │   ├── auth.js           # JWT authentication middleware
│   │   ├── student.js        # Student auth & course operations
│   │   ├── educator.js       # Educator auth & course creation
│   │   ├── signedUrl.js      # S3 pre-signed URL generation
│   │   └── imgUrl.js         # ImgBB image upload handler
│   ├── models/
│   │   └── model.js          # Mongoose schemas (User, Educator, Course, Lessons)
│   ├── routes/
│   │   └── routes.js         # Express route definitions
│   ├── util/
│   │   └── s3.js             # AWS S3 client configuration
│   ├── .env                  # Environment variables (not in Git)
│   ├── .gitignore
│   ├── example.env           # Environment template
│   ├── server.js             # Express app entry point
│   ├── package.json
│   └── LICENSE
├── src/
│   ├── components/
│   │   ├── Appbar/
│   │   │   ├── Appbar.jsx            # Public navigation bar
│   │   │   └── SigninnedAppbar.jsx   # Authenticated user nav bar
│   │   ├── CourseContent/
│   │   │   ├── CourseContent.jsx     # Main course viewer container
│   │   │   ├── SideBar.jsx           # Lesson list sidebar
│   │   │   ├── VideoPlayer.jsx       # Video lesson player
│   │   │   └── PdfViewer.jsx         # PDF lesson viewer
│   │   ├── Educator/
│   │   │   ├── EducatorsSignin.jsx   # Educator login
│   │   │   ├── EducatorSignup.jsx    # Educator registration
│   │   │   └── EduDashboard.jsx      # Educator course management
│   │   └── Student/
│   │       ├── Signin.jsx            # Student login
│   │       ├── Signup.jsx            # Student registration
│   │       ├── UserDashboard.jsx     # Student course dashboard
│   │       └── PurchaseCourse.jsx    # Course purchase page
│   ├── services/              # API service layer (if implemented)
│   ├── assets/                # Static assets (images, icons)
│   ├── App.jsx                # Main app with routing logic
│   ├── main.jsx               # React entry point
│   ├── App.css
│   └── index.css
├── public/
├── .env                       # Frontend environment variables (VITE_API_URL)
├── .gitignore
├── vite.config.js
├── eslint.config.js
├── package.json
├── LICENSE
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MongoDB Atlas** account (or local MongoDB)
- **AWS Account** with S3 bucket configured
- **ImgBB API Key** (for thumbnails)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/a-y-a-n-das/course-selling-app.git
   cd Course-selling
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   cd ..
   ```

### Configuration

#### Backend Environment Variables
Create `backend/.env`:
```env
PORT=5000
SECRET=your_jwt_secret_key_here
MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/Course-app
IMGBB_KEY=your_imgbb_api_key
AWS_REGION=ap-south-1
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
S3_BUCKET_NAME=your_bucket_name
```

#### Frontend Environment Variables
Create `.env` in the root:
```env
VITE_API_URL=http://localhost:5000
```

### Running the Application

#### Development Mode

1. **Start the backend server** (from `backend/` folder):
   ```bash
   cd backend
   node server.js
   # or use nodemon for auto-restart:
   nodemon server.js
   ```

2. **Start the frontend dev server** (from root):
   ```bash
   npm run dev
   ```

3. **Access the app**
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:5000`

#### Production Build

```bash
# Build frontend
npm run build

# Preview production build
npm run preview
```

## 🔑 API Endpoints

### Public Routes
- `POST /api/signup` - Student registration
- `POST /api/signin` - Student login
- `POST /api/educatorsignin` - Educator login
- `GET /api/courses` - List all courses

### Protected Routes (Require JWT)
- `GET /api/user/courses` - Get user's purchased courses
- `POST /api/coursebyid` - Get course details by ID
- `POST /api/purchasecourse` - Purchase a course
- `POST /api/createcourse` - Create new course (Educators only)
- `GET /api/coursesbyeducator` - Get educator's courses
- `GET /api/coursecontent/:courseId` - Get course lessons (purchased users only)
- `GET /api/video/:courseId/:file` - Get pre-signed S3 URL for video/PDF

## 🔐 Authentication Flow

1. User/Educator signs in → Backend generates JWT token
2. Token stored in `localStorage` (`token` for students, `edu-token` for educators)
3. Protected routes require `Authorization: Bearer <token>` header
4. Token verified via middleware before accessing resources
5. Session expires after 12 hours

## 🎥 Content Delivery

- Course videos and PDFs stored in AWS S3
- Pre-signed URLs generated with 5-minute expiry for security
- Only purchased course content accessible to users
- Lessons organized by `courseId` in S3: `content/{courseId}/{filename}`

## 🧪 Development Tools

- **ESLint** - Code quality and style checking
  ```bash
  npm run lint
  ```

- **Vite HMR** - Instant hot module replacement during development

## 📝 Usage

### For Students
1. Sign up or sign in at `/signin`
2. Browse courses on the dashboard
3. Click "Purchase" to enroll in a course
4. Access course content from your dashboard
5. Watch videos and read PDFs in the course viewer

### For Educators
1. Sign in at `/educators`
2. Create courses from the educator dashboard
3. Upload thumbnail, set price, level, duration, and category
4. View all your created courses
5. Manage course content via the platform

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Ayan Das**
- GitHub: [@a-y-a-n-das](https://github.com/a-y-a-n-das)

## 🙏 Acknowledgments

- Material-UI for the component library
- AWS for reliable cloud storage
- MongoDB Atlas for managed database hosting
- Vite team for the amazing build tool

---

Built with ❤️ by Ayan Das
