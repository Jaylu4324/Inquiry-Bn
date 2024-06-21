const model = require('../model/invoiceSchema');
const {stuModel} = require('../model/studentShcema')

const { jsPDF } = require("jspdf");


require('jspdf-autotable');
const nodemailer = require("nodemailer");
const fs = require('fs');
const path = require('path');

const getImageBase64 = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'base64', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};

const addInvoice = (req, res) => {
    let {
        stuName,
        invoiceDate,
        Course,
        Amount,
        TypeOfPayment,
        Description,
        Remaining,
        Total
    } = req.body;

    const data1 = new model({
        stuName,
        invoiceDate,
        Course,
        Amount,
        TypeOfPayment,
        Description,
        Remaining,
        Total
    });

    stuModel.findOne({_id:req.body.stuId}).then((data)=>{
        let stuObj = JSON.parse(JSON.stringify(data))
        stuObj.Rfees= stuObj.Rfees-Amount
        stuObj.Pfees= stuObj.Pfees+Amount

        stuModel.updateOne({_id:req.body.stuId},stuObj).then((udata)=>{
            data1.save().then((data1) => {
                res.send({ msg: "Data Added", data1 });
            }).catch((err) => {
                res.send({ err ,msg:"add"});
            });
        })
        .catch((err)=>{
            res.send({err,msg:"updet"})
        })

    })
    .catch((err)=>{
        res.send({err})
    })

  
};

const updateinvoice = async (req, res) => {
    try {
        const invoiceId = req.query.id;
        const studentId = req.body.stuId;
        const newAmount = req.body.Amount;

        // Find the invoice by ID
        const invoiceData = await model.findOne({ _id: invoiceId });
        if (!invoiceData) {
            return res.status(404).send({ msg: "Invoice not found" });
        }

        // Find the student by ID
        const studentData = await stuModel.findOne({ _id: studentId });
        if (!studentData) {
            return res.status(404).send({ msg: "Student not found" });
        }

        // Update the student's fees
        const oldAmount = invoiceData.Amount;
        let stuObj = JSON.parse(JSON.stringify(studentData));
        console.log(stuObj.Rfees,stuObj.Pfees,"dsfdsfdsf",oldAmount,newAmount)
        stuObj.Rfees = stuObj.Rfees + oldAmount
        stuObj.Rfees = stuObj.Rfees - newAmount

        stuObj.Pfees = stuObj.Pfees - oldAmount 
        stuObj.Pfees = stuObj.Pfees + newAmount 



        // Save the updated student data
        await stuModel.updateOne({ _id: studentId }, stuObj);

        // Update the invoice amount
        invoiceData.Amount = newAmount;
        await model.updateOne({ _id: invoiceId }, invoiceData);

        res.send({ msg: "Invoice and student fees updated successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).send({ err, msg: "Update failed" });
    }
};





    


const deletinvoice = (req, res) => {
    model.deleteOne({ _id: req.query.id })
        .then((data) => {
            res.send({ msg: "Invoice Deleted" });
        })
        .catch((err) => {
            res.send({ err });
        });
};

const displayInvoice = (req, res) => {
    model.find().then((data) => {
        res.send({ msg: "display invoice", data });
    }).catch((err) => {
        res.send({ err });
    });
};

const nmailer = (pdfBuffer) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "krunal8588@gmail.com",
            pass: "cnrk mvrh tcqo dmjp",
        },
    });

    const mailOptions = {
        from: 'krunal8588@gmail.com', // sender address
        to: "krunalmistry7545@gmail.com", // list of receivers
        subject: "Invoice", // Subject line
        text: 'Please find attached the invoice.', // plain text body
        attachments: [
            {
                filename: 'invoice.pdf',
                content: pdfBuffer, // use the buffer generated from the PDF
                contentType: 'application/pdf'
            }
        ],
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("Error sending email:", error);
        } else {
            console.log("Email sent:", info.response);
        }
    });
};

// const sendWhatsApp = (pdfBuffer, recipientNumber) => {
//     const mediaUrl = `data:application/pdf;base64,${pdfBuffer.toString('base64')}`;
    
//     client.messages.create({
//         from: 'whatsapp:+15123687385', // Your Twilio WhatsApp number
//         to: `whatsapp:${recipientNumber}`, // Recipient's WhatsApp number
//         body: 'Please find attached the invoice.',
//         mediaUrl: mediaUrl,
//     }).then(message => {
//         console.log('WhatsApp message sent:', message.sid);
//     }).catch(err => {
//         console.error('Error sending WhatsApp message:', err);
//     });
// };

const pdfmail = async (req, res) => {
    let row = req.body;

    const doc = new jsPDF();

    // Set background color
    doc.setFillColor(255, 255, 255);
    doc.rect(0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height, 'F');

    // Load the image and add it to the PDF
    const imagePath = path.join(__dirname, 'name.jpeg');
    try {
        const imgBase64 = await getImageBase64(imagePath);
        const logoWidth = 50;
        const logoHeight = 20;
        const centerX = doc.internal.pageSize.width / 2 - logoWidth / 2;
        doc.addImage(imgBase64, 'JPEG', centerX, 10, logoWidth, logoHeight);
    } catch (error) {
        console.error('Error loading image:', error);
    }

    // Title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(24);
    doc.setTextColor(0, 0, 110);
    doc.text('Invoice', doc.internal.pageSize.width / 2, 40, { align: 'center' });

    // Create a table with 2 columns and 8 rows
    const table = {
        headers: ['Field', 'Value'],
        body: [
            ['Invoice ID', row._id],
            ['Date', row.invoiceDate],
            ['Student Name', row.stuName],
            ['Course Name', row.Course],
            ['Payment Method', row.TypeOfPayment],
            ['Description', row.Description],
            ['Total Amount', row.Total],
            ['Remaining Amount', row.Remaining],
        ],
    };

    // Add the table to the PDF with borders and colors
    doc.autoTable({
        startY: 60,
        head: [table.headers],
        body: table.body,
        theme: 'striped',
        styles: {
            cellPadding: 3,
            fontSize: 10,
            valign: 'middle',
            halign: 'center',
            fontStyle: 'normal',
            lineWidth: 0.1,
        },
        headStyles: {
            fillColor: [255, 255, 255],
            textColor: [0, 0, 110],
            fontStyle: 'bold',
        },
        columnStyles: {
            0: {
                cellWidth: 40,
            },
            1: {
                cellWidth: 'auto',
            },
        },
    });

    // Add footer
    const footerText = [
        'Email: info@technishal.com',
        'Contact: +91 9313386475',
        'Address: H-1210, Titanium City Center Business Park,',
        'Nr. Prahlad Nagar Rd, Jodhpur Village,',
        'Ahmedabad, Gujarat 380015.',
    ];

    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);

    // Add horizontal line
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.5);
    doc.line(10, doc.internal.pageSize.height - 30, doc.internal.pageSize.width - 10, doc.internal.pageSize.height - 30);

    // Add footer text with spacing
    let footerY = doc.internal.pageSize.height - 25;
    footerText.forEach((text, index) => {
        doc.text(text, doc.internal.pageSize.width / 2, footerY, { align: 'center' });
        footerY += 5;
    });

    // Copyright notice
    doc.setTextColor(100);
    doc.setFontSize(8);
    doc.text('© 2023 TechNishal. All Rights Reserved.', doc.internal.pageSize.width / 2, doc.internal.pageSize.height - 2, { align: 'center' });

    // Convert the PDF to a buffer
    const pdfBuffer = Buffer.from(doc.output('arraybuffer'));

    // Send the email with the PDF attachment
    nmailer(pdfBuffer);

    // Send the PDF via WhatsApp
    // const recipientNumber = '+919724947545'; // Replace with the recipient's WhatsApp number
    // sendWhatsApp(pdfBuffer, recipientNumber);

// const client = new Client();

// client.on('qr', (qr) => {
//     // Generate and scan this code with your phone
//     console.log('QR RECEIVED', qr);
// });

// client.on('ready', () => {
//     console.log('Client is ready!');
// });

// client.on('message', msg => {
//     if (msg.body == '!ping') {
//         msg.reply('pong');
//     }
// });

// client.initialize();
    // Send response to client
    res.send('Invoice generated and email/WhatsApp sent.');
};

module.exports = { addInvoice, updateinvoice, deletinvoice, displayInvoice, pdfmail };
