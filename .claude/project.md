# Bali Spa Guide - Project Documentation

## Project Overview
A full-stack web application for browsing and booking spa treatments in Bali. Features multi-page navigation, shopping cart system with mandatory date/time booking, and comprehensive filtering/sorting capabilities.

## Tech Stack

### Backend
- **Runtime**: Node.js with Express 5.2.1
- **Port**: 4000
- **Data**: CSV-based (bsg_spas.csv) with 1059 spas + PostgreSQL for users/bookings
- **Database**: PostgreSQL 15 (Docker for local, Cloud SQL for production)
- **Authentication**: JWT with bcrypt password hashing
- **APIs**: RESTful endpoints for filters, spa listings, auth, bookings
- **Dependencies**: express, cors, csv-parse, pg, bcrypt, jsonwebtoken, nodemailer

### Frontend
- **Framework**: React 19.2.1
- **Build Tool**: Vite 7.2.7
- **Routing**: React Router DOM 7.10.1
- **Port**: 5173 (development)
- **State Management**: React Context API (CartContext, AuthContext)
- **Storage**: localStorage for cart + JWT token
- **Authentication**: JWT stored in localStorage
- **Theme**: Professional blue (#1e3a8a primary, #3b82f6 accent)

## Architecture

### Backend Structure
```
backend/
├── config/
│   └── db.js                   # PostgreSQL connection pool
├── middleware/
│   ├── auth.js                 # JWT authentication middleware
│   └── roleCheck.js            # Role-based access control
├── routes/
│   ├── auth.js                 # Register, login, logout
│   ├── user.js                 # User profile and bookings
│   ├── spa.js                  # Spa owner dashboard
│   └── admin.js                # Admin CMS
├── migrations/
│   └── 001_initial.sql         # Database schema
├── server.js                   # Express server with CORS, API routes
├── spaData.js                  # CSV parser, filtering, sorting logic
├── emailService.js             # Email notifications
├── bsg_spas.csv                # Spa directory data
├── .env.local                  # Local development config
└── package.json                # Dependencies and scripts
```

### Frontend Structure
```
frontend/
├── src/
│   ├── main.jsx                    # Router setup with CartProvider
│   ├── App.jsx                     # Root component
│   ├── pages/
│   │   ├── HomePage.jsx            # Main directory with filters
│   │   ├── LocationPage.jsx        # 28 location cards + filtered view
│   │   ├── TreatmentPage.jsx       # 20 treatment cards + filtered view
│   │   ├── CartPage.jsx            # Cart management with pricing
│   │   ├── PaymentPage.jsx         # Booking summary with total
│   │   ├── MyAccountPage.jsx       # User profile and booking history
│   │   ├── SpaDashboardPage.jsx    # Spa owner bookings view
│   │   ├── AdminPage.jsx           # Admin CMS
│   │   └── auth/
│   │       ├── LoginPage.jsx       # User login
│   │       └── RegisterPage.jsx    # User registration
│   ├── components/
│   │   ├── Header.jsx              # Navigation with cart badge + login
│   │   ├── SpaCard.jsx             # Treatment selection + Add to Cart
│   │   ├── SortDropdown.jsx        # 6 sort options
│   │   └── auth/
│   │       ├── ProtectedRoute.jsx  # Route guard
│   │       └── RoleRoute.jsx       # Role-based route guard
│   │   ├── FilterBar.jsx           # Location/treatment/budget filters
│   │   └── [other components]
│   ├── context/
│   │   └── CartContext.jsx         # Cart state + TREATMENT_PRICE constant
│   └── styles.css                  # Complete styling (~950+ lines)
└── [config files]
```

## Features

### 1. Multi-Page Navigation (3 Pages)
- **Home** (`/`): Main spa directory with filters, sorting, pagination
- **Locations** (`/locations`, `/locations/:location`): 28 location cards or filtered spa list
- **Treatments** (`/treatments`, `/treatments/:treatment`): 20 treatment cards or filtered spa list
- **Cart** (`/cart`): Shopping cart management
- **Payment** (`/payment`): Booking confirmation

### 2. Sorting Options (6 Total)
- Rating: High to Low / Low to High
- Price: High to Low / Low to High
- Alphabetically: A-Z / Z-A

### 3. Shopping Cart System
- Treatment selection dropdown on spa cards
- "Add to Cart" button with success feedback
- Cart badge in header showing item count
- localStorage persistence across sessions
- All treatments visible as badges (no slice limit)
- Price display: Rp 1,000,000 per treatment

### 4. Cart Management
- Mandatory date selection (HTML5 date picker, min=today)
- Mandatory time selection (9:00 AM - 4:00 PM hourly slots)
- Delete items with confirmation
- Real-time validation
- Payment button enabled only when ALL items complete
- Individual and total pricing display

### 5. Payment Flow
- Booking summary with numbered items
- Display: spa, location, treatment, price, date, time
- Formatted total price (Indonesian Rupiah)
- Confirmation clears cart and returns home

## Data Model

### Spa Object (from CSV)
```javascript
{
  nid: string,
  title: string,
  email: string,
  phone: string,
  address: string,
  website: string,
  location: string,
  budget: string,        // e.g., "More than Rp 500.000"
  rating: number,        // 1-5
  opening_hour: string,  // e.g., "09:00"
  closing_hour: string,  // e.g., "20:00"
  treatments: string[]   // Parsed from semicolon-separated string
}
```

### Cart Item
```javascript
{
  id: number,              // timestamp
  spaId: string,
  spaName: string,
  spaLocation: string,
  treatment: string,
  price: number,           // 1000000 (Rp 1,000,000)
  date: string,            // YYYY-MM-DD format
  time: string             // "09:00 AM" format
}
```

## API Endpoints

### GET /api/filters
Returns available filter options:
```javascript
{
  locations: string[],    // 28 unique locations
  treatments: string[],   // 20 unique treatments
  budgets: string[]       // Budget ranges
}
```

### GET /api/spas
Query parameters:
- `page`: number (default: 1)
- `pageSize`: number (default: 9)
- `location`: string (filter by location)
- `treatment`: string (filter by treatment)
- `budget`: string (filter by budget)
- `search`: string (search in name/address/location)
- `sort`: string (rating_desc|rating_asc|budget_desc|budget_asc|title_asc|title_desc)

Returns:
```javascript
{
  spas: Spa[],
  total: number,
  page: number,
  pageSize: number,
  totalPages: number
}
```

### GET /api/spas/:id
Returns single spa object by ID.

## Running the Application

### Development Mode (with Docker)

**Step 1: Start PostgreSQL**
```bash
docker-compose up -d
# Wait 10 seconds for database to initialize
docker logs balispaguide-postgres
```

**Step 2: Start Application**
```bash
# Option 1: Using root npm scripts (recommended)
npm run dev:backend      # Backend only (port 4000)
npm run dev:frontend     # Frontend only (port 5173)

# Option 2: Manual commands
cd backend
node server.js

# Frontend (separate terminal)
cd frontend
npm run dev
```

**Access Points:**
- Frontend: http://localhost:5173
- Backend: http://localhost:4000
- Database UI: http://localhost:5050 (pgAdmin)
  - Email: `admin@balispaguide.com`
  - Password: `admin`

**Stop Everything:**
```bash
# Stop Docker containers
docker-compose down

# Or keep data and just stop
docker-compose stop
```

### Production Build
```bash
cd frontend
npm run build              # Creates dist/ folder
npm run preview            # Preview production build
```

## Environment Variables

### Backend
- `PORT`: Server port (default: 4000)
- `NODE_ENV`: Environment (development/production)

### Frontend
- `VITE_API_BASE`: Backend API URL (default: http://localhost:4000)

## Deployment

### Current Production (Digital Ocean)
- **Server**: Digital Ocean Droplet at 170.64.148.27
- **Backend**: PM2 running on port 4000
- **Frontend**: Nginx serving built files from /var/www/balispaguide
- **Deployment**: Automated via deploy.sh script
- **Guide**: See [deployment.md](../deployment.md) for complete guide

### Email Configuration
- **Service**: Gmail/SendGrid (configurable via .env)
- **Customer Emails**: Booking confirmations sent to customer
- **Spa Emails**: Booking notifications sent to azlan@net1io.com
- **Guide**: See [references/email_deploy.md](../references/email_deploy.md)

### Alternative Deployment Options
- **Google Cloud**: See [references/deploy_gcp.md](../references/deploy_gcp.md)
- **DigitalOcean App Platform**: See [references/deploy_digitalcoean.md](../references/deploy_digitalcoean.md)

## Planned Features (In Development)

### Phase 1: Current State ✅
- 3-page navigation with routing
- 6 sort options including alphabetical
- Shopping cart with treatment selection
- Mandatory date/time booking (9 AM - 4 PM)
- Payment flow with confirmation
- Full pricing display (Rp 1,000,000 per treatment)
- localStorage persistence

### Phase 2: User Authentication (Planned)
- Login page with JWT authentication
- User registration and profile management
- Password reset functionality
- Protected routes
- User booking history
- Session management

### Phase 3: Payment Integration (Planned)
- Stripe payment processing
- Secure checkout flow
- Real-time payment confirmation
- Receipt generation
- Refund handling
- Payment history

### Phase 4: Email Notifications ✅ (Completed)
- Email confirmation system (nodemailer)
- Customer booking confirmations with details
- Spa notification emails with customer info
- Gmail/SendGrid configuration support
- HTML-formatted email templates

### Phase 5: Database Migration (Planned)
- Cloud SQL PostgreSQL or MongoDB setup
- User accounts table
- Booking records table
- Payment transactions table
- Spa favorites/wishlist

### Phase 6: Additional Features (Planned)
- SMS notifications (Twilio)
- Spa availability calendar
- Loyalty programs
- Gift vouchers
- Social media integration
- Custom domain and SSL/HTTPS

## Code Standards

### Naming Conventions
- Components: PascalCase (e.g., `SpaCard.jsx`)
- Files: camelCase or kebab-case
- CSS classes: kebab-case (e.g., `spa-card`)
- Functions: camelCase
- Constants: UPPER_SNAKE_CASE (e.g., `TREATMENT_PRICE`)

### Component Structure
```javascript
import statements
// Component definition
export default ComponentName
```

### Context Pattern
```javascript
// Create Context
const CartContext = createContext()

// Provider Component
export const CartProvider = ({ children }) => { ... }

// Custom Hook
export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within CartProvider')
  return context
}
```

## Testing

### Manual Testing Checklist
- [ ] All 3 pages load correctly
- [ ] Navigation works (Home, Locations, Treatments, Cart)
- [ ] Location filter shows 28 cards, clicking filters spas
- [ ] Treatment filter shows 20 cards, clicking filters spas
- [ ] All 6 sort options work (rating, budget, alphabetical)
- [ ] Add to Cart shows success message
- [ ] Cart badge shows correct count
- [ ] Cart persists after page refresh
- [ ] Date picker prevents past dates
- [ ] Time dropdown shows 9 AM - 4 PM (8 slots)
- [ ] Payment button disabled until all items complete
- [ ] Payment page shows all bookings with prices
- [ ] Total price calculates correctly
- [ ] Confirm payment clears cart and redirects home
- [ ] Pricing displays as Rp 1,000,000 per treatment
- [ ] All treatments visible on spa cards

## Known Issues/Limitations
- Payment is simulated (Stripe integration in development)
- No user authentication yet (in development)
- No email confirmations
- No SMS notifications
- No actual spa availability checking
- CSV-based data (will migrate to Cloud SQL)

## Git Repository
- **Branch**: main
- **Remote**: [To be configured]
- **Last Commit**: "Initial commit - balispaguidw_react" (3ccf45d)

## Support Resources
- **README.md**: User-facing documentation
- **references/plan.md**: Development timeline and task tracking
- **references/dev_guide.md**: Complete local development guide with Docker
- **deployment.md**: Production deployment guide
- **docker-compose.yml**: Local PostgreSQL setup
- **backend/migrations/001_initial.sql**: Database schema
- **backend/config/db.js**: Database connection
- **backend/spaData.js**: Data processing logic documentation
- **frontend/src/context/CartContext.jsx**: Cart system implementation

## Development Notes

### Color Theme
- Primary: `#1e3a8a` (deep blue)
- Accent: `#3b82f6` (bright blue)
- Background: `#f0f4f8` (light blue-grey)
- Border: `#cbd5e1` (grey)
- Hover: `#e0e7ff` (light purple-blue)
- Success: `#10b981` (green)
- Error: `#ef4444` (red)

### Time Slots
```javascript
const TIME_SLOTS = [
  "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"
];
```

### Pricing
```javascript
const TREATMENT_PRICE = 1000000; // Rp 1,000,000 per treatment
```

### Indonesian Rupiah Formatting
```javascript
const formatPrice = (price) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(price);
};
// Result: "Rp1.000.000"
```

## Recent Changes
- ✅ Deployed to Digital Ocean (http://170.64.148.27)
- ✅ Implemented email notification system with nodemailer
- ✅ Created automated deployment script (deploy.sh)
- ✅ Added customer and spa booking email confirmations
- ✅ Created comprehensive deployment guide (deployment.md)
- ✅ Documented email configuration (references/email_deploy.md)
- ✅ Set up PM2 process manager for backend
- ✅ Configured Nginx for frontend hosting and API proxy
- ✅ Added pricing display to all pages
- ✅ Made all treatments visible on spa cards
- ✅ Updated README with planned features
- ✅ Implemented shopping cart with localStorage
- ✅ Added mandatory date/time booking
- ✅ Created payment flow

---

**Last Updated**: December 14, 2025
**Project Status**: Deployed to Production on Digital Ocean
**Production URL**: http://170.64.148.27
**Next Steps**: Configure SSL/HTTPS, custom domain, email service (Gmail/SendGrid)
