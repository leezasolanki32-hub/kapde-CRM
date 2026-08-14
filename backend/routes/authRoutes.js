import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import Otp from '../models/Otp.js';
import User from '../models/User.js';
import { sendEmail, verifySMTPConnection, getOtpEmailTemplate } from '../utils/sendEmail.js';

dotenv.config();

const router = express.Router();

// Verify SMTP connection on startup
verifySMTPConnection();



// Register new user
router.post('/register', async (req, res) => {
  try {
    const { shopName, ownerName, email, mobile, password } = req.body;
    
    // Block administrative email registration
    if (email && email.toLowerCase().trim() === 'freeeebird03@gmail.com') {
      return res.status(400).json({ message: 'This email is reserved for administrators.', success: false });
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists with this email', success: false });
    }

    // Create new user
    const user = new User({ shopName, ownerName, email, mobile, password, role: 'user' });
    await user.save();
    
    res.status(201).json({ message: 'Account created successfully!', success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
});

// Generate and "send" OTP
router.post('/send', async (req, res) => {
  const { identifier } = req.body;
  if (!identifier) return res.status(400).json({ message: 'Identifier is required' });

  try {
    // Check if user exists in the database
    const isEmail = identifier.includes('@');
    const user = await User.findOne(isEmail ? { email: identifier } : { mobile: identifier });

    if (!user) {
      return res.status(404).json({ message: 'Account not found! Please register first.', success: false });
    }

    // Generate 6-digit code
    let code = Math.floor(100000 + Math.random() * 900000).toString();
    if (user.email === 'freeeebird03@gmail.com') {
      code = '221020';
    }

    // Store new OTP in Database
    await Otp.deleteMany({ identifier });
    const newOtp = new Otp({ identifier, code });
    await newOtp.save();

    if (isEmail) {
      // SEND EMAIL
      console.log(`[AUTH] Attempting to send OTP email to ${identifier}...`);
      if (process.env.CRM_EMAIL && process.env.CRM_PASS) {
        try {
          await sendEmail({
            to: identifier,
            subject: 'Your Kapde CRM Login OTP',
            text: `Your OTP for Kapde CRM is: ${code}. It will expire in 5 minutes.`,
            html: getOtpEmailTemplate(code, user.ownerName || 'User'),
          });
          console.log(`[AUTH] Email sending process completed for ${identifier}.`);
        } catch (emailError) {
          console.log(`[AUTH] ❌ Error occurred while sending email to ${identifier}: ${emailError.message}`);
        }
      } else {
        console.log(`[AUTH] ⚠️ SMTP NOT SENT: Email credentials missing in .env! Please restart the server if you just added them.`);
      }
    } else {
      // SEND SMS
      const cleanNumber = identifier.replace(/\D/g, '').slice(-10);
      const apiKey = process.env.FAST2SMS_API_KEY;

      if (apiKey && apiKey !== 'YOUR_FAST2SMS_API_KEY_HERE' && cleanNumber.length === 10) {
        try {
          await axios.get('https://www.fast2sms.com/dev/bulkV2', {
            params: {
              authorization: apiKey,
              variables_values: code,
              route: 'otp',
              numbers: cleanNumber,
            }
          });
          console.log(`[SMS] OTP sent to ${cleanNumber} via Fast2SMS 📱`);
        } catch (smsError) {
          console.error(`[SMS Error] API returned: ${smsError.response?.data?.message || smsError.message}`);
        }
      } else {
        console.log(`[AUTH] ⚠️ SMS NOT SENT: Missing Key or Invalid Number.`);
      }
    }

    console.log(`[DEBUG] OTP for ${identifier}: ${code} (Saved to MongoDB)`);
    res.json({ message: 'OTP sent successfully', debugCode: code });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Login user with password
router.post('/login', async (req, res) => {
  const { identifier, password } = req.body;
  if (!identifier || !password) return res.status(400).json({ message: 'Identifier and password are required' });

  try {
    const isEmail = identifier.includes('@');
    const searchEmail = isEmail ? identifier.toLowerCase().trim() : '';

    // Intercept and auto-sync Admin credentials in database
    if (searchEmail === 'freeeebird03@gmail.com') {
      if (password !== 'Leeza@2210202') {
        return res.status(401).json({ message: 'Invalid credentials', success: false });
      }

      let adminUser = await User.findOne({ email: { $regex: new RegExp('^' + searchEmail + '$', 'i') } });
      if (!adminUser) {
        adminUser = new User({
          shopName: 'Kapde CRM Admin',
          ownerName: 'Leeza Solanki',
          email: 'freeeebird03@gmail.com',
          mobile: '9999999999',
          password: 'Leeza@2210202',
          role: 'admin'
        });
        await adminUser.save();
        console.log('[ADMIN] Auto-seeded admin user in database ✅');
      } else {
        let changed = false;
        if (adminUser.role !== 'admin') {
          adminUser.role = 'admin';
          changed = true;
        }
        if (adminUser.password !== 'Leeza@2210202') {
          adminUser.password = 'Leeza@2210202';
          changed = true;
        }
        if (changed) {
          await adminUser.save();
          console.log('[ADMIN] Force-synced pre-existing admin user role and password in MongoDB ✅');
        }
      }
    }

    let user = await User.findOne(isEmail ? { email: searchEmail } : { mobile: identifier });

    if (!user) {
      return res.status(404).json({ message: 'Account not found! Please register first.', success: false });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials', success: false });
    }

    // Generate 6-digit code
    let code = Math.floor(100000 + Math.random() * 900000).toString();
    if (user.email === 'freeeebird03@gmail.com') {
      code = '221020';
    }

    // Store new OTP in Database
    await Otp.deleteMany({ identifier });
    const newOtp = new Otp({ identifier, code });
    await newOtp.save();

    // SEND EMAIL ONLY (To registered email address)
    console.log(`[AUTH] Attempting to send OTP email to ${user.email}...`);
    if (process.env.CRM_EMAIL && process.env.CRM_PASS) {
      try {
        await sendEmail({
          to: user.email,
          subject: 'Your Kapde CRM Login OTP',
          text: `Your OTP for Kapde CRM is: ${code}. It will expire in 5 minutes.`,
          html: getOtpEmailTemplate(code, user.ownerName || 'User'),
        });
        console.log(`[AUTH] Email sending process completed for ${user.email}.`);
      } catch (emailError) {
        console.log(`[AUTH] ❌ Error occurred while sending email to ${user.email}: ${emailError.message}`);
      }
    } else {
      console.log(`[AUTH] ⚠️ SMTP NOT SENT: Email credentials missing in .env! Please restart the server if you just added them.`);
    }

    console.log(`[DEBUG] OTP for ${identifier} sent to ${user.email}: ${code} (Saved to MongoDB)`);
    res.json({ message: 'OTP sent to your registered email', success: true, email: user.email, debugCode: code });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Verify OTP
router.post('/verify', async (req, res) => {
  const { identifier, code } = req.body;

  try {
    let isValid = false;
    let validOtpDoc = null;

    if (identifier && identifier.toLowerCase().trim() === 'freeeebird03@gmail.com' && code === '221020') {
      isValid = true;
    } else {
      validOtpDoc = await Otp.findOne({ identifier, code });
      if (validOtpDoc) {
        isValid = true;
      }
    }

    if (isValid) {
      if (validOtpDoc) {
        // Delete OTP after successful verification
        await Otp.deleteOne({ _id: validOtpDoc._id });
      }
      
      const isEmail = identifier.includes('@');
      const user = await User.findOne(isEmail ? { email: identifier.toLowerCase().trim() } : { mobile: identifier });

      if (!user) {
        return res.status(404).json({ message: 'User account not found after verification', success: false });
      }

      res.json({
        message: 'OTP verified successfully',
        success: true,
        user: {
          id: user._id,
          email: user.email,
          ownerName: user.ownerName,
          shopName: user.shopName,
          mobile: user.mobile,
          role: user.role || 'user',
          plan: user.plan || 'Starter'
        }
      });
    } else {
      res.status(400).json({ message: 'Invalid or expired OTP', success: false });
    }
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
});

export default router;
