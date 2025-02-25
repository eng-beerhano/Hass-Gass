import Contact from '../models/Contact.js';

export const createContact = async (req, res) => {
  try {
    const { firstName, lastName, email, subject, phone, message } = req.body;

    // Validation checks
    if (!firstName || !lastName || !email || !subject || !phone || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newContact = new Contact({ firstName, lastName, email, subject, phone, message });
    await newContact.save();
    res.status(201).json({ message: 'Contact message sent successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send contact message' });
  }
};
export const getContacts = async (req, res) => {
    try {
      const contacts = await Contact.find();
      res.status(200).json(contacts);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch contact messages' });
    }
  };
  // Update contact
  export const updateContact = async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, email, subject, phone, message } = req.body;

    try {
      const updatedContact = await Contact.findByIdAndUpdate(id, { firstName, lastName, email, subject, phone, message }, { new: true });
      res.status(200).json(updatedContact);
    } catch (error) {
      res.status(404).json({ error: 'Contact not found' });
    }
  };
  // Delete contact
  export const deleteContact = async (req, res) => {
    const { id } = req.params;

    try {
      await Contact.findByIdAndDelete(id);
      res.status(200).json({ message: 'Contact deleted successfully' });
    } catch (error) {
      res.status(404).json({ error: 'Contact not found' });
    }
  };