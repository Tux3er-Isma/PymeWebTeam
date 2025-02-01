import type { APIRoute } from "astro";
import nodemailer from 'nodemailer';
export const prerender = false; // Desactiva prerendering y usa SSR

export const POST: APIRoute = async ({ params, request }) => {
    // console.log('request', request)

    if (request.headers.get('Content-Type') === 'application/json') {
        const body = await request.json();
        const { userName, email, msg, ip } = body;
        const host = "smtp.gmail.com";
        const emailToPass = "dqqx rowz wvow xyna";
        const emailTo = "isma.tux3er@gmail.com";
        // const formData = await request.json()
        // const name = formData.name
        // const surname = formData.surname
        // const email = formData.email
        // const tel = formData.tel
        // const subject = formData.subject
        // const message = `${formData.message}
        // ----------------------------------------------------------------------
        // From: ${name} ${surname} • email: ${email} • tel: ${tel}
        // `
        // const html = `<div style="margin: 20px auto;font-family: Helvetica, Verdana, sans-serif">${message.replace(
        //   /[\r\n]/g,
        //   '<br>'
        // )}</div>`

        // sendmail
        let mailTransporter = nodemailer.createTransport({
            host,
            port: 587,
            secure: false,
            auth: {
                user: emailTo,
                pass: emailToPass,
            },
            tls: {
                rejectUnauthorized: false
            }
        })

        mailTransporter.verify((error, success) => {
            if (error) {
                console.log(error)
            } else {
                console.log("All is ready")
            }
        })

        // {
        //   from: emailTo,
        //   to: email,
        //   subject: `${new URL(request.url).hostname}: ${subject}`,
        //   text: message,
        //   html,
        // },

        let mailDetails = ([
            {
                from: emailTo,
                to: "isma.tux3er@gmail.com",
                subject: "Mensaje desde pymewebteam",
                text: msg,
                html: `<!DOCTYPE html>
                <html>
                <body>
                    <p>Te ha enviado un mensaje: <strong>${userName}</strong> con la ip: <strong>${ip}</strong></p>
                    <p>Su email es: <strong>${email}</strong></p>
                    <p>Este es su mensaje: <strong>${msg}</strong></p>
                </body>
                </html>
                `
            }
        ])


        let mailresult
        try {
            //   mailresult = await mailTransporter.sendMail(mailDetails)
            for (let i = 0; i < mailDetails.length; i++) {
                mailresult = await mailTransporter.sendMail(mailDetails[i])
            }
        } catch (error) {
            console.log('******* Error: ', error)
        }
        console.log('Message sent: %s', mailresult?.messageId)
        // return endpoint response
        return new Response(JSON.stringify(mailDetails), {
            status: 200,
        })
    }
    return new Response(null, { status: 400 }) // if not a json request
}