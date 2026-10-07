import type { Tool } from './types';

export const SEED_TOOLS: Tool[] = [
  {
    id: 'agent-lab',
    name: 'Agent Lab',
    url: 'https://agent-lab-omega.vercel.app/',
    desc: {
      en: 'Explore how an AI agent works: plan–act loop, tool registry, simulated and real modes.',
      es: 'Explora cómo funciona un agente de IA: bucle plan–acción, registro de herramientas y modos simulado/real.',
    },
  },
  {
    id: 'fetchlab',
    name: 'FetchLab',
    url: 'https://fetchlab.vercel.app/',
    desc: {
      en: 'Browser REST API client: HTTP requests, JSON viewer, history, cURL import/export.',
      es: 'Cliente REST de APIs en el navegador: peticiones HTTP, visor de JSON, historial e import/export cURL.',
    },
  },
  {
    id: 'lumo',
    name: 'Lumo · AI Chat',
    url: 'https://chatbot-basico.vercel.app/',
    desc: {
      en: 'AI chat in the browser with no backend.',
      es: 'Chat con IA en el navegador, sin backend.',
    },
  },
  {
    id: 'lumacut',
    name: 'LumaCut',
    url: 'https://video-editor-three-lake.vercel.app/',
    desc: {
      en: 'Online video editor: timeline, transitions, subtitles, export up to 1080p.',
      es: 'Editor de vídeo en el navegador: línea de tiempo, transiciones, subtítulos y exportación hasta 1080p.',
    },
  },
  {
    id: 'voice-clone',
    name: 'Voice Clone',
    url: 'https://voice-clone-frontend-tau.vercel.app/',
    desc: {
      en: 'Text to speech with your own cloned voice, connected to your server.',
      es: 'Texto a voz con tu propia voz clonada, conectado a tu servidor.',
    },
  },
  {
    id: 'react-playground',
    name: 'React Visual Playground',
    url: 'https://react-visual-playground.vercel.app/',
    desc: {
      en: 'Interactive React lab: edit real components and watch renders, hooks and props live.',
      es: 'Laboratorio interactivo de React: edita componentes reales y observa renders, hooks y props en directo.',
    },
  },
  {
    id: 'js-playground',
    name: 'JavaScript Playground',
    url: 'https://js-playground-alpha-brown.vercel.app/',
    desc: {
      en: 'JavaScript lab: sandboxed execution, variables inspector, REPL, step-by-step mode.',
      es: 'Laboratorio de JavaScript: ejecución en sandbox, inspector de variables, REPL y modo paso a paso.',
    },
  },
  {
    id: 'llm-chat',
    name: 'LLM Chat',
    url: 'https://llm-chat-iota.vercel.app/',
    desc: {
      en: 'Chat with your own self-hosted LLM (Qwen) on your server, with streaming.',
      es: 'Chat con tu propio LLM autoalojado (Qwen) en tu servidor, con streaming.',
    },
  },
  {
    id: 'estudio-voz',
    name: 'Estudio Voz',
    url: 'https://estudio-voz.vercel.app/',
    desc: {
      en: 'Professional audio studio: text to speech with real Spanish voices, recorder, editor, mixer, export.',
      es: 'Estudio de audio profesional: texto a voz con voces españolas, grabación, edición, mezcla y exportación.',
    },
  },
];
