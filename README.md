# 🍽️ BiteManager - Restaurant Management Website

## Live Site Link  
[Visit BiteManager](https://bite-manager-client-shakir.vercel.app/)

---

## Project Purpose  
BiteManager is a comprehensive restaurant management system built with the MERN stack to provide an engaging and seamless experience for customers and staff. The website streamlines internal processes, enhances customer interaction, and boosts the restaurant's online presence.  

---

## Key Features  

### General Features:  
- **Fully Responsive**: Works perfectly on mobile, tablet, and desktop devices.  
- **Authentication System**:  
  - Email and password-based authentication.  
  - Google/GitHub social login.  
  - JWT authentication with secure private routes.  
- **Theme Customization**:  
  - Light/Dark mode toggle.  

### Pages and Functionalities:  

#### Public Pages  
1. **Home Page**:  
   - Banner section with heading, description, and CTA button.  
   - Top Foods section showcasing 6 best-selling items with a "See All" button.  
   - Extra sections to enhance engagement.  

2. **All Foods Page**:  
   - Displays all food items with search functionality.  
   - Pagination for seamless browsing.  

3. **Single Food Page**:  
   - Detailed food information, including purchase count.  
   - "Purchase" button with quantity checks.  

4. **Gallery Page**:  
   - Lightbox-enabled gallery.  

#### Private Pages  
1. **Food Purchase Page**:  
   - Form to capture food purchase details.  
   - Validates quantity availability.  
   - Prevents users from purchasing their own added items.  

2. **My Foods Page**:  
   - Displays foods added by the logged-in user.  
   - Allows updating food items via a form/modal.  

3. **Add Food Page**:  
   - Form to add new food items with details like image, category, origin, and description.  

4. **My Orders Page**:  
   - Shows all orders placed by the user, including buying date and time.  
   - Allows deletion of orders.  

---

## Deployment Highlights  
- Server and client deployed with no CORS, 404, or 504 errors.  
- Proper route handling to prevent errors during page reload.  
- Firebase domain authorization for secure login.  

---

## Security  
- Firebase configuration keys and MongoDB credentials are secured using environment variables.  
- JWT implementation ensures secure private routes and user authentication.  

---

## Technologies Used  

### Frontend  
- **React.js**: For building the user interface.  
- **TailwindCSS + DaisyUI**: For responsive and visually appealing design.  
- **SweetAlert2**: For alerts and notifications.  
- **Framer Motion**: For animations.  
- **React Router DOM**: For routing.  
- **Yet Another React Lightbox**: For image galleries.  

### Backend  
- **Node.js**: Backend runtime.  
- **Express.js**: Backend framework.  
- **MongoDB**: Database for storing data.  
- **JWT**: For authentication.  

### Additional Packages  
- **Moment.js**: For date and time formatting.  
- **React Query**: For API calls and state management.  
- **Axios**: For HTTP requests.  
- **Lottie React**: For animations.  

---

## Key Commit Highlights  

### Client Side  
- Minimum 15 meaningful commits with descriptive messages for UI and functionality updates.  

### Server Side  
- Minimum 8 meaningful commits with descriptive messages for backend implementation.  

---

## Notable Extras  
- **Spinner for Loading State**: Added a loader to improve user experience during data fetch.  
- **Pagination**: Server-side pagination for "All Foods" page.  
- **Search Functionality**: Food items can be searched by name.  
- **Theme Toggle**: Allows users to switch between light and dark modes.  

Enjoy exploring BiteManager! 🍴
