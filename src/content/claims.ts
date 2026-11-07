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
    id: "pfc-location",
    text: "The frontal lobes sit directly behind the forehead, with motor areas along their back edge. “Prefrontal” refers to the frontal cortex in front of those motor areas.",
    evidence: "anatomy",
    citationIds: ["ninds-brain-basics"],
  },
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
  {
    id: "pfc-hippocampus-memory",
    text: "Prefrontal cortex and the hippocampus play distinct but complementary roles in remembering events, and their interaction appears to help use the current context to retrieve relevant memories.",
    evidence: "interpretation",
    citationIds: ["eichenbaum-2017"],
    caveat: "Much of the detailed mechanism comes from animal research, and the model is still being refined.",
  },
  {
    id: "pfc-networks-not-unit",
    text: "Lateral frontal cortex does not seem to work as a single unit. Reviews of the evidence describe separate frontal networks that interact to meet different task demands.",
    evidence: "interpretation",
    citationIds: ["badre-nee-2018"],
  },
  {
    id: "pfc-multiple-demand",
    text: "A common pattern of frontal and parietal activity appears across many different demanding tasks, suggesting these areas help organise multi-step mental work.",
    evidence: "association",
    citationIds: ["duncan-2010"],
  },

  // ───────────────────────── Parietal cortex ─────────────────────────
  {
    id: "parietal-location",
    text: "The parietal lobes lie behind the frontal lobes, on the upper back part of each hemisphere. Their front strip, just behind the motor areas, is the somatosensory cortex, which receives information about touch, temperature, and body movement.",
    evidence: "anatomy",
    citationIds: ["ninds-brain-basics"],
  },
  {
    id: "parietal-attention-networks",
    text: "Parietal cortex takes part in two partly separate attention networks: one (with intraparietal cortex) linked to goal-directed focus, and another (with temporoparietal cortex, more strongly on the right side) linked to noticing unexpected, important events.",
    evidence: "association",
    citationIds: ["corbetta-shulman-2002"],
    caveat: "The two networks interact constantly; the division is a useful simplification.",
  },
  {
    id: "parietal-action",
    text: "A well-known proposal describes a visual pathway from occipital to posterior parietal cortex that helps guide actions, such as shaping your hand to pick up an object.",
    evidence: "interpretation",
    citationIds: ["goodale-milner-1992"],
    caveat: "Later research has shown the two visual “streams” interact more than the original proposal suggested.",
  },
  {
    id: "parietal-nonspatial",
    text: "Parietal cortex is not only about space and movement. Lower (inferior) parietal regions are also involved in sustaining attention and detecting important events over time.",
    evidence: "association",
    citationIds: ["husain-nachev-2007"],
  },
  {
    id: "parietal-neglect",
    text: "Damage involving right parietal, temporal, and frontal cortex can cause spatial neglect, where a person tends not to notice things on one side. Researchers argue this reflects disrupted attention networks rather than the loss of one isolated spot.",
    evidence: "causal",
    citationIds: ["corbetta-shulman-2011"],
    caveat: "Brain injuries rarely affect one region cleanly, so lesion evidence must be interpreted carefully.",
  },
  {
    id: "parietal-priority-map",
    text: "In monkeys, neurons in an area of the intraparietal sulcus behave like a “priority map”, with activity reflecting how important each location currently is for attention and eye movements.",
    evidence: "association",
    citationIds: ["bisley-goldberg-2010"],
    caveat: "This evidence comes from animal research. Human parietal cortex is related but not identical.",
  },
  {
    id: "parietal-semantic",
    text: "The inferior parietal lobe and much of the temporal lobe sit where several sensory processing streams converge, and are engaged when people use general knowledge about the world.",
    evidence: "association",
    citationIds: ["binder-desai-2011"],
  },

  // ───────────────────────── Temporal cortex ─────────────────────────
  {
    id: "temporal-location",
    text: "The temporal lobes sit low on each side of the brain, in front of the visual areas and beneath the frontal and parietal lobes. An area at the top of each temporal lobe receives information from the ears.",
    evidence: "anatomy",
    citationIds: ["ninds-brain-basics"],
  },
  {
    id: "temporal-medial-memory",
    text: "The inner (medial) part of the temporal lobe contains the hippocampus and neighbouring cortex — entorhinal, perirhinal, and parahippocampal — that together form a system essential for remembering facts and events.",
    evidence: "causal",
    citationIds: ["squire-stark-clark-2004", "qbi-lobes"],
    caveat: "Researchers still debate how the work is divided among these neighbouring structures.",
  },
  {
    id: "temporal-object-stream",
    text: "A pathway from visual cortex into the lower temporal lobe is proposed to play a major role in recognising and identifying objects.",
    evidence: "interpretation",
    citationIds: ["goodale-milner-1992", "grill-spector-malach-2004"],
  },
  {
    id: "temporal-faces",
    text: "In an influential imaging study, a region of the fusiform gyrus on the underside of the temporal lobe responded more to faces than to other objects in 12 of 15 participants.",
    evidence: "association",
    citationIds: ["kanwisher-1997"],
    caveat: "“Responds more to faces” does not mean the area only handles faces, or that face recognition happens there alone.",
  },
  {
    id: "temporal-speech",
    text: "A widely used model describes speech comprehension as relying on a pathway through temporal cortex that is largely present on both sides, while mapping sounds to speech movements relies on a pathway that is more strongly left-sided.",
    evidence: "interpretation",
    citationIds: ["hickok-poeppel-2007"],
  },

  // ───────────────────────── Occipital cortex ─────────────────────────
  {
    id: "occipital-location",
    text: "The occipital lobes are at the back of the brain. They process visual information from the eyes; the primary visual cortex (V1) is the first cortical area to receive it.",
    evidence: "anatomy",
    citationIds: ["ninds-brain-basics", "qbi-lobes"],
  },
  {
    id: "occipital-maps",
    text: "Much of visual cortex is organised as maps of the visual field: neighbouring neurons respond to neighbouring locations in what you see. Several such maps have been measured in human occipital and parietal cortex.",
    evidence: "association",
    citationIds: ["wandell-2007"],
  },
  {
    id: "occipital-damage",
    text: "Damage to the occipital lobes can cause loss of vision.",
    evidence: "causal",
    citationIds: ["ninds-brain-basics"],
  },
  {
    id: "occipital-attention-modulation",
    text: "Attention changes activity in visual cortex. Many objects compete for limited processing, and signals from a frontal–parietal network help bias that competition toward what is relevant.",
    evidence: "association",
    citationIds: ["kastner-ungerleider-2000"],
  },
  {
    id: "occipital-hierarchy",
    text: "Imaging research describes human visual cortex as many areas with partly specialised roles, organised roughly hierarchically from simpler to more complex visual features.",
    evidence: "interpretation",
    citationIds: ["grill-spector-malach-2004"],
  },

  // ───────────────────────── Hippocampus ─────────────────────────
  {
    id: "hippo-location",
    text: "There is one hippocampus in each hemisphere, curled deep inside the inner part of the temporal lobe. Its curved shape gave it a name that refers to the seahorse.",
    evidence: "anatomy",
    citationIds: ["qbi-limbic", "qbi-lobes"],
  },
  {
    id: "hippo-hm",
    text: "Studies of patient H.M., who had tissue removed from the medial temporal lobe on both sides in the 1950s, showed that these structures are important for forming new lasting memories of facts and events.",
    evidence: "causal",
    citationIds: ["scoville-milner-1957", "squire-wixted-2011"],
    caveat: "H.M.'s surgery removed more than the hippocampus, and a single case cannot reveal everything about how memory works.",
  },
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
    id: "hippo-transformation",
    text: "Another view emphasises that memories transform over time, and that the hippocampus may stay involved in recalling vivid details while gist-like knowledge relies more on neocortex.",
    evidence: "interpretation",
    citationIds: ["moscovitch-2016"],
  },
  {
    id: "hippo-spatial",
    text: "Recordings in animals have found “place cells” in the hippocampus that fire when an animal is in particular locations, and “grid cells” in nearby entorhinal cortex, which together contribute to representing space.",
    evidence: "association",
    citationIds: ["moser-2008"],
    caveat: "This evidence comes mainly from rodents.",
  },
  {
    id: "hippo-taxi",
    text: "In a structural MRI study, licensed London taxi drivers had larger posterior hippocampi than control participants, and the difference correlated with time spent driving a taxi.",
    evidence: "association",
    citationIds: ["maguire-2000"],
    caveat: "This was a small, cross-sectional comparison. The link with years of driving is suggestive, but on its own the study cannot prove that the job caused the difference.",
  },
  {
    id: "hippo-sleep",
    text: "Sleep appears to support memory consolidation. During deep (slow-wave) sleep, coordinated brain rhythms are thought to help reactivate hippocampus-dependent memories and redistribute them to neocortex.",
    evidence: "interpretation",
    citationIds: ["diekelmann-born-2010"],
    caveat: "The proposed mechanisms draw on both human and animal studies and remain an active research area.",
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
  {
    id: "memory-skills-elsewhere",
    text: "Not all memory depends on the hippocampus. Memories for skills and habits rely more on structures such as the basal ganglia and cerebellum.",
    evidence: "association",
    citationIds: ["qbi-memory-stored", "brainfacts-memory-facets"],
  },

  // ───────────────────────── Amygdala ─────────────────────────
  {
    id: "amyg-location",
    text: "There is an amygdala in each hemisphere. Each is a small, almond-shaped cluster of nuclei deep in the temporal lobe, right next to the front of the hippocampus.",
    evidence: "anatomy",
    citationIds: ["qbi-limbic"],
  },
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
    id: "amyg-fear-learning",
    text: "Fear-conditioning research, mostly in animals, identified the amygdala as an important part of a system for learning, storing, and expressing learned fear responses.",
    evidence: "causal",
    citationIds: ["ledoux-2000"],
    caveat: "Learned defensive responses in animals are not the same as the human feeling of fear.",
  },
  {
    id: "amyg-reward",
    text: "The amygdala is involved with rewarding as well as threatening situations. Circuit studies, mainly in rodents, suggest distinct amygdala circuits contribute to these different behaviours.",
    evidence: "causal",
    citationIds: ["janak-tye-2015"],
  },
  {
    id: "amyg-sm",
    text: "A person known as SM, with damage to the amygdala on both sides, showed no overt fear when exposed to snakes, spiders, or a haunted house, yet still showed and felt other emotions.",
    evidence: "causal",
    citationIds: ["feinstein-2011"],
    caveat: "SM is a single person with a rare condition. Her case is informative, but one case cannot show how every brain works.",
  },
  {
    id: "amyg-memory-modulation",
    text: "Animal and human studies suggest the amygdala helps emotionally arousing experiences — pleasant or unpleasant — become more strongly consolidated into long-term memory.",
    evidence: "causal",
    citationIds: ["mcgaugh-2004", "phelps-2004"],
    caveat: "Most of the causal evidence comes from animal studies; human evidence is mainly correlational.",
  },
  {
    id: "amyg-mtl-encoding",
    text: "In an fMRI study, people later remembered emotional pictures better than neutral ones, and activity in the amygdala and medial temporal lobe memory structures during viewing was greater and more closely linked for the emotional pictures.",
    evidence: "association",
    citationIds: ["dolcos-2004"],
  },
  {
    id: "amyg-attention",
    text: "The amygdala appears to contribute to emotional attention — the way emotionally significant things, especially possible threats, can gain priority in perception.",
    evidence: "interpretation",
    citationIds: ["vuilleumier-2005", "anderson-phelps-2001"],
  },
  {
    id: "amyg-lesion-perception",
    text: "Healthy people are usually better at noticing negative words when attention is stretched thin. A patient with damage to both amygdalae did not show this advantage.",
    evidence: "causal",
    citationIds: ["anderson-phelps-2001"],
  },
  {
    id: "amyg-fear-debate",
    text: "Scientists still disagree about how “fear” should be defined and studied. Rodent studies point to specific circuits, while human imaging often suggests more distributed patterns.",
    evidence: "interpretation",
    citationIds: ["adolphs-2013"],
  },

  // ───────────────────────── Emotion, attention, cross-cutting ─────────────────────────
  {
    id: "emotion-network",
    text: "One influential proposal holds that emotion emerges from large-scale interactions among cortical and subcortical systems — including amygdala, hippocampus, thalamus, and brainstem — which is why emotion is intertwined with perception, thought, and action.",
    evidence: "interpretation",
    citationIds: ["pessoa-2017"],
  },
  {
    id: "emotion-memory-details",
    text: "Emotion does not improve memory for everything equally. Emotional arousal tends to sharpen memory for some central details of an event more than others.",
    evidence: "association",
    citationIds: ["kensinger-2009"],
  },
  {
    id: "emotion-reappraisal",
    text: "A meta-analysis of 48 imaging studies found that reappraisal — deliberately reinterpreting a situation — consistently engaged cognitive-control regions and lateral temporal cortex, and changed activity in the amygdala on both sides.",
    evidence: "association",
    citationIds: ["buhle-2014"],
    caveat: "Notably, the same analysis did not find consistent involvement of ventromedial prefrontal cortex, which some models had predicted.",
  },
  {
    id: "emotion-regulation-network",
    text: "Controlling emotions, by redirecting attention or changing how a situation is interpreted, involves interactions between prefrontal and cingulate control systems and the systems that generate emotional responses.",
    evidence: "association",
    citationIds: ["ochsner-gross-2005", "etkin-2015"],
  },
  {
    id: "attention-competition",
    text: "Because the visual system has limited capacity, the many objects in a scene compete for representation. Attention biases this competition.",
    evidence: "interpretation",
    citationIds: ["kastner-ungerleider-2000"],
  },
  {
    id: "attention-networks",
    text: "Attention is not a single process. A long-standing framework describes several interacting brain networks that support it, including orienting and executive control.",
    evidence: "interpretation",
    citationIds: ["petersen-posner-2012"],
  },
  {
    id: "attention-salience",
    text: "Unexpected but important events — such as hearing your name — tend to engage a ventral attention network that can redirect focus, acting like a “circuit breaker” for ongoing goal-directed attention.",
    evidence: "interpretation",
    citationIds: ["corbetta-shulman-2002"],
  },
  {
    id: "attention-insula-salience",
    text: "The anterior insula and anterior cingulate cortex (not separately highlighted in this model) are proposed to form a “salience network” that helps mark important events and switch between other networks.",
    evidence: "interpretation",
    citationIds: ["menon-uddin-2010", "seeley-2007"],
  },

  // ───────────────────────── Myths and limits ─────────────────────────
  {
    id: "myth-left-right",
    text: "People are not “left-brained” or “right-brained”. In resting-state scans of over 1,000 people, lateralisation appeared to be a property of particular connections, not an overall trait of a person's whole brain.",
    evidence: "association",
    citationIds: ["nielsen-2013", "brainfacts-hemispheres"],
  },
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
    text: "The 3D model in Mind Atlas is built from an average of many adult MRI scans (the MNI ICBM152 2009c template) and labelled with the CerebrA atlas.",
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
    id: "psy-episodic",
    text: "Episodic memory is the ability to remember your own past experiences — re-living what happened, and when. Endel Tulving, who proposed the idea, argued that it is a memory system different from the others.",
    evidence: "interpretation",
    citationIds: ["tulving-2002"],
    caveat: "Tulving's concept changed a great deal over 30 years, and some researchers have criticised it.",
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
];
