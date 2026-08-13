import { QuizQuestion, QuizResult, QuizIdentity } from '../types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'What do you enjoy most?',
    options: [
      { label: 'CREATING', identity: 'CREATOR', sublabel: 'Design, media, art & content' },
      { label: 'CODING', identity: 'BUILDER', sublabel: 'Building logic & systems' },
      { label: 'EXPLORING', identity: 'EXPLORER', sublabel: 'Discovering places & maps' },
      { label: 'GAMING', identity: 'PLAYFUL', sublabel: 'Fun, play & interactive' },
      { label: 'EXPERIMENTING WITH AI', identity: 'FUTURIST', sublabel: 'Generative models & future tech' },
    ],
  },
  {
    id: 2,
    question: 'Which digital world feels most like you?',
    options: [
      { label: 'YOUTUBE', identity: 'CREATOR', sublabel: 'Watch, create & broadcast' },
      { label: 'ANDROID', identity: 'PLAYFUL', sublabel: 'Open, customizable & alive' },
      { label: 'GOOGLE MAPS', identity: 'EXPLORER', sublabel: 'Navigating & discovering' },
      { label: 'GOOGLE AI / GEMINI', identity: 'FUTURIST', sublabel: 'Reasoning & neural intelligence' },
      { label: 'GOOGLE SEARCH / CLOUD', identity: 'BUILDER', sublabel: 'Information & architecture' },
    ],
  },
  {
    id: 3,
    question: 'Your perfect Saturday?',
    options: [
      { label: 'MAKE SOMETHING', identity: 'CREATOR', sublabel: 'Edit a video or paint' },
      { label: 'BUILD SOMETHING', identity: 'BUILDER', sublabel: 'Ship a side project' },
      { label: 'TRAVEL SOMEWHERE', identity: 'EXPLORER', sublabel: 'Explore a new city spot' },
      { label: 'PLAY ALL DAY', identity: 'PLAYFUL', sublabel: 'Game with friends & chill' },
      { label: 'TRY SOMETHING NEW', identity: 'FUTURIST', sublabel: 'Test futuristic AI tools' },
    ],
  },
  {
    id: 4,
    question: 'Choose your style.',
    options: [
      { label: 'MINIMAL', identity: 'BUILDER', sublabel: 'Clean lines, zero clutter' },
      { label: 'COLORFUL', identity: 'CREATOR', sublabel: 'Expressive palette & bold' },
      { label: 'TECH', identity: 'EXPLORER', sublabel: 'Utility pockets & weatherproof' },
      { label: 'FUTURIST', identity: 'FUTURIST', sublabel: 'Cyber gradients & reflective' },
      { label: 'CASUAL', identity: 'PLAYFUL', sublabel: 'Comfy streetwear vibes' },
    ],
  },
  {
    id: 5,
    question: 'Pick your energy.',
    options: [
      { label: 'CURIOUS', identity: 'EXPLORER', sublabel: 'Always asking why & how' },
      { label: 'CREATIVE', identity: 'CREATOR', sublabel: 'Turning imagination into form' },
      { label: 'LOGICAL', identity: 'BUILDER', sublabel: 'Structured & problem solver' },
      { label: 'VISIONARY', identity: 'FUTURIST', sublabel: 'Thinking 10 years ahead' },
      { label: 'PLAYFUL', identity: 'PLAYFUL', sublabel: 'Bringing joy & humor' },
    ],
  },
];

export const QUIZ_RESULTS: Record<QuizIdentity, QuizResult> = {
  CREATOR: {
    identity: 'CREATOR',
    title: 'YOU ARE A GOOGLE CREATOR',
    badge: '🎨 CREATOR',
    tagline: 'Turning raw imagination into digital culture.',
    description: 'You thrive on storytelling, aesthetics, and video production. Your wardrobe is bold, expressive, and ready for camera light.',
    traits: ['CREATIVE', 'CURIOUS', 'BOLD', 'EXPRESSIVE'],
    recommendedProductIds: ['gv-11', 'gv-12', 'gv-13', 'gv-14', 'gv-02'],
  },
  BUILDER: {
    identity: 'BUILDER',
    title: 'YOU ARE A GOOGLE BUILDER',
    badge: '💻 BUILDER',
    tagline: 'Architecting logic and shipping tomorrow’s code.',
    description: 'You see the world in clean syntax, terminal windows, and elegant architecture. Minimal tech hoodies and comfortable desk gear are your uniform.',
    traits: ['LOGICAL', 'FOCUSED', 'ANALYTICAL', 'EFFICIENT'],
    recommendedProductIds: ['gv-15', 'gv-16', 'gv-05', 'gv-19', 'gv-01'],
  },
  EXPLORER: {
    identity: 'EXPLORER',
    title: 'YOU ARE A GOOGLE EXPLORER',
    badge: '🌎 EXPLORER',
    tagline: 'Mapping uncharted routes and seeking fresh perspectives.',
    description: 'You love discovering hidden spots, outdoor adventures, and seamless utility. Durable tote bags, caps, and water bottles keep you prepared.',
    traits: ['CURIOUS', 'ADVENTUROUS', 'ADAPTABLE', 'OBSERVANT'],
    recommendedProductIds: ['gv-03', 'gv-04', 'gv-06', 'gv-22', 'gv-20'],
  },
  FUTURIST: {
    identity: 'FUTURIST',
    title: 'YOU ARE A GOOGLE FUTURIST',
    badge: '🤖 FUTURIST',
    tagline: 'Living at the intersection of AI and cyber aesthetics.',
    description: 'You are excited about neural networks, generative AI, and futuristic fashion silhouettes. Reflective details and cyber tones match your vision.',
    traits: ['VISIONARY', 'INNOVATIVE', 'CYBER-SAVVY', 'FORWARD-THINKING'],
    recommendedProductIds: ['gv-17', 'gv-18', 'gv-24', 'gv-10', 'gv-20'],
  },
  PLAYFUL: {
    identity: 'PLAYFUL',
    title: 'YOU ARE A GOOGLE PLAYFUL',
    badge: '🎮 PLAYFUL',
    tagline: 'Infusing color, games, and pure energy into every day.',
    description: 'You appreciate open customization, fun collectibles, and vibrant streetwear. Bugdroid green and interactive items bring your vibe to life.',
    traits: ['PLAYFUL', 'ENERGETIC', 'CUSTOMIZABLE', 'FUN'],
    recommendedProductIds: ['gv-07', 'gv-08', 'gv-09', 'gv-21', 'gv-02'],
  },
};
