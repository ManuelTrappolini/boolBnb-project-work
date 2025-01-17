const connection = require('../database/connection');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Controller to send the message and save it in the database
const MessageController = {
    sendMessage: async (req, res) => {
        const { name, applicant_email, subject, text } = req.body;
        const apartmentId = req.params.id;

        // Validation of input data
        if (!applicant_email || !subject || !text || !name) {
            return res.status(400).json({ error: 'All fields are mandatory.' });
        }

        try {
            // 1. Retrieve the apartment owner's ID
            const queryGetOwnerId = 'SELECT owner_id FROM apartments WHERE id = ?';

            connection.query(queryGetOwnerId, [apartmentId], (err, results) => {
                if (err) {
                    console.error('Error in apartment owner recovery:', err);
                    return res.status(500).json({ error: 'Error in recovering the apartment owner.' });
                }

                if (results.length === 0) {
                    return res.status(404).json({ error: 'Apartment not found.' });
                }

                const ownerId = results[0].owner_id;

                // 2. Retrieve the owner's email
                const queryGetOwnerEmail = 'SELECT email FROM owners WHERE id = ?';

                connection.query(queryGetOwnerEmail, [ownerId], (err, results) => {
                    if (err) {
                        console.error('Error retrieving owner email:', err);
                        return res.status(500).json({ error: 'Error retrieving owner email.' });
                    }
                    if (results.length === 0) {
                        return res.status(404).json({ error: 'Owner not found.' });
                    }

                    const ownerEmail = results[0].email;

                    // 3. Save the message to the database
                    const queryInsertMessage = 'INSERT INTO messages (applicant_email, text, id_apartment, recipient, subject) VALUES (?, ?, ?, ?, ?)';
                    connection.query(queryInsertMessage, [applicant_email, text, apartmentId, ownerEmail, subject], (err, results) => {
                        if (err) {
                            console.error('Error saving message to database:', err);
                            return res.status(500).json({ error: 'Error saving message to database.' });
                        }

                        // 4. Configure the email to send
                        const mailOptions = {
                            to: ownerEmail,
                            from: process.env.EMAIL_USER,
                            subject: `${subject} from ${name}`,
                            text: `${text} by ${applicant_email}`,
                        };

                        // 5. Sending the email via SendGrid
                        sgMail.send(mailOptions)
                            .then(() => {


                                //Configure the email to send to the applican
                                const applicant_mail = {
                                    to: applicant_email,
                                    from: process.env.EMAIL_USER,
                                    subject: `You send a message to ${ownerEmail} in BoolBnB`,
                                    text: `You send this message "${text}" to ${ownerEmail}. you will be contacted soon, thank you`,
                                };

                                return sgMail.send(applicant_mail);
                            })

                            .then(() => {
                                // 7. Positive response after both emails are sent successfully
                                res.status(200).json({ message: 'Email sent successfully and message saved in database!' });
                            })


                            .catch((error) => {
                                console.error('Error sending email:', error);
                                res.status(500).json({ error: 'Error sending email.' });
                            });
                    });
                });
            });
        } catch (error) {
            console.error('Controller error:', error);
            res.status(500).json({ error: 'Error processing the request.' });
        }
    },
};
module.exports = MessageController;
