# Demo Booking System - Storage & Notification Guide

## Current Implementation (Development/Testing)

### Where Data is Stored Currently:
- **Location**: Browser's `localStorage`
- **Storage Key**: `tilli_demo_bookings`
- **Format**: JSON object with email as key and booking data as value

### How to View Bookings:

#### Option 1: Admin Panel (Recommended)
Open `view-bookings.html` in your browser to see:
- All bookings in a table format
- Statistics (Total, Upcoming, Completed)
- Export to CSV functionality
- Real-time refresh

#### Option 2: Browser Console
1. Open browser Developer Tools (F12)
2. Go to Console tab
3. Run this command:
```javascript
JSON.parse(localStorage.getItem('tilli_demo_bookings'))
```

#### Option 3: Application Tab (Chrome/Edge)
1. Open Developer Tools (F12)
2. Go to Application tab
3. Expand "Local Storage"
4. Click on your domain
5. Look for key: `tilli_demo_bookings`

---

## ⚠️ Important: Production Requirements

The current implementation using `localStorage` is **ONLY for development/testing**. For production, you need:

### 1. Backend API Integration
- Database to store bookings permanently
- REST API endpoints to handle booking submissions
- Email notification system

### 2. Notification Options:

#### A. Email Notifications (Recommended)
- **To Admin**: Send email when new booking is created
- **To Customer**: Send confirmation email with booking details
- **Reminder Emails**: Send 24 hours before scheduled demo
- **Post-Demo**: Follow-up email after demo completion

#### B. Webhook Integration
- Trigger webhooks to your CRM (Salesforce, HubSpot)
- Send to Slack/Teams channels
- Integrate with calendar systems (Google Calendar, Outlook)

#### C. Admin Dashboard
- Real-time dashboard showing all bookings
- Notifications for new bookings
- Ability to confirm/cancel bookings
- Calendar view of all scheduled demos

---

## Implementation Guide for Production

### Step 1: Update `book-demo.html` to Send to Backend

Replace this section in `book-demo.html` (around line 1193):

```javascript
// Replace this:
// Here you would typically send the data to your backend
console.log('Booking submitted:', formData);

// With this:
async function submitBookingToBackend(formData) {
    try {
        const response = await fetch('https://your-api-domain.com/api/bookings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        
        if (response.ok) {
            const result = await response.json();
            console.log('Booking saved to backend:', result);
            
            // Optionally still save to localStorage as backup
            saveBooking(emailValue, formData);
        } else {
            throw new Error('Failed to save booking');
        }
    } catch (error) {
        console.error('Error saving booking:', error);
        // Fallback: save to localStorage
        saveBooking(emailValue, formData);
        alert('Booking saved locally. Please contact support to confirm.');
    }
}

// Call it after formData is created:
await submitBookingToBackend(formData);
```

### Step 2: Backend API Endpoint Example (Node.js/Express)

```javascript
const express = require('express');
const nodemailer = require('nodemailer');
const app = express();

app.use(express.json());

// Email configuration
const transporter = nodemailer.createTransport({
    // Your email service config (Gmail, SendGrid, etc.)
});

app.post('/api/bookings', async (req, res) => {
    const bookingData = req.body;
    
    // 1. Save to database
    const booking = await db.bookings.create(bookingData);
    
    // 2. Send email to admin
    await transporter.sendMail({
        to: 'sales@tilli.pro',
        subject: `New Demo Booking: ${bookingData.fullName}`,
        html: `
            <h2>New Demo Booking Received</h2>
            <p><strong>Customer:</strong> ${bookingData.fullName}</p>
            <p><strong>Email:</strong> ${bookingData.email}</p>
            <p><strong>Company:</strong> ${bookingData.company}</p>
            <p><strong>Product:</strong> ${bookingData.productName}</p>
            <p><strong>Staff:</strong> ${bookingData.staffName}</p>
            <p><strong>Scheduled:</strong> ${new Date(bookingData.dateTime).toLocaleString()}</p>
            <p><strong>Phone:</strong> ${bookingData.phone || 'N/A'}</p>
            <p><strong>Notes:</strong> ${bookingData.notes || 'None'}</p>
        `
    });
    
    // 3. Send confirmation to customer
    await transporter.sendMail({
        to: bookingData.email,
        subject: 'Demo Booking Confirmation - Tilli',
        html: `
            <h2>Your Demo is Scheduled!</h2>
            <p>Hi ${bookingData.fullName},</p>
            <p>We've confirmed your demo booking:</p>
            <ul>
                <li><strong>Date & Time:</strong> ${new Date(bookingData.dateTime).toLocaleString()}</li>
                <li><strong>Product:</strong> ${bookingData.productName}</li>
                <li><strong>Duration:</strong> 30 minutes</li>
            </ul>
            <p>We'll send you a calendar invite shortly.</p>
        `
    });
    
    // 4. Return success
    res.json({ success: true, bookingId: booking.id });
});

app.listen(3000, () => {
    console.log('API server running on port 3000');
});
```

### Step 3: Database Schema Example

```sql
CREATE TABLE demo_bookings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    company VARCHAR(255),
    phone VARCHAR(50),
    product VARCHAR(50),
    staff VARCHAR(100),
    scheduled_datetime DATETIME NOT NULL,
    notes TEXT,
    status VARCHAR(20) DEFAULT 'scheduled',
    booked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

---

## Quick Access Links

- **Admin Panel**: Open `view-bookings.html` in browser
- **Current Storage**: Browser localStorage
- **Production Setup**: See implementation guide above

---

## Next Steps

1. ✅ **Current**: Use `view-bookings.html` to monitor bookings
2. ⚠️ **Next**: Set up backend API endpoint
3. ⚠️ **Next**: Configure email notifications
4. ⚠️ **Next**: Set up database for permanent storage
5. ⚠️ **Next**: Update `book-demo.html` to send data to backend

