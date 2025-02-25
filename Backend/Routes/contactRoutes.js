import express from 'express';
import { createContact, deleteContact, getContacts, updateContact } from '../controllers/contactController.js';

const router = express.Router();

router.post('/contact', createContact);
router.get('/contacts', getContacts); // Add this route to fetch contacts
router.put('/update-contact', updateContact);
router.delete('/contact/:id', deleteContact);

export default router;