import { Customer } from '../models/index.js'

export const customersSeed = async () => {
  try {
    const customers = [
      {
        name: 'Juan Pérez',
        email: 'juan.perez@example.com',
        phone: '+52 55 1234 5678',
        address: 'Av. Reforma 123, Ciudad de México, CDMX'
      },
      {
        name: 'María López',
        email: 'maria.lopez@example.com',
        phone: '+52 33 9876 5432',
        address: 'Calle Juárez 456, Guadalajara, Jalisco'
      },
      {
        name: 'Carlos Sánchez',
        email: 'carlos.sanchez@example.com',
        phone: '+52 81 3456 7890',
        address: 'Blvd. Constitución 789, Monterrey, Nuevo León'
      },
      {
        name: 'Ana Ramírez',
        email: 'ana.ramirez@example.com',
        phone: '+52 222 6789 1234',
        address: 'Av. Zaragoza 321, Puebla, Puebla'
      },
      {
        name: 'Luis Herrera',
        email: 'luis.herrera@example.com',
        phone: '+52 55 4321 9876',
        address: 'Insurgentes Sur 654, Ciudad de México, CDMX'
      },
      {
        name: 'Gabriela Torres',
        email: 'gabriela.torres@example.com',
        phone: '+52 33 6789 2345',
        address: 'Calle Hidalgo 111, Zapopan, Jalisco'
      },
      {
        name: 'Fernando Castro',
        email: 'fernando.castro@example.com',
        phone: '+52 81 7890 3456',
        address: 'Carr. Nacional 222, San Pedro Garza García, Nuevo León'
      },
      {
        name: 'Beatriz González',
        email: 'beatriz.gonzalez@example.com',
        phone: '+52 229 5678 9012',
        address: 'Malecón 789, Veracruz, Veracruz'
      },
      {
        name: 'Ricardo Medina',
        email: 'ricardo.medina@example.com',
        phone: '+52 618 2345 6789',
        address: 'Calle Independencia 456, Durango, Durango'
      },
      {
        name: 'Patricia Vega',
        email: 'patricia.vega@example.com',
        phone: '+52 999 8765 4321',
        address: 'Paseo de Montejo 987, Mérida, Yucatán'
      },
      {
        name: 'Alejandro Rojas',
        email: 'alejandro.rojas@example.com',
        phone: '+52 747 6543 2109',
        address: 'Av. Morelos 876, Chilpancingo, Guerrero'
      },
      {
        name: 'Diana Flores',
        email: 'diana.flores@example.com',
        phone: '+52 722 8901 2345',
        address: 'Calle de la Constitución 765, Toluca, Estado de México'
      },
      {
        name: 'José Vargas',
        email: 'jose.vargas@example.com',
        phone: '+52 833 5432 1098',
        address: 'Blvd. Hidalgo 432, Tampico, Tamaulipas'
      },
      {
        name: 'Montserrat Navarro',
        email: 'montserrat.navarro@example.com',
        phone: '+52 612 6789 5432',
        address: 'Av. Forjadores 123, La Paz, Baja California Sur'
      },
      {
        name: 'Roberto Ortiz',
        email: 'roberto.ortiz@example.com',
        phone: '+52 686 2345 6789',
        address: 'Calle 16 de Septiembre 456, Mexicali, Baja California'
      },
      {
        name: 'Claudia Jiménez',
        email: 'claudia.jimenez@example.com',
        phone: '+52 961 8901 2345',
        address: 'Av. Central 987, Tuxtla Gutiérrez, Chiapas'
      },
      {
        name: 'Miguel Pineda',
        email: 'miguel.pineda@example.com',
        phone: '+52 644 6543 2109',
        address: 'Blvd. Rodríguez 654, Ciudad Obregón, Sonora'
      },
      {
        name: 'Verónica Salazar',
        email: 'veronica.salazar@example.com',
        phone: '+52 427 7654 3210',
        address: 'Calle Benito Juárez 876, San Juan del Río, Querétaro'
      },
      {
        name: 'Armando Espinoza',
        email: 'armando.espinoza@example.com',
        phone: '+52 993 8901 5432',
        address: 'Malecón Carlos A. Madrazo 123, Villahermosa, Tabasco'
      },
      {
        name: 'Raquel Cárdenas',
        email: 'raquel.cardenas@example.com',
        phone: '+52 951 2345 8765',
        address: 'Calle Macedonio Alcalá 456, Oaxaca, Oaxaca'
      }
    ]

    // Inserta los datos en la tabla
    await Customer.bulkCreate(customers)
    console.log('Clientes insertados correctamente.')
  } catch (error) {
    console.error('Error insertando los clientes:', error)
  }
}
