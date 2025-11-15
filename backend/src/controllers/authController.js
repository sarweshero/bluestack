import bcrypt from 'bcrypt';
import createError from 'http-errors';
import sanitizeHtml from 'sanitize-html';
import admin from '../config/firebase.js';
import { createUser, findUserByEmail, updateUser } from '../models/userModel.js';
import { signJwt } from '../utils/jwt.js';
import { isValidPhoneNumber } from 'libphonenumber-js';

export const register = async (req, res, next) => {
  try {
    const payload = {
      email: sanitizeHtml(req.body.email),
      password: req.body.password,
      full_name: sanitizeHtml(req.body.full_name),
      gender: sanitizeHtml(req.body.gender),
      mobile_no: sanitizeHtml(req.body.mobile_no),
      signup_type: sanitizeHtml(req.body.signup_type || 'e')
    };

    // Validate phone number (allow common formats)
    if (payload.mobile_no && !isValidPhoneNumber(payload.mobile_no)) {
      console.log('Invalid phone number:', payload.mobile_no);
      return next(createError(400, 'Invalid mobile number format. Use international format like +1234567890 or +919876543210'));
    }

    const existing = await findUserByEmail(payload.email);
    if (existing) return next(createError(400, 'Email already registered'));

    const hashed = await bcrypt.hash(payload.password, 10);

    // Create a Firebase user for email/password sign-in (if Firebase is configured)
    try {
      if (admin.apps && admin.apps.length > 0) {
        const userRecord = await admin.auth().createUser({
          email: payload.email,
          emailVerified: false,
          password: payload.password,
          displayName: payload.full_name,
          phoneNumber: payload.mobile_no
        });
        console.log('Firebase user created:', userRecord.uid);
      }
    } catch (firebaseError) {
      console.log('⚠️  Firebase user creation skipped:', firebaseError.message);
    }

    // store in DB (password_hash not the raw password)
    const created = await createUser({
      email: payload.email,
      password_hash: hashed,
      full_name: payload.full_name,
      signup_type: payload.signup_type,
      gender: payload.gender,
      mobile_no: payload.mobile_no
    });

    res.json({ success: true, message: 'User registered successfully. Please verify mobile OTP.', data: { user_id: created.id } });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const email = sanitizeHtml(req.body.email);
    const password = req.body.password;
    const user = await findUserByEmail(email);
    if (!user) return next(createError(401, 'Invalid credentials'));

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return next(createError(401, 'Invalid credentials'));

    // Optionally verify via Firebase custom token or check firebase user
    const token = signJwt({ userId: user.id, email: user.email });
    res.json({ success: true, token, user: { id: user.id, email: user.email, full_name: user.full_name } });
  } catch (err) {
    next(err);
  }
};

export const verifyMobile = async (req, res, next) => {
  try {
    const { uid } = req.body; // firebase uid after verifying OTP on client
    if (!uid) return next(createError(400, 'uid required'));
    
    // Check if Firebase is available
    if (!admin.apps || admin.apps.length === 0) {
      return next(createError(501, 'Firebase not configured - mobile verification unavailable'));
    }
    
    const fbUser = await admin.auth().getUser(uid);
    if (!fbUser) return next(createError(400, 'Invalid UID'));
    // find local user by phone
    const { rows } = await (await import('../config/db.js')).default.query('SELECT * FROM users WHERE mobile_no=$1', [fbUser.phoneNumber]);
    const user = rows[0];
    if (!user) return next(createError(404, 'User not found'));
    const updated = await updateUser(user.id, { is_mobile_verified: true });
    res.json({ success: true, message: 'Mobile verified', user: updated });
  } catch (err) {
    next(err);
  }
};

export const verifyEmailWebhook = async (req, res, next) => {
  // Endpoint to be called /visited by client after email link clicked (or via firebase)
  try {
    const { email } = req.query;
    if (!email) return next(createError(400, 'email required'));
    const user = await findUserByEmail(email);
    if (!user) return next(createError(404, 'User not found'));
    const updated = await updateUser(user.id, { is_email_verified: true });
    res.json({ success: true, message: 'Email verified', user: updated });
  } catch (err) {
    next(err);
  }
};
