// Citations used by Mind Atlas.
// Research-paper metadata (title, authors, year, journal, DOI, PubMed Central link) was generated from
// Crossref and PubMed records retrieved on 2026-11-04 (neuroscience sources) and 2026-11-05 (psychology sources). `verification` records only checks that were performed.
import type { Citation } from "./types";

export const citations: Citation[] = [
  {
    "id": "ninds-brain-basics",
    "title": "Brain Basics: Know Your Brain",
    "authors": "National Institute of Neurological Disorders and Stroke (NIH)",
    "publisher": "NINDS",
    "url": "https://www.ninds.nih.gov/health-information/public-education/brain-basics/brain-basics-know-your-brain",
    "sourceType": "educational",
    "note": "Plain-language NIH overview of the lobes and major structures; used for basic location statements.",
    "verification": {
      "checkedOn": "2026-11-04",
      "checkedAgainst": "page-text",
      "method": "Page fetched and the relevant passage read; claim wording checked against the page text."
    }
  },
  {
    "id": "qbi-lobes",
    "title": "Lobes of the brain",
    "authors": "Queensland Brain Institute, University of Queensland",
    "publisher": "Queensland Brain Institute",
    "url": "https://qbi.uq.edu.au/brain/brain-anatomy/lobes-brain",
    "sourceType": "educational",
    "note": "Introductory guide to the cortical lobes; used for occipital and medial temporal location statements.",
    "verification": {
      "checkedOn": "2026-11-04",
      "checkedAgainst": "page-text",
      "method": "Page fetched and the relevant passage read; claim wording checked against the page text."
    }
  },
  {
    "id": "qbi-limbic",
    "title": "The limbic system",
    "authors": "Queensland Brain Institute, University of Queensland",
    "publisher": "Queensland Brain Institute",
    "url": "https://qbi.uq.edu.au/brain/brain-anatomy/limbic-system",
    "sourceType": "educational",
    "note": "Introductory description of the hippocampus and amygdala, including their shapes and paired arrangement.",
    "verification": {
      "checkedOn": "2026-11-04",
      "checkedAgainst": "page-text",
      "method": "Page fetched and the relevant passage read; claim wording checked against the page text."
    }
  },
  {
    "id": "qbi-memory-stored",
    "title": "Where are memories stored in the brain?",
    "authors": "Queensland Brain Institute, University of Queensland",
    "publisher": "Queensland Brain Institute",
    "url": "https://qbi.uq.edu.au/memory/where-are-memories-stored",
    "sourceType": "educational",
    "note": "Introductory overview of brain areas involved in different kinds of memory.",
    "verification": {
      "checkedOn": "2026-11-04",
      "checkedAgainst": "page-text",
      "method": "Page fetched and the relevant passage read; claim wording checked against the page text."
    }
  },
  {
    "id": "brainfacts-memory-facets",
    "title": "Different Facets of Memory",
    "authors": "BrainFacts.org (Society for Neuroscience)",
    "year": 2012,
    "publisher": "BrainFacts.org",
    "url": "https://www.brainfacts.org/thinking-sensing-and-behaving/learning-and-memory/2012/different-facets-of-memory",
    "sourceType": "educational",
    "note": "Introductory article on how the hippocampus, cortex, prefrontal cortex, and amygdala contribute to different aspects of memory.",
    "verification": {
      "checkedOn": "2026-11-04",
      "checkedAgainst": "page-text",
      "method": "Page fetched and the relevant passage read; claim wording checked against the page text."
    }
  },
  {
    "id": "brainfacts-hemispheres",
    "title": "The Brain Divide: A Hemispheric Hoax?",
    "authors": "BrainFacts.org (Society for Neuroscience)",
    "year": 2024,
    "publisher": "BrainFacts.org",
    "url": "https://www.brainfacts.org/brain-anatomy-and-function/anatomy/2024/the-brain-divide-a-hemispheric-hoax-111224",
    "sourceType": "educational",
    "note": "Introductory article explaining why people are not 'left-brained' or 'right-brained'.",
    "verification": {
      "checkedOn": "2026-11-04",
      "checkedAgainst": "page-text",
      "method": "Page fetched and the relevant passage read; claim wording checked against the page text."
    }
  },
  {
    "id": "squire-wixted-2011",
    "title": "The Cognitive Neuroscience of Human Memory Since H.M.",
    "authors": "Squire LR, Wixted JT",
    "year": 2011,
    "publisher": "Annual Review of Neuroscience",
    "url": "https://doi.org/10.1146/annurev-neuro-061010-113720",
    "doi": "10.1146/annurev-neuro-061010-113720",
    "fullTextUrl": "https://pmc.ncbi.nlm.nih.gov/articles/PMC3192650/",
    "sourceType": "review",
    "note": "Review of what patient H.M. and later work revealed about medial temporal lobe structures and memory.",
    "verification": {
      "checkedOn": "2026-11-04",
      "checkedAgainst": "abstract",
      "method": "Metadata confirmed via Crossref and PubMed; claim wording checked against the published abstract."
    }
  },
  {
    "id": "squire-2015-consolidation",
    "title": "Memory Consolidation",
    "authors": "Squire LR, Genzel L, Wixted JT, et al.",
    "year": 2015,
    "publisher": "Cold Spring Harbor Perspectives in Biology",
    "url": "https://doi.org/10.1101/cshperspect.a021766",
    "doi": "10.1101/cshperspect.a021766",
    "fullTextUrl": "https://pmc.ncbi.nlm.nih.gov/articles/PMC4526749/",
    "sourceType": "review",
    "note": "Explains systems consolidation: how memories initially depend on the hippocampus and neocortex, and where researchers still disagree.",
    "animalResearch": "partly",
    "verification": {
      "checkedOn": "2026-11-04",
      "checkedAgainst": "abstract",
      "method": "Metadata confirmed via Crossref and PubMed; claim wording checked against the published abstract."
    }
  },
  {
    "id": "scoville-milner-1957",
    "title": "Loss of recent memory after bilateral hippocampal lesions",
    "authors": "Scoville WB, Milner B",
    "year": 1957,
    "publisher": "Journal of Neurology, Neurosurgery & Psychiatry",
    "url": "https://doi.org/10.1136/jnnp.20.1.11",
    "doi": "10.1136/jnnp.20.1.11",
    "fullTextUrl": "https://pmc.ncbi.nlm.nih.gov/articles/PMC497229/",
    "sourceType": "case-study",
    "note": "The original clinical report describing memory loss after bilateral medial temporal lobe surgery (patient H.M.).",
    "verification": {
      "checkedOn": "2026-11-04",
      "checkedAgainst": "metadata-only",
      "method": "Metadata confirmed via Crossref and PubMed; no abstract available, so claim wording relies on the title and the citing reviews also listed."
    }
  },
  {
    "id": "eichenbaum-2017",
    "title": "Prefrontal–hippocampal interactions in episodic memory",
    "authors": "Eichenbaum H",
    "year": 2017,
    "publisher": "Nature Reviews Neuroscience",
    "url": "https://doi.org/10.1038/nrn.2017.74",
    "doi": "10.1038/nrn.2017.74",
    "sourceType": "review",
    "note": "Review of how prefrontal cortex and hippocampus play complementary, interacting roles in episodic memory.",
    "animalResearch": "partly",
    "verification": {
      "checkedOn": "2026-11-04",
      "checkedAgainst": "abstract",
      "method": "Metadata confirmed via Crossref and PubMed; claim wording checked against the published abstract."
    }
  },
  {
    "id": "rugg-vilberg-2013",
    "title": "Brain networks underlying episodic memory retrieval",
    "authors": "Rugg MD, Vilberg KL",
    "year": 2013,
    "publisher": "Current Opinion in Neurobiology",
    "url": "https://doi.org/10.1016/j.conb.2012.11.005",
    "doi": "10.1016/j.conb.2012.11.005",
    "fullTextUrl": "https://pmc.ncbi.nlm.nih.gov/articles/PMC3594562/",
    "sourceType": "review",
    "note": "Review of human imaging showing a network of cortical regions that works with the medial temporal lobe during memory retrieval.",
    "verification": {
      "checkedOn": "2026-11-04",
      "checkedAgainst": "abstract",
      "method": "Metadata confirmed via Crossref and PubMed; claim wording checked against the published abstract."
    }
  },
  {
    "id": "moser-2008",
    "title": "Place Cells, Grid Cells, and the Brain's Spatial Representation System",
    "authors": "Moser EI, Kropff E, Moser M-B",
    "year": 2008,
    "publisher": "Annual Review of Neuroscience",
    "url": "https://doi.org/10.1146/annurev.neuro.31.061307.090723",
    "doi": "10.1146/annurev.neuro.31.061307.090723",
    "sourceType": "review",
    "note": "Review of place cells and grid cells; most of this evidence comes from recordings in rodents.",
    "animalResearch": "primarily",
    "verification": {
      "checkedOn": "2026-11-04",
      "checkedAgainst": "abstract",
      "method": "Metadata confirmed via Crossref and PubMed; claim wording checked against the published abstract."
    }
  },
  {
    "id": "maguire-2000",
    "title": "Navigation-related structural change in the hippocampi of taxi drivers",
    "authors": "Maguire EA, Gadian DG, Johnsrude IS, et al.",
    "year": 2000,
    "publisher": "Proceedings of the National Academy of Sciences",
    "url": "https://doi.org/10.1073/pnas.070039597",
    "doi": "10.1073/pnas.070039597",
    "fullTextUrl": "https://pmc.ncbi.nlm.nih.gov/articles/PMC18253/",
    "sourceType": "primary-research",
    "note": "Structural MRI study comparing hippocampal volume in London taxi drivers with control participants.",
    "verification": {
      "checkedOn": "2026-11-04",
      "checkedAgainst": "abstract",
      "method": "Metadata confirmed via Crossref and PubMed; claim wording checked against the published abstract."
    }
  },
  {
    "id": "frankland-bontempi-2005",
    "title": "The organization of recent and remote memories",
    "authors": "Frankland PW, Bontempi B",
    "year": 2005,
    "publisher": "Nature Reviews Neuroscience",
    "url": "https://doi.org/10.1038/nrn1607",
    "doi": "10.1038/nrn1607",
    "sourceType": "review",
    "note": "Review of how recent and remote memories may be organised differently between hippocampus and cortex.",
    "animalResearch": "partly",
    "verification": {
      "checkedOn": "2026-11-04",
      "checkedAgainst": "abstract",
      "method": "Metadata confirmed via Crossref and PubMed; claim wording checked against the published abstract."
    }
  },
  {
    "id": "corbetta-shulman-2002",
    "title": "Control of goal-directed and stimulus-driven attention in the brain",
    "authors": "Corbetta M, Shulman GL",
    "year": 2002,
    "publisher": "Nature Reviews Neuroscience",
    "url": "https://doi.org/10.1038/nrn755",
    "doi": "10.1038/nrn755",
    "sourceType": "review",
    "note": "Influential review describing partly separate frontoparietal networks for goal-directed and stimulus-driven attention.",
    "verification": {
      "checkedOn": "2026-11-04",
      "checkedAgainst": "abstract",
      "method": "Metadata confirmed via Crossref and PubMed; claim wording checked against the published abstract."
    }
  },
  {
    "id": "petersen-posner-2012",
    "title": "The Attention System of the Human Brain: 20 Years After",
    "authors": "Petersen SE, Posner MI",
    "year": 2012,
    "publisher": "Annual Review of Neuroscience",
    "url": "https://doi.org/10.1146/annurev-neuro-062111-150525",
    "doi": "10.1146/annurev-neuro-062111-150525",
    "fullTextUrl": "https://pmc.ncbi.nlm.nih.gov/articles/PMC3413263/",
    "sourceType": "review",
    "note": "Updated framework describing attention as several interacting brain networks.",
    "verification": {
      "checkedOn": "2026-11-04",
      "checkedAgainst": "abstract",
      "method": "Metadata confirmed via Crossref and PubMed; claim wording checked against the published abstract."
    }
  },
  {
    "id": "miller-cohen-2001",
    "title": "An Integrative Theory of Prefrontal Cortex Function",
    "authors": "Miller EK, Cohen JD",
    "year": 2001,
    "publisher": "Annual Review of Neuroscience",
    "url": "https://doi.org/10.1146/annurev.neuro.24.1.167",
    "doi": "10.1146/annurev.neuro.24.1.167",
    "sourceType": "review",
    "note": "Theory proposing that prefrontal cortex supports cognitive control by maintaining goals that bias processing elsewhere.",
    "animalResearch": "partly",
    "verification": {
      "checkedOn": "2026-11-04",
      "checkedAgainst": "abstract",
      "method": "Metadata confirmed via Crossref and PubMed; claim wording checked against the published abstract."
    }
  },
  {
    "id": "kastner-ungerleider-2000",
    "title": "Mechanisms of Visual Attention in the Human Cortex",
    "authors": "Kastner S, Ungerleider LG",
    "year": 2000,
    "publisher": "Annual Review of Neuroscience",
    "url": "https://doi.org/10.1146/annurev.neuro.23.1.315",
    "doi": "10.1146/annurev.neuro.23.1.315",
    "sourceType": "review",
    "note": "Review of imaging evidence that attention changes activity in visual cortex, with control signals from frontal and parietal areas.",
    "verification": {
      "checkedOn": "2026-11-04",
      "checkedAgainst": "abstract",
      "method": "Metadata confirmed via Crossref and PubMed; claim wording checked against the published abstract."
    }
  },
  {
    "id": "corbetta-shulman-2011",
    "title": "Spatial Neglect and Attention Networks",
    "authors": "Corbetta M, Shulman GL",
    "year": 2011,
    "publisher": "Annual Review of Neuroscience",
    "url": "https://doi.org/10.1146/annurev-neuro-061010-113731",
    "doi": "10.1146/annurev-neuro-061010-113731",
    "fullTextUrl": "https://pmc.ncbi.nlm.nih.gov/articles/PMC3790661/",
    "sourceType": "review",
    "note": "Review arguing that spatial neglect reflects disrupted attention networks rather than damage to a single region.",
    "verification": {
      "checkedOn": "2026-11-04",
      "checkedAgainst": "abstract",
      "method": "Metadata confirmed via Crossref and PubMed; claim wording checked against the published abstract."
    }
  },
  {
    "id": "husain-nachev-2007",
    "title": "Space and the parietal cortex",
    "authors": "Husain M, Nachev P",
    "year": 2007,
    "publisher": "Trends in Cognitive Sciences",
    "url": "https://doi.org/10.1016/j.tics.2006.10.011",
    "doi": "10.1016/j.tics.2006.10.011",
    "fullTextUrl": "https://pmc.ncbi.nlm.nih.gov/articles/PMC2323620/",
    "sourceType": "review",
    "note": "Review showing that parietal cortex contributes to non-spatial attention as well as spatial processing and action.",
    "verification": {
      "checkedOn": "2026-11-04",
      "checkedAgainst": "abstract",
      "method": "Metadata confirmed via Crossref and PubMed; claim wording checked against the published abstract."
    }
  },
  {
    "id": "phelps-ledoux-2005",
    "title": "Contributions of the Amygdala to Emotion Processing: From Animal Models to Human Behavior",
    "authors": "Phelps EA, LeDoux JE",
    "year": 2005,
    "publisher": "Neuron",
    "url": "https://doi.org/10.1016/j.neuron.2005.09.025",
    "doi": "10.1016/j.neuron.2005.09.025",
    "sourceType": "review",
    "note": "Review comparing amygdala research in animals and humans across learning, memory, attention, social behaviour, and regulation.",
    "animalResearch": "partly",
    "verification": {
      "checkedOn": "2026-11-04",
      "checkedAgainst": "abstract",
      "method": "Metadata confirmed via Crossref and PubMed; claim wording checked against the published abstract."
    }
  },
  {
    "id": "ledoux-2000",
    "title": "Emotion Circuits in the Brain",
    "authors": "LeDoux JE",
    "year": 2000,
    "publisher": "Annual Review of Neuroscience",
    "url": "https://doi.org/10.1146/annurev.neuro.23.1.155",
    "doi": "10.1146/annurev.neuro.23.1.155",
    "sourceType": "review",
    "note": "Review of fear-conditioning research, largely in animals, that identified the amygdala as part of a fear-learning system.",
    "animalResearch": "primarily",
    "verification": {
      "checkedOn": "2026-11-04",
      "checkedAgainst": "abstract",
      "method": "Metadata confirmed via Crossref and PubMed; claim wording checked against the published abstract."
    }
  },
  {
    "id": "feinstein-2011",
    "title": "The Human Amygdala and the Induction and Experience of Fear",
    "authors": "Feinstein JS, Adolphs R, Damasio A, et al.",
    "year": 2011,
    "publisher": "Current Biology",
    "url": "https://doi.org/10.1016/j.cub.2010.11.042",
    "doi": "10.1016/j.cub.2010.11.042",
    "fullTextUrl": "https://pmc.ncbi.nlm.nih.gov/articles/PMC3030206/",
    "sourceType": "case-study",
    "note": "Detailed study of one person (SM) with damage to the amygdala on both sides.",
    "verification": {
      "checkedOn": "2026-11-04",
      "checkedAgainst": "abstract",
      "method": "Metadata confirmed via Crossref and PubMed; claim wording checked against the published abstract."
    }
  },
  {
    "id": "lindquist-2012",
    "title": "The brain basis of emotion: A meta-analytic review",
    "authors": "Lindquist KA, Wager TD, Kober H, et al.",
    "year": 2012,
    "publisher": "Behavioral and Brain Sciences",
    "url": "https://doi.org/10.1017/S0140525X11000446",
    "doi": "10.1017/S0140525X11000446",
    "fullTextUrl": "https://pmc.ncbi.nlm.nih.gov/articles/PMC4329228/",
    "sourceType": "meta-analysis",
    "note": "Meta-analysis of human neuroimaging finding little support for one-to-one mapping between emotion categories and single regions.",
    "verification": {
      "checkedOn": "2026-11-04",
      "checkedAgainst": "abstract",
      "method": "Metadata confirmed via Crossref and PubMed; claim wording checked against the published abstract."
    }
  },
  {
    "id": "pessoa-2017",
    "title": "A Network Model of the Emotional Brain",
    "authors": "Pessoa L",
    "year": 2017,
    "publisher": "Trends in Cognitive Sciences",
    "url": "https://doi.org/10.1016/j.tics.2017.03.002",
    "doi": "10.1016/j.tics.2017.03.002",
    "fullTextUrl": "https://pmc.ncbi.nlm.nih.gov/articles/PMC5534266/",
    "sourceType": "review",
    "note": "Proposes that emotion arises from large-scale interactions among cortical and subcortical systems.",
    "verification": {
      "checkedOn": "2026-11-04",
      "checkedAgainst": "abstract",
      "method": "Metadata confirmed via Crossref and PubMed; claim wording checked against the published abstract."
    }
  },
  {
    "id": "mcgaugh-2004",
    "title": "The amygdala modulates the consolidation of memories of emotionally arousing experiences",
    "authors": "McGaugh JL",
    "year": 2004,
    "publisher": "Annual Review of Neuroscience",
    "url": "https://doi.org/10.1146/annurev.neuro.27.070203.144157",
    "doi": "10.1146/annurev.neuro.27.070203.144157",
    "sourceType": "review",
    "note": "Review of animal and human evidence that the amygdala modulates how strongly emotionally arousing experiences are consolidated.",
    "animalResearch": "primarily",
    "verification": {
      "checkedOn": "2026-11-04",
      "checkedAgainst": "abstract",
      "method": "Metadata confirmed via Crossref and PubMed; claim wording checked against the published abstract."
    }
  },
  {
    "id": "ochsner-gross-2005",
    "title": "The cognitive control of emotion",
    "authors": "Ochsner KN, Gross JJ",
    "year": 2005,
    "publisher": "Trends in Cognitive Sciences",
    "url": "https://doi.org/10.1016/j.tics.2005.03.010",
    "doi": "10.1016/j.tics.2005.03.010",
    "sourceType": "review",
    "note": "Review of imaging studies on controlling emotion through attention and reappraisal.",
    "verification": {
      "checkedOn": "2026-11-04",
      "checkedAgainst": "abstract",
      "method": "Metadata confirmed via Crossref and PubMed; claim wording checked against the published abstract."
    }
  },
  {
    "id": "buhle-2014",
    "title": "Cognitive Reappraisal of Emotion: A Meta-Analysis of Human Neuroimaging Studies",
    "authors": "Buhle JT, Silvers JA, Wager TD, et al.",
    "year": 2014,
    "publisher": "Cerebral Cortex",
    "url": "https://doi.org/10.1093/cercor/bht154",
    "doi": "10.1093/cercor/bht154",
    "fullTextUrl": "https://pmc.ncbi.nlm.nih.gov/articles/PMC4193464/",
    "sourceType": "meta-analysis",
    "note": "Meta-analysis of 48 imaging studies of cognitive reappraisal.",
    "verification": {
      "checkedOn": "2026-11-04",
      "checkedAgainst": "abstract",
      "method": "Metadata confirmed via Crossref and PubMed; claim wording checked against the published abstract."
    }
  },
  {
    "id": "vuilleumier-2005",
    "title": "How brains beware: neural mechanisms of emotional attention",
    "authors": "Vuilleumier P",
    "year": 2005,
    "publisher": "Trends in Cognitive Sciences",
    "url": "https://doi.org/10.1016/j.tics.2005.10.011",
    "doi": "10.1016/j.tics.2005.10.011",
    "sourceType": "review",
    "note": "Review of how emotional significance, with amygdala involvement, can modulate perception and attention.",
    "verification": {
      "checkedOn": "2026-11-04",
      "checkedAgainst": "abstract",
      "method": "Metadata confirmed via Crossref and PubMed; claim wording checked against the published abstract."
    }
  },
  {
    "id": "janak-tye-2015",
    "title": "From circuits to behaviour in the amygdala",
    "authors": "Janak PH, Tye KM",
    "year": 2015,
    "publisher": "Nature",
    "url": "https://doi.org/10.1038/nature14188",
    "doi": "10.1038/nature14188",
    "fullTextUrl": "https://pmc.ncbi.nlm.nih.gov/articles/PMC4565157/",
    "sourceType": "review",
    "note": "Review of circuit studies, mainly in rodents, showing amygdala involvement in both threat- and reward-related behaviour.",
    "animalResearch": "primarily",
    "verification": {
      "checkedOn": "2026-11-04",
      "checkedAgainst": "abstract",
      "method": "Metadata confirmed via Crossref and PubMed; claim wording checked against the published abstract."
    }
  },
  {
    "id": "grill-spector-malach-2004",
    "title": "The human visual cortex",
    "authors": "Grill-Spector K, Malach R",
    "year": 2004,
    "publisher": "Annual Review of Neuroscience",
    "url": "https://doi.org/10.1146/annurev.neuro.27.070203.144220",
    "doi": "10.1146/annurev.neuro.27.070203.144220",
    "sourceType": "review",
    "note": "Review of human imaging research on the organisation of visual cortex.",
    "verification": {
      "checkedOn": "2026-11-04",
      "checkedAgainst": "abstract",
      "method": "Metadata confirmed via Crossref and PubMed; claim wording checked against the published abstract."
    }
  },
  {
    "id": "goodale-milner-1992",
    "title": "Separate visual pathways for perception and action",
    "authors": "Goodale MA, Milner AD",
    "year": 1992,
    "publisher": "Trends in Neurosciences",
    "url": "https://doi.org/10.1016/0166-2236(92)90344-8",
    "doi": "10.1016/0166-2236(92)90344-8",
    "sourceType": "review",
    "note": "Proposes separate visual streams for recognising objects and for guiding actions toward them.",
    "animalResearch": "partly",
    "verification": {
      "checkedOn": "2026-11-04",
      "checkedAgainst": "abstract",
      "method": "Metadata confirmed via Crossref and PubMed; claim wording checked against the published abstract."
    }
  },
  {
    "id": "kanwisher-1997",
    "title": "The Fusiform Face Area: A Module in Human Extrastriate Cortex Specialized for Face Perception",
    "authors": "Kanwisher N, McDermott J, Chun MM",
    "year": 1997,
    "publisher": "The Journal of Neuroscience",
    "url": "https://doi.org/10.1523/JNEUROSCI.17-11-04302.1997",
    "doi": "10.1523/JNEUROSCI.17-11-04302.1997",
    "fullTextUrl": "https://pmc.ncbi.nlm.nih.gov/articles/PMC6573547/",
    "sourceType": "primary-research",
    "note": "fMRI study identifying a region of the fusiform gyrus that responds more to faces than to other objects in most participants.",
    "verification": {
      "checkedOn": "2026-11-04",
      "checkedAgainst": "abstract",
      "method": "Metadata confirmed via Crossref and PubMed; claim wording checked against the published abstract."
    }
  },
  {
    "id": "hickok-poeppel-2007",
    "title": "The cortical organization of speech processing",
    "authors": "Hickok G, Poeppel D",
    "year": 2007,
    "publisher": "Nature Reviews Neuroscience",
    "url": "https://doi.org/10.1038/nrn2113",
    "doi": "10.1038/nrn2113",
    "sourceType": "review",
    "note": "Dual-stream model of how speech is processed across temporal and frontal cortex.",
    "verification": {
      "checkedOn": "2026-11-04",
      "checkedAgainst": "abstract",
      "method": "Metadata confirmed via Crossref and PubMed; claim wording checked against the published abstract."
    }
  },
  {
    "id": "binder-desai-2011",
    "title": "The neurobiology of semantic memory",
    "authors": "Binder JR, Desai RH",
    "year": 2011,
    "publisher": "Trends in Cognitive Sciences",
    "url": "https://doi.org/10.1016/j.tics.2011.10.001",
    "doi": "10.1016/j.tics.2011.10.001",
    "fullTextUrl": "https://pmc.ncbi.nlm.nih.gov/articles/PMC3350748/",
    "sourceType": "review",
    "note": "Review of imaging evidence on how temporal and inferior parietal regions support knowledge about the world (semantic memory).",
    "verification": {
      "checkedOn": "2026-11-04",
      "checkedAgainst": "abstract",
      "method": "Metadata confirmed via Crossref and PubMed; claim wording checked against the published abstract."
    }
  },
  {
    "id": "wandell-2007",
    "title": "Visual Field Maps in Human Cortex",
    "authors": "Wandell BA, Dumoulin SO, Brewer AA",
    "year": 2007,
    "publisher": "Neuron",
    "url": "https://doi.org/10.1016/j.neuron.2007.10.012",
    "doi": "10.1016/j.neuron.2007.10.012",
    "sourceType": "review",
    "note": "Review of visual field maps measured in human occipital and parietal cortex.",
    "verification": {
      "checkedOn": "2026-11-04",
      "checkedAgainst": "abstract",
      "method": "Metadata confirmed via Crossref and PubMed; claim wording checked against the published abstract."
    }
  },
  {
    "id": "nielsen-2013",
    "title": "An Evaluation of the Left-Brain vs. Right-Brain Hypothesis with Resting State Functional Connectivity Magnetic Resonance Imaging",
    "authors": "Nielsen JA, Zielinski BA, Ferguson MA, et al.",
    "year": 2013,
    "publisher": "PLoS ONE",
    "url": "https://doi.org/10.1371/journal.pone.0071275",
    "doi": "10.1371/journal.pone.0071275",
    "fullTextUrl": "https://pmc.ncbi.nlm.nih.gov/articles/PMC3743825/",
    "sourceType": "primary-research",
    "note": "Resting-state imaging of 1,011 people testing the idea of 'left-brained' and 'right-brained' individuals.",
    "verification": {
      "checkedOn": "2026-11-04",
      "checkedAgainst": "abstract",
      "method": "Metadata confirmed via Crossref and PubMed; claim wording checked against the published abstract."
    }
  },
  {
    "id": "poldrack-2006",
    "title": "Can cognitive processes be inferred from neuroimaging data?",
    "authors": "Poldrack RA",
    "year": 2006,
    "publisher": "Trends in Cognitive Sciences",
    "url": "https://doi.org/10.1016/j.tics.2005.12.004",
    "doi": "10.1016/j.tics.2005.12.004",
    "sourceType": "review",
    "note": "Explains why inferring a mental process from activity in one region ('reverse inference') is weak evidence.",
    "verification": {
      "checkedOn": "2026-11-04",
      "checkedAgainst": "abstract",
      "method": "Metadata confirmed via Crossref and PubMed; claim wording checked against the published abstract."
    }
  },
  {
    "id": "mueller-2013",
    "title": "Individual Variability in Functional Connectivity Architecture of the Human Brain",
    "authors": "Mueller S, Wang D, Fox MD, et al.",
    "year": 2013,
    "publisher": "Neuron",
    "url": "https://doi.org/10.1016/j.neuron.2012.12.028",
    "doi": "10.1016/j.neuron.2012.12.028",
    "fullTextUrl": "https://pmc.ncbi.nlm.nih.gov/articles/PMC3746075/",
    "sourceType": "primary-research",
    "note": "Imaging study showing that brain connectivity differs between individuals, especially in association cortex.",
    "verification": {
      "checkedOn": "2026-11-04",
      "checkedAgainst": "abstract",
      "method": "Metadata confirmed via Crossref and PubMed; claim wording checked against the published abstract."
    }
  },
  {
    "id": "adolphs-2013",
    "title": "The Biology of Fear",
    "authors": "Adolphs R",
    "year": 2013,
    "publisher": "Current Biology",
    "url": "https://doi.org/10.1016/j.cub.2012.11.055",
    "doi": "10.1016/j.cub.2012.11.055",
    "fullTextUrl": "https://pmc.ncbi.nlm.nih.gov/articles/PMC3595162/",
    "sourceType": "review",
    "note": "Review describing open debates about how fear should be defined and studied across species.",
    "animalResearch": "partly",
    "verification": {
      "checkedOn": "2026-11-04",
      "checkedAgainst": "abstract",
      "method": "Metadata confirmed via Crossref and PubMed; claim wording checked against the published abstract."
    }
  },
  {
    "id": "dolcos-2004",
    "title": "Interaction between the Amygdala and the Medial Temporal Lobe Memory System Predicts Better Memory for Emotional Events",
    "authors": "Dolcos F, LaBar KS, Cabeza R",
    "year": 2004,
    "publisher": "Neuron",
    "url": "https://doi.org/10.1016/S0896-6273(04)00289-2",
    "doi": "10.1016/S0896-6273(04)00289-2",
    "sourceType": "primary-research",
    "note": "fMRI study linking amygdala and medial temporal lobe activity during encoding to better memory for emotional pictures.",
    "verification": {
      "checkedOn": "2026-11-04",
      "checkedAgainst": "abstract",
      "method": "Metadata confirmed via Crossref and PubMed; claim wording checked against the published abstract."
    }
  },
  {
    "id": "anderson-phelps-2001",
    "title": "Lesions of the human amygdala impair enhanced perception of emotionally salient events",
    "authors": "Anderson AK, Phelps EA",
    "year": 2001,
    "publisher": "Nature",
    "url": "https://doi.org/10.1038/35077083",
    "doi": "10.1038/35077083",
    "sourceType": "primary-research",
    "note": "Lesion study showing that amygdala damage removed the usual perceptual advantage for emotionally negative words.",
    "verification": {
      "checkedOn": "2026-11-04",
      "checkedAgainst": "abstract",
      "method": "Metadata confirmed via Crossref and PubMed; claim wording checked against the published abstract."
    }
  },
  {
    "id": "squire-stark-clark-2004",
    "title": "The medial temporal lobe",
    "authors": "Squire LR, Stark CE, Clark RE",
    "year": 2004,
    "publisher": "Annual Review of Neuroscience",
    "url": "https://doi.org/10.1146/annurev.neuro.27.070203.144130",
    "doi": "10.1146/annurev.neuro.27.070203.144130",
    "sourceType": "review",
    "note": "Review of the medial temporal lobe memory system using human, monkey, and rodent evidence.",
    "animalResearch": "partly",
    "verification": {
      "checkedOn": "2026-11-04",
      "checkedAgainst": "abstract",
      "method": "Metadata confirmed via Crossref and PubMed; claim wording checked against the published abstract."
    }
  },
  {
    "id": "badre-nee-2018",
    "title": "Frontal Cortex and the Hierarchical Control of Behavior",
    "authors": "Badre D, Nee DE",
    "year": 2018,
    "publisher": "Trends in Cognitive Sciences",
    "url": "https://doi.org/10.1016/j.tics.2017.11.005",
    "doi": "10.1016/j.tics.2017.11.005",
    "fullTextUrl": "https://pmc.ncbi.nlm.nih.gov/articles/PMC5841250/",
    "sourceType": "review",
    "note": "Review concluding that lateral frontal cortex works as interacting networks rather than one unit.",
    "verification": {
      "checkedOn": "2026-11-04",
      "checkedAgainst": "abstract",
      "method": "Metadata confirmed via Crossref and PubMed; claim wording checked against the published abstract."
    }
  },
  {
    "id": "bisley-goldberg-2010",
    "title": "Attention, Intention, and Priority in the Parietal Lobe",
    "authors": "Bisley JW, Goldberg ME",
    "year": 2010,
    "publisher": "Annual Review of Neuroscience",
    "url": "https://doi.org/10.1146/annurev-neuro-060909-152823",
    "doi": "10.1146/annurev-neuro-060909-152823",
    "fullTextUrl": "https://pmc.ncbi.nlm.nih.gov/articles/PMC3683564/",
    "sourceType": "review",
    "note": "Review of recordings in monkeys suggesting an intraparietal area acts like a 'priority map' for attention and eye movements.",
    "animalResearch": "primarily",
    "verification": {
      "checkedOn": "2026-11-04",
      "checkedAgainst": "abstract",
      "method": "Metadata confirmed via Crossref and PubMed; claim wording checked against the published abstract."
    }
  },
  {
    "id": "moscovitch-2016",
    "title": "Episodic Memory and Beyond: The Hippocampus and Neocortex in Transformation",
    "authors": "Moscovitch M, Cabeza R, Winocur G, et al.",
    "year": 2016,
    "publisher": "Annual Review of Psychology",
    "url": "https://doi.org/10.1146/annurev-psych-113011-143733",
    "doi": "10.1146/annurev-psych-113011-143733",
    "fullTextUrl": "https://pmc.ncbi.nlm.nih.gov/articles/PMC5060006/",
    "sourceType": "review",
    "note": "Review of how episodic memories may transform over time and how the hippocampus interacts with neocortex.",
    "verification": {
      "checkedOn": "2026-11-04",
      "checkedAgainst": "abstract",
      "method": "Metadata confirmed via Crossref and PubMed; claim wording checked against the published abstract."
    }
  },
  {
    "id": "haynes-rees-2006",
    "title": "Decoding mental states from brain activity in humans",
    "authors": "Haynes J-D, Rees G",
    "year": 2006,
    "publisher": "Nature Reviews Neuroscience",
    "url": "https://doi.org/10.1038/nrn1931",
    "doi": "10.1038/nrn1931",
    "sourceType": "review",
    "note": "Review of 'decoding' studies that predict aspects of perception from brain activity, and the ethical questions they raise.",
    "verification": {
      "checkedOn": "2026-11-04",
      "checkedAgainst": "abstract",
      "method": "Metadata confirmed via Crossref and PubMed; claim wording checked against the published abstract."
    }
  },
  {
    "id": "diekelmann-born-2010",
    "title": "The memory function of sleep",
    "authors": "Diekelmann S, Born J",
    "year": 2010,
    "publisher": "Nature Reviews Neuroscience",
    "url": "https://doi.org/10.1038/nrn2762",
    "doi": "10.1038/nrn2762",
    "sourceType": "review",
    "note": "Review of evidence that sleep supports memory consolidation.",
    "animalResearch": "partly",
    "verification": {
      "checkedOn": "2026-11-04",
      "checkedAgainst": "abstract",
      "method": "Metadata confirmed via Crossref and PubMed; claim wording checked against the published abstract."
    }
  },
  {
    "id": "kensinger-2009",
    "title": "Remembering the Details: Effects of Emotion",
    "authors": "Kensinger EA",
    "year": 2009,
    "publisher": "Emotion Review",
    "url": "https://doi.org/10.1177/1754073908100432",
    "doi": "10.1177/1754073908100432",
    "fullTextUrl": "https://pmc.ncbi.nlm.nih.gov/articles/PMC2676782/",
    "sourceType": "review",
    "note": "Review showing that emotion enhances memory for some details of an event more than others.",
    "verification": {
      "checkedOn": "2026-11-04",
      "checkedAgainst": "abstract",
      "method": "Metadata confirmed via Crossref and PubMed; claim wording checked against the published abstract."
    }
  },
  {
    "id": "phelps-2004",
    "title": "Human emotion and memory: interactions of the amygdala and hippocampal complex",
    "authors": "Phelps EA",
    "year": 2004,
    "publisher": "Current Opinion in Neurobiology",
    "url": "https://doi.org/10.1016/j.conb.2004.03.015",
    "doi": "10.1016/j.conb.2004.03.015",
    "sourceType": "review",
    "note": "Review of how the amygdala and hippocampus interact when emotion and memory meet.",
    "verification": {
      "checkedOn": "2026-11-04",
      "checkedAgainst": "abstract",
      "method": "Metadata confirmed via Crossref and PubMed; claim wording checked against the published abstract."
    }
  },
  {
    "id": "etkin-2015",
    "title": "The neural bases of emotion regulation",
    "authors": "Etkin A, Büchel C, Gross JJ",
    "year": 2015,
    "publisher": "Nature Reviews Neuroscience",
    "url": "https://doi.org/10.1038/nrn4044",
    "doi": "10.1038/nrn4044",
    "sourceType": "review",
    "note": "Review of brain regions implicated in emotion regulation and a framework linking them.",
    "verification": {
      "checkedOn": "2026-11-04",
      "checkedAgainst": "abstract",
      "method": "Metadata confirmed via Crossref and PubMed; claim wording checked against the published abstract."
    }
  },
  {
    "id": "menon-uddin-2010",
    "title": "Saliency, switching, attention and control: a network model of insula function",
    "authors": "Menon V, Uddin LQ",
    "year": 2010,
    "publisher": "Brain Structure and Function",
    "url": "https://doi.org/10.1007/s00429-010-0262-0",
    "doi": "10.1007/s00429-010-0262-0",
    "fullTextUrl": "https://pmc.ncbi.nlm.nih.gov/articles/PMC2899886/",
    "sourceType": "review",
    "note": "Network model in which the insula and anterior cingulate help mark salient events for further processing.",
    "verification": {
      "checkedOn": "2026-11-04",
      "checkedAgainst": "abstract",
      "method": "Metadata confirmed via Crossref and PubMed; claim wording checked against the published abstract."
    }
  },
  {
    "id": "manera-2020",
    "title": "CerebrA, registration and manual label correction of Mindboggle-101 atlas for MNI-ICBM152 template",
    "authors": "Manera AL, Dadar M, Fonov V, et al.",
    "year": 2020,
    "publisher": "Scientific Data",
    "url": "https://doi.org/10.1038/s41597-020-0557-9",
    "doi": "10.1038/s41597-020-0557-9",
    "fullTextUrl": "https://pmc.ncbi.nlm.nih.gov/articles/PMC7363886/",
    "sourceType": "dataset",
    "note": "Describes the CerebrA atlas used to build and label this project's 3D brain model.",
    "verification": {
      "checkedOn": "2026-11-04",
      "checkedAgainst": "abstract",
      "method": "Metadata confirmed via Crossref and PubMed; claim wording checked against the published abstract."
    }
  },
  {
    "id": "fonov-2011",
    "title": "Unbiased average age-appropriate atlases for pediatric studies",
    "authors": "Fonov V, Evans AC, Botteron K, et al.",
    "year": 2011,
    "publisher": "NeuroImage",
    "url": "https://doi.org/10.1016/j.neuroimage.2010.07.033",
    "doi": "10.1016/j.neuroimage.2010.07.033",
    "fullTextUrl": "https://pmc.ncbi.nlm.nih.gov/articles/PMC2962759/",
    "sourceType": "dataset",
    "note": "Describes construction of the MNI ICBM152 average brain templates; the 3D surface is derived from the 2009c template.",
    "verification": {
      "checkedOn": "2026-11-04",
      "checkedAgainst": "abstract",
      "method": "Metadata confirmed via Crossref and PubMed; claim wording checked against the published abstract."
    }
  },
  {
    "id": "duncan-2010",
    "title": "The multiple-demand (MD) system of the primate brain: mental programs for intelligent behaviour",
    "authors": "Duncan J",
    "year": 2010,
    "publisher": "Trends in Cognitive Sciences",
    "url": "https://doi.org/10.1016/j.tics.2010.01.004",
    "doi": "10.1016/j.tics.2010.01.004",
    "sourceType": "review",
    "note": "Review of a 'multiple-demand' pattern of frontal and parietal activity seen across many demanding tasks.",
    "animalResearch": "partly",
    "verification": {
      "checkedOn": "2026-11-04",
      "checkedAgainst": "abstract",
      "method": "Metadata confirmed via Crossref and PubMed; claim wording checked against the published abstract."
    }
  },
  {
    "id": "seeley-2007",
    "title": "Dissociable Intrinsic Connectivity Networks for Salience Processing and Executive Control",
    "authors": "Seeley WW, Menon V, Schatzberg AF, et al.",
    "year": 2007,
    "publisher": "The Journal of Neuroscience",
    "url": "https://doi.org/10.1523/JNEUROSCI.5587-06.2007",
    "doi": "10.1523/JNEUROSCI.5587-06.2007",
    "fullTextUrl": "https://pmc.ncbi.nlm.nih.gov/articles/PMC2680293/",
    "sourceType": "primary-research",
    "note": "Resting-state imaging study identifying a 'salience network' anchored in anterior cingulate and frontoinsular cortex.",
    "verification": {
      "checkedOn": "2026-11-04",
      "checkedAgainst": "abstract",
      "method": "Metadata confirmed via Crossref and PubMed; claim wording checked against the published abstract."
    }
  },
  // ── Psychology sources (verified 2026-11-05) ──
  {
    "id": "cowan-2010",
    "title": "The Magical Mystery Four",
    "authors": "Cowan N",
    "year": 2010,
    "publisher": "Current Directions in Psychological Science",
    "url": "https://doi.org/10.1177/0963721409359277",
    "doi": "10.1177/0963721409359277",
    "fullTextUrl": "https://pmc.ncbi.nlm.nih.gov/articles/PMC2864034/",
    "sourceType": "review",
    "note": "Accessible review of how much information people can hold in mind at once (working memory capacity).",
    "verification": {
      "checkedOn": "2026-11-05",
      "checkedAgainst": "abstract",
      "method": "Metadata confirmed via Crossref and PubMed; claim wording checked against the published abstract."
    }
  },
  {
    "id": "murre-dros-2015",
    "title": "Replication and Analysis of Ebbinghaus’ Forgetting Curve",
    "authors": "Murre JMJ, Dros J",
    "year": 2015,
    "publisher": "PLOS ONE",
    "url": "https://doi.org/10.1371/journal.pone.0120644",
    "doi": "10.1371/journal.pone.0120644",
    "fullTextUrl": "https://pmc.ncbi.nlm.nih.gov/articles/PMC4492928/",
    "sourceType": "primary-research",
    "note": "A modern replication of Ebbinghaus's classic 1880s forgetting curve, using his relearning ('savings') method.",
    "verification": {
      "checkedOn": "2026-11-05",
      "checkedAgainst": "abstract",
      "method": "Metadata confirmed via Crossref and PubMed; claim wording checked against the published abstract."
    }
  },
  {
    "id": "loftus-2005",
    "title": "Planting misinformation in the human mind: A 30-year investigation of the malleability of memory: \n      \n        Figure 1",
    "authors": "Loftus EF",
    "year": 2005,
    "publisher": "Learning & Memory",
    "url": "https://doi.org/10.1101/lm.94705",
    "doi": "10.1101/lm.94705",
    "sourceType": "review",
    "note": "Review of 30 years of research on the misinformation effect: how misleading information can change memories.",
    "verification": {
      "checkedOn": "2026-11-05",
      "checkedAgainst": "abstract",
      "method": "Metadata confirmed via Crossref and PubMed; claim wording checked against the published abstract."
    }
  },
  {
    "id": "roediger-karpicke-2006",
    "title": "Test-Enhanced Learning",
    "authors": "Roediger HL, Karpicke JD",
    "year": 2006,
    "publisher": "Psychological Science",
    "url": "https://doi.org/10.1111/j.1467-9280.2006.01693.x",
    "doi": "10.1111/j.1467-9280.2006.01693.x",
    "sourceType": "primary-research",
    "note": "Classroom-style experiments showing that practising recall improves long-term retention more than restudying.",
    "verification": {
      "checkedOn": "2026-11-05",
      "checkedAgainst": "abstract",
      "method": "Metadata confirmed via Crossref and PubMed; claim wording checked against the published abstract."
    }
  },
  {
    "id": "cepeda-2006",
    "title": "Distributed practice in verbal recall tasks: A review and quantitative synthesis",
    "authors": "Cepeda NJ, Pashler H, Vul E, et al.",
    "year": 2006,
    "publisher": "Psychological Bulletin",
    "url": "https://doi.org/10.1037/0033-2909.132.3.354",
    "doi": "10.1037/0033-2909.132.3.354",
    "sourceType": "meta-analysis",
    "note": "Meta-analysis of hundreds of experiments on spacing out study sessions (distributed practice).",
    "verification": {
      "checkedOn": "2026-11-05",
      "checkedAgainst": "abstract",
      "method": "Metadata confirmed via Crossref and PubMed; claim wording checked against the published abstract."
    }
  },
  {
    "id": "dunlosky-2013",
    "title": "Improving Students’ Learning With Effective Learning Techniques",
    "authors": "Dunlosky J, Rawson KA, Marsh EJ, et al.",
    "year": 2013,
    "publisher": "Psychological Science in the Public Interest",
    "url": "https://doi.org/10.1177/1529100612453266",
    "doi": "10.1177/1529100612453266",
    "sourceType": "review",
    "note": "Large review rating ten popular study techniques by how well the evidence supports them.",
    "verification": {
      "checkedOn": "2026-11-05",
      "checkedAgainst": "abstract",
      "method": "Metadata confirmed via Crossref and PubMed; claim wording checked against the published abstract."
    }
  },
  {
    "id": "tulving-2002",
    "title": "Episodic Memory: From Mind to Brain",
    "authors": "Tulving E",
    "year": 2002,
    "publisher": "Annual Review of Psychology",
    "url": "https://doi.org/10.1146/annurev.psych.53.100901.135114",
    "doi": "10.1146/annurev.psych.53.100901.135114",
    "sourceType": "review",
    "note": "Tulving's own account of episodic memory, the system for remembering personal experiences.",
    "verification": {
      "checkedOn": "2026-11-05",
      "checkedAgainst": "abstract",
      "method": "Metadata confirmed via Crossref and PubMed; claim wording checked against the published abstract."
    }
  },
  {
    "id": "schacter-1999",
    "title": "The seven sins of memory: Insights from psychology and cognitive neuroscience",
    "authors": "Schacter DL",
    "year": 1999,
    "publisher": "American Psychologist",
    "url": "https://doi.org/10.1037/0003-066X.54.3.182",
    "doi": "10.1037/0003-066X.54.3.182",
    "sourceType": "review",
    "note": "Classifies everyday memory failures into seven 'sins' and argues they are by-products of a useful memory system.",
    "verification": {
      "checkedOn": "2026-11-05",
      "checkedAgainst": "abstract",
      "method": "Metadata confirmed via Crossref and PubMed; claim wording checked against the published abstract."
    }
  },
  {
    "id": "godden-baddeley-1975",
    "title": "Context-dependent memory in two natural environments: on land and underwater",
    "authors": "Godden DR, Baddeley AD",
    "year": 1975,
    "publisher": "British Journal of Psychology",
    "url": "https://doi.org/10.1111/j.2044-8295.1975.tb01468.x",
    "doi": "10.1111/j.2044-8295.1975.tb01468.x",
    "sourceType": "primary-research",
    "note": "Classic experiment with divers showing that recall is better in the same environment where learning happened.",
    "verification": {
      "checkedOn": "2026-11-05",
      "checkedAgainst": "abstract",
      "method": "Metadata confirmed via Crossref; claim wording checked against the publisher abstract indexed by OpenAlex."
    }
  },
  {
    "id": "talarico-rubin-2003",
    "title": "Confidence, Not Consistency, Characterizes Flashbulb Memories",
    "authors": "Talarico JM, Rubin DC",
    "year": 2003,
    "publisher": "Psychological Science",
    "url": "https://doi.org/10.1111/1467-9280.02453",
    "doi": "10.1111/1467-9280.02453",
    "sourceType": "primary-research",
    "note": "Followed students' memories of hearing about the 11 September 2001 attacks to test whether 'flashbulb' memories are more accurate.",
    "verification": {
      "checkedOn": "2026-11-05",
      "checkedAgainst": "abstract",
      "method": "Metadata confirmed via Crossref and PubMed; claim wording checked against the published abstract."
    }
  },
  {
    "id": "simons-chabris-1999",
    "title": "Gorillas in Our Midst: Sustained Inattentional Blindness for Dynamic Events",
    "authors": "Simons DJ, Chabris CF",
    "year": 1999,
    "publisher": "Perception",
    "url": "https://doi.org/10.1068/p281059",
    "doi": "10.1068/p281059",
    "sourceType": "primary-research",
    "note": "The 'gorillas in our midst' study of inattentional blindness: missing unexpected events while attention is busy.",
    "verification": {
      "checkedOn": "2026-11-05",
      "checkedAgainst": "abstract",
      "method": "Metadata confirmed via Crossref and PubMed; claim wording checked against the published abstract."
    }
  },
  {
    "id": "simons-rensink-2005",
    "title": "Change blindness: past, present, and future",
    "authors": "Simons DJ, Rensink RA",
    "year": 2005,
    "publisher": "Trends in Cognitive Sciences",
    "url": "https://doi.org/10.1016/j.tics.2004.11.006",
    "doi": "10.1016/j.tics.2004.11.006",
    "sourceType": "review",
    "note": "Review of change blindness, including which conclusions it does and does not support.",
    "verification": {
      "checkedOn": "2026-11-05",
      "checkedAgainst": "abstract",
      "method": "Metadata confirmed via Crossref and PubMed; claim wording checked against the published abstract."
    }
  },
  {
    "id": "monsell-2003",
    "title": "Task switching",
    "authors": "Monsell S",
    "year": 2003,
    "publisher": "Trends in Cognitive Sciences",
    "url": "https://doi.org/10.1016/S1364-6613(03)00028-7",
    "doi": "10.1016/S1364-6613(03)00028-7",
    "sourceType": "review",
    "note": "Review of task-switching research: why switching between tasks costs time and accuracy.",
    "verification": {
      "checkedOn": "2026-11-05",
      "checkedAgainst": "abstract",
      "method": "Metadata confirmed via Crossref and PubMed; claim wording checked against the published abstract."
    }
  },
  {
    "id": "strayer-johnston-2001",
    "title": "Driven to Distraction: Dual-Task Studies of Simulated Driving and Conversing on a Cellular Telephone",
    "authors": "Strayer DL, Johnston WA",
    "year": 2001,
    "publisher": "Psychological Science",
    "url": "https://doi.org/10.1111/1467-9280.00386",
    "doi": "10.1111/1467-9280.00386",
    "sourceType": "primary-research",
    "note": "Driving-simulator experiments on how phone conversations affect noticing and reacting to traffic signals.",
    "verification": {
      "checkedOn": "2026-11-05",
      "checkedAgainst": "abstract",
      "method": "Metadata confirmed via Crossref and PubMed; claim wording checked against the published abstract."
    }
  },
  {
    "id": "killingsworth-gilbert-2010",
    "title": "A Wandering Mind Is an Unhappy Mind",
    "authors": "Killingsworth MA, Gilbert DT",
    "year": 2010,
    "publisher": "Science",
    "url": "https://doi.org/10.1126/science.1192439",
    "doi": "10.1126/science.1192439",
    "sourceType": "primary-research",
    "note": "Smartphone experience-sampling study of how often people's minds wander and how they feel when it happens.",
    "verification": {
      "checkedOn": "2026-11-05",
      "checkedAgainst": "abstract",
      "method": "Metadata confirmed via Crossref and PubMed; claim wording checked against the published abstract."
    }
  },
  {
    "id": "macleod-1991",
    "title": "Half a century of research on the Stroop effect: An integrative review",
    "authors": "MacLeod CM",
    "year": 1991,
    "publisher": "Psychological Bulletin",
    "url": "https://doi.org/10.1037/0033-2909.109.2.163",
    "doi": "10.1037/0033-2909.109.2.163",
    "sourceType": "review",
    "note": "Integrative review of about 400 studies of the Stroop effect, a classic measure of interference and attention.",
    "verification": {
      "checkedOn": "2026-11-05",
      "checkedAgainst": "abstract",
      "method": "Metadata confirmed via Crossref and PubMed; claim wording checked against the abstract indexed by OpenAlex."
    }
  },
  {
    "id": "posner-1980",
    "title": "Orienting of Attention",
    "authors": "Posner MI",
    "year": 1980,
    "publisher": "Quarterly Journal of Experimental Psychology",
    "url": "https://doi.org/10.1080/00335558008248231",
    "doi": "10.1080/00335558008248231",
    "sourceType": "primary-research",
    "note": "Classic paper on covert orienting: shifting attention to a location without moving the eyes.",
    "verification": {
      "checkedOn": "2026-11-05",
      "checkedAgainst": "abstract",
      "method": "Metadata confirmed via Crossref; no PubMed abstract, so claim wording was checked against the abstract indexed by OpenAlex."
    }
  },
  {
    "id": "diamond-2013",
    "title": "Executive Functions",
    "authors": "Diamond A",
    "year": 2013,
    "publisher": "Annual Review of Psychology",
    "url": "https://doi.org/10.1146/annurev-psych-113011-143750",
    "doi": "10.1146/annurev-psych-113011-143750",
    "fullTextUrl": "https://pmc.ncbi.nlm.nih.gov/articles/PMC4084861/",
    "sourceType": "review",
    "note": "Widely cited review defining the core executive functions and what affects them.",
    "verification": {
      "checkedOn": "2026-11-05",
      "checkedAgainst": "abstract",
      "method": "Metadata confirmed via Crossref and PubMed; claim wording checked against the published abstract."
    }
  },
  {
    "id": "gross-1998",
    "title": "Antecedent- and response-focused emotion regulation: Divergent consequences for experience, expression, and physiology",
    "authors": "Gross JJ",
    "year": 1998,
    "publisher": "Journal of Personality and Social Psychology",
    "url": "https://doi.org/10.1037/0022-3514.74.1.224",
    "doi": "10.1037/0022-3514.74.1.224",
    "sourceType": "primary-research",
    "note": "Experiment comparing reappraisal and suppression as ways of managing an emotional reaction.",
    "verification": {
      "checkedOn": "2026-11-05",
      "checkedAgainst": "abstract",
      "method": "Metadata confirmed via Crossref and PubMed; claim wording checked against the published abstract."
    }
  },
  {
    "id": "webb-2012",
    "title": "Dealing with feeling: A meta-analysis of the effectiveness of strategies derived from the process model of emotion regulation",
    "authors": "Webb TL, Miles E, Sheeran P",
    "year": 2012,
    "publisher": "Psychological Bulletin",
    "url": "https://doi.org/10.1037/a0027600",
    "doi": "10.1037/a0027600",
    "sourceType": "meta-analysis",
    "note": "Meta-analysis of 306 experimental comparisons of emotion regulation strategies.",
    "verification": {
      "checkedOn": "2026-11-05",
      "checkedAgainst": "abstract",
      "method": "Metadata confirmed via Crossref and PubMed; claim wording checked against the published abstract."
    }
  },
  {
    "id": "moors-2013",
    "title": "Appraisal Theories of Emotion: State of the Art and Future Development",
    "authors": "Moors A, Ellsworth PC, Scherer KR, et al.",
    "year": 2013,
    "publisher": "Emotion Review",
    "url": "https://doi.org/10.1177/1754073912468165",
    "doi": "10.1177/1754073912468165",
    "sourceType": "review",
    "note": "Overview of appraisal theories, which link emotions to how people evaluate situations.",
    "verification": {
      "checkedOn": "2026-11-05",
      "checkedAgainst": "page-text",
      "method": "Metadata confirmed via Crossref. No abstract is published; claim wording was checked against the article's opening section."
    }
  },
  {
    "id": "ohman-2001",
    "title": "Emotion drives attention: Detecting the snake in the grass",
    "authors": "Öhman A, Flykt A, Esteves F",
    "year": 2001,
    "publisher": "Journal of Experimental Psychology: General",
    "url": "https://doi.org/10.1037/0096-3445.130.3.466",
    "doi": "10.1037/0096-3445.130.3.466",
    "sourceType": "primary-research",
    "note": "Visual-search experiments showing that pictures of snakes and spiders capture attention quickly.",
    "verification": {
      "checkedOn": "2026-11-05",
      "checkedAgainst": "abstract",
      "method": "Metadata confirmed via Crossref and PubMed; claim wording checked against the published abstract."
    }
  },
  {
    "id": "lieberman-2007",
    "title": "Putting Feelings Into Words",
    "authors": "Lieberman MD, Eisenberger NI, Crockett MJ, et al.",
    "year": 2007,
    "publisher": "Psychological Science",
    "url": "https://doi.org/10.1111/j.1467-9280.2007.01916.x",
    "doi": "10.1111/j.1467-9280.2007.01916.x",
    "sourceType": "primary-research",
    "note": "fMRI study of 'affect labeling': putting feelings into words while viewing emotional images.",
    "verification": {
      "checkedOn": "2026-11-05",
      "checkedAgainst": "abstract",
      "method": "Metadata confirmed via Crossref and PubMed; claim wording checked against the published abstract."
    }
  },
  {
    "id": "barrett-2016",
    "title": "The theory of constructed emotion: an active inference account of interoception and categorization",
    "authors": "Barrett LF",
    "year": 2016,
    "publisher": "Social Cognitive and Affective Neuroscience",
    "url": "https://doi.org/10.1093/scan/nsw154",
    "doi": "10.1093/scan/nsw154",
    "fullTextUrl": "https://pmc.ncbi.nlm.nih.gov/articles/PMC5390700/",
    "sourceType": "review",
    "note": "Presents the theory of constructed emotion, a brain-based account of what emotions are.",
    "verification": {
      "checkedOn": "2026-11-05",
      "checkedAgainst": "abstract",
      "method": "Metadata confirmed via Crossref and PubMed; claim wording checked against the published abstract."
    }
  }
];
