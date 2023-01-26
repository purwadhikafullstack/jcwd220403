const database = require("../models")
const { Op, Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const puppeteer = require('puppeteer');
const nodemailer = require('../middlewares/nodemailer');
const handlebars = require("handlebars");

module.exports = {
    transactionsUser: async (req, res) => {
        const { tenantId, status } = req.params
        console.log(status)
        try{
            const response = await database.transaction.findAll({
                attributes: ['id', 'checkIn', 'checkOut', 'transactionStatus'],
                include: 
                [
                    {
                        model: database.room,
                        attributes: ['name', 'price'],
                        include: [{
                            model: database.property,
                            attributes: ['tenantId', 'name'],
                        }]
                    },
                    {
                        model: database.user,
                        attributes: ['fullName', 'email']
                    }
                ],
                having: {
                    [Op.and]: [
                        {'room.property.tenantId': tenantId },
                        {'transactionStatus' : status}
                    ]
                }
            })
            
            res.status(201).send(response)
        }catch(err){
            console.log(err)
            res.status(404).send(err)
        }
    },
    getTotalTransaction: async (req, res) => {
        const { tenantId } = req.params
        try{
            const response = await database.transaction.findAll({
                attributes: ['transactionStatus', [Sequelize.fn('Count', Sequelize.col('transactionStatus')), 'Count']],
                where: {'transactionStatus': ['Menunggu Konfirmasi Pembayaran', 'Sukses', 'Aktif', 'Selesai']},
                include: 
                [
                    {
                        model: database.room,
                        attributes: [],
                        required: true,
                        include: [{
                            model: database.property,
                            attributes: [],
                            where: {'tenantId': tenantId}
                        }]
                    }
                ],
                group: ['transactionStatus'],
                raw: true
            })

            res.status(200).send(response)
        }catch(err){
            console.log(err)
            res.status(404).send(err)
        }
    },
    acceptTransaction: async (req, res) => {
        const data = req.body
        const input = {
            email : data.user.email,
            fullName: data.user.fullName,
            qrcode: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${data.id}`,
            roomName: data.room.name,
            propertyName: data.room.property.name,
            checkIn: new Date(data.checkIn).toLocaleString("en", {day : "numeric", month: "short", year: "numeric"}),
            checkOut: new Date(data.checkOut).toLocaleString("en", {day : "numeric", month: "short", year: "numeric"}),
            invoiceNo: data.id,
            invoiceDate: new Date().toLocaleString("id-ID", {day : "2-digit", month: "2-digit", year: "numeric"}),
        }
        console.log(input)
        try{
            var templateHtml = fs.readFileSync(path.join(process.cwd(), './src/emailTemplates/generate-pdf/index.html'), 'utf8');
            var template = handlebars.compile(templateHtml);
            var html = template(input);

            var milis = new Date();
            milis = milis.getTime();

            var pdfPath = path.join('./Public/pdf', `${"Invoice"}-${"Ilham Hidayatulloh"}-${milis}.pdf`);

            var options = {
                format: 'A4',
                margin: {
                    top: "30px",
                    bottom: "30px",
                    right: "30px",
                    left: "30px",
                },
                printBackground: true,
                path: pdfPath,
            }

            const browser = await puppeteer.launch({
                args: ['--no-sandbox'],
                headless: true
            });

            var page = await browser.newPage();
            await page.goto(`data:text/html;charset=UTF-8,${html}`, {
                waitUntil: 'networkidle0'
            });
            await page.addStyleTag({path: './src/emailTemplates/generate-pdf/style.css'})
            await page.pdf(options);
            await browser.close();

            const tempEmail = fs.readFileSync(
                './src/emailTemplates/generate-pdf/email.html',
                'utf-8'
                );
                const tempCompile = handlebars.compile(tempEmail);
                const tempResult = tempCompile(input);
        
                await nodemailer.sendMail({
                from: 'Admin',
                to: data.user.email,
                subject: `[Holistay] Vocher Hotel Anda ${data.room.property.name}`,
                attachments: [{path: pdfPath}],
                html: tempResult,
                });

            await database.transaction.update(
                { transactionStatus: "Diproses" },
                {
                    where: {
                        id: data.id,
                    },
                }
                );

            res.status(201).send("Success Confirm")
        }catch(err){
            console.log(err)
            res.status(404).send(err)
        }
    }, rejectTransaction: async (req, res) => {
        const {id} = req.body
        try{
            await database.transaction.update(
                { transactionStatus: "Dibatalkan" },
                {
                    where: {
                        id,
                    },
                }
                );

            res.status(201).send("Success Confirm")
        }catch(err){
            console.log(err)
            res.status(404).send(err)
        }
    },
}