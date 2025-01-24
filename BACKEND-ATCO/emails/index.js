import { createTransport } from '../config/nodemailer.config.js'

export const sendVerificationEmail = async (user) => {
    const transport = createTransport()
    console.log(user)

    await transport.sendMail({
        from: `TaskTool <${process.env.MAIL_CLIENT}>`,
        to: user.email,
        subject: 'Verificar cuenta',
        html: `<h1>Verificar cuenta</h1>
        <p>Para verificar tu cuenta haz click en el siguiente enlace:</p>
        <a href="${process.env.CLIENT_URL}/confirm-account/${user.token}">Verificar cuenta</a>
        <p>Si tu no creaste esta cuenta, puedes ignorar este correo</p>
        `
    })

}
export const sendEmailPasswordReset = async (user) => {
    const transport = createTransport()
    console.log(user)

    await transport.sendMail({
        from: `TaskTool <${process.env.MAIL_CLIENT}>`,
        to: user.email,
        subject: 'Restablecer contraseña',
        html: `<h1>Restablecer contraseña</h1>
        <p>Para restablecer tu contraseña haz click en el siguiente enlace:</p>
        <a href="${process.env.CLIENT_URL}/auth/forgot-password/${user.token}">Restablecer contraseña</a>
        <p>Si tu no creaste esta cuenta, puedes ignorar este correo</p>
        `
    })

}

