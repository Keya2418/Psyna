import type { EducationalClaim } from "./types";

/**
 * Educational claims. Each claim is worded so that its cited sources support it.
 * Evidence kinds:
 *  - anatomy:        where something is
 *  - association:    observed together (e.g. imaging); does not prove cause
 *  - causal:         evidence from damage or manipulation
 *  - interpretation: a model or theory researchers use to organise evidence
 */
export const claims: EducationalClaim[] = [
  // ───────────────────────── Prefrontal cortex ─────────────────────────
  {
    id: "pfc-cognitive-control",
    text: "An influential theory proposes that prefrontal cortex supports cognitive control: keeping goals and rules active so that they bias processing in other brain areas toward what the current task needs.",
    evidence: "interpretation",
    citationIds: ["miller-cohen-2001"],
    caveat: "This is a theoretical framework. It is supported by several kinds of evidence, but other models exist.",
  },
  {
    id: "pfc-working-memory",
    text: "Prefrontal cortex is involved in working memory — briefly holding and using information — together with other cortical areas.",
    evidence: "association",
    citationIds: ["brainfacts-memory-facets", "qbi-memory-stored"],
    caveat: "Some of the cell-level evidence comes from animal studies; in people, much of the evidence is from brain imaging, which shows involvement rather than proving cause.",
  },
  {
    id: "pfc-attention-network",
    text: "Parts of the superior frontal cortex work with parts of the intraparietal cortex in a network linked to goal-directed attention — choosing what to focus on based on what you are trying to do.",
    evidence: "association",
    citationIds: ["corbetta-shulman-2002", "kastner-ungerleider-2000"],
  },

  // ───────────────────────── Parietal cortex ─────────────────────────
  {
    id: "parietal-attention-networks",
    text: "Parietal cortex takes part in two partly separate attention networks: one (with intraparietal cortex) linked to goal-directed focus, and another (with temporoparietal cortex, more strongly on the right side) linked to noticing unexpected, important events.",
    evidence: "association",
    citationIds: ["corbetta-shulman-2002"],
    caveat: "The two networks interact constantly; the division is a useful simplification.",
  },

  // ───────────────────────── Occipital cortex ─────────────────────────
  {
    id: "occipital-attention-modulation",
    text: "Attention changes activity in visual cortex. Many objects compete for limited processing, and signals from a frontal–parietal network help bias that competition toward what is relevant.",
    evidence: "association",
    citationIds: ["kastner-ungerleider-2000"],
  },

  // ───────────────────────── Hippocampus ─────────────────────────
  {
    id: "hippo-binding",
    text: "The hippocampus works with a network of cortical areas and appears to link together the separate elements of an event — what happened, where, and when.",
    evidence: "interpretation",
    citationIds: ["brainfacts-memory-facets", "squire-stark-clark-2004"],
  },
  {
    id: "hippo-consolidation",
    text: "New memories initially depend on both the hippocampus and the neocortex. Over time, many memories seem to become less dependent on the hippocampus — a process called systems consolidation.",
    evidence: "interpretation",
    citationIds: ["squire-2015-consolidation", "frankland-bontempi-2005"],
    caveat: "Researchers still disagree about which memories become independent of the hippocampus, and whether detailed personal memories ever fully do.",
  },
  {
    id: "memory-distributed",
    text: "Remembering an event draws on a large network of cortical areas that work together with the hippocampus. Each contributes different aspects of the experience — perception, movement, emotion, and thought.",
    evidence: "association",
    citationIds: ["brainfacts-memory-facets"],
  },
  {
    id: "memory-retrieval-network",
    text: "When people successfully recall past events, imaging studies consistently find a network of cortical regions, each connected with the medial temporal lobe, working together with areas that represent what is being remembered.",
    evidence: "association",
    citationIds: ["rugg-vilberg-2013"],
  },

  // ───────────────────────── Amygdala ─────────────────────────
  {
    id: "amyg-not-fear-center",
    text: "A large meta-analysis of brain imaging studies found little evidence that individual emotions, such as fear or anger, map consistently and specifically onto single brain regions. Instead, interacting networks were involved across many emotions.",
    evidence: "association",
    citationIds: ["lindquist-2012"],
    caveat: "Imaging measures activity indirectly, and the debate about how emotions are organised in the brain continues.",
  },
  {
    id: "amyg-roles",
    text: "Research in animals and humans links the amygdala to several processes: learning which things signal danger, the influence of emotion on memory and attention, social behaviour, and emotion regulation.",
    evidence: "association",
    citationIds: ["phelps-ledoux-2005"],
  },
  {
    id: "amyg-memory-modulation",
    text: "Animal and human studies suggest the amygdala helps emotionally arousing experiences — pleasant or unpleasant — become more strongly consolidated into long-term memory.",
    evidence: "causal",
    citationIds: ["mcgaugh-2004", "phelps-2004"],
    caveat: "Most of the causal evidence comes from animal studies; human evidence is mainly correlational.",
  },
  {
    id: "amyg-attention",
    text: "The amygdala appears to contribute to emotional attention — the way emotionally significant things, especially possible threats, can gain priority in perception.",
    evidence: "interpretation",
    citationIds: ["vuilleumier-2005", "anderson-phelps-2001"],
  },

  // ───────────────────────── Emotion, attention, cross-cutting ─────────────────────────
  {
    id: "emotion-reappraisal",
    text: "A meta-analysis of 48 imaging studies found that reappraisal — deliberately reinterpreting a situation — consistently engaged cognitive-control regions and lateral temporal cortex, and changed activity in the amygdala on both sides.",
    evidence: "association",
    citationIds: ["buhle-2014"],
    caveat: "Notably, the same analysis did not find consistent involvement of ventromedial prefrontal cortex, which some models had predicted.",
  },

  // ───────────────────────── Myths and limits ─────────────────────────
  {
    id: "myth-reverse-inference",
    text: "Seeing activity in a region does not reliably reveal which mental process is happening, because most regions are involved in many processes. Scientists call this the problem of “reverse inference”.",
    evidence: "interpretation",
    citationIds: ["poldrack-2006"],
  },
  {
    id: "myth-decoding",
    text: "In controlled experiments, researchers can sometimes decode limited information about what a person perceives from brain activity patterns. This is far from reading arbitrary thoughts, and it raises real privacy questions.",
    evidence: "association",
    citationIds: ["haynes-rees-2006"],
  },
  {
    id: "individual-variability",
    text: "Brains differ from person to person. Patterns of connectivity vary between individuals, especially in association cortex, so an average brain model is only an approximation for any one person.",
    evidence: "association",
    citationIds: ["mueller-2013"],
  },
  {
    id: "model-source",
    text: "The 3D model in Psyna is built from an average of many adult MRI scans (the MNI ICBM152 2009c template) and labelled with the CerebrA atlas.",
    evidence: "anatomy",
    citationIds: ["manera-2020", "fonov-2011"],
  },

  // ───────────────────────── Psychology: memory ─────────────────────────
  {
    id: "psy-seven-sins",
    text: "Memory is usually reliable but also fallible. Psychologist Daniel Schacter grouped everyday memory failures into seven “sins”: transience (fading over time), absent-mindedness, blocking (the tip-of-the-tongue feeling), misattribution, suggestibility, bias, and persistence (memories that won't go away).",
    evidence: "interpretation",
    citationIds: ["schacter-1999"],
    caveat: "A classification scheme, not a measurement. Schacter argues these failures are by-products of features that usually make memory useful.",
  },
  {
    id: "psy-working-memory-limit",
    text: "Working memory — holding information in mind while you use it — has a small central capacity. Research reviewed by Nelson Cowan puts it at about 3 to 5 meaningful items in young adults, and the limit differs between people.",
    evidence: "experiment",
    citationIds: ["cowan-2010"],
    caveat: "How much people can repeat back depends on the task. The 3–5 figure describes a more constant underlying limit, counted in meaningful items.",
  },
  {
    id: "psy-context-memory",
    text: "Context helps recall. In a classic experiment, divers learned word lists either on land or underwater. Lists learned underwater were best recalled underwater, and lists learned on land were best recalled on land.",
    evidence: "experiment",
    citationIds: ["godden-baddeley-1975"],
    caveat: "A study in an unusual setting. It illustrates context-dependent memory rather than showing how large the effect is in daily life.",
  },
  {
    id: "psy-forgetting-curve",
    text: "In the 1880s Hermann Ebbinghaus measured forgetting by how much faster he could relearn lists after a delay, producing the famous “forgetting curve”. A 2015 replication, relearning lists after delays from 20 minutes to 31 days, found results similar to his.",
    evidence: "experiment",
    citationIds: ["murre-dros-2015"],
    caveat: "Both the original and the replication tested a single person learning artificial lists, so they show the general pattern, not how quickly any particular person forgets.",
  },
  {
    id: "psy-testing-effect",
    text: "Testing yourself helps you remember. Students who practised recalling a text remembered more of it 2 days or a week later than students who re-read it — even though re-reading made them more confident. On a test after just 5 minutes, re-reading came out ahead.",
    evidence: "experiment",
    citationIds: ["roediger-karpicke-2006"],
  },
  {
    id: "psy-spacing",
    text: "Spreading study out over time generally helps retention. A meta-analysis of over 300 experiments found that the most useful gap between study sessions grew longer the longer the information needed to be remembered.",
    evidence: "experiment",
    citationIds: ["cepeda-2006"],
    caveat: "Most of these experiments used verbal recall tasks, such as word lists.",
  },
  {
    id: "psy-study-techniques",
    text: "A large review of ten study techniques rated practice testing and spacing out study as the most useful. Re-reading and highlighting, which many students rely on, were rated low because they did not consistently improve performance.",
    evidence: "interpretation",
    citationIds: ["dunlosky-2013"],
    caveat: "These are expert ratings of the evidence; how well a technique works varies with the learner and the material.",
  },
  {
    id: "psy-misinformation",
    text: "Memories can be changed by information that comes later. Thirty years of “misinformation effect” research show that misleading information can impair memory for an event, and that people can even come to believe in rich experiences that never happened. Warnings help only under limited circumstances.",
    evidence: "experiment",
    citationIds: ["loftus-2005"],
  },
  // ───────────────────────── Psychology: attention ─────────────────────────
  {
    id: "psy-executive-functions",
    text: "Psychologists describe three core executive functions: inhibition (self-control and resisting distraction), working memory, and cognitive flexibility (seeing things from a new angle and adapting quickly). Together they let us play with ideas, think before acting, meet unexpected challenges, and stay focused.",
    evidence: "interpretation",
    citationIds: ["diamond-2013"],
  },
  {
    id: "psy-ef-wellbeing",
    text: "Executive functions depend on overall well-being. A major review notes that stress, lack of sleep, loneliness, and lack of exercise can each impair them, and that they can improve with practice.",
    evidence: "interpretation",
    citationIds: ["diamond-2013"],
    caveat: "A summary of research across many studies. It describes general patterns, not any individual.",
  },
  {
    id: "psy-stroop",
    text: "In the Stroop task, people name the ink colour of colour words — and a word that names a different colour interferes. With about 400 studies over more than 50 years, it is one of psychology's classic measures of attention and interference.",
    evidence: "experiment",
    citationIds: ["macleod-1991"],
  },
  {
    id: "psy-covert-orienting",
    text: "Attention can move without the eyes. In Michael Posner's classic experiments, people shifted attention to a location they were not looking at, and this changed how efficiently they detected things that appeared there.",
    evidence: "experiment",
    citationIds: ["posner-1980"],
  },
  {
    id: "psy-two-routes",
    text: "Attention can be steered in two broad ways: deliberately, by your goals (goal-directed), or automatically, when something unexpected and important grabs it (stimulus-driven).",
    evidence: "interpretation",
    citationIds: ["corbetta-shulman-2002"],
  },
  {
    id: "psy-inattentional-blindness",
    text: "We can miss things in plain sight. In the “Gorillas in our midst” study, many people busy with a monitoring task failed to notice an unexpected event in a moving scene. Whether they noticed depended on how similar it was to what they were tracking and on how hard the task was.",
    evidence: "experiment",
    citationIds: ["simons-chabris-1999"],
  },
  {
    id: "psy-change-blindness",
    text: "People often fail to notice large changes that would normally be easy to see — “change blindness”. It has taught researchers a lot about attention and awareness.",
    evidence: "experiment",
    citationIds: ["simons-rensink-2005"],
    caveat: "Easy to over-interpret: the review explains which conclusions change blindness supports and which it does not.",
  },
  {
    id: "psy-switch-cost",
    text: "Switching between tasks has a cost. Right after a switch, people respond more slowly and usually make more errors. Preparing in advance reduces this “switch cost” but does not remove it.",
    evidence: "experiment",
    citationIds: ["monsell-2003"],
  },
  {
    id: "psy-phone-driving",
    text: "In driving-simulator experiments, phone conversations — handheld or hands-free — doubled the rate of missed traffic signals and slowed reactions. Listening to the radio or an audiobook did not have this effect.",
    evidence: "experiment",
    citationIds: ["strayer-johnston-2001"],
    caveat: "A laboratory simulation; real-world driving differs in many ways.",
  },
  {
    id: "psy-mind-wandering",
    text: "Minds wander a lot. A smartphone study that asked people about their thoughts during the day found they were thinking about something other than what they were doing almost as often as not — and they were typically less happy when their minds wandered.",
    evidence: "association",
    citationIds: ["killingsworth-gilbert-2010"],
    caveat: "An observed link: it does not by itself show that mind-wandering causes unhappiness.",
  },
  // ───────────────────────── Psychology: emotion ─────────────────────────
  {
    id: "psy-appraisal",
    text: "Appraisal theories propose that emotions depend on how we evaluate a situation. Developed by Magda Arnold and Richard Lazarus in the 1960s, appraisal has become one of the main approaches in emotion research.",
    evidence: "interpretation",
    citationIds: ["moors-2013"],
    caveat: "There are several versions of appraisal theory, and other approaches to emotion exist.",
  },
  {
    id: "psy-constructed-emotion",
    text: "The theory of constructed emotion is a newer, brain-based proposal. It questions the search for a brain basis of everyday emotion categories, and explains emotions in terms of how the brain senses the body (interoception) and categorises experience.",
    evidence: "interpretation",
    citationIds: ["barrett-2016"],
    caveat: "An influential but debated theory.",
  },
  {
    id: "psy-threat-attention",
    text: "Threats grab attention. People found pictures of snakes or spiders among flowers or mushrooms faster than the other way round, and people afraid of snakes found snakes faster still.",
    evidence: "experiment",
    citationIds: ["ohman-2001"],
  },
  {
    id: "psy-flashbulb",
    text: "Vivid doesn't mean accurate. Students recorded how they heard about the 11 September 2001 attacks the next day and were retested weeks or months later. Their “flashbulb” memories became less consistent at the same rate as everyday memories; what stayed high was their confidence.",
    evidence: "association",
    citationIds: ["talarico-rubin-2003"],
    caveat: "One group of 54 students and one event.",
  },
  {
    id: "psy-reappraisal-vs-suppression",
    text: "How you manage an emotion matters. In an experiment with a disgusting film, both reinterpreting it (reappraisal) and hiding one's feelings (suppression) reduced visible expressions. But only reappraisal reduced the feeling of disgust, while suppression increased bodily arousal.",
    evidence: "experiment",
    citationIds: ["gross-1998"],
  },
  {
    id: "psy-regulation-meta",
    text: "Across 306 experiments, changing how you think about a situation had a small-to-medium effect on emotional outcomes. Distraction helped, but concentrating on the emotional situation did not; hiding an expression helped more than trying to suppress the feeling itself.",
    evidence: "experiment",
    citationIds: ["webb-2012"],
    caveat: "Average effects across laboratory studies; what works varies between people and situations.",
  },
  {
    id: "psy-affect-labeling",
    text: "Putting feelings into words may help. When people labelled the emotion in negative pictures, their amygdala responded less than when they processed the pictures in other ways, and an area of right prefrontal cortex became more active.",
    evidence: "association",
    citationIds: ["lieberman-2007"],
    caveat: "A brain-imaging study of short laboratory tasks; it shows a link, not a proven mechanism.",
  },

  // ───────────────────────── Psychological traits (one per selectable area) ─────────────────────────
  {
    id: "trait-self-control-gradient",
    text: "Self-control in childhood predicts adult life. A study that followed 1,000 children from birth to age 32 found that those with more self-control grew up to have better physical health, fewer substance problems, better finances, and less criminal offending, following a gradient of self-control. The link held after accounting for intelligence and social class.",
    evidence: "association",
    citationIds: ["moffitt-2011"],
    caveat: "A long-term observational study: it shows a robust link, not that self-control alone caused these outcomes.",
  },
  {
    id: "trait-self-control-siblings",
    text: "Even within the same family, it mattered: in a second group of 500 sibling pairs, the sibling with lower self-control tended to have poorer outcomes, despite sharing a family background.",
    evidence: "association",
    citationIds: ["moffitt-2011"],
  },
  {
    id: "trait-marshmallow",
    text: "In the famous “marshmallow test”, preschoolers who waited longer for a bigger treat tended to become more academically and socially competent teenagers.",
    evidence: "association",
    citationIds: ["mischel-1989"],
  },
  {
    id: "trait-marshmallow-replication",
    text: "A larger, more diverse replication found the link was only half as strong as first reported — and shrank by about two-thirds once family background and early ability were taken into account. Most of the difference came from being able to wait at least 20 seconds.",
    evidence: "association",
    citationIds: ["watts-2018"],
    caveat: "A good example of how famous findings get refined: waiting for a treat is a small window onto self-control, not a destiny.",
  },
  {
    id: "trait-personality-power",
    text: "Personality traits matter as much as money and IQ. A review of long-term studies found that traits predicted how long people lived, whether they divorced, and how far they rose at work about as strongly as socioeconomic status and cognitive ability did.",
    evidence: "association",
    citationIds: ["roberts-2007"],
  },
  {
    id: "trait-maturity",
    text: "Personality keeps changing after childhood. Across 92 long-term samples, people on average became more conscientious and more emotionally stable as they aged, especially between 20 and 40.",
    evidence: "association",
    citationIds: ["roberts-2006"],
    caveat: "These are average trends; individuals change in different ways and at different speeds.",
  },
  {
    id: "trait-brain-structure-caveat",
    text: "Personality is hard to find in brain anatomy. In the largest such study to date (1,107 students), the Big Five personality traits showed almost no reliable links to the size or shape of brain structures.",
    evidence: "association",
    citationIds: ["avinun-2020"],
    caveat: "So this app links each trait to processes a brain area takes part in — not to the size or “strength” of that area.",
  },
  {
    id: "trait-mind-wandering-balance",
    text: "Mind-wandering is a trade-off. A major review concludes that drifting off-task is linked to many kinds of errors, but also to creativity and planning for the future — and that how much it helps or hurts depends on what you think about and whether you notice it.",
    evidence: "interpretation",
    citationIds: ["smallwood-schooler-2015"],
  },
  {
    id: "trait-incubation",
    text: "A wandering mind can be creative. People given a break doing an easy, mind-wandering-friendly task came up with more creative uses for everyday objects they had already seen than people who rested, did a demanding task, or had no break.",
    evidence: "experiment",
    citationIds: ["baird-2012"],
  },
  {
    id: "trait-mind-wandering-unaware",
    text: "Brain scans taken while people's minds wandered showed activity in both the brain's “default” network and its executive (task-control) network — strongest when people had not noticed they had drifted off.",
    evidence: "association",
    citationIds: ["christoff-2009"],
  },
  {
    id: "trait-false-belief",
    text: "Reading minds is learned. Across 178 studies and many countries, children went from failing to passing “false-belief” tasks — understanding that someone can believe something untrue — during the preschool years.",
    evidence: "experiment",
    citationIds: ["wellman-2001"],
  },
  {
    id: "trait-empathy-components",
    text: "Empathy is not one thing. A widely used questionnaire measures four parts: empathic concern (feeling for others), perspective taking (seeing their point of view), fantasy (identifying with fictional characters), and personal distress (feeling upset by others' distress).",
    evidence: "interpretation",
    citationIds: ["konrath-2011"],
  },
  {
    id: "trait-empathy-decline",
    text: "Combining 72 samples of American college students from 1979 to 2009, researchers found that empathic concern and perspective taking declined over time, especially after 2000.",
    evidence: "association",
    citationIds: ["konrath-2011"],
    caveat: "Questionnaire scores from one country's students; the study does not identify the cause.",
  },
  {
    id: "trait-tpj",
    text: "A region at the junction of the temporal and parietal lobes responded more when people read stories about what a character was thinking than stories describing people's physical appearance.",
    evidence: "association",
    citationIds: ["saxe-kanwisher-2003"],
  },
  {
    id: "trait-imagery-spectrum",
    text: "People's mind's eye differs enormously. The vividness of visual imagery ranges from completely absent (“aphantasia”) to photo-like (“hyperphantasia”).",
    evidence: "interpretation",
    citationIds: ["pearson-2019"],
  },
  {
    id: "trait-aphantasia",
    text: "Some people have never been able to picture things in their mind. Researchers named this “aphantasia” in 2015, after people contacted them describing a lifelong absence of visual imagery.",
    evidence: "association",
    citationIds: ["zeman-2015", "pearson-2019"],
    caveat: "Based on people's own descriptions of their inner experience, which are hard to measure directly.",
  },
  {
    id: "trait-imagery-weak-perception",
    text: "Imagining a scene engages a network running from frontal areas to sensory areas, including the primary visual cortex at the back of the brain. Imagery can work much like a weak version of seeing.",
    evidence: "interpretation",
    citationIds: ["pearson-2019"],
  },
  {
    id: "trait-nostalgia-content",
    text: "Nostalgic memories usually star you with people you're close to, or at big life events, and contain more positive than negative feeling — often a hard moment that turned out well.",
    evidence: "experiment",
    citationIds: ["wildschut-2006"],
  },
  {
    id: "trait-nostalgia-function",
    text: "Nostalgia is a mood-repair tool. It tends to be triggered by low mood and loneliness, and in experiments it strengthened feelings of social connection, raised self-regard, and boosted positive mood.",
    evidence: "experiment",
    citationIds: ["wildschut-2006"],
  },
  {
    id: "trait-constructive-memory",
    text: "Memory is built, not replayed. One influential view holds that memory is constructive and prone to errors — and that this flexibility is what lets us imagine the future, by recombining pieces of past experience.",
    evidence: "interpretation",
    citationIds: ["schacter-addis-2007"],
  },
  {
    id: "trait-hippocampus-imagination",
    text: "People with damage to the hippocampus on both sides were markedly impaired at imagining new everyday scenes: their imagined experiences were fragmented and lacked a coherent sense of space.",
    evidence: "causal",
    citationIds: ["hassabis-2007"],
    caveat: "A small group of patients; the hippocampus works with many other areas in remembering and imagining.",
  },
  {
    id: "trait-neuroticism-definition",
    text: "Neuroticism is the personality trait describing how readily someone reacts with negative emotions to threat, frustration, or loss. People range from intense reactions to minor setbacks to little reaction even under real difficulty.",
    evidence: "interpretation",
    citationIds: ["lahey-2009"],
  },
  {
    id: "trait-neuroticism-health",
    text: "Neuroticism matters for health. It is a robust predictor of many mental and physical disorders and of how often people use health services.",
    evidence: "association",
    citationIds: ["lahey-2009"],
    caveat: "Links across large groups; a trait score does not predict what will happen to any one person.",
  },
];
