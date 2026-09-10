export type CallCenterPhrase = {
  id: string;
  /** English phrase (with placeholders like [company] / [name]). */
  en: string;
  /** Spanish translation. */
  es: string;
};

export type CallCenterCategory = {
  id: string;
  /** English category title. */
  en: string;
  /** Spanish category title. */
  es: string;
  phrases: CallCenterPhrase[];
};

export const CALL_CENTER_CATEGORIES: CallCenterCategory[] = [
  {
    id: "greeting-opening",
    en: "Greeting & opening",
    es: "Saludo y apertura",
    phrases: [
      { id: "g1", en: "Thank you for calling [company]. How may I help you?", es: "Gracias por llamar a [empresa]. ¿En qué puedo ayudarle?" },
      { id: "g2", en: "Good morning/afternoon, this is [name] speaking.", es: "Buenos días/tardes, le habla [nombre]." },
      { id: "g3", en: "Hello, welcome to [company]. What can I do for you today?", es: "Hola, bienvenido/a a [empresa]. ¿Qué puedo hacer por usted hoy?" },
      { id: "g4", en: "Hi, my name is [name]. How can I assist you?", es: "Hola, mi nombre es [nombre]. ¿Cómo puedo ayudarle?" },
      { id: "g5", en: "Thank you for reaching out to us.", es: "Gracias por contactarnos." },
      { id: "g6", en: "I hope you're doing well today.", es: "Espero que esté teniendo un buen día." },
      { id: "g7", en: "Nice to hear from you.", es: "Qué gusto saber de usted." },
      { id: "g8", en: "How may I direct your call?", es: "¿A qué departamento puedo dirigir su llamada?" },
    ],
  },
  {
    id: "asking-information",
    en: "Asking for information",
    es: "Pidiendo información",
    phrases: [
      { id: "a1", en: "May I have your name, please?", es: "¿Me puede dar su nombre, por favor?" },
      { id: "a2", en: "Could you please provide your account number?", es: "¿Podría proporcionarme su número de cuenta?" },
      { id: "a3", en: "Can you confirm your email address?", es: "¿Puede confirmar su correo electrónico?" },
      { id: "a4", en: "What is the best number to reach you?", es: "¿Cuál es el mejor número para contactarle?" },
      { id: "a5", en: "Could you repeat that, please?", es: "¿Podría repetirlo, por favor?" },
      { id: "a6", en: "Let me make sure I understand.", es: "Permítame asegurarme de entender." },
      { id: "a7", en: "Do you mind spelling that for me?", es: "¿Le importaría deletreármelo?" },
      { id: "a8", en: "Can you give me a little more detail?", es: "¿Puede darme un poco más de detalle?" },
    ],
  },
  {
    id: "hold-transfer",
    en: "Hold & transfer",
    es: "Espera y transferencia",
    phrases: [
      { id: "h1", en: "Please hold for a moment while I check that.", es: "Por favor, manténgase en línea mientras verifico." },
      { id: "h2", en: "I'll need to transfer you to the right department.", es: "Necesito transferirle al departamento correcto." },
      { id: "h3", en: "Would you mind holding for one or two minutes?", es: "¿Le importaría esperar uno o dos minutos?" },
      { id: "h4", en: "I'm connecting you now.", es: "Le estoy conectando ahora." },
      { id: "h5", en: "Thank you for holding.", es: "Gracias por esperar." },
      { id: "h6", en: "The line is busy; can I put you on a brief hold?", es: "La línea está ocupada; ¿puedo dejarle en espera un momento?" },
      { id: "h7", en: "Let me see if a specialist is available.", es: "Permítame ver si hay un especialista disponible." },
      { id: "h8", en: "I'll stay on the line with you until someone picks up.", es: "Me mantendré en la línea con usted hasta que alguien atienda." },
    ],
  },
  {
    id: "calming-customer",
    en: "Calming an upset customer",
    es: "Calmando a un cliente molesto",
    phrases: [
      { id: "c1", en: "I completely understand your frustration.", es: "Entiendo completamente su frustración." },
      { id: "c2", en: "I'm really sorry this happened to you.", es: "Lamento mucho que esto le haya pasado." },
      { id: "c3", en: "I can see why you're upset, and I want to help.", es: "Entiendo por qué está molesto/a, y quiero ayudar." },
      { id: "c4", en: "Let me take care of this for you right away.", es: "Permítame encargarme de esto de inmediato." },
      { id: "c5", en: "Your concern is very important to us.", es: "Su inquietud es muy importante para nosotros." },
      { id: "c6", en: "I assure you I will do my best to resolve this.", es: "Le aseguro que haré lo mejor para resolverlo." },
      { id: "c7", en: "Thank you for your patience while we sort this out.", es: "Gracias por su paciencia mientras resolvemos esto." },
      { id: "c8", en: "I would feel the same way in your situation.", es: "Yo me sentiría igual en su situación." },
    ],
  },
  {
    id: "solving-troubleshooting",
    en: "Solving & troubleshooting",
    es: "Solución y diagnóstico",
    phrases: [
      { id: "s1", en: "Let me look into this for you.", es: "Permítame investigar esto por usted." },
      { id: "s2", en: "The issue should be resolved within 24 hours.", es: "El problema debería resolverse en 24 horas." },
      { id: "s3", en: "Here's what we can do to fix this.", es: "Esto es lo que podemos hacer para solucionarlo." },
      { id: "s4", en: "Have you tried restarting the device?", es: "¿Ha intentado reiniciar el dispositivo?" },
      { id: "s5", en: "I'll send you a step-by-step guide by email.", es: "Le enviaré una guía paso a paso por correo." },
      { id: "s6", en: "That error usually means...", es: "Ese error usualmente significa..." },
      { id: "s7", en: "Let me reset your password from my side.", es: "Permítame restablecer su contraseña desde aquí." },
      { id: "s8", en: "I'll create a ticket and follow up with you.", es: "Crearé un ticket y le daré seguimiento." },
    ],
  },
  {
    id: "closing-followup",
    en: "Closing & follow-up",
    es: "Cierre y seguimiento",
    phrases: [
      { id: "cl1", en: "Is there anything else I can help you with?", es: "¿Hay algo más en lo que pueda ayudarle?" },
      { id: "cl2", en: "Thank you for calling [company]. Have a great day.", es: "Gracias por llamar a [empresa]. Que tenga un buen día." },
      { id: "cl3", en: "We'll send you a confirmation email shortly.", es: "Le enviaremos un correo de confirmación en breve." },
      { id: "cl4", en: "Please don't hesitate to contact us again if you need help.", es: "No dude en contactarnos de nuevo si necesita ayuda." },
      { id: "cl5", en: "I appreciate your time today.", es: "Agradezco su tiempo hoy." },
      { id: "cl6", en: "Have a wonderful rest of your day.", es: "Que tenga un excelente resto del día." },
      { id: "cl7", en: "Take care, and thank you for choosing us.", es: "Cuídese, y gracias por elegirnos." },
      { id: "cl8", en: "We look forward to hearing from you again.", es: "Esperamos volver a saber de usted." },
    ],
  },
];
