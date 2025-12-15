# Bali Spa Guide - Development Plan

## Project Overview
Adding user authentication, database persistence, and role-based dashboards to the Bali Spa Guide application.

---

## Development Phase (10 Days)

### ✅ Day 0: Setup & Infrastructure (COMPLETED)
**Status**: ✅ Done
**Date**: December 14, 2025

**Completed**:
- [x] Docker Compose setup for PostgreSQL
- [x] Database schema design
- [x] Migration files created
- [x] Database connection configuration
- [x] Project structure reorganization
- [x] Development documentation

**Files Created**:
- `docker-compose.yml`
- `backend/.env.local`
- `backend/config/db.js`
- `backend/migrations/001_initial.sql`
- `docs/DEV_GUIDE.md`

---

### 📋 Day 1: Database Connection & Testing
**Status**: ⏳ In Progress
**Goal**: Verify PostgreSQL connection and test database operations

**Tasks**:
- [ ] Start Docker containers
- [ ] Test database connection
- [ ] Run migrations
- [ ] Verify tables created
- [ ] Test CRUD operations
- [ ] Set up pgAdmin connection

**Files to Create/Update**:
- `backend/test-db.js` (test script)

**Verification**:
```bash
# Start Docker
docker-compose up -d

# Test connection
cd backend
node test-db.js

# Check tables in pgAdmin
open http://localhost:5050
```

**Success Criteria**:
- ✅ PostgreSQL running in Docker
- ✅ All tables created successfully
- ✅ Can insert and query data
- ✅ pgAdmin shows all tables

---

### 📋 Day 2: User Registration
**Status**: 🔲 Not Started
**Goal**: Users can create accounts with email and password

**Tasks**:
- [ ] Install bcrypt for password hashing
- [ ] Create auth middleware
- [ ] Create auth routes (register endpoint)
- [ ] Create RegisterPage component
- [ ] Test registration flow
- [ ] Handle validation errors

**Files to Create**:
- `backend/middleware/auth.js`
- `backend/routes/auth.js`
- `frontend/src/pages/auth/RegisterPage.jsx`
- `frontend/src/components/auth/RegisterForm.jsx`

**API Endpoints**:
```
POST /api/auth/register
Body: { email, password, name, phone }
Response: { success: true, message: "User created" }
```

**Success Criteria**:
- ✅ Can register new user
- ✅ Password is hashed in database
- ✅ Duplicate email shows error
- ✅ Validation works (email format, password strength)

---

### 📋 Day 3: User Login & JWT
**Status**: 🔲 Not Started
**Goal**: Users can log in and receive JWT token

**Tasks**:
- [ ] Install jsonwebtoken
- [ ] Create login endpoint
- [ ] Create LoginPage component
- [ ] Create AuthContext for global auth state
- [ ] Store JWT in localStorage
- [ ] Add Header login/logout buttons
- [ ] Test login flow

**Files to Create/Update**:
- `backend/routes/auth.js` (add login, logout, me)
- `frontend/src/pages/auth/LoginPage.jsx`
- `frontend/src/context/AuthContext.jsx`
- `frontend/src/components/Header.jsx` (update)

**API Endpoints**:
```
POST /api/auth/login
Body: { email, password }
Response: { token, user: { id, email, name, role } }

GET /api/auth/me
Headers: { Authorization: "Bearer <token>" }
Response: { user: { id, email, name, role } }
```

**Success Criteria**:
- ✅ Can login with test accounts
- ✅ JWT token stored in localStorage
- ✅ Token persists on page refresh
- ✅ Can logout (clears token)
- ✅ Header shows user name when logged in

---

### 📋 Day 4: Protected Routes & Middleware
**Status**: 🔲 Not Started
**Goal**: Secure routes require authentication and role-based access

**Tasks**:
- [ ] Create auth middleware for backend
- [ ] Create role check middleware
- [ ] Create ProtectedRoute component for frontend
- [ ] Create RoleRoute component
- [ ] Protect API endpoints
- [ ] Test unauthorized access

**Files to Create**:
- `backend/middleware/auth.js` (complete)
- `backend/middleware/roleCheck.js`
- `frontend/src/components/auth/ProtectedRoute.jsx`
- `frontend/src/components/auth/RoleRoute.jsx`

**Usage Examples**:
```javascript
// Backend
router.get('/profile', authenticateToken, getProfile);
router.get('/admin', authenticateToken, requireRole('admin'), getAdminData);

// Frontend
<ProtectedRoute path="/account" component={MyAccountPage} />
<RoleRoute path="/admin" role="admin" component={AdminPage} />
```

**Success Criteria**:
- ✅ Unauthenticated requests get 401 error
- ✅ Wrong role gets 403 error
- ✅ Valid token allows access
- ✅ Frontend redirects to login when unauthorized

---

### 📋 Day 5: My Account Page (User)
**Status**: 🔲 Not Started
**Goal**: Users can view profile and booking history

**Tasks**:
- [ ] Create user routes
- [ ] Create MyAccountPage component
- [ ] Show user profile information
- [ ] Show booking history
- [ ] Add edit profile functionality
- [ ] Test with logged-in user

**Files to Create**:
- `backend/routes/user.js`
- `frontend/src/pages/MyAccountPage.jsx`
- `frontend/src/components/OrderHistory.jsx`
- `frontend/src/components/ProfileEdit.jsx`

**API Endpoints**:
```
GET /api/user/profile
Response: { id, email, name, phone, created_at }

GET /api/user/bookings
Response: { bookings: [...] }

PUT /api/user/profile
Body: { name, phone }
Response: { success: true, user: {...} }
```

**Success Criteria**:
- ✅ Can view profile details
- ✅ Can see all bookings
- ✅ Can edit name and phone
- ✅ Changes persist in database

---

### 📋 Day 6: Cart Integration with Database
**Status**: 🔲 Not Started
**Goal**: Save bookings to database when user completes payment

**Tasks**:
- [ ] Create booking routes
- [ ] Modify PaymentPage to save to database
- [ ] Create order and booking records
- [ ] Send confirmation emails
- [ ] Link anonymous bookings to user (if logged in)
- [ ] Test booking flow

**Files to Create/Update**:
- `backend/routes/booking.js`
- `frontend/src/pages/PaymentPage.jsx` (update)
- `frontend/src/context/CartContext.jsx` (update)

**API Endpoints**:
```
POST /api/bookings
Body: {
  userInfo: { name, email, phone },
  cartItems: [{ spa, treatment, date, time, price }]
}
Response: { order_number, bookings: [...] }
```

**Database Flow**:
1. Create order record
2. Create booking records for each cart item
3. Link to user_id if logged in
4. Send confirmation emails
5. Clear cart

**Success Criteria**:
- ✅ Bookings saved to database
- ✅ Order number generated
- ✅ User can see booking in account
- ✅ Anonymous bookings work
- ✅ Logged-in user bookings linked to account

---

### 📋 Day 7: Spa Owner Dashboard
**Status**: 🔲 Not Started
**Goal**: Spa owners can view bookings for their spa

**Tasks**:
- [ ] Create spa routes
- [ ] Create SpaDashboardPage component
- [ ] Show bookings for spa owner's spa
- [ ] Add spa statistics
- [ ] Add booking status management
- [ ] Test with spa owner account

**Files to Create**:
- `backend/routes/spa.js`
- `frontend/src/pages/SpaDashboardPage.jsx`
- `frontend/src/components/SpaBookingList.jsx`
- `frontend/src/components/SpaStats.jsx`

**API Endpoints**:
```
GET /api/spa/bookings
Response: { bookings: [...] }

GET /api/spa/stats
Response: { total: 10, pending: 3, confirmed: 7 }

PUT /api/spa/bookings/:id/status
Body: { status: "confirmed" }
```

**Success Criteria**:
- ✅ Spa owner can login
- ✅ Sees only their spa's bookings
- ✅ Can view booking details
- ✅ Can see statistics
- ✅ Cannot access other spas' data

---

### 📋 Day 8: Admin CMS - User Management
**Status**: 🔲 Not Started
**Goal**: Admins can view and manage all users

**Tasks**:
- [ ] Create admin routes
- [ ] Create AdminPage component
- [ ] Show all users in table
- [ ] Add user search/filter
- [ ] Allow role changes
- [ ] Allow user activation/deactivation
- [ ] Test with admin account

**Files to Create**:
- `backend/routes/admin.js`
- `frontend/src/pages/AdminPage.jsx`
- `frontend/src/components/admin/UserTable.jsx`
- `frontend/src/components/admin/UserEditModal.jsx`

**API Endpoints**:
```
GET /api/admin/users
Query: ?search=email&role=user&page=1
Response: { users: [...], total: 100 }

PUT /api/admin/users/:id
Body: { role: "spa_owner", is_active: true }

DELETE /api/admin/users/:id
```

**Success Criteria**:
- ✅ Can view all users
- ✅ Can search users
- ✅ Can change user roles
- ✅ Can deactivate users
- ✅ Actions logged in admin_logs

---

### 📋 Day 9: Admin CMS - Booking & Spa Management
**Status**: 🔲 Not Started
**Goal**: Admins can view all bookings and manage spa ownership

**Tasks**:
- [ ] Add booking management to admin routes
- [ ] Create admin booking view
- [ ] Add spa owner assignment
- [ ] Show all spas and owners
- [ ] Test full admin capabilities

**Files to Update**:
- `backend/routes/admin.js` (add endpoints)
- `frontend/src/pages/AdminPage.jsx` (add tabs)
- `frontend/src/components/admin/BookingTable.jsx`
- `frontend/src/components/admin/SpaOwnerManagement.jsx`

**API Endpoints**:
```
GET /api/admin/bookings
Query: ?status=pending&spa_id=123&page=1
Response: { bookings: [...], total: 500 }

POST /api/admin/spa-owners
Body: { user_id, spa_id, spa_name }

GET /api/admin/spa-owners
Response: { spa_owners: [...] }
```

**Success Criteria**:
- ✅ Can view all bookings
- ✅ Can filter by spa, status, date
- ✅ Can assign spa owners to spas
- ✅ Can view spa owner assignments
- ✅ All actions logged

---

### 📋 Day 10: Testing, Bugs & Polish
**Status**: 🔲 Not Started
**Goal**: Full system test and prepare for deployment

**Tasks**:
- [ ] Test all user flows end-to-end
- [ ] Test edge cases
- [ ] Fix any bugs found
- [ ] Add loading states
- [ ] Add error handling
- [ ] Update documentation
- [ ] Create git staging branch
- [ ] Prepare for deployment

**Testing Checklist**:
- [ ] Anonymous user can browse and book
- [ ] User can register and login
- [ ] User can view bookings in account
- [ ] User can edit profile
- [ ] Spa owner can view their bookings
- [ ] Spa owner cannot see other spas
- [ ] Admin can manage all users
- [ ] Admin can assign spa owners
- [ ] Emails sent correctly
- [ ] Database persistence works
- [ ] All routes protected correctly

**Success Criteria**:
- ✅ All features working
- ✅ No critical bugs
- ✅ Ready for staging deployment
- ✅ Documentation updated

---

## Deployment Plan

### After Day 10: Deploy to Staging

**Steps**:
1. Create staging branch
   ```bash
   git checkout -b staging
   git push origin staging
   ```

2. Set up GCP Cloud SQL (PostgreSQL)
3. Create `.env.staging` with Cloud SQL credentials
4. Deploy backend to Cloud Run (staging)
5. Deploy frontend to Cloud Storage (staging)
6. Test on staging environment
7. Fix any deployment issues

### After Staging Tests: Deploy to Production

**Steps**:
1. Merge staging to main
   ```bash
   git checkout main
   git merge staging
   git push origin main
   ```

2. Create production Cloud SQL instance
3. Create `.env.production`
4. Deploy to production
5. Monitor for issues
6. Celebrate! 🎉

---

## Database Schema Reference

### Tables
- `users` - User accounts (customer, spa_owner, admin)
- `spa_owners` - Links users to spas they own
- `orders` - Groups bookings into orders
- `bookings` - Individual spa treatment bookings
- `user_sessions` - JWT token tracking
- `admin_logs` - Audit log for admin actions

### Test Accounts
- **Admin**: `admin@balispaguide.com` / `admin123`
- **User**: `test@example.com` / `user123`
- **Spa Owner**: `spa@example.com` / `spa123`

---

## Resources

- **Development Guide**: `docs/DEV_GUIDE.md`
- **Database Schema**: `backend/migrations/001_initial.sql`
- **Docker Setup**: `docker-compose.yml`
- **Current Deployment**: `DEPLOYMENT.md`

---

## Progress Tracking

**Overall Progress**: 🟢 Day 0 Complete → Day 1 Starting

**Next Steps**:
1. Start Docker containers
2. Test database connection
3. Begin Day 1 tasks

**Last Updated**: December 14, 2025
