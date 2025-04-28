# HAPI FHIR JPA Server Setup

## Prerequisites
Ensure that Docker is installed on your machine before proceeding.

## Pull the HAPI FHIR JPA Server Image

docker pull hapiproject/hapi:latest

### Run the server:
docker run -d -p 8080:8080 --name hapi-fhir-server hapiproject/hapi:latest

# 🏥 EMR App

A full-stack Electronic Medical Records (EMR) application built with:

- **React** (Frontend)
- **Node.js + Express** (Backend)
- **MongoDB Atlas** (Database)

---

## 📦 Prerequisites

Ensure the following tools are installed on your system:

- **Node.js & npm** (v14+ recommended)
- **MongoDB Atlas Account**
- **Git** (optional)

---

## ☁️ MongoDB Atlas Setup

1. Visit [MongoDB Atlas](https://cloud.mongodb.com/)
2. Log in using:
   - **Email**: `
   - **Password**: 

> ⚠️ **Security Tip:** Do not expose database credentials in public repositories. Use `.env` files to store sensitive data securely.

---

## 🖥️ Frontend Setup (React) and Backend

bash
# Navigate to the frontend directory
cd emr-app

# Install frontend dependencies
npm install

# Start the React development server
npm start


## ⚙️ Backend Setup (Node.js / Express)


# Navigate to the backend directory
cd backend

# Install backend dependencies
npm install

# Start the backend development server
npm run dev
