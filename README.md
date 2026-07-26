<div align="center">

# 🏢 Enterprise Procurement System

### Intelligent Source-to-Pay (S2P) Platform

**Infosys Springboard Group Project**

![Spring Boot](https://img.shields.io/badge/SpringBoot-3.x-6DB33F?style=for-the-badge&logo=springboot)
![Java](https://img.shields.io/badge/Java-21-orange?style=for-the-badge&logo=openjdk)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?style=for-the-badge&logo=postgresql)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![JWT](https://img.shields.io/badge/JWT-Authentication-black?style=for-the-badge)
![Maven](https://img.shields.io/badge/Maven-Build-red?style=for-the-badge&logo=apachemaven)

---

### Enterprise Digital Procurement Platform

Automating Procurement • Approval Workflow • Purchase Orders • Supplier Management • Audit Tracking

</div>

---

# 📖 Overview

The **Enterprise Procurement System** is a complete Source-to-Pay (S2P) platform developed as part of the **Infosys Springboard Internship Program**.

The application digitizes procurement operations by allowing employees to raise purchase requests, route them through configurable approval workflows, generate purchase orders, manage suppliers, and maintain complete audit history.

The architecture follows enterprise software development practices using Spring Boot, PostgreSQL, JWT Security, REST APIs, and React.

---

# 🚀 Key Features

## Authentication

- JWT Authentication
- Secure Login
- User Registration
- Role Based Access
- BCrypt Password Encryption

---

## Employee Module

- Create Purchase Requisition
- Track Request Status
- View Approval History
- Purchase Order Tracking

---

## Approval Workflow

- Dynamic Approval Rules
- Department Based Approval
- Cost Center Approval
- Category Based Approval
- Multi Level Approval

---

## Supplier Management

- Supplier Registration
- Supplier Details
- Supplier Categories
- Active / Inactive Status

---

## Purchase Orders

- Automatic PO Generation
- Approval Verification
- Vendor Assignment
- Order Tracking

---

## Master Data

- Departments
- Users
- Categories
- Cost Centers
- Suppliers
- Approval Rules

---

## Security

- Spring Security
- JWT Authentication
- BCrypt Password Encoder
- Role Authorization
- Protected REST APIs

---

## Documentation

- Swagger UI
- OpenAPI 3.1
- REST API Documentation

---

# 🏗 System Architecture

```text
                   +---------------------+
                   |     React Frontend  |
                   +----------+----------+
                              |
                         REST APIs
                              |
                              ▼
+--------------------------------------------------------+
|              Spring Boot Backend                       |
|--------------------------------------------------------|
| Authentication                                         |
| User Management                                        |
| Procurement Module                                     |
| Approval Engine                                        |
| Supplier Management                                    |
| Purchase Order Module                                  |
| Audit Logging                                          |
+-------------------------+------------------------------+
                          |
                          ▼
                 PostgreSQL Database
```

---

# 🔄 Procurement Workflow

```text
Employee

      │

      ▼

Create Purchase Requisition

      │

      ▼

Approval Rule Engine

      │

      ▼

Department Approval

      │

      ▼

Manager Approval

      │

      ▼

Finance Approval

      │

      ▼

Purchase Order Generated

      │

      ▼

Supplier Assigned

      │

      ▼

Goods Received

      │

      ▼

Audit Completed
```

---

# 🗄 Database Architecture

```text
Department
      │
      │
      ▼
Users
      │
      │
      ▼
Purchase Requisition
      │
      │
      ▼
Approval Rules
      │
      │
      ▼
Approvals
      │
      │
      ▼
Purchase Orders
      │
      │
      ▼
Audit Logs
```

---

# 📂 Project Structure

```text
enterprise-procurement-system

│
├── backend
│   ├── src
│   ├── pom.xml
│   ├── mvnw
│   └── README.md
│
├── frontend
│   ├── src
│   ├── public
│   └── package.json
│
├── database
│   ├── schema
│   ├── migration
│   └── sql
│
└── README.md
```

---

# 🛠 Technology Stack

| Layer | Technology |
|----------|------------|
| Frontend | React |
| Backend | Spring Boot |
| Language | Java |
| Security | Spring Security + JWT |
| Database | PostgreSQL |
| ORM | Spring Data JPA |
| Build Tool | Maven |
| Documentation | Swagger/OpenAPI |
| Authentication | JWT + BCrypt |

---

# 🔐 Authentication Flow

```text
User Login

      │

      ▼

Username + Password

      │

      ▼

Spring Security

      │

      ▼

BCrypt Verification

      │

      ▼

JWT Token Generated

      │

      ▼

Frontend Stores Token

      │

      ▼

Authorization Header

Bearer <JWT>

      │

      ▼

Protected APIs
```

---

# 📡 REST API Modules

```
Authentication

/api/auth/login

/api/auth/register

----------------------------

Users

/api/users

----------------------------

Departments

/api/departments

----------------------------

Suppliers

/api/suppliers

----------------------------

Purchase Requisitions

/api/requisitions

----------------------------

Approvals

/api/approvals

----------------------------

Purchase Orders

/api/purchase-orders
```

---

# 🖥 Running Backend

```bash
cd backend

mvn clean install

mvn spring-boot:run
```

Backend URL

```
http://localhost:8080
```

Swagger

```
http://localhost:8080/swagger-ui/index.html
```

OpenAPI

```
http://localhost:8080/v3/api-docs
```

---

# 🗄 Database

PostgreSQL

Database Schema

```
database/schema
```

Migration Scripts

```
database/migration
```

---

# 👨‍💻 Contributors

| Name | Responsibility |
|---------|----------------|
| Sunil Kumar | Spring Boot Backend • Database Design • JWT Authentication • PostgreSQL Integration |
| Team Members | React Frontend • UI Development • Additional Modules |

---

# 🎯 Enterprise Features

- Enterprise Authentication
- Role Based Access Control
- Secure REST APIs
- Approval Workflow
- Procurement Automation
- Supplier Management
- Purchase Order Generation
- Audit Logging
- PostgreSQL Integration
- Swagger Documentation
- JWT Security
- Clean Layered Architecture

---

# 📈 Future Enhancements

- Email Notifications
- AI Approval Recommendations
- OCR Invoice Processing
- Analytics Dashboard
- Vendor Performance Analysis
- Inventory Integration
- ERP Integration
- SAP Connector
- Mobile Application
- Multi-Tenant Support

---

# 📜 License

Developed as part of the **Infosys Springboard Internship Project**.

---

<div align="center">

## ⭐ If you found this project useful, consider giving it a Star ⭐

### Enterprise Procurement System

Built with ❤️ using Spring Boot, PostgreSQL, React and Java.

</div>
