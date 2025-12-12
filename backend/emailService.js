// backend/emailService.js
const nodemailer = require('nodemailer');

// Create email transporter
const createTransporter = async () => {
  // If production email credentials are provided, use them
  if (process.env.EMAIL_USER && process.env.EMAIL_PASSWORD) {
    console.log('Using configured email credentials');
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: process.env.SMTP_PORT || 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });
  }

  // For development: Create a test account automatically
  console.log('No email credentials found. Creating Ethereal test account...');
  try {
    const testAccount = await nodemailer.createTestAccount();
    console.log('Test account created:', testAccount.user);

    return nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass
      }
    });
  } catch (error) {
    console.error('Failed to create test account:', error);
    // Return null if we can't create a transporter
    return null;
  }
};

// Format date for display
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Generate customer email HTML
const generateCustomerEmail = (bookingData) => {
  const { userInfo, cartItems } = bookingData;

  let bookingsHTML = '';
  cartItems.forEach((item, index) => {
    bookingsHTML += `
      <div style="background: #f9fafb; padding: 15px; margin-bottom: 15px; border-radius: 8px; border-left: 4px solid #1e3a8a;">
        <h3 style="margin: 0 0 10px 0; color: #1e3a8a;">Booking ${index + 1}</h3>
        <p style="margin: 5px 0;"><strong>Spa:</strong> ${item.spaName}</p>
        <p style="margin: 5px 0;"><strong>Location:</strong> ${item.spaLocation}</p>
        <p style="margin: 5px 0;"><strong>Treatment:</strong> ${item.treatment}</p>
        <p style="margin: 5px 0;"><strong>Number of Packages:</strong> ${item.quantity}</p>
        <p style="margin: 5px 0;"><strong>Date:</strong> ${formatDate(item.date)}</p>
        <p style="margin: 5px 0;"><strong>Time:</strong> ${item.time}</p>
        <p style="margin: 5px 0;"><strong>Price:</strong> Rp ${(item.price * item.quantity).toLocaleString('id-ID')}</p>
      </div>
    `;
  });

  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 28px;">Booking Confirmed!</h1>
        <p style="color: #e0e7ff; margin: 10px 0 0 0;">Thank you for booking with Bali Spa Guide</p>
      </div>

      <div style="background: white; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 10px 10px;">
        <p style="font-size: 16px; margin-bottom: 20px;">Dear ${userInfo.name},</p>

        <p style="font-size: 14px; color: #6b7280;">Your spa booking has been confirmed! Here are your booking details:</p>

        <h2 style="color: #1e3a8a; border-bottom: 2px solid #1e3a8a; padding-bottom: 10px; margin-top: 30px;">Your Bookings</h2>
        ${bookingsHTML}

        <div style="background: #1e3a8a; color: white; padding: 15px; border-radius: 8px; margin-top: 20px; text-align: center;">
          <h3 style="margin: 0 0 5px 0; font-size: 14px; font-weight: normal; text-transform: uppercase; letter-spacing: 1px;">Total Amount</h3>
          <p style="margin: 0; font-size: 28px; font-weight: bold;">Rp ${totalPrice.toLocaleString('id-ID')}</p>
        </div>

        <h2 style="color: #1e3a8a; border-bottom: 2px solid #1e3a8a; padding-bottom: 10px; margin-top: 30px;">Your Contact Information</h2>
        <p style="margin: 5px 0;"><strong>Name:</strong> ${userInfo.name}</p>
        <p style="margin: 5px 0;"><strong>Email:</strong> ${userInfo.email}</p>
        <p style="margin: 5px 0;"><strong>Phone:</strong> ${userInfo.phone}</p>

        <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin-top: 30px; border-radius: 4px;">
          <p style="margin: 0; color: #92400e; font-size: 14px;"><strong>Important:</strong> Please arrive 10-15 minutes before your scheduled time. The spa will contact you if there are any changes.</p>
        </div>

        <p style="margin-top: 30px; color: #6b7280; font-size: 14px;">If you have any questions, please contact the spa directly or reply to this email.</p>

        <p style="margin-top: 30px; color: #6b7280; font-size: 14px;">Best regards,<br><strong>Bali Spa Guide Team</strong></p>
      </div>

      <div style="text-align: center; padding: 20px; color: #9ca3af; font-size: 12px;">
        <p>© 2025 Bali Spa Guide. All rights reserved.</p>
      </div>
    </body>
    </html>
  `;
};

// Generate spa notification email HTML
const generateSpaEmail = (bookingData) => {
  const { userInfo, cartItems } = bookingData;

  // Filter bookings for this specific spa
  const spaBookings = cartItems.filter(item => item.spaId === cartItems[0].spaId);

  let bookingsHTML = '';
  spaBookings.forEach((item, index) => {
    bookingsHTML += `
      <div style="background: #f9fafb; padding: 15px; margin-bottom: 15px; border-radius: 8px; border-left: 4px solid #10b981;">
        <h3 style="margin: 0 0 10px 0; color: #059669;">Booking ${index + 1}</h3>
        <p style="margin: 5px 0;"><strong>Treatment:</strong> ${item.treatment}</p>
        <p style="margin: 5px 0;"><strong>Number of Packages:</strong> ${item.quantity}</p>
        <p style="margin: 5px 0;"><strong>Date:</strong> ${formatDate(item.date)}</p>
        <p style="margin: 5px 0;"><strong>Time:</strong> ${item.time}</p>
        <p style="margin: 5px 0;"><strong>Price:</strong> Rp ${(item.price * item.quantity).toLocaleString('id-ID')}</p>
      </div>
    `;
  });

  const totalPrice = spaBookings.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #059669 0%, #10b981 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 28px;">New Booking Received!</h1>
        <p style="color: #d1fae5; margin: 10px 0 0 0;">Bali Spa Guide</p>
      </div>

      <div style="background: white; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 10px 10px;">
        <p style="font-size: 16px; margin-bottom: 20px;">You have received a new booking through Bali Spa Guide.</p>

        <h2 style="color: #059669; border-bottom: 2px solid #059669; padding-bottom: 10px; margin-top: 30px;">Customer Information</h2>
        <p style="margin: 5px 0;"><strong>Name:</strong> ${userInfo.name}</p>
        <p style="margin: 5px 0;"><strong>Email:</strong> ${userInfo.email}</p>
        <p style="margin: 5px 0;"><strong>Phone:</strong> ${userInfo.phone}</p>

        <h2 style="color: #059669; border-bottom: 2px solid #059669; padding-bottom: 10px; margin-top: 30px;">Booking Details</h2>
        <p style="margin: 5px 0;"><strong>Spa:</strong> ${cartItems[0].spaName}</p>
        <p style="margin: 5px 0;"><strong>Location:</strong> ${cartItems[0].spaLocation}</p>

        <h3 style="color: #059669; margin-top: 20px;">Treatments Booked</h3>
        ${bookingsHTML}

        <div style="background: #059669; color: white; padding: 15px; border-radius: 8px; margin-top: 20px; text-align: center;">
          <h3 style="margin: 0 0 5px 0; font-size: 14px; font-weight: normal; text-transform: uppercase; letter-spacing: 1px;">Total Amount</h3>
          <p style="margin: 0; font-size: 28px; font-weight: bold;">Rp ${totalPrice.toLocaleString('id-ID')}</p>
        </div>

        <div style="background: #dbeafe; border-left: 4px solid #3b82f6; padding: 15px; margin-top: 30px; border-radius: 4px;">
          <p style="margin: 0; color: #1e40af; font-size: 14px;"><strong>Action Required:</strong> Please contact the customer to confirm the booking and provide any additional instructions.</p>
        </div>

        <p style="margin-top: 30px; color: #6b7280; font-size: 14px;">Best regards,<br><strong>Bali Spa Guide Platform</strong></p>
      </div>

      <div style="text-align: center; padding: 20px; color: #9ca3af; font-size: 12px;">
        <p>© 2025 Bali Spa Guide. All rights reserved.</p>
      </div>
    </body>
    </html>
  `;
};

// Send booking confirmation emails
const sendBookingEmails = async (bookingData) => {
  const { userInfo, cartItems } = bookingData;

  try {
    // Create transporter (may be null if email not configured)
    const transporter = await createTransporter();

    if (!transporter) {
      console.log('⚠️  Email not configured. Skipping email notifications.');
      console.log('📧 Booking details would have been sent to:');
      console.log('   - Customer:', userInfo.email);
      console.log('   - Spa: azlan@net1io.com');
      return {
        success: true,
        emailsSent: false,
        message: 'Booking confirmed but emails not sent (email not configured)'
      };
    }

    // Send email to customer
    const customerEmail = {
      from: process.env.EMAIL_FROM || '"Bali Spa Guide" <noreply@balispaguide.com>',
      to: userInfo.email,
      subject: 'Booking Confirmation - Bali Spa Guide',
      html: generateCustomerEmail(bookingData)
    };

    // Send email to spa (azlan@net1io.com)
    const spaEmail = {
      from: process.env.EMAIL_FROM || '"Bali Spa Guide" <noreply@balispaguide.com>',
      to: 'azlan@net1io.com',
      subject: `New Booking: ${cartItems[0].spaName}`,
      html: generateSpaEmail(bookingData)
    };

    // Send both emails
    const customerResult = await transporter.sendMail(customerEmail);
    const spaResult = await transporter.sendMail(spaEmail);

    console.log('✅ Customer email sent:', customerResult.messageId);
    console.log('✅ Spa email sent:', spaResult.messageId);

    // If using Ethereal for testing, log the preview URLs
    const customerPreview = nodemailer.getTestMessageUrl(customerResult);
    const spaPreview = nodemailer.getTestMessageUrl(spaResult);

    if (customerPreview || spaPreview) {
      console.log('\n📧 Email Preview URLs (test emails):');
      if (customerPreview) console.log('   Customer:', customerPreview);
      if (spaPreview) console.log('   Spa:', spaPreview);
      console.log('');
    }

    return {
      success: true,
      emailsSent: true,
      customerMessageId: customerResult.messageId,
      spaMessageId: spaResult.messageId,
      previewUrls: {
        customer: customerPreview,
        spa: spaPreview
      }
    };
  } catch (error) {
    console.error('❌ Error sending emails:', error.message);
    // Don't throw - just log and return partial success
    return {
      success: true,
      emailsSent: false,
      message: 'Booking confirmed but emails failed to send',
      error: error.message
    };
  }
};

module.exports = { sendBookingEmails };
