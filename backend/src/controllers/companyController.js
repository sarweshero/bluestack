import createError from 'http-errors';
import sanitizeHtml from 'sanitize-html';
import { createCompany, getCompanyByOwner, updateCompanyById } from '../models/companyModel.js';
import cloudinary from '../config/cloudinary.js';

export const registerCompany = async (req, res, next) => {
  try {
    const owner_id = req.user.id;
    const payload = {
      owner_id,
      company_name: sanitizeHtml(req.body.company_name),
      address: sanitizeHtml(req.body.address),
      city: sanitizeHtml(req.body.city),
      state: sanitizeHtml(req.body.state),
      country: sanitizeHtml(req.body.country),
      postal_code: sanitizeHtml(req.body.postal_code),
      website: sanitizeHtml(req.body.website || ''),
      industry: sanitizeHtml(req.body.industry),
      founded_date: req.body.founded_date || null,
      description: sanitizeHtml(req.body.description || ''),
      social_links: req.body.social_links || null,
      logo_url: req.body.logo_url || null,
      banner_url: req.body.banner_url || null
    };

    const existing = await getCompanyByOwner(owner_id);
    if (existing) return next(createError(400, 'Company already registered for this user'));

    const created = await createCompany(payload);
    res.json({ success: true, data: created });
  } catch (err) {
    next(err);
  }
};

export const getProfile = async (req, res, next) => {
  try {
    const owner_id = req.user.id;
    const profile = await getCompanyByOwner(owner_id);
    if (!profile) return res.json({ success: true, data: null });
    res.json({ success: true, data: profile });
  } catch (err) {
    next(err);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const owner_id = req.user.id;
    const current = await getCompanyByOwner(owner_id);
    if (!current) return next(createError(404, 'Profile not found'));

    const patch = {};
    const updatable = ['company_name','address','city','state','country','postal_code','website','industry','founded_date','description','social_links','logo_url','banner_url'];
    updatable.forEach(k => {
      if (req.body[k] !== undefined) patch[k] = sanitizeHtml(req.body[k]);
    });

    const updated = await updateCompanyById(current.id, patch);
    res.json({ success: true, data: updated });
  } catch (err) {
    next(err);
  }
};

export const uploadImage = async (req, res, next) => {
  try {
    // Expect multer to attach file in req.file
    if (!req.file || !req.file.path) return next(createError(400, 'File required'));
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: process.env.CLOUDINARY_FOLDER || 'company_module'
    });
    res.json({ success: true, data: { url: result.secure_url, public_id: result.public_id }});
  } catch (err) {
    next(err);
  }
};
