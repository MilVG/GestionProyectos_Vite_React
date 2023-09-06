import nodemailer from 'nodemailer';

export const emailRegistro = async (datos) => {
    const {nombre, email, token} = datos;

    const  transport = nodemailer.createTransport({
       
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
         
    });

    // Informacion del email

    const info = await transport.sendMail({
        from: '"Objectcode - Administrador de Proyectos" <MvgObject@object.com>',
        to: email,
        subject: "ObjectCode - Comprueba tu cuenta",
        text: "Confirma tu cuenta en Objectcode",
        html: `
            <p>Hola: ${nombre}, comprueba tu cuenta en Objectcode</p>
            <p>Tu cuenta ya esta casi lista, solo debes comprobarla en el siguiente enlace:
            <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar Cuenta</a>
            </p>
            <p>Si tu no creaste esta cuenta, puedes ignorar el mensaje</p>
        
        `
    })
}

export const emailOlvidePassword = async (datos) => {
    const {nombre, email, token} = datos;

    //Todo: Mover hacia varibales de entorno
    const  transport = nodemailer.createTransport({
       
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
         
    });

    // Informacion del email

    const info = await transport.sendMail({
        from: '"Objectcode - Administrador de Proyectos" <MvgObject@object.com>',
        to: email,
        subject: "ObjectCode - Restablece tu password",
        text: "restablece tu password en Objectcode",
        html: `
            <p>Hola: ${nombre}, has solicitado restablecer tu password</p>
            <p>sigue el siguiente enlace para generar un nuevo password:
            <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Restablecer Password</a>
            </p>
            <p>Si tu no solicitaste este email, puedes ignorar el mensaje</p>
        
        `
    })
}