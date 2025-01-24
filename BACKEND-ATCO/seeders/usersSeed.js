import { User } from '../models/index.js'
import bcrypt from 'bcrypt'

export const userssSeed = async () => {
  try {
    const users = [
      {
        name: 'Carlos López',
        email: 'carlos.lopez@example.com',
        password: await bcrypt.hash('mypassword', 10),
        role: 'admin',
        name_avatar_url: `https://ui-avatars.com/api/?name=${encodeURIComponent(
          'Carlos López'
        )}&background=random`,
        status: true
      },
      {
        name: 'Ana Pérez',
        email: 'ana.perez@example.com',
        password: await bcrypt.hash('mypassword', 10),
        role: 'vendedor',
        name_avatar_url: `https://ui-avatars.com/api/?name=${encodeURIComponent(
          'Ana Pérez'
        )}&background=random`,
        status: true
      },
      {
        name: 'Luis Gómez',
        email: 'luis.gomez@example.com',
        password: await bcrypt.hash('mypassword', 10),
        role: 'vendedor',
        name_avatar_url: `https://ui-avatars.com/api/?name=${encodeURIComponent(
          'Luis Gómez'
        )}&background=random`,
        status: true
      },
      {
        name: 'María Herrera',
        email: 'maria.herrera@example.com',
        password: await bcrypt.hash('mypassword', 10),
        role: 'vendedor',
        name_avatar_url: `https://ui-avatars.com/api/?name=${encodeURIComponent(
          'María Herrera'
        )}&background=random`,
        status: true
      },
      {
        name: 'Pedro Sánchez',
        email: 'pedro.sanchez@example.com',
        password: await bcrypt.hash('mypassword', 10),
        role: 'vendedor',
        name_avatar_url: `https://ui-avatars.com/api/?name=${encodeURIComponent(
          'Pedro Sánchez'
        )}&background=random`,
        status: true
      },
      {
        name: 'Laura Díaz',
        email: 'laura.diaz@example.com',
        password: await bcrypt.hash('mypassword', 10),
        role: 'vendedor',
        name_avatar_url: `https://ui-avatars.com/api/?name=${encodeURIComponent(
          'Laura Díaz'
        )}&background=random`,
        status: true
      },
      {
        name: 'Javier Torres',
        email: 'javier.torres@example.com',
        password: await bcrypt.hash('mypassword', 10),
        role: 'ingeniero',
        name_avatar_url: `https://ui-avatars.com/api/?name=${encodeURIComponent(
          'Javier Torres'
        )}&background=random`,
        status: true
      },
      {
        name: 'Sofía Morales',
        email: 'sofia.morales@example.com',
        password: await bcrypt.hash('mypassword', 10),
        role: 'ingeniero',
        name_avatar_url: `https://ui-avatars.com/api/?name=${encodeURIComponent(
          'Sofía Morales'
        )}&background=random`,
        status: true
      },
      {
        name: 'Fernando Ruiz',
        email: 'fernando.ruiz@example.com',
        password: await bcrypt.hash('mypassword', 10),
        role: 'ingeniero',
        name_avatar_url: `https://ui-avatars.com/api/?name=${encodeURIComponent(
          'Fernando Ruiz'
        )}&background=random`,
        status: true
      },
      {
        name: 'Gabriela Castro',
        email: 'gabriela.castro@example.com',
        password: await bcrypt.hash('mypassword', 10),
        role: 'ingeniero',
        name_avatar_url: `https://ui-avatars.com/api/?name=${encodeURIComponent(
          'Gabriela Castro'
        )}&background=random`,
        status: true
      },
      {
        name: 'Martín Ríos',
        email: 'martin.rios@example.com',
        password: await bcrypt.hash('mypassword', 10),
        role: 'ingeniero',
        name_avatar_url: `https://ui-avatars.com/api/?name=${encodeURIComponent(
          'Martín Ríos'
        )}&background=random`,
        status: true
      },
      {
        name: 'Elena Vargas',
        email: 'elena.vargas@example.com',
        password: await bcrypt.hash('mypassword', 10),
        role: 'ingeniero',
        name_avatar_url: `https://ui-avatars.com/api/?name=${encodeURIComponent(
          'Elena Vargas'
        )}&background=random`,
        status: true
      }
    ]

    // Inserta los datos en la tabla
    await User.bulkCreate(users)
    console.log('Usuarios insertados correctamente.')
  } catch (error) {
    console.error('Error insertando usuarios:', error)
  }
}
