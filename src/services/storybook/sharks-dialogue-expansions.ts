import type { StorybookEpisode, StorybookLine, StorybookSpeaker, StorybookWord } from "./types";

type SceneExpansion = {
  lines: [StorybookLine, StorybookLine];
  words: StorybookWord[];
  imageAlt?: string;
};

type EpisodeExpansion = Record<string, SceneExpansion>;

export const SHARKS_DIALOGUE_EXPANSIONS: Record<string, EpisodeExpansion> = {};

const SHARKS_RICH_EPISODES = new Set([
  
  "sharks-ep4-three-offices-one-team",
  "sharks-ep5-counter-offer",
  "sharks-ep6-hiring-across-borders",
  "sharks-ep7-quality-at-scale",
  "sharks-ep8-vale-kids",
  "sharks-ep9-mexico-call",
  "sharks-ep10-partner-or-rival",
  "sharks-ep11-what-went-wrong",
  "sharks-ep12-say-it-in-numbers",
  "sharks-ep13-the-hard-negotiation",
  "sharks-ep14-losing-a-client",
  "sharks-ep15-winning-it-back",
  "sharks-ep16-a-team-in-three-countries",
  "sharks-ep17-the-investor",
  "sharks-ep18-say-no-with-respect",
  "sharks-ep19-the-regional-deal",
  "sharks-ep20-sharks-close-deals",
]);

const CONVERSATION_FRAMES: Array<{
  before: { text: string; es: string };
  after: { text: string; es: string };
  words: StorybookWord[];
}> = [
  {
    before: { text: "Before we decide, explain the practical risk clearly so the whole team can evaluate the situation without making assumptions.", es: "Antes de decidir, explica claramente el riesgo práctico para que todo el equipo evalúe la situación sin hacer suposiciones." },
    after: { text: "That changes our position. We should compare the immediate pressure with the long-term consequence before anyone makes a commitment.", es: "Eso cambia nuestra posición. Debemos comparar la presión inmediata con la consecuencia a largo plazo antes de comprometernos." },
    words: [{ word: "practical", es: "práctico" }, { word: "evaluate", es: "evaluar" }, { word: "assumptions", es: "suposiciones" }],
  },
  {
    before: { text: "I understand the concern, but we still need evidence before we change a plan that affects several people and offices.", es: "Entiendo la preocupación, pero todavía necesitamos evidencia antes de cambiar un plan que afecta a varias personas y oficinas." },
    after: { text: "Fair point. Let us verify the details, name the owner, and agree on a deadline everyone can realistically meet.", es: "Buen punto. Verifiquemos los detalles, nombremos al responsable y acordemos una fecha límite que todos puedan cumplir." },
    words: [{ word: "concern", es: "preocupación" }, { word: "evidence", es: "evidencia" }, { word: "verify", es: "verificar" }],
  },
  {
    before: { text: "The numbers tell part of the story, although the people affected may describe the problem very differently from us.", es: "Los números cuentan parte de la historia, aunque las personas afectadas pueden describir el problema de manera muy distinta." },
    after: { text: "Exactly, and that detail gives us a stronger argument because it connects the data with what clients actually experience.", es: "Exactamente, y ese detalle nos da un argumento más sólido porque conecta los datos con lo que viven los clientes." },
    words: [{ word: "affected", es: "afectado" }, { word: "argument", es: "argumento" }, { word: "experience", es: "experiencia" }],
  },
  {
    before: { text: "Let us slow down for a moment. What are we protecting, and what could we lose if this decision fails?", es: "Bajemos el ritmo un momento. ¿Qué estamos protegiendo y qué podríamos perder si esta decisión falla?" },
    after: { text: "Now the trade-off is clear. We can move forward, but only with safeguards that protect quality and trust.", es: "Ahora la compensación está clara. Podemos avanzar, pero solo con medidas que protejan la calidad y la confianza." },
    words: [{ word: "protecting", es: "protegiendo" }, { word: "trade-off", es: "compensación" }, { word: "safeguards", es: "medidas de protección" }],
  },
  {
    before: { text: "I can support that direction if we define the cost, the timeline, and the person accountable for delivery.", es: "Puedo apoyar esa dirección si definimos el costo, el calendario y la persona responsable de cumplir." },
    after: { text: "Good. A specific proposal is easier to defend than a promise, especially when the client challenges our reasoning.", es: "Bien. Una propuesta específica es más fácil de defender que una promesa, especialmente cuando el cliente cuestiona nuestro razonamiento." },
    words: [{ word: "accountable", es: "responsable" }, { word: "proposal", es: "propuesta" }, { word: "reasoning", es: "razonamiento" }],
  },
  {
    before: { text: "There is another factor we cannot ignore: this choice will affect the team long after today's meeting ends.", es: "Hay otro factor que no podemos ignorar: esta decisión afectará al equipo mucho después de terminar la reunión de hoy." },
    after: { text: "Then we should document the decision and its reasons, so nobody has to guess what happens next.", es: "Entonces debemos documentar la decisión y sus razones, para que nadie tenga que adivinar qué sigue." },
    words: [{ word: "factor", es: "factor" }, { word: "affect", es: "afectar" }, { word: "document", es: "documentar" }],
  },
  {
    before: { text: "Can we test that assumption against a real example before we present it as the final answer?", es: "¿Podemos comprobar esa suposición con un ejemplo real antes de presentarla como la respuesta final?" },
    after: { text: "The example works. It shows both the benefit and the limitation without pretending the solution is perfect.", es: "El ejemplo funciona. Muestra tanto el beneficio como la limitación sin fingir que la solución es perfecta." },
    words: [{ word: "assumption", es: "suposición" }, { word: "benefit", es: "beneficio" }, { word: "limitation", es: "limitación" }],
  },
  {
    before: { text: "I agree with the goal, yet the approach needs one practical adjustment before the rest of the team accepts it.", es: "Estoy de acuerdo con la meta, pero el enfoque necesita un ajuste práctico antes de que el equipo lo acepte." },
    after: { text: "That adjustment makes the plan more realistic and gives us room to respond if the first attempt goes badly.", es: "Ese ajuste hace el plan más realista y nos da espacio para responder si el primer intento sale mal." },
    words: [{ word: "approach", es: "enfoque" }, { word: "adjustment", es: "ajuste" }, { word: "realistic", es: "realista" }],
  },
  {
    before: { text: "We have heard the objection. Now we need a response that is honest, measurable, and strong enough to earn trust.", es: "Ya escuchamos la objeción. Ahora necesitamos una respuesta honesta, medible y suficientemente sólida para ganar confianza." },
    after: { text: "That response is direct without becoming defensive, which keeps the conversation focused on results instead of personalities.", es: "Esa respuesta es directa sin ponerse a la defensiva, lo cual mantiene la conversación enfocada en resultados y no en personalidades." },
    words: [{ word: "objection", es: "objeción" }, { word: "measurable", es: "medible" }, { word: "defensive", es: "a la defensiva" }],
  },
  {
    before: { text: "We are close, but I want every condition stated plainly before anybody celebrates or signs the final document.", es: "Estamos cerca, pero quiero que cada condición quede clara antes de que alguien celebre o firme el documento final." },
    after: { text: "Agreed. Clear conditions prevent confusion later and give both sides a fair standard for measuring success.", es: "De acuerdo. Las condiciones claras evitan confusión después y dan a ambas partes una medida justa del éxito." },
    words: [{ word: "condition", es: "condición" }, { word: "plainly", es: "claramente" }, { word: "prevent", es: "evitar" }],
  },
  {
    before: { text: "Something has changed, and the timing suggests this is more than a routine update we can postpone until tomorrow.", es: "Algo cambió, y el momento indica que esto es más que una actualización rutinaria que podamos posponer hasta mañana." },
    after: { text: "Then we respond calmly, confirm the facts, and decide together which action protects the relationship we have built.", es: "Entonces respondemos con calma, confirmamos los hechos y decidimos juntos qué acción protege la relación que hemos construido." },
    words: [{ word: "timing", es: "momento" }, { word: "routine", es: "rutinario" }, { word: "postpone", es: "posponer" }],
  },
];

const CONTINUITY_OPENERS: Record<string, StorybookLine> = {
  "sharks-ep7-quality-at-scale": { speaker: "lucia", text: "I replaced the missing teacher this morning. Now we need to prove one emergency did not weaken our quality system.", es: "Reemplacé al maestro ausente esta mañana. Ahora debemos demostrar que una emergencia no debilitó nuestro sistema de calidad." },
  "sharks-ep8-vale-kids": { speaker: "dani", text: "The connection problem is fixed, and every missed class is rescheduled. Can we stop talking about work for ten minutes?", es: "El problema de conexión está resuelto y cada clase perdida fue reprogramada. ¿Podemos dejar de hablar de trabajo diez minutos?" },
  "sharks-ep10-partner-or-rival": { speaker: "dani", text: "Renata's six schools make her both a valuable partner and a serious competitor, so we need complete clarity today.", es: "Las seis escuelas de Renata la hacen una socia valiosa y una competidora seria, así que hoy necesitamos total claridad." },
  "sharks-ep11-what-went-wrong": { speaker: "lucia", text: "The parents from our first class accepted our recovery plan, but this morning the learning platform failed across every office.", es: "Los padres de la primera clase aceptaron nuestro plan de recuperación, pero esta mañana la plataforma falló en todas las oficinas." },
  "sharks-ep15-winning-it-back": { speaker: "vale", text: "Mr. Reed, as Northline's director, you saw where we failed. Today we brought proof that the recovery is real.", es: "Señor Reed, como director de Northline, usted vio dónde fallamos. Hoy trajimos pruebas de que la recuperación es real." },
  "sharks-ep17-the-investor": { speaker: "vale", text: "I know you now sit on Renata's board, Mr. Reed, so I need to understand whose interests this offer represents.", es: "Sé que ahora está en la junta de Renata, señor Reed, así que necesito entender qué intereses representa esta oferta." },
};

const CONTINUITY_WORDS: Record<string, StorybookWord[]> = {
  "sharks-ep7-quality-at-scale": [{ word: "replaced", es: "reemplazó" }, { word: "emergency", es: "emergencia" }, { word: "weaken", es: "debilitar" }],
  "sharks-ep8-vale-kids": [{ word: "connection", es: "conexión" }, { word: "fixed", es: "resuelto" }, { word: "rescheduled", es: "reprogramado" }],
  "sharks-ep10-partner-or-rival": [{ word: "valuable", es: "valioso" }, { word: "competitor", es: "competidor" }, { word: "clarity", es: "claridad" }],
  "sharks-ep11-what-went-wrong": [{ word: "accepted", es: "aceptaron" }, { word: "recovery", es: "recuperación" }, { word: "failed", es: "falló" }],
  "sharks-ep15-winning-it-back": [{ word: "director", es: "director" }, { word: "proof", es: "prueba" }, { word: "recovery", es: "recuperación" }],
  "sharks-ep17-the-investor": [{ word: "board", es: "junta directiva" }, { word: "interests", es: "intereses" }, { word: "represents", es: "representa" }],
};

/**
 * Adds the richer B2 conversation layer without changing episode order,
 * quiz anchors, artwork imports, or the original plot-defining line.
 */
export function expandSharksDialogue(episode: StorybookEpisode): StorybookEpisode {
  const expansion = SHARKS_DIALOGUE_EXPANSIONS[episode.id];
  if (!expansion && !SHARKS_RICH_EPISODES.has(episode.id)) return episode;

  return {
    ...episode,
    scenes: episode.scenes.map((scene) => {
      const supplied = expansion?.[scene.id];
      const original = scene.lines?.[0] ?? {
        speaker: scene.speaker ?? "narrator",
        text: scene.text,
        es: scene.es,
      };
      const sceneNumber = Number(scene.id.slice(1));
      const frame = CONVERSATION_FRAMES[Math.max(0, Math.min(CONVERSATION_FRAMES.length - 1, sceneNumber - 1))];
      if (!frame) return scene;
      const cast = scene.cast ?? [];
      const alternate = cast.find((speaker) => speaker !== original.speaker) ?? original.speaker;
      const continuity = scene.id === "s1" ? CONTINUITY_OPENERS[episode.id] : undefined;
      const generated: SceneExpansion = {
        lines: [
          continuity ?? { speaker: alternate, ...frame.before },
          { speaker: original.speaker, ...frame.after },
        ],
        words: continuity ? CONTINUITY_WORDS[episode.id] ?? frame.words : frame.words,
      };
      const extra = supplied ?? generated;
      const lines = [extra.lines[0], original, extra.lines[1]];
      const speakingCast = lines
        .map((line) => line.speaker)
        .filter((speaker): speaker is StorybookSpeaker => speaker !== "narrator");

      return {
        ...scene,
        lines,
        cast: Array.from(new Set([...(scene.cast ?? []), ...speakingCast])),
        words: extra.words,
        imageAlt: extra.imageAlt ?? `Illustrated conversation with ${Array.from(new Set(speakingCast)).join(" and ")} about ${episode.title.toLowerCase()}.`,
      };
    }),
  };
}