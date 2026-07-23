/**
 * ARCHIVO CENTRAL DE CONFIGURACIÓN
 * -------------------------------------------------------------
 * Personaliza aquí todos los datos de la invitación.
 * Cambia nombres, fechas, direcciones, enlaces y mensajes.
 * 
 * 
 * Será en el Gran salón Madan
A las 7 pm 
Cárdenas Tabasco.
Padres de la xv añera. Dra. Jenny Vianey Candelero Hernández y Dr. Juan Carlos Ilacedo Alvarez.
Padrinos. Lic. Sally Vianney Ilacedo Alvarez y Lic. Javier Pérez Torres.
 */
export const invitationConfig = {
  quinceanera: {
    name: 'Valentina', // Nombre completo mostrado
    shortName: 'Valentina',
    photo: '/vale01.jpeg', // Foto principal (colócala en /public)
    phrase:
      'Hay momentos en la vida que imaginamos, soñamos y esperamos. Hoy quiero compartir contigo el comienzo de una nueva etapa.',
  },
  event: {
    // Fecha y hora del evento en formato ISO (año-mes-díaThora)
    date: '2026-11-28T19:00:00',
    dressCode: 'Formal',
    reservedColorMessage:
      'El color rosa en todas sus tonalidades está reservado exclusivamente para la quinceañera.',
    rsvpDeadline: '2026-11-18', // Fecha límite para confirmar
  },
  parents: {
    mother: 'Dra. Jenny Vianey Candelero Hernández',
    father: 'Dr. Juan Carlos Ilacedo Alvarez',
  },
  godparents:{
    godmother: 'Lic. Sally Vianney Ilacedo Alvarez',
    godfather: 'Lic. Javier Pérez Torres',
  },
  ceremony: {
    name: 'Parroquia de Santa Clara',
    time: '18:00',
    address: 'Av. de los Robles 123, Centro',
    mapsUrl: 'https://maps.google.com',
  },
  reception: {
    name: 'Gran salón Madan',
    time: '19:00',
    address: 'C. Francisco Trujillo Gurría 8, Pueblo Nuevo, 86500 Cárdenas, Tabasco',
    mapsUrl: 'https://maps.app.goo.gl/tpeK6sVgRG53NKWZ7',
  },
  gifts: {
    title: 'Lluvia de sobres',
    message:
      'Tu presencia es el regalo más importante para mí. Si deseas obsequiarme algo adicional, durante la recepción tendremos nuestra tradicional lluvia de sobres.',
    instructions:
      'Podrás depositar tu sobre con tus buenos deseos en el espacio especial que estará disponible durante el evento.',
  },
  contact: {
    // Número de WhatsApp en formato internacional, solo dígitos
    whatsapp: '5217777937484',
    quoteMessage:
      'Hola, me interesa contratar una invitación digital para mi evento.',
  },
  confirmationWhatsappNumber: '5217777937484', // Número de WhatsApp para confirmaciones (solo dígitos)
  familyMessage:
    'Gracias por ser parte de esta historia encantada. Con cariño, Valentina y familia.',
} as const

export type InvitationConfig = typeof invitationConfig

/** Paleta sugerida para invitados (sin rosa). */
export const guestColorPalette = [
  { name: 'Verde esmeralda', hex: '#1f7a5a' },
  { name: 'Verde salvia', hex: '#9caf88' },
  { name: 'Azul marino', hex: '#1b2a4a' },
  { name: 'Azul cielo', hex: '#8fb8d6' },
  { name: 'Lavanda', hex: '#c8b9db' },
  { name: 'Lila', hex: '#a99bbe' },
  { name: 'Champagne', hex: '#e8d7b5' },
  { name: 'Dorado', hex: '#c89b3c' },
  { name: 'Plateado', hex: '#c4c8cc' },
  { name: 'Beige', hex: '#d9cbb2' },
  { name: 'Negro', hex: '#1a1a1a' },
] as const
