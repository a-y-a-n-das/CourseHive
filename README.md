# 📚 CourseHive - Online Course Platform

A modern full-stack course-selling platform built with React, Node.js, Express, and MongoDB. CourseHive enables educators to create and manage courses while providing students with seamless course access, video/PDF lessons, and secure content delivery via AWS S3.

## 🌐 Live Link

🚀 **[CourseHive - Live Demo](https://npm-app.duckdns.org/)**

Experience the platform live with full functionality including course browsing, purchasing, and lesson management.

## 🔗 Important URLs

### Student Portal
- **Sign Up**: `https://npm-app.duckdns.org/signup`
- **Sign In**: `https://npm-app.duckdns.org/signin`
- **Dashboard**: `https://npm-app.duckdns.org/` (after login)

### Educator Portal
- **Sign Up**: `https://npm-app.duckdns.org/educatorsignup`
- **Sign In**: `https://npm-app.duckdns.org/educators`
- **Dashboard**: Access after login to create and manage courses

## 📋 Upcoming Features

- [ ] Enhanced analytics dashboard for educators (course views, revenue tracking)
- [ ] Course progress tracking for students (% completed, certificates)
- [ ] Course ratings and reviews system
- [x] Payment gateway integration (Razorpay)
- [ ] Email notifications for course updates and purchases

## ✨ Features

### For Students
- 🔐 **Secure Authentication** - JWT-based user authentication
- 🎓 **Course Browsing** - Explore available courses with detailed information
- 💳 **Secure Payment** - Razorpay integration with payment verification
- 📹 **Rich Content Access** - Watch video lessons and read PDF materials
- 🎯 **Personalized Dashboard** - Track purchased courses and progress

### For Educators
- 👨‍🏫 **Separate Educator Portal** - Dedicated sign-in and dashboard
- ➕ **Course Creation** - Create courses with metadata (name, price, level, duration, category)
- 🖼️ **Thumbnail Upload** - Upload course images via ImgBB integration
- 📊 **Course Management** - View and manage all created courses
- 📦 **Lesson Management** - Add, view, and delete video/PDF lessons
- 📤 **Direct S3 Upload** - Upload lessons directly to AWS S3 with presigned URLs
- ♻️ **Real-time Updates** - Lesson list updates instantly after add/delete operations
- 🗑️ **Smart Deletion** - Automatic cleanup of S3 files when lessons are deleted

### Technical Highlights
- ⚡ **Fast Development** - Vite + React with HMR
- 🎨 **Modern UI** - Material-UI (MUI) components with responsive design
- 🔒 **Secure Content** - Pre-signed S3 URLs with time-limited access (5 min expiry)
- 💰 **Payment Integration** - Razorpay with signature verification and webhook handling
- 🌐 **RESTful API** - Express backend with protected routes
- 🗄️ **MongoDB Atlas** - Cloud database with Mongoose ODM
- 🚀 **Cloud Storage** - AWS S3 for scalable video/PDF hosting
- 🐳 **Containerized** - Docker & Docker Compose for consistent deployments
- 🔐 **Security Best Practices** - Non-root containers, multi-stage builds, minimal attack surface

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
- **Razorpay** - Payment gateway integration

### Cloud Services
- **AWS S3** - Video and PDF storage
- **MongoDB Atlas** - Managed MongoDB hosting
- **ImgBB** - Course thumbnail hosting

### DevOps & Containerization
- **Docker** - Container platform for consistent deployments
- **Docker Compose** - Multi-container orchestration
- **Nginx** - Reverse proxy and static file serving (in containers)

## 📁 Project Structure

```
Course-selling/
├── backend/              # Express API server
│   ├── controllers/      # Route handlers (auth, student, educator, payment)
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API routes
│   ├── Dockerfile       # Backend container config
│   └── server.js        # Entry point
├── src/                 # React frontend
│   ├── components/      # React components (Appbar, CourseContent, Student, Educator)
│   ├── App.jsx
│   └── main.jsx
├── docker-compose.yml   # Multi-container orchestration
├── Dockerfile           # Frontend container config
└── nginx.conf           # Reverse proxy config
```

## 🚀 Getting started with deployment

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MongoDB Atlas** account (or local MongoDB)
- **AWS Account** with S3 bucket configured
- **ImgBB API Key** (for thumbnails)
- **Razorpay Account** (for payment integration)
- **Docker & Docker Compose** (optional, for containerized deployment)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/a-y-a-n-das/coursehive.git
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
TOKEN=your_internal_api_token_here
BACKEND_URL=http://localhost:5000
MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/Course-app
IMGBB_KEY=your_imgbb_api_key
AWS_REGION=ap-south-1
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
S3_BUCKET_NAME=your_bucket_name
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

#### Frontend Environment Variables
Create `.env` in the root:
```env
VITE_API_URL=http://localhost:5000
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

### Running the Application

#### Development Mode (Traditional)

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

#### Development Mode (Docker) 🐳

1. **Start all services with Docker Compose**:
   ```bash
   docker compose up -d
   ```

2. **Access the app**
   - Frontend: `http://localhost`
   - Backend API: `http://localhost:5000`

3. **View logs**:
   ```bash
   # All services
   docker compose logs -f
   
   # Specific service
   docker compose logs -f backend
   docker compose logs -f frontend
   ```

4. **Stop services**:
   ```bash
   docker compose down
   ```

#### Production Build

**Traditional:**
```bash
# Build frontend
npm run build

# Preview production build
npm run preview
```

**Docker:**
```bash
# Build images
docker compose build

# Run in production mode
docker compose up -d

# Or build and run together
docker compose up -d --build
```

## 🔑 Key Features & Architecture

**Authentication:** JWT-based auth with 12-hour sessions. Protected routes require `Authorization: Bearer <token>` header.

**Content Delivery:** Videos/PDFs stored in AWS S3 with pre-signed URLs (5-min expiry). Direct upload from frontend to S3 using presigned URLs.

**Payment Flow:** Razorpay integration with server-side signature verification for secure transactions.

### Docker Best Practices Implemented

- ✅ **Multi-stage builds** - Separate build and runtime stages
- ✅ **Layer caching** - Optimized Dockerfile instruction order
- ✅ **Minimal base images** - Using `node:24-slim` and `nginx:alpine`
- ✅ **Security** - Non-root user, no secrets in images
- ✅ [**`.dockerignore`**](.dockerignore) - Exclude unnecessary files
- ✅ **Health checks** - Container health monitoring
- ✅ **Restart policies** - Auto-restart on failure
- ✅ **Environment variables** - Externalized configuration

### Docker Image Sizes

| Service | Build Stage | Final Image | Savings |
|---------|-------------|-------------|---------|
| Backend | ~500MB | ~250MB | 50% |
| Frontend | ~800MB | ~50MB | 94% |



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

## 💡 Development Credits

README documentation generated by **GitHub Copilot** powered by Claude Sonnet 4.5
