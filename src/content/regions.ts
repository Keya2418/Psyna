import type { BrainRegion } from "./types";

/**
 * Each selectable brain area opens one psychological trait. The psychology comes first;
 * the brain link is deliberately brief and cautious, because traits are not located in single areas.
 */
export const regions: BrainRegion[] = [
  {
    id: "prefrontal-cortex",
    name: "Prefrontal cortex",
    shortName: "Prefrontal",
    trait: "Self-control",
    tagline: "Choosing what you want most over what you want now.",
    intro:
      "Self-control is the ability to override an impulse for the sake of a longer-term goal: waiting, resisting a distraction, sticking with a plan. Psychologists treat it as a trait, because people differ in it in fairly stable ways, and it overlaps with the personality trait called conscientiousness. It is not fixed, though: it develops through childhood and keeps changing in adulthood.",
    facts: [
      { heading: "Childhood self-control predicts adult life", claimIds: ["trait-self-control-gradient", "trait-self-control-siblings"] },
      { heading: "The marshmallow test, revisited", claimIds: ["trait-marshmallow", "trait-marshmallow-replication"] },
      { heading: "Personality matters as much as money and IQ", claimIds: ["trait-personality-power"] },
      { heading: "It tends to grow with age", claimIds: ["trait-maturity"] },
      { heading: "It depends on how you are doing", claimIds: ["psy-ef-wellbeing"] },
    ],
    example:
      "Leaving your phone in another room while you study, so you are not tempted to check it, is an everyday act of self-control: choosing a longer-term goal over a short-term pull.",
    brainLink: {
      text: "Self-control draws on executive functions, such as holding a goal in mind and holding back an impulse. The prefrontal cortex supports these together with other brain areas.",
      claimIds: ["psy-executive-functions", "pfc-cognitive-control"],
    },
    keepInMind: [
      "Self-control is not a fixed amount of willpower. Stress, poor sleep, and loneliness can all make it harder.",
      "Trait findings describe averages across many people. They cannot predict what any one person will do.",
      "Waiting for a treat in a lab is only a small window onto self-control.",
    ],
    depth: "surface",
    relatedLessonIds: ["attention", "memory", "emotion"],
    keywords: ["self-control", "willpower", "conscientiousness", "impulse", "delay of gratification", "marshmallow", "discipline", "executive function", "planning", "frontal", "PFC"],
  },
  {
    id: "parietal-cortex",
    name: "Parietal cortex",
    shortName: "Parietal",
    trait: "Mind-wandering",
    tagline: "Where your attention goes when you are not steering it.",
    intro:
      "Your attention drifts away from the task at hand surprisingly often, to plans, memories, and daydreams. Psychologists call this mind-wandering. People differ in how much their minds wander and in whether they notice when it happens. It is not simply a failure of focus: it has real costs, but also real benefits.",
    facts: [
      { heading: "Minds wander a lot", claimIds: ["psy-mind-wandering"] },
      { heading: "A trade-off, not just a flaw", claimIds: ["trait-mind-wandering-balance"] },
      { heading: "Daydreaming can spark creativity", claimIds: ["trait-incubation"] },
      { heading: "We often don't notice we've drifted", claimIds: ["trait-mind-wandering-unaware"] },
    ],
    example:
      "Reaching the bottom of a page and realising you have no idea what you just read is mind-wandering caught in the act.",
    brainLink: {
      text: "Keeping your focus on purpose relies on attention networks that include the parietal cortex, working together with frontal areas.",
      claimIds: ["parietal-attention-networks"],
    },
    keepInMind: [
      "Mind-wandering is usually measured by asking people what they were just thinking about, so it relies on self-report.",
      "Whether mind-wandering helps or hurts depends on the task and on what you are thinking about.",
      "The brain networks involved span many areas; the parietal cortex is only one part.",
    ],
    depth: "surface",
    relatedLessonIds: ["attention", "memory"],
    keywords: ["mind-wandering", "daydreaming", "focus", "attention", "distraction", "creativity", "incubation", "zoning out", "concentration", "parietal"],
  },
  {
    id: "temporal-cortex",
    name: "Temporal cortex",
    shortName: "Temporal",
    trait: "Empathy",
    tagline: "Understanding what others think and feel.",
    intro:
      "Empathy covers both feeling for other people and understanding their point of view. Psychologists measure it as a trait, since some people do it more readily than others. They also study how children develop the basic insight underneath it: that other people have minds of their own, with beliefs that can differ from reality.",
    facts: [
      { heading: "Empathy has several parts", claimIds: ["trait-empathy-components"] },
      { heading: "Understanding other minds develops in childhood", claimIds: ["trait-false-belief"] },
      { heading: "Empathy scores can shift over time", claimIds: ["trait-empathy-decline"] },
    ],
    example:
      "Realising that a friend who hasn't replied isn't ignoring you (they just haven't seen your message yet) is perspective taking: picturing what is going on in someone else's mind.",
    brainLink: {
      text: "Thinking about what someone else is thinking engages an area where the temporal and parietal lobes meet, known as the temporo-parietal junction.",
      claimIds: ["trait-tpj"],
    },
    keepInMind: [
      "Empathy questionnaires measure how people describe themselves, which is not always how they act.",
      "Understanding others relies on a wide network spanning the temporal, parietal, and frontal lobes.",
      "Trends in average scores say nothing about any one person's capacity for empathy.",
    ],
    depth: "surface",
    relatedLessonIds: ["memory", "attention"],
    keywords: ["empathy", "theory of mind", "perspective taking", "compassion", "social", "understanding others", "false belief", "kindness", "temporal"],
  },
  {
    id: "occipital-cortex",
    name: "Occipital cortex",
    shortName: "Occipital",
    trait: "Mental imagery",
    tagline: "How vividly you see with your mind's eye.",
    intro:
      "Close your eyes and picture a friend's face. For some people it appears almost like a photograph; for others there is nothing to see at all. Visual imagery, the mind's eye, is one of the most striking ways people differ, and it is easy to assume that everyone's inner experience is just like your own.",
    facts: [
      { heading: "A spectrum, from none to photo-like", claimIds: ["trait-imagery-spectrum"] },
      { heading: "Aphantasia: no mind's eye", claimIds: ["trait-aphantasia"] },
    ],
    example:
      "Ask a few friends to imagine an apple and rate how clear it is, from “no image at all” to “as vivid as really seeing it”. You will probably get very different answers.",
    brainLink: {
      text: "Imagining a scene engages visual areas at the back of the brain, including the primary visual cortex, as part of a wider network.",
      claimIds: ["trait-imagery-weak-perception"],
    },
    keepInMind: [
      "Imagery can only be described by the person experiencing it, which makes it hard to measure objectively.",
      "Having vivid or faint imagery is a difference in experience, not a measure of intelligence or creativity.",
      "Imagery involves a network from frontal to sensory areas, not the occipital cortex alone.",
    ],
    depth: "surface",
    relatedLessonIds: ["attention", "memory"],
    keywords: ["imagery", "imagination", "mind's eye", "visualise", "visualize", "aphantasia", "hyperphantasia", "picture", "vision", "occipital"],
  },
  {
    id: "hippocampus",
    name: "Hippocampus",
    shortName: "Hippocampus",
    trait: "Nostalgia",
    tagline: "Why we revisit the past, and how memory rebuilds it.",
    intro:
      "Nostalgia is a sentimental longing for the past. Psychology research treats it as a common and mostly positive experience that people tend to turn to when they feel low or lonely. It also reveals something about memory itself: remembering is an act of reconstruction, not a replay.",
    facts: [
      { heading: "What nostalgic memories are about", claimIds: ["trait-nostalgia-content"] },
      { heading: "What nostalgia does for us", claimIds: ["trait-nostalgia-function"] },
      { heading: "Memory is rebuilt, not replayed", claimIds: ["trait-constructive-memory", "psy-misinformation"] },
    ],
    example:
      "Hearing a song from your teenage years and suddenly feeling close to old friends is nostalgia doing what research suggests it does: lifting your mood and reminding you of people who matter.",
    brainLink: {
      text: "The hippocampus helps build the scenes we re-live and imagine. People with hippocampal damage struggled to imagine new experiences, not only to remember old ones.",
      claimIds: ["trait-hippocampus-imagination"],
    },
    keepInMind: [
      "Nostalgia research relies mostly on questionnaires and short experiments, so effects are averages over brief periods.",
      "Feeling nostalgic is not the same as remembering accurately.",
      "The hippocampus works with many areas of the cortex; memories are not stored in one place.",
    ],
    depth: "deep",
    relatedLessonIds: ["memory", "emotion"],
    keywords: ["nostalgia", "memory", "remembering", "the past", "reminiscing", "sentimental", "imagination", "future", "loneliness", "hippocampus"],
  },
  {
    id: "amygdala",
    name: "Amygdala",
    shortName: "Amygdala",
    trait: "Emotional sensitivity",
    tagline: "How strongly you react to threat, frustration, and loss.",
    intro:
      "Some people feel worry, irritation, or sadness quickly and intensely; others stay calm even under real pressure. Psychologists call this dimension neuroticism, one of the Big Five personality traits. Despite the unflattering name, it describes normal variation between people, and how someone handles their emotions matters too.",
    facts: [
      { heading: "What the trait describes", claimIds: ["trait-neuroticism-definition"] },
      { heading: "Why it matters", claimIds: ["trait-neuroticism-health"] },
      { heading: "It tends to ease with age", claimIds: ["trait-maturity"] },
      { heading: "Threats grab attention", claimIds: ["psy-threat-attention"] },
      { heading: "How you handle feelings matters", claimIds: ["psy-reappraisal-vs-suppression"] },
    ],
    example:
      "Replaying an awkward comment for hours while a friend shrugs off the same moment within minutes shows how differently people can respond to the same small setback.",
    brainLink: {
      text: "The amygdala helps flag what is emotionally important and influences attention and memory. It is not a “fear center”: emotions involve networks across the brain.",
      claimIds: ["amyg-roles", "amyg-not-fear-center"],
    },
    keepInMind: [
      "Neuroticism is a dimension everyone sits somewhere on. It is not a medical label.",
      "Personality questionnaires describe tendencies across many situations, not how someone feels in a given moment.",
      "Group-level links to health cannot predict what will happen to any one person.",
    ],
    depth: "deep",
    relatedLessonIds: ["emotion", "attention", "memory"],
    keywords: ["emotional sensitivity", "neuroticism", "anxiety", "worry", "stress", "emotion", "fear", "threat", "big five", "emotion regulation", "amygdala"],
  },
];
