import type { BrainRegion } from "./types";

const GROUPING =
  "A broad educational grouping. Real boundaries vary between people and are not sharp lines.";

export const regions: BrainRegion[] = [
  {
    id: "prefrontal-cortex",
    name: "Prefrontal cortex",
    shortName: "Prefrontal",
    mindTag: "Focus",
    groupingNote: `${GROUPING} Our highlight combines several atlas labels of the front of the frontal lobe.`,
    intro:
      "Planning ahead, resisting an impulse, keeping a goal in mind, switching between tasks: psychologists call these skills executive functions. The prefrontal cortex, behind the forehead, is one of the brain areas most closely linked to them — always working together with other areas, not on its own.",
    psychology: [
      { concept: "Executive functions", claimIds: ["psy-executive-functions"] },
      { concept: "Working memory: a small mental workspace", claimIds: ["psy-working-memory-limit"] },
      { concept: "Self-control of attention: the Stroop effect", claimIds: ["psy-stroop"] },
      { concept: "Switching between tasks has a cost", claimIds: ["psy-switch-cost"] },
    ],
    depth: "surface",
    location: {
      text: "Front of each frontal lobe, ahead of the motor areas. Present on both sides.",
      claimIds: ["pfc-location"],
    },
    functionClaimIds: ["pfc-cognitive-control", "pfc-working-memory", "pfc-attention-network"],
    example:
      "Remembering to pick up bread on the way home — while chatting with a friend — means holding a goal in mind, ignoring distractions, and acting at the right moment: a small everyday workout for executive functions.",
    worksWith: [
      { label: "Parietal cortex", regionId: "parietal-cortex", text: "Frontal–parietal networks for directing attention.", claimIds: ["pfc-attention-network"] },
      { label: "Hippocampus", regionId: "hippocampus", text: "Complementary roles in remembering events.", claimIds: ["pfc-hippocampus-memory"] },
      { label: "Amygdala", regionId: "amygdala", text: "Interactions when emotional responses are regulated.", claimIds: ["emotion-regulation-network"] },
      { label: "Basal ganglia and thalamus", text: "Deep structures (not shown separately) that form loops with frontal cortex." },
    ],
    simplifies: [
      "Psychology tasks like the Stroop task measure behaviour. A score reflects many mental processes and many brain areas, not the prefrontal cortex alone.",
      "There is no sharp anatomical line marking “prefrontal”. Our highlight follows atlas labels and includes some premotor territory near its back edge.",
      "Prefrontal cortex contains many subregions — lateral, medial, and orbital — with different connections and contributions.",
      "It does not “control your personality” or house a single trait such as willpower.",
    ],
    deeperClaimIds: ["pfc-hippocampus-memory", "pfc-networks-not-unit", "pfc-multiple-demand", "emotion-reappraisal", "attention-insula-salience"],
    relatedLessonIds: ["attention", "memory", "emotion"],
    keywords: ["frontal", "PFC", "dorsolateral", "orbitofrontal", "executive", "planning", "working memory", "executive function", "task switching", "self-control", "willpower", "focus", "multitasking", "Stroop"],
  },
  {
    id: "parietal-cortex",
    name: "Parietal cortex",
    shortName: "Parietal",
    mindTag: "Attention",
    groupingNote: `${GROUPING} Our highlight includes the somatosensory strip, superior and inferior parietal lobules, and precuneus.`,
    intro:
      "Shifting your attention to something without moving your eyes, or knowing where things are around you, are everyday feats of spatial attention. The parietal cortex, toward the top and back of the brain, works with frontal areas to help steer this attention and guide your movements.",
    psychology: [
      { concept: "Attention can move without the eyes", claimIds: ["psy-covert-orienting"] },
      { concept: "Goal-directed vs. attention-grabbing", claimIds: ["psy-two-routes"] },
      { concept: "Vision for action: reaching and grasping", claimIds: ["parietal-action"] },
    ],
    depth: "surface",
    location: {
      text: "Behind the frontal lobes and above the temporal lobes, on both sides.",
      claimIds: ["parietal-location"],
    },
    functionClaimIds: ["parietal-attention-networks", "parietal-action", "parietal-nonspatial"],
    example:
      "Noticing a friend wave at the edge of your vision while you read, then reaching for your coffee without looking up, combines spatial attention, vision, touch, and a sense of where your hand is.",
    worksWith: [
      { label: "Prefrontal cortex", regionId: "prefrontal-cortex", text: "Frontal–parietal attention networks.", claimIds: ["pfc-attention-network"] },
      { label: "Occipital cortex", regionId: "occipital-cortex", text: "Visual information that helps guide action.", claimIds: ["parietal-action"] },
      { label: "Temporal cortex", regionId: "temporal-cortex", text: "Converging streams that support general knowledge.", claimIds: ["parietal-semantic"] },
    ],
    simplifies: [
      "Spatial attention is measured in behaviour. Imaging links it to frontal and parietal networks, which also take part in many other tasks.",
      "Parietal cortex combines quite different areas — from primary touch processing to association areas used in reading and arithmetic.",
      "Attention “networks” are a simplification; regions take part in several networks at once.",
      "Lesion effects depend on the exact location and extent of damage, which varies between people.",
    ],
    deeperClaimIds: ["parietal-neglect", "parietal-priority-map", "parietal-semantic", "attention-networks", "attention-salience"],
    relatedLessonIds: ["attention", "memory"],
    keywords: ["somatosensory", "touch", "space", "intraparietal", "precuneus", "spatial", "neglect", "attention", "spatial attention", "orienting", "spotlight", "distraction", "reaching"],
  },
  {
    id: "temporal-cortex",
    name: "Temporal cortex",
    shortName: "Temporal",
    mindTag: "Knowing",
    groupingNote: `${GROUPING} Our highlight includes the lateral temporal gyri and medial cortex (fusiform, parahippocampal, entorhinal). The hippocampus and amygdala are shown separately.`,
    intro:
      "Recognising a face, understanding a sentence, and knowing what a word means are things psychologists study as perception, language, and semantic memory (general knowledge). The temporal cortex, low on each side of the brain near your temples, contributes to all of them — together with other areas.",
    psychology: [
      { concept: "Recognising objects and faces", claimIds: ["temporal-object-stream", "temporal-faces"] },
      { concept: "Understanding speech", claimIds: ["temporal-speech"] },
      { concept: "Knowing facts and meanings (semantic memory)", claimIds: ["parietal-semantic"] },
    ],
    depth: "surface",
    location: {
      text: "Low on each side, beneath the frontal and parietal lobes. Its inner (medial) surface borders the hippocampus.",
      claimIds: ["temporal-location", "temporal-medial-memory"],
    },
    functionClaimIds: ["temporal-object-stream", "temporal-speech", "temporal-medial-memory"],
    example:
      "Recognising a friend's face in a crowd, then hearing them call your name and understanding what they say, draws on temporal cortex — working with visual areas, memory systems, and attention networks.",
    worksWith: [
      { label: "Occipital cortex", regionId: "occipital-cortex", text: "A visual pathway into the temporal lobe for recognising objects.", claimIds: ["temporal-object-stream"] },
      { label: "Hippocampus", regionId: "hippocampus", text: "A medial temporal memory system.", claimIds: ["temporal-medial-memory"] },
      { label: "Parietal cortex", regionId: "parietal-cortex", text: "Convergence zones for general knowledge.", claimIds: ["parietal-semantic"] },
      { label: "Frontal cortex", regionId: "prefrontal-cortex", text: "Speech pathways linking sound and articulation.", claimIds: ["temporal-speech"] },
    ],
    simplifies: [
      "Language involves frontal, temporal, and parietal areas; it is not located in one lobe.",
      "How strongly language relies on the left or right side varies between individuals.",
      "Areas that respond more to faces or words also take part in other tasks.",
    ],
    deeperClaimIds: ["temporal-faces", "parietal-semantic", "temporal-medial-memory"],
    relatedLessonIds: ["memory", "attention"],
    keywords: ["auditory", "hearing", "speech", "language", "faces", "fusiform", "entorhinal", "parahippocampal", "semantic", "recognition", "knowledge", "meaning", "understanding", "words", "listening"],
  },
  {
    id: "occipital-cortex",
    name: "Occipital cortex",
    shortName: "Occipital",
    mindTag: "Seeing",
    groupingNote: `${GROUPING} Our highlight includes lateral occipital cortex, cuneus, lingual gyrus, and the cortex around the calcarine sulcus (where V1 lies).`,
    intro:
      "Seeing feels effortless and complete, but psychology experiments show we notice far less than we think: unattended events and even large changes can go unseen. The occipital cortex, at the back of the brain, is where visual information first reaches the cortex — and what we end up perceiving depends on attention too.",
    psychology: [
      { concept: "We miss what we don't attend to", claimIds: ["psy-inattentional-blindness"] },
      { concept: "Change blindness", claimIds: ["psy-change-blindness"] },
      { concept: "Attention shapes what we see", claimIds: ["occipital-attention-modulation"] },
    ],
    depth: "surface",
    location: {
      text: "Back of the brain, on both sides, above the cerebellum.",
      claimIds: ["occipital-location"],
    },
    functionClaimIds: ["occipital-maps", "occipital-hierarchy", "occipital-attention-modulation"],
    example:
      "Reading these words begins with patterns of light on your retina. Occipital cortex is an early stage in turning them into edges and shapes; whether you notice the word you skimmed past depends on attention.",
    worksWith: [
      { label: "Temporal cortex", regionId: "temporal-cortex", text: "Recognising what objects are.", claimIds: ["temporal-object-stream"] },
      { label: "Parietal cortex", regionId: "parietal-cortex", text: "Using vision to guide action.", claimIds: ["parietal-action"] },
      { label: "Frontal–parietal attention networks", regionId: "prefrontal-cortex", text: "Biasing which visual information is prioritised.", claimIds: ["occipital-attention-modulation"] },
    ],
    simplifies: [
      "Inattentional and change blindness are about attention and awareness, which involve many brain areas beyond the visual cortex.",
      "Vision is not a camera: many areas, including some outside the occipital lobe, build what we perceive.",
      "The “two visual streams” idea is a helpful model, but the pathways interact.",
      "Visual maps differ in size and position from person to person.",
    ],
    deeperClaimIds: ["occipital-damage", "occipital-attention-modulation", "temporal-object-stream", "attention-competition"],
    relatedLessonIds: ["attention", "memory"],
    keywords: ["visual", "vision", "V1", "calcarine", "cuneus", "lingual", "sight", "perception", "seeing", "noticing", "inattentional blindness", "change blindness", "gorilla"],
  },
  {
    id: "hippocampus",
    name: "Hippocampus",
    shortName: "Hippocampus",
    mindTag: "Memory",
    groupingNote:
      "A deep structure, one in each hemisphere. Shown inside the model through a faded outer surface — it is not visible on the brain's exterior.",
    intro:
      "Remembering where you parked, what happened at a party, or what you studied last week is episodic memory — and psychology shows it fades, depends on context, and can be strengthened by how you learn. The hippocampus, deep in each temporal lobe, plays a key part in forming these memories, together with the surrounding cortex.",
    psychology: [
      { concept: "Episodic memory", claimIds: ["psy-episodic"] },
      { concept: "The forgetting curve", claimIds: ["psy-forgetting-curve"] },
      { concept: "Testing yourself beats re-reading", claimIds: ["psy-testing-effect"] },
      { concept: "Spacing out study", claimIds: ["psy-spacing"] },
      { concept: "Context helps recall", claimIds: ["psy-context-memory"] },
    ],
    depth: "deep",
    location: {
      text: "Deep inside the inner (medial) temporal lobe, one on each side, just behind the amygdala.",
      claimIds: ["hippo-location"],
    },
    functionClaimIds: ["hippo-hm", "hippo-binding", "hippo-consolidation"],
    example:
      "Walking back into the kitchen and suddenly remembering what you came for is context helping recall — the kind of “what, where, when” memory the hippocampus helps bind together.",
    worksWith: [
      { label: "Temporal and other cortex", regionId: "temporal-cortex", text: "Neighbouring medial temporal cortex and wider cortical networks.", claimIds: ["temporal-medial-memory", "memory-distributed"] },
      { label: "Prefrontal cortex", regionId: "prefrontal-cortex", text: "Complementary roles in remembering events.", claimIds: ["pfc-hippocampus-memory"] },
      { label: "Amygdala", regionId: "amygdala", text: "Emotion can strengthen hippocampus-dependent memories.", claimIds: ["amyg-memory-modulation"] },
    ],
    simplifies: [
      "Learning techniques such as self-testing and spacing were studied in behaviour. Their benefits are not tied to the hippocampus alone.",
      "Memories are not stored “in” the hippocampus like files; cortex plays a major part, and the relationship changes over time.",
      "Memories for skills and habits rely more on other structures.",
      "The hippocampus has subregions along its length that may contribute differently.",
      "Its size and shape vary between people; our model shows an average from many brains.",
    ],
    deeperClaimIds: ["hippo-transformation", "hippo-spatial", "hippo-taxi", "hippo-sleep", "memory-skills-elsewhere"],
    relatedLessonIds: ["memory", "emotion"],
    keywords: ["memory", "episodic", "H.M.", "place cells", "navigation", "consolidation", "sleep", "medial temporal", "remembering", "forgetting", "studying", "learning", "exam", "revision", "context"],
  },
  {
    id: "amygdala",
    name: "Amygdala",
    shortName: "Amygdala",
    mindTag: "Emotion",
    groupingNote:
      "A deep cluster of nuclei, one in each hemisphere. Shown inside the model through a faded outer surface — it is not visible on the brain's exterior.",
    intro:
      "Why does a snake-shaped stick make you jump, and why do emotional moments feel so vivid? Psychology studies how emotions arise, grab attention, colour memory, and can be managed. The amygdala, deep in each temporal lobe, contributes to flagging what is emotionally important — but it is not a “fear center”: it works within larger networks.",
    psychology: [
      { concept: "Emotions depend on how we read a situation", claimIds: ["psy-appraisal"] },
      { concept: "Threats grab attention", claimIds: ["psy-threat-attention"] },
      { concept: "Vivid memories aren't always accurate", claimIds: ["psy-flashbulb"] },
      { concept: "Putting feelings into words", claimIds: ["psy-affect-labeling"] },
    ],
    depth: "deep",
    location: {
      text: "Deep in the front of the inner temporal lobe, one on each side, just in front of the hippocampus.",
      claimIds: ["amyg-location"],
    },
    functionClaimIds: ["amyg-roles", "amyg-memory-modulation", "amyg-not-fear-center"],
    example:
      "You jump at a stick on a hiking trail before realising it isn't a snake. Flagging potentially important events like this involves the amygdala together with sensory, attention, and body-regulation systems.",
    worksWith: [
      { label: "Hippocampus", regionId: "hippocampus", text: "Emotion and memory interact.", claimIds: ["amyg-memory-modulation"] },
      { label: "Prefrontal cortex", regionId: "prefrontal-cortex", text: "Regulating emotional responses.", claimIds: ["emotion-regulation-network"] },
      { label: "Sensory cortex", regionId: "occipital-cortex", text: "Emotional significance can modulate perception.", claimIds: ["amyg-attention"] },
      { label: "Hypothalamus and brainstem", text: "Body responses such as changes in heart rate (not shown separately).", claimIds: ["emotion-network"] },
    ],
    simplifies: [
      "Emotion research in psychology measures feelings, behaviour, and body responses. Amygdala activity is only one part of that picture.",
      "Calling it the “fear center” is misleading: it is involved in reward, novelty, and social information too, and fear involves many regions.",
      "It contains several nuclei with different connections, shown here as one shape.",
      "Activity in the amygdala is not the same thing as a feeling.",
      "Much of the detailed circuit evidence comes from animal research.",
    ],
    deeperClaimIds: ["amyg-fear-learning", "amyg-reward", "amyg-sm", "amyg-lesion-perception", "amyg-fear-debate", "amyg-mtl-encoding", "emotion-memory-details"],
    relatedLessonIds: ["emotion", "attention", "memory"],
    keywords: ["emotion", "fear", "threat", "reward", "almond", "salience", "limbic", "feelings", "flashbulb", "appraisal", "emotion regulation"],
  },
];
