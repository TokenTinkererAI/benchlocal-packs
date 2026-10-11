// GENERATED FILE - do not edit.
// Source: data/arc_easy_test.jsonl (AI2 ARC - ARC-Easy test split, CC BY-SA 4.0, (c) AI2).
// Source sha256: 7c73345800fdb847ae5fca138cb26c65c718087a490170068631c50dee1d6fec
// Upstream parquet: allenai/ai2_arc @ 210d026faf9955653af8916fad021475a3f00453 sha256 4160597d618ae851c7eb04e281574f3f654776216ac6b6641588d64527b47177.
// Option order: deterministic shuffle (salt "arc-easy-2376-shuffle-v1").
// Upstream quirks kept as-is: 11 question(s) carry other than four options (labels A-C / A-E) and 97 use numeric answer labels (1-4) upstream; the answer key is mapped to its option position in every case.

import type { ArcQuestion } from "../types";

const q = (question: ArcQuestion): ArcQuestion => question;

export const QUESTIONS: readonly ArcQuestion[] = [
  q({
    id: "ARC/0",
    recordId: "Mercury_417466",
    question: "Which statement best explains why photosynthesis is the foundation of most food webs?",
    options: ["Most ecosystems are found on land instead of in water.", "Sunlight is the source of energy for nearly all ecosystems.", "The producers in all ecosystems are plants.", "Carbon dioxide is more available than other gases."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1",
    recordId: "Mercury_7081673",
    question: "Which piece of safety equipment is used to keep mold spores from entering the respiratory system?",
    options: ["rubber gloves", "safety goggles", "breathing mask", "lead apron"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/2",
    recordId: "Mercury_7239733",
    question: "Meiosis is a type of cell division in which germ cells divide to produce haploid cells. Where does meiosis occur?",
    options: ["ovary cells", "brain cells", "muscle cells", "bone cells"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/3",
    recordId: "NYSEDREGENTS_2015_4_8",
    question: "Which characteristic describes the texture of a kitten's fur?",
    options: ["long", "soft", "warm", "gray"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/4",
    recordId: "Mercury_7037258",
    question: "Which best describes the structure of an atom?",
    options: ["a massive core surrounded by negatively-charged particles", "overlapping layers of neutral, positive, and negative particles", "a network of interacting positive and negative particles", "a lightweight core surrounded by neutral particles"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/5",
    recordId: "CSZ20679",
    question: "To express the distance between the Milky Way galaxy and other galaxies, the most appropriate unit of measurement is the",
    options: ["light-year.", "kilometer.", "astronomical unit.", "meter."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/6",
    recordId: "Mercury_182158",
    question: "A student has just completed a laboratory activity. What is the last action that the student should perform before leaving the lab area?",
    options: ["put away all glassware", "wash hands", "turn off all equipment", "wash instruments and table tops"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/7",
    recordId: "Mercury_7216668",
    question: "Students are investigating the effects of different fertilizers on plant growth. Which units would be best to measure the mass of the fertilizer used?",
    options: ["milligrams", "centimeters", "grams", "meters"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/8",
    recordId: "MCAS_2001_5_19",
    question: "Plants use sunlight to make",
    options: ["soil.", "food.", "water.", "minerals."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/9",
    recordId: "Mercury_SC_413631",
    question: "Which of these correctly identifies the way materials are transported in a plant?",
    options: ["Xylem carries water from the roots to the leaves.", "Phloem carries water from the flowers to the stems.", "Phloem carries minerals from the roots to the leaves.", "Xylem carries sugars from the flowers to the stems."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/10",
    recordId: "MCAS_2005_5_10",
    question: "When trees develop leaves in the spring, 10 changes occur on the forest floor. Why does the development of leaves cause changes on the forest floor?",
    options: ["Rainfall increases.", "Sunlight is reduced.", "Wind speed increases.", "Animal migration is stopped."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/11",
    recordId: "Mercury_7166145",
    question: "The circulatory system and the endocrine system work together in the human body. Which describes one way in which these systems interact?",
    options: ["taking in oxygen and transporting it to cells of the body", "collecting waste products from the cells and transporting it out of the body", "releasing hormones and transporting them to cells of the body", "absorbing nutrients from food and transporting them to cells in the body"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/12",
    recordId: "MSA_2013_5_6",
    question: "A student throws a ball into the air. While the ball travels up, the speed of the ball decreases. What force causes the ball to slow while traveling up?",
    options: ["magnetism", "electricity", "gravity", "tension"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/13",
    recordId: "Mercury_SC_405199",
    question: "Which of these will most likely harm a habitat?",
    options: ["rainfall", "sunlight", "water pollution", "planting trees"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/14",
    recordId: "NYSEDREGENTS_2015_8_28",
    question: "All living and nonliving material is composed of",
    options: ["air", "elements", "soil", "water"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/15",
    recordId: "Mercury_SC_401777",
    question: "Which process best explains how the Grand Canyon became so wide?",
    options: ["erosion", "folding", "sedimentation", "deposition"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/16",
    recordId: "Mercury_7198188",
    question: "As global temperatures increase, certain organisms will be more affected than others. The changes associated with global warming may result in an increase in sea level. Which organisms will be affected most as a result of the change in sea level?",
    options: ["mammals that swim in cold, deep ocean waters", "fish that live in coral reefs in shallow waters", "crustaceans at the bottom of deep sea ocean waters", "birds that eat fish from shallow waters"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/17",
    recordId: "MCAS_1998_4_11",
    question: "A dish of sugar water was left on a window sill. One week later, there were only sugar crystals left in the dish. The water was gone. The best explanation for the appearance of sugar crystals is",
    options: ["some of the water was absorbed by the dish.", "the water evaporated.", "the light shining on the window sill produced more sugar.", "the air condensed."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/18",
    recordId: "Mercury_SC_LBS10784",
    question: "Using a softball bat to hit a softball is an example of using which simple machine?",
    options: ["lever", "inclined plane", "pulley", "wheel and axle"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/19",
    recordId: "Mercury_7033548",
    question: "When an igneous intrusion comes into contact with surrounding rock, the surrounding rock will",
    options: ["foliate.", "precipitate.", "erode.", "recrystallize."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/20",
    recordId: "Mercury_7146195",
    question: "A research scientist writes a paper on the initial regrowth of a forest after a fire has damaged the entire ecosystem. Which title would be best for the paper?",
    options: ["Climax Communities", "Stable Communities", "Secondary Succession", "Primary Succession"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/21",
    recordId: "NCEOGA_2013_8_36",
    question: "Where do plants get most of the energy they need to live and grow?",
    options: ["air", "soil", "water", "sunlight"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/22",
    recordId: "Mercury_SC_415412",
    question: "Which is a statement about climate?",
    options: ["The high temperature tomorrow will be 14°C.", "The average high temperature in May is 20°C.", "The temperature range today was 10°C to 20°C.", "The average temperature yesterday was 15°C."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/23",
    recordId: "Mercury_7126840",
    question: "While on a movie set, a stuntman jumps off the roof of a building. As he falls toward an airbag, what is increasing?",
    options: ["kinetic energy", "potential energy", "gravity", "wind velocity"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/24",
    recordId: "Mercury_SC_408362",
    question: "Jessica wants to see cells in an oak tree leaf. Which tool is best for Jessica to use to see the cells?",
    options: ["magnifying glass", "reading glasses", "binoculars", "microscope"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/25",
    recordId: "MDSA_2008_8_35",
    question: "Biologists conduct investigations to learn about living organisms. Which method helps reduce bias during an investigation?",
    options: ["developing a hypothesis after collecting data in the investigation", "limiting the amount of background research before the investigation", "designing an investigation with repeated trials during the investigation", "obtaining other opinions concerning what should happen during the investigation"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/26",
    recordId: "NYSEDREGENTS_2015_8_21",
    question: "Which factor is most likely to cause the number of rabbits living in an area to increase?",
    options: ["less water", "limited food", "fewer predators", "lack of shelter"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/27",
    recordId: "VASoL_2008_5_12",
    question: "Seeds that remain inactive until the right conditions of light, water, and soil are present are called ___.",
    options: ["flowers", "dormant", "recycled", "pollen"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/28",
    recordId: "Mercury_SC_LBS10680",
    question: "What allows a light bulb to give off light?",
    options: ["the battery pushing light through the wire", "the light bulb giving electrical energy to the battery", "the current flowing through the wire to the light bulb", "the light bulb generating heat energy"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/29",
    recordId: "MCAS_2003_5_3",
    question: "What causes sound?",
    options: ["sunlight", "x-rays", "vibrations", "pitch"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/30",
    recordId: "VASoL_2010_5_18",
    question: "Photosynthesis occurs in which of these organisms?",
    options: ["Sunflower plant", "Mushroom", "Luna moth", "Sunfish"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/31",
    recordId: "Mercury_7074900",
    question: "In order for cells to grow at a normal rate, they must",
    options: ["take in light.", "be specialized.", "take in nutrients.", "be of similar size."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/32",
    recordId: "Mercury_SC_408762",
    question: "Marshall learned that plants need a substance from the air to make their own food. What does a plant take from the air in the presence of sunlight?",
    options: ["hydrogen", "nitrogen", "oxygen", "carbon dioxide"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/33",
    recordId: "ACTAAP_2015_5_8",
    question: "Antarctica is a continent at Earth's south pole. Fossils of tropical fern plants were discovered in Antarctica even though these plants do not grow there today. Which conclusion does the fossil evidence best support?",
    options: ["Recently, a natural disaster killed all of the fern plants in Antarctica.", "Millions of years ago, Antarctica was in a warmer location on Earth.", "Recently, birds stopped carrying the seeds of fern plants to Antarctica.", "Millions of years ago, Earth's south pole was much colder than it is today."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/34",
    recordId: "Mercury_7263008",
    question: "Which two theories of Moon formation propose that much or all of the material comprising the Moon came from Earth?",
    options: ["The Capture Theory and the Giant Impact Theory", "The Fission Theory and the Giant Impact Theory", "The Fission Theory and The Coaccretion Theory", "The Coaccretion Theory and The Capture Theory"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/35",
    recordId: "MCAS_2000_4_29",
    question: "When white, fluffy clouds appear in Massachusetts, the weather that day will MOST LIKELY be",
    options: ["stormy.", "fair.", "rainy.", "foggy."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/36",
    recordId: "CSZ_2008_5_CSZ10233",
    question: "Plants and animals are composed of organic compounds. Which of the following are the common elements found in organic compounds?",
    options: ["carbon, hydrogen, oxygen, nitrogen.", "sodium, potassium, gold, hydrogen.", "helium, neon, argon, krypton.", "iron, oxygen, nickel, copper."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/37",
    recordId: "Mercury_7128660",
    question: "New research uncovers information that proves that the data from an old theory is partially incorrect. What should the scientific community do about the old theory?",
    options: ["use the new information to update the old theory", "ban the public from discussing the old theory", "change the research notes in the original theory", "remove the old theory from historical records"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/38",
    recordId: "Mercury_7100520",
    question: "Which is the greatest benefit of sexual reproduction?",
    options: ["capable of producing offspring genetically identical to parent", "ability to produce genetically different offspring", "ability to reproduce without a mate", "capable of reproducing by meiosis"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/39",
    recordId: "Mercury_7017728",
    question: "The speed at which sound waves travel depends on the",
    options: ["distance between the vibration source and the receiver.", "type of material through which the sound travels.", "size of the object making the sound.", "type of device making the sound."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/40",
    recordId: "Mercury_7032865",
    question: "Which scientist is credited with discovering the first four moons of Jupiter?",
    options: ["Albert Einstein", "Galileo Galilei", "Sir Isaac Newton", "Charles Darwin"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/41",
    recordId: "Mercury_405057",
    question: "During science class, a teacher explains that the samples the students are studying are made of two or more minerals. What are the students studying?",
    options: ["elements", "gases", "rocks", "molecules"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/42",
    recordId: "Mercury_7057593",
    question: "When the Northern Hemisphere is tilted away from the Sun causing the rays of light to hit Earth at large angles, which season occurs?",
    options: ["fall", "summer", "spring", "winter"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/43",
    recordId: "Mercury_SC_405231",
    question: "A scientist found fossils of ocean shells on a mountain top. Based on this find, which statement can be made?",
    options: ["The climate was once colder.", "The mountain was covered by water.", "The shells once lived on dry land.", "The shells were carried by the wind."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/44",
    recordId: "VASoL_2007_5_38",
    question: "A student sees many plants around a pond. The student can determine which plants are nonvascular by",
    options: ["examining the plants for spores", "observing if they lack true stems, roots, or leaves", "counting the number of leaves on each stalk", "noticing if the plants are near rocks"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/45",
    recordId: "Mercury_SC_410895",
    question: "Darryl learns that freezing temperatures may help cause weathering. Which statement explains how freezing temperatures most likely cause weathering?",
    options: ["by turning acid rain into acid snow", "by causing rocks to stick together", "by freezing the leaves on trees", "by freezing water in the cracks of rocks"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/46",
    recordId: "Mercury_7015978",
    question: "A bond is formed when an electron is transferred from a sodium atom to a chlorine atom. What happens to the sodium atom during this process?",
    options: ["The atom becomes a positive ion.", "The mass of the atom increases.", "The atomic number decreases.", "The atom becomes an isotope."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/47",
    recordId: "ACTAAP_2010_5_5",
    question: "A group of fish was released into a local lake. This species of fish had never lived in the lake before. Scientists want to collect data on how the lake's ecosystem is affected by the new fish. Which method of data collection will give the most accurate results?",
    options: ["Measuring oxygen levels in the lake for two months", "Checking the lake water for nutrient levels on one day", "Sampling fish populations in the lake over several years", "Observing the surface of the lake for signs of the new fish after one week"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/48",
    recordId: "Mercury_7080955",
    question: "On a career day at school, an X-ray technician discusses her daily work with the class. Which equipment would she most likely say she uses on a regular basis to help ensure the safety of patients?",
    options: ["lead aprons", "rubber gloves", "goggles", "earplugs"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/49",
    recordId: "ACTAAP_2009_5_4",
    question: "In the United States, windmills have been used for farming for hundreds of years. Which simple machine is the most important part of a windmill?",
    options: ["pulley", "wheel and axle", "inclined plane", "lever"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/50",
    recordId: "Mercury_7017010",
    question: "Which tools are needed to measure the effects of friction on a block of wood?",
    options: ["meter stick, stopwatch", "meter stick, spring scale", "balance, meter stick", "balance, stopwatch"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/51",
    recordId: "Mercury_7146108",
    question: "Planets outside of our solar system have been detected. What suggested the presence of a planet outside of our solar system?",
    options: ["regular occurring eclipses of its moons", "radio wave emissions", "a wobble in the rotation of the star", "the discovery of a star as large as our own"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/52",
    recordId: "NYSEDREGENTS_2012_4_12",
    question: "During which process are pieces of rock material being moved over Earth's surface by water and wind?",
    options: ["conduction", "deposition", "erosion", "revolution"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/53",
    recordId: "VASoL_2009_5_3",
    question: "The Apollo 11 mission was able to retrieve samples of the Moon's surface because it was the first mission to have astronauts",
    options: ["orbit a planet", "walk in space", "land on the Moon", "return to Earth"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/54",
    recordId: "Mercury_SC_401253",
    question: "A student mixes a teaspoon of sugar in a large glass of water. What happens to the sugar when it is mixed with the water?",
    options: ["It boils.", "It melts.", "It dissolves.", "It evaporates."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/55",
    recordId: "Mercury_7235953",
    question: "Particle accelerators, such as the Large Hadron Collider in Europe, accelerate subatomic particles to great speeds. These particles move in opposite directions at nearly the speed of light and collide into one another to simulate conditions that were present as the universe formed. Which property of matter in the initial moments of the universe are these accelerators designed to simulate?",
    options: ["low density", "massive nuclei", "high energy", "circular movement"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/56",
    recordId: "Mercury_403974",
    question: "A doorbell circuit converts electrical energy into mechanical energy. The mechanical energy is in the form of vibrations that ultimately produce",
    options: ["radiant energy.", "chemical energy.", "sound energy.", "thermal energy."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/57",
    recordId: "Mercury_7241063",
    question: "Which factor determines if two individuals are members of the same species?",
    options: ["They are similar in appearance and color.", "They mate and produce fertile offspring.", "They forage and eat the same type of food.", "They live in the same habitat and niche."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/58",
    recordId: "MCAS_2010_8_12015",
    question: "Which of the following planets is always closer to the Sun than it is to Earth?",
    options: ["Uranus", "Saturn", "Jupiter", "Mercury"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/59",
    recordId: "Mercury_7168350",
    question: "Cells need nutrients for energy. Which system is responsible for breaking down food to provide cellular energy?",
    options: ["digestive", "circulatory", "excretory", "respiratory"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/60",
    recordId: "Mercury_SC_402980",
    question: "During which activity should a student wear goggles?",
    options: ["mixing baking soda with water", "examining a leaf with a microscope", "measuring the length of a shadow", "writing a science report"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/61",
    recordId: "Mercury_417126",
    question: "Bacillus thuringiensis (Bt) is a soil bacterium that is toxic to certain insects. Genes from this bacterium have been inserted into cotton to make Bt cotton. Farmers that use Bt cotton would most likely use less of which of the following?",
    options: ["herbicide", "fertilizer", "insecticide", "water"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/62",
    recordId: "NYSEDREGENTS_2010_8_2",
    question: "A student examined a rock sample and described it as having particles of various colors that were 1 millimeter to 12 millimeters in size. The student was making",
    options: ["a hypothesis", "a prediction", "an observation", "an inference"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/63",
    recordId: "NYSEDREGENTS_2010_8_13",
    question: "What are genes composed of?",
    options: ["traits", "DNA", "offspring", "cells"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/64",
    recordId: "Mercury_177223",
    question: "In a classroom demonstration, a teacher pours sulfuric acid on some granulated sugar in a beaker. The sugar turns yellow and then black. Smoke rises and a strong smell is released. This demonstration is an example of what kind of change?",
    options: ["physical", "magnetic", "chemical", "electric"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/65",
    recordId: "Mercury_7200533",
    question: "Marta studied different forms of energy. Which two types of energy travel in waves?",
    options: ["chemical and light", "light and sound", "chemical and electrical", "electrical and sound"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/66",
    recordId: "Mercury_SC_400707",
    question: "The tops of some mountains are sharp and pointed, while the tops of others are smooth and rounded. This difference was most likely caused by",
    options: ["erosion and weathering.", "rocks melted underground by lava.", "earthquakes and waves.", "rivers flooding along a coastal plain."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/67",
    recordId: "Mercury_SC_400380",
    question: "A student suggests to the school board that they use a renewable energy source. The student suggests they use",
    options: ["wood.", "natural gas.", "coal.", "wind."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/68",
    recordId: "Mercury_7205590",
    question: "Solar radiation provides more heat near the equator than near the poles on Earth. The greatest amount of heat is moved away from the equator by",
    options: ["tectonic plates.", "ocean currents.", "aquatic plants.", "surface winds."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/69",
    recordId: "NYSEDREGENTS_2015_4_30",
    question: "Which human activity will help conserve Earth's natural resources?",
    options: ["recycling plastic bottles", "leaving the television on all day", "cutting down trees", "burning trash in the yard"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/70",
    recordId: "NYSEDREGENTS_2012_4_17",
    question: "Which characteristic helps some animals defend themselves against predators?",
    options: ["strong odor", "poor hearing", "shivering", "weak eyesight"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/71",
    recordId: "VASoL_2008_3_5",
    question: "Most plants begin their life cycle as ___.",
    options: ["leaves", "roots", "flowers", "seeds"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/72",
    recordId: "Mercury_SC_415390",
    question: "Erin wants to make a strong, light chair. Which natural material should she use?",
    options: ["clay", "wood", "granite", "iron"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/73",
    recordId: "Mercury_SC_408436",
    question: "Jonathon was studying bears. He found out that bears are born with some behaviors and learn others from their environment. Which behavior does a bear most likely inherit?",
    options: ["how to hibernate during the winter", "how to seek shelter in a hollow log", "how to find food in garbage cans", "how to live in human neighborhoods"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/74",
    recordId: "Mercury_SC_401143",
    question: "A group of the same species of fish swim together to increase an individual's",
    options: ["chance of survival.", "visibility to predators.", "swimming speed.", "body temperature."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/75",
    recordId: "LEAP_2005_8_10403",
    question: "In the oxygen cycle, which group of organisms replenishes a large portion of the atmospheric oxygen supply?",
    options: ["insects", "plants", "fungi", "mammals"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/76",
    recordId: "Mercury_7108045",
    question: "Some antibiotics used to treat infections in humans are also used to treat chickens, but some groups oppose this practice. The overuse of the antibiotics will most likely influence the natural selection of which type of organisms?",
    options: ["chickens that naturally make the antibiotics", "microbes that are susceptible to the antibiotics", "microbes that are resistant to the antibiotics", "chickens that are resistant to infection"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/77",
    recordId: "Mercury_SC_402251",
    question: "A student performs a lab investigation by measuring the average time it takes for a toy car to travel 10 meters. Why is it best to perform the experiment in three trials?",
    options: ["to make the results more significant", "to form a good hypothesis", "to increase the accuracy of the results", "to better explain the investigation to others"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/78",
    recordId: "Mercury_7071418",
    question: "A scientist finds a metamorphic rock formation next to a magma chamber and determines that it was originally a sedimentary rock formation. He concludes that the temperature of the magma chamber caused the rock formation to become metamorphic. Which is another reliable explanation of how the rock formation was changed?",
    options: ["a sandstorm that caused the rocks to be eroded", "pressure on the rock formation inside Earth", "a quick burial of the rocks by tons of volcanic ash", "weight of heavy machinery moving over the rocks"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/79",
    recordId: "Mercury_SC_407370",
    question: "Earth orbiting the Sun causes",
    options: ["daily tidal cycles.", "the phases of the Moon.", "the changing of the seasons.", "day to become night."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/80",
    recordId: "Mercury_7084595",
    question: "The cycle of night and day on Earth is a result of",
    options: ["Earth rotating on its axis.", "the Moon revolving around Earth.", "Earth revolving around the Sun.", "the Moon rotating on its axis."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/81",
    recordId: "Mercury_7041335",
    question: "Which of these traits is most influenced by environment?",
    options: ["blood type", "weight", "hair color", "handedness"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/82",
    recordId: "Mercury_7236320",
    question: "Which statement describes a characteristic of a gas that has a significant effect on the climates of both Earth and Venus?",
    options: ["Carbon dioxide traps solar energy.", "Argon is unable to react with water.", "Nitrogen is chemically inert.", "Sodium vapor reflects solar energy."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/83",
    recordId: "LEAP__5_10308",
    question: "DNA technology has improved greatly in the last twenty years. Which task has been made easier by the development of DNA technology?",
    options: ["identifying genetic disorders", "determining the parts of an atom", "making very accurate measurements", "observing distant objects in space"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/84",
    recordId: "Mercury_7068425",
    question: "Which condition is necessary for metamorphic rocks to form?",
    options: ["rapid burial of sediments", "constant weathering and erosion", "slow cooling of magma", "extreme pressure and heating"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/85",
    recordId: "Mercury_SC_401308",
    question: "Which event helps to renew a resource?",
    options: ["A car is filled with gasoline.", "A seed is planted from a tree.", "An offshore rig pumps oil.", "An office is heated with coal."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/86",
    recordId: "NYSEDREGENTS_2008_4_18",
    question: "Which part of a plant takes in water and nutrients from the soil?",
    options: ["root", "stem", "flower", "leaf"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/87",
    recordId: "Mercury_7165550",
    question: "A certain type of hybrid car utilizes a braking system in which energy is recovered and stored in batteries. This is an example of which type of energy conversion?",
    options: ["chemical energy converted to thermal energy", "chemical energy converted to kinetic energy", "kinetic energy converted to potential energy", "thermal energy converted to potential energy"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/88",
    recordId: "Mercury_7114923",
    question: "Clownfish take shelter in the tentacles of sea anemones and keep sea anemones clean. Which type of relationship does this represent?",
    options: ["mutualism", "commensalism", "neutralism", "parasitism"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/89",
    recordId: "Mercury_SC_408434",
    question: "Some animals have behaviors that help them find food when little is available. Which best describes an animal with this type of behavior?",
    options: ["an owl that calls at night", "a goose that migrates in winter", "a robin that builds a nest", "a duck that swims in water"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/90",
    recordId: "Mercury_7008453",
    question: "Part of a student's experiment is to measure changes in wind speed several hours before a storm. What piece of equipment should the student use?",
    options: ["hygrometer", "anemometer", "barometer", "weather vane"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/91",
    recordId: "NYSEDREGENTS_2010_8_14",
    question: "An organism is born with a genetic abnormality not present in any of its ancestors. This abnormality is most likely the result of",
    options: ["competition", "circulation", "mutation", "respiration"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/92",
    recordId: "NYSEDREGENTS_2015_8_24",
    question: "The length of one day on Earth is determined by how long it takes",
    options: ["the Moon to revolve once", "the Moon to rotate once", "Earth to rotate once", "Earth to revolve once"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/93",
    recordId: "NYSEDREGENTS_2008_4_6",
    question: "When a rock is placed in a graduated cylinder containing water, the height of the water will",
    options: ["increase", "decrease", "remain the same"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/94",
    recordId: "Mercury_400279",
    question: "A student heats the same amount of two different liquids over Bunsen burners. Each liquid is at room temperature when the student begins. If liquid 1 has a higher specific heat than liquid 2, then liquid 1 will",
    options: ["condense over a longer period.", "take longer to increase in temperature.", "chemically break down at a faster rate.", "evaporate sooner."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/95",
    recordId: "Mercury_7092190",
    question: "Through which activity do animals get the carbon that is needed for their bodies?",
    options: ["breathing", "eating", "running", "sleeping"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/96",
    recordId: "Mercury_7113890",
    question: "Scientists have discovered organisms that thrive in hot water that is 90°C (194°F) and do not need sunlight or oxygen to live. Into which kingdom would the scientists classify these organisms?",
    options: ["Archaebacteria", "Plantae", "Fungi", "Protista"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/97",
    recordId: "TAKS_2009_8_17",
    question: "A cook touches a hot stove and quickly moves his hand away. What are the two primary body systems that work together to produce this response?",
    options: ["Nervous and muscular systems", "Muscular and respiratory systems", "Integumentary and endocrine systems", "Skeletal and nervous systems"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/98",
    recordId: "AKDE&ED_2008_4_3",
    question: "Which statement correctly describes both gases and liquids?",
    options: ["Their volumes change when they are in different containers.", "Their shapes change when they are in different containers.", "Their volumes stay the same in any container.", "Their shapes stay the same in any container."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/99",
    recordId: "Mercury_7202353",
    question: "When the soil is saturated, earthworms move to the top of the soil to obtain oxygen. This behavior is evidence of which biological concept in earthworms?",
    options: ["learned behavior", "migration instinct", "reproductive strategy", "response to stimuli"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/100",
    recordId: "MCAS_2006_9_14",
    question: "Which of the following is more likely to occur in a plant cell than in an animal cell?",
    options: ["breakdown of glucose", "formation of cellulose", "synthesis of enzymes", "active transport of ions"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/101",
    recordId: "MSA_2015_5_37",
    question: "Earth revolves around the sun. The amount of time needed for Earth to complete one revolution around the sun is approximately",
    options: ["365 days", "1 day", "180 days", "28 days"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/102",
    recordId: "MDSA_2010_8_22",
    question: "Excess nitrogen fertilizers sometimes drain into waterways that flow into the Chesapeake Bay. This nitrogen may cause algae blooms, which reduce dissolved oxygen in the water. How does nitrogen negatively affect the Chesapeake Bay?",
    options: ["sediment on the bottom of the bay decreases", "fish births increase", "fish populations decrease", "the rate of water runoff into the bay increases"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/103",
    recordId: "MCAS_1999_4_4",
    question: "Mount Arenal, a volcano in Costa Rica, is erupting. Heat is being released during the eruption. What is the source of the heat?",
    options: ["The heat comes from pools of underground water.", "The heat comes from deep within Earth.", "The heat comes from the Sun.", "The heat comes from decaying plants and animals."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/104",
    recordId: "Mercury_7247923",
    question: "Which statement describes how the umbilical cord supports a developing fetus?",
    options: ["It supplies oxygen and nutrients to the fetus.", "It keeps the fetus inside the mother until birth.", "It provides a protective barrier between the mother and the fetus.", "It provides a navel when the baby is born."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/105",
    recordId: "Mercury_SC_416124",
    question: "Which two human body systems are most responsible for getting oxygen to cells?",
    options: ["respiratory and digestive", "skeletal and circulatory", "digestive and skeletal", "circulatory and respiratory"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/106",
    recordId: "Mercury_407530",
    question: "In their science classroom, Sam and Julia cross a heterozygous tall (Tt) pea plant with a homozygous short (tt) pea plant. What ratio represents the results Sam and Julia can expect?",
    options: ["1 tall plant to 3 short plants", "2 tall plants to 2 short plants", "3 tall plants to 1 short plant", "4 tall plants to 0 short plants"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/107",
    recordId: "Mercury_7271740",
    question: "When atmospheric carbon dioxide increases, some of the carbon dioxide dissolves in the ocean causing the ocean to become",
    options: ["more alkaline.", "warmer.", "cooler.", "more acidic."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/108",
    recordId: "Mercury_7026495",
    question: "Over time, dried lava from an old volcano is worn down and broken into small pieces. When these pieces pile up and are cemented together to form new rock, how would this new rock be classified?",
    options: ["igneous", "magma", "sedimentary", "metamorphic"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/109",
    recordId: "Mercury_7084315",
    question: "When potassium and bromine atoms form chemical bonds, which of these is produced?",
    options: ["a mixture", "a compound", "an element", "a new form of matter"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/110",
    recordId: "TIMSS_2011_4_pg51",
    question: "How often does Earth rotate on its axis?",
    options: ["once every 24 hours", "once every 12 hours", "once every year", "once every month"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/111",
    recordId: "Mercury_7081148",
    question: "The elements that make up the atmosphere of Earth can be listed as percentages or can be shown in a graph. Which type of graph would best show this information?",
    options: ["a line graph", "a scatterplot", "a bar graph", "a pie chart"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/112",
    recordId: "Mercury_SC_400040",
    question: "Animals give off carbon dioxide that plants take in through leaves. What do plants give off as a result of photosynthesis that animals need to breathe?",
    options: ["protein", "heat", "water", "oxygen"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/113",
    recordId: "ACTAAP_2010_7_10",
    question: "Air is composed of many different substances. Which of the following components of air is a compound rather than an element?",
    options: ["Nitrogen, N2", "Oxygen, O2", "Water, H2O", "Argon, Ar"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/114",
    recordId: "ACTAAP_2013_7_4",
    question: "Which factor is responsible for the presence of equatorial deserts?",
    options: ["asteroid impacts", "the solar activity cycle", "tilt of the Earth's axis", "global warming"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/115",
    recordId: "Mercury_SC_405444",
    question: "The ash borer moth looks similar to a wasp, but it does not have the ability to sting. This adaptation most likely helps the moth survive because",
    options: ["the moth blends in with its surroundings.", "predators avoid the moth.", "it makes food easier to find.", "it aids in attracting a mate."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/116",
    recordId: "Mercury_7213675",
    question: "Which organ system communicates with cells in muscle tissue so that the muscles contract or relax, allowing the body to move?",
    options: ["excretory system", "circulatory system", "respiratory system", "nervous system"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/117",
    recordId: "MEA_2010_8_15-v1",
    question: "Which device produces mechanical energy?",
    options: ["an electric motor", "a light bulb", "a solar cooker", "a battery"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/118",
    recordId: "Mercury_7094675",
    question: "A beach is formed when sediment is deposited along a shoreline. What would most likely happen if rivers that empty into the ocean were dammed?",
    options: ["Beaches would form from different materials.", "Sand dunes would become smaller.", "Deltas would become larger.", "Less sediment would be deposited along the shoreline."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/119",
    recordId: "Mercury_403912",
    question: "Due to extreme pressure, the inner core of Earth is",
    options: ["gas.", "plasma.", "solid.", "liquid."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/120",
    recordId: "Mercury_7009853",
    question: "The speed and general direction of motion of a galaxy relative to the Earth can be determined by",
    options: ["measuring its red shift.", "contrasting it against nearby stars.", "the gravity it exerts.", "observing its motion across the sky."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/121",
    recordId: "Mercury_SC_LBS10020",
    question: "What are the three common states of matter?",
    options: ["solid, vapor, liquid", "solid, gas, liquid", "liquid, gas, vapor", "gas, liquid, fluid"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/122",
    recordId: "MEA_2013_8_2",
    question: "What is the primary reason for breaking down food molecules?",
    options: ["to store materials in a cell", "to absorb water into a cell", "to provide energy for a cell", "to remove wastes from a cell"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/123",
    recordId: "Mercury_7068688",
    question: "Topsoil is considered to be most fertile when it has a",
    options: ["low sand content.", "low pH level.", "high parent rock material level.", "high organic matter level."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/124",
    recordId: "Mercury_7271705",
    question: "When chemicals in the atmosphere dissolve in water droplets, they precipitate with the water and pollute water reservoirs on Earth. The pollutants enter the food chain when aquatic organisms absorb them. Which of these pollutants eventually contaminates fish after coal is burned?",
    options: ["lead", "arsenic", "aluminum", "mercury"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/125",
    recordId: "Mercury_402456",
    question: "An atom has a mass of 24 and a nuclear charge of 12. Which statement about the atom is accurate?",
    options: ["It has equal numbers of neutrons and protons.", "It has equal numbers of nuclear particles and electrons.", "It has twice as many protons as electrons.", "It has twice as many neutrons as protons."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/126",
    recordId: "NCEOGA_2013_8_6",
    question: "Which is an example of a renewable energy resource?",
    options: ["gas", "coal", "oil", "biomass"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/127",
    recordId: "Mercury_7230178",
    question: "The compression of matter due to gravitational attraction increased as the protoplanets formed. What was a result of this compression within each protoplanet?",
    options: ["increase in thermal energy", "increase in noble gas destabilization", "initiation of photosynthesis reactions", "initiation of nuclear fusion"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/128",
    recordId: "Mercury_7215233",
    question: "The construction of Hoover Dam on the Colorado River resulted in abundant freshwater and electrical power for the region. Which of these is a disadvantage of the construction of Hoover Dam?",
    options: ["an increase in flooding downstream", "a decrease in the amount of water for irrigation", "a decrease in the amount of river ecosystems", "an increase in regional humidity"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/129",
    recordId: "Mercury_SC_415535",
    question: "If you place a thermometer into a glass of boiling water, what temperature should the thermometer read?",
    options: ["100°C", "32°C", "212°C", "200°C"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/130",
    recordId: "CSZ_2008_8_29",
    question: "What characteristic of carbon [C] makes it essential to living organisms?",
    options: ["Carbon forms crystal structures under certain conditions.", "Carbon can exist as a solid, liquid, or gas.", "Carbon exists in radioactive forms.", "Carbon bonds in many ways with itself to form chains."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/131",
    recordId: "MSA_2012_5_28",
    question: "Scientists found evidence of a fish that lived millions of years ago. The fish had features that were possibly used to move on land. This fish is now extinct. What scientific evidence did the scientists most likely find that confirmed the existence of this fish?",
    options: ["a photograph", "a description", "a fossil", "a cave drawing"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/132",
    recordId: "MCAS_2010_8_12008",
    question: "What is the smallest unit of a chemical compound that still has the properties of that compound?",
    options: ["an element", "an atom", "a nucleus", "a molecule"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/133",
    recordId: "Mercury_SC_406724",
    question: "A student is investigating in which type of soil a plant will grow best. Which should the student measure to answer the question?",
    options: ["amount of water used", "temperature of the room", "weight of the soil", "height of the plants"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/134",
    recordId: "TIMSS_2007_8_pg33",
    question: "An animal has scales and uses only its lungs to exchange gases. What is the animal most likely to be classified as?",
    options: ["an amphibian", "a mammal", "a fish", "a reptile"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/135",
    recordId: "Mercury_7004988",
    question: "How are igneous and sedimentary rocks similar?",
    options: ["They are both formed by erosion.", "Heat and pressure can turn them into metamorphic rock.", "Heat and pressure can turn them into lava.", "They are both formed from cooled lava."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/136",
    recordId: "Mercury_SC_LBS10946",
    question: "When both a dominant and recessive gene are present, which of the following is true?",
    options: ["The recessive trait will be visible.", "It cannot be predicted which trait will be visible.", "Neither trait will be visible.", "The dominant trait will be visible."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/137",
    recordId: "TAKS_2009_8_39",
    question: "Squirrels in cold climates gather and store food for winter. The squirrels sometimes bury nuts and then do not return for them. These nuts can grow to become trees. This chain of events is an example of",
    options: ["seed fossilization", "competition", "predation", "seed distribution"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/138",
    recordId: "Mercury_SC_408357",
    question: "Kurt drinks frozen fruit juice from a small cup. He measures the amount of fruit juice in the cup. Which property is Kurt measuring?",
    options: ["temperature", "density", "height", "volume"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/139",
    recordId: "Mercury_178710",
    question: "A simple machine that has a mechanical advantage equal to 1 would most likely be used to",
    options: ["decrease work.", "change direction.", "change resistance.", "decrease effort."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/140",
    recordId: "Mercury_410598",
    question: "Roberto is sliding down a plastic slide on the playground. After he reaches the ground, he feels a small electric shock when he touches a piece of metal. What has been built up on his body that causes the shock?",
    options: ["atoms", "protons", "neutrons", "electrons"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/141",
    recordId: "TIMSS_2011_4_pg15",
    question: "Plants grow best in soils that are rich in which of the following?",
    options: ["grains of sand", "layers of gravel", "lumps of clay", "decaying plants and animals"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/142",
    recordId: "Mercury_7217088",
    question: "The rate of acceleration of an object is determined by the mass of the object and",
    options: ["the initial velocity of the object.", "the change in kinetic energy of the object.", "the direction of movement of the object.", "the forces acting on the object."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/143",
    recordId: "Mercury_7143360",
    question: "Some aquifers are composed of limestone and dolomite. Which process increases the open spaces of the aquifer formation?",
    options: ["tensional faulting", "chemical weathering", "wave action", "wind erosion"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/144",
    recordId: "MCAS_2012_8_23645",
    question: "Leather basketballs are made for indoor use on smooth surfaces. Rubber basketballs are made for use on many different surfaces. Which of the following properties of rubber makes it better than leather for use on many different surfaces?",
    options: ["Rubber is lightweight.", "Rubber is dark in color.", "Rubber is durable.", "Rubber is quickly produced."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/145",
    recordId: "LEAP__4_10228",
    question: "On a field trip in a wooded area, you see a small, strange object. You wonder whether it is a live animal. The best way to find out is to observe the object to see if it",
    options: ["carries out basic life functions.", "has an odor.", "has separate parts.", "can make a noise and has a lifelike color."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/146",
    recordId: "MSA_2012_8_29",
    question: "Ethanol is a type of alcohol made from plants. Sugarcane and corn, which are both used in foods such as cereals and breads, are used to make ethanol. Burning ethanol provides a clean source of energy because the products of ethanol are water and carbon dioxide. Therefore, mixing ethanol with gasoline reduces harmful waste products. In the 1970s, many Brazilians drove cars with engines that used an ethanol gasoline mixture. This alternative fuel conserved the limited supply of gasoline available at that time. In the 1990s, gasoline became cheaper than ethanol, and Brazilians returned to driving more gasoline-fueled cars. Recently, Brazilians started driving more cars that use an ethanol-gasoline mixture. Ethanol is a good alternative fuel because it",
    options: ["increases biodiversity", "reduces air pollution", "increases ozone emissions", "reduces sound pollution"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/147",
    recordId: "Mercury_SC_401774",
    question: "A whistle produces a sound because blowing air in the whistle causes",
    options: ["the air to be absorbed by the whistle.", "the air in the whistle to heat up and expand.", "the air inside the whistle to vibrate.", "the whistle material to shake."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/148",
    recordId: "TIMSS_2003_4_pg14",
    question: "Each year the Earth moves once around",
    options: ["all the other planets", "Mars", "the Sun", "the Moon"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/149",
    recordId: "ACTAAP_2008_7_13",
    question: "According to Newton's first law of motion, what counteracts gravity to keep a satellite in orbit?",
    options: ["magnetism", "energy", "friction", "inertia"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/150",
    recordId: "Mercury_SC_416096",
    question: "How do plants get water and minerals?",
    options: ["absorbed from the soil through the stem", "absorbed from the air through the flowers", "absorbed from the air through the leaves", "absorbed from the soil though the roots"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/151",
    recordId: "NYSEDREGENTS_2013_8_12",
    question: "A cell's chromosomes contain",
    options: ["sperm", "genes", "eggs", "chlorophyll"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/152",
    recordId: "Mercury_7222845",
    question: "Which of these events is an example of a change in climate?",
    options: ["A series of tornadoes occurs over a one-week period.", "Afternoon clouds form and block the sunlight.", "The average amount of annual precipitation decreases.", "An overnight temperature drop causes frost to form."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/153",
    recordId: "Mercury_SC_401166",
    question: "Which object works best when reflecting light?",
    options: ["mirror", "eyeglasses", "binoculars", "camera"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/154",
    recordId: "LEAP_2005_4_10267",
    question: "A wetland was drained to build a mall. Two years later, there were no more toads in that area. Why did the toads disappear?",
    options: ["The toads were destroyed by the construction equipment.", "The toads were frightened and went into the woods.", "The toads go their food from the wetland ecosystem.", "The toads died because toads cannot breathe out of water."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/155",
    recordId: "ACTAAP_2007_7_18",
    question: "Which elements are found to the right of the zigzag line in the periodic table?",
    options: ["nonmetals and gases", "liquids", "metals and gases", "metals"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/156",
    recordId: "Mercury_7188370",
    question: "Miranda learned how the human body carries out life functions. Which is the most basic level of organization in the human body?",
    options: ["a cell", "a tissue", "a system", "an organ"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/157",
    recordId: "MSA_2013_5_5",
    question: "Pollutants, such as motor oil and gasoline, are sometimes leaked onto roads by vehicles. How do these pollutants most likely affect the environment?",
    options: ["Storms wash the pollutants into lakes and rivers.", "Winds blow the pollutants to the side of the road and harm the soil.", "Animals get stuck in the pollutants when they cross the road.", "Animals become sick from licking the pollutants on the road."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/158",
    recordId: "MCAS_2005_5_8",
    question: "Which of the following objects is probably the most flexible?",
    options: ["a ceramic dish", "a short steel rod", "a new rubber hose", "a wooden block"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/159",
    recordId: "Mercury_184888",
    question: "A student practicing for the outdoor track team begins to sweat. To what stimulus is the body responding?",
    options: ["an increase in breathing rate", "an increase in oxygen demand", "an increase in body temperature", "an increase in heart rate"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/160",
    recordId: "Mercury_7044188",
    question: "What repeating cycle is responsible for the four seasons that occur on Earth?",
    options: ["rotation of the Sun", "rotation of the moon", "revolution of the sun in the galaxy", "revolution of the earth about the sun"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/161",
    recordId: "Mercury_7056875",
    question: "Which of these systems functions to protect and support vital organs?",
    options: ["digestive", "excretory", "nervous", "skeletal"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/162",
    recordId: "Mercury_SC_400868",
    question: "Which characteristic would best help a rabbit survive in snow?",
    options: ["short legs", "thick, white fur", "dim eyesight", "slow movement"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/163",
    recordId: "Mercury_SC_409142",
    question: "Scientists are studying a pond. Which property can the scientists measure to understand the amount of energy held by the lake water?",
    options: ["the color of the water", "the temperature of the water", "the depth of the lake", "the volume of the lake"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/164",
    recordId: "Mercury_SC_408900",
    question: "Russell wants to observe changes in nature over the next few months. What can a thermometer help Russell investigate?",
    options: ["the high temperatures each day", "tiny organisms in pond water", "the amount of growth in a plant", "rainfall amounts each week"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/165",
    recordId: "Mercury_SC_401624",
    question: "The egg stage in the life cycle of a bird is most like which phase in the life cycle of certain types of flowers?",
    options: ["immature flower", "spore", "seed", "pollen"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/166",
    recordId: "Mercury_7188965",
    question: "Peristalsis helps move nutrients through parts of the body by using wavelike contractions. In which system is the function used?",
    options: ["nervous", "circulatory", "digestive", "endocrine"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/167",
    recordId: "NCEOGA_2013_8_32",
    question: "Which is the best way to help prevent the flu from becoming a pandemic?",
    options: ["washing hands often", "taking antibiotics", "getting a vaccination", "eating fruits and vegetables"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/168",
    recordId: "Mercury_7008208",
    question: "Which theory states that the universe originated as a single mass?",
    options: ["Big Bang", "Steady State", "Catastrophism", "Astronomical"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/169",
    recordId: "Mercury_7092400",
    question: "As two continental plates collide, the edges of the plates are crumpled and uplifted. Which of these landforms is most likely a result of this type of collision?",
    options: ["mountain ranges", "normal faults", "shield volcanoes", "U-shaped valleys"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/170",
    recordId: "Mercury_417462",
    question: "During a walk in the woods, Mandy finds a plant structure that had fallen onto the trail. Mandy can tell the object contained seeds, and thinks it came from a flowering plant instead of a conifer. How can she determine if the object came from a flowering plant?",
    options: ["by looking for seed coats on the seeds", "by looking for young sporophytes inside the seeds", "by looking for wing-like structures on the seeds", "by looking for fruit tissue around the seeds"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/171",
    recordId: "Mercury_SC_401211",
    question: "The esophagus, stomach, and small intestine are parts of which body system?",
    options: ["muscular", "respiratory", "nervous", "digestive"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/172",
    recordId: "Mercury_178605",
    question: "Which of the following is a chemical property of silver?",
    options: ["malleable", "white metal", "reacts with nitric acid", "conductor of heat"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/173",
    recordId: "Mercury_SC_400364",
    question: "If the climate in an area changed over time to become very cold, which change would most likely help a species living there to survive?",
    options: ["a thicker neck and longer tail", "an increase in fur and fat", "an increase in height and speed", "a larger mouth and stronger jaws"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/174",
    recordId: "NYSEDREGENTS_2008_8_15",
    question: "A broken bone heals through the process of",
    options: ["cell division", "adaptation", "mutation", "chemical digestion"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/175",
    recordId: "ACTAAP_2015_5_7",
    question: "Which is the best example of an object with kinetic energy?",
    options: ["a dam holding back some water", "a marble rolling down a ramp", "a plate sitting on a table", "a bird perching in a tree"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/176",
    recordId: "Mercury_7180618",
    question: "Lions tend to prey on primary consumers like zebras and gazelles. If there were a sudden decline in a population of lions, which ecological imbalance would most likely occur in the habitat?",
    options: ["overproduction of greenhouse gases", "invasion by non-native species", "overgrazing", "eutrophication"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/177",
    recordId: "Mercury_415262",
    question: "Which of the following could help to reduce a home heating bill in winter?",
    options: ["removing thick rugs and heavy curtains in the home", "using more insulation in the walls of the home", "replacing wood doors with aluminum doors", "painting the roof of the home white to reflect light"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/178",
    recordId: "Mercury_7200200",
    question: "Elizabeth uses a specific type of whistle to call her dogs. The noise made by the whistle is heard by the dogs but cannot be heard by the human ear. Which statement best describes why humans cannot hear the sound made by the whistle?",
    options: ["The speed of the sound is too fast.", "The wavelength of the sound is too long.", "The amplitude of the sound is too low.", "The frequency of the sound is too high."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/179",
    recordId: "MDSA_2008_8_24",
    question: "Use the information to answer the question. Over the last 150 years, the use of fossil fuels has increased, resulting in more carbon dioxide and other greenhouse gases in the atmosphere. Some scientists think that these atmospheric gases will result in global warming. Scientists have recorded data on global temperature changes and have predicted possible changes in sea level that may affect Maryland residents. Which action helps reduce global warming?",
    options: ["developing highways", "driving large vehicles", "using electricity from coal burning power plants", "using renewable power sources"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/180",
    recordId: "Mercury_185238",
    question: "As members of a food web, humans are considered to be",
    options: ["scavengers.", "producers.", "consumers.", "decomposers."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/181",
    recordId: "MCAS_2015_8_6",
    question: "Which of the following statements best describes the role of gravity in the formation of stars?",
    options: ["Gravity causes gases and dust particles to condense into spheres.", "Gravity cools gases and liquids until they become one solid mass.", "Gravity pushes rocks and dust particles outward from a dense center.", "Gravity converts solid matter into gases and light energy."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/182",
    recordId: "Mercury_7015663",
    question: "What is the name of the process in which igneous, sedimentary, and metamorphic rocks are converted into one another in stages?",
    options: ["rock cycle", "erosion cycle", "tectonic cycle", "magma cycle"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/183",
    recordId: "Mercury_SC_LBS10174",
    question: "What is happening when rocks are broken down by both physical and chemical changes?",
    options: ["decomposing", "deposition", "condensation", "weathering"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/184",
    recordId: "Mercury_7024780",
    question: "In a laboratory procedure, students added sodium hydroxide crystals to a beaker of water and allowed the resulting solution to cool. Based on this information, which type of chemical process most likely occurred?",
    options: ["electrical", "energetic", "exothermic", "endothermic"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/185",
    recordId: "Mercury_SC_404975",
    question: "Students are attempting to make a doorbell ring using some wire and a battery. What is needed to make the bell ring?",
    options: ["a convection current", "gravity", "an electrical circuit", "friction"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/186",
    recordId: "Mercury_7098928",
    question: "Which concept was most likely modified due to the invention of the microscope?",
    options: ["composition of living things", "number of the moons of Jupiter", "formation of sedimentary rocks", "size of subatomic particles"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/187",
    recordId: "Mercury_416501",
    question: "Which energy transformation occurs during active transport in a cell?",
    options: ["mechanical energy -> electrical energy", "kinetic energy -> potential energy", "chemical energy -> mechanical energy", "light energy -> chemical energy"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/188",
    recordId: "Mercury_SC_406012",
    question: "The nervous system consists of the brain, spinal cord, and nerves that run throughout the entire body. Which of these is one function of the nervous system?",
    options: ["supplies the blood with oxygen", "carries blood to and from the heart", "controls body functions", "supports body posture"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/189",
    recordId: "Mercury_SC_407192",
    question: "Which of these is most likely a result of using pesticides on farm crops?",
    options: ["air temperatures could increase", "caterpillars could become extinct", "water sources could become polluted", "rainfall levels could decrease"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/190",
    recordId: "Mercury_7239890",
    question: "The biological selection of a particular allele for a trait to be passed to offspring has nothing do with the selection of the allele for another trait. Which of the following supports this statement?",
    options: ["law of segregation", "law of recessiveness", "law of dominance", "law of independent assortment"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/191",
    recordId: "Mercury_7282135",
    question: "Air pollution can influence a person's quality of life. Which best identifies the influence of air pollution?",
    options: ["It is a dietary influence.", "It is a behavioral influence.", "It is an environmental influence.", "It is a genetic influence."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/192",
    recordId: "Mercury_184328",
    question: "What information about stars can be learned by using a spectrometer?",
    options: ["chemical composition", "distance from Earth", "size", "speed"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/193",
    recordId: "ACTAAP_2007_7_22",
    question: "Which is the function of the gallbladder?",
    options: ["store digestive enzymes", "produce digestive enzymes", "store bile", "produce bile"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/194",
    recordId: "MDSA_2010_8_43",
    question: "When trees are removed from a tropical rain forest, other plants and animals are affected. Which statement identifies another change that will most likely occur when a rain forest habitat is destroyed?",
    options: ["Oxygen levels will increase.", "The temperature of Earth will decrease.", "Carbon dioxide levels will increase.", "The air pollution in the atmosphere will decrease."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/195",
    recordId: "Mercury_7044520",
    question: "A student was given the volume and description of a substance and was asked to determine its density. What information is missing?",
    options: ["size", "melting point", "mass", "boiling point"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/196",
    recordId: "Mercury_SC_400518",
    question: "A geologist found several types of seashell fossils in a rock layer. Which is the best conclusion about the rock layer?",
    options: ["The rock was once sediment at the bottom of an ocean.", "The rock was once buried under a swamp.", "Migrating animals dropped the seashell into the rock.", "Water from a river washed across the rock."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/197",
    recordId: "Mercury_7205573",
    question: "All of the planets in the solar system formed at about the same time from a large cloud of gas and dust. How is Earth different from other planets in the solar system?",
    options: ["Earth's atmosphere is composed of gases.", "Earth has no natural satellites.", "Volcanoes release liquid rock onto Earth's surface.", "Water is found in all three phases on Earth."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/198",
    recordId: "Mercury_7222863",
    question: "When light reflects off certain crystals in the atmosphere, effects called halos appear. Which substance in the atmosphere forms these crystals?",
    options: ["sulfur dioxide", "water", "oxygen", "carbon dioxide"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/199",
    recordId: "NYSEDREGENTS_2015_4_19",
    question: "During which process do animals increase in size?",
    options: ["shedding", "repairing", "growing", "breathing"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/200",
    recordId: "Mercury_7121905",
    question: "In what form do plants store the energy produced from sunlight?",
    options: ["thermal", "radiant", "chemical", "mechanical"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/201",
    recordId: "LEAP__4_10226",
    question: "Carmine's mother drinks four cans of soft drink each day. After drinking the soft drinks, Carmine's mother should",
    options: ["crush the cans before putting them in the trash.", "send the cans to a landfill.", "take the cans to be recycled.", "throw the cans in the trash."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/202",
    recordId: "Mercury_7210018",
    question: "A student observes different characteristics of a rock. Which observation best describes a fact about the rock?",
    options: ["It has an interesting shape.", "It is made of several layers.", "It feels warm when touched.", "It has a nice surface."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/203",
    recordId: "ACTAAP_2013_7_13",
    question: "Xylem cells have very thick walls. They make up most of a tree trunk and its branches. What system in vertebrates provides the same function as the xylem cells in a tree?",
    options: ["the respiratory system", "the integumentary system", "the skeletal system", "the endocrine system"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/204",
    recordId: "MCAS_2014_8_11",
    question: "At one station in a production line, a worker must drill a hole in each end of wooden boards. At the next station, another worker attaches two of the boards together using metal fasteners that fit in the holes. Which of the following processes will ensure that the wooden boards fit together with the fewest errors?",
    options: ["inspecting the boards after they are attached to each other", "using a fixture to hold the boards in place as the holes are drilled", "placing the parts on a conveyor belt to keep them moving quickly", "installing equipment to protect workers from debris"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/205",
    recordId: "OHAT_2007_5_12",
    question: "A student places a ball on the ground and kicks it. The ball moves along the ground. Why does the ball move?",
    options: ["The kick decreases the force of gravity acting on the ball.", "The kick decreases the weight of the ball.", "The kick removes friction between the ball and the ground.", "The kick applies a contact force to the ball."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/206",
    recordId: "MCAS_2000_4_24",
    question: "Why do identical twins usually look like each other?",
    options: ["They have the same kinds of interests.", "They inherited the same characteristics from their parents.", "They were taught the same kinds of things at home.", "They were born on the same day."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/207",
    recordId: "MCAS_1999_8_31",
    question: "The process by which information is encoded, transmitted, stored, decoded, and retrieved is called",
    options: ["communication technology.", "transportation technology.", "manufacturing technology.", "construction technology."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/208",
    recordId: "Mercury_7212853",
    question: "Elements are organized on the periodic table according to",
    options: ["atomic number.", "electronegativity values.", "the number of neutrons.", "atomic mass."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/209",
    recordId: "Mercury_400808",
    question: "Chromium is characterized by a very high melting point. Use the Periodic Table of the Elements to identify which of these elements most likely has a similar melting point.",
    options: ["krypton", "manganese", "potassium", "bromine"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/210",
    recordId: "Mercury_404895",
    question: "A scientist finds a plant and states that it is a new species. Which is the best way to verify that it is a new species?",
    options: ["observe the plant with a microscope", "develop a theory about the plant", "compare the plant to other plants", "determine the best growing conditions for the plant"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/211",
    recordId: "MCAS_2000_8_19",
    question: "The bottom of the space shuttle is covered with ceramic tile. This material was chosen because it withstands",
    options: ["moisture.", "light.", "vibration.", "heat."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/212",
    recordId: "Mercury_415684",
    question: "What is the effect of absorption of infrared light by human skin?",
    options: ["sunburn on the skin surface", "feeling of warmth on the skin", "immediate death of skin cells", "disinfection of the skin tissues"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/213",
    recordId: "Mercury_7068705",
    question: "Some plants need to be in an environment where water drains easily. Which type of soil content will best benefit these plants?",
    options: ["shale", "sand", "clay", "silt"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/214",
    recordId: "MCAS_2011_5_17668",
    question: "Which of the following statements best describes sandy soils?",
    options: ["Sandy soils have high levels of decomposed plant and animal matter.", "Sandy soils easily break down into clay sediments.", "Sandy soils hold plant roots tightly in place to prevent erosion.", "Sandy soils allow water to drain quickly."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/215",
    recordId: "Mercury_402332",
    question: "What type of rock was the fossil most likely found in?",
    options: ["metamorphic", "igneous", "volcanic", "sedimentary"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/216",
    recordId: "Mercury_SC_400601",
    question: "Which source produces light from nuclear energy?",
    options: ["a stove burner", "a light bulb", "the Sun", "the Moon"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/217",
    recordId: "VASoL_2009_5_27",
    question: "A student rolls a ball on the ground. Which of these causes the ball to slow down and then stop?",
    options: ["The motion of the ball", "Friction from the ground", "The speed of the ball", "A magnetic field"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/218",
    recordId: "Mercury_7180705",
    question: "In the human body, the circulatory system works with the respiratory system by",
    options: ["transporting oxygen to organs.", "controlling the movement of the lungs.", "providing nutrients to muscles.", "producing red blood cells."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/219",
    recordId: "Mercury_SC_406153",
    question: "What kind of force do brakes use to stop a moving bicycle?",
    options: ["friction", "gravity", "push", "magnetic"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/220",
    recordId: "Mercury_SC_408919",
    question: "The first powerful telescopes were built during the early 1600s. Scientists at that time were able to learn more about which subject by using the telescope?",
    options: ["the effect of storms and hurricanes", "planets and moons in the solar system", "the shape of continents of Earth", "forces changing the surface of Earth"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/221",
    recordId: "Mercury_7024745",
    question: "A student wants to perform an experiment to determine what temperature is best for growing tomato plants. Which is the best piece of equipment to use in this experiment to measure the independent variable?",
    options: ["rain gauge", "thermometer", "light meter", "tape measure"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/222",
    recordId: "MDSA_2008_5_6",
    question: "Glaciers are slow-moving sheets of ice found on land. What process occurs when glacial ice is heated to 5° Celsius?",
    options: ["precipitation", "freezing", "melting", "evaporation"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/223",
    recordId: "Mercury_7090930",
    question: "Land subsidence (ground level dropping) is most likely an indication that",
    options: ["ground water is being depleted.", "rocks are being weathered.", "water is being polluted.", "sediments are being deposited."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/224",
    recordId: "Mercury_7033373",
    question: "The United States government limits the use of certain pesticides through laws passed in the Endangered Species Protection Program. Which is the most likely reason to enforce laws that limit pesticide use?",
    options: ["Some pesticides are expensive.", "Some pesticides give off foul odors.", "Some pesticides fail to control insects.", "Some pesticides can harm non-targeted species."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/225",
    recordId: "Mercury_SC_405219",
    question: "Refrigerators were invented to keep food cold. This is helpful in",
    options: ["growing food.", "keeping food fresh.", "keeping food dry.", "cleaning food."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/226",
    recordId: "Mercury_SC_402238",
    question: "What safety procedure should a student follow when a thermometer is broken during a lab experiment?",
    options: ["sweep the glass into a biohazard container", "stop the experiment immediately", "use a paper towel to pick up the pieces", "tell the teacher immediately"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/227",
    recordId: "Mercury_7215863",
    question: "Which process is most effective for separating sodium chloride from a saltwater solution?",
    options: ["chemical separation", "filtration", "evaporation", "magnetic separation"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/228",
    recordId: "Mercury_7041300",
    question: "Clear cutting of old growth forests in Oregon provides lumber for housing. In the process of clear cutting, plant diversity decreases and some organisms are pushed to extinction. Clear cutting is an example of",
    options: ["a change in aquatic conditions.", "a change in societal conditions.", "a change in atmospheric conditions.", "a change in environmental conditions."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/229",
    recordId: "Mercury_7190050",
    question: "El Niño is a term that refers to the oceanic phenomenon in which the surface water temperatures increase. The increase in water temperature usually occurs in the tropical Pacific Ocean. Which will most likely occur as a result of this phenomenon to cause environmental changes?",
    options: ["an increase in the length of summers", "varied atmospheric conditions", "an increase in volcanic eruptions", "melting of the polar ice caps"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/230",
    recordId: "MCAS_1999_4_10",
    question: "An animal that has thick fur, webbed feet, and blubber would probably live in the",
    options: ["Arctic Ocean.", "Intracoastal Waterway, Florida.", "Amazon Rain Forest.", "Mojave Desert, California."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/231",
    recordId: "Mercury_7222320",
    question: "The rover Spirit is a robotic probe that NASA has placed on Mars. The gravitational attraction of Mars is approximately 62% less than that of Earth. Compared to its measurements on Earth, on Mars the probe has",
    options: ["a smaller weight and the same mass.", "a larger weight, but smaller mass.", "the same weight and the same mass.", "a smaller mass and larger weight."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/232",
    recordId: "MCAS_2006_8_25",
    question: "Sal is looking at a map of Massachusetts. He has measured the distance, in inches, from Boston to Salem on the map. He wants to know how many actual miles the inches represent. What feature of the map should he look for?",
    options: ["key", "legend", "compass", "scale"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/233",
    recordId: "Mercury_7206605",
    question: "A hammer and a screwdriver are next to each other in the sunlight. After one hour, the hammer is hotter than the screwdriver. The shape and mass of each object may affect the amount of heat each object gains. Another explanation for the difference in temperature may be that the hammer and screwdriver are",
    options: ["made of different materials.", "moving at different rates.", "used for different purposes.", "picked up in different ways."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/234",
    recordId: "Mercury_SC_408336",
    question: "On January 15th, there were 10 hours and 24 minutes of daylight in Jacksonville, Florida. On the same day, there were only 9 hours and 37 minutes of daylight in New York City. Why did New York have fewer hours of daylight than Florida?",
    options: ["because Earth tilts on its axis", "because Earth rotates", "because gravity pulls Earth toward the Sun", "because the Moon reflects sunlight onto Earth"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/235",
    recordId: "Mercury_416579",
    question: "A euglena has a flagellum and a paramecium has cilia. Both types of organelles help these organisms move through the water. However, a paramecium can also use its cilia to perform another task. What is this task?",
    options: ["obtain food", "attach to a surface", "defend the cell", "perform conjugation"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/236",
    recordId: "Mercury_7001575",
    question: "Which characteristic of wolves is most likely learned?",
    options: ["social behavior", "litter size", "eyesight", "fur color"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/237",
    recordId: "Mercury_SC_416142",
    question: "Which would most help pollinators find flowers that are pollinated at night?",
    options: ["fragrance", "size", "shape", "color"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/238",
    recordId: "MCAS_1998_8_19",
    question: "A solar eclipse occurs when",
    options: ["Earth's shadow falls on the Sun.", "the first four planets in the solar system are aligned.", "Earth blocks the Moon from the Sun.", "the Moon blocks the Earth from the Sun."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/239",
    recordId: "Mercury_SC_400187",
    question: "Which process turns a large rock into a pile of smaller stones?",
    options: ["fossilizing", "weathering", "deposition", "sedimentation"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/240",
    recordId: "TIMSS_2011_8_pg74",
    question: "Where are the active volcanoes most likely to be found?",
    options: ["where oceans are deepest", "where land and water meet", "where tectonic plates meet", "where rivers form"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/241",
    recordId: "Mercury_7013458",
    question: "During its lifetime, a star will evolve through several stages. In which stage does a star spend most of its life?",
    options: ["main sequence", "red giant", "red dwarf", "white dwarf"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/242",
    recordId: "CSZ30768",
    question: "Which of the following elements is best able to combine with itself and hydrogen [H] to form large molecules?",
    options: ["sulfur [S]", "lithium [Li]", "sodium [Na]", "carbon [C]"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/243",
    recordId: "MCAS_2004_9_10",
    question: "Which of the following is designed to transform an electromagnetic wave into a mechanical wave?",
    options: ["a television screen", "a portable radio", "a mercury thermometer", "a computer monitor"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/244",
    recordId: "AIMS_2009_4_25",
    question: "Four students tried to find out which magnet was the strongest. They each shared one idea. Which idea shows scientific thinking?",
    options: ["We can vote for the magnet that we think is the strongest.", "We can pick the longest magnet.", "We can pick the heaviest magnet.", "We can measure the strength of the magnets."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/245",
    recordId: "Mercury_7221498",
    question: "Energy is transferred in an electrical circuit through",
    options: ["static protons.", "moving electrons.", "static electrons.", "moving protons."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/246",
    recordId: "Mercury_7170853",
    question: "The life cycle of a star includes formation, life, and death. In the Universe, where do new stars originate?",
    options: ["in molecular clouds of gas", "from large fragments of antimatter", "from fusion in red giants", "in radiation from black holes"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/247",
    recordId: "Mercury_7109690",
    question: "What would be the initial result if a DNA molecule did not replicate accurately?",
    options: ["immediate death of the organism", "incorrect protein synthesis", "infertility of the organism", "increase in reproduction rate"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/248",
    recordId: "Mercury_SC_400525",
    question: "Photosynthesis and respiration are both parts of which cycle?",
    options: ["rock cycle", "carbon cycle", "phosphorous cycle", "nitrogen cycle"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/249",
    recordId: "Mercury_SC_LBS10616",
    question: "Earth is tilted as it travels around the Sun. The tilt changes the amount of energy each area gets from the Sun, which makes some months of the year warmer than others. What are the four main temperature changes in a year called?",
    options: ["quarters", "seasons", "climate", "weather"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/250",
    recordId: "MCAS_2000_4_21",
    question: "If your hands are cold, you can warm them by rubbing them together. The heat energy that you produce is caused by",
    options: ["insulation.", "friction.", "conduction.", "magnetism."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/251",
    recordId: "MCAS_1999_8_9",
    question: "Large amounts of industrial gases are released into the atmosphere every day. What happens to those gases?",
    options: ["They are converted into nitrogen and oxygen.", "They rise through the atmosphere and go into outer space.", "They are broken down by ultraviolet light from the Sun.", "They remain in the atmosphere for long periods of time."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/252",
    recordId: "Mercury_415265",
    question: "In which way is a prokaryotic cell different from a eukaryotic cell?",
    options: ["A prokaryotic cell has no nucleus.", "A prokaryotic cell has a cell membrane.", "A prokaryotic cell is larger.", "A prokaryotic cell can reproduce itself."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/253",
    recordId: "AKDE&ED_2008_8_20",
    question: "What is a primary role of decomposers in an ecosystem?",
    options: ["They cycle matter by returning carbon and other matter to the ecosystem.", "They cycle matter by returning oxygen and other matter to the ecosystem.", "They eliminate matter by taking phosphorus from the ecosystem.", "They eliminate matter by taking nitrogen from the ecosystem."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/254",
    recordId: "Mercury_415545",
    question: "What chemical symbol represents the element copper?",
    options: ["Cu", "Cp", "C", "Co"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/255",
    recordId: "AIMS_2008_4_6",
    question: "Meteorologists study weather. Which of the following should meteorologists know about?",
    options: ["types of adaptations", "types of circuits", "types of fossils", "types of fronts"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/256",
    recordId: "TIMSS_1995_8_L7",
    question: "The crews of two boats at sea can communicate with each other by shouting. Why is it impossible for the crews of two spaceships a similar distance apart in space to do this?",
    options: ["The spaceships are traveling faster than sound.", "There is no air in space for the sound to travel through.", "The pressure is too high inside the spaceships.", "The sound is reflected more in space."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/257",
    recordId: "Mercury_SC_401161",
    question: "Which liquid most likely contains a dissolved gas?",
    options: ["whole milk", "house paint", "mud puddle", "carbonated soda"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/258",
    recordId: "Mercury_7086765",
    question: "Silica sand is a resource used in large volume in Nevada. This resource is used to make which product?",
    options: ["glass", "electricity", "plastic", "tar"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/259",
    recordId: "Mercury_183768",
    question: "Which of these best describes the function of the skeletal system?",
    options: ["transports oxygen and nutrients throughout the body", "removes harmful wastes from the cells of the body", "breaks down food into a form that cells can use", "supports and protects tissues and organs"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/260",
    recordId: "TAKS_2009_5_6",
    question: "A student wants to find out how many different kinds of birds are found in a park. In addition to a bird identification book, the student should use ___.",
    options: ["a hand lens", "goggles", "binoculars", "a microscope"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/261",
    recordId: "Mercury_7222775",
    question: "Nevada mines produce greater quantities of a particular resource than any other state. What resource is produced from these mines?",
    options: ["copper", "zinc", "gold", "lead"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/262",
    recordId: "VASoL_2008_5_20",
    question: "A student throws a ball. Which of these best describes the moving ball?",
    options: ["The ball has light energy.", "The ball is transferring light energy to the air.", "The ball is transferring sound energy to the air.", "The ball has kinetic energy."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/263",
    recordId: "MEA_2010_8_9-v1",
    question: "During which process does genetic material come from two parents?",
    options: ["photosynthesis", "asexual reproduction", "sexual reproduction", "respiration"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/264",
    recordId: "Mercury_7268030",
    question: "Which of these is a threat to the survival of an ecosystem?",
    options: ["a shrinking variety of animal and plant species", "predator-prey population cycles", "less biomass at higher levels of the food web", "competition among some consumer populations"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/265",
    recordId: "NYSEDREGENTS_2012_8_5",
    question: "Which human organ system produces most of the hormones that regulate body functions?",
    options: ["nervous", "muscular", "endocrine", "digestive"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/266",
    recordId: "Mercury_7239138",
    question: "The complex, three-dimensional structure of a protein is sensitive to heat because the structure is maintained by",
    options: ["Brownian motion.", "magnetic fields.", "hydrogen bonds.", "covalent bonds."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/267",
    recordId: "Mercury_SC_400662",
    question: "A few types of birds live in the same ecosystem. Which of these characteristics would most likely affect how they compete with each other for food?",
    options: ["the types of nests they build", "the colors of their feathers", "the lengths of their tails", "the shapes of their beaks"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/268",
    recordId: "Mercury_414097",
    question: "Most of the United States is a part of which tectonic plate?",
    options: ["Eurasian Plate", "North American Plate", "South American Plate", "Pacific Plate"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/269",
    recordId: "Mercury_7083598",
    question: "At one time, scientists believed that living organisms came from nonliving objects. This theory was revised through",
    options: ["information published in books.", "advances in the scientific method.", "evidence from experiments.", "changes in popular belief."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/270",
    recordId: "MSA_2012_8_36",
    question: "The human body is composed of different systems made of specialized cells, tissues, and organs. Each of these structures has a specific function that aids in the survival of the human species. What is the primary function of the excretory system?",
    options: ["to enable movement", "to help in defense", "to eliminate waste", "to digest food"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/271",
    recordId: "VASoL_2011_5_36",
    question: "Which is the best tool for measuring the temperature of lake water?",
    options: ["Thermometer", "Graduated cylinder", "Balance", "Meter stick"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/272",
    recordId: "VASoL_2010_3_13",
    question: "The teeth of a carnivore are MOSTLY -",
    options: ["pointed", "wide", "rounded", "flat"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/273",
    recordId: "Mercury_405141",
    question: "Panels of solar cells are used to collect energy from the Sun and convert it into energy for use in homes. Into what type of energy is the solar energy converted?",
    options: ["electrical", "chemical", "geothermal", "hydroelectric"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/274",
    recordId: "Mercury_7026968",
    question: "A student wants to estimate the number of dandelion plants growing in a field. He counts the number of plants in a 5 square meter section of the field. What other information should he obtain to make his estimate?",
    options: ["energy and nutrient requirements of dandelions", "the total area of the field", "all the organisms living in the field", "average rainfall in the area"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/275",
    recordId: "Mercury_7234395",
    question: "Overuse of which water resource tends to cause land to subside?",
    options: ["ocean water", "river water", "aquifer water", "lake water"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/276",
    recordId: "Mercury_402535",
    question: "Students are preparing to determine the boiling points of several aqueous solutions. In addition to proper lab attire, what devices or instruments will the students need to conduct this experiment?",
    options: ["balance, hot plate, thermometer", "thermometer, hot plate, beaker", "hot plate, beaker, masking tape", "matches, beaker, thermometer"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/277",
    recordId: "MDSA_2011_8_2",
    question: "One solar day on Jupiter lasts only 9 hours and 50 minutes. What causes a solar day?",
    options: ["rotational speed of the planet", "diameter of the orbit of a planet around the sun", "diameter of the planet", "speed of a planet in orbit around the sun"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/278",
    recordId: "Mercury_7086783",
    question: "The finest-grained soils are richest in",
    options: ["humus.", "sand.", "clay.", "iron."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/279",
    recordId: "Mercury_SC_405164",
    question: "Wind and water are examples of renewable energy sources because",
    options: ["they are always available to produce energy.", "they take millions of years to start producing energy.", "they will stop producing energy.", "they were formed millions of years ago."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/280",
    recordId: "Mercury_7018340",
    question: "Gregor Mendel contributed to the study of biology by the careful, objective study of",
    options: ["bacteria.", "heredity.", "pedigrees.", "environment."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/281",
    recordId: "Mercury_7240923",
    question: "Which statement describes the most likely effect of transformation on bacteria such as E. coli?",
    options: ["Transformed bacteria have multiple chromosomes.", "Transformed bacteria express a new protein product.", "Transformed bacteria reproduce more quickly.", "Transformed bacteria become a new species."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/282",
    recordId: "Mercury_SC_401122",
    question: "A metal pan will heat up quickly when placed over a gas or electric burner. The metal pan is a good",
    options: ["conductor.", "resistor.", "accelerator.", "insulator."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/283",
    recordId: "Mercury_7080465",
    question: "Which is a fact rather than an opinion about earthquakes?",
    options: ["Earthquakes are worse than hurricanes.", "Earthquakes always cause major damage to homes.", "Earthquakes occur along fault lines.", "Earthquakes are bad for all local businesses."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/284",
    recordId: "ACTAAP_2014_7_4",
    question: "Which statement best describes the development of a human embryo?",
    options: ["Many cells combine to form one cell.", "All the cells have the same function.", "Each cell has a different function.", "A single cell becomes many cells."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/285",
    recordId: "Mercury_7267540",
    question: "Which of these natural disasters is least likely to cause major damage to a prairie ecosystem?",
    options: ["a hurricane", "a flood", "an earthquake", "a tornado"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/286",
    recordId: "Mercury_SC_406684",
    question: "The life cycle of a beetle is similar to the butterfly. Which process changes the beetle from larva to adult?",
    options: ["migration", "photosynthesis", "molting", "metamorphosis"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/287",
    recordId: "Mercury_SC_401771",
    question: "Which adaptation helps a bird fly?",
    options: ["longer beaks", "bigger eyes", "larger feet", "hollow bones"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/288",
    recordId: "Mercury_7228690",
    question: "Scientists are able to correlate time and the amount of difference between homologous genes when studying the divergence of two species because scientists have reliable estimates for which value?",
    options: ["number of bases in species' genomes", "rate of genetic mutations", "pressure of selection on base pairs", "survival benefit of specific genes"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/289",
    recordId: "Mercury_7216720",
    question: "Which of the following is a part of the process of sexual reproduction?",
    options: ["pollination", "budding", "fragmentation", "regeneration"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/290",
    recordId: "Mercury_7057785",
    question: "Why are diseases transmitted through the bites of infected animals not considered contagious diseases?",
    options: ["The person in direct contact is the only one infected.", "Humans do not become sick from animal diseases.", "The infected animals do not show symptoms.", "The diseases are treatable with antibiotics."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/291",
    recordId: "Mercury_7236495",
    question: "Scientists theorize that the original atmosphere of Earth was stripped away by the solar wind shortly after the formation of the planet. The Jovian planets are far enough from the Sun that the solar wind has less of an impact. Studies of the Jovian planets suggest the early atmosphere of Earth was mainly composed of which two gases?",
    options: ["carbon dioxide and nitrogen", "oxygen and argon", "sulfur dioxide and water vapor", "hydrogen and helium"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/292",
    recordId: "NYSEDREGENTS_2013_8_9",
    question: "Which human body systems work directly together to allow locomotion?",
    options: ["circulatory, endocrine, and reproductive", "skeletal, digestive, and respiratory", "circulatory, excretory, and respiratory", "skeletal, muscular, and nervous"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/293",
    recordId: "MCAS_2000_8_24",
    question: "Which is the best evidence for the theory of continental drift?",
    options: ["cases where a species exists in only one isolated place", "earthquakes at boundaries where one plate slides past another", "fossils of the same species found on widely separated continents", "the appearance of volcanoes at the boundaries where plates collide"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/294",
    recordId: "Mercury_SC_400298",
    question: "Students go on a field trip to observe salmon spawning in a river. For safety reasons, the students should not",
    options: ["take notes.", "bring water.", "explore alone.", "listen to instructions."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/295",
    recordId: "Mercury_7026425",
    question: "Which of the following involves a learned behavior?",
    options: ["having white feathers on the throat", "avoiding insects that taste bad", "having hollow, light-weight bones", "laying eggs to reproduce"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/296",
    recordId: "MCAS_2006_9_13-v1",
    question: "Which of the following colors of visible light has the longest wavelength?",
    options: ["red", "blue", "green", "orange"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/297",
    recordId: "Mercury_SC_402084",
    question: "Which is an example of a form of electrical energy?",
    options: ["sound waves", "lightning", "radio waves", "windmill"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/298",
    recordId: "Mercury_405595",
    question: "Which of the following lists units of length from smallest to largest?",
    options: ["kilometer, angstrom, light-year, astronomical unit", "light-year, astronomical unit, kilometer, angstrom", "angstrom, kilometer, astronomical unit, light-year", "astronomical unit, angstrom, kilometer, light-year"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/299",
    recordId: "MDSA_2013_8_2",
    question: "Each layer of Earth has different properties. Which statement best describes the mantle of Earth?",
    options: ["The mantle temperature is lower than the crust temperature.", "The mantle lies below the core.", "The mantle is composed of hot gases.", "The mantle lies between the core and the crust."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/300",
    recordId: "Mercury_7213868",
    question: "Which of these is the best example of sexual reproduction?",
    options: ["fragmentation", "binary fission", "fusing gametes", "budding"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/301",
    recordId: "Mercury_416375",
    question: "Which of these events during a storm at sea can add oxygen from the atmosphere to ocean water?",
    options: ["pressure change", "lightning", "temperature change", "high winds"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/302",
    recordId: "VASoL_2011_5_34",
    question: "Which layer of Earth is the thinnest?",
    options: ["Inner core", "Crust", "Outer core", "Mantle"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/303",
    recordId: "Mercury_411731",
    question: "Based on the Periodic Table of the Elements, which of these elements has properties most similar to calcium (Ca)?",
    options: ["manganese [Mn]", "sodium [Na]", "carbon [C]", "barium [Ba]"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/304",
    recordId: "TAKS_2009_8_24",
    question: "As a river enters a larger body of water, sediments are deposited over a wide area. Which of these landforms is likely to be formed at the site of deposition?",
    options: ["Valley", "Cave", "Mountain", "Delta"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/305",
    recordId: "Mercury_7018060",
    question: "Which of these is a chemical property of a material?",
    options: ["color", "flammability", "brittleness", "density"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/306",
    recordId: "Mercury_SC_402044",
    question: "About how long is a lunar cycle?",
    options: ["1 day", "1 week", "28 days", "52 weeks"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/307",
    recordId: "Mercury_178938",
    question: "Of the following types of cells, which has the highest concentration of mitochondria?",
    options: ["muscle", "nerve", "bone", "skin"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/308",
    recordId: "Mercury_SC_416166",
    question: "What helps skin feel heat and pressure?",
    options: ["muscle cells", "nerve cells", "bone cells", "blood cells"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/309",
    recordId: "FCAT_2008_5_7",
    question: "Erosion and weathering can both cause changes to the surface of Earth. Which of the following happens only because of erosion and NOT because of weathering?",
    options: ["Rocks become smooth and round.", "Rocks form deep underground.", "Rocks are moved from one place to another.", "Rocks are broken apart into small pieces."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/310",
    recordId: "ACTAAP_2013_7_15",
    question: "Which is an advantage of sexual reproduction in the survival of a population?",
    options: ["reduces the number of genes", "prevents mutation", "creates competition between siblings", "maintains genetic diversity"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/311",
    recordId: "MCAS_8_2015_14",
    question: "A species of moth in England has both a light-colored form and a dark-colored form. In the mid-1800s, the percentage of dark-colored moths increased in areas where black soot from factories covered the trees. The soot in these areas has decreased in more recent times as a result of pollution laws. Which of the following statements describes what has most likely happened to the moth populations in these areas?",
    options: ["The percentage of light-colored moths in the populations decreased.", "The moth populations migrated south.", "The moth populations went extinct.", "The percentage of dark-colored moths in the populations decreased."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/312",
    recordId: "MCAS_2004_5_32",
    question: "Energy appears in many forms. What form of energy is lightning?",
    options: ["magnetic energy", "mechanical energy", "electrical energy", "sound energy"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/313",
    recordId: "Mercury_SC_401214",
    question: "People take in and release gases from the air when they breathe. Which exhaled gas is a waste product of respiration?",
    options: ["oxygen", "carbon dioxide", "hydrogen", "helium"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/314",
    recordId: "Mercury_7074953",
    question: "A unicellular organism is best described as being",
    options: ["an organism with different types of tissues.", "an organism with specialized cells.", "a microorganism.", "a complex organism."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/315",
    recordId: "MCAS_2008_5_5632",
    question: "Which of the following best describes how plants use the energy they receive from sunlight?",
    options: ["They change water into heat.", "They make minerals for their roots.", "They produce their own food.", "They break down nutrients into rocks."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/316",
    recordId: "Mercury_400556",
    question: "What can be inferred from a food product advertisement that claims \"30% less fat than our leading competitors\"?",
    options: ["It is the healthiest choice available.", "The fat content of the item is reduced.", "It will help a person lose weight.", "It is a sugar-free product."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/317",
    recordId: "NAEP_2009_4_S11+1",
    question: "Which material is the best conductor of electricity?",
    options: ["Wood", "Plastic", "Stone", "Metal"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/318",
    recordId: "CSZ30263",
    question: "A ball is dropped from the top of a tall building. As the ball falls, the upward force of air resistance becomes equal to the downward pull of gravity. When these two forces become equal in magnitude, the ball will",
    options: ["continue to speed up.", "slow to a stop.", "flatten due to the forces.", "fall at a constant speed."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/319",
    recordId: "MEA_2014_8_2",
    question: "Which statement describes an interaction between the hydrosphere and the atmosphere?",
    options: ["Lava from an underwater volcano cools to form a mountain.", "Ashes rise from a volcanic eruption to block sunlight.", "Water vapor rises from the ocean to form clouds.", "Flowing water carves through rock to form a canyon."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/320",
    recordId: "Mercury_179200",
    question: "Often organisms seem similar in their outward appearances. For example, a porpoise and a shark seem closely related, but they are not. Such similarity is the result of",
    options: ["genetic equilibrium.", "artificial selection.", "convergent evolution.", "adaptive radiation."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/321",
    recordId: "Mercury_SC_407706",
    question: "A group of frogs live together near a small pond. The frogs compete with each other most for which resource?",
    options: ["plants", "sunlight", "air", "insects"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/322",
    recordId: "Mercury_7090755",
    question: "Which process converts organic nitrogen into an inorganic form that can be used by plants?",
    options: ["sedimentation", "absorption", "decomposition", "radiation"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/323",
    recordId: "Mercury_406811",
    question: "In animals, female traits are passed down to offspring from",
    options: ["eggs.", "sperm.", "pollen.", "seeds."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/324",
    recordId: "Mercury_7082670",
    question: "The visible light spectrum can be subdivided according to",
    options: ["the types of waves.", "the sizes of particles.", "a type of energy.", "a range of colors."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/325",
    recordId: "Mercury_7124320",
    question: "Three scientists conducted the same experiment to analyze the effectiveness of a cleaning agent on household bacteria. What is the main advantage of having the experiment repeated?",
    options: ["More bacteria will be destroyed.", "The results will be more reliable.", "A scientific journal will publish their work.", "The conclusion will lead to new discoveries."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/326",
    recordId: "Mercury_SC_409251",
    question: "Today, almost all cars have seat belts. How does improving the design of seat belts help people the most?",
    options: ["It increases the speed at which cars can travel.", "It decreases injuries to passengers in cars.", "It increases the comfort of passengers in cars.", "It decreases the cost of cars."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/327",
    recordId: "MEA_2014_5_15",
    question: "Which type of organism is made of one cell?",
    options: ["fern", "fish", "trees", "bacteria"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/328",
    recordId: "WASL_2003_5_8",
    question: "At camp, Raj sees a lightning storm. He sees the lightning before he hears the thunder. What does this show?",
    options: ["Light moves faster than sound", "Light moves slower than sound", "Light and sound move at the same speed"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/329",
    recordId: "Mercury_7106610",
    question: "What advantage do the offspring of a dandelion have by reproducing asexually?",
    options: ["Reproductive competition is increased.", "Diversity increases between generations.", "Reproduction occurs rapidly.", "Mating compatibility improves."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/330",
    recordId: "MCAS_2010_8_12012",
    question: "Which of the following statements best describes a result of using interchangeable parts to manufacture automobiles?",
    options: ["The automobiles wear out quickly.", "The automobiles can be produced on an assembly line.", "The automobiles are identical.", "The automobiles are difficult to design."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/331",
    recordId: "MCAS_2010_8_12019",
    question: "A stone arch bridge relies primarily on which of the following for its load strength?",
    options: ["compression", "tension", "torsion", "bending"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/332",
    recordId: "Mercury_7159425",
    question: "After a storm, a hospital may have to rely on backup generators to power some equipment. Which is the energy conversion provided by the generators?",
    options: ["nuclear energy to mechanical energy", "thermal energy to electrical energy", "mechanical energy to electrical energy", "thermal energy to mechanical energy"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/333",
    recordId: "Mercury_192343",
    question: "Many flowers attract bees. Bees consume nectar from the flower for energy. How does this interaction benefit the plant?",
    options: ["by pollinating it", "by reducing competition", "by increasing photosynthesis", "by limiting growth"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/334",
    recordId: "NYSEDREGENTS_2012_8_9",
    question: "In living things, traits are passed on from one generation to the next by the transfer of",
    options: ["blood", "Calories", "minerals", "DNA"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/335",
    recordId: "Mercury_SC_405783",
    question: "Every organism in an ecosystem receives energy from another source. Which of these organisms receives its energy directly from the Sun?",
    options: ["grass", "fungus", "deer", "hawk"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/336",
    recordId: "ACTAAP_2013_7_1",
    question: "Aristotle taught that a force was always required to keep an object moving. Which of the following states what Newton believed?",
    options: ["Aristotle was correct for objects on Earth but not in space.", "Aristotle was correct.", "A moving object will eventually stop even though an unbalanced force keeps pushing on it.", "An object will keep moving unless an unbalanced force stops it."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/337",
    recordId: "MDSA_2008_8_13",
    question: "The solar system containing Earth consists of a sun and planets. Which statement best describes the motion of the planets in our solar system?",
    options: ["The sun revolves around the planets.", "The sun rotates around the planets.", "The planets rotate around the sun.", "The planets revolve around the sun."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/338",
    recordId: "MDSA_2011_5_35",
    question: "Animal wastes contain bacteria that make organisms sick. These wastes are often washed into water supplies by storms. How might a pet owner prevent these bacteria from polluting water supplies?",
    options: ["Feed pets food that produces less waste.", "Brush the pet daily to remove bacteria.", "Wash the pet with shampoo to kill the bacteria.", "Bag the pet waste and throw it in the trash."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/339",
    recordId: "MCAS_2005_8_17",
    question: "Which of the following is performed by the quality control division of a company that is manufacturing a chair?",
    options: ["inspecting the finish", "cutting the material", "assembling the parts", "applying the varnish"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/340",
    recordId: "VASoL_2009_5_24",
    question: "Which type of storm causes the most flooding in areas located near an ocean coastline?",
    options: ["Blizzard", "Tornado", "Hurricane", "Freezing rain"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/341",
    recordId: "LEAP_2008_4_10287",
    question: "Anne and her father find a 30-million year-old tropical plant fossil in Louisiana. Which question does the fossil help them answer?",
    options: ["Were there mountains in Louisiana 30 million years ago?", "What kind of animals lived in Louisiana 30 million years ago?", "What was the climate like in Louisiana 30 million years ago?", "Were there earthquakes in Louisiana 30 million years ago?"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/342",
    recordId: "Mercury_192868",
    question: "In the Four Corners area in the US Southwest, there are large rocky outcroppings of basalt. These were formed by ancient lava flows. Using this information, what class of rock is this?",
    options: ["metamorphic", "igneous", "sedimentary", "weathered"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/343",
    recordId: "MCAS_2004_8_22",
    question: "The heath hen, an extinct small wild fowl, was a relative of the prairie chicken. Which of the following most likely caused extinction of the heath hen?",
    options: ["abundant nesting sites", "overhunting", "plentiful food supply", "stable climate"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/344",
    recordId: "Mercury_7013195",
    question: "A stationary air mass over the Gulf of Mexico would typically be",
    options: ["cool and humid.", "warm and humid.", "cool and dry.", "warm and dry."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/345",
    recordId: "MCAS_2010_5_14",
    question: "Which of the following metals will be attracted to a magnet?",
    options: ["iron", "silver", "copper", "gold"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/346",
    recordId: "Mercury_7220343",
    question: "A student wants to create a drawing of the water cycle. Which image can the student use to represent water cycling through the atmosphere?",
    options: ["a frozen lake", "a stream", "a drop of dew", "a cloud"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/347",
    recordId: "TIMSS_1995_8_K16",
    question: "Which is made with the help of bacteria?",
    options: ["Soap", "Cream", "Yogurt", "Cooking oil"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/348",
    recordId: "Mercury_SC_408031",
    question: "Lamar learned that birds, mammals, and reptiles are all vertebrates. Which characteristic do all vertebrates share?",
    options: ["They all have feathers.", "They all have a backbone.", "They are all warm-blooded.", "They all lay eggs."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/349",
    recordId: "Mercury_7015925",
    question: "Which of these is most likely to create large areas of land subsidence?",
    options: ["global warming", "greenhouse effect", "extraction of ground water", "eruptions of volcanoes"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/350",
    recordId: "Mercury_7085873",
    question: "Which of the following best describes two atoms of oxygen that are chemically bonded to each other?",
    options: ["molecule", "mixture", "compound", "solution"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/351",
    recordId: "Mercury_7217035",
    question: "If the climate in an area were to become much drier, which plant variation would be most advantageous to the survival of the species?",
    options: ["bigger branches", "larger flowers", "longer stems", "thicker leaves"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/352",
    recordId: "Mercury_7003728",
    question: "Which form of energy is in firewood?",
    options: ["kinetic", "potential", "sound", "light"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/353",
    recordId: "TIMSS_2003_4_pg10",
    question: "What covers most of the Earth's surface?",
    options: ["Bare rock", "Farm land", "Water", "Cities and towns"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/354",
    recordId: "Mercury_SC_401120",
    question: "Which tool is best used to observe a soil sample?",
    options: ["telescope", "compass", "camera", "hand lens"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/355",
    recordId: "Mercury_407132",
    question: "A student walks along a trail by a lake on a cool summer morning. Which statement is an observation the student could make?",
    options: ["The water is too cold for swimming.", "The temperature of the air is rising because the Sun is out.", "Fog is rising from the lake.", "The water is cold because it comes from melted snow."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/356",
    recordId: "Mercury_7074988",
    question: "Eating food that is undercooked can lead to a disease that affects the digestive system. Which body part is directly affected by the disease?",
    options: ["arteries", "intestines", "sinuses", "nerves"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/357",
    recordId: "Mercury_7227798",
    question: "Which property supports the hypothesis that eukaryotic mitochondria were once prokaryotic organisms?",
    options: ["They lack a mechanism of motility.", "They lack genetic material.", "They lack internal membrane-bound organelles.", "They lack a need for proteins in their life functions."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/358",
    recordId: "Mercury_SC_401827",
    question: "Metals that easily transfer electricity are called",
    options: ["insulators.", "resistors.", "conductors.", "magnets."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/359",
    recordId: "Mercury_SC_401403",
    question: "Animals and plants need oxygen to live. Oxygen is released in photosynthesis. Which cycle includes photosynthesis?",
    options: ["the nitrogen cycle", "the carbon cycle", "the rock cycle", "the water cycle"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/360",
    recordId: "MDSA_2010_5_19",
    question: "The Statue of Liberty was built in France and then taken apart into 350 pieces for shipping. When the pieces arrived in New York, the statue was put together. Which statement describes the relationship between the mass of the 350 pieces and the mass of the whole statue?",
    options: ["The mass of the statue is greater than the mass of the pieces.", "The mass of the statue is not related to the mass of the pieces.", "The mass of the pieces is the same as the mass of the statue.", "The mass of the pieces is greater than the mass of the statue."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/361",
    recordId: "MEA_2014_5_12",
    question: "Which statement describes the weather when water droplets in clouds become heavy and the temperature is 20°C (68°F)?",
    options: ["It is raining.", "It is sunny and clear.", "It is snowing.", "It is clear and breezy."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/362",
    recordId: "MSA_2012_5_22",
    question: "Scientists use different tools during their investigations. What tool does a scientist use to study cells?",
    options: ["a centimeter ruler", "a balance", "a microscope", "a graduated cylinder"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/363",
    recordId: "Mercury_SC_407577",
    question: "Snowy owls live in very cold areas. Which adaptation is most likely a result of living in this type of environment?",
    options: ["curved beaks", "sharp claws", "large, yellow eyes", "thick, white feathers"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/364",
    recordId: "Mercury_401760",
    question: "Sodium bicarbonate (NaHCO_{3}) will neutralize stomach acid (HCl) in a double replacement reaction as follows: NaHCO_{3} + HCl -> NaCl + CO_{2} + \\Box What is the product necessary to make this reaction complete?",
    options: ["H_{2}O_{2}", "2HO", "H_{2}O", "HO_{2}"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/365",
    recordId: "NYSEDREGENTS_2015_8_33",
    question: "Heat transfer by conduction occurs when molecules",
    options: ["form waves that travel through space", "flow as currents through liquids", "become less dense and rise", "collide with other molecules"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/366",
    recordId: "TIMSS_2007_8_pg34",
    question: "The color of an object such as an apple is the same as the color the light waves",
    options: ["that travel through the object", "that travel around the object", "that are absorbed by the object", "that are reflected by the object"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/367",
    recordId: "Mercury_7090633",
    question: "What causes the tectonic plates of Earth to continually move?",
    options: ["rotation of the solid core", "strong winds and storms", "convection currents in the mantle", "volcanic and seismic activity in the crust"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/368",
    recordId: "Mercury_404924",
    question: "Which is the correct order in the process of sedimentary rock formation?",
    options: ["compaction, erosion, cementation, deposition", "compaction, weathering, erosion, cementation", "weathering, erosion, deposition, compaction", "weathering, deposition, cementation, burial"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/369",
    recordId: "Mercury_7218488",
    question: "The discovery of tectonic plates and the cause of their movement is best described as a result of which scientific procedure?",
    options: ["methodical testing of a valid hypothesis statement", "direct observation of the important properties of the Earth system", "inquiry into the causes of observed geological phenomena", "controlled laboratory experimentation on a simulation of geological systems"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/370",
    recordId: "NYSEDREGENTS_2010_8_12",
    question: "Cancer is most often the result of",
    options: ["natural selection", "bacterial infection", "biological adaptation", "abnormal cell division"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/371",
    recordId: "MDSA_2011_4_16",
    question: "All organisms need food to survive. Which statement best describes the purpose of food for organisms?",
    options: ["Food provides skin color.", "Food provides oxygen for life.", "Food provides energy for growth.", "Food provides water for energy."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/372",
    recordId: "VASoL_2008_3_33",
    question: "Soil is important to a forest because the soil ___.",
    options: ["attracts insects that eat leaves", "provides nutrients to the trees", "warms the air around the trees", "stores sunlight in the leaves"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/373",
    recordId: "Mercury_7247853",
    question: "How do muscles and bones work together to create body movement?",
    options: ["Muscles grow at the same rate as bones.", "The muscles pull on the bones.", "The muscles protect the bones.", "Muscles send electrical impulses to bones."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/374",
    recordId: "Mercury_7094553",
    question: "Biologists moved a predator from sea level to a higher altitude, where they noticed that the predator became tired more quickly. If this predator had to live at a higher altitude, which adaptation would be necessary for it to survive?",
    options: ["production of more red blood cells", "increased digestion rate", "reduction of respiration rate", "growth of additional teeth"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/375",
    recordId: "Mercury_SC_415492",
    question: "Ernie made a diagram to model Earth's orbit. What shape is most like what Ernie drew for the orbit?",
    options: ["oval", "square", "rectangle", "triangle"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/376",
    recordId: "Mercury_7135853",
    question: "Classification of galaxies is based on which characteristic?",
    options: ["the shape of the galaxy", "the color of the galaxy", "how many stars make up the galaxy", "how many planets make up the galaxy"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/377",
    recordId: "Mercury_400363",
    question: "Which physical characteristic of a puppy is most likely inherited from its parents?",
    options: ["body weight", "desire to play fetch", "ability to follow commands", "coat color"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/378",
    recordId: "NYSEDREGENTS_2008_8_10",
    question: "A scientist crosses two different varieties of corn to produce a single variety that has traits from both parents. This technique is an example of",
    options: ["ecological succession", "competition", "natural selection", "selective breeding"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/379",
    recordId: "Mercury_SC_415584",
    question: "A class measures the time it takes for two different trucks to drive across the parking lot. How can they tell which truck is faster?",
    options: ["The truck that takes less time is faster.", "The truck that has bigger tires is faster.", "The truck that takes more time is faster.", "The truck that starts moving first is faster."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/380",
    recordId: "TIMSS_2003_4_pg12",
    question: "The fossils of dinosaurs that lived millions of years ago can be found in",
    options: ["the ice on ponds.", "rocks in the ground.", "the trunks of trees.", "the water of oceans."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/381",
    recordId: "AIMS_2008_4_18",
    question: "Which of the following contains salt water?",
    options: ["raindrops", "polar icecaps", "oceans", "groundwater"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/382",
    recordId: "Mercury_7246960",
    question: "During digestion, fructose is produced by the breakdown of larger molecules. Which type of molecule could be broken down to increase the body's fructose levels?",
    options: ["proteins", "carbohydrates", "vitamins", "triglycerides"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/383",
    recordId: "Mercury_7217350",
    question: "Which is the most important reason for scientists to publish their data and findings that result from a scientific investigation?",
    options: ["to allow other scientists to try to replicate their results", "to gain respect from their peers in the scientific community", "to become famous", "to get paid for their research"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/384",
    recordId: "Mercury_SC_402052",
    question: "Which reflects light?",
    options: ["eyeglasses", "telescope", "mirror", "camera"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/385",
    recordId: "MCAS_2003_8_5",
    question: "Which of the following is a necessary condition for a lunar eclipse to occur?",
    options: ["It must be the beginning of the month.", "The Moon must be waxing.", "It must be winter in the Northern Hemisphere.", "The Moon must be full."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/386",
    recordId: "Mercury_7015733",
    question: "The excessive use of nitrogen-based fertilizers causes runoff that increases the nitrogen content of lakes and bays. These nitrogen compounds directly affect the aquatic ecosystems by",
    options: ["interfering with the water cycle.", "causing aquatic animals to grow larger.", "increasing the rate of algae growth.", "decreasing the predator population."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/387",
    recordId: "ACTAAP_2014_5_12",
    question: "A blacksmith bends a metal rod into a round wheel. Which statement best describes the wheel?",
    options: ["The wheel weighs less than the rod.", "The wheel is made of the same substance as the rod.", "The wheel weighs more than the rod.", "The wheel is made of a different substance than the rod."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/388",
    recordId: "Mercury_7214428",
    question: "Which moon phase occurs approximately 14 days after a full moon?",
    options: ["first quarter", "new moon", "waning crescent", "waxing gibbous"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/389",
    recordId: "Mercury_405465",
    question: "After a person eats, the food is converted into energy by",
    options: ["tissues.", "cells.", "muscles.", "bones."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/390",
    recordId: "Mercury_7101518",
    question: "Which statement best describes the primary role of perspiration in humans?",
    options: ["Perspiration rids the body of excess water.", "Perspiration eliminates bacteria from the skin.", "Perspiration opens skin pores to absorb more oxygen.", "Perspiration helps to maintain a stable body temperature."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/391",
    recordId: "NAEP_2005_8_S11+11",
    question: "A person produces two sound waves with a flute, one immediately after the other. Both sound waves have the same pitch, but the second one is louder. Which of the following properties is greater for the second sound wave?",
    options: ["Speed in air", "Amplitude", "Wavelength", "Frequency"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/392",
    recordId: "Mercury_7005058",
    question: "Why is the light year often used to describe distances between objects in the universe?",
    options: ["because of the large distance between objects in space", "because of the great number of bright stars", "because of the way planets reflect light", "because of the way objects rotate and revolve"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/393",
    recordId: "Mercury_7058503",
    question: "Which organisms break down dead matter and recycle nutrients back into the ecosystem?",
    options: ["mushrooms and bacteria", "grasses and trees", "lions and alligators", "rabbits and deer"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/394",
    recordId: "NYSEDREGENTS_2015_8_2",
    question: "A student viewing a cell with a microscope observes a cell wall, a cell membrane, and a nucleus. The presence of these structures indicates that the student is looking at a cell from a",
    options: ["rabbit", "carrot", "worm", "fly"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/395",
    recordId: "Mercury_407259",
    question: "Which action results in a chemical change?",
    options: ["snow being shoveled off of a sidewalk", "apples being cut into slices", "wet clothes drying on a clothesline", "wood burning in a fireplace"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/396",
    recordId: "Mercury_7017798",
    question: "What has occurred when bubbles form in a liquid that is being heated?",
    options: ["Molecular stability in the liquid is increasing.", "The boiling point has been reached.", "Heat is radiating in the liquid.", "Oxygen is absorbed from the air."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/397",
    recordId: "Mercury_7124128",
    question: "The breakfast that a student ate provided energy for bicycling later in the day. Which energy transformation most likely occurred?",
    options: ["chemical to mechanical", "radiant to nuclear", "chemical to nuclear", "radiant to mechanical"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/398",
    recordId: "Mercury_SC_402258",
    question: "In an experiment, water and salt are mixed together. What is the best way to separate the salt from the water?",
    options: ["pour the water out of the container", "freeze the mixture", "filter the salt", "evaporate the water"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/399",
    recordId: "TIMSS_2011_4_pg97",
    question: "A metal spoon and a wooden spoon are used to stir a pot of hot soup. After a few minutes, the metal spoon feels hotter than the wooden spoon. What explains this?",
    options: ["Metal heats up the water better than the wood.", "Metal conducts electricity better than wood.", "Metal is always hotter than wood.", "Metal conducts heat better than wood."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/400",
    recordId: "Mercury_7162558",
    question: "Materials made of the same substance will have characteristics in common. Which property is most likely to remain constant in different samples of the same material?",
    options: ["density", "volume", "shape", "mass"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/401",
    recordId: "Mercury_416414",
    question: "Which is Earth's largest source of drinkable water?",
    options: ["lakes", "aquifers", "rivers", "oceans"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/402",
    recordId: "Mercury_SC_405081",
    question: "Some classrooms have computers. The computer is most useful to the students because it helps them",
    options: ["find information.", "listen to music.", "watch movies.", "play games."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/403",
    recordId: "VASoL_2008_3_20",
    question: "Which of these is an example of something being recycled?",
    options: ["Carrying lunch to school every day in the same plastic bag", "Using the same foil to cover food several times", "Taking glass bottles to a place that makes them into new bottles", "Wrapping glasses with newspaper to put them in a moving box"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/404",
    recordId: "Mercury_177345",
    question: "Which of the following is an example of a compound?",
    options: ["carbon", "water", "copper", "iron"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/405",
    recordId: "Mercury_SC_408033",
    question: "One rabbit runs faster than other rabbits in its population. How will the ability to run fast most likely benefit the rabbit?",
    options: ["by allowing the rabbit to find more sources of food", "by keeping the rabbit warmer in the winter", "by making it easier for the rabbit to escape from predators", "by helping the rabbit blend with its environment"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/406",
    recordId: "TIMSS_1995_8_I10",
    question: "What is the BEST reason for including fruits and leafy vegetables in a healthy diet?",
    options: ["They have a high water content.", "They are the best source of protein.", "They are the best source of carbohydrates.", "They are rich in minerals and vitamins."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/407",
    recordId: "Mercury_415085",
    question: "In one day, a family in a car rode for 2 hours, stopped for 3 hours, and then rode for another 5 hours. During the day, the family traveled a total distance of 400 kilometers. What was their average speed for the whole trip?",
    options: ["40 km/h", "50 km/h", "10 km/h", "20 km/h"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/408",
    recordId: "Mercury_416550",
    question: "A Raleigh man turned on his kitchen faucet and filled a glass with water. When he looked at the water, he thought that it might not be safe to drink, so he called the water company to find out. What factor did the man use to evaluate the safety of the water?",
    options: ["phosphate concentration", "turbidity", "nitrate concentration", "pH"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/409",
    recordId: "Mercury_7137043",
    question: "Which of these is the main source of the electromagnetic energy we use?",
    options: ["battery", "coal", "sun", "wind"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/410",
    recordId: "Mercury_7216633",
    question: "Which of the following is the starting point for a new scientific investigation?",
    options: ["forming a question that is the basis of a hypothesis", "identifying experimental variables", "conducting repeated trials and graphing the data", "writing out a procedure and collecting the needed equipment"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/411",
    recordId: "Mercury_SC_408620",
    question: "All organisms depend on the transfer of energy to survive. Which best shows the energy transfer between animals in a shoreline ecosystem?",
    options: ["Fish -> Plants -> Birds", "Fish -> Birds -> Plants", "Plants -> Fish -> Birds", "Plants -> Birds -> Fish"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/412",
    recordId: "ACTAAP_2009_7_5",
    question: "Which investigation might be used to demonstrate potential energy?",
    options: ["Roll one ball toward another, and see what happens when they collide.", "Compress a spring by different amounts, and see how far it can launch a ball into the air.", "Roll a ball from the top of an inclined plane and determine the amount of time it takes to get to the bottom.", "Place a glass of water in the freezer, and see how long the water takes to become solid."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/413",
    recordId: "Mercury_SC_406674",
    question: "The fossil record shows that trees have changed throughout the years. Which of the following conclusions would be best supported by the fossil record?",
    options: ["Rocks can destroy trees.", "Trees give off oxygen.", "The environment has changed.", "Animals need leafy trees."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/414",
    recordId: "Mercury_7099348",
    question: "An agriculturalist predicts that the tomato harvest will be very good this year. Which has the greatest effect on the size of the tomato harvest?",
    options: ["the time of day the seeds are planted", "the amount of fruit picked after dark", "the type of soil in which the crops are grown", "the number of times daily that the farmer observes the crop"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/415",
    recordId: "Mercury_403937",
    question: "A student investigates the effect of temperature on the distance a caterpillar travels in one minute. The student performs the investigation at four different times of day using one caterpillar. This experiment could be improved if the student",
    options: ["uses more than one caterpillar.", "uses earthworms instead of caterpillars.", "performs the investigation at the same time on four days.", "performs the investigation on a wet surface."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/416",
    recordId: "NYSEDREGENTS_2012_8_26",
    question: "A bright object with a long tail of glowing gases is in orbit around the Sun. This object is most likely",
    options: ["a comet", "a star", "a planet", "an asteroid"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/417",
    recordId: "MCAS_8_2015_17",
    question: "A hearing aid is a small device that contains an amplifier, a battery, a microphone, and a speaker. Which part of a hearing aid functions to detect sounds in the user's environment?",
    options: ["the microphone", "the amplifier", "the battery", "the speaker"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/418",
    recordId: "Mercury_7228393",
    question: "In an experiment studying phototropism, students grew bean plants in labeled cardboard milk cartons. Afterward, the plants and soil were properly discarded. Which instruction line BEST conserves the remaining resources?",
    options: ["reuse the markers, discard the milk cartons", "recycle the markers, reuse the milk cartons", "discard the markers, reuse the milk cartons", "reuse the markers, recycle the milk cartons"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/419",
    recordId: "Mercury_415745",
    question: "How are electromagnetic waves different from other waves?",
    options: ["They transmit energy instead of matter.", "They have very short wavelengths.", "They can travel through a vacuum and through matter.", "They can change direction by reflection when they strike an object."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/420",
    recordId: "Mercury_SC_415338",
    question: "The Sun releases light and heat energy that cause changes on Earth. How does the Sun's energy change water?",
    options: ["The energy makes water vapor from liquid water.", "The energy makes clouds release rain.", "The energy makes liquid water freeze.", "The energy makes water collect into puddles."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/421",
    recordId: "Mercury_7108238",
    question: "In the 18th century, smallpox was a common and deadly disease. A country doctor, Edward Jenner, observed that patients working with cattle who contracted a mild disease called cowpox, never came down with the more serious smallpox. When Jenner obtained liquid from cowpox sores and injected it into healthy patients, they became immune to smallpox. What term best describes Jenner's treatment for smallpox?",
    options: ["gene therapy", "vaccination", "genetic engineering", "chemotherapy"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/422",
    recordId: "Mercury_177485",
    question: "What is the name of a circuit in which the current splits at the junctions?",
    options: ["short circuit", "parallel circuit", "closed circuit", "series circuit"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/423",
    recordId: "Mercury_SC_405120",
    question: "A coach is standing at the finish line of a race. He is holding a stopwatch. What is the coach most likely measuring with the stopwatch?",
    options: ["the time of day", "the number of steps taken by the runners", "the time it took to run the race", "the distance of the race"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/424",
    recordId: "MDSA_2009_8_25",
    question: "A growing community relies on a nearby lake to provide fresh water for drinking and bathing. An increase in the use of fresh water will cause the lake to become",
    options: ["colder", "deeper", "larger", "smaller"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/425",
    recordId: "VASoL_2009_3_26",
    question: "Which of these senses lets Dora know when a skunk has been close to her house?",
    options: ["Hearing", "Touch", "Taste", "Smell"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/426",
    recordId: "Mercury_7264180",
    question: "In 2001, NASA launched a probe to investigate very low-energy radiation emitted when the universe began. What part of the electromagnetic spectrum does this probe observe and record?",
    options: ["microwave", "infrared", "visible", "ultraviolet"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/427",
    recordId: "Mercury_7004183",
    question: "What electrical charge does a proton have in an atom?",
    options: ["-2", "+2", "+1", "-1"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/428",
    recordId: "Mercury_SC_LBS10026",
    question: "Work is a product of force and distance. Which of the following is an example of work?",
    options: ["riding a bike", "reading a book", "pushing on a wall", "sitting at a desk"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/429",
    recordId: "NYSEDREGENTS_2015_8_20",
    question: "All of the different organisms interacting in a pond make up",
    options: ["a population", "a community", "the water cycle", "the habitat"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/430",
    recordId: "Mercury_407359",
    question: "If a lake is polluted, which organisms would most likely accumulate the highest concentration of contaminants?",
    options: ["minnows", "bass", "aquatic plants", "fish-eating birds"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/431",
    recordId: "AKDE&ED_2012_4_39",
    question: "Sand is a type of soil that is made of very tiny pieces of material. Which process most likely forms sand?",
    options: ["the weathering of rocks", "the decay of large trees", "the rotation of Earth", "the growth of animals"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/432",
    recordId: "Mercury_7034790",
    question: "What is needed to change ice into water?",
    options: ["stirring", "chemicals", "air", "energy"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/433",
    recordId: "Mercury_7194268",
    question: "Stars form from nebulae of dust and gases. Depending on its properties, a star may become a red, yellow, white, or blue star. Which property determines this star type?",
    options: ["mass", "shape", "age", "location"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/434",
    recordId: "VASoL_2008_3_21",
    question: "Which of these is MOST likely made from only one material?",
    options: ["A paper clip", "A bicycle", "A pair of shoes", "A pencil"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/435",
    recordId: "MCAS_2010_5_11981",
    question: "Francis plugged a toaster into an electric outlet. He put a piece of bread in the toaster and turned the toaster on. While the toaster was on, it changed the electrical energy from the outlet into other forms of energy. Which form of energy toasted the bread?",
    options: ["heat", "sound", "chemical", "magnetic"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/436",
    recordId: "Mercury_SC_402241",
    question: "A student measured liquid with a graduated cylinder. Which of the following units could be used to record the volume of the liquid?",
    options: ["pounds", "meters", "milliliters", "grams"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/437",
    recordId: "NYSEDREGENTS_2013_4_23",
    question: "Which term is an example of a life process?",
    options: ["migration", "coloration", "camouflage", "reproduction"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/438",
    recordId: "CSZ40385",
    question: "A student divides several cubes into two groups, based on whether or not each cube can float in later. What property is the student using to classify the cubes?",
    options: ["mass", "weight", "density", "conductivity"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/439",
    recordId: "MDSA_2007_8_4",
    question: "Use The Periodic Table of the Elements and the information below to answer the question. Magnesium metal (Mg) is grayish-white in color and reacts actively with water. Fluorine (F2) is a greenish-yellow gas at room temperature and is a member of the halogen family. These two elements react to produce magnesium fluoride (MgF2), a chemical commonly used in making windows and lenses. According to the Periodic Table of the Elements, which element is most similar to magnesium (Mg)?",
    options: ["iodine (I)", "calcium (Ca)", "sodium (Na)", "sulfur (S)"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/440",
    recordId: "Mercury_405469",
    question: "How do word processors on computers benefit most students?",
    options: ["It makes them understand how to write a good story.", "It helps them gather historical information.", "It exposes them to data that is hard to find.", "It allows them to edit papers quickly."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/441",
    recordId: "Mercury_SC_402036",
    question: "Students observed that a diamond was able to scratch a piece of talc. What does this observation best support?",
    options: ["Talc and diamonds are both minerals.", "Talc is softer than diamonds.", "Diamonds have sharp edges.", "Diamonds are very valuable."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/442",
    recordId: "Mercury_7230423",
    question: "Which was a main force driving extensive speciation when the environment became hospitable to life after the Permian mass extinction?",
    options: ["increase in available ecological niches", "increase in genetic diversity among surviving organisms", "increase of atmospheric oxygen to present levels", "increase in interbreeding between organisms of different species"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/443",
    recordId: "MCAS_2012_8_23649",
    question: "Some types of bacteria can only live where oxygen is not present. These bacteria were well adapted to life on Earth over 2 billion years ago. Which of the following changes caused many of these bacteria to become extinct?",
    options: ["the varying temperatures of each season", "an increase in volcanic activity under the oceans", "the slow movement of tectonic plates", "an increase in the number of photosynthetic organisms"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/444",
    recordId: "Mercury_SC_416135",
    question: "Which two are functions of flowers?",
    options: ["attract pollinators and make seeds", "make seeds and store food", "take in water and attract pollinators", "store food and take in water"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/445",
    recordId: "MEAP_2005_8_33",
    question: "When soil becomes saturated during rainfall, excess water begins to collect on the surface. Downslope movement of this excess water to rivers, lakes, and streams is called",
    options: ["groundwater.", "runoff.", "filtration.", "condensation."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/446",
    recordId: "Mercury_415686",
    question: "What type of energy is transmitted from the Sun to Earth through space?",
    options: ["heat energy", "electromagnetic energy", "kinetic energy", "electrical energy"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/447",
    recordId: "NCEOGA_2013_5_49",
    question: "What is the cause of rising surface temperatures of the Pacific Ocean, drought in the western United States, and flooding on the Pacific coast of South America?",
    options: ["the Gulf Stream", "the jet stream", "El Niño", "La Niña"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/448",
    recordId: "Mercury_7027265",
    question: "Use of nuclear fuel would most likely reduce human contributions to which environmental problem?",
    options: ["shoreline erosion", "landfill creation", "ozone thinning", "greenhouse heating"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/449",
    recordId: "MEAP_2004_8_48",
    question: "What unit of measure should Jerry use to report the volume of a liquid?",
    options: ["degrees Celsius", "centimeters", "kilograms", "milliliters"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/450",
    recordId: "MCAS_2001_8_9",
    question: "Use the information below to answer the question. Manufacturing uses many steps to change natural resources into products. Some of these steps change natural resources into industrial materials. These steps are called primary processes. All of the following are primary processes except",
    options: ["producing lumber.", "molding plastic.", "melting iron ore.", "crushing rock into gravel."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/451",
    recordId: "MCAS_2004_9_20",
    question: "What part of a communication system converts binary codes in a computer into recognizable characters?",
    options: ["receiver", "encoder", "transmitter", "decoder"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/452",
    recordId: "NYSEDREGENTS_2013_8_27",
    question: "Which geologic process occurs when the acid in precipitation dissolves certain types of rock?",
    options: ["erupting", "faulting", "tilting", "weathering"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/453",
    recordId: "Mercury_SC_400871",
    question: "Water evaporates mostly from",
    options: ["snow.", "clouds.", "land.", "oceans."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/454",
    recordId: "Mercury_SC_408250",
    question: "Robin compared the properties of some rocks. Which property did she most likely compare with a balance?",
    options: ["density", "temperature", "volume", "mass"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/455",
    recordId: "NYSEDREGENTS_2013_8_36",
    question: "Because copper is a metal, it is",
    options: ["liquid at room temperature", "a good conductor of heat", "nonreactive with other substances", "a poor conductor of electricity"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/456",
    recordId: "Mercury_LBS10523",
    question: "What process makes it possible for the nutrients from organic material to be added to soil?",
    options: ["decomposition", "succession", "weathering", "erosion"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/457",
    recordId: "Mercury_7044083",
    question: "Why is it not a safe practice to place a fuel depot over an aquifer?",
    options: ["The fumes escaping from the fuel depot are explosive.", "If the fuel leaks, the water in the aquifer will become contaminated.", "The weight of the depot is too great over the aquifer.", "Aquifers are too high up in the mountains."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/458",
    recordId: "Mercury_402144",
    question: "Look at the equation. 2H_{2} + O_{2} -> 2H_{2}O What does the equation show?",
    options: ["heat being added to oxygen", "hydrogen and oxygen combining", "helium mixing with oxygen", "heat combining with oxygen"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/459",
    recordId: "NCEOGA_2013_8_49",
    question: "Which statement best describes the Law of Superposition?",
    options: ["Rocks that form near volcanoes are older than surrounding rock.", "In undisturbed layers of sedimentary rock, the lowest layers contain the older rocks.", "Each sedimentary layer of rock represents 1,000 years of Earth's age, much like the rings of a tree.", "In undisturbed layers of sedimentary rock, the upper rock layers are older than the lower rock layers."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/460",
    recordId: "NYSEDREGENTS_2015_4_12",
    question: "Which object is the best conductor of electricity?",
    options: ["glass rod", "plastic straw", "wooden stick", "metal nail"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/461",
    recordId: "NYSEDREGENTS_2012_4_20",
    question: "Green plants get the energy they need to make food from",
    options: ["soil", "water", "air", "sunlight"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/462",
    recordId: "Mercury_7068600",
    question: "Which property of a mineral is most likely being tested when it is scratched with a nail?",
    options: ["luster", "cleavage", "color", "hardness"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/463",
    recordId: "MCAS_2004_5_14",
    question: "Ricardo has an igneous rock in his rock collection. Where did this rock most likely form?",
    options: ["on a forest floor", "in a volcano", "at the bottom of a river", "on a coral reef"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/464",
    recordId: "Mercury_SC_409024",
    question: "Animals get energy from eating food that comes from plants. Plants survive by taking in substances that are released by animals. What substance do animals release that plants take in?",
    options: ["oxygen", "sugar", "carbon dioxide", "salt"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/465",
    recordId: "Mercury_7007928",
    question: "Which factor determines whether precipitation will be in the form of rain or snow?",
    options: ["wind", "temperature", "humidity", "air pressure"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/466",
    recordId: "Mercury_7038850",
    question: "Which of these materials transfers heat energy quickest?",
    options: ["glass", "metal", "plastic", "wood"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/467",
    recordId: "Mercury_400598",
    question: "Electrical wires are coated with a rubber or plastic because these materials are good",
    options: ["insulators.", "conductors.", "magnets.", "resistors."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/468",
    recordId: "Mercury_7239313",
    question: "An increase in which ecosystem factor could cause a population decline in a bird species?",
    options: ["immigration", "amount of food", "number of births", "emigration"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/469",
    recordId: "Mercury_7011760",
    question: "Twentieth-century research and development of vaccines significantly reduced the threat of",
    options: ["stroke.", "osteoporosis.", "polio.", "diabetes."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/470",
    recordId: "Mercury_7008785",
    question: "The tendency of an element to react chemically is closely related to",
    options: ["the ratio of protons to neutrons.", "the number of neutrons in atoms.", "the number of valence electrons.", "how tightly atoms are packed."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/471",
    recordId: "Mercury_180863",
    question: "Modern submarines have advanced atmosphere-control systems that enable submarine crews to stay below the surface of the ocean for months at a time. Which of the following also benefits from this technology?",
    options: ["space exploration", "pollution control", "architectural design", "fire prevention"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/472",
    recordId: "Mercury_7014560",
    question: "Which pieces of equipment would be used to measure the density of a solution?",
    options: ["an Erlenmeyer flask and a Bunsen burner", "a ruler and a protractor", "a graduated cylinder and a balance", "a magnet and a thermometer"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/473",
    recordId: "Mercury_SC_405059",
    question: "Gasoline is a nonrenewable energy resource used in most cars and trucks. Gasoline is made from which source?",
    options: ["water vapor", "oil", "natural gas", "hydrogen"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/474",
    recordId: "Mercury_179130",
    question: "The average temperature of Earth's surface has increased approximately 1°C in the past century. Which of the following can best explain this increase in temperature?",
    options: ["higher levels of oxygen in the atmosphere", "lower levels of ozone in the atmosphere", "higher levels of carbon dioxide in the atmosphere", "lower levels of nitrogen in the atmosphere"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/475",
    recordId: "MCAS_2011_5_17671",
    question: "The Sun is the largest body in the solar system. The Sun is a ___.",
    options: ["star", "planet", "moon", "satellite"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/476",
    recordId: "NYSEDREGENTS_2013_4_14",
    question: "Which activity is a good health habit?",
    options: ["sleeping only 5 hours daily", "drinking alcohol", "exercising regularly", "smoking cigarettes"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/477",
    recordId: "NYSEDREGENTS_2012_8_6",
    question: "The fur of the snowshoe rabbit changes to a lighter color in the winter. This allows the rabbit to blend in with its surroundings. This change is an example of",
    options: ["extinction", "ecological succession", "competition", "biological adaptation"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/478",
    recordId: "Mercury_SC_407227",
    question: "What does a plant need to make sugar through photosynthesis?",
    options: ["carbon dioxide, sunlight, and soil", "sunlight, water, and carbon dioxide", "oxygen, sunlight, and soil", "soil, water, and oxygen"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/479",
    recordId: "NYSEDREGENTS_2008_4_27",
    question: "Some birds fly south in the fall and return in the spring. This is an example of",
    options: ["migration", "hibernation", "camouflage", "growth"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/480",
    recordId: "Mercury_SC_401779",
    question: "Which of the following is the best conductor of heat?",
    options: ["rubber soled shoes", "a wooden spoon", "a metal bowl", "oven mitts"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/481",
    recordId: "OHAT_2008_5_30",
    question: "Some processes that shape Earth's surface are slow. Other processes are rapid. Which statement describes a rapid change?",
    options: ["Rivers carry sediment and build deltas.", "Glaciers melt and form rivers.", "Wind weathers rocks into sand.", "Earthquakes move land and rocks."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/482",
    recordId: "Mercury_SC_400181",
    question: "Which characteristic best identifies a pure substance?",
    options: ["melting point", "shape", "state of matter", "texture"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/483",
    recordId: "Mercury_7222670",
    question: "Structures in the universe are grouped into large systems, each of which are made up of smaller systems. Which of the following is the largest system of which Earth is only a very small part?",
    options: ["Milky Way galaxy", "Halley's comet", "Jovian planets", "Orion's belt"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/484",
    recordId: "Mercury_7016328",
    question: "Which atomic structure has the greatest mass?",
    options: ["electron", "proton", "nucleus", "neutron"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/485",
    recordId: "MEAP_2005_8_14",
    question: "When European settlers first came to North America, the average thickness of the top layer of soil was approximately 23 cm. Today, the average thickness of the top layer of soil is less than 15 cm. Which of the following factors has most likely had the greatest effect on erosion of the top layer of soil?",
    options: ["farming", "species reintroduction", "excessive groundwater use", "restoring wetlands"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/486",
    recordId: "TIMSS_2007_8_pg4",
    question: "Which of the following is closest to the percentage of the total water on earth that is freshwater?",
    options: ["70%", "90%", "100%", "3%"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/487",
    recordId: "NYSEDREGENTS_2010_8_34",
    question: "Most scientists agree that an increase in the amount of greenhouse gases entering Earth's atmosphere causes",
    options: ["a decrease in average surface temperatures", "an increase in melting of polar ice caps", "a decrease in sea level", "an increase in crustal plate movement"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/488",
    recordId: "Mercury_7202125",
    question: "Scientists determined that cabbages grown using Fertilizer A grew bigger than cabbages grown using Fertilizer B or no fertilizer at all. The scientists repeated the investigation and produced the same results. Which best explains the purpose of repeating this investigation?",
    options: ["to confirm that the observed differences were caused by the fertilizer", "to ensure that the cabbages are safe for human consumption", "to determine the difference between the experimental and control groups", "to discover the scientific principle that causes the increased growth"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/489",
    recordId: "Mercury_7242900",
    question: "When a small group of organisms colonizes a new habitat, the population may be genetically different from the parent population due to differences in allele frequencies. The process responsible for this is",
    options: ["genetic drift.", "genetic equilibrium.", "natural selection.", "disruptive selection."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/490",
    recordId: "Mercury_SC_400588",
    question: "When conducting a scientific experiment in the field, you are expected to",
    options: ["destroy specimens once you have observed them.", "leave the area as you found it.", "take anything you may need later.", "completely clear the area."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/491",
    recordId: "Mercury_7282695",
    question: "Which two behaviors best demonstrate stewardship?",
    options: ["increasing consumption, discarding wastes", "reducing consumption, discarding wastes", "increasing consumption, recycling wastes", "reducing consumption, recycling wastes"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/492",
    recordId: "Mercury_7018498",
    question: "Beakers and graduated cylinders are designed to measure",
    options: ["density.", "mass.", "volume.", "viscosity."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/493",
    recordId: "CSZ20770",
    question: "Iron oxides, such as rust, form when iron metal reacts with oxygen in the air. What are the chemical symbols for the two elements found in iron oxide?",
    options: ["I and O", "Fe and O", "Pb and O", "Ir and O"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/494",
    recordId: "Mercury_7174895",
    question: "Scientists often use mathematical models and computer simulations to study systems. What is the main advantage of using these techniques for studying the spread of infectious diseases?",
    options: ["to reduce the cost of conducting experiments on people", "to perform experiments that would be irresponsible using human subjects", "to reduce the amount of work for all involved", "to obtain results quickly in a short period of time"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/495",
    recordId: "Mercury_SC_400375",
    question: "Which of these actions causes wind?",
    options: ["air passing Earth as it revolves around the Sun", "uneven heating of Earth's surface", "movement of air from water to land", "rotation of Earth on its axis"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/496",
    recordId: "Mercury_SC_415394",
    question: "A company wants to make a game that uses a magnet that sticks to a board. Which material should it use for the board?",
    options: ["cardboard", "glass", "steel", "wood"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/497",
    recordId: "Mercury_412693",
    question: "Which sequence has the states of matter listed from least to greatest kinetic energy?",
    options: ["gas -> liquid -> solid", "solid -> liquid -> gas", "liquid -> solid -> gas", "solid -> gas -> liquid"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/498",
    recordId: "Mercury_7056665",
    question: "A student is given a mixture of gravel and sand and instructed to separate them. Which tool should the student use to best complete this task?",
    options: ["a sieve", "a scale and weights", "a magnet", "a battery and wire"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/499",
    recordId: "MCAS_2003_8_26",
    question: "A container is filled with 100 mL of water and placed in a freezer. The water in the container freezes at 0°C. A second container filled with 90 mL of water is placed in a second freezer. At what temperature does this second container of water freeze?",
    options: ["-10°C", "0°C", "-1°C", "10°C"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/500",
    recordId: "TIMSS_2003_4_pg35",
    question: "What gas in the air do we need to breathe in order to live?",
    options: ["oxygen", "water vapor", "nitrogen", "hydrogen", "carbon dioxide"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/501",
    recordId: "Mercury_7218050",
    question: "A city is experiencing heavy smog formed by motor vehicle exhaust. Which of these weather conditions contributes most to the formation of smog?",
    options: ["tropical cyclone", "temperature inversion", "cold front", "dry line"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/502",
    recordId: "Mercury_7010063",
    question: "Ocean currents, like the Gulf Stream, affect world climate by",
    options: ["ensuring ocean density is not the same globally.", "spreading plant and animal life over a wider area.", "carrying sediment from rivers and inland basins.", "transferring heat to and from various regions."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/503",
    recordId: "Mercury_SC_405499",
    question: "Jagged mountains would most likely become rounded hills through which process?",
    options: ["chemical change", "volcanic activity", "deposition", "erosion"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/504",
    recordId: "Mercury_SC_401172",
    question: "While performing an experiment involving four different clear liquids, a student forgets to label the test tubes. What should the student do?",
    options: ["ask the teacher how to dispose of the liquids", "ask another student to identify the liquids", "continue the experiment with the unidentified liquids", "try to identify the liquids by smell"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/505",
    recordId: "Mercury_7056315",
    question: "During the light reactions of photosynthesis, energy is stored in the compounds ATP and NADPH. A second set of reactions uses this stored energy to produce vital compounds such as glucose. This second set of reactions involves a biochemical pathway called",
    options: ["carbon fixation.", "respiration.", "transpiration.", "the Calvin cycle."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/506",
    recordId: "Mercury_7271198",
    question: "What is the relationship between an ecosystem and a community?",
    options: ["An ecosystem includes a community and abiotic factors.", "A community includes an ecosystem and abiotic factors.", "An ecosystem is a very large community.", "A community is a very large ecosystem."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/507",
    recordId: "Mercury_7248203",
    question: "Two species of garter snake in the genus Thamnophis originated from a single ancestor. These two species live in the same geographic area, however, one lives in arid land and the other lives in water.Which of the following best identifies the cause of speciation between these two garter snakes?",
    options: ["mechanical isolation", "behavioral isolation", "allopatric isolation", "habitat isolation"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/508",
    recordId: "TIMSS_1995_8_I16",
    question: "A metal spoon, a wooden spoon, and a plastic spoon are placed in hot water. After 15 seconds, which spoon will feel hottest?",
    options: ["The plastic spoon", "The wooden spoon", "The three spoons will feel the same.", "The metal spoon"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/509",
    recordId: "Mercury_7201163",
    question: "The bacterium Brucella abortus causes fever in humans. Biologists studying this bacterium found that when exposed to light, the bacterium becomes more virulent. How can this change in virulence most likely be described?",
    options: ["as a behavioral adaptation", "as a survival disadvantage", "as an acquired characteristic", "as a response to a stimulus"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/510",
    recordId: "Mercury_7064698",
    question: "When iron combines with oxygen in a moist environment, rust forms because of a",
    options: ["change in temperature.", "change in density.", "physical reaction.", "chemical reaction."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/511",
    recordId: "Mercury_7081550",
    question: "A student counts ants in an ant colony every day at the same time. The student writes the date of observation in one column in a notebook and the number of ants counted on each date in a second column. Which best describes how the student arranged the information?",
    options: ["data table", "pie chart", "bar graph", "scatterplot"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/512",
    recordId: "ACTAAP_2015_7_7",
    question: "Which human body systems work together to send messages?",
    options: ["nervous and endocrine", "muscular and skeletal", "excretory and digestive", "circulatory and respiratory"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/513",
    recordId: "Mercury_400278",
    question: "In order for a material to be effective for cooking, it must have which physical property?",
    options: ["high reactivity with water", "low melting point", "high electric charge", "low thermal expansion"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/514",
    recordId: "NYSEDREGENTS_2008_4_24",
    question: "Which sequence shows the life cycle of some insects?",
    options: ["egg -> larva -> pupa -> adult", "egg -> pupa -> larva -> adult", "adult -> pupa -> larva -> egg", "larva -> pupa -> egg -> adult"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/515",
    recordId: "LEAP__7_10341",
    question: "A scientist studied a species of fish. She found that when a certain nutrient was added to the diet of the fish just after hatching, the fish gained an average of 3 kilograms in the first year. What additional information is needed to determine whether the nutrient is affecting the growth of the fish?",
    options: ["how much newly hatched fish in this species gain in the first year without the nutrient in their diet", "how much adult fish gained on average when the same nutrient was added to their diet", "how much other species of fish gain in the first year when the nutrient is added to their diet", "how much of the nutrient is available for the fish species in their natural surroundings"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/516",
    recordId: "TIMSS_2003_4_pg8",
    question: "Humans interpret seeing, hearing, tasting, and smelling in the",
    options: ["brain", "receptors", "skin", "spinal cord"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/517",
    recordId: "Mercury_SC_409577",
    question: "Dan knows the Earth is tilted 23.5° on its axis. Which is caused because of this tilt?",
    options: ["different seasons occur", "low tide can become high tide", "the change in phases of the Moon", "day can become night"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/518",
    recordId: "Mercury_7198993",
    question: "Gel electrophoresis is a technology which allows researchers to reliably separate and sort DNA fragments. This technology is most useful for which application?",
    options: ["cell metabolism analysis", "selective breeding", "medical gene repair", "genetic engineering"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/519",
    recordId: "Mercury_SC_409272",
    question: "Some sea grasses grow near a group of palm trees on a sandy shore. Which best describes the role of both the palm trees and sea grasses?",
    options: ["They turn decaying matter into nutrients.", "They get energy from living organisms.", "They absorb oxygen from the environment.", "They provide food for other organisms."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/520",
    recordId: "VASoL_2008_5_11",
    question: "Students collect pond water in their beakers. Which is the best unit of measurement for the volume of water they collect?",
    options: ["Milliliters", "Centimeters", "Meters", "Grams"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/521",
    recordId: "Mercury_7199938",
    question: "When tectonic plates move, they can form different landforms. Which is least likely to be associated with the tectonic plate movement that forms volcanoes?",
    options: ["hot spot", "subduction zone", "rift valley", "transform boundary"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/522",
    recordId: "NYSEDREGENTS_2012_8_27",
    question: "The thin layer of rock on Earth's surface is the",
    options: ["atmosphere", "hydrosphere", "lithosphere", "hemisphere"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/523",
    recordId: "Mercury_7264145",
    question: "Which type of radiation provides astronomers with the most useful information about high-energy events such as stars colliding?",
    options: ["radio waves", "gamma radiation", "infrared radiation", "visible light"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/524",
    recordId: "Mercury_192990",
    question: "All of the following are renewable resources except",
    options: ["wind.", "trees.", "water.", "minerals."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/525",
    recordId: "Mercury_405777",
    question: "What is the most important property architects must consider when selecting materials for the walls, ceilings, and floors for a new concert hall?",
    options: ["thermal properties", "chemical properties", "acoustical properties", "electrical properties"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/526",
    recordId: "Mercury_SC_409153",
    question: "Eduardo saw some cats living in an alley. Which of these does a cat need to survive?",
    options: ["grass to sleep in", "large trees to climb", "small animals to eat", "predators to chase it"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/527",
    recordId: "VASoL_2009_3_27",
    question: "A puddle of water on a concrete driveway will disappear after a few hours during a sunny day. Where does the water go as it disappears?",
    options: ["It soaks into the concrete.", "It becomes a different substance.", "It goes into the air.", "Animals drink it."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/528",
    recordId: "MDSA_2009_8_32",
    question: "Science students investigated the cause of the different phases of the moon. The model that would best demonstrate the cause of the phases of the moon would include representations of",
    options: ["the moon and Earth", "the moon, the sun, and Earth", "the moon and the sun", "the moon, the sun, and Venus"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/529",
    recordId: "Mercury_SC_400115",
    question: "Electrical energy is best described as",
    options: ["moving negative charges.", "developing radiation.", "coming from the Sun.", "attracting objects."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/530",
    recordId: "MSA_2012_5_21",
    question: "A car and a truck are traveling at the same rate of speed. The vehicles approach a stop sign. Which statement best explains why the car stops in a shorter distance than the truck?",
    options: ["The truck has a larger mass requiring more force to stop.", "The car has a larger mass requiring less force to stop.", "The truck has a smaller mass requiring less force to stop.", "The car has a smaller mass requiring more force to stop."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/531",
    recordId: "NCEOGA_2013_5_24",
    question: "After a rain, a puddle of water remains on a sidewalk. After a day of sunshine, the puddle is gone. Which process is most responsible for the disappearance of the puddle?",
    options: ["transpiration", "precipitation", "condensation", "evaporation"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/532",
    recordId: "Mercury_7245245",
    question: "After which event will primary succession most likely occur?",
    options: ["thunderstorm", "urban development", "volcanic eruption", "crop harvest"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/533",
    recordId: "FCAT_2012_8_4",
    question: "An object moves through space with balanced forces acting on it. Which statement best describes the speed and direction of the object as long as the forces acting on it remain balanced?",
    options: ["The speed will change, but the direction will remain constant.", "The speed will remain constant, but the direction will change.", "The speed and direction of the object will both change.", "The speed and direction of the object will remain constant."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/534",
    recordId: "Mercury_SC_402124",
    question: "About how long does it take Earth to make a complete revolution around the Sun?",
    options: ["1 year", "1 day", "1 week", "1 hour"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/535",
    recordId: "Mercury_7219695",
    question: "Scientists found trilobite and brachiopod index fossils in cliffs a great distance apart from each other. What can scientists infer about the rocks in which these fossils were found?",
    options: ["the density of the rock", "the slope of the rock", "the weathering of the rock", "the age of the rock"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/536",
    recordId: "Mercury_SC_402122",
    question: "Which of the following is a function of the digestive system of the human body?",
    options: ["breaking down food into nutrients", "providing support for the body", "carrying oxygen to the lungs", "sending signals from the brain to the spinal cord"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/537",
    recordId: "Mercury_SC_405800",
    question: "A person must lift a heavy load of bricks to the top of a building. Which simple machine is best used for this task?",
    options: ["a pulley", "a wedge", "an inclined plane", "a wheel and axle"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/538",
    recordId: "Mercury_SC_400048",
    question: "Which form of energy is required for a television set to work?",
    options: ["solar", "electrical", "heat", "light"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/539",
    recordId: "Mercury_7163870",
    question: "The water cycle is important for recycling the water on Earth. Which of these is the source of most of the water vapor in Earth's atmosphere?",
    options: ["plant transpiration", "glacier melting", "ocean evaporation", "river flooding"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/540",
    recordId: "MCAS_2006_9_2",
    question: "The molecule ATP is composed of elements commonly found in organic molecules. Which of the following is one of these elements?",
    options: ["aluminum", "tin", "calcium", "phosphorus"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/541",
    recordId: "NYSEDREGENTS_2008_4_7",
    question: "Which energy transformation occurs when a person hits a drum with a drumstick?",
    options: ["sound to electrical", "mechanical to sound", "electrical to light", "light to mechanical"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/542",
    recordId: "Mercury_SC_401170",
    question: "Which best describes the energy conversion by a household toaster?",
    options: ["heat to chemical", "electrical to heat", "heat to mechanical", "electrical to chemical"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/543",
    recordId: "NYSEDREGENTS_2013_4_24",
    question: "In late fall, a rabbit's fur grows thicker. This adaptation occurs to",
    options: ["keep the rabbit's body warm", "keep the rabbit safe from predators", "help the rabbit find a mate", "help the rabbit find green plants"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/544",
    recordId: "Mercury_SC_401238",
    question: "Many birds avoid eating the viceroy butterfly because it looks like the monarch butterfly. Monarch butterflies contain a substance that makes the birds sick when monarchs are eaten. The development of the pattern of the viceroy butterfly to look like the monarch butterfly is an example of",
    options: ["diversity.", "coloration.", "camouflage.", "mimicry."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/545",
    recordId: "Mercury_7218663",
    question: "Which difference between water and ice results in ice floating on cold water?",
    options: ["volume", "heat", "density", "shape"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/546",
    recordId: "Mercury_7024938",
    question: "When buying a sunscreen, which is the best question to keep in mind while reading the label for maximum effectiveness?",
    options: ["Is the product waterproof?", "How much protection does it provide?", "Who is the manufacturer?", "What is the cost per ounce?"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/547",
    recordId: "Mercury_182263",
    question: "Which of the following is a description of an organism's development?",
    options: ["A Venus's-flytrap plant closes its leaves around a fly.", "An egg hatches, grows into a tadpole and then into a frog.", "A sunflower grows toward the Sun.", "A lizard loses its tail and grows a new one."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/548",
    recordId: "Mercury_7086800",
    question: "Soil that drains slowly most likely has a high amount of",
    options: ["ash.", "sand.", "clay.", "peat."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/549",
    recordId: "Mercury_7248308",
    question: "Bile salts play a crucial role in gastrointestinal homeostasis and digestion. Which phrase is the best description of the gastrointestinal function of bile salts?",
    options: ["digestion and absorption of proteins in the liver", "digestion and absorption of fats in the small intestine", "digestion and absorption of cholesterol in the large intestine", "digestion and absorption of carbohydrates in the liver"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/550",
    recordId: "NYSEDREGENTS_2015_8_31",
    question: "Which type of energy is transferred by vibrational waves?",
    options: ["light", "chemical", "nuclear", "sound"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/551",
    recordId: "Mercury_7228078",
    question: "The process of gene regulation directly impacts",
    options: ["how much DNA is replicated.", "how much DNA is stored.", "which mRNA is produced.", "which tRNA is produced."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/552",
    recordId: "Mercury_SC_402040",
    question: "What is the most important thing a cylinder, a measuring cup, and a beaker all have in common?",
    options: ["They can all be made of glass.", "They all hold liquids.", "They can all be used to measure the volume of a liquid.", "They can all be marked in milliliters."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/553",
    recordId: "Mercury_7026758",
    question: "Scientists have shown that clearing the forest in the Amazon for farming is causing the extinction of native species. Which is the most direct cause of extinction from clear-cutting of land?",
    options: ["pollution", "climate change", "use of fertilizers", "habitat loss"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/554",
    recordId: "Mercury_SC_409676",
    question: "James read that plants benefit animals by changing the atmosphere. How do plants most likely change the atmosphere in a way that is beneficial for animals?",
    options: ["Plants release oxygen.", "Plants make carbon dioxide.", "Plants absorb sunlight.", "Plants produce heat energy."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/555",
    recordId: "NYSEDREGENTS_2010_8_9",
    question: "What model is used to show the pattern of traits that are passed from one generation to the next in a family?",
    options: ["dichotomous key", "line graph", "energy pyramid", "pedigree chart"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/556",
    recordId: "Mercury_SC_LBS10906",
    question: "Tiny droplets of water seen floating in the air can give scientists a clue about the weather. What are groups of these droplets called?",
    options: ["hail", "rain", "a cloud", "a front"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/557",
    recordId: "MDSA_2010_8_38",
    question: "When taken to a new habitat, non-native plants often threaten native plants of the new habitat. Why do non-native plants threaten native plants?",
    options: ["Non-native plants are able to mutate rapidly.", "Non-native plants are able to be used for medicine.", "Non-native plants cause native animals to relocate.", "Non-native plants compete with native plants for resources."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/558",
    recordId: "Mercury_416672",
    question: "Which technology enables doctors to monitor the function of the heart?",
    options: ["electrocardiogram", "electroencephalogram", "automatic external defibrillator", "dialysis machine"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/559",
    recordId: "ACTAAP_2014_7_12",
    question: "Which substance contributes most to the greenhouse effect?",
    options: ["carbon dioxide", "wood smoke", "nuclear radiation", "nitrous oxides"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/560",
    recordId: "NYSEDREGENTS_2013_4_26",
    question: "A large amount of oil was spilled in a lake environment. Within a few weeks, the number of plants and animals living in the area where the oil was spilled will most likely",
    options: ["remain the same", "decrease", "increase"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/561",
    recordId: "OHAT_2008_8_29",
    question: "Which explains the relationship between hours of sunlight and seasons?",
    options: ["the motion of the moon as it travels around Earth", "the location of Earth's orbit in the solar system", "the rotation of Earth on its axis", "the tilt of Earth's axis relative to the sun"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/562",
    recordId: "Mercury_184170",
    question: "The temperature of the stratosphere increases with altitude because of the presence of",
    options: ["water vapor.", "ozone.", "nitrogen.", "carbon monoxide."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/563",
    recordId: "Mercury_405769",
    question: "Which structure refers to a group of specialized cells that all perform the same function?",
    options: ["organ", "nucleus", "virus", "tissue"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/564",
    recordId: "Mercury_SC_400359",
    question: "Which event occurs only twice each year?",
    options: ["equinox", "full moon", "low tide", "lunar eclipse"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/565",
    recordId: "Mercury_7011393",
    question: "What would be the phenotype of a cross between a homozygous dominant tall plant and a homozygous recessive short plant?",
    options: ["50% short, 50% tall", "25% short, 75% tall", "100% short", "100% tall"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/566",
    recordId: "Mercury_SC_409682",
    question: "Joey is making breakfast and pours a glass of milk over a bowl of dry cereal. Which best describes what Joey made for breakfast?",
    options: ["solution", "element", "mixture", "compound"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/567",
    recordId: "Mercury_7220028",
    question: "Scientists determined that specific agents produce specific diseases, and many are transmitted by sneezing. What must the droplets contain for a disease to be transmitted by sneezing?",
    options: ["the disease-causing particles", "cells exposed to the disease", "toxins released by diseased cells", "disease-specific antibodies"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/568",
    recordId: "MCAS_2011_5_15",
    question: "Which of the following organisms would most likely get its food energy only from consumers?",
    options: ["hawk", "mushroom", "grass", "deer"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/569",
    recordId: "Mercury_SC_400217",
    question: "Coal is a fossil fuel that is formed from",
    options: ["water eroding the land.", "the decay of organic material.", "repeated volcanic eruptions.", "meteors hitting Earth."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/570",
    recordId: "TIMSS_2011_4_pg7",
    question: "What do birds, bats and butterflies have in common?",
    options: ["hair", "internal skeleton", "wings", "feathers"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/571",
    recordId: "Mercury_7263515",
    question: "Changes at the molecular level can turn proto-oncogenes into oncogenes. These changes cause unregulated cell division. Which disease is caused by this transformation?",
    options: ["diabetes", "pneumonia", "hemophilia", "leukemia"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/572",
    recordId: "Mercury_7018463",
    question: "Which characteristic of sound makes it possible for bats to fly in the dark without hitting any objects?",
    options: ["refraction", "amplification", "reflection", "conduction"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/573",
    recordId: "Mercury_SC_401833",
    question: "Students went on a class field trip to Natural Bridge Caverns. They noticed rock formations in the cave called stalactites. Which of these processes caused the stalactites to form?",
    options: ["heat", "freezing", "pressure", "deposition"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/574",
    recordId: "Mercury_187460",
    question: "A switch that can open or close an electric circuit can be used to",
    options: ["stop the current.", "increase the amount of current.", "accelerate the current.", "reverse the current's direction."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/575",
    recordId: "Mercury_SC_409149",
    question: "Jesus learned that a space probe named Voyager 1 was launched from Earth in 1977. It will take Voyager 1 more than 500 years to travel 1 light year. What is a light year used to measure in space?",
    options: ["force", "time", "distance", "energy"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/576",
    recordId: "Mercury_417589",
    question: "Scientists think that the rise in global temperature during the last one hundred years is due to an increase of carbon dioxide in the atmosphere. Which question would best help scientists assess the claim that humans are responsible for the rising global temperature?",
    options: ["What is the source of most of the carbon dioxide in the atmosphere?", "What is the source of the increase of carbon dioxide in the atmosphere?", "What is the increase in the concentration of carbon dioxide in the atmosphere?", "What is the mechanism by which carbon dioxide heats Earth?"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/577",
    recordId: "ACTAAP_2011_5_14",
    question: "Which structure controls what enters both plant cells and animal cells?",
    options: ["nucleus", "chloroplast", "cell membrane", "cell wall"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/578",
    recordId: "Mercury_400837",
    question: "Appearance, texture, and density are classified as",
    options: ["physical properties.", "magnetic properties.", "chemical properties.", "thermal properties."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/579",
    recordId: "Mercury_405942",
    question: "A student compares a plant cell to an animal cell. Which structure will the student find ONLY in the plant cell?",
    options: ["chloroplast", "cytoplasm", "mitochondrion", "nucleus"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/580",
    recordId: "Mercury_7186935",
    question: "One hot summer, a grassland experienced a drought. Which most likely happened in the ecosystem during this time?",
    options: ["Nutrients cycled through the system at a faster rate.", "Secondary consumers became extinct.", "The competition for food among primary consumers increased.", "Less solar radiation was able to enter the system."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/581",
    recordId: "MDSA_2011_8_13",
    question: "The need for farmland in Brazil has led to the cutting of the rain forests in the Amazon. Cutting trees in the Amazon rain forest might have a global effect by",
    options: ["increasing the number of animal species", "decreasing the average yearly temperatures", "increasing carbon dioxide levels in the atmosphere", "decreasing the amount of fresh water"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/582",
    recordId: "Mercury_7252263",
    question: "Which two body systems maintain the level of glucose in the blood?",
    options: ["digestive and endocrine systems", "skeletal and cardiac systems", "nervous and respiratory systems", "muscular and immune systems"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/583",
    recordId: "NYSEDREGENTS_2015_8_45",
    question: "A student writes in a laboratory notebook: I placed a piece of iron in a beaker of water and the iron sank to the bottom of the beaker. What the student wrote in the laboratory notebook is an example of a(n)",
    options: ["observation", "hypothesis", "prediction", "inference"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/584",
    recordId: "Mercury_412625",
    question: "Which series correctly represents the levels of organization in an organism?",
    options: ["tissue -> organ system -> cells -> organs", "cells -> organs -> organ system -> tissue", "tissue -> cells -> organ system -> organs", "cells -> tissue -> organs -> organ system"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/585",
    recordId: "Mercury_SC_406672",
    question: "Which is a function of a seed?",
    options: ["taking in water from the ground", "forming fruit", "making pollen", "storing food for a new plant"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/586",
    recordId: "TAKS_2009_8_12",
    question: "Which process below uses carbon dioxide and the sun's radiant energy to produce chemical energy?",
    options: ["Respiration", "Decomposition", "Evaporation", "Photosynthesis"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/587",
    recordId: "Mercury_7270270",
    question: "A serotinous cone is a seed enclosure that requires intense heat to open. When would a population of trees most benefit from having serotinous cones?",
    options: ["after a drought", "after a tornado", "after a heat wave", "after a forest fire"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/588",
    recordId: "Mercury_SC_LBS11008",
    question: "A lumber company plants new trees where a forest once stood. This is an example of",
    options: ["consuming resources.", "conserving resources.", "recycling resources.", "replacing resources."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/589",
    recordId: "Mercury_SC_414087",
    question: "Some pea plants always have peas with smooth skin. Other pea plants always have peas with wrinkled skin. How can a student best predict which kind of pea will grow from a seed that is planted?",
    options: ["by checking how often the pea plant receives sunlight", "by checking the amount of water in the soil", "by checking the type of peas growing on the parent plants", "by checking how much space the plant will have to grow"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/590",
    recordId: "MEA_2016_5_8",
    question: "How do plants affect their environment?",
    options: ["Plants clean the soil.", "Plants make sunlight brighter.", "Plants create water", "Plants make food used by other organisms."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/591",
    recordId: "ACTAAP_2014_5_13",
    question: "Which is an example of a physical property of an object?",
    options: ["The object bends without breaking.", "The object burns when touched by a flame.", "The object bubbles when put into an acid.", "The object gives off sparks when put into water."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/592",
    recordId: "MEA_2014_5_3",
    question: "What happens when a warm object is put inside a cooler object?",
    options: ["The warm object gains energy and the cool object loses energy until both objects are the same temperature.", "The warm object loses energy and the cool object gains energy so that both objects stay at different temperatures.", "The warm object gains energy and the cool object loses energy so that both objects stay at different temperatures.", "The warm object loses energy and the cool object gains energy until both objects are the same temperature."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/593",
    recordId: "Mercury_SC_401125",
    question: "Newborn white-tailed deer have hundreds of spots on their coats which gradually disappear at three to four months of age. The spots on their coats make the newborns blend in with the environment through",
    options: ["migration.", "mimicry.", "hibernation.", "camouflage."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/594",
    recordId: "Mercury_7212625",
    question: "What is the smallest particle of an element that still exhibits all the properties of that element?",
    options: ["a proton", "a molecule", "an electron", "an atom"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/595",
    recordId: "Mercury_7250285",
    question: "A population of tree-climbing lizard lives on one bank of a large river. The other bank of the river is a treeless prairie. During a flood, 40 lizards were transferred to the prairie side of the river. After 200 generations, this transferred population of lizard lost the ability to climb.Which mechanism is most likely responsible for this loss of function within the transferred population?",
    options: ["natural selection", "mutation", "genetic drift", "gene flow"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/596",
    recordId: "NYSEDREGENTS_2012_4_7",
    question: "When a cup of water at room temperature is put in a freezer, the water's state of matter will change from",
    options: ["liquid to solid", "liquid to gas", "gas to liquid", "solid to liquid"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/597",
    recordId: "Mercury_7168718",
    question: "The weight of an object can change because of the force that acts on that object. Which force causes the weight of an object to change?",
    options: ["gravitational", "electrical", "friction", "magnetic"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/598",
    recordId: "MDSA_2012_8_36",
    question: "Use the information below to answer the question. The human body is composed of different systems made of specialized cells, tissues, and organs. Each of these structures has a specific function that aids in the survival of the human species. What is the primary function of the excretory system?",
    options: ["to help in defense", "to eliminate waste", "to digest food", "to enable movement"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/599",
    recordId: "Mercury_7044065",
    question: "What is the MAJOR cause of acid rain?",
    options: ["jet airplane exhaust high in the sky", "smelting ore", "sulfur combining with water vapor in the atmosphere", "evaporation of polluted water"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/600",
    recordId: "Mercury_SC_410619",
    question: "In 1921, Earl Dickson invented a bandage after he noticed his wife was unable to easily cover cuts on her hands. He covered the bandage with a chemical that sealed it so air would not enter the cut. How did solving this problem benefit others medically?",
    options: ["People cut themselves less often.", "People relied on bandages more than doctors.", "The bandages helped keep cuts clean.", "The bandages cured cuts that were infected."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/601",
    recordId: "Mercury_SC_406026",
    question: "Which is a factor that most likely would affect the climate in a particular area?",
    options: ["distance from an ocean", "number of earthquakes", "amount of lightning", "shape of the shoreline"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/602",
    recordId: "Mercury_SC_406024",
    question: "Pond ecosystems depend on the water cycle to ensure the survival of the animals that live in or near the pond. If a drought reduces the water level, which population of animals would be most affected?",
    options: ["mouse", "snake", "duck", "fish"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/603",
    recordId: "Mercury_406773",
    question: "Some plants rely on hummingbirds for pollination. If a deadly disease infected the hummingbird population, what would most likely happen to the plants?",
    options: ["They would die within hours.", "They would become endangered.", "They would need to migrate.", "They would grow at a slower rate."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/604",
    recordId: "Mercury_SC_400857",
    question: "When salt is added to ice, the ice begins to melt because the salt",
    options: ["lowers the boiling point.", "raises the freezing point.", "raises the boiling point.", "lowers the freezing point."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/605",
    recordId: "MDSA_2008_8_29",
    question: "Leaf cells are one type of tree cell. Which process occurs in a growing leaf cell?",
    options: ["evolution", "sexual reproduction", "adaptation", "sugar production"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/606",
    recordId: "Mercury_SC_407219",
    question: "Which diagram correctly shows the flow of energy in a food chain?",
    options: ["Decomposer -> Consumer -> Producer", "Producer -> Decomposer -> Consumer", "Consumer -> Producer -> Decomposer", "Producer -> Consumer -> Decomposer"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/607",
    recordId: "NYSEDREGENTS_2012_4_8",
    question: "Which form of energy is produced when paper is burned?",
    options: ["electrical", "heat", "magnetic", "chemical"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/608",
    recordId: "Mercury_7083405",
    question: "A group of cells performing the same function in the body is called",
    options: ["a system.", "an organelle.", "a tissue.", "an organism."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/609",
    recordId: "Mercury_SC_402079",
    question: "Which material is a good conductor of heat?",
    options: ["rubber", "copper", "glass", "plastic"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/610",
    recordId: "ACTAAP_2007_7_17",
    question: "All living organisms have certain needs in order to stay alive. Which is most necessary for both plants and animals?",
    options: ["carbon dioxide", "food", "water", "chlorophyll"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/611",
    recordId: "Mercury_7093013",
    question: "Plant leaves have tiny pores. These pores help plants release water from their tissues into the",
    options: ["biosphere.", "hydrosphere.", "atmosphere.", "lithosphere."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/612",
    recordId: "TIMSS_2003_4_pg17",
    question: "How can washing your hands help keep you from getting sick?",
    options: ["It keeps your skin from drying out.", "It makes your hands warmer.", "It washes away germs.", "It makes your hands look nice."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/613",
    recordId: "Mercury_SC_416527",
    question: "Which part of a plant makes sugar from carbon dioxide?",
    options: ["root", "leaf", "stem", "flower"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/614",
    recordId: "MCAS_2005_9_9",
    question: "One method of heat distribution is a baseboard forced hot water system. A baseboard system carries hot water through a pipe that passes through many small, flat plates called fins. What is the purpose of these fins?",
    options: ["to prevent dust and other particles from entering the baseboard", "to replace the heated air leaving the system with cold air", "to dissipate the heat of the hot water flowing through the pipe", "to prevent the baseboard from coming in contact with hot surfaces"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/615",
    recordId: "Mercury_7161403",
    question: "Aerogels are compounds formed by the drying of certain gels. Although the aerogel hardens into a solid material, the particles in the gel are much farther apart than those of most solids and particles are held together by strong bridges of covalently bonded atoms. Which of the following is a likely property of aerogels?",
    options: ["very low melting point", "very flexible", "high electrical conductivity", "very low density"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/616",
    recordId: "Mercury_SC_405062",
    question: "What renewable energy source used to make electricity is thought to be always available?",
    options: ["wind", "nuclear", "oil", "coal"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/617",
    recordId: "Mercury_7142748",
    question: "When heat flows from a hot spot to a cooler spot, entropy increases. When heat is forced to flow from a cool spot to a warmer spot, entropy decreases. Marta is looking for something in her house that causes a decrease in entropy. Which of these should she choose?",
    options: ["the toaster", "an ice cube melting", "the refrigerator", "an egg frying"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/618",
    recordId: "Mercury_7024675",
    question: "Which of the following is influenced by both genetics and behavior?",
    options: ["hair texture", "body weight", "eye color", "blood type"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/619",
    recordId: "Mercury_7267575",
    question: "Which of the following natural disasters is likely to cause the most widespread damage in a coastal ecosystem?",
    options: ["an earthquake", "a landslide", "a tornado", "a tsunami"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/620",
    recordId: "Mercury_7170905",
    question: "One function of the circulatory system is to carry cellular nutrients to the body. Which part of the circulatory system is responsible for exchanging nutrients and wastes?",
    options: ["capillaries", "arteries", "heart", "veins"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/621",
    recordId: "Mercury_400158",
    question: "How does sedimentary rock form?",
    options: ["sediments melt", "sediments compress", "sediments separate", "sediments cool"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/622",
    recordId: "MCAS_2011_5_11",
    question: "Which of the following best explains why electrical wires are usually covered with plastic or rubber?",
    options: ["to make the electrical wire stronger", "to insulate the electrical wire", "to keep the electrical wire warm", "to make the electrical wire more flexible"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/623",
    recordId: "Mercury_SC_400595",
    question: "The Moon revolves around Earth about once every",
    options: ["year.", "week.", "month.", "day."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/624",
    recordId: "TIMSS_2011_4_pg58",
    question: "Calcium is a mineral that helps make your bones and teeth strong. Which of these foods is the best source of calcium?",
    options: ["rice", "meat", "cheese", "candy"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/625",
    recordId: "Mercury_7245578",
    question: "According to the endosymbiotic theory, the outer membrane of the chloroplast originated from which organelle?",
    options: ["the chloroplast of an eukaryotic host cell", "the chloroplast of an engulfed prokaryotic cell", "the cell membrane of an eukaryotic host cell", "the lysosome of an engulfed prokaryotic cell"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/626",
    recordId: "Mercury_7217280",
    question: "Students performing a scientific investigation are most likely trying to",
    options: ["produce a new theory.", "answer a question.", "disprove a hypothesis.", "reject a conclusion."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/627",
    recordId: "Mercury_405951",
    question: "Which statement describes a function of bones in mammals such as dogs and horses?",
    options: ["Bones connect the brain and the spinal cord.", "Bones send messages to the brain to move the muscles.", "Bones carry oxygen-rich blood throughout the body.", "Bones provide protection for organs in the body."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/628",
    recordId: "Mercury_7017920",
    question: "To a person standing motionless on the Earth's surface on a day with no wind, in which direction would the rain appear to fall?",
    options: ["diagonally", "vertically", "circularly", "horizontally"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/629",
    recordId: "Mercury_SC_415005",
    question: "Which two things interact most in the water cycle?",
    options: ["oceans and the Moon", "lakes and the Sun", "oceans and the Sun", "lakes and the Moon"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/630",
    recordId: "MEA_2013_5_16",
    question: "Some animals have advantages and disadvantages because they are different. Which of the following has a disadvantage compared to other animals in its population?",
    options: ["a deer with long legs", "a rabbit that can run fast", "a hummingbird with a long beak", "a polar bear that has dark-colored fur"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/631",
    recordId: "Mercury_SC_401155",
    question: "Which is a characteristic of both plants and animals?",
    options: ["learned behaviors", "produce their own food", "life cycles", "reproduce using seeds"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/632",
    recordId: "TIMSS_2011_8_pg19",
    question: "What is the main difference between planets and moons in our solar system?",
    options: ["All planets can support life; moons cannot.", "All planets have atmospheres; moons do not.", "All planets are larger than all moons.", "All planets orbit the Sun; all moons orbit planets."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/633",
    recordId: "Mercury_7013685",
    question: "Which is a response of the autonomic nervous system that helps maintain equilibrium in the body?",
    options: ["shivering in cold temperatures", "slapping at biting insects", "eating due to appetite", "pulling away from hot objects"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/634",
    recordId: "Mercury_SC_401119",
    question: "Maria Mitchell discovered a comet in 1847 that was later named after her. Maria Mitchell's discovery contributed to which branch of science?",
    options: ["geology", "astronomy", "biology", "chemistry"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/635",
    recordId: "NYSEDREGENTS_2010_4_10",
    question: "When a lightbulb is lit, electrical energy is changed into light energy and",
    options: ["chemical energy", "magnetic energy", "heat energy", "mechanical energy"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/636",
    recordId: "MCAS_2016_5_16",
    question: "Water moves directly from a lake to the air by which of the following processes?",
    options: ["evaporation", "condensation", "sedimentation", "precipitation"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/637",
    recordId: "Mercury_178308",
    question: "In the late 1700s, Antoine Lavoisier performed a series of experiments to find out what happened when a substance burned. In each experiment, he observed that the weight of a container and its contents was the same at the end of the experiment as it had been in the beginning. These observations led him to propose the law of",
    options: ["conservation of energy.", "fixed proportions.", "combustion.", "conservation of mass."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/638",
    recordId: "Mercury_405107",
    question: "A student has a mineral sample. He wonders if the sample is the mineral mica. He knows the cleavage pattern of mica is a smooth, flat sheet. The student can best find out the cleavage pattern of the sample by",
    options: ["soaking the mineral in water.", "shining a light on the mineral.", "breaking off a piece of the mineral.", "rubbing a penny against the mineral."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/639",
    recordId: "NYSEDREGENTS_2010_8_28",
    question: "A full Moon is observed in Buffalo, New York, on June 1. Approximately when will the next full Moon be observed in Buffalo?",
    options: ["July 1", "July 7", "June 7", "June 15"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/640",
    recordId: "Mercury_400799",
    question: "A computer model of an insect population takes into account the following parameters: * available food resources * annual temperature variation * timing of insect reproductive cycles Which additional parameter would most significantly improve the model's accuracy when predicting the insect population size?",
    options: ["annual variation in oxygen availability", "decomposers recycling dead insects", "variation in barometric pressure", "activities of predators preying on insects"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/641",
    recordId: "Mercury_SC_401219",
    question: "Many insects go through metamorphosis. Which series shows the stages of complete metamorphosis correctly?",
    options: ["egg, larva, nymph, adult", "egg, nymph, pupa, adult", "egg, larva, pupa, adult", "egg, nymph 1, nymph 2, adult"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/642",
    recordId: "VASoL_2009_5_22",
    question: "Which of these describes rotation?",
    options: ["Earth makes one turn on its axis every 24 hours.", "Mercury goes around the Sun every 88 days.", "Earth orbits the Sun about every 365 days.", "The Moon goes around Earth every 28 days."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/643",
    recordId: "ACTAAP_2013_5_5",
    question: "Sam looks into a fish pond and points at a goldfish. Sam's grandfather looks where Sam is pointing and tells Sam that the fish is actually in a different location. Which property of light explains why Sam's grandfather is correct?",
    options: ["refraction", "diffraction", "reflection", "absorption"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/644",
    recordId: "NCEOGA_2013_5_27",
    question: "People sitting around a campfire are able to feel the heat from the fire. How are the people able to feel the heat from the fire without touching the fire?",
    options: ["The heat from the fire is conducted through air molecules to the people.", "The heat from the fire rises in the air and then settles around the people.", "The heat from the fire travels through the ground and heats the ground around the people.", "The heat from the fire radiates from the fire to the people."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/645",
    recordId: "ACTAAP_2008_5_12",
    question: "In which case does a physical change occur?",
    options: ["A cake bakes in an oven.", "Bread burns in a toaster.", "Ice melts into water.", "Two chemicals form a new substance."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/646",
    recordId: "ACTAAP_2008_7_17",
    question: "Which energy source could involve a dam?",
    options: ["biomass", "geothermal energy", "hydroelectric power", "solar power"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/647",
    recordId: "Mercury_7250110",
    question: "Which cellular structure do organisms in the kingdoms Eubacteria, Archaebacteria, and Protista have in common?",
    options: ["a circular chromosome", "a mitochondrion", "a cell membrane", "a nucleus"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/648",
    recordId: "WASL_2005_5_10",
    question: "Sheri went on a field trip with her class and saw a stream with floating garbage. How could this pollution affect humans?",
    options: ["There may not be enough water in the water cycle.", "There may not be enough oxygen for humans to breathe.", "There may not be enough drinking water."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/649",
    recordId: "NYSEDREGENTS_2008_8_24",
    question: "Which information would probably be most helpful to someone trying to identify a mineral sample?",
    options: ["hardness and streak of the sample", "location and mass of the sample", "color and size of the sample", "shape and texture of the sample"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/650",
    recordId: "Mercury_7091858",
    question: "Which of these is most likely an effect of releasing carbon dioxide pollution into the atmosphere?",
    options: ["a reduction in photosynthesis", "an increase in the greenhouse effect", "an increase in radioactive wastes", "a reduction in the ozone layer"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/651",
    recordId: "Mercury_405948",
    question: "Plastic conducts very little thermal energy or electricity. Because of this property, plastic would most likely be used to cover",
    options: ["wood.", "liquids.", "metal.", "solids."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/652",
    recordId: "OHAT_2009_8_8",
    question: "Which unit of measurement do astronomers use when measuring the distance between two stars found in the Milky Way?",
    options: ["astronomical unit", "kilometer", "meter", "light-year"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/653",
    recordId: "Mercury_SC_408425",
    question: "The human body is made up of several systems. The mouth, esophagus, and stomach are all parts of which system?",
    options: ["digestive", "circulatory", "skeletal", "nervous"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/654",
    recordId: "Mercury_SC_415489",
    question: "Which term describes the path the Moon travels around Earth?",
    options: ["rotation", "orbit", "day", "phase"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/655",
    recordId: "Mercury_7037678",
    question: "Which best describes an exothermic reaction?",
    options: ["energy is required", "a physical change occurs", "energy is released", "equal amounts of products are produced"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/656",
    recordId: "TIMSS_2011_4_pg14",
    question: "During freezing, melting, and boiling, water changes from one state to another state. Heat needs to be supplied for which of these to take place?",
    options: ["melting only", "melting and boiling but not freezing", "melting and freezing but not boiling", "boiling only"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/657",
    recordId: "Mercury_SC_LBS10391",
    question: "Which of the following is a first-level consumer?",
    options: ["hawk", "wolf", "carrot", "rabbit"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/658",
    recordId: "CSZ_2009_8_CSZ30764",
    question: "A force of 5 N is required to increase the speed of a box from a rate of 1.0 m/s to 3.0 m/s within 5 s along a level surface. What change would most likely require additional force to produce the same results?",
    options: ["reduce the mass of the box", "make the surface of the floor smooth", "make the surfaces of the box smooth", "increase the mass of the box"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/659",
    recordId: "Mercury_7040933",
    question: "What is the MAJOR reason Earth has seasons?",
    options: ["Earth has a tilted axis", "Earth has a moon", "Earth has an elliptical orbit", "Earth has a magnetic field"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/660",
    recordId: "Mercury_7175805",
    question: "In a particular habitat, Animal X has two sources of food. One source is found in the water and the other source is found on land. If the main predator of Animal X is found only on land, what is the most likely structural adaptation that will be selected for in the population of Animal X?",
    options: ["increase in leg strength", "increase in visual acuity", "development of webbed feet", "development of claws"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/661",
    recordId: "Mercury_7128870",
    question: "A teacher uses an instrument that records decibel levels. What is the teacher measuring?",
    options: ["types of thermal energy", "intensity of light", "noise levels", "relative humidity"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/662",
    recordId: "Mercury_SC_406851",
    question: "Which best explains how nutrients get into soil?",
    options: ["by rocks eroding", "through exposure to air", "through decaying matter", "by absorbing sunlight"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/663",
    recordId: "Mercury_409822",
    question: "Lichens grow on rocks and produce an acid that reacts with part of the rock, forming soil. Which best describes the action of lichens on the rocks?",
    options: ["chemical weathering", "mechanical weathering", "erosion", "fertilizer"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/664",
    recordId: "LEAP_2005_4_10266",
    question: "Why do the Sun and Moon appear to move across the sky?",
    options: ["The Sun and Moon revolve around Earth.", "The rotation of the solar system makes the Sun and Moon seem to move.", "Earth revolves around the Sun and the Moon.", "The rotation of Earth makes the Sun and Moon seem to move."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/665",
    recordId: "Mercury_7024360",
    question: "Which human activity would have the greatest positive impact on the water quality of a stream?",
    options: ["driving cars through the stream", "increasing use of chemicals near the stream", "releasing warm water into the stream", "reducing use of fertilizers near the stream"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/666",
    recordId: "NYSEDREGENTS_2015_4_10",
    question: "A student pours water into a cup and places the cup in a freezer. After many hours, the water will change from",
    options: ["liquid to solid", "solid to gas", "solid to liquid", "liquid to gas"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/667",
    recordId: "Mercury_SC_401141",
    question: "Which gas is given off by a plant during photosynthesis?",
    options: ["carbon dioxide", "oxygen", "nitrogen", "hydrogen"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/668",
    recordId: "MCAS_2012_5_23619",
    question: "Which of the following processes makes it possible for plants to use energy from sunlight to produce their own food?",
    options: ["metamorphosis", "reproduction", "photosynthesis", "pollination"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/669",
    recordId: "Mercury_416642",
    question: "Which protist has starch granules in its cytoplasm?",
    options: ["euglena", "volvox", "paramecium", "amoeba"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/670",
    recordId: "Mercury_7210193",
    question: "Which resource is more available due to improvements in deep-sea drilling technology?",
    options: ["salt reserves", "thermal energy", "crude oil", "fresh water"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/671",
    recordId: "Mercury_7057330",
    question: "Tooth decay is an infection that causes deterioration of the protective enamel on teeth, resulting in damage. Tooth decay is most likely caused by",
    options: ["genetic defects.", "allergies.", "bacteria.", "acidic food."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/672",
    recordId: "Mercury_7250128",
    question: "Which structure do a rabbit cell and a bacillus cell have in common?",
    options: ["mitochondrion", "capsule", "nucleus", "DNA"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/673",
    recordId: "Mercury_SC_LBS10338",
    question: "Which of these is necessary for life on Earth?",
    options: ["wind", "trees", "soil", "water"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/674",
    recordId: "Mercury_7008960",
    question: "During a collision, a seat belt slows the speed of a crash dummy. What is the direction of the net force exerted by the seat belt compared to the direction of the crash dummy's motion?",
    options: ["in a vertical direction", "in the same direction", "in the opposite direction", "in a downward direction"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/675",
    recordId: "MEA_2010_8_13",
    question: "By inserting a gene into crop plants, scientists have developed plants that are resistant to insects. If an insect eats the plant, the insect dies. Which practice is unnecessary with this new plant variety?",
    options: ["eroding the land by tilling", "spraying plants with pesticides", "removing weeds from crops", "overproducing food crops"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/676",
    recordId: "Mercury_SC_409595",
    question: "As wood in a campfire burns, it releases heat and becomes ash. What kind of change occurs in the wood when it burns and releases heat?",
    options: ["nuclear", "chemical", "magnetic", "mechanical"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/677",
    recordId: "NYSEDREGENTS_2012_8_3",
    question: "Which statement is an inference?",
    options: ["A thermometer shows that the air temperature is 56°F.", "A weather vane indicates the wind is coming from the west.", "A mineral sample of galena produced a gray-black streak when tested.", "Based on previous data, ten hurricanes may occur in the year 2013."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/678",
    recordId: "Mercury_7008383",
    question: "Which process moves water from the oceans to the atmosphere?",
    options: ["condensation", "precipitation", "evaporation", "transpiration"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/679",
    recordId: "Mercury_7248150",
    question: "At concentrations of 0.1-1 µg/ml colchicine, a natural plant product, can cause the mitotic arrest of dividing cells at metaphase through disrupting the spindle apparatus. Colchicine interferes with which of these cell functions during cell division?",
    options: ["RNA synthesis of spindle protein", "microtubule organization of spindle fibers", "DNA synthesis of spindle protein", "membrane transport of spindle fibers"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/680",
    recordId: "Mercury_401240",
    question: "Most species of ducks have webbed feet. The webbed feet are an example of",
    options: ["a learned trait.", "an instinctive trait.", "behavioral trait.", "an inherited trait."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/681",
    recordId: "NYSEDREGENTS_2010_8_30",
    question: "On which date does North America usually experience the longest period of daylight?",
    options: ["December 21", "June 21", "March 21", "September 21"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/682",
    recordId: "TIMSS_2011_4_pg102",
    question: "What causes an object to fall to the ground when you let it drop from your hand?",
    options: ["air resistance", "gravity", "the push from your hand", "magnetism"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/683",
    recordId: "Mercury_SC_400693",
    question: "The phases of the Moon are caused by the",
    options: ["revolution of the Earth around the Sun.", "tilt of the Moon.", "tilt of the Earth.", "revolution of the Moon around the Earth."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/684",
    recordId: "Mercury_7168140",
    question: "One system of the human body works along with the skeletal system by assisting movement and maintaining posture. Which system is being described?",
    options: ["respiratory", "circulatory", "digestive", "muscular"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/685",
    recordId: "Mercury_175963",
    question: "The discovery of penicillin helped in the",
    options: ["treatment of infections.", "search for diseases.", "discovery of viruses.", "healing of bones."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/686",
    recordId: "NYSEDREGENTS_2010_8_15",
    question: "When the environment changes more quickly than a species can adapt, the species may become",
    options: ["diverse", "overpopulated", "extinct", "dominant"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/687",
    recordId: "Mercury_SC_400676",
    question: "A student hears on the radio that the outside temperature is 32°C. What type of weather will the student most likely expect when she steps outside?",
    options: ["spring weather with flowers blooming", "cold, snowy winter weather", "cool, rainy fall weather", "hot, sunny summer weather"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/688",
    recordId: "Mercury_7007683",
    question: "Which parts of an atom are reactive during a chemical process?",
    options: ["neutrons", "molecules", "electrons", "protons"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/689",
    recordId: "LEAP_2004_4_10258",
    question: "What is one way people are helping the environment?",
    options: ["They are using their cars more to get to places faster.", "They are building more dumps to hold the trash we create.", "They are planting trees to replace the ones that are cut.", "They are building more roads so more people can see natural areas."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/690",
    recordId: "Mercury_7268153",
    question: "What is the function of hollow bones in birds?",
    options: ["to reduce the weight of birds for flight", "to store oxygen for high-altitude flight", "to streamline birds for efficient flight", "to make bones strong enough for flight"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/691",
    recordId: "Mercury_LBS10795",
    question: "A screwdriver is used to pry the lid off a paint can. The resistance arm is 0.5 centimeters. The effort arm is 20 centimeters. What is the mechanical advantage of the screwdriver?",
    options: ["0.025", "19.5", "40", "10"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/692",
    recordId: "Mercury_7176208",
    question: "Food provides calories needed by the body for energy. However, the body must use energy between meals when food is not consumed. What is the most likely response of the body when more energy is used than the calories consumed provide?",
    options: ["to increase blood flow to the limbs for energy production", "to contract muscles to create heat energy for the body", "to transform stored proteins into carbohydrates for energy", "to release energy from lipids stored throughout the body"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/693",
    recordId: "Mercury_7206063",
    question: "The climate of an area would be expected to have the least fluctuations in temperatures where the",
    options: ["days are longest.", "atmospheric nitrogen is low.", "humidity is high.", "vegetation is sparse."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/694",
    recordId: "Mercury_SC_415028",
    question: "Why would animals most likely have to leave an area during a drought?",
    options: ["to find shelter", "to find water and food", "to find mates", "to escape predators"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/695",
    recordId: "Mercury_400471",
    question: "Secondary pollutants are produced in the environment by chemical reactions involving primary or emitted chemicals. Which of the following is a secondary pollutant?",
    options: ["nitrogen oxide (NO)", "carbon monoxide (CO)", "methane (CH_{4})", "ozone (O_{3})"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/696",
    recordId: "Mercury_7072625",
    question: "The human brain is an organ that is made up of many tissues. This information can be used to determine that the brain is",
    options: ["unicellular.", "able to function independently.", "multicellular.", "part of a bacterial colony."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/697",
    recordId: "VASoL_2008_5_25",
    question: "A bicyclist rides on a flat road and then stops pedaling but does not apply the brakes. The bicycle stops because of ___.",
    options: ["attraction", "balance", "magnetism", "friction"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/698",
    recordId: "Mercury_410275",
    question: "One student rubs a balloon against his hair several times. Another student passes a comb through her hair several times. The students place the comb near the balloon and observe that the comb repels the balloon. Which is the most likely reason the comb is able to repel the balloon?",
    options: ["The balloon has a negative charge and the comb is neutral.", "The balloon has a positive charge and the comb is neutral.", "The balloon and the comb have the same electrical charge.", "The balloon and the comb have opposite electrical charges."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/699",
    recordId: "Mercury_SC_415413",
    question: "How is weather related to climate?",
    options: ["Weather is the long-term average of a region's climate.", "Weather describes the climate of a large area.", "Climate describes the weather of a large area.", "Climate is the long-term average of a region's weather."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/700",
    recordId: "TIMSS_2007_4_pg34",
    question: "Katie has a mixture of iron filings and sand. She wants to separate them. How can she do this?",
    options: ["Pass a magnet over the mixture, and the magnet will attract the iron fillings.", "Add water to the mixture, and the sand will dissolve in the water.", "Put the mixture through a sieve, and the sand will remain in the sieve.", "Shake the mixture, and the iron filings will rise to the surface."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/701",
    recordId: "NYSEDREGENTS_2015_4_17",
    question: "Which process is common to most living things?",
    options: ["talking", "reproducing", "seeing", "flying"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/702",
    recordId: "Mercury_7016853",
    question: "The angle of a ramp is changed several times during an experiment. Which tool is needed to measure the different angles?",
    options: ["meter stick", "compass", "protractor", "spring scale"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/703",
    recordId: "Mercury_SC_401817",
    question: "All of these are examples of observation and measurement except",
    options: ["illustrating the different birds that fly by.", "attracting birds with birdseed.", "charting where birds fly.", "counting the number of birds that fly by."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/704",
    recordId: "MDSA_2007_5_51",
    question: "The piping plover is a bird that builds its nest on sand dunes along the Atlantic Ocean. Which of these actions most likely damages the nests of the piping plover?",
    options: ["people walking on a sidewalk along the sand dunes", "children playing in the ocean waves", "children digging holes along the sand dunes", "people fishing from a boat"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/705",
    recordId: "ACTAAP_2010_7_17",
    question: "Which is an effect that cities have on the weather?",
    options: ["Small numbers of plants cause rain to fall more often.", "Large areas of pavement cause the temperature to be hotter.", "Small areas of open water cause fog to be more common.", "Large numbers of houses cause the wind to be stronger."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/706",
    recordId: "Mercury_7008155",
    question: "A \"shooting star\" is",
    options: ["a comet.", "a meteor.", "an asteroid.", "a small star."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/707",
    recordId: "NYSEDREGENTS_2015_8_19",
    question: "Which type of organism converts wastes and dead materials into nutrients that can be used by plants?",
    options: ["herbivore", "decomposer", "producer", "carnivore"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/708",
    recordId: "Mercury_7148208",
    question: "Biochemical reactions that require high temperatures to proceed are able to take place at body temperature within the cells of living organisms. Which factor is mainly responsible for allowing biochemical reactions to proceed at body temperature?",
    options: ["The small size of cells keeps reactants together.", "The pH of the cytoplasm increases reaction rate.", "The reactants are present in small quantities in the cell.", "The cellular enzymes act as catalysts."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/709",
    recordId: "Mercury_SC_400709",
    question: "Which statement best compares gravity on the Moon to gravity on Earth?",
    options: ["Gravity on the Moon is greater because it has less mass than the Earth.", "Gravity on the Moon is greater because it is closer to the Sun.", "Gravity on the Moon is less because it is smaller than the Earth.", "Gravity on the Moon is less because it has less atmosphere than the Earth."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/710",
    recordId: "Mercury_412755",
    question: "An enclosed 20 mL metal cylinder was filled with a gas sample at room temperature. The sample then was transferred to an empty 40 mL enclosed container, also at room temperature. After being transferred, the volume of the gas was",
    options: ["10 mL.", "30 mL.", "40 mL.", "20 mL."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/711",
    recordId: "Mercury_SC_401331",
    question: "Melting, boiling, and freezing are examples of",
    options: ["chemical changes.", "physical changes.", "electrical changes.", "magnetic changes."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/712",
    recordId: "NYSEDREGENTS_2013_4_3",
    question: "There is a shadow under a tree. Which form of energy must be present for the shadow to occur?",
    options: ["sound", "mechanical", "light", "heat"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/713",
    recordId: "Mercury_SC_413002",
    question: "Seismometers measure quick changes that happen in the crust of our planet. Which of the following is a seismometer used to measure?",
    options: ["erosion", "flooding", "earthquake", "weathering"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/714",
    recordId: "Mercury_7042630",
    question: "In some lakes, excessive blooms of algae appear when human activity causes degradation of water quality resulting in conditions more favorable for algae growth. Which human activity primarily causes this problem?",
    options: ["manufacturing", "mining", "transportation", "farming"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/715",
    recordId: "MCAS_2003_5_10",
    question: "Drake has started a garden. What can Drake do to enrich the soil so that his plants will grow better?",
    options: ["increase the amount of pesticide he uses", "add more water to the soil", "remove earthworms", "mix decomposed plant matter into the soil"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/716",
    recordId: "TIMSS_2007_4_pg105",
    question: "Which of these objects will rust?",
    options: ["glass beads", "iron nails", "plastic straws", "wood chips"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/717",
    recordId: "NYSEDREGENTS_2015_4_13",
    question: "Which color baseball cap would absorb the most light on a sunny day?",
    options: ["yellow", "black", "pink", "white"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/718",
    recordId: "Mercury_7024203",
    question: "Which body systems are most involved in the response when someone stubs his or her toe?",
    options: ["nervous and digestive", "nervous and muscle", "muscle and endocrine", "reproductive and circulatory"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/719",
    recordId: "Mercury_7007543",
    question: "Which part of a sound wave measures loudness?",
    options: ["frequency", "wavelength", "amplitude", "magnitude"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/720",
    recordId: "Mercury_7241255",
    question: "Neurons respond to stimuli and transmit impulses to coordinate body functions. Which of these indicates the rapid change in the membrane potential when a neuron is stimulated?",
    options: ["resting potential", "action potential", "threshold period", "refractory period"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/721",
    recordId: "Mercury_7222408",
    question: "Materials that let electrons flow very easily from one atom to another",
    options: ["are called conductors.", "are called resistors.", "are called insulators.", "are called non-metals."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/722",
    recordId: "Mercury_7016240",
    question: "Which is the most important safety measure to follow when using an acid in a classroom laboratory?",
    options: ["using bright fluorescent lights", "closing the door to the hall", "keeping the window open", "wearing protective clothing and goggles"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/723",
    recordId: "TIMSS_2007_8_pg57",
    question: "In a deep valley on Earth, a person shouting will hear an echo as the sound is reflected back off the surrounding mountains. In a similar valley on the Moon, no echo will be heard. This is because",
    options: ["there is no air on the Moon for the sound to travel through", "the gravitational pull on the Moon is too low", "the mountains on the Moon cannot reflect sound", "the temperature on the Moon is too low"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/724",
    recordId: "MDSA_2007_8_23",
    question: "The motion of a car accelerating in a straight line differs from the motion of a car moving in a straight line at a constant speed. Which change best describes acceleration of a car?",
    options: ["a change in the distance the car travels", "the change in the time for the car to travel a distance", "a change in the direction of the car", "the change in velocity divided by the time for that change"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/725",
    recordId: "MEA_2016_5_3",
    question: "During which time of day are the highest temperatures most often recorded?",
    options: ["night", "sunset", "sunrise", "afternoon"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/726",
    recordId: "MEAP_2005_5_16",
    question: "When butterfly eggs hatch, the young are called ___.",
    options: ["cocoons", "little butterflies", "caterpillars", "worms"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/727",
    recordId: "Mercury_7009818",
    question: "Louis Pasteur's work in the nineteenth century on pasteurization greatly improved",
    options: ["the availability of medication.", "the prediction of weather.", "the quality of food.", "the effectiveness of vaccinations."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/728",
    recordId: "MCAS_2004_5_22",
    question: "An earthworm was placed on top of a thick layer of moist topsoil in a pan. The pan was placed in a room with the lights on. How did the earthworm most likely respond to these conditions?",
    options: ["by trying to crawl out of the pan", "by crawling around in the pan", "by staying where it was placed", "by burrowing under the soil"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/729",
    recordId: "ACTAAP_2007_7_27",
    question: "What is the liquid layer of Earth that lies beneath the mantle?",
    options: ["outer core", "asthenosphere", "mesosphere", "inner core"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/730",
    recordId: "MDSA_2008_5_25",
    question: "Many natural resources are found in Maryland and the surrounding area. Some of these natural resources are renewable and some are nonrenewable. People use both kinds of resources in daily activities. Using natural resources often produces waste products. Burning fossil fuels, such as oil, coal, and gasoline produces pollution. Which type of pollution is most often produced by burning fossil fuels?",
    options: ["noise pollution", "land pollution", "air pollution", "water pollution"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/731",
    recordId: "TIMSS_1995_8_L5",
    question: "When a bird sings, it is most likely singing in order to",
    options: ["frighten away other types of birds", "wake up other animals", "mark the bird's territory against the same type of bird", "attract insects"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/732",
    recordId: "Mercury_7217438",
    question: "Coal is used for generating about 53% of the electrical energy in the United States. Which of these environmental issues is directly contributed to by the burning of coal?",
    options: ["beach erosion", "overfishing", "air pollution", "ozone depletion"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/733",
    recordId: "Mercury_411809",
    question: "Which term correctly describes all of the following materials? salt water, vinegar, bronze, air, beach sand",
    options: ["elements", "compounds", "mixtures", "solutions"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/734",
    recordId: "Mercury_7188213",
    question: "Isle Royale is a large island in Lake Superior. During the 1800s, most of the trees were removed, and the wolves and moose that lived on the island died. In the early 1900s, moose were reintroduced to the island. By 1925, the moose population on Isle Royale rose to about 2,000 individuals. Which best explains how the moose population grew so rapidly?",
    options: ["The birth rate was constant and few moose died.", "The death rate was greater than the birth rate.", "There were no predators to control the population.", "There was unlimited food for the moose to eat."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/735",
    recordId: "Mercury_SC_401800",
    question: "Which is a characteristic Earth and the Moon have in common?",
    options: ["craters", "seas", "thunderstorms", "atmosphere"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/736",
    recordId: "Mercury_SC_406273",
    question: "As Bobby entered a dark room, he pushed the switch on the wall to turn on the light. What makes the light turn on when Bobby pushes the switch?",
    options: ["magnetism", "electricity", "friction", "gravity"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/737",
    recordId: "NYSEDREGENTS_2010_8_7",
    question: "Which human organ system eliminates liquid and gaseous wastes from the body?",
    options: ["endocrine", "excretory", "circulatory", "reproductive"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/738",
    recordId: "Mercury_7174668",
    question: "When visiting the beach, Felicity observed that a breeze blew in from the ocean during the day and out toward the ocean at night. Which factor is most responsible for the direction of land and sea breezes in coastal regions?",
    options: ["the gravitational pull of Earth on the atmosphere", "the daily rise and fall of tides in a regular pattern", "the uneven heating between the land and water", "the revolution of Earth around the Sun"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/739",
    recordId: "NYSEDREGENTS_2013_8_16",
    question: "Which pathway do most nutrients take after a person takes a bite of food?",
    options: ["circulatory system -> digestive system -> body cells", "digestive system -> body cells -> circulatory system", "digestive system -> circulatory system -> body cells", "circulatory system -> body cells -> digestive system"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/740",
    recordId: "MCAS_2005_5_33",
    question: "Sound reaches our ears because sound makes air particles",
    options: ["slow down.", "vibrate.", "cool down.", "heat up."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/741",
    recordId: "Mercury_7056648",
    question: "Which event is an example of conduction?",
    options: ["Boiling water in a pot warms a spoon inside the pot.", "Cold water is heated in a microwave oven.", "A fire in a fireplace warms the air in a room.", "Sunlight travels from the Sun to warm Earth."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/742",
    recordId: "NYSEDREGENTS_2013_8_43",
    question: "Which type of energy is transferred from one object to another by simple machines?",
    options: ["electrical", "mechanical", "chemical", "nuclear"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/743",
    recordId: "AKDE&ED_2008_8_50",
    question: "Which statement best describes how energy transfer within Earth's atmosphere can affect a weather condition?",
    options: ["During convection, electromagnetic waves transfer heat and light energy which affects the amount of precipitation.", "During radiation, electromagnetic waves transfer heat and light energy which affects the air temperature.", "During radiation, objects directly transfer heat to each other which affects the air temperature.", "During convection, objects directly transfer heat to each other which affects the amount of precipitation."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/744",
    recordId: "Mercury_7205363",
    question: "What is the smallest part of a gold ring that is still gold?",
    options: ["an atom", "an electron", "a compound", "a molecule"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/745",
    recordId: "Mercury_SC_407507",
    question: "Which tool should a carpenter use to measure the length of a wooden board?",
    options: ["graduated cylinder", "meter stick", "balance", "thermometer"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/746",
    recordId: "NYSEDREGENTS_2013_8_23",
    question: "If an ecosystem's balance is disturbed by a volcanic eruption, what will most likely occur?",
    options: ["The ecosystem will not change from its original state.", "The consumers in the ecosystem will begin to consume carbon dioxide.", "The ecosystem will eventually become balanced again.", "The consumers in the ecosystem will begin to produce more oxygen."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/747",
    recordId: "TAKS_2009_5_20",
    question: "One example of a trait passed from a parent plant to its offspring is ___.",
    options: ["the amount of water in the plant's environment", "the color of the flowers on the plant", "the nutrients in the soil where the plant grows", "the amount of sunlight shining on the plant"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/748",
    recordId: "MDSA_2010_8_8",
    question: "Many organisms have structures for protection and survival. Which structure is most similar to tree bark?",
    options: ["snake fangs", "human skin", "bear claws", "bird beak"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/749",
    recordId: "NYSEDREGENTS_2013_8_13",
    question: "The human respiratory system is responsible for removing",
    options: ["nutrients from food", "hormones from glands", "fat from cells", "carbon dioxide from blood"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/750",
    recordId: "NYSEDREGENTS_2013_8_8",
    question: "Humans are protected from some infections by specialized cells which produce chemicals that",
    options: ["allow locomotion", "coordinate movement", "destroy microbes", "recycle nutrients"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/751",
    recordId: "MCAS_2011_5_10",
    question: "Which two forms of energy could best be used to increase the temperature of a sheet of copper?",
    options: ["heat and light", "heat and sound", "light and magnetism", "electricity and sound"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/752",
    recordId: "ACTAAP_2014_7_10",
    question: "Which gas is the most abundant in Earth's atmosphere?",
    options: ["oxygen", "nitrogen", "carbon dioxide", "water vapor"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/753",
    recordId: "Mercury_SC_408435",
    question: "Which best explains why stars seen in the night sky are less bright than the Sun?",
    options: ["Other stars are producing less light.", "Other stars are facing away from Earth.", "Other stars are farther from Earth than the Sun.", "Other stars are smaller than the Sun."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/754",
    recordId: "Mercury_7245788",
    question: "A scientist observed that the loss of plants near a stream resulted in more soil being washed downstream. How will the excess soil that travels downstream reduce biodiversity?",
    options: ["It will introduce an invasive species.", "It will change the water temperature.", "It will destroy the fish habitat.", "It will provide nutrients to algae."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/755",
    recordId: "NYSEDREGENTS_2015_8_25",
    question: "When Earth's shadow falls on the Moon, the shadow causes a",
    options: ["lunar eclipse", "high tide", "Moon phase", "low tide"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/756",
    recordId: "MCAS_2004_8_20",
    question: "A class conducts an experiment to determine the best color to paint a solar water heater that they plan to build. For their experimental test, the students have four identical cans. They paint one black, one green, one red, and one white. Each can is filled with 500 mL of 22°C water, and is allowed to sit in the sun for two hours. Which color can will have the greatest increase in water temperature?",
    options: ["red", "green", "black", "white"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/757",
    recordId: "Mercury_7207463",
    question: "Which of these properties of water has the greatest effect on the water cycle?",
    options: ["dissolves many substances", "freezing and boiling points", "forms six-sided crystals", "neutral pH"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/758",
    recordId: "OHAT_2007_5_40",
    question: "What causes day and night on Earth?",
    options: ["movement of Earth around the sun", "tilting of Earth's axis", "rotation of Earth on its axis", "movement of the sun around Earth"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/759",
    recordId: "NYSEDREGENTS_2008_8_33",
    question: "Which process is an example of a physical change?",
    options: ["iron rusting", "milk souring", "ice melting", "wood burning"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/760",
    recordId: "MSA_2012_5_13",
    question: "The water cycle requires energy. The main source of energy for the water cycle is",
    options: ["gravity", "the moon", "wind", "the sun"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/761",
    recordId: "Mercury_7211015",
    question: "Which of these is the fundamental unit of life?",
    options: ["organ", "cell", "tissue", "system"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/762",
    recordId: "MCAS_1999_8_17",
    question: "Which would be the most important to consider when selecting material for the walls and ceiling of a concert hall?",
    options: ["thermal properties", "acoustical properties", "mechanical properties", "chemical properties"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/763",
    recordId: "Mercury_7071978",
    question: "When microorganisms deplete the oxygen in soil through respiration, the soil becomes",
    options: ["humus.", "anaerobic.", "compost.", "aerobic."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/764",
    recordId: "Mercury_414500",
    question: "The National Aeronautics and Space Administration (NASA) is the agency responsible for the space program in the United States. What was the goal of NASA's Apollo program?",
    options: ["to determine the composition the Sun", "to search for life on planets other than Earth", "to land on a planet in another solar system", "to send a human to land on the Moon"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/765",
    recordId: "Mercury_7014000",
    question: "A lack of control in the muscular system is most likely related to a problem in what other organ system?",
    options: ["immune", "nervous", "digestive", "excretory"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/766",
    recordId: "Mercury_SC_400224",
    question: "The Russian thistle, commonly known as the tumbleweed, is a big, round plant with many branches and short, stiff leaves. This plant spreads a large number of seeds when it breaks off from its stalk. The thistle is most likely found in what kind of environment?",
    options: ["forest", "prairie", "swamp", "tundra"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/767",
    recordId: "NCEOGA_2013_8_29",
    question: "Scientists find dinosaur fossils in the bottom rock layers of a cliff and mammal fossils in the middle rock layer of the cliff. Which could best be concluded from this evidence?",
    options: ["Dinosaurs and mammals lived at the same time.", "Dinosaurs lived on Earth before the mammals.", "Dinosaurs were eaten by the mammals.", "Dinosaurs ate plants."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/768",
    recordId: "LEAP_2002_8_10389",
    question: "Joyce put 200 milliliters of water in a beaker, put a thermometer in it, and heated it until it started to boil. She recorded a temperature of 100°C when it started to boil. She repeated the process with 400 milliliters of water. What would be the temperature when the second sample started to boil?",
    options: ["twice as high as the first sample's", "slightly higher than the first sample's", "the same as the first sample's", "half as high as the first sample's"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/769",
    recordId: "Mercury_416507",
    question: "A student wrote the following claim on a homework assignment: \"Eukaryotic cells need more lipids than prokaryotic cells.\" Which statement below provides the BEST support for her claim?",
    options: ["Eukaryotic cells make up multicellular organisms.", "Eukaryotic cells perform cellular respiration.", "Eukaryotic cells have a nucleus.", "Eukaryotic cells contain membrane-bound organelles."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/770",
    recordId: "VASoL_2008_3_35",
    question: "A black bear eats many different things, including grasses, roots, and berries. It also eats insects, fish, and other small animals. Which of these BEST describes a black bear?",
    options: ["Herbivore", "Producer", "Carnivore", "Omnivore"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/771",
    recordId: "Mercury_7010798",
    question: "A student finds a beaker with a chip in the rim. What should he do with the beaker?",
    options: ["use it and then dispose of it", "dispose of the beaker and get a new one", "put it back where he found it and get a new one", "use it and then return it to where he got it"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/772",
    recordId: "Mercury_7018078",
    question: "The sum of protons and neutrons in the nucleus of an atom is called the",
    options: ["chemical property.", "valence.", "electrical charge.", "mass number."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/773",
    recordId: "Mercury_7141278",
    question: "In which of the following are nutrients directly absorbed from the bloodstream?",
    options: ["organisms", "organ", "tissue", "cell"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/774",
    recordId: "Mercury_SC_400988",
    question: "Making aluminum cans from recycled materials instead of raw materials is a wise choice because it",
    options: ["creates energy.", "saves trees.", "reduces pollution.", "saves time."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/775",
    recordId: "Mercury_SC_415415",
    question: "What happens to climate and weather over a summer?",
    options: ["Climate varies, but weather stays the same.", "Climate varies more than weather.", "Weather varies more than climate.", "Weather and climate vary to the same degree."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/776",
    recordId: "NAEP_2009_4_S7+6",
    question: "A thermometer shows that the outside air temperature is colder than the temperature at which water turns to ice. However, ice on the sidewalk melts. What probably caused this?",
    options: ["The sunlight making the sidewalk warmer than the air", "The air heating the sidewalk", "The sidewalk reflecting sunlight into the air", "The wind causing the ice on the sidewalk to melt"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/777",
    recordId: "Mercury_SC_401296",
    question: "Which trait gives owls an advantage when hunting at night?",
    options: ["large eyes", "broad wings", "smooth feathers", "straight beak"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/778",
    recordId: "Mercury_SC_400406",
    question: "Wood is considered a renewable resource because",
    options: ["trees can be replanted.", "trees are used for many purposes.", "there are many varieties of trees.", "oxygen is released by trees."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/779",
    recordId: "Mercury_7023275",
    question: "Which event is an example of a chemical change?",
    options: ["fog rising off a river", "grinding peppercorn into pepper flakes", "ice cream melting in the sunshine", "wood burning in a fireplace"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/780",
    recordId: "Mercury_SC_405020",
    question: "Oxygen-rich blood returns from the lungs to the heart. Which two systems are most directly involved in this process?",
    options: ["excretory and digestive", "digestive and respiratory", "circulatory and excretory", "respiratory and circulatory"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/781",
    recordId: "Mercury_405940",
    question: "From simplest to most complicated, how are multicellular organisms organized?",
    options: ["tissue, cell, organ system, organ", "organ, tissue, cell, organ system", "cell, tissue, organ, organ system", "organ system, organ, cell, tissue"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/782",
    recordId: "Mercury_SC_405734",
    question: "A student wants to find out whether storms with lightning produce more rain than storms without lightning. Which is the best way to answer this question?",
    options: ["record rainfall amounts in storms with and without lightning", "count number of lightning strikes during a one-hour period", "average the amount of rain that fell during a lightning storm", "calculate the number of fires that are caused by lightning strikes"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/783",
    recordId: "MCAS_2005_8_20",
    question: "How many different elements are in the 20 compound sodium carbonate (Na2CO3)?",
    options: ["1", "7", "6", "3"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/784",
    recordId: "Mercury_7197960",
    question: "In a lab, a bacterial strain shows resistance to an antibiotic. The presence of the antibiotic allows an existing variant within the genetic code to help the bacteria survive. The resistance of bacteria due to an existing genetic variant can be best described as which process?",
    options: ["behavioral adaptation", "selective breeding", "natural selection", "asexual reproduction"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/785",
    recordId: "TIMSS_2003_8_pg57",
    question: "Which of the following is NOT a mixture?",
    options: ["Sugar", "Milk", "Paint", "Smoke"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/786",
    recordId: "TAKS_2009_5_29",
    question: "Which two properties of a crayon will stay about the same after the crayon is melted?",
    options: ["Temperature and hardness", "Thickness and texture", "Shape and physical state", "Color and mass"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/787",
    recordId: "NYSEDREGENTS_2010_8_8",
    question: "Which human organ system produces hormones to regulate growth, development, and reproduction?",
    options: ["digestive", "nervous", "circulatory", "endocrine"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/788",
    recordId: "Mercury_7219030",
    question: "As some organisms die, their remains become buried by mud and are eventually compressed into a type of rock. Which of these is a rock type that forms from this process?",
    options: ["magma", "sedimentary", "metamorphic", "igneous"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/789",
    recordId: "Mercury_7141890",
    question: "Based on the organization of living things, tissues",
    options: ["are made of organs.", "do the work of cells.", "form systems.", "are made of cells."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/790",
    recordId: "Mercury_7075215",
    question: "Which body system is directly threatened when bacteria infect the lungs?",
    options: ["respiratory", "excretory", "nervous", "muscular"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/791",
    recordId: "Mercury_SC_416173",
    question: "Where do good bacteria grow to help keep people healthy?",
    options: ["in the brain", "in the blood", "on the skin", "on the bones"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/792",
    recordId: "Mercury_7283885",
    question: "The human immunodeficiency virus (HIV) causes AIDS. The first known human cases AIDS were in Africa in the late 1950s. Since then, tens of millions of people have died from the disease, and tens of millions more people all over the world are infected. Which term best describes the disease AIDS?",
    options: ["pandemic", "isolated cases", "epidemic", "outbreak"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/793",
    recordId: "MCAS_1998_4_7",
    question: "7. What is the cause of most earthquakes?",
    options: ["the direction of the wind", "the pull of Earth's gravity", "the movement of plates on Earth's crust", "the rotation of Earth"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/794",
    recordId: "OHAT_2007_8_42",
    question: "Which phenomena occur as a result of the gravitational attraction between the moon and Earth?",
    options: ["eclipses", "seasonal changes", "ocean tides", "phases of the moon"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/795",
    recordId: "AKDE&ED_2012_8_7",
    question: "Which statement best describes how the circulatory system and respiratory system can work together?",
    options: ["Gases are exchanged between the lungs and blood vessels.", "Toxins are removed from the bloodstream by the liver.", "The stomach signals for the production of gastric juices.", "Food molecules are transported to the organs of the body."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/796",
    recordId: "Mercury_LBS10993",
    question: "Animals depend on plants for many things, including food. What do plants depend on from animals?",
    options: ["pest control", "energy for photosynthesis", "oxygen", "carbon dioxide"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/797",
    recordId: "Mercury_7084018",
    question: "Less force is required to launch a spaceship from the surface of the Moon than to launch an identical ship from the surface of Earth because",
    options: ["the gravitational field of the Moon is less than that of Earth.", "the Moon has a smaller surface area than Earth.", "the atmosphere of the Moon is much thinner than that of Earth.", "the mass of an object on Earth is greater than on the Moon."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/798",
    recordId: "Mercury_SC_415399",
    question: "Two of Earth's plates pushed together, and the ground moved. What happened?",
    options: ["an earthquake", "a volcano", "an avalanche", "a landslide"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/799",
    recordId: "Mercury_7071803",
    question: "Which of these were formed by glaciers that flowed through the Ruby Mountain region in northeastern Nevada?",
    options: ["V-shaped valleys", "deserts", "volcanic necks", "lakes"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/800",
    recordId: "MCAS_2011_8_17683",
    question: "A student prepared the following list of characteristics about a cellular organelle. present in animal cells present in plant cells helps make energy available to the cell Which of the following cellular structures is the student describing?",
    options: ["cell wall", "mitochondrion", "nucleus", "chloroplast"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/801",
    recordId: "Mercury_SC_408439",
    question: "Brian knows deserts get less rain than other ecosystems. However, he also knows that plants can survive in the desert. Which characteristic of a plant most likely helps it live in a desert?",
    options: ["the ability to attract insects", "the ability to stop predators", "the ability to drop its leaves", "the ability to store water"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/802",
    recordId: "Mercury_7115290",
    question: "After a volcanic eruption, it takes a long time for large ecosystems to fully recover. Which statement best explains why the development takes so long?",
    options: ["Space is limited for growth.", "The quality of light is low.", "Soil must be created.", "Minerals are destroyed."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/803",
    recordId: "Mercury_7007613",
    question: "The atomic number of an element refers to the number of",
    options: ["protons in the nucleus.", "electrons in the nucleus.", "neutrons in the outer shell.", "electrons in the outer shell."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/804",
    recordId: "Mercury_7161298",
    question: "In an ecosystem, not all of the energy that is available is used by the organisms. Some energy becomes unavailable before it can be transferred to organisms in the next trophic level. How does the energy most likely become unavailable?",
    options: ["The energy is trapped in dead organisms.", "The energy is stored as food.", "The energy is moved to another ecosystem.", "The energy is dissipated as heat."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/805",
    recordId: "Mercury_180198",
    question: "Which of the following is a direct result of Earth's tilt on its axis?",
    options: ["weather", "seasons", "tides", "gravity"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/806",
    recordId: "MEAP_2004_8_1",
    question: "Tony always drinks water before and after his long bike rides. Why does his body need water when he exercises?",
    options: ["Drinking water before exercise helps increase the heart rate.", "Drinking water before exercise prevents the body from sweating.", "Drinking water after exercise allows the body to sleep.", "Drinking water after exercise helps to replace lost fluids."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/807",
    recordId: "LEAP_2001_4_10240",
    question: "On a field trip in a wooded area, you see a small, strange object. You wonder whether is is a live animal. The best way to find out is to observe the object to see if it",
    options: ["carries out basic life functions.", "can make a noise and has a lifelike color.", "has an odor.", "has separate parts."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/808",
    recordId: "AKDE&ED_2012_4_2",
    question: "Liquid cooking oil was poured into a container. Which statement best describes a property of the cooking oil after it was poured into the container?",
    options: ["Its volume stayed the same.", "Its mass increased.", "Its color changed.", "Its temperature quickly increased."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/809",
    recordId: "AKDE&ED_2008_8_18",
    question: "The Sun heats the atmosphere of Earth unevenly. Which of the following is the most likely result of this uneven heating?",
    options: ["Radiation from the Sun will reflect through the atmosphere back into space resulting in cooler evenings.", "Radiation from the Sun will cause atmospheric moisture to collect over mountain ranges resulting in snowfall.", "Conduction through the atmosphere causes evaporation to occur over oceans, resulting in rain.", "Convection in the atmosphere causes a change in air density, resulting in winds."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/810",
    recordId: "Mercury_400347",
    question: "A 20-N force acts on a 5-kg object at rest. How fast will the object accelerate on a frictionless surface?",
    options: ["25 m/s^2", "15 m/s^2", "4 m/s^2", "100 m/s^2"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/811",
    recordId: "Mercury_7001313",
    question: "Increasing and revising scientific knowledge of different types of bacteria will most likely enable scientists to develop ways to",
    options: ["aid research students who are studying complex organisms.", "help make medicines from newly discovered plants.", "develop specialized antibiotics that are directed at single-celled organisms.", "help patients spend less time in the emergency room."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/812",
    recordId: "NYSEDREGENTS_2008_8_18",
    question: "What are produced in both the male and female reproductive systems in humans?",
    options: ["nutrients", "fertilized eggs", "sex cells", "sperm"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/813",
    recordId: "Mercury_7026810",
    question: "The burning of fossil fuels in cities results in high levels of air pollution. Which urban design would best help reduce air pollution?",
    options: ["frequent trash recycling", "efficient public transportation", "numerous park areas", "effective street lighting"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/814",
    recordId: "Mercury_SC_415352",
    question: "Which is an inherited trait?",
    options: ["dirty fingernails", "dimples", "scrapes", "short hair"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/815",
    recordId: "Mercury_SC_413632",
    question: "How is xylem similar to phloem in a plant?",
    options: ["They both make sugar in the leaves.", "They both transport materials through the plant.", "They both store waste products in the plant cells.", "They both take in water from the soil."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/816",
    recordId: "Mercury_SC_408881",
    question: "In a recycling program, people can separate paper from their other trash. The paper is sent to factories and turned into new products. What does paper recycling help conserve the most?",
    options: ["gasoline", "water", "air", "trees"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/817",
    recordId: "MSA_2013_5_15",
    question: "Water cycles through three states of matter on Earth. What has the greatest effect on the state of matter of water?",
    options: ["the moon", "tides", "gravity", "the sun"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/818",
    recordId: "Mercury_SC_401316",
    question: "Which physical feature exists both on Earth and on the Moon?",
    options: ["lakes", "forests", "mountains", "clouds"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/819",
    recordId: "TIMSS_2003_8_pg99",
    question: "Animals and plants are made up of a number of different chemical elements. What happens to all of these elements when animals and plants die?",
    options: ["They are recycled back into the environment.", "They evaporate into the atmosphere.", "They change into different elements.", "They die with the animal or plant."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/820",
    recordId: "Mercury_405056",
    question: "Students are comparing different rocks. What do all rocks have in common?",
    options: ["Rocks are made of sand changed by pressure.", "Rocks are made of one or more minerals.", "Rocks are made of magma and sediments.", "Rocks are made of two or more elements."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/821",
    recordId: "Mercury_7113978",
    question: "What is the most likely result of large-scale agricultural fertilization on aquatic systems?",
    options: ["less oxygen available for fish", "reduced water levels", "increased fish populations", "more biodiversity over time"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/822",
    recordId: "Mercury_7041388",
    question: "In order for magma to be converted to igneous rock, which actions must occur?",
    options: ["heating and pressure", "melting and cooling", "weathering and erosion", "crystallization and cooling"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/823",
    recordId: "NYSEDREGENTS_2012_4_23",
    question: "Trees start as seeds and grow into mature trees that produce more seeds. This pattern represents a",
    options: ["food chain", "life cycle", "food supply", "life span"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/824",
    recordId: "NYSEDREGENTS_2015_8_1",
    question: "Which sequence identifies the levels of organization of body structures in a human from simplest to most complex?",
    options: ["cell -> tissue -> organ -> organ system", "cell -> organ -> tissue -> organ system", "organ system -> cell -> tissue -> organ", "tissue -> organ -> organ system -> cell"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/825",
    recordId: "Mercury_7238893",
    question: "A cell completes the synthesization of a protein by adding a carbohydrate to the protein's structure. At which site in the cell is the carbohydrate added?",
    options: ["the nucleus", "a ribosome", "the Golgi apparatus", "a mitochondrion"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/826",
    recordId: "Mercury_7018095",
    question: "All atoms of an element have in their nuclei the same number of",
    options: ["molecules.", "electrons.", "isotopes.", "protons."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/827",
    recordId: "Mercury_SC_408344",
    question: "Henry learned that without the right kind of energy, plants cannot survive. What form of energy is used by plants to perform photosynthesis?",
    options: ["wind", "mechanical", "electrical", "light"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/828",
    recordId: "Mercury_7171955",
    question: "As a corn plant ages, its leaves grow. Which process is directly responsible for the growth of these leaves?",
    options: ["the release of oxygen from the plant", "the transportation of nutrients from the roots", "the division of cells in the plant", "the absorption of carbon dioxide in the stem"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/829",
    recordId: "Mercury_7013895",
    question: "Which scientist is best known for research that led to the modern understanding of the atom?",
    options: ["Copernicus", "Newton", "Dalton", "Galileo"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/830",
    recordId: "MCAS_2011_8_17682",
    question: "Which body system typically recognizes, attacks, and destroys foreign cells or substances that may cause disease?",
    options: ["immune", "digestive", "excretory", "respiratory"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/831",
    recordId: "Mercury_7194320",
    question: "Cell membranes allow some molecules to move freely across the membrane, while other molecules are restricted. Which term best describes this capability of a cell membrane?",
    options: ["resilient", "impervious", "unyielding", "semipermeable"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/832",
    recordId: "Mercury_7029785",
    question: "Which statement describes the transfer of energy when an ice cube is placed in a cup of hot tea?",
    options: ["Heat flows simultaneously between the ice and the tea.", "Cold flows from the ice to the tea.", "Heat flows from the tea to the ice.", "Cold flows from the ice, and heat flows from the tea."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/833",
    recordId: "Mercury_7284008",
    question: "Which is the most cooperative relationship between species?",
    options: ["coexistence", "mutualism", "parasitism", "predation"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/834",
    recordId: "Mercury_402093",
    question: "A dog rolls over and receives a treat. The dog rolls over again. This is an example of",
    options: ["inherited behavior.", "learned behavior.", "adaptive behavior.", "instinctive behavior."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/835",
    recordId: "Mercury_401313",
    question: "Which type of rock is formed when particles are compacted and cemented together?",
    options: ["metallic", "igneous", "sedimentary", "metamorphic"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/836",
    recordId: "Mercury_SC_405490",
    question: "Tree roots can grow into rock and break it apart. Water can freeze in the cracks of rock, causing it to break apart. How are these two processes alike?",
    options: ["Both are forms of weathering.", "Both are forces.", "Both form new kinds of rock.", "Both affect weather."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/837",
    recordId: "Mercury_7160528",
    question: "Energy is absorbed and released through endothermic and exothermic processes. Which is an example of an exothermic process?",
    options: ["ice melting", "water evaporating", "ice sublimating", "water freezing"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/838",
    recordId: "TIMSS_2007_8_pg130",
    question: "Where is most fresh (non-salty) water on Earth located?",
    options: ["polar ice caps", "rivers", "lakes", "oceans"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/839",
    recordId: "Mercury_7083773",
    question: "When a molecule is separated into its component parts, it forms",
    options: ["atoms.", "protons.", "ions.", "compounds."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/840",
    recordId: "Mercury_7188860",
    question: "The universe is believed to be approximately 14 billion years old. As a result of gravitational attraction, which most likely developed first after the Big Bang?",
    options: ["a planet", "a star", "a comet", "a moon"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/841",
    recordId: "NCEOGA_2013_5_14",
    question: "Which is a function of the cardiovascular system?",
    options: ["to provide structural support for the body", "to eliminate waste from the body", "to transport gases throughout the body", "to move water throughout the body"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/842",
    recordId: "Mercury_7113803",
    question: "When a fern reproduces with spores, the offspring",
    options: ["will be better able to adapt to the environment.", "will have half the genetic materials of the parent plant.", "will have twice the genetic materials of the parent plant.", "will be genetically identical to the parent plant."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/843",
    recordId: "Mercury_SC_401136",
    question: "The process of water changing from its liquid state to a gas in the water cycle is known as",
    options: ["translation.", "precipitation.", "evaporation.", "condensation."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/844",
    recordId: "LEAP__7_10342",
    question: "In which situation would osmosis most likely occur in cells?",
    options: ["across a permeable membrane that separates solutions of the same concentration", "across a nonpermeable membrane that separates solutions of different concentrations", "across a permeable membrane that separates solutions of different concentrations", "across a nonpermeable membrane that separates solutions of the same concentration"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/845",
    recordId: "Mercury_SC_405838",
    question: "A scientist is watching birds from far away. Which object is the scientist most likely using to watch the birds?",
    options: ["microscope", "sunglasses", "binoculars", "goggles"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/846",
    recordId: "NYSEDREGENTS_2008_8_26",
    question: "Studies of earthquake waves have helped scientists determine the",
    options: ["cause of dinosaur extinction", "depth of the oceans", "age of Earth", "structure of Earth's interior"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/847",
    recordId: "MCAS_1999_4_15",
    question: "Needles on a cactus plant are actually leaves. This needle shape helps the plant survive by",
    options: ["staying in place.", "catching food.", "preventing water loss.", "reproducing."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/848",
    recordId: "Mercury_SC_414155",
    question: "Compost piles have many parts, such as leaves, moisture, vegetables, and microorganisms. Which part of a compost pile breaks down materials and adds nutrients to the soil?",
    options: ["microorganisms", "vegetables", "moisture", "leaves"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/849",
    recordId: "CSZ_2008_8_12",
    question: "A piece of pine wood floats on the surface of a lake because the water exerts",
    options: ["a downward force equal to the weight of the wood.", "a downward force equal to the weight of the displacement water.", "an upward force equal to the weight of the displacement water.", "an upward force equal to the weight of the wood."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/850",
    recordId: "CSZ_2005_5_CSZ20517",
    question: "All living things contain which element?",
    options: ["helium.", "sodium.", "carbon.", "copper."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/851",
    recordId: "Mercury_SC_406543",
    question: "A student performed an experiment to see how long it would take for a cup of water to freeze. Which information would another student most likely need in order to perform the same experiment?",
    options: ["the volume of the cup", "the type of thermometer to use", "the temperature of the ice", "the time to begin"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/852",
    recordId: "Mercury_SC_406688",
    question: "A student wants to know which type of soil holds the most water. Which action should the student most likely do to answer the question?",
    options: ["watch how quickly the soil drains", "compare how the soils are alike", "put the soils into different groups", "record the weight of the soil"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/853",
    recordId: "Mercury_7205748",
    question: "Which of these is required to support the theory of star formation?",
    options: ["laws passed by the government", "evaluation of data by many scientists", "pictures of stars of different ages", "Internet sites discussing star formation"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/854",
    recordId: "Mercury_7007473",
    question: "The frequency of a wave is measured in",
    options: ["meters/minute.", "hertz.", "meters.", "hertz/second."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/855",
    recordId: "AKDE&ED_2012_4_14",
    question: "Which process causes the fastest changes to the surface of Earth?",
    options: ["a major earthquake happening in a mountain range", "many waves on a lake moving pebbles onto a beach", "a large glacier forming on a mountain", "strong winds wearing away a rock cliff"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/856",
    recordId: "Mercury_7008348",
    question: "Organisms contribute to the water cycle mainly through the process of",
    options: ["transpiration.", "precipitation.", "irrigation.", "evaporation."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/857",
    recordId: "Mercury_SC_401838",
    question: "Which of these tools is most helpful to a scientist observing very small bacteria?",
    options: ["ruler", "telescope", "microscope", "meter stick"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/858",
    recordId: "Mercury_7018428",
    question: "Apple slices were divided evenly between two identical metal boxes. A lighted 20-watt incandescent light bulb was placed in box A, and a lighted 20-watt fluorescent light was placed in box B. The apple slices in box A dried faster than those in box B because",
    options: ["incandescent light causes a chemical reaction.", "incandescent light produces more heat.", "fluorescent light has a lower frequency.", "fluorescent light is a luminous light."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/859",
    recordId: "Mercury_SC_LBS10272",
    question: "What season is it in the United States when the South Pole is tilted toward the Sun?",
    options: ["winter", "summer", "fall", "spring"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/860",
    recordId: "Mercury_411737",
    question: "Which of these colors of visible light has the shortest wavelength?",
    options: ["green", "violet", "red", "yellow"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/861",
    recordId: "MCAS_2011_8_17696",
    question: "Which of the following units best represents the density of an object?",
    options: ["kg", "g/cm^3", "hr", "m/s^2"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/862",
    recordId: "Mercury_400060",
    question: "Which statement below best explains why several fossils of sea organisms were discovered buried deep in an area of dry land?",
    options: ["The area had a shift in climate.", "A glacier once covered the area.", "The land was once underwater.", "The fossils changed locations."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/863",
    recordId: "Mercury_7094395",
    question: "Last year Steve was shorter than his brother. This year Steve is taller than his brother. What cell process is directly responsible for Steve's growth?",
    options: ["respiration", "diffusion", "mitosis", "osmosis"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/864",
    recordId: "Mercury_402634",
    question: "In which state are molecules of a substance arranged in the most orderly way?",
    options: ["solid", "liquid", "gas", "plasma"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/865",
    recordId: "Mercury_7218908",
    question: "Weather stations built in urban areas can be influenced by the human-made structures that surround these stations. Some of these weather stations used to determine mean temperatures in the United States have had the validity of the data questioned. Which human-produced effect could these urban weather stations be measuring?",
    options: ["rain shadow", "heat island", "cold front", "land breeze"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/866",
    recordId: "Mercury_7037275",
    question: "How is the mass of an atom calculated?",
    options: ["subtract the number of protons from the number of neutrons", "add the number of protons to the number of neutrons", "subtract the number of electrons from the sum of protons and neutrons", "add the number of protons to the number of electrons"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/867",
    recordId: "LEAP__8_10366",
    question: "Over a long period, some flowering plants have become dependent on honey bees for pollination. In recent years, a form of mite has infected and killed the honey bees in many areas of the country. Since this has happened, the once bee-dependent plants with the best chance of surviving are those that",
    options: ["have always attracted many other insects as wells as honey bees.", "grow taller so that the few remaining honey bees will find them.", "have seeds that stay alive for a long time in the environment.", "change their flowers so that wind will fertilize them."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/868",
    recordId: "Mercury_7012495",
    question: "Which of these atomic structures has the least amount of mass?",
    options: ["a neutron", "an electron", "an ion", "a proton"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/869",
    recordId: "Mercury_7210350",
    question: "An increase of carbon dioxide in Earth's atmosphere is most likely to have which effect?",
    options: ["increased burn rate for incoming meteoroids", "decreased variations in day length", "decreased rate of ozone layer destruction", "increased average air temperature"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/870",
    recordId: "Mercury_SC_LBS10270",
    question: "Which of the following is an inherited human trait?",
    options: ["eye color", "sense of balance", "sense of humor", "sleep patterns"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/871",
    recordId: "Mercury_SC_405090",
    question: "Snow turns to liquid water when it",
    options: ["melts.", "freezes.", "condenses.", "evaporates."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/872",
    recordId: "NYSEDREGENTS_2015_8_34",
    question: "Which energy source is nonrenewable?",
    options: ["fossil fuel", "wind", "biomass", "sunlight"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/873",
    recordId: "Mercury_402102",
    question: "The Moon is in orbit around Earth. What keeps the Moon from changing its orbit?",
    options: ["weight", "gravity", "rotation", "friction"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/874",
    recordId: "Mercury_7220430",
    question: "Which form of water, when present in the atmosphere, is most likely to contribute to global warming?",
    options: ["snow", "cloud", "rain", "vapor"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/875",
    recordId: "AKDE&ED_2008_8_31",
    question: "Which statement explains why ducklings follow their mother when swimming across a pond?",
    options: ["Inherited behavior is genetically obtained through their environment.", "Survival behavior is learned by interacting with their environment.", "Survival behavior is acquired by interaction with the parent duck.", "Inherited behavior is genetically passed on from parents to offspring."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/876",
    recordId: "TAKS_2009_8_29",
    question: "Some students measure the mass of a small pile of leaves before and after the leaves decompose. Each time the students measure the mass, they place a container with the decomposing leaves on a balance. Before recording the mass of the leaves, the students must do which of the following?",
    options: ["Subtract the mass of the container", "Allow the leaves to settle in the container for a few days", "Add leaves from other plants to the container", "Use a metric ruler to measure the volume of the container"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/877",
    recordId: "Mercury_7137480",
    question: "Ava conducted an experiment to determine respiratory rates during different activities. She counted the number of breaths per minute. Ava noted that the number of breaths increases as physical activity increases. Why is there an increase in the number of breaths per minute as activity increases?",
    options: ["As activity increases, the oxygen needs of cells increase.", "As activity increases, more oxygen is exhaled.", "As activity increases, the rate of the heart beating increases.", "As activity increases, breathing becomes more efficient."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/878",
    recordId: "MCAS_2015_8_20",
    question: "The temperature in a classroom is 15°C (59°F). The teacher turns the thermostat to 20°C (68°F) and keeps the door closed. Which of the following statements best describes the change that occurs as the temperature in the room increases to 20°C?",
    options: ["The room becomes warmer as cold energy is pushed out of the room.", "The room becomes warmer as heat energy is added to the room.", "Cold energy in the room transforms into heat energy.", "Cold air molecules collide to generate heat energy."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/879",
    recordId: "Mercury_7069388",
    question: "A flat piece of paper has a mass of 5 grams. When the paper is crumpled into a ball, the mass of the crumpled paper is",
    options: ["the same as that of the flat paper.", "slightly less than that of the flat paper.", "much more than that of the flat paper.", "slightly more than that of the flat paper."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/880",
    recordId: "TIMSS_2003_4_pg87",
    question: "Minerals are used for making many things including jewelry, chalk, and concrete. Where do we get the minerals needed to make these things?",
    options: ["from rocks", "from wood", "from crops", "from air"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/881",
    recordId: "Mercury_7194495",
    question: "Scientists have observed that, even within the same nest, some young birds call louder than others. Which describes how a louder cry helps to ensure survival?",
    options: ["Parents respond by giving more food.", "Lung capacity is increased.", "Parents are able to identify the nest.", "Exposure to bacteria is increased."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/882",
    recordId: "OHAT_2008_8_15",
    question: "Two galaxies are interacting with each other. What is the force that draws these two galaxies toward each other?",
    options: ["gravity", "friction", "electricity", "magnetism"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/883",
    recordId: "AKDE&ED_2008_8_49",
    question: "Which procedure correctly describes materials combining?",
    options: ["Salt and sand are added to hot water and stirred making a mixture.", "Sugar and water are added to flour and cooked in an oven making an element.", "Oil and water are placed in a sealed bottle and shaken making a compound.", "Soil and water are shaken in a container and left to separate forming two elements."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/884",
    recordId: "Mercury_SC_408746",
    question: "Plants growing in a pond release a gas that fish need to survive. Which gas do the plants release that fish use?",
    options: ["oxygen", "helium", "nitrogen", "hydrogen"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/885",
    recordId: "ACTAAP_2009_7_9",
    question: "A ball rolling on the ground is observed to slow down and stop. Based on Newton's first law of motion, what is the best conclusion?",
    options: ["There must have been an outside force acting on the ball.", "The ball must have been going slightly uphill.", "The ball did not have enough mass to keep going.", "An object in motion eventually stops."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/886",
    recordId: "TIMSS_2011_8_pg98",
    question: "What is the chemical formula for carbon dioxide?",
    options: ["CO2", "O2", "CO", "C"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/887",
    recordId: "NYSEDREGENTS_2010_4_7",
    question: "A student rubs his hands together to warm them. His hands get warm due to",
    options: ["magnetism", "friction", "sound", "gravity"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/888",
    recordId: "Mercury_7263655",
    question: "Scientists studying migrating birds and homing pigeons have discovered that they navigate by monitoring differences in the intensity and inclination of Earth's magnetic field. Special cells in bird beaks can detect these changes as the birds fly over Earth's surface. Which metal did the scientists find in the cells that birds use as a magnetometer?",
    options: ["gold", "mercury", "aluminum", "iron"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/889",
    recordId: "VASoL_2011_5_16",
    question: "A scientist found a fossil of an organism that had gills. When the organism was living, the area in which it lived was most likely covered by ___.",
    options: ["water", "grassland", "forest", "bare rock"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/890",
    recordId: "Mercury_SC_400021",
    question: "Which is the best way to help protect the environment?",
    options: ["pack a lunch instead of buying a school lunch", "do a science project about energy", "ride a bike to school instead of riding in a car", "wash hands before each meal"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/891",
    recordId: "VASoL_2009_5_36",
    question: "An electric motor is designed to turn electrical energy into ___.",
    options: ["solar energy", "potential energy", "static electricity", "mechanical energy"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/892",
    recordId: "Mercury_SC_405154",
    question: "If a student playing the drums hits the drums with greater force, the sound would be",
    options: ["higher in pitch.", "quieter.", "lower in pitch.", "louder."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/893",
    recordId: "Mercury_7128853",
    question: "As the loudness of a sound wave increases, which will also increase?",
    options: ["velocity", "frequency", "wavelength", "amplitude"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/894",
    recordId: "Mercury_7044240",
    question: "Telescopes use lenses to observe distant objects such as stars. Which term best describes what happens when lenses bend and concentrate light?",
    options: ["diffracting", "reflecting", "refracting", "polarizing"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/895",
    recordId: "Mercury_407661",
    question: "Which of these must occur when a substance goes through a chemical change?",
    options: ["The substance forms a new substance.", "The substance changes shape.", "The substance gets larger.", "The substance changes phases."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/896",
    recordId: "Mercury_7234518",
    question: "Scientists use ice cores to identify and explain previous climatic trends. By correlating climatic conditions recorded in the ice, with solid, nonsnow particles also found in the ice, scientists can help to predict the climatic impact of which phenomena?",
    options: ["radioactive decay rate changes in the outer core", "atmospheric carbon dioxide concentration changes", "magnetic pole reversals", "volcanic eruptions"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/897",
    recordId: "Mercury_7179340",
    question: "Coal, oil, and natural gas have high potential energies, which makes them valuable energy resources. In order to benefit from the energy available in these fossil fuels, the potential energy is converted most directly into which type of energy?",
    options: ["electrical", "chemical", "solar", "thermal"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/898",
    recordId: "OHAT_2007_8_44",
    question: "What change would occur if Earth's rate of rotation significantly increased?",
    options: ["The day would be shorter.", "The day would be longer.", "The year would be shorter.", "The year would be longer."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/899",
    recordId: "Mercury_7099225",
    question: "Humans can do many things to impact the environment. Which of these is an example of how humans negatively impact the environment?",
    options: ["increasing water runoff", "planting more trees", "burning less fossil fuel", "reducing beach erosion"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/900",
    recordId: "Mercury_SC_400183",
    question: "Eyeglasses help a nearsighted person see as a result of",
    options: ["diffraction.", "refraction.", "reflection.", "absorption."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/901",
    recordId: "Mercury_7206623",
    question: "A student measures the rising temperature of heated water for 20 minutes in two-minute intervals. Which of these tools will best help the student organize the data?",
    options: ["bar graph", "flow chart", "pie chart", "data table"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/902",
    recordId: "Mercury_7026513",
    question: "A rock formation in a land area contains fossils. Over time, tremendous heat and pressure change the formation to produce a harder rock formation without fossils. Which change in rock type has occurred in this land area?",
    options: ["Igneous rock has turned into metamorphic rock.", "Sedimentary rock has turned into igneous rock.", "Igneous rock has turned into sedimentary rock.", "Sedimentary rock has turned into metamorphic rock."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/903",
    recordId: "Mercury_402092",
    question: "Which is not an inherited trait in humans?",
    options: ["attached earlobes", "calloused hands", "blue eyes", "long fingers"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/904",
    recordId: "VASoL_2007_5_31",
    question: "The wind helps many plants reproduce by ___.",
    options: ["spreading the plants' pollen", "cooling the plants", "strengthening the plants' root systems", "giving the plants moisture"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/905",
    recordId: "Mercury_409111",
    question: "The human hearing range is 20-20,000 hertz. A sound Peggy heard was measured at 15,000 hertz. Which characteristic best describes the sound wave that Peggy heard?",
    options: ["fast speed", "long wavelength", "high frequency", "large amplitude"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/906",
    recordId: "AKDE&ED_2012_8_1",
    question: "A student is asked to measure the distance from the floor to the ceiling in a classroom. Which unit of measurement should the student most likely use to accurately measure this distance?",
    options: ["liter", "kilometer", "meter", "kiloliter"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/907",
    recordId: "MCAS_2006_9_5",
    question: "Which of the following explains why elements, such as carbon and oxygen, that are used in organic molecules are not permanently removed from the environment?",
    options: ["They are replenished by sunlight.", "They are produced constantly from nutrients.", "They are replaced by volcanic eruptions.", "They are cycled through ecosystems."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/908",
    recordId: "MDSA_2007_5_57",
    question: "A student is measuring the speed at which a ball rolls down a ramp. Which unit of measurement is the student most likely using to describe the speed of the ball?",
    options: ["seconds per gram", "meter per liter", "centimeters per second", "milligrams per liter"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/909",
    recordId: "Mercury_SC_408628",
    question: "Marta and Roger are comparing how long it takes two different types of seeds to sprout. They plant both types of seeds in similar pots, place them in a sunny window, and water them daily. If they want to conduct their investigation correctly, which information is most important to record?",
    options: ["the depth of the soil", "the number of days until the seeds sprout", "the temperature of the water", "the size of pot used for growing the seeds"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/910",
    recordId: "Mercury_SC_401310",
    question: "Deposition of sediment will most likely form a",
    options: ["cave.", "river.", "mountain.", "delta."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/911",
    recordId: "Mercury_SC_409172",
    question: "During a space mission, scientists will send experiments for the astronauts to conduct in space. In many cases, scientists have made predictions about the outcome of the experiment. Why do astronauts perform the experiment if the results have already been predicted?",
    options: ["to make a report of the procedures", "to obtain data to test a hypothesis", "to make a complete observation", "to make a hypothesis understandable"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/912",
    recordId: "Mercury_7211628",
    question: "Approximately 14,000 years ago, the climate in North America began to warm rapidly. At the same time, human hunters migrated to the continent. Which of these most likely resulted from a combination of these two factors?",
    options: ["an increase in the amount of interspecies cooperation", "a reduction in the rate of species change", "an increase in the rate of large mammal extinctions", "a reduction in the total number of small parasitic insects"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/913",
    recordId: "Mercury_412777",
    question: "Which is an SI unit for density?",
    options: ["lb/ft^3", "lb", "kg", "kg/m^3"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/914",
    recordId: "MCAS_2000_4_35",
    question: "In the United States, each day the Sun appears to",
    options: ["rise in the north and set in the south.", "rise in the east and set in the west.", "rise in the west and set in the east.", "rise in the south and set in the north."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/915",
    recordId: "Mercury_SC_401358",
    question: "Which substance is magnetic and conducts heat?",
    options: ["paper", "iron", "plastic", "wood"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/916",
    recordId: "Mercury_7181633",
    question: "During a biochemical reaction, pyruvate (C3H4O3) is converted into carbon dioxide (CO2) and water (H2O). In what cellular organelle does this biochemical reaction occur?",
    options: ["endoplasmic reticulum", "nucleus", "cytoplasm", "mitochondria"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/917",
    recordId: "NYSEDREGENTS_2010_8_6",
    question: "A student fails to eat a balanced diet over a period of time. This lack of a balanced diet can lead to",
    options: ["selective breeding", "dynamic equilibrium", "disease", "extinction"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/918",
    recordId: "Mercury_411027",
    question: "In 1989, an oil spill off the coast of Alaska led to a decline in the population of many organisms. Which other population was most likely affected by the drop in population of the fish, otters, and seals?",
    options: ["snakes", "frogs", "deer", "eagles"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/919",
    recordId: "Mercury_7267943",
    question: "Which of these is the best reason for exercising on space flights?",
    options: ["to ensure that bodily fluids do not tend to collect in the feet", "to minimize the loss of muscle mass due to microgravity", "to increase strength for moving around in the cabin", "to keep from becoming overweight on a space mission"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/920",
    recordId: "Mercury_SC_406467",
    question: "With the development of the microscope, scientists were able to see cells for the first time. Why was it difficult to view cells without a microscope?",
    options: ["Cells move quickly.", "Cells are alive.", "Cells have an electrical charge.", "Cells are small."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/921",
    recordId: "MCAS_2006_9_29",
    question: "Fertilizers can enable farmers to grow the same crop in a field for several years in a row. Farmers who use less fertilizer often rotate their crops by planting the crop one year and legumes, such as beans and clover, the following year. Fertilizer use and crop rotation with legumes both increase the availability of which of the following nutrients in soil?",
    options: ["protein", "nitrogen", "calcium", "oxygen"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/922",
    recordId: "NYSEDREGENTS_2013_4_22",
    question: "Which two processes occur during the life spans of all animals?",
    options: ["building nests and communication", "hibernation and migration", "changing color and shedding fur", "growth and development"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/923",
    recordId: "MEAP_2005_8_16",
    question: "Which of the following is true regarding the properties of an air mass?",
    options: ["An air mass has similar temperature and moisture properties throughout it.", "An air mass is cooler near the edges and has greater moisture near the center.", "An air mass has greater moisture near the edges and is cooler near the center.", "An air mass is warmer at the leading edge and cooler at the trailing edge."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/924",
    recordId: "Mercury_SC_402074",
    question: "When entire communities in an ecosystem change over time, it is known as",
    options: ["migration.", "ecological succession.", "extinction.", "overpopulation."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/925",
    recordId: "Mercury_7056543",
    question: "What should be added to soil to increase its water retention?",
    options: ["pebbles", "rocks", "clay", "sand"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/926",
    recordId: "MCAS_2000_4_11",
    question: "A rosebush and a bird are similar because they both",
    options: ["are non-living organisms.", "are living organisms.", "need to search for food.", "make their own food."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/927",
    recordId: "Mercury_7219118",
    question: "The mineral quartz naturally forms in various colors. Which difference in quartz formation results in the different colors?",
    options: ["amount of time passed since the processes occurred", "chemical impurities present as the processes occurred", "temperature at which the processes occurred", "pressure at which the processes occurred"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/928",
    recordId: "Mercury_7043873",
    question: "What happens to a moist air mass as it moves upward in the atmosphere?",
    options: ["Its temperature varies greatly.", "It becomes cooler and forms clouds.", "Its temperature remains the same.", "It becomes warmer and forms clouds."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/929",
    recordId: "Mercury_7207060",
    question: "Greenhouse gases in the atmosphere absorb infrared radiation from Earth's surface and re-radiates some of it back to Earth. Which of these gases have the most significant impact on the temperature of Earth's atmosphere?",
    options: ["carbon dioxide and water vapor", "nitrogen and argon", "hydrochloric acid and hydrogen", "oxygen and sulfur dioxide"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/930",
    recordId: "Mercury_7090563",
    question: "Volcanoes are considered constructive because they",
    options: ["release gases.", "cause erosion.", "trigger earthquakes.", "deposit lava."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/931",
    recordId: "Mercury_SC_402623",
    question: "What happens to sugar when it is combined with water?",
    options: ["it separates", "it becomes warm", "it floats to the top", "it dissolves"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/932",
    recordId: "Mercury_SC_416138",
    question: "Pesticides are chemicals that kill insects. What could happen if the pesticides killed all the pollinators near some apple trees?",
    options: ["The trees could not make leaves.", "The trees could not make seeds.", "The trees could not make flowers.", "The trees could not make bark."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/933",
    recordId: "Mercury_SC_405510",
    question: "Which statement describes the formation of a delta?",
    options: ["A mass of sediment is deposited at the mouth of a river.", "A low area of land is surrounded by mountains.", "A large mass of ice and snow accumulates.", "A mound of sand is built by wind."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/934",
    recordId: "MDSA_2013_8_33",
    question: "Hydrogen and oxygen combine to form water. The water in this reaction is described as",
    options: ["a reactant", "a compound", "an atom", "an element"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/935",
    recordId: "Mercury_7271373",
    question: "Which of these cell parts store genetic instructions for the entire organism and transfers them from one generation to the next?",
    options: ["chloroplasts", "nuclear membranes", "mitochondria", "DNA molecules"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/936",
    recordId: "Mercury_400629",
    question: "Which list describes the particles that make up an atom?",
    options: ["protons, neutron, and electrons", "ionic bonds, covalent bonds, and ions", "nucleus, electrons, and quarks", "nucleus, electron cloud, and energy levels"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/937",
    recordId: "MEA_2010_8_9",
    question: "Earth has a limited supply of fresh drinking water. Which method is used to recycle water for humans to use?",
    options: ["bottling water", "wastewater treatment", "collecting rainwater", "dam construction"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/938",
    recordId: "Mercury_7217595",
    question: "A plover bird eats bits of food that become stuck in a crocodile's teeth without being hurt. The crocodile gets its teeth cleaned and the bird gets food. Which type of relationship exists between the bird and the crocodile?",
    options: ["mutualism", "parasitism", "commensalism", "phototropism"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/939",
    recordId: "MEA_2010_8_6-v1",
    question: "What can scientists learn about the past by studying sedimentary rocks?",
    options: ["the color of leaves on a plant", "the number of chambers in a dinosaur's heart", "how animals made a shelter", "how a species changed over time"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/940",
    recordId: "AKDE&ED_2008_8_39",
    question: "A scientific explanation should include a demonstration of the relationships between",
    options: ["changes, interactions, and formulas.", "measurement, form, and function.", "logic, evidence, and current knowledge.", "hypothesis, problem solving, and lab equipment."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/941",
    recordId: "Mercury_406546",
    question: "A plant that has traits identical to the parent plant provides evidence that the plant",
    options: ["resulted from sexual reproduction.", "resulted from asexual reproduction.", "will have large leaves.", "will develop many seeds."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/942",
    recordId: "AKDE&ED_2012_8_15",
    question: "Which property would best help a student determine if two substances are made of two different elements?",
    options: ["shape", "mass", "density", "volume"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/943",
    recordId: "Mercury_SC_400610",
    question: "Evidence of organisms that lived on Earth a long time ago would most likely be found in",
    options: ["crystals.", "metamorphic rock.", "sedimentary rock.", "lava."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/944",
    recordId: "Mercury_SC_400532",
    question: "Which type of energy does a radiator give off ?",
    options: ["solar", "light", "electrical", "heat"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/945",
    recordId: "MCAS_2005_8_1",
    question: "While hiking through Granville State Forest, a student finds an unusual plant-like organism that appears to lack chlorophyll. When the student examines a sample using a microscope, he sees many cells with cell walls and no chloroplasts. This organism is most likely a member of what Kingdom?",
    options: ["Fungi", "Protista", "Animalia", "Eubacteria"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/946",
    recordId: "Mercury_400620",
    question: "A student conducts an experiment to determine the effect soap has on the growth of radish seeds. He puts 30 seeds in three different dishes: one with water, one with a 1% soap solution, and one with a 10% soap solution. Which type of data should he collect?",
    options: ["number of seeds germinated and average length of shoot", "type of detergent and amount of solution used", "size of seeds and amount of solution used", "time of day and number of seeds germinated"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/947",
    recordId: "MCAS_8_2015_12",
    question: "Which of the following statements best describes how the use of interchangeable parts has affected car manufacturing?",
    options: ["The number of countries producing cars has decreased.", "The need for custom manufacturing has increased.", "The efficiency of manufacturing plants has increased.", "The number of cars produced has decreased."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/948",
    recordId: "Mercury_7234623",
    question: "Which quantity must equal zero if a car is moving at a constant rate along a straight line?",
    options: ["acceleration of the car", "direction of the car", "energy of the car", "speed of the car"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/949",
    recordId: "Mercury_7211260",
    question: "Which widely used energy sources are nonrenewable and also a source of greenhouse gas emissions?",
    options: ["solar cells", "hydroelectric dams", "fossil fuels", "wind turbines"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/950",
    recordId: "MCAS_2001_8_19",
    question: "Use the information below to answer the question. In solid fuel rockets, a fuel mixture is burned and once the mixture starts burning it cannot be stopped. In liquid fuel rockets, there is a tank of fuel and a tank of oxygen. The burning of the fuel can be stopped by preventing the flow of fuel and oxygen into the combustion chamber. Based on this information, which system is more highly developed in liquid fuel rockets than in solid fuel rockets?",
    options: ["structure", "control", "propulsion", "suspension"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/951",
    recordId: "Mercury_SC_402117",
    question: "Some research has shown that the burning of fossil fuels contributes to an effect called global warming, which scientists believe is changing the chemical makeup of Earth's atmosphere. Use of which invention would help lower this effect?",
    options: ["digital camera", "electric car", "high-speed Internet", "battery-powered radio"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/952",
    recordId: "TIMSS_2007_8_pg29",
    question: "Which food contains the highest percentage of protein?",
    options: ["rice", "carrots", "chicken", "dates"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/953",
    recordId: "Mercury_SC_401126",
    question: "When conducting an investigation involving an open flame, it is most important to",
    options: ["work near the sink to put out possible fires.", "smell the product that is being burned.", "turn out the lights to see better.", "wear appropriate protective clothing and eyewear."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/954",
    recordId: "Mercury_7267488",
    question: "In ecosystems where people live, which of the following are most likely to cause an increase in diseases transmitted by water?",
    options: ["floods", "blizzards", "avalanches", "hailstorms"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/955",
    recordId: "OHAT_2010_8_29",
    question: "Aphids are small insects that sometimes live near ants. The ants protect the aphids from predators. The aphids produce a sweet substance that the ants eat. Which statement describes the relationship between ants and aphids?",
    options: ["Both ants and aphids benefit.", "The ants benefit and the aphids are harmed.", "The aphids benefit and the ants are unaffected.", "Both ants and aphids are unaffected."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/956",
    recordId: "Mercury_7132370",
    question: "Soil will pack down over time which decreases the ability of the soil to hold water. Which animals would best help the soil hold water?",
    options: ["earthworms making tunnels under the surface", "cattle making depressions with their hooves", "horses making trenches when they gallop", "sheep pulling up plants by their roots"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/957",
    recordId: "Mercury_7162803",
    question: "At an archaeological dig site, scientists, volunteers, and students collect items used by people living hundreds of years ago. To determine the history of the different people who may have lived at the site, which is the best method to classify the recovered items?",
    options: ["by the type of item", "by the person who located the item", "by the size of the item", "by the soil layer where the item was found"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/958",
    recordId: "Mercury_7026530",
    question: "It is hypothesized that in the next 200 years, the lowest land areas on Earth could be submerged beneath rising oceans. Which climate change would most likely cause this to occur?",
    options: ["decreased winds", "increased desertification", "global warming", "the start of an ice age"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/959",
    recordId: "MCAS_2012_8_23653",
    question: "Miriam notices when she goes to the beach that sometimes the water rises as high as the pier. At other times of the day, the water barely covers the pillars under the pier. These differences in water level are primarily due to the gravitational influence of which of the following?",
    options: ["comets", "the Moon", "asteroids", "the Sun"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/960",
    recordId: "CSZ_2009_8_CSZ30585",
    question: "Copper (Cu) reacts with oxygen (O) to form copper oxide (CuO). The properties of CuO are most likely",
    options: ["different from copper or oxygen.", "similar to both copper and oxygen.", "similar only to oxygen.", "similar only to copper."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/961",
    recordId: "MCAS_8_2014_13",
    question: "Carbon dioxide produced by cells is removed from the body primarily by which body system?",
    options: ["excretory", "immune", "respiratory", "digestive"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/962",
    recordId: "Mercury_416377",
    question: "The ocean minimum zone, or OMZ, is an area from 200 to 600 meters below the ocean's surface. The OMZ is dark and cold, with oxygen concentrations less than 10% of concentrations in surface water. Oxygen concentrations are so low because of bacterial activity that breaks down organic material falling from surface waters. Given the conditions in the OMZ, which of these dissolved gases would you expect to find in large concentrations in this zone?",
    options: ["nitrogen", "carbon monoxide", "carbon dioxide", "argon"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/963",
    recordId: "Mercury_407668",
    question: "Two students went fishing one morning and caught 20 fish. The afternoon before, they caught 5 fish. Because of their morning success, they claimed that morning was the best time to fish. Which of these would most likely disprove their claim?",
    options: ["catching more than 20 fish the next afternoon", "catching more than 20 fish in the same location", "catching more than 20 fish in another location", "catching more than 20 fish the next morning"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/964",
    recordId: "Mercury_SC_406664",
    question: "Which question can be answered by scientific experimentation and observation?",
    options: ["How many organisms have lived on Earth?", "How many stars are in the universe?", "Are dogs better pets than cats?", "In what type of light will a plant grow best?"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/965",
    recordId: "Mercury_7188510",
    question: "During cellular respiration glucose molecules undergo a series of reactions. This process results in the formation of up to 38 molecules of high-energy ATP per each molecule of glucose. Which is the source of the energy stored in these ATP molecules?",
    options: ["chemical energy originally stored in the glucose molecule", "kinetic energy generated by the chemical reactions", "electric current created during the destruction of electrons in the glucose", "potential energy from the difference in the concentration gradients of the cell"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/966",
    recordId: "Mercury_7146178",
    question: "Lea is investigating how phosphates affect oxygen levels in pond water. For part of the investigation, she uses pond water that contains no phosphates. The pond water without phosphates would be what part of the investigation?",
    options: ["control group", "experimental group", "hypothesis", "conclusion"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/967",
    recordId: "NYSEDREGENTS_2015_4_16",
    question: "Which tool should a student use to examine spots on a frog?",
    options: ["hand lens", "graduated cylinder", "thermometer", "magnet"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/968",
    recordId: "Mercury_SC_408740",
    question: "A group of scientists is studying the effect of cell phone signals on honeybees. Before starting the investigation, the scientists stated that the bees exposed to cell phone signals will have difficulty finding their way back to the hive. Which term best describes the statement made by the group of scientists?",
    options: ["data", "hypothesis", "variable", "control"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/969",
    recordId: "Mercury_SC_401811",
    question: "Which system is most responsible for transporting blood throughout the body?",
    options: ["excretory system", "digestive system", "skeletal system", "circulatory system"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/970",
    recordId: "MCAS_1999_8_23",
    question: "Five hundred flies of one species were sprayed with a new insecticide. Twenty-four hours later, nearly all the flies were dead. However, a few survived. Which principle best explains why some flies survived?",
    options: ["Animals adapt to new environments.", "New species develop from survivors.", "Insecticides may cause genetic mutations.", "There is variation among individuals within a species."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/971",
    recordId: "Mercury_7124268",
    question: "A student investigated the effect of the color of light on the growth of plants. Red, yellow, and green lights were used in the experiment. If another student were to conduct the same experiment, which would be the most important procedure to follow to yield the same results?",
    options: ["to use the same colors of lights", "to do the investigation in the same room", "to do the investigation at the same time of year", "to use the same chart for recording growth"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/972",
    recordId: "Mercury_SC_400663",
    question: "A large mammal lives in a cold, snowy environment. Which adaptation would best help the mammal survive in low temperatures?",
    options: ["thick fur", "strong muscles", "large ears", "sharp claws"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/973",
    recordId: "Mercury_7207078",
    question: "The temperatures in space vary from extremely cold to extremely hot. Earth's surface temperature is relatively stable. Which of these is most responsible for Earth's surface temperatures?",
    options: ["many volcanic eruptions near the Ring of Fire", "plankton distribution in shallow ocean waters", "the greenhouse effect in the atmosphere", "solar radiation reflected from the Moon"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/974",
    recordId: "MCAS_2003_8_10",
    question: "Which of the following correctly lists the organizational hierarchy of organisms from simplest to most complex?",
    options: ["tissues, organs, cells, organ systems, organisms", "cells, tissues, organs, organ systems, organisms", "tissues, cells, organs, organ systems, organisms", "cells, organs, tissues, organ systems, organisms"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/975",
    recordId: "Mercury_SC_416136",
    question: "The carrion flower smells like rotting meat. What kind of pollinator is most likely attracted to the carrion flower?",
    options: ["wasp", "moth", "butterfly", "fly"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/976",
    recordId: "NAEP_2000_8_S11+5",
    question: "Which of the following best explains why the pressure inside a high-flying airplane must be controlled?",
    options: ["If the cabin is not pressurized, ozone and other upper atmospheric gases will enter the airplane.", "If the cabin is not pressurized, carbon dioxide will escape from the airplane.", "At high altitudes there is greater atmospheric pressure than on the surface of the Earth.", "At high altitudes there is lower atmospheric pressure than on the surface of the Earth."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/977",
    recordId: "Mercury_SC_400376",
    question: "Hurricanes are large, powerful storms that form as they travel over warm ocean waters. What do oceans add to make hurricanes so strong?",
    options: ["salt and water", "heat and moisture", "wind and tides", "waves and flooding"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/978",
    recordId: "NYSEDREGENTS_2013_8_19",
    question: "Abnormal cell division may result in",
    options: ["cancer", "disease prevention", "tissue repair", "metamorphosis"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/979",
    recordId: "LEAP__7_10345",
    question: "What is the main reason humans need nitrogen to survive?",
    options: ["Nitrogen is used in making the proteins in the body.", "Nitrogen is used in respiration to generate energy.", "Nitrogen is used to help the body eliminate wastes.", "Nitrogen is used by nerve cells to conduct impulses."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/980",
    recordId: "Mercury_7161473",
    question: "The phases of the Moon are daily changes in the appearance of the Moon. One reason Moon phases occur is because the Moon reflects sunlight. Which is another reason that the phases of the Moon occur?",
    options: ["The Moon rises and sets.", "The Moon orbits Earth.", "Earth orbits the Sun.", "Earth is tilted on the axis."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/981",
    recordId: "MCAS_2006_9_42",
    question: "Some campers are sitting around a campfire outside their tent. Which product of the fire is in the form of electromagnetic waves?",
    options: ["light", "water vapor", "sound", "smoke"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/982",
    recordId: "Mercury_410467",
    question: "Jon had a flat tire on his car. He used a hydraulic jack to lift the car up so that he could change the tire. If Jon knows the amount of force used to lift the car 0.25 meter off of the ground, what is he able to calculate?",
    options: ["power", "momentum", "work", "pressure"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/983",
    recordId: "Mercury_SC_416161",
    question: "Which organ is made mostly of muscle?",
    options: ["heart", "ear", "lung", "brain"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/984",
    recordId: "Mercury_404614",
    question: "Which is considered a property of soil?",
    options: ["fracture", "luster", "streak", "texture"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/985",
    recordId: "Mercury_7220833",
    question: "Which of these had the greatest impact on the current shape of Nevada's basin and range landscape?",
    options: ["plate tectonics", "wind erosion", "tidal forces", "global warming"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/986",
    recordId: "MCAS_2005_9_19-v1",
    question: "Which of the following is the primary way that evergreen trees planted on the north and west sides of residences in Massachusetts help reduce winter heating costs?",
    options: ["They optimize solar heating.", "They act as a windbreak.", "They insulate against cold air.", "They reduce radiant cooling."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/987",
    recordId: "Mercury_SC_407376",
    question: "Air is composed of nitrogen, oxygen, and other gases. Based on that information, air can be described as",
    options: ["a molecule.", "a mixture.", "an element.", "a compound."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/988",
    recordId: "ACTAAP_2008_5_5",
    question: "Which action should be taken in order to identify the streak of a mineral during an investigation?",
    options: ["Dip the mineral in acid", "Heat the mineral until it melts", "Weigh the mineral", "Drag an edge of the mineral across a tile"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/989",
    recordId: "Mercury_7220010",
    question: "In Type 1 diabetes, the immune system attacks the pancreatic cells that produce insulin. Without insulin, people that have Type 1 diabetes are unable to regulate blood glucose levels. What two symptoms are most likely associated with Type 1 diabetes?",
    options: ["excessive loss of coordination and memory", "intense aches and spasms", "extreme thirst and weight loss", "severe loss of hearing and vision"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/990",
    recordId: "Mercury_7041878",
    question: "When the cardboard cone of a radio speaker vibrates, it produces a sound in the air around it. The cone produces this sound by transferring which of the following to the air around it?",
    options: ["magnetic force", "wave motion", "current", "heat"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/991",
    recordId: "Mercury_LBS10126",
    question: "During a demonstration, a teacher pours CO_{2} gas over a candle, putting out the flame. Which physical property allows the teacher to pour the CO_{2} gas?",
    options: ["The gas smells different from the air.", "The gas is more visible than the air.", "The gas evaporates faster than the air.", "The gas is more dense than the air."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/992",
    recordId: "Mercury_7030783",
    question: "Atoms of the same element can have different atomic masses because they can have different numbers of",
    options: ["protons.", "neutrinos.", "electrons.", "neutrons."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/993",
    recordId: "Mercury_SC_402642",
    question: "Which would be the best conductor of electricity?",
    options: ["cork", "silver", "air", "water"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/994",
    recordId: "Mercury_SC_401269",
    question: "Part of a scientific method involves collecting data in order to",
    options: ["write a procedure.", "make an observation.", "change a theory.", "test a hypothesis."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/995",
    recordId: "Mercury_7162785",
    question: "Gravity is a measurable force of attraction which acts upon objects. Which characteristic determines the gravity of an object?",
    options: ["mass", "weight", "friction", "tension"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/996",
    recordId: "TIMSS_2007_8_pg102",
    question: "Which is NOT an example of a chemical change?",
    options: ["Melting ice", "Burning match", "Rotting vegetation", "corroding silver"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/997",
    recordId: "AKDE&ED_2008_8_30",
    question: "Seasons in Alaska are primarily caused by which factor as Earth revolves around the Sun?",
    options: ["the relative distance between Earth and the Sun", "the rate of rotation of Earth", "the effects of solar flare activity", "the tilt of Earth on its axis"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/998",
    recordId: "Mercury_7032393",
    question: "A student needs to measure out a precise amount of liquid. What is the best tool for the student to use?",
    options: ["test tube", "meter stick", "balance scale", "graduated cylinder"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/999",
    recordId: "NYSEDREGENTS_2015_4_23",
    question: "An octopus squirts black ink around itself to hide from predators. This adaptation is an example of",
    options: ["a transfer of energy", "creating shelter", "a defense mechanism", "recycling nutrients"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1000",
    recordId: "Mercury_SC_LBS10177",
    question: "Earthquakes are vibrations of Earth's crust. What device is used to measure the size of an earthquake?",
    options: ["depth scale", "barometer", "seismograph", "Doppler radar"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1001",
    recordId: "TIMSS_1995_8_L3",
    question: "A girl found the skull of an animal. She did not know what the animal was but she was sure that it preyed on other animals for its food. What clue led to this conclusion?",
    options: ["There was a projecting ridge along the top of the skull.", "Four of the teeth were long and pointed.", "The jaws could move sideways as well as up and down.", "The skull was much longer than it was wide.", "The eye sockets faced sideways."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1002",
    recordId: "TIMSS_2003_4_pg25",
    question: "Which one of these animals does NOT lay eggs?",
    options: ["dogs", "turtles", "chickens", "frogs"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1003",
    recordId: "Mercury_416637",
    question: "Which characteristic does a euglena share with an amoeba?",
    options: ["They eat by phagocytosis.", "They respond to light stimuli.", "They move by changing shape.", "They reproduce by mitosis."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1004",
    recordId: "MEAP_2005_8_1",
    question: "Which of the following is most likely to disrupt the natural balance in an ecosystem?",
    options: ["introduction of a non-native species", "reduced daylight hours during winter", "riverbank erosion resulting from springtime flooding", "preventing the cutting of trees in forests"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1005",
    recordId: "Mercury_LBS10287",
    question: "Which of these correctly lists Earth's layers in order from the center to the surface?",
    options: ["outer core, inner core, asthenosphere, lithosphere", "inner core, outer core, asthenosphere, lithosphere", "inner core, asthenosphere, lithosphere, outer core", "asthenosphere, lithosphere, outer core, inner core"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1006",
    recordId: "Mercury_7107993",
    question: "The element nitrogen can be found in simple, nonliving substances, such as air, and in complex molecules in living organisms, such as DNA. Which statement explains why nitrogen can exist in many compounds?",
    options: ["Nitrogen atoms have different amounts of energy.", "Nitrogen atoms can bond to different atoms.", "Nitrogen atoms are different sizes.", "Nitrogen atoms are different ages."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1007",
    recordId: "Mercury_7238928",
    question: "An enzyme in the Golgi apparatus catalyzes the addition of phosphates to which class of molecule?",
    options: ["nucleic acid", "carbohydrate", "protein", "lipid"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1008",
    recordId: "NAEP_2005_8_S13+8",
    question: "Which is an example of water condensing? 1.",
    options: ["Ice cubes melting when you put them out in the sun", "Sweat forming on your forehead after you do a lot of exercise", "Dew forming on plants during a cold night", "puddle disappearing on a hot summer afternoon"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1009",
    recordId: "Mercury_SC_400306",
    question: "A delta at the mouth of a river is the direct result of",
    options: ["an ancient glacier that passed through.", "an underground river flowing to the ocean.", "runoff from sewage.", "deposition of sediment."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1010",
    recordId: "Mercury_7173880",
    question: "Scientists have studied convergent boundaries and the results of the collisions. Besides the fact that mountains occur at these boundaries, which other part of the rock cycle is most likely associated with these areas of convergence?",
    options: ["development of folded rocks", "development of chemical rocks", "development of layered rocks", "development of extrusive rocks"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1011",
    recordId: "ACTAAP_2015_7_1",
    question: "Which statement best describes the effect deforestation has on Earth's atmosphere?",
    options: ["The amount of carbon dioxide increases.", "The amount of water vapor increases.", "The amount of oxygen increases.", "The amount of methane increases."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1012",
    recordId: "Mercury_SC_401275",
    question: "Many scientists think that when birds migrate to the same location each year, they find this location by using Earth's",
    options: ["weather patterns.", "magnetic patterns.", "jet stream.", "electrical discharges."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1013",
    recordId: "Mercury_SC_400361",
    question: "Which form of energy do plants need to capture in order to perform photosynthesis?",
    options: ["solar", "electrical", "heat", "chemical"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1014",
    recordId: "Mercury_7026775",
    question: "A large number of species on Earth became extinct during a short time period about 65 million years ago. Based on this pattern of extinction, which is the most likely cause?",
    options: ["sudden global climate change", "continued climate stability", "gradual ecosystem succession", "gradual climate change"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1015",
    recordId: "Mercury_7284095",
    question: "Sofia put a bat house in a tree in her yard. The bats ate mosquitos in Sofia's yard at night and roosted in the house during the day. Droppings from the bat house nourished the tree. What kind of relationship exists between Sofia, the bats, and the tree?",
    options: ["The relationship is predatory.", "The relationship is cooperative.", "The relationship is competitive.", "The relationship is parasitic."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1016",
    recordId: "Mercury_SC_LBS10901",
    question: "Which of the following is the most basic need for a plant?",
    options: ["heat", "shade", "sand", "water"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1017",
    recordId: "Mercury_7123445",
    question: "A scientific article about the universe will most likely describe the universe as",
    options: ["containing approximately ten planets.", "consisting of billions of galaxies.", "being less than two billion years old.", "becoming smaller over time."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1018",
    recordId: "NYSEDREGENTS_2010_4_11",
    question: "Which tool would be most useful for observing the details of an insect's wings?",
    options: ["balance", "thermometer", "hand lens", "graduated cylinder"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1019",
    recordId: "MCAS_2006_9_40",
    question: "The instructions below outline the procedure for a demonstration. Materials: four 100 g metal blocks, each of a different metal four polystyrene foam cups, each containing 150 g of 10°C water Procedure: 1. Place the four cups of water next to each other on the lab bench. 2. Heat each block to a temperature of 60°C. 3. Place each heated block in a separate cup of 10°C water. 4. Measure the temperature change in each cup of water after 100 s. At the end of the demonstration, which block raised the temperature of the 10°C water the greatest amount?",
    options: ["the block with the lowest surface area", "the block with the greatest density", "the block with the lowest thermal conductivity", "the block with the greatest specific heat"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1020",
    recordId: "Mercury_SC_402270",
    question: "On the Galapagos Islands, an iguana that lives in the water is most likely able to survive without competition from an iguana that lives on land because it",
    options: ["swims faster.", "has a tougher scaly skin.", "has a different food source.", "has a larger body."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1021",
    recordId: "VASoL_2007_3_15",
    question: "Which of these warms most of the air, water, and land on Earth?",
    options: ["Coal", "Wind", "Sunlight", "Electricity"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1022",
    recordId: "Mercury_7138863",
    question: "A teacher was discussing with the class that a bowling ball has more inertia than a basketball. Which physical property is most likely being compared?",
    options: ["volume", "area", "mass", "weight"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1023",
    recordId: "Mercury_SC_415738",
    question: "A dark colored wall becomes warm when the Sun is shining on it. After the Sun sets, a person standing a meter away can feel warmth from the wall. How does heat transfer from the wall to the person?",
    options: ["conduction", "insulation", "radiation", "convection"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1024",
    recordId: "Mercury_7009573",
    question: "During exercise, the cardiovascular system works together with the respiratory system to",
    options: ["remove carbon dioxide.", "filter out waste products.", "produce red blood cells.", "maintain blood pressure."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1025",
    recordId: "Mercury_SC_402053",
    question: "How does flipping a switch turn on a light?",
    options: ["It breaks an electrical circuit.", "It generates electricity.", "It creates a spark.", "It completes an electrical circuit."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1026",
    recordId: "MCAS_2012_8_23650",
    question: "A ship has a satellite communication device to identify the ship's position at sea. For which of the following activities is this device most likely used?",
    options: ["guidance", "control", "propulsion", "suspension"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1027",
    recordId: "MCAS_2005_5_12",
    question: "The purpose of thorns on a plant is most likely to",
    options: ["support the stems and branches.", "anchor the plant in the ground.", "help the plant to get moisture.", "protect the plant from harm."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1028",
    recordId: "TAKS_2009_5_21",
    question: "Which of the following is best classified as a nonrenewable resource?",
    options: ["Grass", "Sunlight", "Oxygen", "Aluminum"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1029",
    recordId: "VASoL_2008_5_26",
    question: "Which of these are the deepest parts of the ocean?",
    options: ["Continental shelves", "Ocean trenches", "Abyssal plains", "Continental slopes"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1030",
    recordId: "ACTAAP_2014_7_2",
    question: "Which human body system forms a barrier between internal body structures and the external environment?",
    options: ["nervous", "digestive", "integumentary", "circulatory"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1031",
    recordId: "Mercury_SC_400523",
    question: "Decaying plants and animals are important to an ecosystem because they",
    options: ["return nutrients to the soil.", "reduce soil erosion.", "cause disease in living organisms.", "recycle oxygen to the air."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1032",
    recordId: "Mercury_SC_402094",
    question: "The area of a small ocean island is slowly shrinking. This is most likely the result of which occurrence?",
    options: ["beach erosion", "falling water", "plant growth", "dissolving rock"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1033",
    recordId: "Mercury_7122500",
    question: "Which of these will most likely result from small meteoroids entering the atmosphere of Earth?",
    options: ["a decrease in air temperature", "the appearance of shooting stars", "the appearance of the Northern Lights", "an decrease in atmospheric ozone"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1034",
    recordId: "Mercury_7107310",
    question: "A main advantage to organisms that reproduce sexually is",
    options: ["greater genetic diversity.", "longer life spans.", "having large numbers of offspring.", "being able to conserve energy."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1035",
    recordId: "Mercury_7007840",
    question: "A pan containing hot water is left on the counter and becomes cool mainly due to",
    options: ["water molecules moving apart.", "hot water reacting with the metal pan.", "cold air penetrating the hot water.", "heat from the water moving into the cooler air."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1036",
    recordId: "AIMS_2008_8_12",
    question: "James placed a breath mint and a lump of toothpaste in a cup of water and let it sit overnight. Which statement best explains why the breath mint was gone the following morning, but the toothpaste was still at the bottom of the cup?",
    options: ["The breath mint had a greater density than the toothpaste.", "The breath mint had a lower density than the toothpaste.", "The breath mint was more soluble than the toothpaste.", "The breath mint was less soluble than the toothpaste."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1037",
    recordId: "Mercury_SC_415350",
    question: "Which is an inherited characteristic on a horse?",
    options: ["a missing tooth", "a steel shoe", "a bruised leg", "a long mane"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1038",
    recordId: "MCAS_2000_8_17",
    question: "Scientists classify matter into various groups. Which group is typically described by the characteristics listed below? • usually solid at room temperature • can be bent or changed in shape without breaking • show a shiny luster when scratched or polished",
    options: ["compounds", "elements", "nonmetals", "metals"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1039",
    recordId: "Mercury_SC_404998",
    question: "Sound waves travel the fastest through dense materials. Through which of these would sound waves travel the SLOWEST?",
    options: ["metal", "water", "glass", "air"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1040",
    recordId: "Mercury_SC_400600",
    question: "A student dissolves a spoonful of sugar in a glass of water and makes a",
    options: ["solvent.", "solution.", "suspension.", "solute."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1041",
    recordId: "Mercury_SC_401611",
    question: "Many scientists are convinced that an increase of certain gases in the atmosphere is affecting global temperatures. What makes this hypothesis difficult to prove?",
    options: ["Many human activities produce these gases.", "Trees absorb these gases.", "Many variables affect global temperatures.", "Global temperatures are rising."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1042",
    recordId: "NCEOGA_2013_8_53",
    question: "How can the rate of an infectious disease be drastically reduced?",
    options: ["by wearing clean clothing daily", "by preventing transmission between people", "by performing dental hygiene three times each day", "by taking medication daily"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1043",
    recordId: "Mercury_7077490",
    question: "Which is needed to determine the amount of gravitational force between two objects?",
    options: ["area and weight", "volume and mass", "distance and mass", "weight and time"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1044",
    recordId: "AKDE&ED_2008_8_38",
    question: "Which tool, when properly used, would best help a student classify a basket of apples into groups based on mass?",
    options: ["balance", "graduated cylinder", "meter stick", "thermometer"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1045",
    recordId: "VASoL_2008_3_38",
    question: "Ice cubes are an example of which form of water?",
    options: ["Gas", "Solid", "Natural", "Liquid"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1046",
    recordId: "Mercury_7251720",
    question: "Which explains how the epithelium offers protection to land-dwelling vertebrates?",
    options: ["Epithelium insulates the vertebrate from hypothermia.", "Epithelium has capillaries to resist iron deficiency.", "Epithelium provides a rigid shell to prevent punctures.", "Epithelium prevents dehydration in vertebrates."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1047",
    recordId: "Mercury_405461",
    question: "Which is the most likely way a scientist collects data during an experiment?",
    options: ["graphs", "computer", "calculator", "observations"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1048",
    recordId: "Mercury_404899",
    question: "Which must be present in order for something to be classified as an organism?",
    options: ["nucleus", "organelle", "organ", "cell"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1049",
    recordId: "Mercury_404107",
    question: "Which mineral is most likely to be found in all of the three major rock types known as metamorphic, igneous, and sedimentary?",
    options: ["gypsum", "halite", "sulfur", "quartz"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1050",
    recordId: "NYSEDREGENTS_2008_4_10",
    question: "A student rubs her hands together on a cold winter day. The heat that warms her hands is produced by",
    options: ["magnetism", "gravity", "light", "friction"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1051",
    recordId: "NYSEDREGENTS_2012_4_19",
    question: "When ocean waters become too warm, some whales travel to colder water. This movement is an example of",
    options: ["hunting", "nest building", "hibernating", "migrating"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1052",
    recordId: "Mercury_405852",
    question: "Students visit an aquarium and watch how an octopus behaves in its tank. Which behavior did the octopus most likely learn from its aquarium environment?",
    options: ["waiting to be fed at the aquarium door", "catching food using its arms", "hiding behind rocks", "being more active at night"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1053",
    recordId: "NYSEDREGENTS_2012_4_18",
    question: "The main function of a fish's fins is to help the fish",
    options: ["reproduce", "breathe", "move", "see"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1054",
    recordId: "Mercury_7166950",
    question: "Stars appear to be blue, white, yellow, and red, even without the aid of a telescope. What causes the different colors of the stars?",
    options: ["the surface temperature", "the distance from the Sun", "the gases that compose the star", "the distance from Earth"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1055",
    recordId: "Mercury_SC_400065",
    question: "What keeps the planets in orbit around the Sun?",
    options: ["gravity", "friction", "magnetism", "air resistance"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1056",
    recordId: "MDSA_2009_8_29",
    question: "Use the information below to answer the question. Cotton is a plant product used to make fabric. Cotton is made of cellulose, a fiber not digestible by humans. Cellulose is composed of many sugar molecules bonded together into long chains. Each sugar molecule contains carbon, hydrogen, and oxygen atoms. When cotton fabric is washed, wrinkles often form. The clothing industry uses chemicals to manufacture some cotton fabrics that are wrinkle-free. Dyes are also added to color the cellulose fibers in cotton. A feature that is common to both cellulose and sugar is that both are",
    options: ["elements", "magnetic", "soluble in water", "compounds"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1057",
    recordId: "Mercury_417461",
    question: "Which animal is an example of an annelid?",
    options: ["a sea star", "an earthworm", "an anteater", "a honey bee"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1058",
    recordId: "Mercury_7271163",
    question: "What ALWAYS happens when the nucleotides in a strand of DNA is rearranged?",
    options: ["The information on the strand changes.", "The organism dies.", "The organism thrives.", "The mass of the strand changes."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1059",
    recordId: "Mercury_7139720",
    question: "The surface of Earth is composed of large tectonic plates that are constantly shifting as they float on top of molten rock. Which process must occur in the mantle to make the plates move?",
    options: ["igneous intrusions", "normal faulting", "seafloor spreading", "convection currents"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1060",
    recordId: "Mercury_400256",
    question: "Which set of tools would be best to use for dissecting in a biology lab?",
    options: ["glass slides, dye, and a light microscope", "scissors, forceps, and a scalpel", "petri dish, flask, and a Bunsen burner", "pen, paper, and a computer"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1061",
    recordId: "Mercury_SC_LBS10618",
    question: "Which of these moves in a regular path around the Sun?",
    options: ["a meteor", "a planet", "a constellation", "a star"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1062",
    recordId: "NCEOGA_2013_8_39",
    question: "Which would best allow a species to survive environmental changes?",
    options: ["similar physical features", "low mutation rate", "genetic diversity", "small population"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1063",
    recordId: "Mercury_SC_400603",
    question: "An electrical component that has a continuous path for electrons to flow is called",
    options: ["a filament.", "a battery.", "a closed circuit.", "an open circuit."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1064",
    recordId: "Mercury_7174003",
    question: "In certain areas, tectonic plates move over hot spots. Which landforms are most likely associated with these hot spots?",
    options: ["island arcs", "mid-ocean ridges", "trenches", "volcanoes"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1065",
    recordId: "Mercury_SC_401629",
    question: "Which tools are used to determine the boiling point of water?",
    options: ["hot plate and thermometer", "hot plate and stopwatch", "thermometer and balance", "balance and graduated cylinder"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1066",
    recordId: "Mercury_7037345",
    question: "A substance that carries sound waves is called",
    options: ["a fulcrum.", "an equilibrium.", "a spectrum.", "a medium."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1067",
    recordId: "NYSEDREGENTS_2013_4_12",
    question: "Which force causes a bicycle to slow down when the brakes are used?",
    options: ["friction", "electricity", "gravity", "magnetism"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1068",
    recordId: "Mercury_7112805",
    question: "The ichthyornis was a type of bird that lived over 65 million years ago. It lived near the sea and hunted for fish over the water. Fossils have been found in Kansas, many miles from the present-day ocean. Which cause of extinction is most likely to be found in the fossil record along with ichthyornis fossils?",
    options: ["changes in the weather", "predator animals", "changes in the environment", "diseases causing illness"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1069",
    recordId: "Mercury_SC_405482",
    question: "Indigo buntings are birds that nest in Florida during the summer. Male buntings are bright blue in color while females are a dull brown. How does the dull brown color of the female buntings help the species survive?",
    options: ["It helps male birds find a mate.", "It helps hide the birds while they sit on their nests.", "It helps the birds find the flock when migrating.", "It helps the birds find food more easily."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1070",
    recordId: "TIMSS_2003_4_pg81",
    question: "Which of these things will dissolve in water?",
    options: ["sugar", "iron filings", "wood chips", "sand"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1071",
    recordId: "MDSA_2011_8_33",
    question: "Students combined baking soda and vinegar to demonstrate a chemical reaction. What indicates that a chemical reaction occurred?",
    options: ["the disappearance of atoms", "a reduction in total mass", "an increase in the number of atoms", "the formation of bubbles"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1072",
    recordId: "Mercury_7137130",
    question: "The loudness of sound can be changed by",
    options: ["increasing the frequency.", "decreasing the pitch.", "decreasing the wavelength.", "increasing the amplitude."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1073",
    recordId: "ACTAAP_2007_7_26",
    question: "A mineral sample is obtained from a box, and acid is dropped on the sample to determine if it bubbles. Which best describes what should be done with the mineral after testing it?",
    options: ["Rinse the mineral with water, dry it, and return it to the box.", "Return the mineral to its box.", "Put the mineral in the sink and leave it for the teacher to clean up.", "Wipe the mineral with a paper towel and return it to the box."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1074",
    recordId: "Mercury_SC_413135",
    question: "At what temperature does water begin to boil?",
    options: ["32°C", "0°C", "212°C", "100°C"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1075",
    recordId: "Mercury_409065",
    question: "Rosa and Ted ate granola bars before competing in a swimming competition. Less than 50% of the chemical energy in the granola bars was converted to mechanical energy during the swim competition. If all the energy in the granola bars was used, which most likely happened to the rest of the energy?",
    options: ["It was converted to thermal energy.", "It was lost as chemical energy.", "It was lost as potential energy.", "It was converted to magnetic energy."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1076",
    recordId: "Mercury_7230598",
    question: "What is the primary energy source driving circulation of ocean currents on Earth?",
    options: ["planetary rotation", "geothermal heating", "solar heating", "lunar tidal forces"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1077",
    recordId: "Mercury_7131023",
    question: "Which statement best explains why the force of a hurricane diminishes as the hurricane moves over land?",
    options: ["The supply of warm, moist air decreases.", "The sea level rises on the coast.", "The winds start to spin clockwise.", "A high pressure area develops."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1078",
    recordId: "AKDE&ED_2012_8_48",
    question: "n 1931, Barbara McClintock discovered that genes could change position on a chromosome. In corn plants, if a certain gene was moved next to the gene that controls kernel color, the kernels in an ear of corn were various colors. Which statement best supports McClintock's discovery?",
    options: ["Genes are able to disappear and reappear in later generations.", "Genes control inherited traits in organisms.", "Chromosomes can move around in the nucleus of a cell.", "Corn plants can reproduce in laboratory environments."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1079",
    recordId: "Mercury_7085558",
    question: "The breaking of a mineral into small, flat sheets is known as",
    options: ["cleavage.", "hardness.", "streak.", "luster."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1080",
    recordId: "CSZ20228",
    question: "Which location on Earth receives the most direct sunlight?",
    options: ["the deserts", "the equator", "the South Pole", "the Western Hemisphere"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1081",
    recordId: "Mercury_7250005",
    question: "All living things are made up of prokaryotic or eukaryotic cells. Which function is found in both prokaryotic and eukaryotic cells?",
    options: ["sexual reproduction", "aerobic respiration", "nitrogen fixation", "protein production"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1082",
    recordId: "Mercury_SC_408039",
    question: "Jamal lives in the Northern Hemisphere. Which season is it when the Northern Hemisphere is pointed away from the Sun?",
    options: ["fall", "winter", "summer", "spring"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1083",
    recordId: "LEAP_2006_4_10275",
    question: "What is an energy change that takes place in a light bulb?",
    options: ["Electrical energy changes to light energy.", "Chemical energy changes to light energy.", "Electrical energy changes to chemical energy.", "Chemical energy changes to heat energy."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1084",
    recordId: "MCAS_2004_5_8",
    question: "When an electric fan is running, most of the incoming electrical energy changes into which kind of energy?",
    options: ["heat energy", "mechanical energy", "sound energy", "light energy"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1085",
    recordId: "Mercury_401643",
    question: "Which trait does a cactus seedling inherit from its parents?",
    options: ["the type of organism that pollinates its flowers", "the number of organisms that consume its fruit", "the length of its spines", "the amount of water it absorbs"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1086",
    recordId: "MCAS_8_2015_4",
    question: "The freezing point of nitrous oxide is -91°C. Which of the following statements best describes the effect on the particles in liquid nitrous oxide as its temperature is lowered to -91°C?",
    options: ["The particles begin to move with a greater force.", "The motion of the particles becomes more random.", "The speed of the particles decreases.", "The particles begin to move in a straight line."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1087",
    recordId: "Mercury_186568",
    question: "Which of the following will absorb heat energy?",
    options: ["two sticks being rubbed together", "steel wool rusting", "a piece of wood burning", "ice cubes melting"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1088",
    recordId: "NYSEDREGENTS_2010_4_16",
    question: "Which behavior will best help a student stay healthy?",
    options: ["exercising once a month", "sleeping three hours each night", "eating fruits and vegetables each day", "watching television five hours a day"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1089",
    recordId: "Mercury_7210630",
    question: "Which of these includes Earth?",
    options: ["the Eagle Nebula", "the solar system", "the asteroid belt", "the Andromeda Galaxy"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1090",
    recordId: "Mercury_SC_401264",
    question: "The vertical axis on a graph is the y-axis. What is most likely placed along the y-axis?",
    options: ["element symbols", "dependent variables", "negative numbers", "independent variables"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1091",
    recordId: "Mercury_SC_406016",
    question: "Monica learned that humans are born knowing how to do some things and they learn how to do other things. Which is a behavior humans learn?",
    options: ["blinking", "swimming", "breathing", "crying"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1092",
    recordId: "NYSEDREGENTS_2012_4_13",
    question: "Which factor will cause a decrease in the force of attraction between two magnets?",
    options: ["increasing the size of the two magnets", "changing the texture of the two magnets", "increasing the distance between the two magnets", "changing the color of the two magnets"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1093",
    recordId: "Mercury_SC_402071",
    question: "What event occurs because of the rotation of Earth?",
    options: ["changes in the weather", "night and day", "four seasons", "tides"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1094",
    recordId: "Mercury_7025130",
    question: "The identifying characteristic of an element is its number of",
    options: ["electrons.", "neutrons.", "orbitals.", "protons."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1095",
    recordId: "MEA_2013_8_19",
    question: "A species of wasp lays its eggs in the larva of another insect. The wasp is a parasite, and the larva is the host. What is the relationship between the parasite and the host?",
    options: ["The parasite is harmed and the host benefits.", "Both the parasite and the host are harmed.", "Both the parasite and the host benefit.", "The parasite benefits and the host is harmed."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1096",
    recordId: "Mercury_416581",
    question: "Which structural characteristic is present in a paramecium that is not present in an amoeba?",
    options: ["cytoplasm", "cell wall", "cytoskeleton", "pellicle"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1097",
    recordId: "Mercury_410593",
    question: "The structures in the bodies of many organisms have levels of organization that help the body to carry out life processes. Which list correctly shows how these levels are organized from the simplest to the most complex?",
    options: ["tissue, cell, organ, organ system", "organ, cell, organ system, tissue", "organ system, tissue, organ, cell", "cell, tissue, organ, organ system"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1098",
    recordId: "Mercury_SC_400842",
    question: "Which safety gear are most important to wear when working near an open flame?",
    options: ["thermal gloves and goggles", "rubber shoes and sunglasses", "lab apron and goggles", "sunglasses and thermal gloves"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1099",
    recordId: "Mercury_SC_405881",
    question: "Recycling is important to the environment because it",
    options: ["produces more carbon dioxide for plants.", "is a good way to earn money.", "decreases the amount of natural resources.", "is a way of conserving nonrenewable resources."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1100",
    recordId: "Mercury_SC_409563",
    question: "Jamil studied how the position of Earth around the Sun affects the energy available on Earth. Which best explains why a particular place on Earth receives more energy during summer months than winter months?",
    options: ["the amount of rays produced by the Sun", "the tilt of Earth", "the rotation of Earth", "the distance between Earth and the Sun"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1101",
    recordId: "Mercury_7206133",
    question: "Shale is a common sedimentary rock. Which of these was required to form shale?",
    options: ["condensing", "compacting", "evaporating", "melting"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1102",
    recordId: "MCAS_2006_5_1",
    question: "In the water cycle, rain, snow, or sleet falling to the ground is a form of",
    options: ["evaporation.", "transpiration.", "precipitation.", "condensation."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1103",
    recordId: "Mercury_7200585",
    question: "Cells perform many different processes that an organism needs to survive and grow. Which is the main function of the process of cellular respiration?",
    options: ["the production of sugar", "the release of energy", "the removal of waste products from the cell", "the formation of new proteins for the cell"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1104",
    recordId: "NYSEDREGENTS_2010_4_18",
    question: "A student places soil in a plastic container to make a home for some worms. The student cuts holes in the top of the container because the worms need",
    options: ["space to move", "sound to communicate", "sunlight to grow", "air to breathe"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1105",
    recordId: "Mercury_7083738",
    question: "If it is determined that the particles in one solid are arranged in a repeating pattern and the particles in another solid are arranged randomly, what must be true about the solids?",
    options: ["They are different substances.", "They are different mixtures.", "They have the same densities.", "They have the same weight."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1106",
    recordId: "Mercury_7247083",
    question: "When manned space exploration began, NASA used the gravity assist concept so that spacecraft could conserve fuel. Which statement explains why the gravity assist concept was useful for spacecraft to successfully travel and return to Earth?",
    options: ["It gave spacecraft a timed trajectory.", "It ensured spacecraft would return home safely.", "It ensured spacecraft would avoid being pulled into the sun.", "It was helpful in planning spacecraft trajectories."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1107",
    recordId: "Mercury_182945",
    question: "In which of the following organs is an acid produced?",
    options: ["esophagus", "small intestine", "large intestine", "stomach"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1108",
    recordId: "Mercury_7200148",
    question: "It took Stephen 12 seconds to run across a grass field. Which additional information does he need in order to calculate his acceleration during the run?",
    options: ["the direction he ran and the average speed", "the beginning velocity and the ending velocity", "the distance he ran and the average velocity", "the beginning speed and the direction he ran"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1109",
    recordId: "MEA_2016_8_18",
    question: "What are two of Earth's natural resources?",
    options: ["forests and waterfalls", "nuclear power plants and batteries", "batteries and waterfalls", "forests and nuclear power plants"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1110",
    recordId: "MCAS_2001_5_15",
    question: "In New England, there are noticeable patterns of seasonal change. Which information could you collect to BEST illustrate this change?",
    options: ["amount of precipitation", "wind speed", "air temperature", "number of cloudy days"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1111",
    recordId: "NYSEDREGENTS_2015_4_15",
    question: "Volume and mass are properties of",
    options: ["friction", "sound", "light", "matter"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1112",
    recordId: "MCAS_2013_8_29418",
    question: "Which of the following do water (H2O), rust (Fe2O3), and salt (NaCl) have in common?",
    options: ["Water, rust, and salt are mixtures.", "Water, rust, and salt are elements.", "Water, rust, and salt are compounds.", "Water, rust, and salt are atoms."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1113",
    recordId: "NCEOGA_2013_8_13",
    question: "Which of these careers would a student studying biotechnology most likely pursue?",
    options: ["geology", "electrical engineering", "astronomy", "agricultural research"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1114",
    recordId: "Mercury_177153",
    question: "The first person to introduce the idea of the continents moving around the surface of Earth was",
    options: ["Alfred Wegener.", "Albert Einstein.", "Charles Darwin.", "Niels Bohr."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1115",
    recordId: "Mercury_7228305",
    question: "The cells of organisms found in the phylum Porifera (sponges) are not organized into tissues. What structures are absent in organisms belonging to the phylum Porifera?",
    options: ["organs", "cells", "organelles", "genes"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1116",
    recordId: "Mercury_SC_405856",
    question: "A class wanted to see which paper airplane design could fly the farthest. In order to have the most accurate results, every student should",
    options: ["buy the same color of paper.", "use the same size of paper.", "fold the paper the same way.", "decorate the paper the same way."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1117",
    recordId: "Mercury_SC_401000",
    question: "The following advertisement was placed in the window of a camping supply store. \"The double-thermal 'Polar Snooze' sleeping bag is here! It will keep you warm for winter camping!\" Based on this advertisement, the best conclusion about Polar Snooze sleeping bags is that they",
    options: ["have insulation.", "make winter camping easy.", "are lightweight.", "cost less than other sleeping bags."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1118",
    recordId: "NYSEDREGENTS_2010_4_9",
    question: "About how long does it take for Earth to make one revolution around the Sun?",
    options: ["one month", "one year", "one week", "one day"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1119",
    recordId: "TIMSS_2011_8_pg25",
    question: "Twins are born. One is a boy and one is a girl. Which statement is correct about their genetic makeup?",
    options: ["The boy and girl inherit genetic material from the mother only.", "The boy inherits genetic material from the father only and the girl inherits it from the mother only.", "The boy and girl inherit genetic material from the father only.", "The boy and girl inherit genetic material from both parents."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1120",
    recordId: "Mercury_7004795",
    question: "Which particles are responsible for the electric charge of an atom?",
    options: ["protons and neutrons", "protons and electrons", "molecules and electrons", "neutrons and molecules"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1121",
    recordId: "TIMSS_2007_4_pg64",
    question: "Which is the best source of vitamins and minerals?",
    options: ["meat, fish, and poultry", "fruits and vegetables", "bread, rice, and pasta", "milk and milk products"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1122",
    recordId: "VASoL_2008_5_14",
    question: "Copper wire is often wrapped in plastic. Plastic material is a good",
    options: ["electromagnet", "current", "insulator", "circuit"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1123",
    recordId: "Mercury_416636",
    question: "Teresa is making a list of the similarities and differences between a euglena and a volvox cell. In which way is the euglena different from the volvox cell?",
    options: ["A euglena can live in fresh water.", "A euglena can respond to light.", "A euglena can regulate water intake.", "A euglena can only reproduce asexually."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1124",
    recordId: "TIMSS_2003_4_pg11",
    question: "If the body takes in more food than it uses.",
    options: ["breathing becomes faster.", "the food is stored as fat.", "weight is lost.", "the heart rate increases."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1125",
    recordId: "Mercury_SC_401129",
    question: "The mass of an object is measured using which unit?",
    options: ["yard", "gram", "liter", "meter"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1126",
    recordId: "Mercury_7263095",
    question: "The Sun transforms matter into energy through nuclear fusion. What can be inferred about the Sun from this fact?",
    options: ["The Sun is losing volume and helium.", "The Sun is losing volume and hydrogen.", "The Sun is losing mass and helium.", "The Sun is losing mass and hydrogen."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1127",
    recordId: "VASoL_2009_3_25",
    question: "Which job is done in Virginia only during the fall season?",
    options: ["Selling clothes", "Building houses", "Feeding animals", "Picking apples"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1128",
    recordId: "MCAS_1999_8_28",
    question: "A scientist is studying the effect of acid rain on oak trees. Of the numbers below, which would be the number of oak trees the scientist should use to obtain the most reliable data?",
    options: ["2", "20", "1", "200"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1129",
    recordId: "VASoL_2009_3_28",
    question: "Camouflage MOST helps an animal with which of these life needs?",
    options: ["Gathering enough food", "Finding shelter", "Raising young", "Hiding from predators"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1130",
    recordId: "Mercury_7191188",
    question: "There are a variety of events that can disrupt ecosystems. Some events result in local disturbances and others can affect a much larger area. Which event would most likely result in change on a global scale?",
    options: ["destruction of tropical rain forests", "converging plate boundaries", "erosion of ocean shorelines", "land scarred by forest fires"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1131",
    recordId: "Mercury_7027545",
    question: "A hardware designer finds that the wiring in a circuit is releasing enough heat to make the circuit dangerously hot. Which change would best solve this problem?",
    options: ["reversing the direction of current flow in the circuit", "placing rubber insulation on wires in the circuit", "using circuit wires with a lower resistance", "increasing the current in the circuit"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1132",
    recordId: "Mercury_SC_408884",
    question: "There are different kinds of muscles in the human body. Each muscle is formed from a group of cells that works together. The main function of a group of muscle cells is to",
    options: ["release energy.", "make oxygen.", "digest nutrients.", "cause movement."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1133",
    recordId: "Mercury_SC_405865",
    question: "Four objects are on a wooden ramp. Which object is most likely to roll off the ramp if it is pushed gently?",
    options: ["round ball", "wooden cube", "flat eraser", "bent paper clip"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1134",
    recordId: "Mercury_SC_401225",
    question: "When zinc and copper are melted together, brass is formed. Brass is an example of",
    options: ["a solute.", "a mixture.", "an element.", "a mineral."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1135",
    recordId: "LEAP_2008_4_10286",
    question: "Choose the investigation that would best answer the question: Does the length of a string change how fast a pendulum swings?",
    options: ["Tie identical weights to a long string.", "Tie two different weights to two identical strings.", "Tie two different weights to a string.", "Tie identical weights to two strings of different lengths."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1136",
    recordId: "Mercury_7283343",
    question: "Meiosis is necessary for which reproductive event to occur?",
    options: ["vegetative budding", "cloning", "fertilization", "binary fission"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1137",
    recordId: "Mercury_7123533",
    question: "Some astronauts may spend several months in space orbiting Earth. Where do these astronauts most likely stay while in space?",
    options: ["in a space shuttle", "in a lunar module", "on a space probe", "on a space station"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1138",
    recordId: "Mercury_7008260",
    question: "Which is a possible consequence of global warming?",
    options: ["a decrease in temperature, causing earlier frosts", "an increase in the amount of coral reefs", "a decrease in temperature, causing shorter growing seasons", "an increase in the number of heat waves, causing droughts"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1139",
    recordId: "Mercury_SC_400658",
    question: "A brown bear eats a variety of foods including berries, insects, and small animals. Which best describes a brown bear?",
    options: ["carnivore", "herbivore", "omnivore", "producer"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1140",
    recordId: "NYSEDREGENTS_2013_8_7",
    question: "In which part of a plant cell does photosynthesis occur?",
    options: ["nucleus", "chloroplast", "cell wall", "cell membrane"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1141",
    recordId: "Mercury_SC_415454",
    question: "Which alternative energy resource adds carbon dioxide to the atmosphere?",
    options: ["biofuel energy", "geothermal energy", "wind energy", "nuclear energy"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1142",
    recordId: "Mercury_SC_405340",
    question: "Energy from the Sun changes a liquid to a gas by the process of",
    options: ["freezing.", "condensation.", "melting.", "evaporation."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1143",
    recordId: "Mercury_SC_407371",
    question: "Which of the following is a result of the tilt of Earth's axis?",
    options: ["hours in a day", "moon phases", "seasonal changes", "heights of tides"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1144",
    recordId: "Mercury_7211505",
    question: "Chloroplasts absorb light energy. The function of the chloroplast is to",
    options: ["transform proteins into useful nutrients.", "synthesize proteins.", "transform sugar into cellular energy.", "synthesize sugars."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1145",
    recordId: "Mercury_SC_400114",
    question: "When water changes from a liquid to a gas and then the steam condenses back to the liquid form, these types of changes are",
    options: ["electrical.", "mechanical.", "physical.", "chemical."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1146",
    recordId: "Mercury_7040758",
    question: "What direction is the movement of the energy in a food web?",
    options: ["consumer to producer", "decomposer to producer", "producer to consumer", "decomposer to consumer"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1147",
    recordId: "Mercury_7043943",
    question: "When the velocity of an ocean wave decreases as it approaches a shore, what happens to the wave?",
    options: ["Its length shortens.", "Its height decreases.", "It crests.", "Its height increases."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1148",
    recordId: "Mercury_401246",
    question: "Which is a force that keeps Earth in orbit around the Sun?",
    options: ["magnetism", "gravity", "radiation", "friction"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1149",
    recordId: "MCAS_2010_8_12003",
    question: "Substances enter any plant or animal cell by passing through which of the following structures?",
    options: ["nucleus", "cell membrane", "vacuole", "chloroplast"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1150",
    recordId: "AKDE&ED_2008_4_33",
    question: "Many years ago, purple dye was made from some sea animals. Then, in 1856, William Perkins tried to make a new medicine. Instead, he found a way to make purple dye from coal. What is a positive effect of his discovery?",
    options: ["Some diseases can be treated.", "Purple clothing can be made.", "Perkins is famous for discovering a new medicine.", "Sea animals are not needed to make purple dye."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1151",
    recordId: "CSZ20823",
    question: "When magnesium (Mg) metal is burned in the presence of oxygen (O?), magnesium oxide (MgO) is produced. The properties of magnesium oxide are different than the individual properties of magnesium and oxygen because magnesium oxide is",
    options: ["an element.", "a solution.", "a compound.", "a mixture."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1152",
    recordId: "ACTAAP_2010_5_8",
    question: "Fossils of sea animals were found in a cave in Arkansas. What does this mean about that area of Arkansas in the past?",
    options: ["It has changed little from then.", "It has become a rockier place.", "It was once underwater.", "It was once much warmer."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1153",
    recordId: "Mercury_7001278",
    question: "Which instrument would be best for measuring the volume of a pebble?",
    options: ["stopwatch", "triple beam balance", "metric ruler", "graduated cylinder"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1154",
    recordId: "Mercury_SC_LBS10952",
    question: "Which of these is a waste product of plant cells?",
    options: ["heat", "water", "minerals", "oxygen"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1155",
    recordId: "Mercury_SC_407606",
    question: "It can take millions of years for fossil fuels to form. These fossil fuels form underground from decaying plants and animals. Which term best describes a fossil fuel?",
    options: ["a source of nonrenewable energy", "a source of electrical power", "a source of renewable energy", "a source of solar power"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1156",
    recordId: "NYSEDREGENTS_2010_8_31",
    question: "Earth's hydrosphere is best described as the",
    options: ["very dense rock located in Earth's inner core", "relatively thin layer of water covering most of Earth's crust", "relatively thin layer of rock found above Earth's mantle", "hot liquid rock located in Earth's outer core"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1157",
    recordId: "Mercury_7044713",
    question: "When riding a roller coaster, an electric motor pulls the roller coaster to the top of the first hill. What force pulls the roller coaster down the hill?",
    options: ["gravity", "speed", "friction", "mass"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1158",
    recordId: "Mercury_7056910",
    question: "Which of these organisms is classified as a decomposer?",
    options: ["mushroom", "hawk", "mouse", "grass"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1159",
    recordId: "Mercury_SC_LBS10390",
    question: "A cold-blooded vertebrate with smooth skin belongs to what class of animals?",
    options: ["reptile", "amphibian", "fish", "mammal"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1160",
    recordId: "VASoL_2008_5_16",
    question: "Which of these best describes a tornado?",
    options: ["A severe weather condition with low temperatures and blowing snow", "A winter storm that produces frozen precipitation", "A rotating funnel-shaped cloud with strong winds and thunderstorms", "A storm that forms over warm ocean water and has extremely strong winds"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1161",
    recordId: "Mercury_7005513",
    question: "Plants use carbon dioxide from the atmosphere during the process of",
    options: ["photosynthesis.", "evaporation.", "fertilization.", "respiration."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1162",
    recordId: "Mercury_7092488",
    question: "A reverse fault occurs when one side of a fault plane is driven up over the other side. Reverse faults can cause which of these landforms?",
    options: ["dunes", "mountains", "islands", "deltas"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1163",
    recordId: "MCAS_2016_5_2",
    question: "A student is collecting water samples. The student needs a container that holds water, will not break easily, and can be used many times. Which of the following containers will best meet the student's needs?",
    options: ["a glass jar", "a wooden box", "a paper cup", "a plastic bottle"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1164",
    recordId: "Mercury_7220973",
    question: "What condition is most likely to spread an illness between people?",
    options: ["a genetic mutation in somatic cells", "an occurrence of acid rain", "an accident on a playground", "a virus suspended in the air"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1165",
    recordId: "Mercury_7016520",
    question: "When scientists proposed the Theory of Continental Drift, there were many skeptics. Which discovery confirmed that the continents move on plates?",
    options: ["spreading of the sea floor", "deep-sea currents", "earthquake formation", "sedimentary rocks"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1166",
    recordId: "Mercury_SC_413638",
    question: "Which two things are produced when a plant breaks down sugar to release energy?",
    options: ["carbon dioxide and water", "oxygen and food", "carbon dioxide and food", "oxygen and carbon dioxide"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1167",
    recordId: "Mercury_7236618",
    question: "A scientist wants to track contaminant movement in the Gulf Stream. The Gulf Stream is a warm water current in the North Atlantic Ocean and is part of the North Atlantic gyre. The gyre is influenced by the Coriolis effect. To follow the contaminant after it exits the Gulf Stream, the scientist needs to know characteristics of the North Atlantic gyre. Which of these best describes a movement of the North Atlantic gyre the scientist needs to know?",
    options: ["clockwise movement", "linear movement due south", "counterclockwise movement", "linear movement due west"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1168",
    recordId: "Mercury_7183523",
    question: "The growing human population has many practices that adversely impact the environment. Acid rain is one example of environmental damage that is related to human activities. Which human activity is most likely the largest contributor to acid rain?",
    options: ["dumping waste matter into ocean waters", "clearing native forests for industrialization", "burning fossil fuels in power plants", "using pesticides on agricultural crops"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1169",
    recordId: "Mercury_7043890",
    question: "What happens to the water vapor in an air mass as it ascends?",
    options: ["It polarizes.", "It condenses.", "It vaporizes.", "It freezes."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1170",
    recordId: "NYSEDREGENTS_2015_4_4",
    question: "Which two terms are used to describe weather?",
    options: ["gravity and amount of rain", "groundwater and cloud cover", "wind direction and amount of erosion", "air temperature and wind speed"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1171",
    recordId: "MEA_2016_8_19",
    question: "In what unit of time does Earth orbit the Sun?",
    options: ["month", "day", "century", "year"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1172",
    recordId: "Mercury_7080973",
    question: "While conducting an experiment on gravity, what will be needed to ensure the safety of students?",
    options: ["frictionless surfaces", "heavy objects", "quiet zones", "drop zones"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1173",
    recordId: "VASoL_2011_5_25",
    question: "All of the populations of species in an area make up a",
    options: ["region", "community", "family", "niche"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1174",
    recordId: "Mercury_7215548",
    question: "Cell division is necessary for an organism to",
    options: ["grow and reproduce.", "conserve matter and energy.", "make proteins.", "obtain nutrients."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1175",
    recordId: "Mercury_7239365",
    question: "A large plant population may impose selective pressure on a smaller, isolated group of plants, resulting in a change in allele distribution. Which mechanism is responsible for this change in the allele distribution?",
    options: ["trait acquisition", "mutation", "hybridization", "genetic drift"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1176",
    recordId: "Mercury_7223423",
    question: "Two samples of gold must have the same",
    options: ["mass.", "length.", "density.", "volume."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1177",
    recordId: "Mercury_7081288",
    question: "A student organizes a list of the distances that five students ran in 10 minutes. Another way to best organize this data is by using a",
    options: ["line graph.", "pictograph.", "bar graph.", "pie graph."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1178",
    recordId: "Mercury_400198",
    question: "What is the dependent variable in this experiment?",
    options: ["amount of water used", "growth of the bean plants", "type of soil used", "length of sunlight exposure"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1179",
    recordId: "OHAT_2007_8_43",
    question: "Electricity is produced in a hydroelectric plant when moving water turns a turbine. Which describes this energy transformation from the turning turbine to electricity?",
    options: ["thermal energy into electric energy", "nuclear energy into electric energy", "kinetic energy into electric energy", "chemical energy into electric energy"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1180",
    recordId: "Mercury_LBS10817",
    question: "When a star explodes, an intensely bright object is formed. What is the name of this object?",
    options: ["supernova", "red giant", "white dwarf", "nova"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1181",
    recordId: "Mercury_189753",
    question: "The Earth's equator receives more direct sunlight than the regions to its north and south. This distribution of sunlight accounts directly for which phenomenon?",
    options: ["The formation of calm \"eyes\" in the centers of cyclones.", "The rotation of storm systems.", "The westward deflection of equatorial winds.", "The movement of rising air currents away from the equator."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1182",
    recordId: "OHAT_2011_5_37",
    question: "The class puts the planters by the window so that the plants can get more sunlight. How do the tomato plants use sunlight?",
    options: ["to move water to the flowers", "to use starch from the stems", "to make sugar in the leaves", "to get nutrients through the roots"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1183",
    recordId: "Mercury_7247048",
    question: "Which of these is the most serious impact to an ecosystem after a tornado?",
    options: ["an increase in biodiversity", "the growth of plants in newly cleared areas", "soil erosion along with water pollution", "animals relocating to different habitats"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1184",
    recordId: "CSZ20334",
    question: "Gravity is responsible for the ___.",
    options: ["rotation of a planet on its axis", "orbits of the planets around the Sun", "tilt of Earth's axis", "phases of the Moon"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1185",
    recordId: "Mercury_7195178",
    question: "Some runners ate pasta before a race. The pasta was broken down into simple sugars and was absorbed by the blood stream. What body system was responsible for breaking down the pasta into small nutrients for use in the cells of the runners?",
    options: ["the endocrine system", "the excretory system", "the digestive system", "the nervous system"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1186",
    recordId: "Mercury_7246278",
    question: "Which crustal feature forms when two continental plates collide?",
    options: ["rift zones", "tidal zones", "mountain ranges", "trenches"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1187",
    recordId: "Mercury_7015908",
    question: "At which location does the movement of tectonic plates form isolated volcanic islands, such as Hawaii?",
    options: ["transform boundary", "subduction zone", "divergent boundary", "hot spot"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1188",
    recordId: "Mercury_7235603",
    question: "Which current property of our solar system is mainly due to solar emissions occurring soon after the initiation of fusion in the Sun's core?",
    options: ["distribution of moons among the planets", "directions of revolution of the planets", "directions of rotation of the planets", "distribution of elements among the planets"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1189",
    recordId: "Mercury_7097440",
    question: "Water puddles on a sidewalk evaporate when the Sun heats the water. Which of these best describes what is happening as the water evaporates?",
    options: ["Water evaporates as its thermal energy is transferred to the air.", "Water becomes a gas as it absorbs energy from the Sun.", "Water changes phase as it releases heat to the environment.", "Water boils as it absorbs energy from the sidewalk."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1190",
    recordId: "Mercury_SC_417579",
    question: "Clara says that her school is in a desert. Which fact about her schoolyard most helps her claim?",
    options: ["The schoolyard has few trees.", "The schoolyard gets little rain during the year.", "The schoolyard gets warm in the summer.", "The schoolyard has rocks and sand."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1191",
    recordId: "NCEOGA_2013_8_56",
    question: "What process is most responsible for the extinction of most species of plants and animals that have lived on Earth?",
    options: ["environmental changes", "gene mutation", "decrease in reproduction", "selective breeding"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1192",
    recordId: "Mercury_7217333",
    question: "The scientific method is the inquiry process by which scientists raise and attempt to answer new questions. Which is the best way to communicate findings that result from scientific inquiry?",
    options: ["discuss the findings with a well-known scientist", "discuss the findings with scientists who agree with you", "publish the findings in local newspapers", "publish the findings in scientific journals"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1193",
    recordId: "Mercury_SC_409574",
    question: "Trevor turns on a lamp. When the lamp is on, electrical energy changes into which other form of energy?",
    options: ["mechanical", "light", "chemical", "potential"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1194",
    recordId: "NYSEDREGENTS_2013_8_40",
    question: "People often wear sunglasses in polar regions because most of the sunlight that strikes a snow-covered surface is",
    options: ["refracted", "transmitted", "reflected", "absorbed"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1195",
    recordId: "Mercury_7216913",
    question: "A plant is discolored and has large brown blotches on its leaves. This condition is most likely caused by",
    options: ["photosynthesis.", "pollination.", "nourishment.", "disease."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1196",
    recordId: "ACTAAP_2008_5_13",
    question: "Which is a characteristic of sedimentary rock?",
    options: ["contains crystals", "forms from magma", "forms in layers", "looks very shiny"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1197",
    recordId: "NYSEDREGENTS_2013_8_11",
    question: "Which gas is transported by the circulatory system in humans and is used by cells during respiration to release energy stored in food?",
    options: ["carbon dioxide", "nitrogen", "hydrogen", "oxygen"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1198",
    recordId: "MCAS_2004_8_35",
    question: "Which of the following planets has the shortest orbit around the Sun?",
    options: ["Venus", "Earth", "Mars", "Mercury"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1199",
    recordId: "Mercury_SC_413004",
    question: "Rivers leave behind small pieces of rocks after they flood. These small pieces of rock form a floodplain. Which words best describe a floodplain?",
    options: ["many sinkholes", "rugged peaks", "long rows of ridges", "flat lands"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1200",
    recordId: "Mercury_7014385",
    question: "Some scientists believe that the mass extinction of dinosaurs was caused by the impact of a large meteorite on Earth. This impact would have caused a darkening of the sky due to dust blown into the upper atmosphere. This darkening would have reduced the sizes of some ecosystems because of",
    options: ["increased number of hurricanes.", "accelerated erosion.", "longer seasons.", "reduced photosynthesis."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1201",
    recordId: "NYSEDREGENTS_2008_4_4",
    question: "Which material is the best conductor of electricity?",
    options: ["wood", "plastic", "metal", "glass"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1202",
    recordId: "NYSEDREGENTS_2012_4_26",
    question: "Which is an example of a nonliving thing?",
    options: ["bird", "water", "insect", "dog"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1203",
    recordId: "ACTAAP_2014_5_4",
    question: "What is a characteristic of sedimentary rock?",
    options: ["glassy texture", "contains fossils", "high hardness", "shiny silver luster"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1204",
    recordId: "TIMSS_2003_8_pg43",
    question: "Rock that is made of material that has settled to the bottom of lakes and oceans and been compressed and hardened is",
    options: ["sedimentary rock", "metamorphic rock", "volcanic rock", "conglomerate rock"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1205",
    recordId: "ACTAAP_2013_7_8",
    question: "Which are caused by the Coriolis Effect?",
    options: ["wind patterns", "stationary fronts", "tornadoes", "volcanoes"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1206",
    recordId: "CSZ_2009_8_CSZ30651",
    question: "Which of the following compounds is most likely to be part of living organisms?",
    options: ["BF?", "CsI", "MoCl?", "C?H??O?"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1207",
    recordId: "Mercury_SC_LBS10688",
    question: "The Sun produces energy through",
    options: ["nuclear fusion.", "fission of uranium.", "chemical reactions.", "volcanic eruptions."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1208",
    recordId: "NCEOGA_2013_5_S2",
    question: "Which device is used to determine the volume of a liquid?",
    options: ["test tube", "graduated cylinder", "anemometer", "thermometer"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1209",
    recordId: "Mercury_SC_410835",
    question: "Mrs. Garry's class wants to know if their area has more acid rain than other parts of the state. Which would be the best way for them to begin research?",
    options: ["study science textbooks in the library", "examine soil samples taken at different locations", "contact other schools within the state", "look for current acid rain studies on the Internet"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1210",
    recordId: "ACTAAP_2008_7_7",
    question: "Which illustrates the correct order of relationships in organisms?",
    options: ["organ system -> organ -> cell -> tissue", "organ -> cell -> organ system -> tissue", "cell -> tissue -> organ -> organ system", "tissue -> organ system -> organ -> cell"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1211",
    recordId: "Mercury_7015890",
    question: "Which is evidence that the universe is expanding?",
    options: ["emission of high-energy gamma rays by distant objects", "the presence of dark matter", "constant speed of light from every perspective", "red shift of light from distant galaxies"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1212",
    recordId: "Mercury_7077665",
    question: "Which of these statements is true about the parts that make up the atom?",
    options: ["Neutrons have no charge.", "Electrons have a positive charge.", "Protons are larger than neutrons.", "Electrons are inside the nucleus."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1213",
    recordId: "Mercury_7234168",
    question: "A certain fossil (Y) is found in a layer of rock that lies between two index fossils, X and Z. Surprisingly, the older of the index fossils (Z) is found above the other fossils, suggesting that the rock layer has overturned. Which dating method is best to confirm the rock layer has overturned by determining the ages of these fossils?",
    options: ["gene sequencing", "fossil depth measurement", "anatomical comparison", "radiometric analysis"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1214",
    recordId: "NYSEDREGENTS_2013_4_29",
    question: "Which items would be most useful at home during a power failure?",
    options: ["flashlights and extra batteries", "hats and sunscreen", "raincoats and umbrellas", "insect spray and jackets"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1215",
    recordId: "Mercury_7188353",
    question: "Energy flows in an ecosystem through food webs. Which form of energy is the least available for reuse in a food web?",
    options: ["energy from producers", "energy from consumers", "sunlight energy", "heat energy"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1216",
    recordId: "MCAS_2006_5_21",
    question: "Which of the following fasteners are best to use to fasten the sides of a wooden birdhouse?",
    options: ["hooks", "pins", "bolts", "nails"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1217",
    recordId: "Mercury_SC_409157",
    question: "In areas where a lot of earthquakes occur, architects are designing buildings with the ability to move with the land. How are the new building designs most likely to help people?",
    options: ["The new designs are more attractive.", "The new designs can help save lives.", "The new designs are much taller.", "The new designs cost less to make."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1218",
    recordId: "MEA_2016_8_20",
    question: "In which form is most of the energy released from gasoline when burned by an automobile?",
    options: ["solar energy", "nuclear energy", "sound energy", "heat energy"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1219",
    recordId: "Mercury_7084245",
    question: "Heart disease can result in a reduced amount of oxygen moving properly through the body. Which body system does heart disease most directly affect?",
    options: ["circulatory", "skeletal", "excretory", "nervous"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1220",
    recordId: "Mercury_SC_405137",
    question: "The oil used today is made from the ancient remains of tiny sea creatures called \"Diatoms.\" When they were alive, the Diatoms converted sunlight into stored energy. Based on this information, which of the following statements is true?",
    options: ["The Sun turned diatoms into oil after 10-20 years.", "The Sun is the original source of energy for oil.", "Diatoms are the original source of energy for oil.", "Diatoms converted oil into energy."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1221",
    recordId: "VASoL_2010_3_2",
    question: "Skunks spray a strong-smelling liquid to ___.",
    options: ["help nearby plants grow", "attract prey", "get rid of wastes", "defend themselves"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1222",
    recordId: "Mercury_7008033",
    question: "Which is an example of mechanical weathering?",
    options: ["a rockslide", "an earthquake occurring", "a rock freezing and thawing", "a volcano erupting"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1223",
    recordId: "Mercury_SC_400987",
    question: "Recycling newspapers is good for the environment because it",
    options: ["helps conserve resources.", "increases the need for trees.", "helps remove pollutants from the air.", "increases the need for landfills."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1224",
    recordId: "MDSA_2008_5_29",
    question: "Rocks and minerals are common materials found on Earth. Which property do most rocks and minerals share?",
    options: ["They are pure.", "They are magnetic.", "They are liquid.", "They are solid."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1225",
    recordId: "Mercury_7041055",
    question: "Which organs belong to the lymphatic system?",
    options: ["pancreas, pituitary gland", "lungs, trachea", "kidneys, bladder", "spleen, thymus"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1226",
    recordId: "NYSEDREGENTS_2013_4_7",
    question: "The hardness, odor, and taste of an object can all be",
    options: ["measured with a metric ruler", "observed with the senses", "observed with a hand lens", "measured with a spring scale"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1227",
    recordId: "AKDE&ED_2008_4_8",
    question: "A bird called a ptarmigan has feathered feet. The feathers on the feet of the ptarmigan are most helpful when this bird ___.",
    options: ["runs under bushes", "digs up food", "climbs rocky cliffs", "walks in deep snow"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1228",
    recordId: "Mercury_SC_402064",
    question: "What is responsible for changing the remains of prehistoric sea animals into natural gas?",
    options: ["gravity", "water", "time", "pressure"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1229",
    recordId: "Mercury_404898",
    question: "Which is a basic structure found in all living organisms?",
    options: ["element", "cell", "compound", "organ"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1230",
    recordId: "Mercury_177678",
    question: "To calculate the relative age of rocks, geologists use the rate of radioactive decay of isotopes present in their samples. What is the term used for the original amount of the elemental isotopes being investigated?",
    options: ["rare earth isotopes", "son isotopes", "daughter isotopes", "parent isotopes"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1231",
    recordId: "Mercury_SC_LBS10606",
    question: "An echo is a sound wave that has been",
    options: ["refracted.", "scattered.", "reflected.", "absorbed."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1232",
    recordId: "Mercury_SC_402630",
    question: "The central nervous system consists of two parts: the brain and the",
    options: ["organs.", "spinal cord.", "muscles.", "senses."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1233",
    recordId: "Mercury_416586",
    question: "A small town is building their first water treatment plant. Their primary disinfectant is UV radiation. Which contaminant will UV radiation eliminate?",
    options: ["metals", "oil", "bacteria", "sediment"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1234",
    recordId: "MCAS_2006_9_38",
    question: "Which of the following must be included with magnitude to represent a vector?",
    options: ["direction", "volume", "mass", "acceleration"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1235",
    recordId: "Mercury_SC_415469",
    question: "What does a fire take away from a forest that squirrels need to survive?",
    options: ["water and shelter", "food and soil", "water and soil", "food and shelter"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1236",
    recordId: "MDSA_2009_8_12",
    question: "Nitrogen, a nutrient found in fertilizer, helps plants increase in size. Rainwater runoff often carries fertilizer into ponds and lakes. What effect does excess nitrogen have on organisms in a pond or lake ecosystem?",
    options: ["Clam shells are slowly weakened.", "Frogs adapt quickly to new food sources.", "Mutations occur gradually in fish.", "Algae grows rapidly."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1237",
    recordId: "Mercury_7015803",
    question: "Which measurement is the most accurate way to describe the distance between the Sun and its nearest neighboring star?",
    options: ["4 light-years", "400 light-years", "4 billion kilometers", "400 billion kilometers"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1238",
    recordId: "Mercury_414146",
    question: "Which four elements make up most of the human body?",
    options: ["sulfur, phosphorous, calcium, nitrogen", "silicon, calcium, oxygen, aluminum", "carbon, sodium, hydrogen, oxygen", "oxygen, carbon, hydrogen, nitrogen"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1239",
    recordId: "Mercury_405895",
    question: "An area is semiarid, has few trees, and is home to ground-nesting birds. This area is most likely part of which biome?",
    options: ["tundra", "desert", "taiga", "grassland"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1240",
    recordId: "Mercury_7063980",
    question: "Which organisms make energy available to all other organisms in a food chain?",
    options: ["consumers", "scavengers", "producers", "decomposers"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1241",
    recordId: "Mercury_7029855",
    question: "Which of these substances is correctly identified as a mineral?",
    options: ["sandstone", "quartz", "coal", "granite"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1242",
    recordId: "Mercury_404720",
    question: "Two objects are at rest and are 1.0 meter apart. To reduce the gravitational pull between the two objects, they should be",
    options: ["placed side by side.", "stacked vertically.", "moved 1.5 meters apart.", "moved 0.5 meter apart."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1243",
    recordId: "Mercury_7071960",
    question: "Soil color is closely related to its content. Which element causes soil to appear red?",
    options: ["silicon", "iron", "magnesium", "calcium"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1244",
    recordId: "Mercury_7004778",
    question: "Which particles make up the mass of an atom?",
    options: ["protons and electrons", "electrons and molecules", "neutrons and molecules", "protons and neutrons"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1245",
    recordId: "Mercury_7263848",
    question: "Auroras occur where Earth's magnetosphere traps high-energy particles in which region of the atmosphere?",
    options: ["troposphere", "stratosphere", "exosphere", "thermosphere"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1246",
    recordId: "Mercury_SC_402260",
    question: "An experiment was performed at sea-level. 400 mL of water was put in 4 different-shaped containers and placed on hot plates with 4 different temperature settings as shown below. Beaker - 110°C Petri dish - 95°C Erlenmeyer flask - 60°C Round bottom bowl - 45°C Which characteristic of water remained the same in each container?",
    options: ["the amount of steam released per minute", "the shape of the water", "the boiling point of water", "the rate of evaporation"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1247",
    recordId: "Mercury_SC_LBS10041",
    question: "In plants, what is responsible for passing traits from one generation to the next?",
    options: ["roots", "chloroplasts", "genes", "photosynthesis"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1248",
    recordId: "Mercury_SC_401786",
    question: "Which safety measure should a student take when handling a microscope?",
    options: ["keep switching the magnifications", "make sure to put the microscope on an uneven surface", "carry the microscope with two hands at all times", "clean the lenses with your fingers"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1249",
    recordId: "ACTAAP_2011_5_13",
    question: "Which statement best describes the size of the Sun?",
    options: ["Most of the stars in the universe would fit inside the Sun.", "The Sun is the largest and brightest star in the universe.", "The Sun is medium-sized compared to other stars.", "Most of the stars in the universe are smaller than the Sun."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1250",
    recordId: "LEAP__4_10227",
    question: "A wetland was drained to build a mall. Two years later, there were no more toads in that area. Why did the toads disappear?",
    options: ["The toads got their food from the wetland ecosystem.", "The toads were frightened and went into the woods.", "The toads died because toads cannot breathe out of water.", "The toads were destroyed by the construction equipment."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1251",
    recordId: "Mercury_7195125",
    question: "Technological advances are allowing scientists to develop methods for replacing abnormal human genes with healthy copies of the same genes. Which is the most likely use for this gene therapy?",
    options: ["treatment of airborne infections", "treatment of inherited diseases", "killing viruses", "healing wounds"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1252",
    recordId: "LEAP__8_10368",
    question: "Which statement about plant and animal cells is true?",
    options: ["Both have a large vacuole to store water.", "Both have a cell wall to give them support.", "Both use mitochondria to produce energy.", "Both use chloroplasts to store energy."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1253",
    recordId: "Mercury_SC_401307",
    question: "Finding fossils of warm-weather plants in the rock layers of a cold northern island suggests that",
    options: ["the climate of the island used to be warmer.", "the plants used to be harvested for food.", "the island used to be located farther south.", "the fossils used to be more resistant to cold."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1254",
    recordId: "NYSEDREGENTS_2015_8_8",
    question: "The hereditary material in corn plants can be altered by scientists so the plants produce more corn. Which term identifies this process?",
    options: ["genetic engineering", "environmental degradation", "natural selection", "ecological succession"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1255",
    recordId: "TIMSS_2003_8_pg40",
    question: "What is the main function of red blood cells?",
    options: ["To fight disease in the body", "To remove carbon monoxide from all parts of the body", "To produce materials which cause the blood to clot.", "To carry oxygen to all parts of the body"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1256",
    recordId: "MDSA_2008_8_38",
    question: "Earthquakes and volcanic eruptions occur both on land and in water. Earthquakes and volcanic eruptions most often occur",
    options: ["near plate boundaries", "in large bodies of water", "in regions near the equator", "on large pieces of land"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1257",
    recordId: "MCAS_2012_5_22237",
    question: "An earthworm has a length of 12.8 centimeters. What is the length, in millimeters, of the earthworm?",
    options: ["0.128 millimeter", "128 millimeters", "1280 millimeters", "1.28 millimeters"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1258",
    recordId: "Mercury_7223948",
    question: "Which material has the least resistance to the flow of electricity?",
    options: ["granite", "rubber", "aluminum", "wood"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1259",
    recordId: "Mercury_7263428",
    question: "Which are replenished more quickly than they are used?",
    options: ["energy resources", "nonrenewable resources", "material resources", "renewable resources"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1260",
    recordId: "Mercury_SC_402983",
    question: "What is the first thing a student should do before starting an experiment?",
    options: ["make notes about observations", "find a lab partner", "read all the directions", "write a report on the investigation"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1261",
    recordId: "MCAS_2012_8_23648",
    question: "Which of the following parts of the human body is most complex?",
    options: ["white blood cell", "kidney", "central nervous system", "heart"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1262",
    recordId: "Mercury_LBS10976",
    question: "The Wright Brothers' invention has had the greatest impact on",
    options: ["communication.", "space exploration.", "mass production.", "transportation."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1263",
    recordId: "Mercury_SC_408925",
    question: "Which best describes how earthworms improve soil as they eat dead plant material?",
    options: ["They make the soil clean.", "They recycle nutrients into the soil.", "They remove extra water from the soil.", "They keep disease out of the soil."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1264",
    recordId: "MDSA_2009_8_30",
    question: "Use the information below to answer the question. Cotton is a plant product used to make fabric. Cotton is made of cellulose, a fiber not digestible by humans. Cellulose is composed of many sugar molecules bonded together into long chains. Each sugar molecule contains carbon, hydrogen, and oxygen atoms. When cotton fabric is washed, wrinkles often form. The clothing industry uses chemicals to manufacture some cotton fabrics that are wrinkle-free. Dyes are also added to color the cellulose fibers in cotton. How would a clothing manufacturer separate colors to determine the purity of the dyes?",
    options: ["through paper chromatography", "by their freezing points", "by their boiling points", "through filtration"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1265",
    recordId: "NAEP_2000_8_S21+3",
    question: "What property of water is most important for living organisms?",
    options: ["It is tasteless.", "It is liquid at most temperatures on Earth.", "It does not conduct electricity.", "It is odorless."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1266",
    recordId: "Mercury_7106785",
    question: "An astronomer and a marine biologist were having lunch and discussing their current experiments. They discovered that although they investigate different areas of science, they most likely use the same",
    options: ["scientific tools used in experiments.", "scientific method to test hypotheses.", "publications for conducting research.", "locations for conducting their experiments."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1267",
    recordId: "Mercury_SC_400193",
    question: "Fossil fuels are formed",
    options: ["from the remains of organisms.", "in underground reservoirs that are relatively cool.", "by high winds and temperatures.", "in shallow areas over short periods of time."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1268",
    recordId: "Mercury_7029313",
    question: "Which had the greatest impact on the way humans heat their homes?",
    options: ["Franklin's experiments with electricity", "Darwin's research on the Galapagos islands", "Mendel's experiments with pea plants", "Newton's theory of gravity"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1269",
    recordId: "MCAS_2000_8_23",
    question: "Use the information below to answer the question. Many people are concerned that the reduction in the number of acres of forested area on Earth will lead to a large reduction in the amount of oxygen in Earth's atmosphere. If this happens, an organism's ability to breathe would be affected. The effect would be similar to moving the organism from",
    options: ["a mountaintop to sea level.", "a beach at sea level to a valley at sea level.", "sea level to a valley below sea level.", "sea level to a mountaintop."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1270",
    recordId: "Mercury_7001435",
    question: "Which of these is an example of a chemical reaction?",
    options: ["milk turning sour when left in a warm place", "allowing milk to evaporate, leaving behind powdered milk", "storing milk by putting it into the freezer", "mixing milk into a glass with chocolate powder"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1271",
    recordId: "Mercury_SC_402031",
    question: "Which of these tools is best for recording observations outdoors?",
    options: ["a calculator", "a notebook", "a graph", "a ruler"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1272",
    recordId: "MDSA_2008_8_39",
    question: "Students are investigating the physical properties of three solid mixtures by placing each solid mixture in liquid water. What physical property are the students testing?",
    options: ["melting point", "boiling point", "solubility", "conductivity"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1273",
    recordId: "Mercury_SC_LBS10619",
    question: "What remains in the same location in the sky of the Northern Hemisphere each night?",
    options: ["the Sun", "the Little Dipper", "the North Star", "the Moon"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1274",
    recordId: "Mercury_SC_414361",
    question: "Which feature makes up most of the surface of Earth?",
    options: ["dry land", "water", "craters", "hot gases"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1275",
    recordId: "Mercury_400089",
    question: "Which of these situations would most likely be a result of climate change?",
    options: ["shrinking glaciers, causing sea levels to rise", "weaker storms, causing less shoreline erosion", "increased radioactivity, causing damage to cells", "shorter days, causing longer hibernation periods"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1276",
    recordId: "Mercury_7165690",
    question: "A student performs an investigation using anti-bacterial hand soap. The student washes only his left hand with anti-bacterial soap, but cultures swabs from both hands. The cultures from both hands were incubated at room temperature for 48 hours before being examined. Which best explains the purpose of using soap on only the left hand?",
    options: ["to provide another testable variable for the investigation", "to act as a controlled variable for the investigation", "to act as the dependent variable for the investigation", "to serve as the independent variable for the investigation"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1277",
    recordId: "LEAP_2006_8_10411",
    question: "Raquel fed a litter of five kittens an all-meat diet for two weeks and found that they gained an average of 15 ounces. She concluded that eating meat is the best way to help kittens grow. What should Raquel have done to make this a better experiment?",
    options: ["used only one kitten", "tested dogs as well as cats", "weighed the kittens in grams", "tested five kittens on a non-meat diet also"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1278",
    recordId: "Mercury_SC_408984",
    question: "In the 1600s a scientist named Anton van Leeuwenhoek worked toward improving microscopes and created his own lenses. With his microscopes, Leeuwenhoek discovered bacteria and muscle fibers. Which type of job benefited most from these discoveries?",
    options: ["glass making", "astronomy", "medicine", "teaching"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1279",
    recordId: "Mercury_SC_400173",
    question: "One advantage of a hand lens over a microscope is that the hand lens",
    options: ["is less likely to be infected by bacteria.", "is easier to carry on field investigations.", "makes very tiny objects appear larger.", "produces a more accurate image."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1280",
    recordId: "Mercury_7201058",
    question: "Raising livestock, such as sheep and cattle, results in the production of large amounts of methane gas (CH4). Methane has the same effect in the atmosphere as carbon dioxide (CO2). As more livestock are raised to provide food for humans, what is the most likely effect of the increase in methane?",
    options: ["water pollution", "acid rain", "ozone thinning", "global warming"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1281",
    recordId: "Mercury_7011288",
    question: "Which is most directly responsible for building up a river delta?",
    options: ["leaching", "subsidence", "deposition", "erosion"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1282",
    recordId: "MCAS_1999_4_16",
    question: "What explains how day and night occur in different parts of Earth?",
    options: ["The Sun revolves around the galaxy.", "The Sun rotates on its axis.", "Earth revolves around the Sun.", "Earth rotates on its axis."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1283",
    recordId: "Mercury_7168613",
    question: "The human body is made up of different levels of organization. A tissue is a group of cells that work together to perform a specific function. Which would be an example of a tissue in the human body?",
    options: ["muscle", "stomach", "platelets", "hair"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1284",
    recordId: "Mercury_400574",
    question: "In the rock cycle, sedimentary rock forms when rock is",
    options: ["melted into liquid magma.", "exposed to great temperature.", "broken down by weathering.", "crystallized into natural glass."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1285",
    recordId: "MDSA_2010_5_3",
    question: "Heating and cooling water change the state of matter of water. What happens when a block of ice is heated to 10° Celsius?",
    options: ["It melts to form liquid water.", "It condenses to form liquid water.", "It evaporates to become a vapor (gas).", "It freezes to become heavier ice."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1286",
    recordId: "Mercury_401785",
    question: "Which situation is the best example of an inherited trait?",
    options: ["a horse pulling a wagon", "a bird building a nest", "a boy playing with a ball", "a dog sitting on command"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1287",
    recordId: "Mercury_7145548",
    question: "Physical features help animals survive. Which statement best describes physical adaptations that occur through natural selection in changing environments?",
    options: ["They are all observable in the fossil record.", "They result in population decline.", "They are more likely to be observed in plants.", "They occur slowly over long periods of time."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1288",
    recordId: "NYSEDREGENTS_2013_8_35",
    question: "The amount of which greenhouse gas in the air will increase the most if large forests are cut down to be used for building materials without planting new trees in their place?",
    options: ["ozone", "water vapor", "carbon dioxide", "methane"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1289",
    recordId: "Mercury_7141733",
    question: "A carpenter rubs sandpaper on a wooden bench to make the bench smoother. The sandpaper will get warm as it is rubbed on the bench. As a result of the friction between the sandpaper and the bench, thermal energy is converted to",
    options: ["heat energy that is transferred to the air.", "potential energy that is stored by the wood.", "radiant energy that is transferred to the bench.", "chemical energy that is stored by the sandpaper."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1290",
    recordId: "Mercury_SC_LBS10388",
    question: "What is the green pigment that allows plants to change the Sun's energy into chemical energy?",
    options: ["chlorophyll", "photosynthesis", "mitochondria", "glucose"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1291",
    recordId: "Mercury_SC_401615",
    question: "Which scientist hypothesized that the environment can affect the characteristics of a species?",
    options: ["Mendel", "Darwin", "Newton", "Einstein"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1292",
    recordId: "Mercury_7007858",
    question: "Which statement describes the reason why an ice cube melts when set out in a warm room?",
    options: ["Heat from the ice cube moves into the air.", "The ice cube molecules move more slowly.", "Heat from the room is absorbed by the ice cube.", "One side of the ice cube is colder than the other."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1293",
    recordId: "Mercury_7212940",
    question: "Two characteristics of the Nevada climate are low humidity and abundant sunshine. This combination of characteristics most likely results in",
    options: ["low altitude fog.", "high elevation snowfall.", "rapid evaporation.", "frequent thunderstorms."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1294",
    recordId: "NYSEDREGENTS_2008_4_17",
    question: "In order to survive, all animals need",
    options: ["sunlight, soil, and heat", "sunlight, air, and food", "heat, water, and soil", "food, water, and air"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1295",
    recordId: "Mercury_7110968",
    question: "Which best explains why population growth can result in water shortages and rationing in certain areas?",
    options: ["Aquifers recharge slowly.", "Increasing biomass decreases evaporation rates.", "Lake water is reserved for recreation.", "Tall buildings impede the development of rain clouds."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1296",
    recordId: "Mercury_7174143",
    question: "Professor Walden studies genetics at a local university. She believes that she has discovered information that contradicts a widely accepted theory. As a scientist and leader in the study of genetics, which action should she take?",
    options: ["Challenge the old theory with scientific evidence.", "Call the news media and tell them about her new theory.", "Announce to the world that her theory is better than the old theory.", "Request that the old theory be banned."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1297",
    recordId: "Mercury_7191520",
    question: "Canadian physician Sir William Osler once said, \"In Science the credit goes to the man who convinces the world, not to the man to whom the idea first occurred.\" How does this quote apply to scientific knowledge?",
    options: ["The results are less important than the ideas in an experiment.", "Famous scientists have the best ideas.", "In order to be important, ideas must be believable.", "Ideas must be communicated to the public"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1298",
    recordId: "Mercury_7027108",
    question: "Which event or principle cannot have its validity directly tested by laboratory experiment?",
    options: ["the Periodicity of Element Properties", "the Conservation of Energy", "the Acceleration of Objects due to Gravity", "the Big Bang Theory"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1299",
    recordId: "AKDE&ED_2008_8_51",
    question: "How do the circulatory system and the respiratory system depend on one another?",
    options: ["Solid wastes collected by the circulatory system are carried throughout the body by the respiratory system.", "Carbon dioxide collected by the circulatory system is carried throughout the body by the respiratory system.", "Nutrients collected by the respiratory system are carried throughout the body by the circulatory system.", "Oxygen collected by the respiratory system is carried throughout the body by the circulatory system."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1300",
    recordId: "MCAS_2012_8_23639",
    question: "Oxygen and iron combine chemically to form rust. Rust is classified as which of the following?",
    options: ["an atom", "an element", "a mixture", "a compound"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1301",
    recordId: "VASoL_2007_5_30",
    question: "A student made observations of four rock samples. Which of these observations most likely describes a sedimentary rock?",
    options: ["Sample 1 has bands of light and dark crystals.", "Sample 3 is made up of one huge, pale pink crystal.", "Sample 2 has pink, gray, and white crystals grown together.", "Sample 4 is made up of layers of sand grains cemented together."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1302",
    recordId: "AMP_2016_8_48",
    question: "In 1931, Barbara McClintock discovered that genes could change position on a chromosome. In corn plants, if a certain gene was moved next to the gene that controls kernel color, the kernels in an ear of corn were various colors. Which statement best supports McClintock's discovery?",
    options: ["Genes control inherited traits in organisms.", "Chromosomes can move around in the nucleus of a cell.", "Corn plants can reproduce in laboratory environments.", "Genes are able to disappear and reappear in later generations."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1303",
    recordId: "NYSEDREGENTS_2013_8_21",
    question: "Herbivores obtain most of their energy by",
    options: ["consuming animals", "consuming plants", "producing sugar", "absorbing sunlight"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1304",
    recordId: "Mercury_7220465",
    question: "Which factor has the greatest effect on a community's stores of freshwater?",
    options: ["the location of the nearest mountain", "the location of the nearest ocean", "the average winter temperature", "the average annual rainfall"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1305",
    recordId: "Mercury_404086",
    question: "A researcher's plan is to place five fish in separate tanks, give them the same amount of food each day, and keep the temperature the same. One fish will be exposed to artificial light for 24 hours each day, while the others will have light for 22 hours and then no light for 2 hours each day. Which is the control for this experiment?",
    options: ["the fish deprived of light", "the separate tanks", "the amount of food", "the fish exposed to light for 24 hours"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1306",
    recordId: "MDSA_2007_8_6",
    question: "Use The Periodic Table of the Elements and the information below to answer the question. Magnesium metal (Mg) is grayish-white in color and reacts actively with water. Fluorine (F2) is a greenish-yellow gas at room temperature and is a member of the halogen family. These two elements react to produce magnesium fluoride (MgF2), a chemical commonly used in making windows and lenses. How does adding heat energy affect magnesium fluoride (MgF2) molecules?",
    options: ["The motion of the molecules is at a constant rate.", "The motion of the molecules decreases.", "The motion of the molecules stops.", "The motion of the molecules increases."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1307",
    recordId: "Mercury_7179288",
    question: "A shift in climate changes a forested area with little annual snowfall to an area with snowfall most of the year. Natural selection would most likely favor a rabbit with which adaptation?",
    options: ["dark coat color", "large ears to release body heat", "increased body fat", "more powerful legs for burrowing"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1308",
    recordId: "Mercury_7163363",
    question: "When humans move into an area, they sometimes plant grasses, flowers, or trees that are not native to the area. The non-native species sometimes choke out the native species. Which organism would most likely be harmed by a loss of native plants in the area?",
    options: ["the mosquitoes that hide under plant leaves", "the fungi that break down dead plants", "the beetles that eat a variety of grass roots", "the caterpillars that eat only one type of plant"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1309",
    recordId: "Mercury_SC_405883",
    question: "What is a way of improving air quality?",
    options: ["burning wood in the fireplace", "using solar energy to produce electricity", "driving large cars", "building more factories"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1310",
    recordId: "Mercury_7081655",
    question: "Which tool should be used to measure the stem length of a plant?",
    options: ["a thermometer", "a graduated cylinder", "a metric ruler", "a balance"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1311",
    recordId: "Mercury_176820",
    question: "In which of these organs does most absorption of nutrients take place?",
    options: ["stomach", "small intestine", "large intestine", "liver"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1312",
    recordId: "Mercury_SC_400583",
    question: "Proper use and care of a microscope includes",
    options: ["removing the objectives after you are done.", "reflecting sunlight to the stage.", "adjusting the coarse focus under high power.", "carrying it with both hands."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1313",
    recordId: "NYSEDREGENTS_2008_8_37",
    question: "All matter is made up of",
    options: ["compounds", "atoms", "cells", "molecules"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1314",
    recordId: "NYSEDREGENTS_2008_4_20",
    question: "Which physical change would most likely help an animal survive during the winter?",
    options: ["tail gets longer", "fur gets thicker", "feathers are shed", "whiskers get shorter"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1315",
    recordId: "Mercury_7085383",
    question: "Which of these steps in the rock cycle occurs ONLY in the formation of metamorphic rock?",
    options: ["cementation", "erosion", "compaction", "recrystallization"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1316",
    recordId: "Mercury_7268275",
    question: "A tulip growing in a pot is placed at the center of a table. Which of these nearby objects will the tulip grow toward?",
    options: ["an electric heater", "a sunny window", "a fan blowing gently", "a large bowl of water"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1317",
    recordId: "MSA_2012_8_28",
    question: "Common soaps are often basic. Which of these is a property of a chemical base?",
    options: ["pH equal to 6", "turns litmus paper blue", "sour taste", "forms bubbles with limestone"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1318",
    recordId: "Mercury_7213045",
    question: "As temperatures increase, which process is responsible for increasing the amount of water vapor in the atmosphere?",
    options: ["evaporation", "ionization", "respiration", "condensation"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1319",
    recordId: "NYSEDREGENTS_2010_4_22",
    question: "Why do some animals hibernate in the winter?",
    options: ["to avoid predators", "to attract a mate", "to find food for their young", "to adapt to environmental changes"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1320",
    recordId: "Mercury_416684",
    question: "Which wind-water interaction is responsible for cycling nutrient-rich waters from the ocean floor to the sea surface?",
    options: ["storm surge", "downwelling", "surface currents", "upwelling"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1321",
    recordId: "Mercury_184643",
    question: "If a cell is exposed to a chemical that inhibits the production of spindle fibers as the cell is preparing for mitosis, what would most likely happen?",
    options: ["The cell would undergo meiotic division.", "The cell would not divide.", "The cell would continue with mitotic division.", "The cell would break open."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1322",
    recordId: "Mercury_SC_408871",
    question: "Norma's flashlight was not working. She replaced the old batteries with new ones, and the flashlight turned on. Why did the flashlight work after she replaced the batteries?",
    options: ["because the batteries produce heat", "because the batteries conduct the electricity", "because the batteries produce light", "because the batteries supply the energy"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1323",
    recordId: "MSA_2012_5_16",
    question: "The sun provides heat and light to Earth. The sun is best described as",
    options: ["a planet close to Earth", "the closest star to Earth", "the center of the universe", "a planet that reflects light"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1324",
    recordId: "Mercury_SC_415078",
    question: "A large piece of ice is placed on the sidewalk on a warm day. What will happen to the ice?",
    options: ["It will freeze to form liquid water.", "It will not change at all.", "It will melt to form liquid water.", "It will melt to form water vapor."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1325",
    recordId: "AIMS_2009_4_20",
    question: "Ducks live near ponds and lakes. The shape of a duck's foot helps it swim and walk on muddy ground. Which factor is most important in determining the shape of a baby duck's foot?",
    options: ["the amount of mud in the bottom of the pond", "the temperature of the pond water", "the shape of the parent ducks' feet", "the amount of rain that fell before the duck was born"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1326",
    recordId: "Mercury_7094938",
    question: "The Moon revolves around the Earth because of a non-contact force. What force of Earth keeps the Moon in orbit?",
    options: ["centripetal force", "electrical force", "gravitational force", "magnetic force"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1327",
    recordId: "OHAT_2008_5_26",
    question: "Which motion causes the pattern of day and night on Earth?",
    options: ["the moon orbits around Earth", "Earth rotates on its axis", "Earth orbits around the sun", "the moon rotates on its axis"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1328",
    recordId: "Mercury_SC_415417",
    question: "What causes ocean water to evaporate in the water cycle?",
    options: ["energy from the Sun", "energy from Earth's moon", "energy from Earth's rotation", "energy from ocean waves"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1329",
    recordId: "MCAS_2006_9_7",
    question: "Some cells, such as human nerve and muscle cells, contain many more mitochondria than do other cells, such as skin cells. Why do some cells have more mitochondria than others?",
    options: ["The cells store more nutrients.", "The cells degrade more proteins.", "The cells divide more frequently.", "The cells use more energy."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1330",
    recordId: "Mercury_7222758",
    question: "A student finds that an unidentified mineral sample can scratch gypsum but is unable to scratch quartz. The student has made an observation about which property of the sample?",
    options: ["density", "luster", "reactivity", "hardness"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1331",
    recordId: "Mercury_SC_401305",
    question: "Which process is the best example of weathering?",
    options: ["A tree root breaks apart a rock.", "Sediments flow into a bay.", "Dry weather results in a small harvest.", "A cloud releases freezing rain."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1332",
    recordId: "NYSEDREGENTS_2008_4_25",
    question: "What is the major source of energy for food chains?",
    options: ["water", "grass", "sunlight", "air"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1333",
    recordId: "Mercury_7145583",
    question: "Elias investigates whether soaking beans in water before planting affects how the beans grow. Which beans would most likely be the control group?",
    options: ["the beans that were soaked the least amount of time", "the beans that grew the tallest", "the beans that were not soaked in water", "the beans that had the greatest mass"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1334",
    recordId: "Mercury_7100748",
    question: "What type of galaxy most likely can be described as a large, flat disk surrounded by arms of stars and dust?",
    options: ["spiral", "ring", "irregular", "elliptical"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1335",
    recordId: "ACTAAP_2008_5_15",
    question: "Which is true of a car that is accelerating along a horizontal roadway?",
    options: ["Its potential energy is increasing.", "Its potential energy is decreasing.", "Its kinetic energy is decreasing.", "Its kinetic energy is increasing"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1336",
    recordId: "Mercury_185115",
    question: "A hypothesis that is successfully tested many times may become a",
    options: ["theory.", "constant.", "conclusion.", "law."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1337",
    recordId: "VASoL_2009_5_28",
    question: "Which of the following do plants need to make their own food?",
    options: ["Sunlight", "Oxygen", "Bacteria", "Flowers"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1338",
    recordId: "Mercury_SC_413085",
    question: "What is the result of the rapid shifting in Earth's surface?",
    options: ["a volcano", "an earthquake", "a tornado", "an avalanche"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1339",
    recordId: "Mercury_SC_405004",
    question: "Ned learned that light is a source of energy. Which can only result from light energy?",
    options: ["an ice cube melting", "a rainbow forming", "thunder booming", "water evaporating"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1340",
    recordId: "VASoL_2009_5_20",
    question: "At which location are oceans the deepest?",
    options: ["Ocean trench", "Mid-ocean ridge", "Abyssal plain", "Volcanic island"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1341",
    recordId: "MCAS_2003_8_28",
    question: "Kendra's mom is purchasing a car, but cannot decide what color to get. Kendra advises her mom that a car with a black exterior will be uncomfortable in the summer. This observation is correct because dark objects, as compared to lighter colored objects,",
    options: ["are generally more dense.", "reflect sunlight more efficiently.", "absorb more of the Sun's energy.", "reduce heat transfer."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1342",
    recordId: "Mercury_7167038",
    question: "Heart cells have fibers that slide up and down and cause contractions. Which types of specialized cells can contract?",
    options: ["nerve cells", "white blood cells", "bone cells", "muscle cells"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1343",
    recordId: "MCAS_1999_4_32",
    question: "What can we learn by studying fossils?",
    options: ["how Earth's environments have changed", "the cause of strong earthquakes", "how hurricanes formed long ago", "how the solar system was formed"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1344",
    recordId: "MCAS_2001_5_14",
    question: "If a string on a musical instrument like a guitar is made tighter, the sound produced by that string will always be",
    options: ["higher pitched.", "lower pitched.", "louder.", "quieter."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1345",
    recordId: "ACTAAP_2012_7_2",
    question: "Iron oxide, also known as rust, is formed when iron chemically combines with oxygen. Which term best describes iron oxide?",
    options: ["element", "solution", "mixture", "compound"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1346",
    recordId: "Mercury_400704",
    question: "Which is a trait that a child can inherit from its parents?",
    options: ["language skills", "eye color", "a broken leg", "length of hair"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1347",
    recordId: "Mercury_7215478",
    question: "Some dairy farmers want their cows to produce greater amounts of milk than average cows. Which process will help the dairy farmers develop cows with this trait?",
    options: ["behavioral modification", "selective breeding", "geographical isolation", "ecological succession"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1348",
    recordId: "Mercury_7033600",
    question: "Which tool will best help scientists understand relationships between oceans and climate changes?",
    options: ["a weather balloon", "radar", "a rain gauge", "a computer model"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1349",
    recordId: "ACTAAP_2015_7_4",
    question: "A student mixes a spoonful of sand into a beaker of water. Which two methods can be used to separate the sand from the water?",
    options: ["settling and magnetic attraction", "chromatography and filtration", "filtration and evaporation", "settling and chromatography"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1350",
    recordId: "Mercury_SC_LBS10949",
    question: "A warm-blooded organism that nurses its young would be called",
    options: ["an insect.", "a bird.", "a reptile.", "a mammal."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1351",
    recordId: "NYSEDREGENTS_2015_8_30",
    question: "Elements on the Periodic Table of the Elements are classified into categories such as",
    options: ["metals and nonmetals", "rocks and minerals", "mixtures and compounds", "molecules and atoms"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1352",
    recordId: "Mercury_411782",
    question: "In a genetics investigation, students used two red straws to represent male parent DNA. They used two green straws to represent female parent DNA. The offspring in this activity are best represented by",
    options: ["either one red straw or one green straw.", "two green straws.", "two red straws.", "one red straw and one green straw."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1353",
    recordId: "LEAP_2003_8_10393",
    question: "The process of cellular respiration occurs in",
    options: ["both plant and animal cells.", "plant cells only.", "animal cells only.", "neither plant nor animal cells."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1354",
    recordId: "ACTAAP_2010_5_15",
    question: "Ana rolled her wagon down the ramp to reach the playground. There, she and her sister played on the seesaw. Which set of simple machines has Ana used?",
    options: ["Wheel and axle, inclined plane, and lever", "Pulley, inclined plane, and screw", "Wedge, wheel and axle, and screw", "Lever, pulley, and wedge"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1355",
    recordId: "Mercury_7214235",
    question: "Which of these features, formed east of the Sierra Nevada Mountain Range, is due to moist air rising along the western slope of the mountain range?",
    options: ["grassland", "desert", "rain forest", "temperate forest"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1356",
    recordId: "MCAS_2011_8_17685",
    question: "Human activity most likely contributes to which of the following changes on Earth?",
    options: ["an increase in the amount of atmospheric carbon dioxide", "an increase in the length of a day", "a decrease in the number of volcanic eruptions", "a decrease in the magnitude of large earthquakes"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1357",
    recordId: "Mercury_7165813",
    question: "A student is reading the nutritional information on a box of cereal. It says that a single serving contains 215 calories. Which type of energy is being measured by this unit?",
    options: ["mechanical", "kinetic", "electrical", "chemical"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1358",
    recordId: "Mercury_7071750",
    question: "Crustal plates that pull apart from one another most likely form",
    options: ["strike-slip faults.", "rift zones.", "oceanic trenches.", "volcanic island arcs."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1359",
    recordId: "Mercury_7120820",
    question: "A change in the position of an object as time changes best describes",
    options: ["waves.", "direction.", "motion.", "frequency."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1360",
    recordId: "Mercury_7004585",
    question: "What two organ systems are involved in the transfer of oxygen to the cells from outside the body?",
    options: ["skeletal and respiratory", "circulatory and digestive", "skeletal and digestive", "circulatory and respiratory"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1361",
    recordId: "MSA_2012_8_34",
    question: "Sodium (Na) and chlorine (Cl) are two reactive and dangerous elements. Chlorine is a halogen gas that can cause respiratory damage and sodium is an alkali metal that reacts violently with water. What happens to the properties of sodium and chlorine when they react to form sodium chloride (NaCl), common table salt?",
    options: ["The properties of both sodium and chlorine change.", "The properties of both sodium and chlorine remain the same.", "The properties of sodium remain the same but the properties of chlorine change.", "The properties of sodium are different but chlorine remains a dangerous gas."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1362",
    recordId: "AKDE&ED_2012_4_48",
    question: "Which list includes only examples of matter that can take the shape of a container?",
    options: ["sand, ice, and wood", "water, air, and milk", "oil, air, and rock", "nail, stick, and paper"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1363",
    recordId: "Mercury_SC_408747",
    question: "Which source of energy is nonrenewable?",
    options: ["sunlight", "wood", "water", "coal"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1364",
    recordId: "Mercury_7267838",
    question: "Which of the following is most necessary for life to develop on another planet?",
    options: ["rocky surfaces", "atmospheric oxygen", "liquid water", "warm soil"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1365",
    recordId: "Mercury_SC_411419",
    question: "Plants that are different from each another may have similar structures. Which structure do all plants have in common?",
    options: ["trunks", "fruit", "flowers", "roots"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1366",
    recordId: "NCEOGA_2013_5_16",
    question: "Which organism is a producer?",
    options: ["grass", "lizard", "frog", "mushroom"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1367",
    recordId: "Mercury_7093100",
    question: "Some machines have been designed to perform complicated tasks which result from a demand for",
    options: ["minimizing the need for manual labor.", "maximizing the price of consumer goods.", "minimizing illness from disease.", "maximizing the use of non-renewable resources."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1368",
    recordId: "Mercury_SC_407608",
    question: "Scientists are developing new satellite technology to help predict the weather. How will developing this technology most likely benefit people?",
    options: ["It will show people that science is interesting.", "It will help people drive in the rain.", "It will show people that storms can be prevented.", "It will help warn people about dangerous storms."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1369",
    recordId: "ACTAAP_2013_7_10",
    question: "Which statement about gravity is written as a law?",
    options: ["The force of gravity between two objects depends upon their masses and the distance between them.", "The effect of gravity on plants might be reduced if certain minerals are added to the soil.", "The experiments being done on gravity today are better than what were done in the past and a full understanding is only a few years away.", "The reason gravity works is because masses bend time and space."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1370",
    recordId: "Mercury_7271320",
    question: "What does the brain monitor to control the rate of breathing during normal activities?",
    options: ["the level of carbon dioxide in the air", "the level of carbon dioxide in the lungs", "the level of carbon dioxide in the cells", "the level of carbon dioxide in the blood"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1371",
    recordId: "Mercury_412714",
    question: "A researcher is measuring changes in the density of the upper atmosphere over time. Which units should be used for the density measurements?",
    options: ["kg/m^3", "L/m^3", "m^3/s", "kg/s"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1372",
    recordId: "Mercury_7250268",
    question: "Which function requires the muscular, skeletal, and nervous systems to work together?",
    options: ["absorption of nutrients", "completion of blood circulation", "regulation of hormones", "movement of appendages"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1373",
    recordId: "VASoL_2008_5_33",
    question: "Michael Faraday showed how electric current in a wire produces",
    options: ["a magnetic field", "chemicals", "molecules", "a vibration"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1374",
    recordId: "Mercury_SC_408390",
    question: "Mrs. Moyers teaches her students about different energy sources. Which example comes from a renewable source of energy?",
    options: ["food cooked over natural gas", "water heated by solar panels", "electricity produced from coal", "an engine powered by gasoline"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1375",
    recordId: "CSZ_2008_5_CSZ10081",
    question: "What is at the center of our solar system?",
    options: ["a medium planet with an atmosphere.", "a black hole that was once a star.", "a star composed of hydrogen and helium.", "a star composed of carbon and nitrogen."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1376",
    recordId: "NYSEDREGENTS_2015_8_32",
    question: "Which device directly converts chemical energy into electrical energy?",
    options: ["wood-burning stove", "wind-powered sailboat", "battery-powered flashlight", "solar-powered calculator"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1377",
    recordId: "Mercury_SC_400679",
    question: "Some students have gathered a collection of rock samples from the school yard to study. They scraped the rocks against a piece of quartz from the school lab. Which property of minerals are the students investigating?",
    options: ["texture", "hardness", "streak", "color"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1378",
    recordId: "Mercury_7058520",
    question: "Which organisms eat only plants?",
    options: ["omnivores", "scavengers", "herbivores", "producers"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1379",
    recordId: "Mercury_7005075",
    question: "Which of the following is a characteristic of the \"steady state theory\" of the universe?",
    options: ["Light moving from the center of the universe appears red.", "The universe is constantly growing and changing.", "The nature of the universe has always been the same.", "A great explosion caused the origin of the universe."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1380",
    recordId: "Mercury_189105",
    question: "A sunspot appears as a dark spot on the sun that is cooler than the surrounding area. On which region of the sun do sunspots occur?",
    options: ["core", "photosphere", "chromosphere", "corona"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1381",
    recordId: "Mercury_7091893",
    question: "The Great Miami Aquifer is a large underground water supply that lies under much of southwest Ohio. The water level of the aquifer could be reduced over time by too much",
    options: ["rainfall.", "pollution.", "irrigation.", "evaporation."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1382",
    recordId: "Mercury_LBS10706",
    question: "What kind of energy conversion occurs after a candle is lit?",
    options: ["light energy to heat energy", "friction to electrical energy", "chemical energy to light energy", "mass to kinetic energy"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1383",
    recordId: "Mercury_7012583",
    question: "What is one way the body reacts to cold weather?",
    options: ["shivering", "swallowing", "sneezing", "sweating"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1384",
    recordId: "NYSEDREGENTS_2008_8_2",
    question: "Running to escape danger is an action that requires the nervous system to coordinate the interaction of which two body systems?",
    options: ["digestive and endocrine", "muscular and skeletal", "circulatory and digestive", "reproductive and excretory"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1385",
    recordId: "MCAS_2003_5_20",
    question: "What causes day and night on Earth?",
    options: ["the Sun's rotation on its axis", "Earth's revolution around the Sun", "the Sun's revolution around Earth", "Earth's rotation on its axis"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1386",
    recordId: "Mercury_SC_402077",
    question: "Which is the best explanation of why the Moon revolves around Earth?",
    options: ["The Moon is attracted by the gravity of Earth.", "The Moon has a thinner atmosphere than Earth.", "The Moon is too large to move away from Earth.", "The Moon has a smaller gravitational force than Earth."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1387",
    recordId: "Mercury_7235935",
    question: "Which observation provides evidence of the existence of planets orbiting other stars?",
    options: ["rapid location changes of the stars", "periodic X-ray bursts from the stars", "regular spectrum changes from the stars", "periodic dimming of the stars"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1388",
    recordId: "Mercury_7216773",
    question: "Mutations that occur in sex cells can be passed from parent to offspring during",
    options: ["sexual reproduction.", "cloning.", "budding.", "binary fission."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1389",
    recordId: "Mercury_SC_416653",
    question: "Which type of ecosystem has the greatest variation in temperature from its top to its bottom?",
    options: ["ocean", "lake", "pond", "estuary"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1390",
    recordId: "Mercury_7007770",
    question: "What two factors determine the location of an electron around the nucleus of the atom?",
    options: ["size of the electron and the neutron", "energy and the attraction of the nucleus", "speed and direction of the electron", "direction and strength of the electron"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1391",
    recordId: "Mercury_7137008",
    question: "The removal of waste from Florida's East Bay and Pensacola Bay is intended to speed the bay ecosystem's natural tendency to do which of the following?",
    options: ["produce organisms that can survive changed conditions", "undergo ecosystem progression", "adapt to a changed landscape", "return to its pre-pollution conditions"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1392",
    recordId: "NYSEDREGENTS_2013_4_4",
    question: "Matter is defined as anything that takes up space and has",
    options: ["odor", "mass", "texture", "color"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1393",
    recordId: "ACTAAP_2008_5_14",
    question: "Which is the order of the planets from closest to the Sun to farthest from the Sun?",
    options: ["Mars, Mercury, Earth, Venus", "Venus, Earth, Mars, Mercury", "Mercury, Venus, Earth, Mars", "Earth, Venus, Mercury, Mars"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1394",
    recordId: "TIMSS_2007_8_pg26",
    question: "In living things, large and complex molecules are broken down into small and simple molecules. What is this process called?",
    options: ["circulation", "absorption", "excretion", "digestion"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1395",
    recordId: "Mercury_SC_400529",
    question: "Meadow voles are small mouse-like animals that eat plants and insects. Their niche in an ecosystem is a",
    options: ["scavenger.", "herbivore.", "omnivore.", "producer."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1396",
    recordId: "Mercury_409465",
    question: "A dietary supplement manufacturer developed a new calcium supplement that appears to increase the bone density in middle-aged women. When tested in a small clinical trial, the supplement was shown to cause a 15% increase in bone density in 8 out of 10 women. Before the supplement is offered to the general public, which step should the manufacturer take next?",
    options: ["test the supplement on a larger sample of women", "develop packaging that is attractive to women", "add a variety of vitamins to the supplement", "test the supplement on mice in the laboratory"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1397",
    recordId: "Mercury_7201268",
    question: "The European starling entered North America in the late 1800s. It proved very successful and was able to spread throughout the United States by 1955. The survival and rapid reproduction of starlings most likely limited the population size of which organisms within its habitats?",
    options: ["its predators", "its decomposers", "its mutualists", "its competitors"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1398",
    recordId: "Mercury_408093",
    question: "Which does 12.0 grams represent?",
    options: ["volume", "force", "mass", "speed"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1399",
    recordId: "MCAS_2014_8_19",
    question: "Which of the following statements best describes the process of natural selection in a population?",
    options: ["All individuals learn to adapt to specific changes that occur slowly in their environment.", "All individuals develop traits to match changes to their environment.", "Some individuals have genetic differences that make them more likely to survive and reproduce in their environment.", "Some individuals respond to their environment by mutating to make themselves more likely to survive."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1400",
    recordId: "Mercury_7214043",
    question: "A researcher is working on a family genetics project. She wants to trace a particular trait back through several generations of her ancestors. Which type of display will best help the researcher organize the information?",
    options: ["cycle diagram", "Punnett square", "pedigree chart", "flow chart"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1401",
    recordId: "LEAP__8_10369",
    question: "Joyce put 200 milliliters of water in a beaker, put a thermometer in it, and heated it until it started to boil. She recorded a temperature of 100°C when it started to boil. She repeated the process with 400 milliliters of water. What would be the temperature when this second sample started to boil?",
    options: ["slightly higher than the first sample's", "the same as the first sample's", "half as high as the first sample's", "twice as high as the first sample's"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1402",
    recordId: "Mercury_7032883",
    question: "Between 40 and 50 million years ago, the landmass on the Indian plate collided with the landmass on the Eurasian plate. What formed when these landmasses collided?",
    options: ["the Himalayan Mountains", "the Mariana Trench", "the Great Plains", "the Grand Canyon"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1403",
    recordId: "Mercury_7235673",
    question: "Hawaii is composed mainly of volcanoes with gentle slopes and large surface areas. Which characteristics best describe the lava these volcanoes have released?",
    options: ["mainly water vapor and large boulders", "highly viscous and relatively cool", "relatively fluid and low viscosity", "mix of hot gas and rock shards"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1404",
    recordId: "LEAP__4_10224",
    question: "Mrs. Henderson's class has five small covered boxes. One contains perfume; another contains dried onions. There is also a box of pine needles, a box of lemon pieces, and a box with a paper towel wetted with vanilla flavoring. Which should they do to get the best information about what is in each box?",
    options: ["Shake the boxes.", "Weigh the boxes.", "Smell the boxes.", "Listen to the boxes."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1405",
    recordId: "VASoL_2007_5_12",
    question: "Which of these best describes the relationship between Earth's layers?",
    options: ["The more metallic layers are closest to the crust.", "The hottest layers are closest to the core.", "The lightest layers are closest to the core.", "The more liquid layers are closest to the crust."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1406",
    recordId: "Mercury_7007648",
    question: "A neutral atom is best described as having",
    options: ["an equal number of protons and neutrons.", "an equal number of protons and electrons.", "more protons than neutrons.", "more electrons than protons."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1407",
    recordId: "Mercury_406802",
    question: "Which statement best describes a learned characteristic in a dog?",
    options: ["A dog has floppy ears.", "A dog pants to cool itself on a hot day.", "A dog scratches at a door to go outside.", "A dog has a dark coat."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1408",
    recordId: "Mercury_SC_407692",
    question: "In the Northern Hemisphere, June 21st has more hours of sunlight than any other day. However, June 21st has the fewest hours of sunlight in the Southern Hemisphere. Which best explains why the Northern Hemisphere receives more daylight than the Southern Hemisphere on the same day?",
    options: ["The Sun moves closer to the Northern Hemisphere", "Earth is tilted on its axis", "The Sun releases more energy to the Northern Hemisphere", "Earth rotates on its axis"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1409",
    recordId: "Mercury_SC_LBS10516",
    question: "Which of these shows the correct order needed for a solar eclipse to happen?",
    options: ["Sun, Earth, Moon", "Sun, Moon, Earth", "Moon, Sun, Earth", "Moon, Earth, Sun"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1410",
    recordId: "Mercury_7122973",
    question: "A greenhouse is an example of a closed system. Which two types of energy are exchanged in this system?",
    options: ["nuclear energy for chemical energy", "radiant energy for nuclear energy", "thermal energy for nuclear energy", "radiant energy for thermal energy"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1411",
    recordId: "MCAS_2013_8_29426",
    question: "Which of the following has changed over the last 200 years primarily due to human activity?",
    options: ["the frequency of earthquakes", "the composition of the atmosphere", "Earth's magnetic field", "Earth's tectonic plate activity"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1412",
    recordId: "Mercury_7274365",
    question: "What physical property is characteristic of all of the elements in the group located in the rightmost column of the periodic table?",
    options: ["gas state at room temperature", "good conductor of electric current", "extremely brittle solid at room temperature", "very high melting point"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1413",
    recordId: "Mercury_7234343",
    question: "Which difference between land and water contributes most directly to global climate change resulting from tectonic movement?",
    options: ["mean material densities", "magnetic material content", "rate of radioactivity-related heat release", "heat absorption and retention properties"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1414",
    recordId: "Mercury_SC_413242",
    question: "How does the Sun most affect the water cycle?",
    options: ["The Sun creates water droplets in the clouds.", "The Sun causes the ocean water to evaporate.", "The Sun makes the clouds produce precipitation.", "The Sun forces water to drain back into the ocean."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1415",
    recordId: "Mercury_SC_410624",
    question: "Many sports stadiums use grass, but some use fake grass called artificial turf. Artificial turf is made of fibers that look like real grass. In which way is this technology most likely beneficial?",
    options: ["It releases less moisture.", "It uses less water.", "It absorbs more carbon dioxide.", "It produces more heat."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1416",
    recordId: "Mercury_7254538",
    question: "The western coast of the United States has been increasing in size for millions of years. Which process has added material to the western coast of the United States?",
    options: ["deposition at transform boundaries", "accretion at convergent boundaries", "meteorite impact at convergent boundaries", "landslides at divergent boundaries"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1417",
    recordId: "Mercury_182368",
    question: "Which of the following structures enables fish to remain at a certain depth without expending energy through swimming?",
    options: ["swim bladder", "dorsal fin", "lateral line", "gill slits"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1418",
    recordId: "Mercury_7005128",
    question: "Before strip mining for coal, the topsoil in the area is removed and stored. After mining operations are completed, the land is leveled and topsoil is replaced. The purpose of replacing topsoil is",
    options: ["to prevent radioactive elements from polluting water sources.", "to provide an environment for new coal formation.", "to prevent wind from weathering and eroding surface coal.", "to restore the area to a natural condition."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1419",
    recordId: "NYSEDREGENTS_2008_8_12",
    question: "Which event is the best example of competition between species in a pond environment?",
    options: ["dragonflies landing on lily pads", "frogs and toads eating flies", "hawks eating mice", "lizards and snakes lying in the sun"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1420",
    recordId: "Mercury_7016363",
    question: "What is the most likely effect of a drought on a population of frogs that live in a shallow swamp?",
    options: ["increase in frog population as more land is exposed", "decrease in frog population as water evaporates", "only younger frogs will survive", "the number of predators will increase"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1421",
    recordId: "TIMSS_2011_8_pg23",
    question: "The following waste materials are buried in a landfill. Which will break down most quickly?",
    options: ["paper", "steel", "glass", "plastic"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1422",
    recordId: "MEA_2014_8_18",
    question: "What is the source of genetic information of offspring produced by sexual reproduction?",
    options: ["the father only", "neither the mother nor the father", "the mother and the father", "the mother only"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1423",
    recordId: "NCEOGA_2013_5_13",
    question: "Why do multicellular organisms need transport systems?",
    options: ["Most have cells that are not able to exchange gases with the outside environment.", "Most have cells that require more energy to survive than single-celled organisms.", "Most have cells that need food from sources outside their environment.", "Most have cells that are unable to grow and survive in their environment."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1424",
    recordId: "Mercury_7110215",
    question: "Scientists frequently monitor levels of microorganisms at beaches in the summer time. High temperatures, pollution, runoff, and illegal dumping all affect water quality. What do these scientific efforts illustrate?",
    options: ["Water testing identifies origination of illegal dumping.", "Monitoring water quality is important to public health.", "Pollution can be eliminated through water testing.", "High temperatures increase runoff from agricultural fields."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1425",
    recordId: "Mercury_7173653",
    question: "Machines are often full of moving parts that rub against each other. In machines, a lubricant such as oil is often applied to these moving parts. Why is this oil necessary?",
    options: ["to enhance the effectiveness of friction", "to increase the efficiency of the machine", "to produce more thermal energy on the machine", "to provide an additional source of energy"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1426",
    recordId: "MCAS_2003_8_33",
    question: "The manufacturing process used to permanently put parts together is called",
    options: ["assembling.", "shaping.", "finishing.", "cutting."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1427",
    recordId: "ACTAAP_2007_7_15",
    question: "Solids, liquids, and gases are all different states of which of the following?",
    options: ["matter", "volume", "mass", "weight"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1428",
    recordId: "Mercury_7179253",
    question: "Animals respond to environmental stimuli obtained through their sensory organs. How does the body convert information from the environment to an internal response?",
    options: ["selective membrane transport", "chemical signaling", "increased cellular temperature", "osmotic pressure"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1429",
    recordId: "Mercury_404991",
    question: "Which is a primary energy source used by power plants to generate electricity?",
    options: ["gasoline", "wood", "batteries", "coal"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1430",
    recordId: "Mercury_SC_408509",
    question: "Perry studies the ways in which animals are adapted for survival. Which is a behavioral adaptation that helps the organism to survive?",
    options: ["a flower attracting a honeybee", "the long neck on a giraffe", "a bear hibernating in winter", "the webbed feet on a duck"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1431",
    recordId: "Mercury_7126875",
    question: "A helium-filled balloon is released into the atmosphere. As the balloon rises, which would most likely increase and cause the balloon to burst?",
    options: ["the temperature of the helium", "the density of the helium", "the mass of the helium", "the volume of the helium"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1432",
    recordId: "Mercury_7068950",
    question: "Which of the following is composed of many cells?",
    options: ["bacterium", "plant", "virus", "paramecium"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1433",
    recordId: "Mercury_7201040",
    question: "As a result of human activity, many lakes in Florida have increased levels of nutrients that support algal growth. These algae grow very rapidly, then die and decompose. What impact does this overgrowth of algae most likely have on the lake ecosystem?",
    options: ["The number of fish species increases.", "The volume of lake water increases.", "The buildup of bottom sediments decreases.", "The amount of dissolved oxygen decreases."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1434",
    recordId: "Mercury_SC_400365",
    question: "The color of which animal allows it to blend into its environment?",
    options: ["squirrel", "penguin", "polar bear", "cardinal"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1435",
    recordId: "Mercury_7172813",
    question: "In the Adirondack forests of New York, some trees have died. The change in the forest is thought to be related to air pollution and rain. Which abiotic factor most likely has been changed as a result of the pollution and rain which resulted in the death of the trees?",
    options: ["an increase in the amount of sunlight", "a decrease in the amount of available oxygen", "a decrease in the pH of the soil", "an increase in the nutrients"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1436",
    recordId: "NYSEDREGENTS_2010_4_8",
    question: "The Sun is classified as",
    options: ["an organism", "a star", "a planet", "a decomposer"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1437",
    recordId: "Mercury_SC_400843",
    question: "Which material is attracted to a magnet?",
    options: ["wood", "iron", "ice", "plastic"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1438",
    recordId: "Mercury_7008593",
    question: "What are the building blocks of all matter?",
    options: ["vacuoles", "atoms", "forces", "cells"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1439",
    recordId: "Mercury_7200568",
    question: "Mrs. Henry's class studied the arrangement of planets in the solar system. Which planets are closest to each other?",
    options: ["Uranus and Neptune", "Mars and Earth", "Mercury and Venus", "Saturn and Jupiter"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1440",
    recordId: "NYSEDREGENTS_2015_8_6",
    question: "The primary role of the endocrine system is to",
    options: ["produce hormones that regulate body functions", "break down food to release nutrients", "form chemicals that destroy microbes", "supply red blood cells to carry oxygen"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1441",
    recordId: "TIMSS_1995_8_P4",
    question: "What happens when an animal hibernates?",
    options: ["It stops breathing.", "There is no life in any of its parts.", "It is absorbing energy for use when it is active.", "Its temperature is higher than when it is active.", "It is using less energy than when it is active."],
    answerIndex: 4,
    answerLetter: "E"
  }),
  q({
    id: "ARC/1442",
    recordId: "Mercury_SC_408851",
    question: "The invention of the microscope was important to the advancement of science. Many other discoveries were only possible with the help of the microscope. The microscope was used to make which discovery?",
    options: ["White light can be broken into colors.", "Matter is made of elements.", "Some organisms have only one cell.", "Plants can make their own food."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1443",
    recordId: "CSZ30179",
    question: "A galaxy is best described as a cluster of",
    options: ["millions of stars.", "billions of stars.", "hundreds of stars.", "thousands of stars."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1444",
    recordId: "Mercury_SC_400214",
    question: "A student in science class finds an unlabeled bottle containing a liquid. For safety purposes the student should",
    options: ["compare the liquid to other liquids.", "pour the liquid down the drain.", "find the mass of the bottle and liquid.", "tell the teacher about the bottle and liquid."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1445",
    recordId: "Mercury_SC_409669",
    question: "A scientist discovered a way to turn plant material into fuel. This more cleanly burning fuel can be used in cars. How do people most likely benefit from turning plant material into fuel?",
    options: ["Cars are safer to drive.", "Farmers grow more plants.", "The number of cars around the world increases.", "The amount of air pollution is reduced."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1446",
    recordId: "Mercury_7041213",
    question: "Sunlight is able to penetrate the top several meters of marine water, where most plant and animal life exists. Which of these systems are interacting in this description?",
    options: ["weather systems and ocean systems", "solar energy and ocean systems", "solar energy, ocean systems, and weather systems", "solar energy and weather systems"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1447",
    recordId: "NYSEDREGENTS_2010_4_23",
    question: "A male puppy inherits traits from",
    options: ["its father, only", "its mother, only", "both parents"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1448",
    recordId: "Mercury_7269098",
    question: "Fossil fuels were made from specific kinds of ancient organisms. The fossilized remains of tiny ocean organisms formed",
    options: ["only coal.", "oil and coal.", "only natural gas.", "oil and natural gas."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1449",
    recordId: "Mercury_SC_403011",
    question: "In the water cycle, where does water go after reaching the ocean?",
    options: ["The water changes into water vapor.", "The water flows into a river.", "The water falls from the clouds.", "The water sinks to the ocean floor."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1450",
    recordId: "Mercury_7017903",
    question: "Mountain bike tires have large, knob-like treads. These tires are useful on steep slopes because they",
    options: ["increase friction.", "prevent braking of the bicycle.", "carry heavy weights.", "increase the stopping distance."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1451",
    recordId: "Mercury_SC_406663",
    question: "A student plans to write a report about a type of bird that includes only facts. Which statement should the student leave out of the report?",
    options: ["Most of these birds are 13 cm tall.", "Most of these birds are about 10 grams.", "These birds are beautiful.", "These birds are blue."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1452",
    recordId: "Mercury_SC_400611",
    question: "Over a long time, oil can form when layers of sediment push down on decomposing",
    options: ["algae.", "fungi.", "animals.", "trees."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1453",
    recordId: "NYSEDREGENTS_2013_8_22",
    question: "A biological community is made up of all the",
    options: ["populations living in an area", "natural resources present in an area", "members of a species on Earth", "environments on Earth"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1454",
    recordId: "NYSEDREGENTS_2012_8_31",
    question: "Which temperature and moisture conditions describe an air mass that originates over the Atlantic Ocean near the equator?",
    options: ["cool and dry", "warm and humid", "warm and dry", "cool and humid"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1455",
    recordId: "MCAS_2000_4_32",
    question: "The parts of plants that make seeds are the",
    options: ["stems.", "leaves.", "roots.", "flowers."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1456",
    recordId: "TIMSS_1995_8_K15",
    question: "Fossil fuels were formed from",
    options: ["sea water", "sand and gravel", "uranium", "dead plants and animals"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1457",
    recordId: "Mercury_SC_405792",
    question: "Over time, iron becomes rust when it combines with water and oxygen. Which type of change must occur for rust to form?",
    options: ["nuclear", "chemical", "mechanical", "physical"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1458",
    recordId: "ACTAAP_2007_7_13",
    question: "When a bottle of strong perfume is opened at the front of a classroom, the smell gradually spreads throughout the entire room. Which process explains this occurrence?",
    options: ["diffusion", "cell activity", "osmosis", "cell transport"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1459",
    recordId: "Mercury_SC_402116",
    question: "A student is trying to model an ocean environment. What is the most important factor the student should add to the aquarium in order to make sure that the model is accurate?",
    options: ["seaweed", "salt water", "coral reef", "starfish"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1460",
    recordId: "MSA_2015_5_34",
    question: "Students measured how long it took for an ice cube to melt. Which measurement best represents how long it took for the ice cube to melt?",
    options: ["40 grams", "20° Celsius", "60 milliliters", "80 seconds"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1461",
    recordId: "NYSEDREGENTS_2012_8_30",
    question: "Rocks are classified as sedimentary, metamorphic, or igneous on the basis of the",
    options: ["age of the rocks", "way the rocks were formed", "number of minerals found in the rocks", "types of fossils the rocks contain"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1462",
    recordId: "Mercury_7222303",
    question: "Which basic units of matter have the same properties as an element?",
    options: ["electrons", "atoms", "protons", "neutrons"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1463",
    recordId: "Mercury_7220483",
    question: "Some jet airplanes fly in a layer of the atmosphere where temperature generally increases with altitude. What is this layer of the atmosphere?",
    options: ["mesosphere", "troposphere", "stratosphere", "thermosphere"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1464",
    recordId: "Mercury_7034773",
    question: "One unique characteristic of water is that its specific heat",
    options: ["is lower than other common substances.", "can only be measured in calories.", "requires little energy for a big temperature change.", "is higher than other common substances."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1465",
    recordId: "Mercury_7210893",
    question: "An earthquake occurs in western Nevada. What most likely causes the earthquake?",
    options: ["rotational imbalance due to changes in the location of Earth's poles", "temperature variation due to Earth's orbit around the Sun", "stress due to the movement of Earth's crustal plates", "gravitational variation due to the Moon's orbit around Earth"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1466",
    recordId: "Mercury_187093",
    question: "A scientist puts more food than a lab rat can eat in each of 100 cages containing lab rats. She surveys the mass of food each rat eats in one day. To determine the difference between the largest and smallest masses of food eaten, she should find her data's",
    options: ["mean.", "median.", "mode.", "range."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1467",
    recordId: "Mercury_7271355",
    question: "Which of these is defined as \"the passage of genetic instructions from one generation to the next?\"",
    options: ["heredity", "growth", "reproduction", "development"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1468",
    recordId: "Mercury_7033530",
    question: "What is the primary source of stored thermal energy in oceans?",
    options: ["sunlight", "plankton", "hurricanes", "volcanoes"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1469",
    recordId: "NYSEDREGENTS_2013_4_8",
    question: "Two empty metal cans, one black and one white, were placed outside on a hot day. Both cans were the same size and were left in the Sun for 3 hours. Compared to the white can, the black can would most likely be",
    options: ["cooler, because it absorbs less sunlight", "warmer, because it absorbs less sunlight", "warmer, because it absorbs more sunlight", "cooler, because it absorbs more sunlight"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1470",
    recordId: "Mercury_SC_409026",
    question: "Oil and gas are two sources of energy used in America. Which is the main reason oil and gas may be replaced with other sources of energy in the future?",
    options: ["Oil and gas produce very little power.", "Oil and gas are too costly to remove from the ground.", "Oil and gas work in too few machines.", "Oil and gas are limited in their supplies."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1471",
    recordId: "Mercury_7214253",
    question: "Which of these are parts of the geologic process that changes metamorphic rock into sedimentary rock?",
    options: ["volcanic eruption and lava flow", "igneous intrusion and solidification", "faulting and displacement", "erosion and deposition"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1472",
    recordId: "Mercury_SC_400923",
    question: "In a forest, a brown-colored bird sits on a tree branch. How does the bird's brown color most likely help it survive in the forest?",
    options: ["warns predators of its defense", "hides it from predators", "attracts insects for food", "allows it to stay warm"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1473",
    recordId: "Mercury_SC_405496",
    question: "Rock layers with sand-sized particles were most likely deposited by",
    options: ["glaciers.", "landslides.", "wind.", "water."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1474",
    recordId: "MCAS_2000_8_16",
    question: "The living systems of plants and animals are constantly taking in water to continue the processes of life. What eventually happens to most of that water?",
    options: ["It is returned to the environment.", "It is converted into hydrogen and oxygen.", "It is broken down by bacterial decay.", "It is permanently combined with other compounds."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1475",
    recordId: "Mercury_7090580",
    question: "MOST of the volcanoes that make up the \"Ring of Fire\" were formed near",
    options: ["normal faults.", "divergent boundaries.", "subduction zones.", "hot spots."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1476",
    recordId: "Mercury_7044555",
    question: "Which is not considered an instrument to be used to determine weather?",
    options: ["a barometer", "a thermometer", "a millimeter", "an anemometer"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1477",
    recordId: "Mercury_SC_401789",
    question: "Which natural process is responsible for the formation of the Mississippi Delta?",
    options: ["snow", "deposition", "weathering", "drought"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1478",
    recordId: "Mercury_7001873",
    question: "Neon (Ne), argon (Ar), and krypton (Kr) are in the same column on the Periodic Table of the Elements. What characteristic do these elements have in common?",
    options: ["atomic mass", "number of neutrons", "negative electrical charge", "full valence electron shells"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1479",
    recordId: "Mercury_SC_415071",
    question: "Screech owls nest in holes in trees. They eat mice and crickets. Where would a screech owl most likely live?",
    options: ["a desert", "a rainforest", "a forest", "a beach"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1480",
    recordId: "Mercury_SC_408991",
    question: "Carlos was playing on a slide on a sunny summer day. Which property of the slide tells Carlos how much energy the slide absorbed from the Sun?",
    options: ["the mass", "the height", "the temperature", "the color"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1481",
    recordId: "TIMSS_2011_8_pg101",
    question: "Which equation summarizes the process of respiration?",
    options: ["water + carbon dioxide + energy -> sugar + oxygen", "sugar + carbon dioxide + energy -> oxygen + water", "carbon dioxide + oxygen + water -> sugar + energy", "oxygen + sugar -> carbon dioxide + water + energy"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1482",
    recordId: "Mercury_SC_407441",
    question: "When a baker bakes bread, he prepares the dough by mixing 2 cups of flour with 1 cup of water. The water needs to be 85°F. Which tools are best for the baker to measure both the volume and temperature of the water?",
    options: ["a balance and a thermometer", "a measuring cup and a thermometer", "a measuring cup and a balance", "a balance and a ruler"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1483",
    recordId: "MCAS_2015_5_11",
    question: "What form of energy makes a compass needle point north?",
    options: ["heat", "light", "electrical", "magnetic"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1484",
    recordId: "Mercury_7091875",
    question: "Which process in the water cycle is directly caused by the heat from the Sun?",
    options: ["cloud formation", "stream flow", "runoff", "evaporation"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1485",
    recordId: "Mercury_SC_400848",
    question: "Which tool is used to observe the cell wall of a leaf?",
    options: ["microscope", "camera", "hand lens", "ruler"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1486",
    recordId: "Mercury_SC_400844",
    question: "Which material best conducts electricity?",
    options: ["plastic straw", "wooden stick", "wool coat", "copper pipe"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1487",
    recordId: "Mercury_177730",
    question: "In 1922 N. L. Bowen developed the concept of magmatic evolution which is also known as Bowen's Reaction Series. Applying the Bowen's Series principles, what mineral forms and crystallizes first in the region of highest temperature and pressure?",
    options: ["olivine", "amphibole", "quartz", "pyroxene"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1488",
    recordId: "Mercury_406923",
    question: "A cyclist travels 3 km north in 25 minutes. What does this information describe?",
    options: ["force", "mass", "motion", "gravity"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1489",
    recordId: "Mercury_SC_LBS10169",
    question: "Which of these occurs when the North Pole is tilted toward the Sun and the United States has the most daylight hours of the year?",
    options: ["fall equinox", "winter solstice", "summer solstice", "spring equinox"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1490",
    recordId: "Mercury_185500",
    question: "A ball rolls across the floor and slows down to a stop. Which force caused the ball to slow down?",
    options: ["magnetic", "friction", "gravity", "inertia"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1491",
    recordId: "ACTAAP_2008_7_16",
    question: "Which energy source might involve burning wood or producing gasohol?",
    options: ["nuclear fission", "wind turbine", "biomass", "hydroelectric power"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1492",
    recordId: "Mercury_SC_401642",
    question: "A marine iguana is an animal that lives on the shoreline of warm islands. Its tail is long and thick. Which of these is improved by the shape of its tail?",
    options: ["swimming in the ocean", "finding food inland", "absorbing nutrients", "blending in with rocks"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1493",
    recordId: "LEAP__7_10355",
    question: "Leslie's science teacher told her she must take a flexible approach to solving problems. What did Leslie's teacher most likely mean?",
    options: ["Leslie should accept all scientific theories even if they have been proven wrong.", "Leslie should only write down lab results that seem to be correct.", "Leslie should not follow the experimental instructions exactly.", "Leslie should be willing to consider many possible causes for her observations."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1494",
    recordId: "Mercury_SC_400836",
    question: "What would happen if a magnet was placed in the center of a plastic bowl containing a mixture of iron filings and sand?",
    options: ["The iron filings will be attracted to the magnet.", "The sand will be repelled by the magnet.", "The iron filings will be repelled by the magnet.", "The sand will be attracted to the magnet."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1495",
    recordId: "NYSEDREGENTS_2008_4_2",
    question: "Which property of an object is identified using the sense of smell?",
    options: ["color", "weight", "odor", "temperature"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1496",
    recordId: "Mercury_SC_406885",
    question: "Hector's class is counting the number of ducks in a pond. Hector counts a different number than the rest of the class. Which of the following actions should Hector most likely perform?",
    options: ["keep the result", "remove his number from the class result", "change the number he counted", "think that the class results are wrong"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1497",
    recordId: "Mercury_SC_401160",
    question: "Which property of sugar remains after sugar is dissolved in water?",
    options: ["color", "taste", "texture", "shape"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1498",
    recordId: "Mercury_7221393",
    question: "Which substance is composed of only one type of atom?",
    options: ["salt", "water", "sugar", "gold"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1499",
    recordId: "Mercury_7071610",
    question: "Over a two-week period, several students complain of feeling sick. Their symptoms include a cough, fever, and a sore throat. What describes the most likely cause of these symptoms?",
    options: ["decrease in physical exercise", "consumption of bad food", "exposure to hot weather", "infection by a virus"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1500",
    recordId: "MCAS_2010_8_12006",
    question: "The Appalachian Mountains, which extend from Canada to Alabama, were much taller in the past than they are today. Which of the following two processes are most responsible for the decrease in the height of the Appalachian Mountains?",
    options: ["weathering and erosion", "sedimentation and flooding", "tectonic collisions and earthquakes", "volcanic eruptions and landslides"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1501",
    recordId: "NYSEDREGENTS_2013_4_13",
    question: "Which organisms break down and recycle dead plants and animals?",
    options: ["decomposers", "prey", "producers", "predators"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1502",
    recordId: "MCAS_2000_8_20",
    question: "Which is not a significant reason why people are living longer today than 100 years ago?",
    options: ["better health care", "better nutrition", "development of sugar substitutes", "development of medicines"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1503",
    recordId: "Mercury_7137445",
    question: "Joann repeatedly overfed the fish in the pond behind her house. The nitrates from the excess food contributed to an overgrowth of algae. To correct the problem, Joann added more plants to the pond. How will adding more plants help?",
    options: ["The plants will compete with algae for nutrients.", "The plants will camouflage the green algae.", "The plants make the pond look beautiful.", "The plants will provide all the food for the fish."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1504",
    recordId: "Mercury_7283693",
    question: "The engineering team that is designing a scientific research station on the Arctic permafrost has to provide the station with energy for cooking, heating, and lighting. Considering the fragile environment and other conditions there, the best choice is probably to",
    options: ["build a solar collector.", "build a wind turbine.", "have fuel trucked in.", "have a pipeline built."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1505",
    recordId: "MEA_2016_5_5",
    question: "A student walks to school each morning in Maine. It is dark outside when he begins walking. As the days pass, the student notices the mornings are becoming brighter. The Sun is rising earlier each day. He also notices that there is more daylight after school. The Sun is setting later in the day. Which change of seasons is occurring?",
    options: ["winter to spring", "spring to winter", "summer to fall", "fall to winter"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1506",
    recordId: "TIMSS_2011_8_pg50",
    question: "Where did organisms live when they first appeared on Earth?",
    options: ["in the air", "in the water", "on the land", "under the ground"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1507",
    recordId: "Mercury_7217228",
    question: "Which of the following will always produce a magnetic force on a nearby iron nail?",
    options: ["a large static electric charge", "an electric field", "a long piece of copper wire", "an electric current"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1508",
    recordId: "Mercury_SC_401190",
    question: "Which of these items is designed to produce heat from electricity?",
    options: ["a camera", "a toaster", "a television", "a blender"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1509",
    recordId: "Mercury_7210105",
    question: "A student records the temperature in the schoolyard every day for a month. Which is the best way to present the temperature data so each day can be compared?",
    options: ["labeled diagram", "summary paragraph", "pie chart", "bar graph"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1510",
    recordId: "NYSEDREGENTS_2012_4_10",
    question: "At approximately which time of day is the Sun at the highest point in the sky to an observer in New York State?",
    options: ["midnight", "noon", "6 p.m.", "6 a.m."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1511",
    recordId: "Mercury_7122955",
    question: "When one form of energy is converted into other forms of energy, the total amount of energy",
    options: ["increases because some energy is created.", "varies throughout the conversion.", "decreases because some energy is destroyed.", "remains constant throughout the conversion."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1512",
    recordId: "MCAS_1998_8_11",
    question: "To study the effect of heat on plant growth, Andy divided ten identical seedlings into groups. She placed one group on a windowsill in the sun and the other group in a dark closet on the cool (north) side of the house. Think about the characteristics of a properly designed scientific experiment. What is wrong with the above experiment?",
    options: ["One group of seedlings got less water than the other.", "The amount of light was different for the two groups.", "Nothing is wrong with the experiment.", "The temperature difference between the two groups was not great enough."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1513",
    recordId: "Mercury_7092278",
    question: "Which of these groups would be most concerned with technological developments in insect control?",
    options: ["agriculturists", "archaeologists", "meteorologists", "paleontologists"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1514",
    recordId: "Mercury_SC_401658",
    question: "A model of Earth would be different from a model of the Moon because the Moon model would be",
    options: ["rougher", "smaller", "heavier", "shinier"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1515",
    recordId: "Mercury_7211558",
    question: "A student sees a bird at a feeder. The student identifies the bird as a sparrow. Which organ system did the student use to identify the bird?",
    options: ["nervous", "skeletal", "circulatory", "muscular"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1516",
    recordId: "Mercury_SC_402070",
    question: "Which tool is the best to use when studying small organisms not visible to the eye?",
    options: ["microscope", "telescope", "hand lens", "magnifying glass"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1517",
    recordId: "Mercury_7004130",
    question: "Which would most likely cause a decrease in the number of woodpeckers in an ecosystem?",
    options: ["destroying all dead trees and stumps", "draining a spring-fed pond", "plowing and planting meadows", "building a road around a small forest"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1518",
    recordId: "MCAS_2000_8_12",
    question: "Which is not a characteristic common to organisms?",
    options: ["rigidity", "reproduction", "presence of DNA", "requires energy"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1519",
    recordId: "Mercury_7141785",
    question: "Which calculation is used to determine acceleration?",
    options: ["divide change in velocity by change in time", "multiply change in velocity by distance traveled", "multiply average velocity by change in time", "divide average velocity by mass"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1520",
    recordId: "Mercury_SC_406040",
    question: "Dogs have some learned behaviors. Which is most likely a learned behavior in a dog?",
    options: ["panting when it feels hot", "chasing a squirrel up a tree", "barking when it wants to go outside", "sniffing to find food"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1521",
    recordId: "Mercury_7115255",
    question: "Some wasp species lay their eggs inside living caterpillars. As the eggs mature, they use the caterpillar as a food resource. Eventually, the wasp larvae hatch out of the caterpillar. This type of relationship is best described as",
    options: ["mutualistic.", "predator-prey.", "parasitic.", "commensalistic."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1522",
    recordId: "VASoL_2008_5_5",
    question: "Which is the best action to help protect water resources in Virginia?",
    options: ["Rinse spilled gasoline with a hose.", "Dispose of pet waste in a stream.", "Organize a river cleanup program.", "Put hazardous waste in with house trash."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1523",
    recordId: "Mercury_7040950",
    question: "The Moon's rotation is",
    options: ["about the same as its revolution.", "half as fast as its revolution.", "faster than its revolution.", "slower than its revolution."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1524",
    recordId: "NYSEDREGENTS_2012_8_15",
    question: "Which process involves choosing certain organisms to reproduce with one another in order to pass on specific, desirable traits to their offspring?",
    options: ["asexual reproduction", "resource acquisition", "natural selection", "selective breeding"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1525",
    recordId: "Mercury_404900",
    question: "During which process are nuclei duplicated?",
    options: ["photosynthesis", "mitosis", "respiration", "fertilization"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1526",
    recordId: "Mercury_SC_415583",
    question: "In a turtle race, each turtle walks one a 3-meter track. If the turtles walk one at a time, how can you tell which turtle was fastest?",
    options: ["The turtle that took the shortest time is fastest.", "The turtle that started first is fastest.", "The turtle that finished first is fastest.", "The turtle that took the longest time is fastest."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1527",
    recordId: "OHAT_2009_5_42",
    question: "Which organism is a decomposer?",
    options: ["frog", "oak tree", "worm", "grasshopper"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1528",
    recordId: "Mercury_400522",
    question: "Parents with freckles often have children with freckles. This occurs because",
    options: ["freckles are an inherited trait.", "freckles develop from light.", "certain foods cause freckles.", "certain habits cause freckles."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1529",
    recordId: "Mercury_7116358",
    question: "Two fossils of the same species were found on two different continents. The continents are separated by the Atlantic Ocean. Scientists dated the fossils to be 2 million years old. Which is the least likely explanation for these findings?",
    options: ["The animals swam across the ocean.", "A great land bridge once connected the continents.", "The remains were carried by ocean currents.", "A single landmass once existed with both continents."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1530",
    recordId: "Mercury_SC_407796",
    question: "Students visited a garden to observe hummingbirds. They wanted to find out if hummingbirds were more likely to visit colored flowers or white flowers. Which should the students do first for this investigation?",
    options: ["research the number of different hummingbirds that live in the garden", "conclude that hummingbirds prefer white flowers", "write a report about the kinds of flowers in the garden", "observe hummingbirds at flowers and record the flower color"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1531",
    recordId: "Mercury_7043978",
    question: "What is the name of the author who proposed natural selection as the mechanism of evolution?",
    options: ["Darwin", "Mendel", "Lamarck", "Hardy-Weinberg"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1532",
    recordId: "NYSEDREGENTS_2012_8_13",
    question: "Which pair of terms describes the usual location for fertilization and the first stages of development in human reproduction?",
    options: ["external fertilization and external development", "internal fertilization and external development", "internal fertilization and internal development", "external fertilization and internal development"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1533",
    recordId: "Mercury_7025025",
    question: "In the rock cycle an igneous rock forms from",
    options: ["high pressure and heat", "cooling temperatures", "compacted plant remains", "weathering and erosion"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1534",
    recordId: "Mercury_7188825",
    question: "Mars is an inner planet and Jupiter is an outer planet. Which best describes the relationship between the two planets?",
    options: ["They are located on opposite sides of the asteroid belt.", "They are made of the same materials.", "They have the same orbital periods around the Sun.", "They orbit the Sun in opposite directions."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1535",
    recordId: "Mercury_SC_400118",
    question: "In order for electricity from a battery to power a light bulb, the wire has to provide the electricity a path to do what?",
    options: ["change the chemical properties of the wire", "charge the air molecules near the circuit", "jump from one battery terminal to the other", "flow through the entire closed circuit"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1536",
    recordId: "Mercury_SC_410972",
    question: "Many cities encourage people to recycle. The items that can be recycled are placed in a special container and picked up each week from people's homes. How does recycling most likely help the environment?",
    options: ["Recycling makes products last longer.", "Recycling increases the amount of dust in the air.", "Recycling reduces littering.", "Recycling puts less trash in the city landfill."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1537",
    recordId: "Mercury_7015575",
    question: "When coal burns, the reaction",
    options: ["absorbs heat and is endothermic.", "releases heat and is exothermic.", "absorbs heat and is exothermic.", "releases heat and is endothermic."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1538",
    recordId: "Mercury_7184748",
    question: "Scientists have discovered that there has been a reduction in the butterfly population in an ecosystem. After much research, they have identified that the carrying capacity for butterflies has been decreased. If the scientists want to increase the butterfly population, which action should they recommend?",
    options: ["spraying of insecticides", "increasing runoff", "planting flowers", "removing primary producers"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1539",
    recordId: "VASoL_2010_5_15",
    question: "Which do meteorologists use to measure the amount of precipitation that falls during a storm?",
    options: ["Barometer", "Weather vane", "Rain gauge", "Anemometer"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1540",
    recordId: "NYSEDREGENTS_2012_4_5",
    question: "Which terms are both used to describe the weather?",
    options: ["air temperature and wind speed", "gravity and wind direction", "precipitation and runoff", "groundwater and erosion"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1541",
    recordId: "Mercury_7108063",
    question: "Which of these has been controlled in an attempt to reduce the depletion of ozone in Earth's atmosphere?",
    options: ["methods of filtering gasoline", "use of mercury (Hg) compounds", "use of chlorofluorocarbons (CFCs)", "methods of radioactive waste storage"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1542",
    recordId: "Mercury_SC_400609",
    question: "Today's limestone caverns were once solid rock. Acidic rainwater seeping through the rock over hundreds of years dissolved part of the rock, forming caverns. This is an example of",
    options: ["erosion.", "chemical weathering.", "deposition.", "physical weathering."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1543",
    recordId: "Mercury_416411",
    question: "Which of the following contains most of the water on Earth?",
    options: ["watersheds", "ice and aquifers", "the oceans", "the atmosphere"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1544",
    recordId: "NYSEDREGENTS_2008_8_16",
    question: "Which substance do all living things require to survive?",
    options: ["blood", "water", "organic soil", "carbon dioxide"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1545",
    recordId: "Mercury_7027388",
    question: "A student plans to measure the thermal expansion of a strip of metal as it is heated from 0ºC to 50ºC. Which piece of equipment should he use to measure the expansion?",
    options: ["a balance", "a compass", "a ruler", "a protractor"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1546",
    recordId: "Mercury_7271425",
    question: "Which of these was used by Alfred Wegener as evidence that Earth's continental landmasses had drifted apart over time?",
    options: ["the thickness of the continents", "the composition of the continents", "the age of the continents", "the shape of the continents"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1547",
    recordId: "Mercury_7221445",
    question: "The driver of a car at a railroad crossing hears a change in pitch of the train whistle as the train passes by. This change in pitch is most likely due to",
    options: ["the Compton effect.", "a change in speed.", "a change in medium.", "the Doppler effect."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1548",
    recordId: "ACTAAP_2010_5_9",
    question: "Which is an example of a hypothesis?",
    options: ["Large mice will eat more food than smaller mice.", "One flower was measured to be 13 centimeters tall.", "People should be careful to protect endangered animals.", "On a dark night, a student counted hundreds of stars."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1549",
    recordId: "Mercury_SC_401781",
    question: "Which would be considered an inexhaustible resource?",
    options: ["topsoil", "sunlight", "oil", "aluminum"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1550",
    recordId: "Mercury_7032690",
    question: "Which factor causes surface ocean currents?",
    options: ["hurricanes", "the Moon", "the Sun", "the wind"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1551",
    recordId: "MCAS_2004_5_2",
    question: "Marta has a radio in her room. It requires electricity in order to play. Which of the following is necessary in order for electricity to move from the source to the radio?",
    options: ["a magnet", "a light bulb", "a circuit", "an insulator"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1552",
    recordId: "VASoL_2010_3_20",
    question: "Having dry, hot weather for a long time can cause a",
    options: ["tornado", "drought", "flood", "thunderstorm"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1553",
    recordId: "Mercury_191503",
    question: "What is the primary function of white blood cells in humans?",
    options: ["carry oxygen", "remove waste", "grow tissues", "fight disease"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1554",
    recordId: "Mercury_7119875",
    question: "Which trait most likely helps an animal survive in a very cold environment?",
    options: ["sharp claws", "large eyes", "long ears", "thick fur"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1555",
    recordId: "Mercury_7140298",
    question: "Which is most likely a genetic adaptation of desert plants to survive the hot, dry climate conditions?",
    options: ["flowers that bloom all year", "thin bark", "leaves that remain all year", "waxy leaves"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1556",
    recordId: "AKDE&ED_2008_8_43",
    question: "Charles Darwin made a number of observations and inferences during his travels. He studied island finches during a long period of time. Which statement is an inference?",
    options: ["Individual birds of an island finch species have many differences.", "Island finches share a common ancestry with mainland finch species.", "Individual birds have different colored feathers.", "Island finches have a large number of offspring."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1557",
    recordId: "Mercury_7057243",
    question: "A student mixes salt and water in a beaker to form a solution. What properties of the substances would allow the student to then separate the components?",
    options: ["particle sizes", "boiling points", "densities", "electrical conductivity"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1558",
    recordId: "Mercury_404987",
    question: "In a lab investigation, students had to identify different mineral specimens. Which property is the most reliable for identifying one mineral from another?",
    options: ["texture", "crystal shape", "hardness", "surface color"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1559",
    recordId: "CSZ_2004_5_CSZ10100",
    question: "Which of these revolves around a planet?",
    options: ["a comet.", "a star.", "an asteroid.", "a moon."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1560",
    recordId: "MCAS_2013_8_29417",
    question: "A scientist wants to collect several bird eggs on an island. She needs a case that will protect the eggs she collects. Which of the following cases would best protect the eggs?",
    options: ["a hard metal case with flexible foam lining", "a strong wooden case with lightweight plastic lining", "a flexible metal case with smooth plastic lining", "a lightweight wooden case with strong aluminum lining"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1561",
    recordId: "NYSEDREGENTS_2013_8_14",
    question: "Which process is a cause of variation in a species?",
    options: ["regulation", "cellular respiration", "metamorphosis", "sexual reproduction"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1562",
    recordId: "NYSEDREGENTS_2008_4_21",
    question: "The leaves of a tree change color in the fall. This is an example of a tree",
    options: ["completing its life cycle", "preparing for migration", "responding to its environment", "beginning hibernation"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1563",
    recordId: "NYSEDREGENTS_2013_4_20",
    question: "A dog growls when a predator gets close. Growling is an example of which animal behavior?",
    options: ["communication", "germination", "hibernation", "migration"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1564",
    recordId: "Mercury_7041930",
    question: "In what respect are protons and electrons always equal?",
    options: ["magnitude of charge", "mass number", "sign of charge", "kinetic energy"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1565",
    recordId: "Mercury_SC_413009",
    question: "How does the Sun help move water from the ocean through the water cycle?",
    options: ["by blowing water toward land", "by adding particles to the water", "by causing surface water to evaporate", "by increasing the amount of water"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1566",
    recordId: "Mercury_401010",
    question: "What would a model of the Sun, Earth, and Moon best help students visualize?",
    options: ["the effects of volcanic eruptions", "the effects of gravitation", "the phases of the Moon", "the consequences of earthquakes"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1567",
    recordId: "Mercury_416405",
    question: "How are bacterial cells and human cells alike?",
    options: ["They allow carbon dioxide through the cell wall.", "They allow nutrients through the cell membrane.", "They allow nutrients through the nuclear membrane.", "They allow oxygen through the cell wall."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1568",
    recordId: "NYSEDREGENTS_2010_8_27",
    question: "The Moon's surface is visible to an observer on Earth because the Moon",
    options: ["produces its own light", "absorbs light from Earth", "reflects sunlight", "transmits sunlight"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1569",
    recordId: "Mercury_183925",
    question: "Why do trees like oaks and walnuts depend upon squirrels?",
    options: ["to remove dead wood", "to control population size", "to pollinate their flowers", "to aid in seed distribution"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1570",
    recordId: "Mercury_7004760",
    question: "When an atom gains an electron, the atom will",
    options: ["have a negative charge.", "become radioactive.", "reduce its mass.", "lose a proton."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1571",
    recordId: "Mercury_7075180",
    question: "A paramecium is an example of",
    options: ["a group of cells.", "multiple organisms.", "an inorganic substance.", "a single-celled organism."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1572",
    recordId: "Mercury_SC_401283",
    question: "A sea anemone uses poisonous darts to",
    options: ["absorb food.", "defend itself.", "attract a mate.", "protect its young."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1573",
    recordId: "Mercury_7092453",
    question: "Rivers and streams can carry sediments long distances before they are deposited. What is formed when sediments are deposited at the mouth of a river?",
    options: ["a gully", "a rift", "a levee", "a delta"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1574",
    recordId: "MCAS_2002_8_14",
    question: "Steel is used for cables in suspension bridges because of its capacity for",
    options: ["contraction.", "torsion.", "compression.", "tension."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1575",
    recordId: "Mercury_7210385",
    question: "In which layer of the atmosphere does most of Earth's weather occur?",
    options: ["the stratosphere, which contains a sub-layer of ozone", "the exosphere, which is the outermost layer", "the thermosphere, which has the highest temperature", "the troposphere, which is the lowest layer"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1576",
    recordId: "Mercury_SC_402627",
    question: "When light is reflected off an object and enters the eye, it falls on the",
    options: ["lens.", "retina.", "pupil.", "cornea."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1577",
    recordId: "Mercury_7013230",
    question: "The skin, lungs, and kidneys work together to",
    options: ["aid in respiration.", "help eliminate body wastes.", "aid in digestion.", "help blood circulate."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1578",
    recordId: "Mercury_178553",
    question: "Which type of matter can be separated by physical means?",
    options: ["compound", "mixture", "atom", "element"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1579",
    recordId: "Mercury_SC_416097",
    question: "Which plant part is described correctly?",
    options: ["Roots absorb nutrients.", "Stems make seeds.", "Leaves absorb water.", "Flowers make food."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1580",
    recordId: "Mercury_404096",
    question: "Which process causes sand grains to stick together to form sandstone?",
    options: ["combustion", "cementation", "erosion", "abrasion"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1581",
    recordId: "Mercury_SC_401164",
    question: "Plants store energy in what form?",
    options: ["chemical", "mechanical", "light", "heat"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1582",
    recordId: "NYSEDREGENTS_2013_8_37",
    question: "A student placed a rock in a graduated cylinder containing water, causing the water level in the cylinder to increase by 20 mL. This increase represents the rock's",
    options: ["mass", "solubility", "volume", "temperature"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1583",
    recordId: "Mercury_7144498",
    question: "Researchers are investigating whether dinosaurs were endothermic like birds. Which evidence from the fossil record could be effectively compared with modern day evidence to support this hypothesis?",
    options: ["seasonal shifts in food supply", "consumption of the same plant species", "tree rings indicating the return of a similar climate", "similarities in bone structure"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1584",
    recordId: "Mercury_7010973",
    question: "A student pushes a box to slide it across the floor. Which statement explains why the box begins to move?",
    options: ["The weight of the box is less than the force of friction.", "The weight of the box is greater than the force of friction.", "The applied force is less than the force of friction.", "The applied force is greater than the force of friction."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1585",
    recordId: "ACTAAP_2007_7_2",
    question: "Which article might appear in a scientific magazine?",
    options: ["\"The Flora and Fauna of South America\"", "\"The Money Systems of South America\"", "\"The Political Systems of South America\"", "\"The Religions of South America\""],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1586",
    recordId: "Mercury_411070",
    question: "A train travels at a rate of 13 meters per second (m/s). Over the next 60 seconds, the speed of the train increases to speed to 22 m/s. What is the average rate of acceleration of the train?",
    options: ["0.36 m/s^2", "0.58 m/s^2", "0.21 m/s^2", "0.15 m/s^2"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1587",
    recordId: "Mercury_7220518",
    question: "Which trait is common in gases that contribute to Earth's greenhouse effect?",
    options: ["the ability to trap heat", "a tendency to lose electrons", "the ability to bond with multiple other elements", "a tendency to exist as diatomic molecules"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1588",
    recordId: "Mercury_SC_408243",
    question: "George is studying erosion. He learns how rocks break apart over time. Which of these most likely forms when a rock weathers and breaks into small pieces?",
    options: ["crystals", "fossils", "sediments", "minerals"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1589",
    recordId: "Mercury_176610",
    question: "As wave frequency is increased, wave energy",
    options: ["decreases.", "is unaffected.", "stays constant.", "increases."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1590",
    recordId: "Mercury_SC_406070",
    question: "A student is pouring equal amounts of water, maple syrup, and cooking oil into a glass beaker and looking at how the layers settle. Which property of the liquids is the student most likely comparing?",
    options: ["volume", "density", "mass", "temperature"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1591",
    recordId: "Mercury_SC_408905",
    question: "Betsy tries to attract a variety of birds to her backyard. She puts up a bird feeder that contains sunflower seeds and corn. Which term best describes the contents of the bird feeder?",
    options: ["a compound", "a mixture", "a solution", "an element"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1592",
    recordId: "MCAS_2000_8_2",
    question: "Which best describes construction technology?",
    options: ["building and finishing a structure", "changing raw materials into goods", "exchanging information electronically", "converting and transmitting energy"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1593",
    recordId: "NYSEDREGENTS_2013_8_5",
    question: "What eventually happens to a species when the environment changes and the organisms do not adapt?",
    options: ["development", "classification", "regulation", "extinction"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1594",
    recordId: "Mercury_182928",
    question: "Similar types of cells form tissues. What is the next level of complexity formed from the grouping of tissues?",
    options: ["organs", "organ systems", "organisms", "organelles"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1595",
    recordId: "NYSEDREGENTS_2013_8_41",
    question: "Which form of energy is produced when a rubber band vibrates?",
    options: ["sound", "chemical", "light", "electrical"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1596",
    recordId: "Mercury_SC_LBS10940",
    question: "Which discovery was necessary before radio could be invented?",
    options: ["electricity", "reflection", "gravity", "radiation"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1597",
    recordId: "NYSEDREGENTS_2008_8_28",
    question: "Which statement would most likely be included in a news report about an approaching hurricane?",
    options: ["Evacuate low-lying areas near the coast.", "Open the windows to equalize air pressure.", "Expect wind speed to decrease for the next several hours.", "Install snow tires and check the antifreeze in the car radiator."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1598",
    recordId: "Mercury_SC_405784",
    question: "The energy produced by a burner on a gas stove is primarily",
    options: ["heat.", "electrical.", "mechanical.", "sound."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1599",
    recordId: "Mercury_SC_407155",
    question: "Students compare two different rocks. The rocks are both bright and spotted. Which property are the students most likely observing?",
    options: ["colors", "textures", "ages", "layers"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1600",
    recordId: "Mercury_7069510",
    question: "Which of the following makes up the smallest region in the electromagnetic spectrum?",
    options: ["infrared light", "gamma rays", "visible light", "radio waves"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1601",
    recordId: "Mercury_7027563",
    question: "In a northern state, a room used for growing plants is not allowing enough light to enter for healthy plant growth. Adding windows in walls facing which direction would best solve this problem?",
    options: ["east", "south", "west", "north"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1602",
    recordId: "Mercury_181545",
    question: "A student finds a bottle that is labeled with a long chemical name. What is the best way for the student to learn more about the chemical properties of this substance?",
    options: ["shake the container vigorously", "smell a very small amount of it", "look up the name in a science book", "test a small amount to see if it feels slippery"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1603",
    recordId: "Mercury_410702",
    question: "The length of a year on Earth is a little over 365 days. The length of a year on a planet is best described as the time it takes for which to occur?",
    options: ["the planet to rotate once on its axis", "the Sun to rotate once on its axis", "the seasons to complete a full cycle", "the planet to revolve once around the Sun"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1604",
    recordId: "Mercury_7171588",
    question: "The human body has different levels of organization. In the structural organization of the central nervous system, which is an organ?",
    options: ["nerve", "neuron", "brain", "grey matter"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1605",
    recordId: "Mercury_412298",
    question: "Increased human populations can lead to the depletion of locally available resources within communities. Compared to other communities, which of these locally available resources is most likely to be depleted in desert communities?",
    options: ["water", "mineral", "gasoline", "oxygen"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1606",
    recordId: "Mercury_7013843",
    question: "A hot pack is a product that releases heat when chemicals inside of it interact. What is taking place inside an active hot pack?",
    options: ["an exothermic reaction", "electric current", "thermal insulation", "a net loss of mass"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1607",
    recordId: "Mercury_7170643",
    question: "Respiration is a process during which energy is released from glucose. This energy is used for processes such as growth of the body. Which type of energy does respiration release?",
    options: ["thermal", "chemical", "potential", "kinetic"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1608",
    recordId: "Mercury_SC_401319",
    question: "An organism that breaks down dead plants and animals, returning matter back into the soil, is called a",
    options: ["producer.", "herbivore.", "decomposer.", "competitor."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1609",
    recordId: "Mercury_7211418",
    question: "What type of cell passes on mutations?",
    options: ["egg cell", "skin cell", "nerve cell", "red blood cell"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1610",
    recordId: "Mercury_SC_405232",
    question: "Which population would be harmed first by a long period of drought?",
    options: ["fish in a lake", "plants in a pond", "seaweed in an ocean", "fish in a bay"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1611",
    recordId: "Mercury_7141418",
    question: "The house cat was believed to be tamed in ancient Egypt. In 2004, the remains of an eight-month old cat buried with its owner were discovered on the Mediterranean island of Cyprus. The date of burial, however, came before Egyptian civilization. Which best explains the importance of the discovery?",
    options: ["Cats were domesticated earlier than originally thought.", "Wildcats were not domesticated.", "The period of Egyptian civilization was older than originally thought.", "Wildcats are not related to house cats."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1612",
    recordId: "Mercury_SC_LBS10064",
    question: "Which activity requires the use of safety goggles to protect the eyes?",
    options: ["measuring air temperature", "pouring vinegar", "classifying flowers", "collecting rain water"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1613",
    recordId: "Mercury_7085435",
    question: "The most common source of nonrenewable resources used to generate electricity in the state of Nevada is",
    options: ["oil.", "geothermal.", "coal.", "hydroelectric."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1614",
    recordId: "Mercury_7012688",
    question: "A \"light year\" refers to",
    options: ["the distance light travels in one year.", "the of time it takes light to travel from Earth to the Sun.", "the amount of light required on Earth in one year.", "the distance between two sources of light."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1615",
    recordId: "AIMS_2009_4_13",
    question: "All animals need air to survive. An insect gets air through tiny holes on the sides of its body. A whale breathes through a blow hole. What body part do fish use to breathe?",
    options: ["gills", "nose", "skin", "mouth"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1616",
    recordId: "MCAS_2003_5_8",
    question: "Which of the following tools would be most useful in determining the length and width of a school cafeteria?",
    options: ["scale", "thermometer", "centimeter ruler", "tape measure"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1617",
    recordId: "Mercury_7239453",
    question: "The extensive branching of neurons helps them to perform which function?",
    options: ["stockpile chemical energy", "communicate with other neurons", "secrete hormones", "maintain structural stability"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1618",
    recordId: "Mercury_180390",
    question: "Which of the following are narrow belts of strong winds found in the upper troposphere?",
    options: ["doldrums", "westerlies", "trade winds", "jet streams"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1619",
    recordId: "Mercury_SC_407405",
    question: "A hiker wants to know if air is warmer in a forest than in the nearby farm field. Which activity would best help the hiker find out which area is warmer?",
    options: ["recording the temperatures at both locations", "reading a book about farm fields", "making a weather prediction for the forests", "measuring the wind speed at both locations"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1620",
    recordId: "MCAS_1998_8_12",
    question: "Recently the telephone company announced the implementation of a new telephone area code for Massachusetts. What technological changes are responsible for the need for a new area code?",
    options: ["the increase in use of speed dialing and call waiting", "the increased demand for telephone repairs and installation", "the increase in use of modems, fax machines, and cellular phones", "the increased size of the telephone book"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1621",
    recordId: "AIMS_2008_8_7",
    question: "Which of the following is a benefit of using radiation as a medical treatment?",
    options: ["It improves immune system function.", "It kills cancer cells.", "It produces healthy cells.", "It prevents many forms of illness in patients."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1622",
    recordId: "Mercury_7217910",
    question: "Which of these statements best describes temperature as elevation in the atmosphere increases?",
    options: ["Temperature remains constant with elevation in the thermosphere.", "Temperature remains constant with elevation in the mesosphere.", "Temperature generally decreases with elevation in the stratosphere.", "Temperature generally decreases with elevation in the troposphere."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1623",
    recordId: "Mercury_7029768",
    question: "The transfer of heat in the atmosphere by winds that circulate between the equator and the poles is an example of",
    options: ["conduction.", "convection.", "insulation.", "radiation."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1624",
    recordId: "NCEOGA_2013_5_6",
    question: "Which is most responsible for the uneven heating of the air in the atmosphere?",
    options: ["convection", "radiation", "condensation", "conduction"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1625",
    recordId: "TIMSS_2003_8_pg48",
    question: "Three gases found in Earth's atmosphere are carbon dioxide, nitrogen, and oxygen. What is their order of abundance from greatest to least?",
    options: ["nitrogen, oxygen, carbon dioxide", "carbon dioxide, oxygen, nitrogen", "oxygen, nitrogen, carbon dioxide", "nitrogen, carbon dioxide, oxygen"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1626",
    recordId: "Mercury_7003623",
    question: "Copper, silver, and nickel are all classified as",
    options: ["halogens.", "nonmetals.", "noble gases.", "transition metals."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1627",
    recordId: "Mercury_7099260",
    question: "The body is made up of many systems that interact with one another. For example, the skeletal system and the muscular system work together to help the body move. Which system works with the respiratory system to distribute oxygen to the body?",
    options: ["digestive system", "lymphatic system", "circulatory system", "muscular system"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1628",
    recordId: "Mercury_7025095",
    question: "Sediment that is deposited on a beach may come from a local source or be transported by which action?",
    options: ["longshore drift", "rip currents", "swash", "river currents"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1629",
    recordId: "Mercury_7009748",
    question: "Sonar can be used to measure distances underwater. This is accomplished by sending a sound wave to a \"target\" while measuring the total time it takes for the wave to reach the target and then return to its source. Which of the following sound wave characteristics must be known when using sonar to measure distances?",
    options: ["wavelength", "frequency", "amplitude", "speed"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1630",
    recordId: "Mercury_7008418",
    question: "What major events cause islands to form in the Pacific Ocean?",
    options: ["erosion", "severe storms", "tsunamis", "volcanic eruptions"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1631",
    recordId: "MDSA_2012_8_1",
    question: "Fossil fuels are common sources of energy. What type of pollution is most often associated with burning fossil fuels?",
    options: ["noise", "water", "land", "air"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1632",
    recordId: "NYSEDREGENTS_2010_4_29",
    question: "A boy and his sister both play piano. Playing piano is an example of",
    options: ["an inherited trait", "a physical change", "a learned behavior", "a life function"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1633",
    recordId: "MCAS_2000_8_28",
    question: "Which is the best way to generate an electrical current in a coil of wire?",
    options: ["heating the coil uniformly", "rotating the coil in a magnetic field", "laying the coil near a magnet", "stroking the coil with a piece of silk"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1634",
    recordId: "Mercury_7056735",
    question: "What property of water best helps aquatic life survive in lakes during the winter?",
    options: ["water has a high specific heat capacity", "water is less dense as a solid than as a liquid", "water has a high surface tension", "water is a polar molecule"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1635",
    recordId: "Mercury_SC_406840",
    question: "Which part of a plant helps the plant make food from sunlight?",
    options: ["pollen", "leaf", "seed", "fruit"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1636",
    recordId: "MCAS_2011_8_17681",
    question: "Which of the following is the main reason water at the surface of the ocean is warmer than water at the bottom of the ocean?",
    options: ["Wave action transfers heat from the bottom of the ocean to the surface.", "Water at the bottom of the ocean contains more dissolved solids.", "Water at the surface of the ocean absorbs more energy from the Sun.", "Friction is created by fast moving currents at the surface of the ocean."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1637",
    recordId: "Mercury_SC_406703",
    question: "A student finds an animal in the wild. He decides it is a bird because it has",
    options: ["scales.", "four legs.", "fins.", "feathers."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1638",
    recordId: "LEAP_2000_8_1",
    question: "Many scientists accept the theory that excess emission of carbon dioxide from cars and industry causes a layer of gas in the upper atmosphere that traps heat. This, in turn, causes the average temperature on Earth to rise. Which of the following observations supports that theory?",
    options: ["Carbon dioxide in the upper atmosphere reflects heat radiated from Earth's surface.", "The summer of 1998 was one of the hottest summer seasons on record.", "Carbon dioxide gas from cars and industry is a product of burning that produces heat.", "Radiation on Earth's surface is increasing because of a hole in the ozone layer"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1639",
    recordId: "VASoL_2010_3_6",
    question: "Why is it important to protect soil?",
    options: ["It holds many harmful pollutants.", "It covers the bedrock layer in the earth.", "It dries quickly in sunlight.", "It has nutrients used by plants to grow."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1640",
    recordId: "OHAT_2010_8_24",
    question: "Fungi recycle leaves in forests. Fungi release chemicals onto the leaves to break them down into smaller particles. The fungi use the small particles for growth. Which process allows fungi to obtain the nutrients they need from dead leaves?",
    options: ["circulation", "digestion", "reproduction", "respiration"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1641",
    recordId: "Mercury_7207183",
    question: "Sandstone and all other types of sedimentary rock are made up of particles. The source materials of these particles consist of",
    options: ["fragments that broke off of older rocks.", "vegetation that decayed in thick layers.", "magma that cooled deep below a volcano.", "gases that condensed in the atmosphere."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1642",
    recordId: "Mercury_SC_400005",
    question: "A tree uses gas A to produce gas B. An animal uses gas B to produce gas A. What is gas B in this cycle?",
    options: ["nitrogen", "carbon dioxide", "oxygen", "carbon monoxide"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1643",
    recordId: "MCAS_2011_8_17692",
    question: "Which of the following is produced when two or more elements combine in a chemical reaction?",
    options: ["solution", "mixture", "atom", "compound"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1644",
    recordId: "Mercury_7207113",
    question: "A research team has made new discoveries about magnetism. Which of these statements best describes the value to society of publishing their discoveries?",
    options: ["The publishing company may make money.", "The research team may become famous.", "Their discoveries can be built on by other researchers.", "Their results will be unchangeable."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1645",
    recordId: "LEAP_2004_4_10260",
    question: "Which object in the sky is a satellite of the planet Earth?",
    options: ["Mars", "Moon", "Saturn", "Sun"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1646",
    recordId: "AKDE&ED_2012_4_29",
    question: "Which statement describes a property of water that most likely causes large rocks to break apart?",
    options: ["Water forms droplets as it falls.", "Water expands when it freezes.", "Water turns into a gas when it boils.", "Water takes the shape of its container."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1647",
    recordId: "Mercury_7085470",
    question: "Which of these provides the best evidence that an environmental change has occurred?",
    options: ["a sandy beach next to the ocean", "marine fossils in a freshwater lake", "saltwater clams in the ocean", "a freshwater lake in the mountains"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1648",
    recordId: "NCEOGA_2013_8_3",
    question: "An ice cube is put into a heated pan. What will most likely happen to the molecules in the ice as the ice is heated?",
    options: ["The molecules will begin to increase in density.", "The molecules will begin to move faster.", "The molecules will begin to move slower.", "The molecules will begin to condense in the air."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1649",
    recordId: "Mercury_7164920",
    question: "Dr. Mendez specializes in patients who have osteoarthritis. His patients often complain of pain and swelling due to loss of cartilage. Which system is most affected by this disease?",
    options: ["musculoskeletal", "cardiovascular", "digestive", "immune"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1650",
    recordId: "MCAS_2011_8_17697",
    question: "During the construction of a new building, workers dug round holes in the ground and filled the holes with steel and concrete. Which of the following parts of the building was being built during this stage of construction?",
    options: ["the plumbing", "the foundation", "the walls", "the floor"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1651",
    recordId: "Mercury_SC_LBS10939",
    question: "Centuries ago, people used their knowledge of the stars to",
    options: ["predict volcanic eruptions.", "study the weather.", "map the Earth's surface.", "navigate ships."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1652",
    recordId: "VASoL_2010_3_11",
    question: "Which of these is the BEST way to save animals and trees?",
    options: ["Take care of forests", "Move to the city", "Ride bikes more", "Make more farmland"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1653",
    recordId: "VASoL_2009_3_21",
    question: "From what source does almost all heat energy on Earth come?",
    options: ["Wind", "The Sun", "Water", "The Moon"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1654",
    recordId: "TIMSS_2003_8_pg33",
    question: "Overgrazing of land by livestock contributes to a major problem. That problem is",
    options: ["depletion of ground water", "erosion of soil", "increased pollution", "acid rain"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1655",
    recordId: "Mercury_7016415",
    question: "Which tool would be most useful in studying the living organisms the students collected from the pond?",
    options: ["thermometer", "pH meter", "balance", "microscope"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1656",
    recordId: "Mercury_7029820",
    question: "Which is the Sun most likely to become toward the end of its lifetime?",
    options: ["a white dwarf star", "a protostar", "a black hole", "a neutron star"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1657",
    recordId: "Mercury_7014403",
    question: "Acid rain is the result of pollutants being released into the",
    options: ["oceans.", "rivers.", "air.", "soil."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1658",
    recordId: "Mercury_SC_413637",
    question: "The job of the bladder in an animal is to store wastes. Which organ in an animal removes wastes from the blood?",
    options: ["liver", "heart", "kidney", "stomach"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1659",
    recordId: "NYSEDREGENTS_2013_4_19",
    question: "Animals get the energy they need for growth and repair by",
    options: ["absorbing sunlight", "eliminating waste", "eating food", "drinking water"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1660",
    recordId: "Mercury_415267",
    question: "Which of these cell types has DNA that is not bound in a nuclear membrane?",
    options: ["an animal cell", "a plant cell", "a protist cell", "a prokaryote cell"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1661",
    recordId: "Mercury_7136150",
    question: "In humans, digestion begins in the mouth. The complete process of digestion occurs with the help of many different parts of the body. Which term best identifies the parts of the body that carry out the function of digestion?",
    options: ["a system", "an organism", "an organ", "a tissue"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1662",
    recordId: "Mercury_7199045",
    question: "Anita heats a beaker containing water. As the temperature of the water increases, which change to the water molecules occurs?",
    options: ["The molecules become more massive.", "The molecules expand and become wider.", "The molecules separate into atoms of hydrogen and oxygen.", "The molecules move at a faster rate."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1663",
    recordId: "Mercury_7267505",
    question: "Which of the following are likely to do the most damage to ecosystems along the Rio Grande River?",
    options: ["blizzards", "earthquakes", "floods", "tsunamis"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1664",
    recordId: "NYSEDREGENTS_2015_8_5",
    question: "Which process is responsible for the growth and repair of human tissue?",
    options: ["evolution", "germination", "natural selection", "cell division"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1665",
    recordId: "NYSEDREGENTS_2013_8_6",
    question: "Which sequence represents the correct levels of organization for multicellular organisms?",
    options: ["cell -> tissue -> organ -> organ system", "cell -> organ -> tissue -> organ system", "tissue -> organ -> cell -> organ system", "organ system -> organ -> cell -> tissue"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1666",
    recordId: "Mercury_7175735",
    question: "Convection currents in the mantle are thought to be the driving force behind tectonic movement. At which location do the convection currents cause the plates to diverge?",
    options: ["mid-ocean ridges", "subduction zone", "folded mountains", "strike-slip fault"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1667",
    recordId: "Mercury_SC_405026",
    question: "A class made a solar cooker out of a large can. What color should they paint the can in order to collect the most heat?",
    options: ["white", "pink", "black", "green"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1668",
    recordId: "MCAS_2012_8_23643",
    question: "Ann makes hats for people. She has each person select the fabric and a hat style before she makes the hat to fit the person's head size. Which type of manufacturing system is Ann most likely using to make hats?",
    options: ["automated production", "assembly line production", "custom production", "mass production"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1669",
    recordId: "Mercury_SC_400031",
    question: "What information would be most helpful to a person with allergies when selecting food products?",
    options: ["the nutritional information", "the ingredients", "the company that makes it", "the serving size"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1670",
    recordId: "Mercury_SC_400041",
    question: "Which event takes about one year to complete?",
    options: ["the Moon making a complete rotation", "the Moon revolving completely around Earth", "Earth making a complete rotation", "Earth revolving completely around the Sun"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1671",
    recordId: "ACTAAP_2009_5_1",
    question: "Which planet is fourth from the Sun in our solar system?",
    options: ["Jupiter", "Venus", "Earth", "Mars"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1672",
    recordId: "NYSEDREGENTS_2008_4_5",
    question: "What force causes objects to be pulled toward Earth?",
    options: ["gravity", "electricity", "light", "friction"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1673",
    recordId: "Mercury_SC_416110",
    question: "What do the long vine of an ivy plant and the trunk of an oak tree have in common?",
    options: ["They are both flexible.", "They are both stiff.", "They both give support to a plant.", "They both make food for a plant."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1674",
    recordId: "Mercury_SC_405999",
    question: "Students wanted to see if the growth of a plant was affected by using four different types of soil. How should the students best carry out this investigation after potting the plants in the four different types of soil?",
    options: ["measure the height of each plant every hour", "observe the plants and record observations daily", "add different amounts of water to each plant", "move the plants to new locations every day"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1675",
    recordId: "ACTAAP_2010_5_2",
    question: "In the 16005 Robert Hooke invented an improved type of microscope. Which of these was a direct result of this invention?",
    options: ["The first view of atoms and molecules", "The term cell to describe the smallest unit of life", "Detailed observations of Jupiter and Mars", "The name spectrum for the colors of light"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1676",
    recordId: "Mercury_7008698",
    question: "The number of neutrons in an atom is found by subtracting",
    options: ["isotope number from electron number.", "mass number from atomic number.", "atomic number from mass number.", "atomic number from electron number."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1677",
    recordId: "NYSEDREGENTS_2010_4_15",
    question: "As the distance between a magnet and a metal paper clip increases, the force of attraction between them",
    options: ["remains the same", "increases", "decreases"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1678",
    recordId: "NYSEDREGENTS_2015_8_16",
    question: "Nutrients enter the bloodstream during the process of",
    options: ["respiration", "absorption", "elimination", "locomotion"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1679",
    recordId: "Mercury_412695",
    question: "Which set of elements have chemical properties similar to those of phosphorus?",
    options: ["nitrogen, arsenic, and antimony", "carbon, selenium, and iodine", "silicon, sulfur, and chlorine", "silicon, sulfur, and germanium"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1680",
    recordId: "Mercury_7003990",
    question: "Tides occur in the oceans at regular times every day because of",
    options: ["the tilt of Earth's rotational axis.", "the gravitational pull of the Sun and the Moon.", "upper atmospheric disturbances.", "density differences caused by temperature changes."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1681",
    recordId: "Mercury_400203",
    question: "What is the name of the process in the water cycle shown by label 1?",
    options: ["condensation", "precipitation", "infiltration", "evaporation"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1682",
    recordId: "MCAS_1999_4_7",
    question: "What force pulls things towards the center of Earth?",
    options: ["energy", "friction", "gravity", "magnetism"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1683",
    recordId: "Mercury_7160738",
    question: "Earth can be viewed as an engine and heat exchange is part of the engine system. Which would be an example of a transfer of energy from the atmosphere to the lithosphere?",
    options: ["A hurricane moves from the Gulf of Mexico onto land.", "An earthquake takes place off the coast of Japan.", "A volcano erupts in the state of Washington.", "A wild fire scorches a prairie in the upper Midwest."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1684",
    recordId: "Mercury_7283710",
    question: "All energy resources have benefits, risks, and drawbacks. Which two resources present the most dangerous risks and consequences for the environment during their acquisition?",
    options: ["oil and coal", "solar energy and geothermal energy", "geothermal energy and oil", "coal and solar energy"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1685",
    recordId: "MDSA_2007_8_60",
    question: "A puppy has traits from its mother and its father. Which of these structures provides genetic information from the father to the puppy?",
    options: ["a nerve cell", "a muscle cell", "a blood cell", "a sperm cell"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1686",
    recordId: "Mercury_7201320",
    question: "A scientist performs an experiment which suggests a new explanation for the digestion of certain proteins in humans. These results should first be communicated to the scientific community by which means?",
    options: ["inclusion of the new explanation in a biology textbook", "inviting reporters from many organizations to a press conference", "posting observations and conclusions on the scientist's website", "submission of an article to a peer-reviewed journal"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1687",
    recordId: "Mercury_SC_408939",
    question: "Juan noticed that sunny skies suddenly became stormy. Which most likely happened when the weather changed in this way?",
    options: ["Temperatures increased.", "Humidity decreased.", "Winds weakened.", "Air pressure dropped."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1688",
    recordId: "Mercury_7103548",
    question: "Which process causes water to move from the ocean to the atmosphere during the formation of a hurricane?",
    options: ["condensation", "precipitation", "runoff", "evaporation"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1689",
    recordId: "Mercury_7001540",
    question: "A student places a chemical in an insulated container and measures the temperature. A second chemical is added and the container is sealed and the temperature is monitored. What is the student trying to determine?",
    options: ["How can this reaction be reversed?", "Is heat absorbed or released?", "How much precipitate is formed?", "What color changes can be observed?"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1690",
    recordId: "MCAS_2000_8_32",
    question: "Which is an example of asexual reproduction?",
    options: ["one cell divides into two cells", "a gene in a cell mutates", "two cells unite to form one cell", "egg cells are produced"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1691",
    recordId: "NYSEDREGENTS_2012_8_18",
    question: "The sum of all chemical reactions that take place within an organism is known as",
    options: ["evolution", "metabolism", "reproduction", "circulation"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1692",
    recordId: "NYSEDREGENTS_2013_4_10",
    question: "The appearance of the Moon as observed from Earth changes over time because of the Moon's",
    options: ["length of daylight", "gravity", "path around Earth", "temperature"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1693",
    recordId: "NYSEDREGENTS_2012_8_17",
    question: "The basic life functions of an organism are carried on by",
    options: ["nutrients", "atoms", "cells", "hormones"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1694",
    recordId: "Mercury_7268993",
    question: "What keeps stars such as the Sun from collapsing from their own self-gravity?",
    options: ["the gravitational pull created by orbiting planets", "the centrifugal force created by rapid rotation", "the electrical repulsion of nuclei in the plasma", "the outward pressure created by nuclear fusion"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1695",
    recordId: "Mercury_7210158",
    question: "The increasing use of internal combustion engines could eventually deplete which resource?",
    options: ["wind energy", "solar energy", "petroleum", "uranium"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1696",
    recordId: "Mercury_SC_LBS10266",
    question: "If the results of an experiment do not support the hypothesis, the scientist will most likely do all of the following except",
    options: ["check for errors in the experimental procedure.", "repeat the experiment.", "change data to support the hypothesis.", "ask new questions."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1697",
    recordId: "Mercury_411744",
    question: "Which has the longest wavelength?",
    options: ["green light", "red light", "violet light", "yellow light"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1698",
    recordId: "LEAP_2012_8_10442",
    question: "Which statement best describes how birth and death rates compare in a population at carrying capacity?",
    options: ["The birth rate and the death rate are zero.", "The birth rate is less than the death rate.", "The birth rate is greater than the death rate.", "The birth rate is equal to the death rate."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1699",
    recordId: "MCAS_1999_8_33",
    question: "Your community is planning to build a new sanitary landfill. In locating the landfill, which is the most important environmental consideration?",
    options: ["the accessibility to a major highway", "the cost of the land", "the location of the groundwater", "the proximity to an industrial park"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1700",
    recordId: "ACTAAP_2007_7_34",
    question: "Which is the best conductor of electricity?",
    options: ["wood", "water", "glass", "air"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1701",
    recordId: "Mercury_7216983",
    question: "Students compared the growth rate of the roots of basil plants in three different water solutions. Measurements were recorded every other day for eight weeks. Which unit of measure is most appropriate for this investigation?",
    options: ["centiliters", "liters", "millimeters", "meters"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1702",
    recordId: "Mercury_7137078",
    question: "When placed in a container at room temperature, which substance has a definite volume but takes the shape of the container?",
    options: ["wood", "ice", "water", "copper"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1703",
    recordId: "Mercury_7222145",
    question: "Elements on the right side of the periodic table differ from the elements on the left side in that the elements on the right side",
    options: ["are good electrical conductors.", "are solid at room temperature.", "generally have very high densities.", "tend to form ions by gaining electrons."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1704",
    recordId: "Mercury_7042543",
    question: "Astronomers have found low-energy background radiation in every part of the sky that they have studied. This radiation is taken as evidence of energy remaining from which event?",
    options: ["collisions of galaxies", "modern decay of unstable atoms", "supernovas", "the big bang"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1705",
    recordId: "Mercury_SC_400675",
    question: "A class is studying how gravity affects objects in motion. Which tool would best measure the distance an object travels after it is thrown?",
    options: ["a stop watch", "a calculator", "a meter stick", "a magnetic compass"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1706",
    recordId: "Mercury_LBS10778",
    question: "If the Earth did not tilt on its axis in relation to the sun, which of the following would also be true?",
    options: ["Temperatures at the Earth's equator would cool.", "One Earth-year would be 14% longer.", "The Earth would spin at a different rate.", "There would be no seasons."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1707",
    recordId: "Mercury_7027335",
    question: "In the 20th century, Edwin Hubble deduced from observations that there are galaxies other than the Milky Way. Hubble's observations depended on improvements in a technology first developed by which scientist?",
    options: ["Anton Van Leeuwenhoek", "Democritus", "Galileo Galilei", "Isaac Newton"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1708",
    recordId: "Mercury_7012863",
    question: "What is one of the major advantages of using hydroelectric power?",
    options: ["It uses renewable natural resources.", "It is easily generated in most big cities.", "It can be generated from any area on Earth.", "It does not require special buildings or equipment."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1709",
    recordId: "Mercury_SC_415395",
    question: "What is the difference between magma and lava?",
    options: ["Magma is solid. Lava is liquid.", "Magma comes out of earthquakes. Lava comes out of volcanoes.", "Magma is below ground. Lava is above ground.", "Magma is cool. Lava is hot."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1710",
    recordId: "Mercury_SC_LBS10579",
    question: "Scientists today understand how forces work due to Isaac Newton's study of",
    options: ["gravity.", "atoms.", "magnetism.", "electricity."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1711",
    recordId: "MCAS_2004_5_30",
    question: "On a day in early spring, the number of hours of daylight and of night are about the same. From sunrise to sunset on a spring day, Earth has",
    options: ["been circled by the Moon one time.", "moved to the opposite side of the Sun.", "been in the shadow of the Moon.", "completed half of one rotation."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1712",
    recordId: "MCAS_1999_4_21",
    question: "A marsh in your neighborhood dried up during a long, hot summer. This is most likely to cause which of the following changes in the neighborhood?",
    options: ["an increase in the number of insect-eating birds", "an increase in the number of bats", "a decrease in the number of Japanese beetles", "a decrease in the number of mosquitoes"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1713",
    recordId: "MCAS_2004_8_2",
    question: "In an effort to preserve wildlife on his farm in Massachusetts, a farmer decides to stop using a 10-acre field. The farmer fences off the area, stops cutting the grass, and stops allowing livestock to graze on it. After twenty years, the area would most likely",
    options: ["be barren due to lack of maintenance.", "be grown over with bushes and small trees.", "be a mature hardwood forest.", "be covered with moss and rocks."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1714",
    recordId: "Mercury_SC_407690",
    question: "Penny's class was learning how rapidly some changes can happen on Earth. Which event causes the fastest change to the surface of Earth?",
    options: ["an earthquake cracking a road", "a wave crashing on a beach", "wind blowing against a mountain", "water flowing in a riverbed"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1715",
    recordId: "Mercury_7148155",
    question: "Air that travels away from the equator fails to maintain a straight path. The path of the air is deflected to the right in the Northern Hemisphere and to the left in the Southern Hemisphere. The apparent deflection of air to either the right or left is known as the Coriolis Effect. Which factor produces the Coriolis Effect?",
    options: ["the rotation of Earth", "the revolution of Earth", "the gravity of Earth", "the axial tilt of Earth"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1716",
    recordId: "MCAS_1999_8_32",
    question: "When coal is burned to produce electricity, the electrical energy produced is less than the potential energy in the coal. Which best explains this observation?",
    options: ["Some of the energy in coal is destroyed by the intense heat required to release its potential energy.", "As coal is heated, some of the molecules move so fast that they are destroyed.", "Some of the potential energy in coal is converted into forms of energy other than electricity.", "The amount of potential energy in fuels is overestimated."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1717",
    recordId: "Mercury_7032480",
    question: "When a person's arm touches something hot, the muscles in the arm react to pull the arm away. Which body system alerts the muscles to react?",
    options: ["Nervous", "Circulatory", "Digestive", "Respiratory"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1718",
    recordId: "Mercury_7041265",
    question: "Two chemicals are mixed in a test tube and a chemical reaction takes place. If this reaction is endothermic and the test tube is touched, which of the following best describes what is felt?",
    options: ["The test tube is warm.", "The test tube is cold.", "The test tube is the same temperature as the air.", "The test tube is very hot."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1719",
    recordId: "Mercury_7001208",
    question: "The width of a pencil lead is most accurately measured in",
    options: ["millimeters.", "inches.", "feet.", "meters."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1720",
    recordId: "Mercury_416643",
    question: "Which organism is able to work together with other cells of its species?",
    options: ["paramecium", "amoeba", "euglena", "volvox"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1721",
    recordId: "TAKS_2009_5_1",
    question: "Which of the following items is necessary in a laboratory for safety purposes?",
    options: ["Triple-beam balance", "Computer monitor", "Fire extinguisher", "Metric ruler"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1722",
    recordId: "Mercury_SC_402261",
    question: "Which type of energy is carried through a metal cable?",
    options: ["light", "nuclear", "chemical", "electrical"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1723",
    recordId: "MDSA_2009_8_36",
    question: "Glaciers cover about 10% of the total land area on Earth. The role of glaciers in the water cycle is to",
    options: ["filter salt water", "precipitate solid water", "move liquid water", "store fresh water"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1724",
    recordId: "Mercury_7017955",
    question: "The density of a material can be measured by using a",
    options: ["meter stick and test tubes.", "balance and graduated cylinder.", "thermometer and computer probes.", "beaker and stopwatch."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1725",
    recordId: "Mercury_178815",
    question: "Which of the following describes diffraction?",
    options: ["the bouncing back of waves as they meet a surface", "the bending of waves as they pass an edge or an opening", "the combining of two waves that meet at a point", "the bending of waves as they pass from one medium to another"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1726",
    recordId: "Mercury_405875",
    question: "What is one way in which workplace automation can have a negative effect on society?",
    options: ["producing manufactured objects at a faster rate", "reducing the number of job-related injuries", "decreasing the availability of manufactured products", "displacing skilled workers from manufacturing jobs"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1727",
    recordId: "ACTAAP_2012_7_14",
    question: "Which layer of the atmosphere contains about 75% of the gasses and almost all of the water vapor?",
    options: ["thermosphere", "mesosphere", "stratosphere", "troposphere"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1728",
    recordId: "Mercury_7005093",
    question: "India was once its own continent. According to the theory of continental drift, India has collided with and become part of the continent of Asia. This caused",
    options: ["glaciers in the area to melt.", "large mountain ranges to form.", "deserts in the area to become fertile.", "deep mid-ocean trenches to develop."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1729",
    recordId: "TIMSS_2011_4_pg24",
    question: "Why are many desert animals more active at night?",
    options: ["There is less wind at night.", "It is cooler at night.", "It is drier at night.", "There is less danger at night."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1730",
    recordId: "Mercury_7056490",
    question: "If the Earth rotated in the opposite direction, what would most likely occur?",
    options: ["The phases of the Moon would last longer.", "The Sun would rise in the west.", "There would be more days in each year.", "The seasons would be reversed."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1731",
    recordId: "Mercury_SC_401673",
    question: "A student uses a fan and a box of sand to model the formation of sand dunes. This model shows the effect of which natural factor on the landscape?",
    options: ["water", "wind", "temperature", "gravity"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1732",
    recordId: "Mercury_SC_408556",
    question: "Evan is performing an investigation. Before conducting his investigation, what must Evan do?",
    options: ["record his observations", "organize the data", "develop a hypothesis", "reach a conclusion"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1733",
    recordId: "Mercury_7008908",
    question: "When a skydiver jumps from a plane, the open parachute will increase the air resistance by",
    options: ["decreasing mass.", "reducing fluid friction.", "increasing surface area.", "increasing terminal velocity."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1734",
    recordId: "TIMSS_2003_8_pg42",
    question: "If you took all of the atoms out of a chair, what would be left?",
    options: ["There would be nothing left of the chair.", "Only a pool of liquid would be left on the floor.", "The chair would be exactly the same as it was before.", "The chair would still be there, but it would weigh less."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1735",
    recordId: "TAKS_2009_5_18",
    question: "Which of these is the center of our solar system?",
    options: ["The moon", "The sun", "Jupiter", "Mars"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1736",
    recordId: "VASoL_2009_5_8",
    question: "Which of these best describes the Moon?",
    options: ["Older than Earth", "Having the same atmosphere as Earth", "Having the same climate as Earth", "Smaller than Earth"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1737",
    recordId: "Mercury_7008103",
    question: "The color of a star indicates its",
    options: ["volume.", "temperature.", "distance.", "speed."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1738",
    recordId: "NYSEDREGENTS_2015_4_28",
    question: "Which type of organism helps return nutrients from dead plants and animals to the soil?",
    options: ["predator", "producer", "decomposer", "prey"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1739",
    recordId: "MEAP_2005_8_31",
    question: "When mining for coal, a mining company removes the plants and layers of soil and rock above the coal deposit, and takes the coal. When the operation is complete, the mining company returns soil and rock, covers it with a layer of topsoil, and plants trees and grass. The trees and grass help to",
    options: ["prevent a collapse of the underlying sediment.", "increase water absorption by the replaced sediments.", "reduce soil erosion and provide new habitat for animals.", "limit the types of pollutants that can enter the soil."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1740",
    recordId: "Mercury_401583",
    question: "A model of an atom includes red marbles for electrons, green marbles for protons, and blue marbles for neutrons. All marbles have a radius of 2 cm. How could the model be changed to represent more properties of an atom?",
    options: ["by switching the colors of the marbles", "by using two differently colored marbles for protons", "by using two marbles to represent each neutron", "by using smaller marbles to represent electrons"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1741",
    recordId: "Mercury_177188",
    question: "The smallest particle of matter that can be identified as an element is called",
    options: ["a molecule.", "an electron.", "a proton.", "an atom."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1742",
    recordId: "Mercury_SC_414356",
    question: "How are the life cycles of a ladybug and a frog similar?",
    options: ["Both life cycles have a pupa stage.", "The young hatch from eggs in both cycles.", "Both life cycles begin in a water habitat.", "The young look like the adults in both cycles."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1743",
    recordId: "Mercury_416539",
    question: "The empty spaces in a material are called pores. Porosity is the amount of empty space within a material. Permeability describes how well the pores in a material are connected. Which of these materials would make the most effective aquifer?",
    options: ["a material that has high porosity and high permeability", "a material that has low porosity and low permeability", "a material that has low porosity and high permeability", "a material that has high porosity and low permeability"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1744",
    recordId: "Mercury_SC_LBS10276",
    question: "Why do we see different stars in the sky at different times of the year?",
    options: ["The Moon is revolving around Earth.", "The stars are revolving around Earth.", "The stars are revolving around the Sun.", "Earth is revolving around the Sun."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1745",
    recordId: "Mercury_7092243",
    question: "Which of these will most likely occur if chemicals from fertilizers run off into lakes and streams?",
    options: ["Water quality will improve.", "Fish will die from a lack of oxygen.", "Aquatic animals will thrive.", "Aquatic plants will stop growing."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1746",
    recordId: "Mercury_7085313",
    question: "A student identifies a soil sample as \"very gritty.\" What characteristic of the soil did the student describe?",
    options: ["organic content", "hardness", "texture", "water retention"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1747",
    recordId: "VASoL_2009_5_23",
    question: "When a tree is dormant, the tree is",
    options: ["growing its leaves", "dying", "inactive", "growing taller"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1748",
    recordId: "Mercury_7083790",
    question: "The charge of the nucleus of an atom is due to the presence of",
    options: ["positive protons.", "negative neutrons.", "positive protons and negative neutrons.", "negative protons and positive electrons."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1749",
    recordId: "NYSEDREGENTS_2015_8_26",
    question: "Earth's hydrosphere is a layer of",
    options: ["lava", "air", "water", "rock"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1750",
    recordId: "Mercury_7171763",
    question: "Riding a bicycle produces several forms of energy. Which form of energy is produced in the greatest amount by pedaling a bicycle down the sidewalk?",
    options: ["sound", "radiant", "chemical", "kinetic"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1751",
    recordId: "Mercury_SC_400001",
    question: "Which part of a dandelion plant takes in minerals and water?",
    options: ["stem", "root", "flower", "leaf"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1752",
    recordId: "MDSA_2008_5_23",
    question: "Many natural resources are found in Maryland and the surrounding area. Some of these natural resources are renewable and some are nonrenewable. People use both kinds of resources in daily activities. Using natural resources often produces waste products. Which of these natural resources found in Maryland is nonrenewable?",
    options: ["coal", "water", "wood", "soil"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1753",
    recordId: "Mercury_416374",
    question: "Which surgery is most like the way a transgenic organism is made?",
    options: ["Hector receives a replacement heart valve from a cow.", "Kwan receives a pacemaker to regulate his heartbeat.", "Adelle receives an artificial hip to ease her arthritis.", "Denise receives a kidney donated by her identical twin."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1754",
    recordId: "MDSA_2008_8_25",
    question: "Use the information to answer the question. Over the last 150 years, the use of fossil fuels has increased, resulting in more carbon dioxide and other greenhouse gases in the atmosphere. Some scientists think that these atmospheric gases will result in global warming. Scientists have recorded data on global temperature changes and have predicted possible changes in sea level that may affect Maryland residents. Using fossil fuels in the United States will most likely contribute to rising sea levels globally by",
    options: ["decreasing carbon dioxide levels", "increasing oxygen levels", "decreasing oxygen levels", "increasing carbon dioxide levels"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1755",
    recordId: "MCAS_2004_5_36",
    question: "Clouds are formed from tiny drops of water that are light enough to float in the air. As these drops bump into each other, they form larger drops. What happens when these drops become too heavy to float in the air?",
    options: ["The drops become air.", "The drops fall as rain.", "The drops evaporate.", "The drops form fog."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1756",
    recordId: "Mercury_SC_400125",
    question: "The shape of a riverbed changes over time as a result of which gradual process?",
    options: ["compaction", "dissolving", "erosion", "plate shifting"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1757",
    recordId: "TIMSS_1995_8_Q11",
    question: "Which statement explains why daylight and darkness occur on Earth?",
    options: ["The Earth's axis is tilted.", "The Earth revolves around the Sun.", "The Sun rotates on its axis.", "The Earth rotates on its axis."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1758",
    recordId: "NYSEDREGENTS_2015_4_14",
    question: "Which force causes a soccer ball to fall to the ground after it has been kicked up in the air?",
    options: ["friction", "magnetism", "erosion", "gravity"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1759",
    recordId: "Mercury_7245123",
    question: "Which event will occur in an area after a major flood?",
    options: ["a decrease in the number of native plants", "a decrease in the erosion of riverbanks", "an increase in the number of animal habitats", "an increase in the diversity of insect species"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1760",
    recordId: "MCAS_2000_8_37",
    question: "What type of force keeps the planets orbiting the Sun?",
    options: ["gravitational", "magnetic", "nuclear", "electrical"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1761",
    recordId: "TIMSS_1995_8_J8",
    question: "Which gas could cause a glowing splint to burst into flame?",
    options: ["Oxygen", "Neon", "Carbon dioxide", "Nitrogen"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1762",
    recordId: "Mercury_7268765",
    question: "Dr. Wagner is investigating a newly discovered, disease-causing agent. She determines that one structure in the agent is double-stranded RNA. What kind of agent is Dr. Wagner studying?",
    options: ["a bacterium", "a virus", "a protist", "a fungus"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1763",
    recordId: "Mercury_7248290",
    question: "Which activity is an important function of nucleases?",
    options: ["dissolving the nuclear membrane during mitosis", "concentrating RNA into a nucleolus", "repairing the double strand of DNA", "maintaining homeostasis of nucleoplasm"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1764",
    recordId: "Mercury_406741",
    question: "Which best explains why it is important for a doctor's office to keep accurate records of the medicines prescribed for their patients?",
    options: ["to keep track of the next scheduled appointments", "to know if there is a risk for harmful side effects", "to keep track of all of the people who are sick", "to know how many people take medicines"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1765",
    recordId: "Mercury_SC_401123",
    question: "When light hits a mirror, most of the light is",
    options: ["reflected.", "refracted.", "absorbed.", "transmitted."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1766",
    recordId: "MCAS_1998_8_22",
    question: "A plant scientist is developing a new fertilizer called Hypergrow. She designs an experiment to test whether Hypergrow helps plants grow faster than Supergrow, a fertilizer already on the market. Which of the following should the scientist do with light during the experiment?",
    options: ["Flash the lights to simulate a partly cloudy day.", "Apply the same amount of light to all the plants.", "Apply only green light to all the plants.", "Keep the plants in darkness."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1767",
    recordId: "Mercury_401187",
    question: "The boiling point of water in degrees Celsius is",
    options: ["212°C.", "100°C.", "0°C.", "32°C."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1768",
    recordId: "MCAS_2009_5_6512",
    question: "A student sorted mineral samples into two groups: dull and shiny. Which of the following properties did the student use to sort the mineral samples into groups?",
    options: ["color", "cleavage", "streak", "luster"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1769",
    recordId: "Mercury_406779",
    question: "A 13-year-old boy has blue eyes. Which statement concerning his eye color is correct?",
    options: ["It is a result of asexual reproduction.", "It is a result of childhood nutrition.", "It is an inherited characteristic.", "It is a personal choice."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1770",
    recordId: "Mercury_7093083",
    question: "Radioactive waste from nuclear power plants is sealed in containers and deeply buried in the ground. Sealing and burying waste reduces the chances that water will become contaminated. At which point in the water cycle would radioactive contamination most likely be found?",
    options: ["rain", "fog", "groundwater", "surface water"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1771",
    recordId: "MSA_2012_8_9",
    question: "The early Greeks are credited with many valid concepts in astronomy. Some of their theories were correct; some were later proven incorrect. One theory was that Earth was the center of the universe and that other planets circled Earth. The Greeks thought Earth did not move because its movement was not obvious from the surface of the planet. The Greeks also believed that an invisible sphere surrounding our planet contained the stars. This sphere rotated, explaining the apparent movement of constellations over time. Early Greeks also developed theories about the relationship between the moon and Earth. Why is the same side of the moon always visible from Earth?",
    options: ["The moon stays in one location while Earth revolves around it.", "The moon rotates clockwise on its axis while Earth rotates counterclockwise on its axis.", "The period of rotation and the period of revolution for the moon are about the same.", "The far side of the moon does not reflect sunlight."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1772",
    recordId: "Mercury_403681",
    question: "Sodium chloride (NaCl) is formed in a chemical reaction between sodium (Na) and chlorine (Cl_{2}). What is sodium chloride?",
    options: ["an element", "a mixture", "a compound", "an atom"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1773",
    recordId: "Mercury_184380",
    question: "Which group of organisms is most responsible for changing the composition of Earth's early atmosphere?",
    options: ["fungi", "reptiles", "algae", "angiosperms"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1774",
    recordId: "NCEOGA_2013_5_39",
    question: "A litter of kittens have traits that are similar to both the mother cat and the father cat. Which best explains this situation?",
    options: ["The kittens are kept at the same temperatures by their mother when they are first born.", "The kittens inherit some of their traits from their mother and some from their father.", "The kittens are provided the same kind of milk from their mother as they grow.", "The kittens are taught by their parents to have similar traits."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1775",
    recordId: "Mercury_SC_409053",
    question: "Jessica is making fruit punch for her friends. She pours the powder into a container with sugar and water. Which of these best describes what happens to the sugar?",
    options: ["It expands.", "It dissolves.", "It condenses.", "It evaporates."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1776",
    recordId: "Mercury_7017885",
    question: "The motion of atoms and molecules in a substance is",
    options: ["electromagnetic energy.", "mechanical energy.", "chemical energy.", "thermal energy."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1777",
    recordId: "Mercury_7246365",
    question: "Which features form when magma emerges between two diverging oceanic plates?",
    options: ["mid-ocean ridges", "fault boundaries", "composite volcanoes", "ocean trenches"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1778",
    recordId: "Mercury_7239698",
    question: "Research has shown that specialization of stem cells into specific cell types results, in part, from cell shape. What provides a specialized cell with its shape?",
    options: ["number of mitochondria", "structure of the cytoskeleton", "salt concentration of cytoplasm", "presence of a nucleus"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1779",
    recordId: "Mercury_SC_408857",
    question: "Nicole is learning about the characteristics of different vertebrates. Which is a common characteristic of mammals?",
    options: ["They all live on land.", "They all have hair or fur.", "They are all good swimmers.", "They all live in warm climates."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1780",
    recordId: "NYSEDREGENTS_2012_4_22",
    question: "Which two processes are common to all living things?",
    options: ["using nutrients and growing", "flying and breathing", "eliminating waste and hibernating", "migrating and reproducing"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1781",
    recordId: "Mercury_7172865",
    question: "Acid rain can damage limestone buildings and marble statues. It can also harm organisms living in ponds and other ecosystems. Which pollutant in the atmosphere causes most of the acid rain?",
    options: ["fluorocarbons from aerosol spray cans", "sulfur dioxide from burning fossil fuels", "nitrous oxide from volcanic eruptions", "soil particles from the use of farm equipment"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1782",
    recordId: "Mercury_SC_415363",
    question: "Ospreys are birds that eat fish. Where would an osprey most likely live?",
    options: ["near a forest", "near a desert", "near a prairie", "near a marsh"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1783",
    recordId: "Mercury_7085418",
    question: "Which of these best describes wind energy?",
    options: ["inexpensive", "damaging", "renewable", "limited"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1784",
    recordId: "MCAS_8_2015_13",
    question: "Euglena is a single-celled photosynthetic organism. Clover is a multicellular green plant. Which of the following activities is carried out by both euglena and clover?",
    options: ["moving nutrients to specialized tissues", "transmitting impulses along nerve pathways", "producing sex cells for reproduction", "using light energy to produce sugar"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1785",
    recordId: "AKDE&ED_2008_4_39",
    question: "A glass of ice water is placed on a table. After 10 minutes, there are drops of water on the outside surface of the glass. Which change in phase caused the drops of water?",
    options: ["Water vapor from the air condensed into a liquid.", "Liquid water in the air condensed into a solid.", "Water vapor from the air evaporated into a liquid.", "Liquid water in the air evaporated into a gas."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1786",
    recordId: "ACTAAP_2010_7_8",
    question: "The list below gives some symptoms of people with the common cold. Symptoms of the Common Cold stuffy nose low fever sore throat cough Which body system is most affected by the common cold?",
    options: ["Circulatory", "Digestive", "Respiratory", "Nervous"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1787",
    recordId: "Mercury_SC_401648",
    question: "The formation of the Grand Canyon has most likely taken how long?",
    options: ["thousands of years", "several years", "millions of years", "hundreds of years"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1788",
    recordId: "NYSEDREGENTS_2012_8_11",
    question: "Which health condition is an infectious disease?",
    options: ["heart problem caused by a high-fat diet", "eye damage caused by ultraviolet light", "pneumonia caused by microorganisms", "lung cancer caused by smoking"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1789",
    recordId: "Mercury_7216615",
    question: "Which statement describes a characteristic of both sexual and asexual reproduction?",
    options: ["The processes require egg cells.", "New cells are produced.", "The processes produce genetically unique offspring.", "Two parents are required."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1790",
    recordId: "LEAP_2003_8_10394",
    question: "Which activity is most likely to add pollutants to the environment?",
    options: ["burning leaves", "installing a wooden fence", "watering a garden", "pulling weeds from a lawn"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1791",
    recordId: "Mercury_7216090",
    question: "Which is the best example of a parasitic relationship?",
    options: ["a polar bear hunting a seal for food", "a woodpecker nesting in a cavity of a dead tree", "a hummingbird transferring pollen between flowers", "a tapeworm absorbing food in the digestive tract of a wolf"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1792",
    recordId: "Mercury_405452",
    question: "What is a benefit of using technology, such as robotics, in manufacturing?",
    options: ["increased number of design flaws", "increased number of manual-labor jobs", "decreased productivity", "decreased production cost"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1793",
    recordId: "MCAS_8_2015_8",
    question: "Warm air masses that rise over Earth's equator move north or south. This movement is primarily the result of which of the following processes?",
    options: ["insulation", "conduction", "convection", "radiation"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1794",
    recordId: "Mercury_SC_401780",
    question: "A new moon occurs about every",
    options: ["year.", "week.", "day.", "month."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1795",
    recordId: "Mercury_7262850",
    question: "Which statement is true?",
    options: ["All animals are multicellular heterotrophs.", "All animals are single-celled heterotrophs.", "All fungi are multicellular heterotrophs.", "All fungi are single-celled heterotrophs."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1796",
    recordId: "MDSA_2009_4_24",
    question: "A leaf is covered in mud during a landslide. After one million years, this leaf will most likely be ___.",
    options: ["a new plant species", "an animal species", "a nonrenewable fuel", "a fossil"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1797",
    recordId: "Mercury_7004638",
    question: "A certain snake species in an ecosystem eats small rodents. If a bird species is introduced into the ecosystem that also eats small rodents, which of these will most likely increase?",
    options: ["parasitism", "competition", "mutualism", "migration"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1798",
    recordId: "Mercury_7124355",
    question: "Which characteristic would a scientist most likely maintain throughout an investigation?",
    options: ["focus on completing research first", "focus on formulating conclusions", "sharing limited research", "being open to new ideas"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1799",
    recordId: "Mercury_SC_416530",
    question: "Plant cells use special parts to capture sunlight. The parts use the sunlight to make food. Where will you find the most of these parts in a plant?",
    options: ["stems", "roots", "leaves", "flowers"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1800",
    recordId: "MCAS_2000_8_36",
    question: "Which is the best example of something that has kinetic energy?",
    options: ["a rock sitting at the top of a steep hill", "a tennis ball rolling across the court", "a picture hanging on the wall", "a piece of wood before it is burned"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1801",
    recordId: "MCAS_2010_5_11995",
    question: "Corals are small marine organisms that live in groups and make hard outer skeletons to protect their bodies. Over time, these outer skeletons can build up to make large coral reefs. Which of the following statements best describes one way the formation of a coral reef changes the ocean ecosystem?",
    options: ["It makes the ocean water saltier.", "It creates a habitat for some ocean animals.", "It removes sand from the ocean floor.", "It causes ocean waves to become stronger."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1802",
    recordId: "NYSEDREGENTS_2008_4_8",
    question: "A magnet and a metal paper clip have the strongest magnetic attraction when the distance between them is",
    options: ["4 centimeters", "12 centimeters", "8 centimeters", "16 centimeters"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1803",
    recordId: "Mercury_7103320",
    question: "High average daily temperature and heavy annual precipitation are found in a",
    options: ["desert.", "grassland.", "tundra.", "rainforest."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1804",
    recordId: "Mercury_7134803",
    question: "Computers have devices called heat sinks designed to lower the temperature of a computer by scattering produced heat into the surrounding area. Which type of energy is kept away from a computer by a heat sink?",
    options: ["nuclear", "thermal", "chemical", "electrical"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1805",
    recordId: "MCAS_2004_9_21",
    question: "In the first step of making some ceramic cups, the following manufacturing process is used. Liquid clay is poured into a mold, allowed to solidify, then removed from the mold. What is the name of this manufacturing process?",
    options: ["finishing", "milling", "refining", "casting"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1806",
    recordId: "Mercury_SC_409038",
    question: "The first telescopes were invented hundreds of years ago. Which was discovered as a result of this invention?",
    options: ["the bacteria that causes disease", "the parts of a plant that perform photosynthesis", "the deep-sea trenches in the ocean", "the moons of Jupiter"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1807",
    recordId: "ACTAAP_2014_5_15",
    question: "Which of these best demonstrates the characteristics of science?",
    options: ["Two students study a rock and then compare their observations.", "One student lifts a rock and skips it across a stream.", "Two students remove rocks from a garden and then plant flowers.", "One student thinks about rocks and writes down his opinion."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1808",
    recordId: "Mercury_7216860",
    question: "Which type of tissue functions to move the bones?",
    options: ["brain", "skin", "blood", "muscle"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1809",
    recordId: "Mercury_415689",
    question: "What process in the atmosphere protects people from the ultraviolet rays in sunlight?",
    options: ["Carbon dioxide blocks ultraviolet light.", "Water vapor scatters ultraviolet light.", "Ozone absorbs ultraviolet light.", "Nitrogen reflects ultraviolet light."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1810",
    recordId: "NCEOGA_2013_5_32",
    question: "Which statement best describes a bacterial cell?",
    options: ["It is a complete organism.", "It is part of a larger organism.", "It contains more than one cell.", "It contains different kinds of cells."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1811",
    recordId: "Mercury_7082653",
    question: "Visible light in the electromagnetic spectrum",
    options: ["is a narrow band within the spectrum.", "is a broad band within the spectrum.", "makes up 50 percent of the spectrum.", "makes up more than 75 percent of the spectrum."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1812",
    recordId: "MCAS_2006_8_21",
    question: "Which of the following is the best example of a part of the propulsion system of a tractor?",
    options: ["engine", "hood", "steering wheel", "front headlight"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1813",
    recordId: "Mercury_SC_LBS11012",
    question: "A homeowner wants to use a renewable source of energy to heat the home. Which of these would be the best to use?",
    options: ["gas", "coal", "solar", "oil"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1814",
    recordId: "Mercury_7094465",
    question: "How do sprouting plants exhibit positive gravitropism?",
    options: ["The roots move horizontally.", "The stems curl around supports.", "The roots turn downward.", "The leaves face toward the Sun."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1815",
    recordId: "MCAS_2002_5_7",
    question: "A student picked up a small rock using a magnet. The rock probably contained",
    options: ["iron.", "quartz.", "diamond.", "aluminum."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1816",
    recordId: "NYSEDREGENTS_2008_8_14",
    question: "Grasses, shrubs, and trees are called producers because they make",
    options: ["minerals", "food", "carbon dioxide", "water"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1817",
    recordId: "Mercury_7016695",
    question: "How does the buying and selling of a popular species of rainforest animal as pets have a negative effect on the rainforest ecosystem?",
    options: ["The number of symbiotic relationships increases.", "The rate of photosynthesis may decrease.", "It could lead to the potential extinction of those animals.", "There is a probability of genetic variability."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1818",
    recordId: "Mercury_SC_407288",
    question: "Plants that can live in sandy soils most likely have the ability to withstand",
    options: ["fires.", "cold temperatures.", "dry conditions.", "salt."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1819",
    recordId: "Mercury_7001453",
    question: "Which characteristic of an element determines its placement in the periodic table?",
    options: ["number of neutrons", "number of protons", "mass", "size"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1820",
    recordId: "Mercury_404153",
    question: "Approximately what percentage of the electromagnetic spectrum is visible light?",
    options: ["more than 75%", "50%", "less than 10%", "25%"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1821",
    recordId: "MCAS_2005_9_11",
    question: "Two boxes, A and B, both contain the same number of nitrogen gas molecules. The gas molecules in box A have twice the average speed of the molecules in box B. Which of the following best describes the nitrogen gas in box A?",
    options: ["The nitrogen gas in box A has a greater specific gravity than the nitrogen gas in box B.", "The nitrogen gas in box A has a greater density than the nitrogen gas in box B.", "The nitrogen gas in box A has a greater mass than the nitrogen gas in box B.", "The nitrogen gas in box A has a greater temperature than the nitrogen gas in box B."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1822",
    recordId: "Mercury_SC_405200",
    question: "People use many tools to help measure changes. Which person is measuring a change?",
    options: ["A sports player scores a goal.", "A friend watches a television show.", "A nurse checks the temperature of a patient.", "A scientist gives a weather report."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1823",
    recordId: "Mercury_7268783",
    question: "Human Immunodeficiency Virus (HIV) infects the cells that coordinate the human immune response. When these cells are killed or compromised, the body cannot effectively protect itself from infection. Which cells does HIV infect?",
    options: ["natural killer T cells", "cytotoxic T cells", "regulatory T cells", "helper T cells"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1824",
    recordId: "NYSEDREGENTS_2015_4_18",
    question: "Which trait can children inherit from their parents?",
    options: ["broken arm", "long hair", "favorite color", "brown eyes"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1825",
    recordId: "Mercury_407129",
    question: "Which tool would be best for students to use to observe and measure plant cells?",
    options: ["microscope", "hand lens", "metric ruler", "triple-beam balance"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1826",
    recordId: "VASoL_2008_3_30",
    question: "For a plant to stay alive indoors, where does it need to be placed?",
    options: ["In a dry area", "On a plant stand", "In a dark room", "Near a sunny place"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1827",
    recordId: "Mercury_190803",
    question: "Which type of adaptation allows an animal to deceive its predator?",
    options: ["large size", "leathery skin", "protective coloration", "scent glands"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1828",
    recordId: "ACTAAP_2007_7_35",
    question: "Which occurs as a result of the rotation of Earth about its own axis?",
    options: ["seasons of the year", "sunrises and sunsets", "global climate changes", "the water cycle"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1829",
    recordId: "Mercury_7186130",
    question: "Theresa studied different forms of energy. Which is the best way of expressing the amount of mechanical energy exerted by a force?",
    options: ["kilocalories", "foot-pounds per second", "newton-meters", "kilowatts"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1830",
    recordId: "Mercury_SC_400526",
    question: "The water cycle includes which processes?",
    options: ["metamorphosis, evaporation, respiration", "precipitation, perspiration, mitosis", "fixation, decomposition, respiration", "evaporation, condensation, precipitation"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1831",
    recordId: "TIMSS_2003_4_pg13",
    question: "Which plant is grown for food?",
    options: ["Cotton", "Tobacco", "Orchid", "Rice"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1832",
    recordId: "Mercury_7239715",
    question: "Which cell function is most directly dependent on the cytoskeleton?",
    options: ["direction of cellular activity", "transport of material inside the cell", "response of the cell to external pathogens", "storage of energy in stable long-term forms"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1833",
    recordId: "Mercury_SC_LBS10269",
    question: "When birds fly south for the winter, they are exhibiting",
    options: ["learned behavior.", "instinctive behavior.", "mimicry.", "courtship."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1834",
    recordId: "Mercury_SC_406793",
    question: "When a plane flies, it travels through air that contains gases, liquids, and solids. This area is best described as the",
    options: ["biosphere.", "hydrosphere.", "lithosphere.", "atmosphere."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1835",
    recordId: "NCEOGA_2013_5_18",
    question: "How would the woodpecker population in a forest area most likely be affected if a housing development is built in that area?",
    options: ["They would change the color of their feathers.", "They would experience a decrease in competition.", "They would produce more offspring.", "They would experience a decrease in available food."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1836",
    recordId: "Mercury_SC_416521",
    question: "Where is water most likely to be brackish?",
    options: ["river", "estuary", "sea", "lake"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1837",
    recordId: "Mercury_7026618",
    question: "The amount of elements heavier than hydrogen is constantly increasing in the universe. Which best identifies the bodies in which this change is taking place?",
    options: ["planets", "stars", "solar systems", "galaxies"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1838",
    recordId: "Mercury_7228113",
    question: "The discovery of a fossilized animal with teeth, a long bony tail, and feathered wings helped to establish which evolutionary sequence?",
    options: ["invertebrates to flying organisms", "rodents to bats", "aquatic organisms to land-based organisms", "reptiles to birds"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1839",
    recordId: "Mercury_176558",
    question: "What does the mechanical energy of a system include?",
    options: ["the difference of the potential and kinetic energy", "only the potential energy", "only the kinetic energy", "the sum of the potential and kinetic energy"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1840",
    recordId: "Mercury_SC_408424",
    question: "On a class field trip, Zach took a walk through the woods using his senses. Zach made observations on the different sights, smells, and sounds in the woods. What system transferred the observations from his senses to his brain?",
    options: ["nervous system", "digestive system", "circulatory system", "respiratory system"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1841",
    recordId: "Mercury_7166390",
    question: "Louis was investigating physical and chemical changes in matter. Which of these changes that Louis found involves a chemical change in matter?",
    options: ["rusting of iron", "grinding of rock", "melting of ice", "evaporation of water"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1842",
    recordId: "NYSEDREGENTS_2010_4_2",
    question: "A ball is thrown up into the air. Which force causes the ball to fall to the ground?",
    options: ["electricity", "magnetism", "gravity", "friction"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1843",
    recordId: "Mercury_SC_406709",
    question: "An octopus releases black ink into the water when feeling threatened. What does this most likely help an octopus do?",
    options: ["hunt for food", "escape enemies", "swim faster", "find shelter"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1844",
    recordId: "Mercury_7218243",
    question: "Which method would be best for scientists to use to determine the absolute age of a Precambrian igneous rock?",
    options: ["law of superposition", "index fossils", "law of original horizontality", "radiometric dating"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1845",
    recordId: "Mercury_189980",
    question: "A mouse's rate of carbon dioxide output increased. Which of the following most likely happened?",
    options: ["The mouse ate some food.", "The mouse detected an odor.", "The mouse started running.", "The mouse went to sleep."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1846",
    recordId: "Mercury_SC_405074",
    question: "Deer are plants-eaters. A winter storm kills many of the plants deer eat. The storm will most likely result in the deer",
    options: ["feeding on meat.", "traveling in a herd.", "becoming thin.", "shedding a lot of fur."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1847",
    recordId: "Mercury_406917",
    question: "Students measured the elevation changes in a large park near their school. Which of the following would be the best way to report their findings?",
    options: ["topographic map", "spreadsheet data table", "line graph", "color-coded chart"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1848",
    recordId: "MCAS_2004_9_6-v1",
    question: "Which of the following is the best example of a wave?",
    options: ["a grasshopper jumping up and down occasionally", "a stone rolling downhill", "a string vibrating on a guitar", "a vehicle traveling on a bumpy road"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1849",
    recordId: "Mercury_SC_408578",
    question: "Louisa needs to demonstrate a solution to her class. Which is the best example of a solution?",
    options: ["melting butter", "stirring salt into water", "mixing salt and pepper", "melting an ice cube"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1850",
    recordId: "Mercury_SC_407195",
    question: "Which action would most likely reduce air pollution caused by cars?",
    options: ["purchase a larger car", "use smaller tires", "drive a longer route", "take fewer car trips"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1851",
    recordId: "Mercury_SC_402054",
    question: "How is a telephone able to transmit sound?",
    options: ["It converts vibrations to electrical signals.", "It conducts vibrations from speaker to receiver.", "It magnifies a person's voice.", "It carries the sounds through wires."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1852",
    recordId: "Mercury_7175770",
    question: "Which cellular structure in an animal cell helps maintain homeostasis by controlling the transportation of substances into and out of the cell?",
    options: ["vacuole", "mitochondrion", "cell membrane", "cell wall"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1853",
    recordId: "Mercury_SC_LBS10267",
    question: "Which of the following was invented by Benjamin Franklin?",
    options: ["bifocal lens", "telephone", "telescope lens", "camera"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1854",
    recordId: "MCAS_2000_8_9",
    question: "The engine of an automobile is part of which type of system?",
    options: ["control", "guidance", "structure", "propulsion"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1855",
    recordId: "Mercury_404101",
    question: "Which event most likely takes place as the result of crustal movement along transform boundaries?",
    options: ["trenches", "earthquakes", "mountain building", "volcanic activity"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1856",
    recordId: "NYSEDREGENTS_2010_4_25",
    question: "The function of a plant's roots is to take in",
    options: ["nutrients and soil", "light and air", "light and water", "nutrients and water"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1857",
    recordId: "Mercury_7092365",
    question: "The theory of plate tectonics provides the current explanation for the way in which",
    options: ["stars change.", "rocks are formed.", "tides are produced.", "continents move."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1858",
    recordId: "ACTAAP_2013_5_4",
    question: "An organism eats grass and is preyed upon by a carnivore. Which categories describe this organism?",
    options: ["producer and consumer", "decomposer and producer", "herbivore and decomposer", "consumer and herbivore"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1859",
    recordId: "TIMSS_2007_8_pg85",
    question: "Which substance is necessary for burning to take place?",
    options: ["ozone", "oxygen", "carbon dioxide", "hydrogen"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1860",
    recordId: "Mercury_SC_415369",
    question: "Moths undergo complete metamorphosis. Which stages does a moth's life cycle include?",
    options: ["egg, nymph, and pupa", "egg, larva, and pupa", "nymph, larva, and pupa", "nymph, egg, and larva"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1861",
    recordId: "Mercury_400332",
    question: "In humans, a V-shaped hairline is dominant over a straight hairline. If one parent is homozygous for a V-shaped hairline ( HH ) while the other parent is homozygous for a straight hairline ( hh ), what is the probability that the offspring of these parents will have a straight hairline?",
    options: ["100%", "75%", "0%", "50%"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1862",
    recordId: "Mercury_178535",
    question: "Where would electrons most likely be located in an atom?",
    options: ["with the quarks", "near the protons", "outside the nucleus", "with the neutrons"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1863",
    recordId: "Mercury_7013370",
    question: "Spring tides occur during which lunar phases?",
    options: ["full moon and new moon", "when the moon is waning", "when the moon is waxing", "first quarter and last quarter"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1864",
    recordId: "Mercury_7212153",
    question: "A magnet can generate an electric current in a wire if the magnet is close enough to the wire and if the magnet is also",
    options: ["in motion.", "strong.", "at rest.", "weak."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1865",
    recordId: "MCAS_2003_8_17",
    question: "Which of the following symbiotic relationships is considered parasitic?",
    options: ["pilotfish swimming under sharks", "birds eating the insects from the back of a hippopotamus", "bees transporting pollen from flowers", "ticks feeding on a dog"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1866",
    recordId: "TIMSS_2003_4_pg20",
    question: "What will most likely affect your adult height?",
    options: ["Your weight", "The height of your parents", "The height of your brothers and sisters", "Your hair color"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1867",
    recordId: "MCAS_2012_8_23654",
    question: "The winter solstice occurs on either December 21 or 22, depending on the year. Which of the following statements best explains why the time of the year the winter solstice occurs has the least amount of daylight in Massachusetts?",
    options: ["Earth's Northern Hemisphere is tilted away from the Sun on the winter solstice.", "Earth's rotational speed on its axis is greatest on the winter solstice.", "Earth is farthest away from the Sun on the winter solstice.", "Earth is traveling around the Sun with the greatest speed on the winter solstice."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1868",
    recordId: "MSA_2015_5_44",
    question: "Maryland has many renewable and nonrenewable natural resources. Which group contains only renewable resources found in Maryland?",
    options: ["oil, water, trees", "trees, water, fish", "wind, oil, coal", "fish, coal, wind"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1869",
    recordId: "Mercury_405943",
    question: "Which part makes a plant cell different from an animal cell?",
    options: ["cell membrane", "nucleus", "cytoplasm", "cell wall"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1870",
    recordId: "MCAS_8_2014_21",
    question: "Which of the following has a warmer average surface temperature than Earth?",
    options: ["Mars", "Pluto", "Moon", "Venus"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1871",
    recordId: "NYSEDREGENTS_2012_8_43",
    question: "Sound waves are not able to travel through",
    options: ["metal", "a cloud", "water", "a vacuum"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1872",
    recordId: "Mercury_SC_405197",
    question: "Scientists study fossils to learn about extinct plants and animals. Which of these is the best example of a fossil?",
    options: ["a footprint in a rock", "a seashell under water", "a bone on top of a sand pile", "a leaf in a mudpuddle"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1873",
    recordId: "Mercury_406776",
    question: "When an egg and sperm form an embryo, the offspring that is formed will have genetic traits that are",
    options: ["learned from siblings.", "created by the environment.", "passed on from two parents.", "inherited from only one parent."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1874",
    recordId: "Mercury_7263288",
    question: "Turgor pressure in the cells of plant roots is strong enough to eventually crack the rocks in which they grow. What machine redirects force this way?",
    options: ["a pulley", "an inclined plane", "a wheel and axle", "a wedge"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1875",
    recordId: "Mercury_7136483",
    question: "Daphnee is going to build a model of the solar system for her science project. She decides that a meter (m) will represent one astronomical unit (AU) in her model. Based on this scale, how far away from the Sun would she need to place Earth?",
    options: ["two meters", "four meters", "one meter", "three meters"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1876",
    recordId: "MEA_2013_5_9",
    question: "A lizard in a desert sits on a warm rock. Where does the heat energy in the rock come from?",
    options: ["the Sun", "the lizard's skin", "the decay of plant materials", "deep within Earth"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1877",
    recordId: "Mercury_7043908",
    question: "What is the major cause of ocean waves?",
    options: ["wind", "Moon's gravity", "Earth's rotation", "salinity"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1878",
    recordId: "Mercury_SC_401815",
    question: "What type of graph would be best for recording plant growth over a one-week period?",
    options: ["histogram", "line graph", "scatterplot", "pie chart"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1879",
    recordId: "MEA_2013_5_11",
    question: "A scientist compares ancient animal tracks to modern animal tracks. Which conclusion is the scientist most likely to reach?",
    options: ["Some ancient animals and some modern animals walk on four legs.", "The same animals that lived long ago also live today.", "All animals can walk.", "Most ancient animals and most modern animals hunt animals for food."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1880",
    recordId: "Mercury_7166863",
    question: "A group of citizens want to have a statue built out of marble. They want to place it in a climate that has a slow rate of chemical weathering. In which type of climate would it be best to place the statue for the slowest rate of chemical weathering?",
    options: ["cold and humid", "hot and humid", "hot and dry", "cold and dry"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1881",
    recordId: "MEA_2010_8_2",
    question: "According to scientists, donkeys and horses share a common ancestor. Which evidence shows that the two organisms are related?",
    options: ["They have the same bones in their limbs.", "Both run fast.", "They have the same diet.", "Both are tall."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1882",
    recordId: "LEAP__7_10346",
    question: "Which relationship is mutualistic?",
    options: ["an insect that lives and feeds on the body of an alligator", "a deer that eats one kind of plant, which allows another kind of plant to grow in its place", "a bird that migrates to follow the movements of the butterflies that it eats", "an ant that lives on a plant and defends the plant from other insects"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1883",
    recordId: "LEAP__7_10349",
    question: "In humans, B is the allele for brown eyes and b is the allele for blue eyes. Two brothers both have brown eyes, but one of them has both the B and b alleles while the other only has B alleles. Which statement is true about the brothers?",
    options: ["They have the same genotype and phenotype.", "They have the same genotype but different phenotypes.", "They have the same phenotype but different genotypes.", "They have different phenotypes and genotypes."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1884",
    recordId: "CSZ_2005_5_CSZ10247",
    question: "Which of the following is broken down in the body to release energy?",
    options: ["oxygen.", "water.", "salt.", "sugar."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1885",
    recordId: "Mercury_7234028",
    question: "Which property is thought to characterize objects in the Oort Cloud?",
    options: ["They regularly replenish water on Earth.", "They are composed mostly of ice.", "They are composed mostly of iron.", "They regularly revolve near the Sun."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1886",
    recordId: "Mercury_7018393",
    question: "Sound travels as a",
    options: ["wave without a medium.", "pattern of up and down vibrations.", "series of compressions only.", "pattern of compressions and rarefactions."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1887",
    recordId: "Mercury_7043680",
    question: "Astronomers have been studying objects that are very bright and appear to be very far away. They have since concluded that these objects are distant galaxies with giant black holes at their center known as",
    options: ["supernovas.", "binary stars.", "pulsars.", "quasars."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1888",
    recordId: "NYSEDREGENTS_2015_4_6",
    question: "Which unit of measurement should be used to describe the  mass of an apple?",
    options: ["meter", "minute", "gram", "liter"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1889",
    recordId: "NYSEDREGENTS_2015_8_35",
    question: "Scientists have created trains that use magnets to make the trains float above the tracks as they travel. These trains float because",
    options: ["the track is waxed", "the train has a low density", "the like poles repel", "a chemical change occurs"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1890",
    recordId: "NYSEDREGENTS_2008_4_23",
    question: "One role of a producer in a food chain is to provide",
    options: ["shelter for animals", "nutrients for animals", "sunlight for plants", "water for plants"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1891",
    recordId: "Mercury_7235970",
    question: "Tectonic motion caused tension between plates in Earth's crust. A sudden release of this energy occurred. Based on this information, which event happened?",
    options: ["earthquake", "subsidence", "meteoroid impact", "volcanic eruption"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1892",
    recordId: "Mercury_SC_413146",
    question: "The teacher heats a pot of water. Once the water reaches 100°C, which point has the water reached?",
    options: ["boiling", "melting", "freezing", "evaporating"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1893",
    recordId: "Mercury_7017185",
    question: "What is the major cause of seasonal changes?",
    options: ["Earth changing its distance from the Sun", "tilt of the Earth's axis", "cycles in the amount of energy released by the Sun", "changing patterns in wind and ocean currents"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1894",
    recordId: "Mercury_182700",
    question: "In 1989, the unusually low snowpack in portions of the Sierra Nevada Mountains led to a widespread emergence of Edith's checkerspot butterflies in April. In these regions, flowers do not appear until May. What was the most likely result of the early emergence of these butterflies?",
    options: ["Most butterflies did not survive.", "Most butterflies switched to other food sources.", "Most butterflies adapted to the new environment.", "Most butterflies reproduced earlier."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1895",
    recordId: "Mercury_7043085",
    question: "Which scientist developed the mathematical models used to describe the changes in the motion of objects as well as the forces that cause the change in motion?",
    options: ["Dalton", "Aristotle", "Newton", "Ptolemy"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1896",
    recordId: "LEAP__5_10319",
    question: "Which natural event would take the longest time to happen?",
    options: ["a cloud forming", "a mountain forming", "a river flooding its banks", "a pond evaporating"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1897",
    recordId: "NYSEDREGENTS_2012_8_32",
    question: "Which property of a substance indicates whether the substance is a liquid or a solid at room temperature?",
    options: ["electrical conductivity", "flexibility", "melting point", "solubility"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1898",
    recordId: "Mercury_7216790",
    question: "Which organelle converts glucose to energy for cellular work?",
    options: ["nucleus", "chloroplast", "vacuole", "mitochondrion"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1899",
    recordId: "Mercury_7084438",
    question: "The length of a year is determined by the amount of time it takes",
    options: ["the Sun to rotate on its axis.", "Earth to rotate on its axis.", "Earth to revolve around the Sun.", "the Moon to revolve around Earth."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1900",
    recordId: "Mercury_7213815",
    question: "A tick attaches to a deer and consumes blood, harming the deer. This is an example of which type of relationship?",
    options: ["mutualism", "parasite-host", "commensalism", "predator-prey"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1901",
    recordId: "MCAS_2000_4_23",
    question: "Cactus plants grow best in environments (habitats) that are",
    options: ["cold and wet.", "hot and wet.", "cold and dry.", "hot and dry."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1902",
    recordId: "NAEP_2005_4_S12+7",
    question: "Where does water in a lake get most of its energy to evaporate?",
    options: ["Green plants living in the lake", "The sun heating the lake", "Cold springs under the lake", "Streams entering the lake"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1903",
    recordId: "Mercury_SC_401163",
    question: "A scientist trying to identify an unknown liquid may heat the liquid. Which would be the best reason for the scientist to heat the liquid?",
    options: ["to collect gases for additional study", "to identify the boiling point", "to observe a color change", "to get rid of most impurities"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1904",
    recordId: "Mercury_7026898",
    question: "During a laboratory investigation, a student cracks a clean, empty Erlenmeyer flask. It does not break, but it can no longer be used. Where should the flask be placed?",
    options: ["biohazard bag", "broken glass bin", "trash can", "hazardous waste bin"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1905",
    recordId: "MDSA_2011_8_39",
    question: "A light bulb transforms electrical energy into light energy. A light bulb also transforms electrical energy into",
    options: ["heat energy", "mechanical energy", "magnetic energy", "potential energy"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1906",
    recordId: "MCAS_2004_5_16",
    question: "Jonas needs to split a log. He has a sledge hammer. What other tool should he also use to split the log?",
    options: ["a wedge", "a pulley", "a lever", "a fulcrum"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1907",
    recordId: "Mercury_7206010",
    question: "Hurricanes are driven by the energy they get from ocean water. Which property of water allows it to retain the energy needed to power a hurricane?",
    options: ["low freezing point", "high specific heat", "high surface tension", "low vapor pressure"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1908",
    recordId: "Mercury_7138425",
    question: "Which organisms contribute most to the decomposition of dead organisms?",
    options: ["viruses", "snakes", "insects", "bacteria"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1909",
    recordId: "Mercury_SC_LBS10948",
    question: "What is one difference between birds and reptiles?",
    options: ["Birds breathe oxygen and reptiles do not.", "Reptiles are meat-eaters and birds are not.", "Reptiles are cold-blooded and birds are not.", "Birds lay eggs and reptiles do not."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1910",
    recordId: "Mercury_LBS10577",
    question: "The ounce, the pound, and the ton are units of",
    options: ["time.", "distance.", "weight.", "length."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1911",
    recordId: "Mercury_7223090",
    question: "A student uses clay to construct a model of Earth. Which layer of the model should be the thinnest layer?",
    options: ["the layer representing the inner core", "the layer representing the outer core", "the layer representing the mantle", "the layer representing the crust"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1912",
    recordId: "Mercury_7014035",
    question: "A scientist observes that both birds and snakes in the same ecosystem depend on the same mouse species as a food source. The relationship between the birds and the snakes is an example of",
    options: ["predation.", "commensalism.", "mutualism.", "competition."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1913",
    recordId: "MCAS_1999_8_36",
    question: "Animals get energy from the food they eat. What is the original source of this energy?",
    options: ["the soil", "the water cycle", "fertilizers", "the Sun"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1914",
    recordId: "LEAP__5_10309",
    question: "Many human activities, such as driving a car, cause the release of air pollutants. Which substance is a common air pollutant when driving a car?",
    options: ["nitrogen", "iron oxide", "chlorine", "carbon monoxide"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1915",
    recordId: "Mercury_7068670",
    question: "Which environment would most likely have rich, fertile soil?",
    options: ["a desert plain", "a flood plain", "a mountain peak", "a coastal beach"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1916",
    recordId: "Mercury_7160545",
    question: "In 1785, James Hutton, stated that evidence of past occurrences can be used to explain events which happen today. Which could most likely be used to explain an event in the geologic past?",
    options: ["cloud formations", "sunspots", "wave patterns", "earthquakes"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1917",
    recordId: "MDSA_2013_8_7",
    question: "The elements sulfur (S) and oxygen combine to form a substance called sulfur dioxide (SO2). Sulfur dioxide is also formed when coal and oil are burned. Sulfur dioxide can best be described as",
    options: ["a compound", "a nonreactive gas", "a metal", "an atom"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1918",
    recordId: "Mercury_7159880",
    question: "If a pond is polluted by soap that has phosphate, this pollutant will cause the algae to quickly reproduce. Which will most likely increase in the pond if this happens to the algae?",
    options: ["carbon dioxide", "oxygen", "nitrogen", "sulfur"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1919",
    recordId: "Mercury_7075128",
    question: "In order to carry out the functions of life, organisms must",
    options: ["have at least one cell.", "have more than one type of cell.", "be able to move.", "be exposed to sunlight."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1920",
    recordId: "Mercury_7124093",
    question: "A roller coaster is climbing up the highest hill on its track. At which point will the front car of the coaster most likely have its greatest potential energy?",
    options: ["at the top of the highest hill", "at the start of the track", "at the end of the track", "at the bottom of the highest hill"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1921",
    recordId: "MCAS_2004_9_4",
    question: "What is the mass of an asteroid with a speed of 200 m/s and a momentum of 2,000 kg x m/s?",
    options: ["1,800 kg", "10 kg", "2,200 kg", "400,000 kg"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1922",
    recordId: "Mercury_7123305",
    question: "Some scientists study images of very distant celestial bodies. Where is the best location for the types of telescopes that can provide the scientists with the clearest images.",
    options: ["at higher latitudes", "in outer space", "at sea level", "on mountain tops"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1923",
    recordId: "Mercury_SC_416134",
    question: "How do people get energy and nutrients?",
    options: ["breathing clean air", "getting plenty of rest", "eating healthy food", "exercising and playing"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1924",
    recordId: "Mercury_401646",
    question: "Which action is a learned characteristic of a newborn horse?",
    options: ["walking", "nursing", "sleeping", "breathing"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1925",
    recordId: "MCAS_2004_8_5",
    question: "An earthquake is caused by sudden shifts in which of the following layers of Earth?",
    options: ["inner core", "outer core", "crust", "mesosphere"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1926",
    recordId: "Mercury_SC_408426",
    question: "A black bear's diet includes nuts, berries, honey, insects, and fish. Black bears are",
    options: ["herbivores.", "decomposers.", "omnivores.", "prey."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1927",
    recordId: "Mercury_7005828",
    question: "The news often talks about how global warming could change environmental conditions on Earth. Which best explains why global warming is such a concern?",
    options: ["The sea level will rise.", "The overall temperature will decrease.", "Glaciers will advance.", "Earthquake activity will increase."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1928",
    recordId: "Mercury_7197890",
    question: "Animal cells perform functions using energy that is derived from glucose (C6H12O6). Which molecule is required for animal cells to obtain the most energy possible from a molecule of glucose?",
    options: ["oxygen", "carbon dioxide", "lactic acid", "water"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1929",
    recordId: "ACTAAP_2009_7_6",
    question: "Stomata are tiny pores located on the leaves of plants. These pores permit the exchange of gases between air in the environment and plant cells located inside the leaf. Which tissue performs a similar function in vertebrates?",
    options: ["The salivary glands in the mouth", "The alveoli in the lungs", "The chambers in the heart", "The cornea in the eye"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1930",
    recordId: "Mercury_400752",
    question: "When crossing parents with genotypes Rr and rr, what will be the percentages of the genotypes of the offspring?",
    options: ["100% rr", "50% Rr, 50% rr", "75% Rr, 25% rr", "100% Rr"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1931",
    recordId: "Mercury_7233345",
    question: "Which information will best help scientists determine if an object is a comet, an asteroid, or a meteoroid?",
    options: ["the object's diameter", "the shape of the object's orbit", "the speed at which the object travels", "the object's composition"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1932",
    recordId: "Mercury_7154228",
    question: "In an ocean ecosystem, dead organisms such as fish and plankton sink to the bottom of the ocean. Which organisms break down and recycle the dead organisms?",
    options: ["sponges", "algae", "mollusks", "bacteria"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1933",
    recordId: "ACTAAP_2009_5_15",
    question: "Which is the best description of the brightness of the Sun?",
    options: ["It is of average brightness compared to planets.", "It is less bright than planets.", "It is brighter than other stars.", "It is of average brightness compared to other stars."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1934",
    recordId: "Mercury_SC_LBS10042",
    question: "Which process passes genetic information from plants to their offspring?",
    options: ["germination", "photosynthesis", "pollination", "adaptation"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1935",
    recordId: "Mercury_406785",
    question: "What must happen in order for scientific data to be verified through repetition?",
    options: ["Modern technology must be used.", "Accurate records must be kept.", "Observations must be made by more than one scientist.", "Investigations must be conducted by trained scientists."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1936",
    recordId: "Mercury_7077648",
    question: "Which particle type can be identified as being from a specific element?",
    options: ["atom", "neutron", "electron", "proton"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1937",
    recordId: "Mercury_LBS10205",
    question: "Which of the following is a chemical property of a substance?",
    options: ["density of 37 g/cm^3", "mass of 372 g", "white powder with silver specks", "reacts with HCl"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1938",
    recordId: "NYSEDREGENTS_2010_8_18",
    question: "Which structure is found in a plant cell but not in an animal cell?",
    options: ["cell wall", "cell membrane", "nucleus", "cytoplasm"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1939",
    recordId: "Mercury_SC_LBS10611",
    question: "Which of these best describes a fossil?",
    options: ["a geometric pattern formed by a mineral", "remains of an extinct organism found in a rock layer", "bits of weathered rocks and pieces of dead organisms", "a solid element or compound from Earth's crust"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1940",
    recordId: "Mercury_7185710",
    question: "A student is conducting an investigation using chemicals. Other than goggles and gloves, what else should the student use in order to conduct this investigation safely?",
    options: ["Petri dish", "Bunsen burner", "loose-fitting clothing", "lab coat"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1941",
    recordId: "Mercury_188948",
    question: "The boiling point of nitrogen is -196°C. What states of matter are involved when nitrogen boils?",
    options: ["liquid to gas", "solid to gas", "gas to liquid", "liquid to solid"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1942",
    recordId: "Mercury_7179865",
    question: "The Hubble Space Telescope is a telescope that NASA launched into space in 1990. Scientists most likely prefer to use the Hubble Space Telescope instead of a land-based telescope because it provides better accuracy at",
    options: ["predicting the phases of the Moon.", "investigating the size of Venus.", "predicting solar eclipses.", "investigating faraway galaxies."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1943",
    recordId: "MCAS_2012_5_3",
    question: "Which of the following statements best describes a complex machine?",
    options: ["It is constructed from machine-made parts.", "It is designed to move with a motor.", "It is made of more than one simple machine.", "It is built from more than one type of material."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1944",
    recordId: "Mercury_7159583",
    question: "A drug company developed a pill to reduce cases of stomach virus. To test the medication, half of the participants got the pill with the new medicine and half got a sugar pill. Which term best identifies the participants who got a sugar pill?",
    options: ["control", "dependent variable", "experimental", "independent variable"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1945",
    recordId: "Mercury_7251003",
    question: "Which information does a student need to differentiate between the speed and the velocity of a vehicle in motion?",
    options: ["the amount of distance traveled during motion", "the change in the amount of motion", "the rate of the motion", "the direction of the motion"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1946",
    recordId: "Mercury_7245158",
    question: "When do mutations help make an ecosystem more sustainable?",
    options: ["when mutations decrease the number of individuals in an ecosystem", "when mutations increase the number of species in an ecosystem", "when mutations decrease the number of species in an ecosystem", "when mutations increase the number of individuals in an ecosystem"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1947",
    recordId: "ACTAAP_2010_5_12",
    question: "Which scientist would be most likely to study the changes in animal populations in nature?",
    options: ["Engineer", "Botanist", "Ecologist", "Veterinarian"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1948",
    recordId: "MSA_2015_5_7",
    question: "Humans use both renewable and nonrenewable resources. Which human activity uses a nonrenewable resource?",
    options: ["producing electricity from flowing water", "building houses with wood", "using natural gas to heat homes", "using solar energy to power lights"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1949",
    recordId: "Mercury_7077578",
    question: "Which best describes the motion of molecules in the gaseous state?",
    options: ["They move slowly over one another.", "They move at the same speed as in a liquid.", "They spread apart to fill their container.", "They vibrate quickly in place."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1950",
    recordId: "ACTAAP_2007_7_9",
    question: "What is the downward movement of water through pores and other spaces in soil due to the force of gravity?",
    options: ["precipitation", "evaporation", "percolation", "condensation"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1951",
    recordId: "Mercury_7222898",
    question: "On Mount Everest the temperature decreases as the altitude increases. The summit of this mountain is in which atmospheric layer?",
    options: ["mesosphere", "stratosphere", "troposphere", "thermosphere"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1952",
    recordId: "NYSEDREGENTS_2010_8_41",
    question: "Which energy source is considered nonrenewable?",
    options: ["biomass", "moving water", "fossil fuel", "wind"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1953",
    recordId: "TIMSS_2003_4_pg34",
    question: "A renewable energy source is a source that will not run out. Which is an example of the use of such a source?",
    options: ["a windmill pumping water on a farm", "a kerosene lamp lighting a room", "a diesel truck traveling along a road", "A coal furnace heating a house"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1954",
    recordId: "MEA_2016_8_2",
    question: "Which statement best describes why the Moon is visible from Earth?",
    options: ["The Moon reflects light from other planets.", "Light is produced by the Moon.", "The Moon reflects light from the Sun.", "Light from Earth illuminates the Moon."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1955",
    recordId: "AIMS_2008_4_13",
    question: "Which statement best explains the reason that electrical wires are made of copper?",
    options: ["Copper is a conductor.", "Copper is strong.", "Copper is an insulator.", "Copper is flexible."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1956",
    recordId: "VASoL_2011_5_1",
    question: "Which of these is a natural resource of Virginia?",
    options: ["A glacier", "A dam", "A power plant", "A river"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1957",
    recordId: "Mercury_7126613",
    question: "Insulin is a chemical that is released by the endocrine system to increase the absorption of glucose by the body's cells. After which activity would insulin levels in a healthy body increase?",
    options: ["taking a nap", "swimming", "drinking water", "eating"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1958",
    recordId: "Mercury_7161035",
    question: "An engineer was given an assignment to build a model rocket. The main requirement was that it had to build it out of a metal that could release the energy that built up when reentering the atmosphere of Earth. What property should the engineer concentrate on the most when designing the rocket?",
    options: ["density", "ductility", "specific heat", "boiling point"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1959",
    recordId: "Mercury_7205468",
    question: "Which color of light is produced when all of the colors of visible light in the electromagnetic spectrum are combined?",
    options: ["brown", "black", "white", "gray"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1960",
    recordId: "MCAS_2010_8_12020",
    question: "A company is making prototypes for a new computer system. Which of the following statements best describes an advantage of making several different prototypes?",
    options: ["They can be tested at the same time.", "They can be produced in large numbers.", "They will be sold for more than they cost to build.", "They will be bought by many different users."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1961",
    recordId: "ACTAAP_2007_7_14",
    question: "What is the function of the nucleus in a cell?",
    options: ["controls activity", "provides energy", "provides nutrients", "controls movement"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1962",
    recordId: "Mercury_SC_400851",
    question: "A tree is a renewable resource because it can be",
    options: ["replaced with a newly planted tree.", "burned in a fire.", "eaten by some organisms.", "made into lumber."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1963",
    recordId: "Mercury_SC_LBS10344",
    question: "How does the presence of organic matter contribute to good soil?",
    options: ["It destroys bacteria in the soil.", "It keeps the soil cool.", "It adds nutrients to the soil.", "It helps the soil to dry out."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1964",
    recordId: "VASoL_2008_5_40",
    question: "A wild turkey's forest community includes",
    options: ["wind", "insects", "rainfall", "soil"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1965",
    recordId: "Mercury_7239435",
    question: "Which of the following travels from neuron to neuron as information is transmitted?",
    options: ["RNA strands", "mechanical forces", "transport vesicles high in ATP", "electrochemical impulses"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1966",
    recordId: "NYSEDREGENTS_2012_8_16",
    question: "During which process do cells use oxygen to release stored energy?",
    options: ["circulation", "respiration", "photosynthesis", "digestion"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1967",
    recordId: "Mercury_SC_402614",
    question: "Which of the following has the ability to change the state of matter?",
    options: ["sound", "heat", "light", "wind"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1968",
    recordId: "ACTAAP_2010_5_13",
    question: "Many things can contribute to the development of a theory. A student made a list of some things that might help scientists develop a theory. Observations Calculations Conversations Publications From the student's list, which must be used in the development of every theory?",
    options: ["Conversations", "Calculations and conversations", "Observations", "Publications and calculations"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1969",
    recordId: "Mercury_SC_410877",
    question: "Ben has a snack with a combination of raisins, chocolate pieces, and nuts. As he eats the snack, Ben picks out all of the raisins. Which best describes the snack Ben is eating?",
    options: ["a mixture", "a compound", "an element", "a solution"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1970",
    recordId: "Mercury_7163240",
    question: "Capillary walls are only one layer of cells thick. Passage of oxygen into and out of the capillaries is controlled most by which process?",
    options: ["diffusion of material", "collection of waste material", "storage of materials", "breakdown of materials"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1971",
    recordId: "Mercury_7145950",
    question: "The average car uses about 25% of the available energy in each gallon of gasoline. The energy not used to run the car is released as heat and sound. Which statement best describes this occurrence?",
    options: ["Energy loss increases the order in a system.", "Energy is destroyed at high temperatures.", "Energy conversion reduces efficiency.", "Energy levels increase as conversions take place."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1972",
    recordId: "TIMSS_1995_8_Q16",
    question: "How long does it take light from the nearest star other than the Sun to reach Earth?",
    options: ["About 4 years", "Less than 1 second", "About 1 hour", "About 1 month"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1973",
    recordId: "Mercury_SC_400003",
    question: "Spider webs help spiders",
    options: ["avoid predators.", "keep warm.", "stay dry.", "capture food."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1974",
    recordId: "Mercury_SC_401001",
    question: "Pouring water over a sloping tray of soil demonstrates how",
    options: ["planting grass protects the soil.", "soil creation may take years.", "soil can be washed away.", "river sediment forms a delta."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1975",
    recordId: "NAEP_2009_8_S10+2",
    question: "Which layer of Earth is divided into plates?",
    options: ["Crust", "Inner core", "Outer core", "Mantle"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1976",
    recordId: "Mercury_7235848",
    question: "The breakdown of ozone into oxygen results from the electromagnetic absorption spectrum of ozone. This production of oxygen in the ozone layer is caused by exposing ozone to a strong source of which type of electromagnetic radiation?",
    options: ["infrared light", "microwaves", "radio waves", "ultraviolet light"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1977",
    recordId: "Mercury_SC_402645",
    question: "Which best describes what keeps the Moon orbiting around Earth?",
    options: ["gravity", "weight", "speed", "friction"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1978",
    recordId: "Mercury_7230125",
    question: "The hypothesis of an expanding universe required which type of validation before being accepted as a significant part of scientific theory?",
    options: ["support through evidence from numerous observations", "proposal of alternative explanations with predictive value", "a full-scale replication of each event in the proper sequence", "a controlled single-variable laboratory test"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1979",
    recordId: "NYSEDREGENTS_2008_8_25",
    question: "In which type of rock is the fossil imprint of a fern leaf most likely to be found?",
    options: ["volcanic", "sedimentary", "metamorphic", "igneous"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1980",
    recordId: "TAKS_2009_8_38",
    question: "At certain times of the year, meteor showers can be observed from Earth. Why are these objects from space usually harmless?",
    options: ["They are made of soft, spongy materials.", "They are closer to the sun than to Earth.", "They burn up high in Earth's atmosphere", "They are always microscopic."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1981",
    recordId: "TIMSS_2011_4_pg42",
    question: "Which group of animals contains ONLY reptiles?",
    options: ["crab, earthworm, snake", "turtle, lizard, crocodile", "octopus, snail, turtle", "lizard, frog, snake"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1982",
    recordId: "MCAS_2006_9_17",
    question: "Why is the particular sequence of bases in a segment of DNA important to cells?",
    options: ["Some base sequences code for protein production.", "Some base sequences cause the release of lipids from the nucleus.", "Some base sequences contain the order of sugars in polysaccharides.", "Some base sequences produce electrical signals sent to the cytoplasm."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1983",
    recordId: "Mercury_7012950",
    question: "A meteorologist announces that the barometer reading is dropping. What does a barometer measure?",
    options: ["wind speed", "air temperature", "air pressure", "ground temperature"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1984",
    recordId: "Mercury_7219783",
    question: "A cricket population includes approximately the same number of black and light-brown crickets. Black crickets are easier for birds to locate and eat. Over time, the population begins to consist of only light-brown crickets. The change in the color of the cricket population is a result of",
    options: ["climate change.", "limited resources.", "natural selection.", "geographic isolation."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1985",
    recordId: "Mercury_7041230",
    question: "When nearly vertical rays of solar energy strike a region of the Earth, that area has warm temperatures. What region of the Earth gets nearly vertical rays of solar energy year around?",
    options: ["United States", "North and South Poles", "Equator", "Australia"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1986",
    recordId: "Mercury_406786",
    question: "Scientists from around the world would most likely meet at a conference held in Paris, France, to",
    options: ["learn how to speak the same language.", "show other scientists the scientific method.", "work together on scientific research.", "teach students the importance of education."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1987",
    recordId: "Mercury_7219713",
    question: "Ferns belong to any one of about 12,000 species of plants grouped in their own division within the plant kingdom. Ferns are vascular, seedless, flowerless, and reproduce by spores. To which plant group do ferns belong?",
    options: ["Gymnosperm", "Bryophyta", "Pteridophyta", "Angiosperm"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1988",
    recordId: "Mercury_401659",
    question: "A student ties a string around a weight and swings the weight in a circle around her body. If the student represents the Sun and the weight represents Earth, what does the string represent?",
    options: ["electricity", "magnetism", "gravity", "radiation"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1989",
    recordId: "Mercury_7171535",
    question: "Scientists have studied the specific stages in the life cycle of stars. In which stage do stars spend most of their lifetime?",
    options: ["red giant", "main sequence", "white dwarf", "black dwarf"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1990",
    recordId: "Mercury_182403",
    question: "How does the energy in each trophic level of an energy pyramid compare to the energy in the preceding level?",
    options: ["It has about 10% of the energy from the level below it.", "It has about 15% of the energy from the level below it.", "It has about 20% of the energy from the level below it.", "It has about 5% of the energy from the level below it."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1991",
    recordId: "Mercury_7085453",
    question: "The texture of soil depends primarily on the",
    options: ["composition of the soil.", "vegetation growing in the soil.", "water in the soil.", "mass of the soil."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1992",
    recordId: "NYSEDREGENTS_2010_4_19",
    question: "As children grow, their body height usually",
    options: ["increases", "remains the same", "decreases"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1993",
    recordId: "Mercury_SC_400195",
    question: "Which is a force that keeps the planets in orbit around the Sun?",
    options: ["inertia", "magnetism", "solar energy", "gravity"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/1994",
    recordId: "Mercury_192203",
    question: "What is the role of the kidneys in the excretory system?",
    options: ["to remove toxins", "to produce bile", "to oxygenate blood", "to digest food"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1995",
    recordId: "Mercury_7222635",
    question: "Which number is closest to the estimated number of stars in the Milky Way galaxy?",
    options: ["200 thousand", "200 billion", "200 trillion", "200 million"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1996",
    recordId: "Mercury_SC_400307",
    question: "Which statement best describes how a mountain range changes over time from wind and water erosion?",
    options: ["The mountain range will form craters.", "The mountain range will become rounded.", "The mountain range will be lifted up.", "The mountain range will become faulted."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/1997",
    recordId: "Mercury_7238910",
    question: "In a cell, a newly synthesized protein requires modification by the addition of a carbohydrate. Which structure will transport the protein from the site of synthesis to the site of modification?",
    options: ["the endoplasmic reticulum", "a vacuole", "a ribosome", "the Golgi apparatus"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/1998",
    recordId: "VASoL_2008_5_34",
    question: "Students notice that in the fall leaves of sugar maple trees turn red, but the leaves of black oak trees turn brown. The students are making",
    options: ["a conclusion", "a prediction", "an observation", "an inference"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/1999",
    recordId: "Mercury_7217980",
    question: "What instrument should be used to monitor atmospheric pressure changes as a weather system approaches?",
    options: ["anemometer", "barometer", "thermometer", "psychrometer"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/2000",
    recordId: "Mercury_7228533",
    question: "Which of the following is responsible for determining the traits of an organism?",
    options: ["type of bond between bases", "number of phosphates", "amount of thymine", "sequence of nucleotides"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/2001",
    recordId: "Mercury_405953",
    question: "In which organism can cell walls be found?",
    options: ["snake", "grass", "hawk", "moth"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/2002",
    recordId: "Mercury_SC_400034",
    question: "Isaac Newton is best known for his study of",
    options: ["motion.", "the history of Earth.", "weather.", "body systems."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/2003",
    recordId: "MDSA_2011_4_5",
    question: "Some objects are attracted by magnets. Which object is attracted by a magnet?",
    options: ["a plastic knife", "an ice cube", "an iron nail", "a wooden ruler"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/2004",
    recordId: "Mercury_7092330",
    question: "Which action represents the use of technology to solve a problem?",
    options: ["answering mathematical equations with the use of computers", "increasing the supply of fish with the use of fish farms", "bringing down body temperature with the use of a hand fan", "reducing the amount of heartburn with the use of herbal teas"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/2005",
    recordId: "Mercury_SC_400604",
    question: "When a guitar string is strummed, it produces sound by making",
    options: ["vibrations.", "electricity.", "light.", "heat."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/2006",
    recordId: "Mercury_7162575",
    question: "The meanings of mass and weight can often be confused. Which is an example of a change in both mass and weight?",
    options: ["visiting the Moon", "a ship floating on the ocean", "living on the space station", "a stone eroding in a river"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/2007",
    recordId: "Mercury_407053",
    question: "Which of these are scientific classifications for galaxies in the universe?",
    options: ["dust, gas, ice", "red giant, white dwarf, supernova", "spiral, elliptical, irregular", "small, medium, large"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/2008",
    recordId: "Mercury_416580",
    question: "A scientist was observing a unicellular organism over a period of time. He noticed that vacuoles kept moving to the same place in the plasma membrane to empty their contents outside the cell. Which organism was he observing?",
    options: ["volvox", "paramecium", "euglena", "amoeba"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/2009",
    recordId: "MCAS_2007_5_4785",
    question: "Which form of precipitation is most likely to cause damage when hitting the roof of a car?",
    options: ["snow", "rain", "sleet", "hail"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/2010",
    recordId: "Mercury_SC_400035",
    question: "Which tool is best to use when comparing an animal cell to a plant cell?",
    options: ["balance", "microscope", "compass", "thermometer"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/2011",
    recordId: "Mercury_412696",
    question: "The density of 200 mL of water was determined, and then 20 grams of sugar was dissolved in the water. The student determined the density of the sugar-water solution and recorded the collected data in a table. The sugar in this investigation is",
    options: ["the solute.", "the solvent.", "undergoing chemical change.", "changing from a solid to a gas."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/2012",
    recordId: "Mercury_7145215",
    question: "During the year, the angle at which the path of the Sun appears in the sky varies. In the Northern Hemisphere, the path of the Sun appears higher on the horizon during the summer and lower on the horizon during the winter. Which factor most contributes to the variation in the path of the Sun across the sky?",
    options: ["the rotation of Earth", "the elliptical shape of the orbit of Earth", "the tilted axis of Earth", "the flattening of Earth at the poles"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/2013",
    recordId: "Mercury_7213308",
    question: "Which is the best way to show the percent gas composition in Earth's atmosphere?",
    options: ["scatterplot", "pie chart", "line graph", "bar graph"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/2014",
    recordId: "Mercury_401762",
    question: "For the reaction between silver nitrate and sodium chloride, which of the following would be a product? AgNo_{3} + NaCl ->",
    options: ["ClNO_{3}", "Na_{3}NO", "AgCl", "AgNa"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/2015",
    recordId: "Mercury_405772",
    question: "Which invention has done the most to help predict weather and warn people of approaching storms?",
    options: ["satellites", "maps", "airplanes", "barometers"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/2016",
    recordId: "Mercury_7100643",
    question: "During the Siberian summer, reindeer graze on young roots, fungi, grass, and other vegetation. In the cold winter months, they migrate south and rely on available, but less nutritious food, such as lichen. Increased snowfall during the entire winter in southern areas would result in reindeer having to",
    options: ["hunt for organisms such as small rodents.", "move to other areas to compete for resources.", "return to their summer feeding area.", "hibernate until the snows have stopped."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/2017",
    recordId: "Mercury_7212503",
    question: "Sir Isaac Newton stated that every object in the universe attracts matter. The attraction depends on the mass of an object and the distance between the objects. What type of force did Newton describe?",
    options: ["generalized force", "gravitational force", "centripetal force", "centrifugal force"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/2018",
    recordId: "Mercury_SC_402254",
    question: "What season is the Northern Hemisphere experiencing when it is tilted away from the Sun?",
    options: ["winter", "spring", "autumn", "summer"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/2019",
    recordId: "MDSA_2009_8_38",
    question: "Heat is applied to a beaker of water, raising the water temperature a few degrees. What happens to the water molecules after heat is applied?",
    options: ["The molecules come together and move more quickly.", "The molecules spread apart and move more quickly.", "The molecules spread apart and move more slowly.", "The molecules come together and move more slowly."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/2020",
    recordId: "Mercury_SC_405504",
    question: "Which feature is most likely the result of a flowing river?",
    options: ["a volcano", "a sand dune", "a glacier", "a canyon"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/2021",
    recordId: "Mercury_7009608",
    question: "Which organ is the site of gas exchange between the body and the environment?",
    options: ["pancreas", "lungs", "spleen", "liver"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/2022",
    recordId: "Mercury_7041913",
    question: "A positively-charged hydrogen ion has a much smaller radius than a neutral hydrogen atom. Which best explains this difference?",
    options: ["The nucleus is the least dense region of an atom.", "The repulsion of protons and neutrons keeps them on opposite ends of atoms.", "Electrons are located far from the nuclei of their atoms.", "Most of the volume of atoms is filled with the particles they contain."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/2023",
    recordId: "Mercury_417472",
    question: "How are dormancy and hibernation similar in animals?",
    options: ["metabolic rate increases and body temperature decreases", "metabolic rate and body temperature both decrease", "metabolic rate and body temperature both increase", "metabolic rate decreases and body temperature increases"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/2024",
    recordId: "Mercury_7248098",
    question: "A small aluminum cube is dropped into a beaker of water to determine the buoyancy. Which of these is not necessary in determining the buoyant force acting on the cube?",
    options: ["density of water", "gravitational pull on Earth", "density of the aluminum cube", "displaced volume"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/2025",
    recordId: "MCAS_2005_9_3-v1",
    question: "Before concrete has hardened, it exhibits plasticity. This is an advantage because it allows the concrete to",
    options: ["become strong as it cures.", "be molded into almost any shape.", "remain pliable after hardening.", "withstand compression."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/2026",
    recordId: "Mercury_401337",
    question: "Which event is an example of inherited behavior?",
    options: ["a horse competing in a horse show", "a bird flying south for the winter", "a parrot repeating a phrase", "a dog sitting on command"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/2027",
    recordId: "Mercury_SC_406480",
    question: "A student must explain the role of dead leaves in the ecosystem. Which statement will the student most likely provide to explain the importance of these leaves?",
    options: ["The leaves provide shelter to growing seeds.", "The leaves release chlorophyll into the grass as they decay.", "The leaves prevent fungus from growing at the base of the tree.", "The decay of the leaves provides nutrients to other plants."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/2028",
    recordId: "TIMSS_2011_8_pg77",
    question: "Which of the following statements is true about organisms that are producers?",
    options: ["They use energy from the sun to make food.", "They absorb energy from a host animal.", "They get energy by breaking down dead plants and animals.", "They get energy from eating living animals."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/2029",
    recordId: "Mercury_7056473",
    question: "If Earth revolved at a faster rate, what would most likely occur?",
    options: ["Annual rainfall would increase.", "Daylight hours would decrease.", "Seasons would be shorter.", "Annual temperature variation would be greater."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/2030",
    recordId: "Mercury_7214585",
    question: "The distance from Earth to the Sun is one astronomical unit. Which unit best describes how many astronomical units it is from Earth to the far end of the Milky Way Galaxy?",
    options: ["millions", "hundreds", "billions", "thousands"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/2031",
    recordId: "Mercury_SC_LBS10591",
    question: "Which is most likely to cause an organism to become endangered or extinct?",
    options: ["increased reproduction rate", "altered migration patterns", "behavioral changes", "habitat loss"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/2032",
    recordId: "Mercury_7015680",
    question: "What are the characteristics of maritime polar air masses?",
    options: ["cool and humid", "cool and dry", "warm and humid", "warm and dry"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/2033",
    recordId: "LEAP_2002_8_10387",
    question: "In an ecosystem, which list of organisms is in the correct order from producer to top-level consumer?",
    options: ["snake, field mouse, hawk, grass", "snake, grass, field mouse, hawk", "grass, field mouse, snake, hawk", "field mouse, grass, hawk snake"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/2034",
    recordId: "Mercury_SC_416131",
    question: "What is a true statement about all foods?",
    options: ["All foods should be cooked.", "All foods taste good.", "All foods provide nutrients.", "All foods are solid."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/2035",
    recordId: "TIMSS_2007_8_pg125",
    question: "Which of the following is an example of an acidic solution?",
    options: ["vinegar", "bleach", "salt water", "sugar water"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/2036",
    recordId: "Mercury_7016013",
    question: "When rock particles settle at the bottom of the ocean, they can continue to be buried by other particles. The process of cementation of these particles forms",
    options: ["molten rocks.", "igneous rocks.", "sedimentary rocks.", "metamorphic rocks."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/2037",
    recordId: "Mercury_7283465",
    question: "Which of these is part of the description of protein?",
    options: ["a branched chain of fatty acids", "a folded chain of amino acids", "a branched chain of nucleic acids", "a folded chain of carbohydrates"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/2038",
    recordId: "MCAS_2005_8_21",
    question: "Lightning from a thunderstorm strikes a 21 tree that falls to the forest floor and dies. During the next few years the dead tree undergoes many changes. What organisms are most likely responsible for the biological and chemical changes to the tree?",
    options: ["decomposers", "producers", "consumers", "predators"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/2039",
    recordId: "ACTAAP_2013_7_14",
    question: "Sodium chloride is formed when sodium and chlorine chemically combine. Which term best describes sodium chloride?",
    options: ["compound", "mixture", "element", "solution"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/2040",
    recordId: "NYSEDREGENTS_2012_4_21",
    question: "Which three things do animals need from their environment in order to survive?",
    options: ["air, water, and light", "soil, water, and food", "soil, light, and water", "air, food, and water"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/2041",
    recordId: "Mercury_7270043",
    question: "Most electricity in the United States is generated using coal, natural gas, nuclear energy, or hydropower. Which of these add carbon dioxide to the atmosphere?",
    options: ["nuclear energy and hydropower", "coal and natural gas", "hydropower and coal", "natural gas and nuclear energy"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/2042",
    recordId: "Mercury_SC_400593",
    question: "A student has recorded rainfall amounts for 28 days and uses a calculator to determine the total rainfall. What does the student calculate when she divides the total rainfall by 28?",
    options: ["mean rainfall", "median rainfall", "rainfall mode", "percentage of rainfall"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/2043",
    recordId: "Mercury_175280",
    question: "Which of the following was most likely the cause of the extinction of 60-100 species of native birds in Hawaii since the arrival of colonists?",
    options: ["volcanic eruptions", "tidal waves", "habitat destruction", "increased salinity"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/2044",
    recordId: "Mercury_SC_400017",
    question: "Which is the correct sequence for the stages in the life cycle of a butterfly?",
    options: ["egg; pupa; larva; adult", "larva; pupa; egg; adult", "adult; larva; pupa; egg", "egg; larva; pupa; adult"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/2045",
    recordId: "TIMSS_2003_8_pg44",
    question: "Oil is an example of a natural resource that is not renewable. Which is another example of an nonrenewable resource?",
    options: ["Seawater", "Wood", "Sunlight", "Coal"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/2046",
    recordId: "Mercury_SC_401128",
    question: "Students are using hammers to break apart rocks as part of an investigation. The students MUST wear goggles to",
    options: ["magnify the work.", "keep hair out of their faces.", "protect their eyes from debris.", "prevent glare from the light."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/2047",
    recordId: "MEA_2011_8_15",
    question: "How would the Sun appear to an astronaut on Pluto compared with how it looks from Earth?",
    options: ["The Sun would appear larger and brighter.", "The Sun would appear smaller and dimmer.", "The Sun would appear smaller and brighter.", "The Sun would appear larger and dimmer."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/2048",
    recordId: "Mercury_7009835",
    question: "When using a microscope, it is best to use a wet mount to",
    options: ["highlight objects with chemical dyes.", "show the interior of sliced objects.", "remove debris that is obscuring the object.", "observe live organisms."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/2049",
    recordId: "MDSA_2009_8_37",
    question: "A power plant uses chemical energy to produce electricity. What source of energy does the power plant most likely use?",
    options: ["fossil fuel", "sunlight", "tidal waves", "wind"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/2050",
    recordId: "Mercury_7008680",
    question: "Which subatomic particle has a negative charge?",
    options: ["quark", "electron", "neutron", "proton"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/2051",
    recordId: "CSZ_2004_5_CSZ20156",
    question: "Which list gives the correct order of food traveling through the digestive system after it is swallowed?",
    options: ["stomach, esophagus, large intestine, small intestine.", "small intestine, large intestine, esophagus, stomach.", "esophagus, stomach, small intestine, large intestine.", "esophagus, stomach, large intestine, small intestine."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/2052",
    recordId: "Mercury_7182158",
    question: "Parakeets are birds whose basic plumage color is green. However, parakeets exhibit a wide range of color both in the wild and in captivity. Which process is the source of the wide color variation observed in parakeet populations?",
    options: ["adaptation", "speciation", "genetic mutation", "natural selection"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/2053",
    recordId: "Mercury_7163415",
    question: "In science, old ideas can be changed when new discoveries alter existing information. Which situation is most likely an example of a rethinking of an existing idea?",
    options: ["using coal to generate electricity", "changing the definition of the term planet", "developing an antibiotic to treat infections", "discovering a new species of snake"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/2054",
    recordId: "Mercury_SC_416171",
    question: "How does sweat on the skin help the body?",
    options: ["Sweat heals cuts.", "Sweat feeds the skin.", "Sweat stops sunburn.", "Sweat cools the body."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/2055",
    recordId: "Mercury_SC_415335",
    question: "How does the Sun power the water cycle?",
    options: ["Energy from the Sun condenses water.", "Energy from the Sun collects water.", "Energy from the Sun evaporates water.", "Energy from the Sun precipitates water."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/2056",
    recordId: "NYSEDREGENTS_2012_4_14",
    question: "In order to maintain good health, humans should",
    options: ["drink alcohol often", "exercise regularly", "eat foods high in fat", "smoke tobacco occasionally"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/2057",
    recordId: "Mercury_7217613",
    question: "Which of the following is an abiotic factor in a river ecosystem?",
    options: ["dragonfly", "frog", "water", "trout"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/2058",
    recordId: "Mercury_7084088",
    question: "When a conclusion is reached after an experiment, which is most likely the first step other scientists might take when checking the conclusion?",
    options: ["change current models to fit the conclusion", "study the data to evaluate the conclusion", "develop new technologies based on the conclusion", "propose different conclusions from the same data"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/2059",
    recordId: "Mercury_7217683",
    question: "What allows for some organisms in a population to have an increased survival rate over other organisms of the same species?",
    options: ["genetic variation", "asexual reproduction", "species competition", "genetic mutation"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/2060",
    recordId: "Mercury_7064015",
    question: "Which environment is best for an organism that sleeps during the day and digs holes in the ground for shelter?",
    options: ["wetland", "desert", "rainforest", "tundra"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/2061",
    recordId: "Mercury_7034895",
    question: "One difference between a chemical formula and a chemical equation is that the chemical equation shows",
    options: ["what elements are in each molecule.", "the chemical reaction that takes place.", "abbreviations for each element.", "the number of atoms per element."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/2062",
    recordId: "Mercury_SC_LBS10588",
    question: "Plants that have stems that store water and no leaves would most likely live in a",
    options: ["pine forest.", "desert.", "rainforest.", "grassland."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/2063",
    recordId: "NYSEDREGENTS_2012_8_40",
    question: "Fossil fuels are considered nonrenewable because they",
    options: ["take millions of years to form", "are no longer used by humans", "produce pollution", "often contain microscopic animals"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/2064",
    recordId: "Mercury_SC_406718",
    question: "A baby bird must eat a lot of food to grow. During which stage of its life cycle is a butterfly most similar to a baby bird?",
    options: ["larva", "pupa", "adult", "egg"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/2065",
    recordId: "Mercury_7246313",
    question: "Which feature results when plates of different densities converge and one plate slips under the other?",
    options: ["a ridge", "a fault", "a rift zone", "a trench"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/2066",
    recordId: "VASoL_2009_3_32",
    question: "Which of these is the BEST sign that the fall season has begun?",
    options: ["Grass being wet in the morning", "Plants forming new buds", "Sun shining on flowers", "Leaves changing color on trees"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/2067",
    recordId: "Mercury_7221025",
    question: "Rheumatoid arthritis is an autoimmune disease that affects the joints. Which of these events causes the symptoms of this disease?",
    options: ["The cells of the immune system are absorbed by antigens.", "The cells of the immune system begin to grow rapidly.", "The body's immune system attacks specific tissues.", "The body's immune system fails to fight off infections."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/2068",
    recordId: "Mercury_SC_407450",
    question: "Chris stirs a cup of hot chocolate. He uses a wooden stick thinking it will stay cooler than a metal spoon. Which activity best describes the student's action?",
    options: ["asking a question", "comparing data", "forming a conclusion", "making a prediction"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/2069",
    recordId: "Mercury_SC_LBS10620",
    question: "Which would be best seen through a telescope?",
    options: ["a moon", "a light ray", "a cell", "a molecule"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/2070",
    recordId: "Mercury_SC_400132",
    question: "A student conducts an investigation testing a material's effectiveness as a heat insulator. Which tool will help the student conduct this investigation safely?",
    options: ["a ventilator hood", "a face mask", "plastic gloves", "insulated gloves"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/2071",
    recordId: "Mercury_401396",
    question: "Which equipment would best be used for an activity on a biochemistry unit?",
    options: ["meter stick, microscope, and test tubes", "Petri dish, dissecting equipment, and spring scale", "balance, telescope, and graduated cylinder", "test tube, hot plate, and safety goggles"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/2072",
    recordId: "Mercury_7098053",
    question: "When the fuel in a gasoline engine is burned, the energy conversion is from",
    options: ["electrical to kinetic.", "chemical to thermal.", "potential to nuclear.", "thermal to potential."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/2073",
    recordId: "Mercury_415270",
    question: "Some prokaryotes once classified in the domain Bacteria are now classified as",
    options: ["Archaea.", "Protista.", "Fungi.", "Plantae."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/2074",
    recordId: "Mercury_7213763",
    question: "Which of these is the primary source of energy in food webs?",
    options: ["soil", "producer", "consumer", "sunlight"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/2075",
    recordId: "NAEP_2005_8_S11+3",
    question: "An unusual type of fossil clam is found in rock layers high in the Swiss Alps. The same type of fossil clam is also found in the Rocky Mountains of North America. From this, scientists conclude that",
    options: ["the layers of rocks in which the fossils were found are from the same geologic age", "clams once lived in mountains, but have since evolved into sea-dwelling creatures", "glaciers carried the fossils up the mountains", "the Rocky Mountains and the Swiss Alps are both volcanic in origin"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/2076",
    recordId: "NYSEDREGENTS_2013_8_26",
    question: "The layered mixture of gases surrounding Earth is called the",
    options: ["lithosphere", "atmosphere", "hydrosphere", "hemisphere"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/2077",
    recordId: "Mercury_SC_409576",
    question: "Paul listens to music through his radio. Which best explains the sound Paul hears?",
    options: ["Sounds are forms of energy that are converted from light.", "Sounds are waves that travel through matter.", "Sounds are fluids that travel through air.", "Sounds are gases that transform into vibrations."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/2078",
    recordId: "NYSEDREGENTS_2010_4_21",
    question: "Plants are producers because they",
    options: ["make their own food", "take in nutrients", "can grow in soil", "need water to grow"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/2079",
    recordId: "Mercury_SC_401613",
    question: "A water hose was left running on a pile of dirt. What feature of stream erosion was most likely being demonstrated?",
    options: ["how water shapes a stream over time", "how layers of rocks and soil are formed along a stream", "the time it takes for deposition to occur along a stream", "the rate of water flow in a stream"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/2080",
    recordId: "Mercury_404892",
    question: "The best soil mixture for plant growth and drainage is",
    options: ["silt, pebbles, and clay.", "sand, rocks, and clay.", "humus, clay, and sand.", "clay, silt, and rocks."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/2081",
    recordId: "Mercury_7094605",
    question: "Which of these technologies helps a power company use renewable energy for the production of electricity?",
    options: ["hydroelectric power", "coal-fired power plants", "nuclear power plants", "natural gas generators"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/2082",
    recordId: "Mercury_SC_408782",
    question: "Windmills are used to obtain usable energy from wind. Which would be an advantage of using a windmill?",
    options: ["Pollution is not created by windmills.", "Windmills are expensive to build.", "Populations of birds can be reduced by windmills.", "The wind does not blow all the time."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/2083",
    recordId: "Mercury_SC_413532",
    question: "Which of these is an example of a new substance being formed?",
    options: ["water changing to steam", "a wall being painted", "paper being folded", "a nail rusting"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/2084",
    recordId: "VASoL_2010_3_28",
    question: "Which of these can make a shadow on the ground during the day?",
    options: ["Air", "River", "Thunder", "Cloud"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/2085",
    recordId: "Mercury_7216580",
    question: "Which system protects the body by responding to the presence of a virus?",
    options: ["immune system", "excretory system", "respiratory system", "skeletal system"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/2086",
    recordId: "Mercury_7227920",
    question: "The symptoms of influenza infection are partly caused by the",
    options: ["rapid genetic mutation in infected cells.", "consumption of the body's energy resources by viruses.", "release of toxins by viral particles.", "body's inflammatory response to infected cells."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/2087",
    recordId: "Mercury_416502",
    question: "Which cellular organelle modifies fatty acids?",
    options: ["mitochondrion", "Golgi complex", "chloroplast", "endoplasmic reticulum"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/2088",
    recordId: "Mercury_7234220",
    question: "Which part of Earth's structure exists in the solid phase due to low temperatures?",
    options: ["the asthenosphere", "the inner core", "the lithosphere", "the outer core"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/2089",
    recordId: "Mercury_SC_414130",
    question: "Which sea otter behavior is learned?",
    options: ["closing its ears under water", "cracking open clams with a rock", "using fur to trap air for warmth", "nursing its young for six months"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/2090",
    recordId: "Mercury_7234273",
    question: "The magnetic poles of Earth frequently change location. What is the direct cause of this change in magnetic pole location?",
    options: ["convection cells in the lower mantle", "molten rock flowing in the asthenosphere", "turbulence in the liquid outer core", "radioactive decay in the solid inner core"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/2091",
    recordId: "MCAS_1998_4_24",
    question: "Years ago, most family members lived near one another. Today, family members often live all over the country. People are able to live far from their loved ones because of the technologies of",
    options: ["medicine and computers.", "refrigeration and heating systems.", "manufacturing and home entertainment.", "communication and transportation."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/2092",
    recordId: "AKDE&ED_2008_8_5",
    question: "Which two body systems would most directly remove extra fluid from a person's lungs?",
    options: ["nervous and digestive", "respiratory and digestive", "respiratory and circulatory", "nervous and circulatory"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/2093",
    recordId: "Mercury_SC_400126",
    question: "Sedimentary rock helps scientists piece together the history of Earth most likely using clues from",
    options: ["gravel.", "soil.", "fossils.", "humus."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/2094",
    recordId: "NYSEDREGENTS_2010_4_26",
    question: "The energy that is stored in food originally comes from",
    options: ["sunlight", "air", "water", "soil"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/2095",
    recordId: "VASoL_2007_5_17",
    question: "Which of these shows how frozen water changes as the temperature of the air increases?",
    options: ["Solid -> gas -> liquid", "Gas -> liquid -> solid", "Liquid -> gas -> solid", "Solid -> liquid -> gas"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/2096",
    recordId: "MCAS_2005_5_14",
    question: "Which of the following properties best describes a material's ability to resist scratching?",
    options: ["weight", "hardness", "length", "flexibility"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/2097",
    recordId: "Mercury_7247100",
    question: "Scientists noted that muscles and bones would need physical stress to remain healthy during manned space flights. Which of these had to be planned for because of this need?",
    options: ["counseling activities for tension", "monitoring circadian rhythms", "exercising to maintain strength", "practicing space walking"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/2098",
    recordId: "ACTAAP_2010_7_16",
    question: "If a species of bird stopped reproducing, which of these would happen?",
    options: ["The bird's prey species would decrease in number.", "Trees where these birds build nests would grow taller.", "The food web that the bird belongs to would collapse.", "This bird species would eventually disappear from nature."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/2099",
    recordId: "Mercury_SC_405935",
    question: "When performing a new experiment for the first time, a scientist reaches an unexpected conclusion. What must the scientist do in order to have the conclusion accepted by other scientists?",
    options: ["make a data chart", "write a brief report", "purchase new equipment", "repeat the experiment"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/2100",
    recordId: "NYSEDREGENTS_2008_8_4",
    question: "Which system produces most of the hormones in the human body?",
    options: ["respiratory", "endocrine", "digestive", "circulatory"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/2101",
    recordId: "NYSEDREGENTS_2012_4_4",
    question: "Which tool should a student use to see the patterns on a small object?",
    options: ["thermometer", "balance", "graduated cylinder", "hand lens"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/2102",
    recordId: "MCAS_2000_4_25",
    question: "Robots are used to help manufacture cars. One problem with this is",
    options: ["less waste.", "fewer jobs.", "more mistakes.", "lower cost."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/2103",
    recordId: "Mercury_7252298",
    question: "Which two body systems interact to produce antibodies that require essential amino acids?",
    options: ["digestive and reproductive systems", "digestive and immune systems", "endocrine and respiratory systems", "integumentary and circulatory systems"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/2104",
    recordId: "MEA_2010_8_19",
    question: "Which chemical is a compound?",
    options: ["hydrochloric acid (HCl)", "nitrogen (N2)", "hydrogen (H2)", "helium (He)"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/2105",
    recordId: "MCAS_2006_9_36",
    question: "Two spotted leopards produce a litter of four cubs. Three of the cubs are spotted and one is solid black. The black coat is probably what type of trait?",
    options: ["dominant", "recessive", "sex-linked", "polygenic"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/2106",
    recordId: "NYSEDREGENTS_2010_8_32",
    question: "Which physical property is used to identify a mineral based on its resistance to being scratched?",
    options: ["color", "density", "hardness", "streak"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/2107",
    recordId: "MCAS_2006_9_28",
    question: "A negatively charged rubber rod was brought near some small pieces of paper. The rod's charges repelled the negative charges in the pieces. Which of the following caused the repulsion of the negative charges?",
    options: ["induction", "insulation", "conduction", "gravitation"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/2108",
    recordId: "Mercury_7128240",
    question: "Mangrove trees are affected by several factors. Which is an abiotic factor contributing to the energy cycle of a mangrove ecosystem?",
    options: ["rocks", "fungi", "bacteria", "climate"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/2109",
    recordId: "Mercury_7033635",
    question: "What does a light-year measure?",
    options: ["time", "distance", "brightness", "mass"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/2110",
    recordId: "Mercury_405771",
    question: "Which of these structures in a plant cell allows a plant to make food?",
    options: ["chromosomes", "cytoplasm", "cell wall", "chloroplast"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/2111",
    recordId: "Mercury_SC_408629",
    question: "Patricia and her classmates are visiting different rocky areas in the city. They want to know what kind of rocks can be found in each area. If the investigation is done correctly, what will Patricia and her classmates do each time they visit an area?",
    options: ["measure the rock masses and lengths", "record the rock types and locations", "draw the rock shapes", "count the rock numbers"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/2112",
    recordId: "Mercury_400806",
    question: "The electrical charge of the nucleus of an atom is +12. How many electrons does the atom have in its neutral state?",
    options: ["18", "6", "24", "12"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/2113",
    recordId: "Mercury_7207148",
    question: "Which of these is a reason that scientists revise theories?",
    options: ["experimental results that support a revised theory", "corporate sponsorship of a revised theory", "government policy based on a revised theory", "public opinion in favor of a revised theory"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/2114",
    recordId: "Mercury_7205328",
    question: "Which of the following results when hydrogen and chlorine chemically bond to form hydrogen chloride?",
    options: ["a compound", "a precipitate", "a mixture", "a solution"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/2115",
    recordId: "Mercury_7071663",
    question: "Scientists are able to conclude that a forested ecosystem existed in Antarctica millions of years ago by studying",
    options: ["the current climate.", "seafloor spreading.", "the fossil record.", "glacial movement."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/2116",
    recordId: "NYSEDREGENTS_2012_4_3",
    question: "Which Earth movement results in day and night?",
    options: ["rotation", "erosion", "deposition", "revolution"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/2117",
    recordId: "Mercury_416686",
    question: "Upwelling moves the water of the deep ocean to the ocean's surface. What else does upwelling move to the surface?",
    options: ["fish", "phytoplankton", "dissolved gases", "nutrients"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/2118",
    recordId: "Mercury_7011235",
    question: "Which body system functions by bringing in oxygen and removing carbon dioxide?",
    options: ["endocrine", "urinary", "digestive", "respiratory"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/2119",
    recordId: "Mercury_7090668",
    question: "A topographic map is primarily used to determine the",
    options: ["number of continents in the world.", "elevation of an area.", "location of major cities in the country.", "rainfall of desert regions."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/2120",
    recordId: "Mercury_7001628",
    question: "A change in the pattern of warm ocean currents can cause a climate change by",
    options: ["releasing thermal energy in irregular spurts.", "moving thermal energy from one place to another.", "absorbing thermal energy from the Sun's rays.", "increasing the ocean's capacity for absorbing thermal energy."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/2121",
    recordId: "Mercury_407263",
    question: "Which part of digestion is mainly a chemical change?",
    options: ["Throat muscles push food toward the stomach.", "Teeth break food into small pieces.", "Stomach acids dissolve food into nutrients.", "Intestinal cells transport nutrients into the blood."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/2122",
    recordId: "MEA_2013_5_7",
    question: "Which object is best seen with a microscope?",
    options: ["chicken leg", "oak leaf", "cow heart", "human cell"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/2123",
    recordId: "TIMSS_2007_4_pg70",
    question: "In which example does an object move because of the force of gravity?",
    options: ["a girl hammering a nail into a wall", "a boy pushing a box across the floor", "a boy falling from a tree onto the ground", "a girl hitting a ball with a bat"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/2124",
    recordId: "Mercury_7165043",
    question: "The U.S. Environmental Protection Agency (EPA) was established in 1970 to address problems that existed in the environment. Which is the EPA most likely interested in reducing?",
    options: ["the amount of oxygen produced by trees", "the amount of ozone in the stratosphere", "the emissions from volcanic activity", "the level of pollution caused by people"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/2125",
    recordId: "Mercury_7057768",
    question: "In order for plants to grow, the cells require nutrients in the form of minerals. The minerals come from",
    options: ["pollen.", "soil.", "air.", "water."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/2126",
    recordId: "Mercury_7227903",
    question: "HIV makes the body vulnerable to secondary infections by targeting",
    options: ["helper T-cells.", "cells.", "killer T-cells.", "macrophages."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/2127",
    recordId: "ACTAAP_2014_5_5",
    question: "A student is investigating the properties of a mineral. The student tests the mineral by putting it under an ultraviolet light. Which property of the mineral can be identified using this test?",
    options: ["luster", "streak", "color", "fluorescence"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/2128",
    recordId: "Mercury_7026933",
    question: "A student plans to grow algal colonies in solutions with different concentrations of liquid fertilizer. Which is a clear and testable hypothesis to guide this investigation?",
    options: ["Algae like fertilizer.", "Fertilizer is good for algae.", "Algal growth rate increases with fertilizer concentration.", "Fertilizer improves the genetic traits of algae."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/2129",
    recordId: "Mercury_SC_402284",
    question: "Which process is taking place when water freezes between cracks in rocks?",
    options: ["deposition", "sedimentation", "weathering", "crystallization"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/2130",
    recordId: "Mercury_7183103",
    question: "The human body temperature is normally 98.6°F. As a person exercises, the body temperature starts to increase. As a result of the increased body temperature, the perspiration process begins to cool the body. Which best describes what the body is doing when it perspires?",
    options: ["increasing osmosis", "reducing transpiration", "controlling metabolism", "maintaining homeostasis"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/2131",
    recordId: "TIMSS_2007_8_pg63",
    question: "In living organisms, the level of organization from least complex to most complex is",
    options: ["tissue, cell, organ, organism", "tissue, organ, cell, organism", "cell, tissue, organ, organism", "cell, organ, tissue, organism"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/2132",
    recordId: "Mercury_7094115",
    question: "Which type of model best shows the location of underwater ocean ridges?",
    options: ["world globe", "nautical chart", "topographic map", "satellite map"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/2133",
    recordId: "Mercury_SC_401221",
    question: "A student put a metal pot on the stove to boil some water. The metal transferred heat to the water through",
    options: ["insulation.", "convection.", "conduction.", "radiation."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/2134",
    recordId: "Mercury_SC_401300",
    question: "Which feature is a kitten most likely to inherit from its parents?",
    options: ["diet", "health", "color", "independence"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/2135",
    recordId: "Mercury_7264040",
    question: "Proteins are compounds formed in the cells of plants and animals. Which element is included in every protein molecule?",
    options: ["calcium", "sodium", "carbon", "fluorine"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/2136",
    recordId: "Mercury_SC_409014",
    question: "A rocket is traveling toward space. What force must the rocket act against as it moves away from Earth?",
    options: ["gravity", "magnetism", "inertia", "momentum"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/2137",
    recordId: "Mercury_SC_408554",
    question: "A group of workers needs to move a piano from the second floor of a building. The piano is too wide to fit through the door, so they will lower the piano to the ground through a window. Which tool would be best to help the workers lower the piano from the window?",
    options: ["wheel and axle", "inclined plane", "wedge", "pulley"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/2138",
    recordId: "Mercury_7267908",
    question: "Why is a spacesuit inflated like a balloon?",
    options: ["to protect astronauts from solar radiation", "to provide an oxygen supply for breathing", "to simulate the air pressure of Earth", "to help astronauts float in outer space"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/2139",
    recordId: "Mercury_7137270",
    question: "Which term best describes the process responsible for cave formation that results from rock being dissolved by groundwater?",
    options: ["sedimentation", "glacial movement", "chemical weathering", "abrasion"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/2140",
    recordId: "Mercury_SC_401803",
    question: "What happens to colored sugar when it is added to water?",
    options: ["The sugar becomes white and the water changes color.", "The sugar evaporates and the water changes color.", "The sugar reacts and colors the water.", "The sugar dissolves and colors the water."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/2141",
    recordId: "LEAP_2004_8_10398",
    question: "Which statement about plant and animals cells is true?",
    options: ["Both use mitochondria to produce energy.", "Both have a large vacuole to store water.", "Both use chloroplasts to store energy.", "Both have a cell wall to give them support."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/2142",
    recordId: "Mercury_7271723",
    question: "Farm fertilizers are often carried by runoff into the Mississippi River and down to the Gulf of Mexico, resulting in algae blooms. Which of these results from the decomposition of the algae blooms?",
    options: ["a reduction in atmospheric carbon dioxide", "an abundance of dissolved oxygen", "food webs with rapidly growing populations", "dead zones where there are no fish"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/2143",
    recordId: "Mercury_SC_406475",
    question: "Jennifer is jumping rope. Which type of characteristic is she most likely demonstrating?",
    options: ["learned", "recessive", "inherited", "instinctive"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/2144",
    recordId: "Mercury_7165795",
    question: "A teacher breaks a bar of pure copper into two different sized pieces. Which is the most likely difference between the two pieces?",
    options: ["texture", "melting point", "mass", "boiling point"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/2145",
    recordId: "Mercury_7185185",
    question: "Blood is a fluid made up of several different parts. What level of structural organization best describes blood?",
    options: ["a cell", "a tissue", "an organ", "a system"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/2146",
    recordId: "ACTAAP_2014_5_6",
    question: "Scientists found large areas of fossilized wood in a desert in Arizona. The fossilized wood is evidence of the ancient environment. Based on the evidence, what was the ancient environment in this area?",
    options: ["glacier", "grasslands", "desert", "forest"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/2147",
    recordId: "MCAS_2003_5_28",
    question: "Ruben is using a compass to find out which direction the wind is blowing. Which of the following would be best for him to observe to help him find the direction of the wind?",
    options: ["the temperature on a thermometer", "a flag on a pole", "the shadow of a building", "birds flying above the trees"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/2148",
    recordId: "Mercury_SC_407701",
    question: "A farmer predicts a new sprinkler will keep water from being wasted. What term best describes this prediction?",
    options: ["observation", "variable", "experiment", "hypothesis"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/2149",
    recordId: "Mercury_401215",
    question: "Tides on Earth are mostly caused by the gravitational pull of",
    options: ["the Moon.", "stars.", "the Sun.", "asteroids."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/2150",
    recordId: "MEAP_2005_8_15",
    question: "When rain falls on the land, some of it is absorbed by surface sediment. How porous the surface sediments are controls how much water is absorbed. Which of the following will most likely result in an area where surface sediment is NOT porous?",
    options: ["spring formation", "droughts", "flooding", "tornadoes"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/2151",
    recordId: "MCAS_2003_8_12",
    question: "Which of the following parts of a car belongs to its control system?",
    options: ["fuel tank", "hydraulic jack", "steering wheel", "windshield wipers"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/2152",
    recordId: "Mercury_SC_401257",
    question: "Which substance can be used to conduct electricity in a circuit?",
    options: ["rubber", "metal", "plastic", "wood"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/2153",
    recordId: "NYSEDREGENTS_2008_8_7",
    question: "Which unit is used to express the amount of energy in food?",
    options: ["Calorie", "degree Celsius", "gram", "milliliter"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/2154",
    recordId: "MSA_2012_5_1",
    question: "A student measured how quickly a car rolled down a hill. Which tool should the student have used to measure how quickly the car rolled down the hill?",
    options: ["a centimeter ruler", "a stopwatch", "a hand lens", "a thermometer"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/2155",
    recordId: "Mercury_407767",
    question: "Water at 20 degrees Celsius is placed on a stove. As the water is heated, thermal energy is absorbed by the water. If the water is heated to a maximum temperature of 80 degrees Celsius, what happens as a result of the increased temperature?",
    options: ["The potential energy increases.", "The entropy increases.", "The evaporation decreases.", "The disorder decreases."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/2156",
    recordId: "Mercury_7077525",
    question: "The electromagnetic spectrum is described as a",
    options: ["series of colors of the rainbow.", "band of frequencies of light waves.", "range of conductivity of metals.", "list of radioactive elements."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/2157",
    recordId: "MCAS_2002_8_8",
    question: "Which of the following is most important in producing the seasons on Earth?",
    options: ["the tilt of Earth's axis as it revolves around the Sun", "the Moon's revolution around Earth", "Earth's gravitational attraction to the Sun", "the distance of Earth from the Sun"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/2158",
    recordId: "NAEP_2000_8_S21+8",
    question: "Which of the following is designed to convert energy into mechanical work?",
    options: ["Kerosene heater", "Electric fan", "Baking oven", "Flashlight"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/2159",
    recordId: "MCAS_2009_5_6511",
    question: "A student hears the sound of a bell. Which of the following carries the sound of the bell to the student?",
    options: ["vibrating air", "electrical currents", "radio waves", "magnetic signals"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/2160",
    recordId: "MCAS_2000_8_34",
    question: "The first stage of soil formation is the weathering of rock into fine particles. To make a good soil for growing plants, which would be best to add to the rock particles?",
    options: ["minerals", "silt", "organic matter", "sand"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/2161",
    recordId: "ACTAAP_2007_7_30",
    question: "Which best describes a scientific theory?",
    options: ["It is true, once written.", "It is determined in a court of law.", "It is different for each continent.", "It is still being tested."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/2162",
    recordId: "Mercury_SC_406000",
    question: "Scientists are studying the factors that influence the climate of a region. In attempts to gather accurate data, the scientists should use data that includes the",
    options: ["type of weather that has occurred.", "types of organisms in the environment.", "number of people living in the area.", "number of earthquakes that occur each year."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/2163",
    recordId: "Mercury_SC_415699",
    question: "Why do two surfaces get warm when they are rubbed together?",
    options: ["Moving objects produce heat energy.", "Friction changes energy of motion to heat energy.", "Energy is transferred between the two surfaces.", "The surfaces absorb energy from the air."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/2164",
    recordId: "Mercury_SC_402125",
    question: "Two high tides and two low tides occur on Earth every",
    options: ["day.", "hour.", "week.", "month."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/2165",
    recordId: "Mercury_7082478",
    question: "A book placed on a table is observed to remain stationary. Which statement about the observation would be considered a fact rather than an opinion?",
    options: ["The table is composed of a stronger material than the book.", "The book is not very heavy.", "The book probably has a sticky cover.", "The table pushes up on the book."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/2166",
    recordId: "Mercury_7220955",
    question: "Having students wash their hands frequently with soap and water will limit the spread of infectious disease by",
    options: ["protecting harmless bacterial cells.", "removing viruses and bacteria from the skin.", "changing viral and bacterial nucleic acids.", "releasing mutated cells from pores."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/2167",
    recordId: "VASoL_2007_5_10",
    question: "Which object helps people understand what makes up white light?",
    options: ["Thermometer", "Microscope", "Barometer", "Prism"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/2168",
    recordId: "Mercury_7217875",
    question: "Water vapor sometimes condenses into stratus clouds that are in contact with the ground. What forms as a result of this process?",
    options: ["smoke", "fog", "ozone", "methane"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/2169",
    recordId: "TIMSS_2003_8_pg18",
    question: "One of the main causes of acid rain is",
    options: ["Spills from chemical manufacturing plants", "Gases from burning fossil fuels", "Waste from nuclear power plants", "Gases from aerosol spray cans"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/2170",
    recordId: "VASoL_2009_3_29",
    question: "Which of these activities makes the MOST air pollution?",
    options: ["Recycling trash bags", "Burning trash bags", "Storing trash bags", "Reusing trash bags"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/2171",
    recordId: "Mercury_179218",
    question: "The Hardy-Weinberg law is only valid when",
    options: ["immigration into the population is occurring.", "the population is small.", "migration into the population is occurring.", "the population is large."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/2172",
    recordId: "Mercury_SC_400192",
    question: "Deposition of sediment during floods makes the land near some rivers",
    options: ["unstable.", "hilly.", "fertile.", "acidic."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/2173",
    recordId: "MSA_2012_5_34",
    question: "Old, worn-out rubber tires are called scrap tires. Which way of disposing of scrap tires is best for the environment?",
    options: ["dumping the tires in a lake", "burning the tires", "burying the tires in a landfill", "taking the tires to a recycling center"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/2174",
    recordId: "Mercury_7221463",
    question: "Which material is the best conductor of heat at room temperature?",
    options: ["sulfur", "water", "air", "copper"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/2175",
    recordId: "Mercury_7001855",
    question: "A student drops a white tablet into a glass of water, producing carbon dioxide gas. This is a demonstration of",
    options: ["the movement of electricity.", "the creation of matter.", "a change of state.", "a chemical reaction."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/2176",
    recordId: "Mercury_7083563",
    question: "Which of these is a structure that is present in all organisms?",
    options: ["a brain", "a cell", "a stomach", "a tissue"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/2177",
    recordId: "Mercury_7213483",
    question: "Which set of conditions will produce an electric current in a closed loop of wire?",
    options: ["a magnet touching the loop of wire", "a magnet at rest outside the loop of wire", "a magnet at rest inside the loop of wire", "a magnet passing through the loop of wire"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/2178",
    recordId: "Mercury_7234115",
    question: "Extensive folding of sedimentary rock layers on Earth provides indirect evidence of certain processes occurring throughout Earth's history. Which of these is most likely one of these processes?",
    options: ["convective heat loss from Earth's mantle", "increase in the density of Earth's atmosphere", "slowing of the rotation of Earth's core", "slow increase in the distance of Earth's orbit"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/2179",
    recordId: "Mercury_7221218",
    question: "An ice cube melts on a hot summer day because the energy of the particles",
    options: ["is converted into potential energy.", "increases and the particles move apart.", "decreases over a period of time and is lost.", "causes the particles to move closer together."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/2180",
    recordId: "Mercury_7004008",
    question: "The relationship between ticks and a dog can best be described as",
    options: ["commensalism.", "competition.", "parasitism.", "mutualism."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/2181",
    recordId: "TIMSS_2007_4_pg82",
    question: "Small grasshoppers shed their outer covering as they grow larger. Which animal also sheds its outer covering as it grows larger?",
    options: ["snake", "human", "fish", "frog"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/2182",
    recordId: "Mercury_400715",
    question: "Two atoms of oxygen combine to form pure oxygen gas. What is the electrical charge of the O_{2} molecules?",
    options: ["positive", "neutral", "variable", "negative"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/2183",
    recordId: "Mercury_7018533",
    question: "Which is not a type of electromagnetic wave?",
    options: ["microwave", "x-ray", "sound wave", "radio wave"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/2184",
    recordId: "ACTAAP_2007_7_33",
    question: "What is one way to help slow down or stop the greenhouse effect?",
    options: ["clean up the water pollution in local lakes", "clean up the litter in neighborhoods", "walk or ride a bike instead of driving a car", "find new coal resources in the earth"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/2185",
    recordId: "Mercury_7041528",
    question: "Great distances in space are measured in",
    options: ["kilometers.", "megameters.", "light years.", "astronomical units."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/2186",
    recordId: "MCAS_2002_8_12",
    question: "Which of the following gives a plant cell its rigid structure?",
    options: ["cell wall", "nucleus", "chloroplast", "cell membrane"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/2187",
    recordId: "Mercury_SC_415455",
    question: "Which alternative energy resource changes part of a river into a lake?",
    options: ["hydropower", "biofuel energy", "solar energy", "geothermal energy"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/2188",
    recordId: "MCAS_2006_8_10",
    question: "A student in a laboratory transfers a beaker containing a hot solution from the lab table to a cool water bath. Which of the following parts of the system experiences an increase in heat energy?",
    options: ["water bath", "solution", "beaker", "lab table"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/2189",
    recordId: "LEAP__5_10317",
    question: "Which example best illustrates kinetic energy?",
    options: ["a comet that is flying through space", "a battery that is connected to a circuit", "a light bulb that is turned on", "a car that is parked on top of a hill"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/2190",
    recordId: "Mercury_7041563",
    question: "Which theory about the origin of the universe states that a densely packed sphere exploded, forming clouds that condensed into galaxies?",
    options: ["the Big Bang theory", "the Steady State theory", "the Oscillating theory", "the Galaxy theory"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/2191",
    recordId: "Mercury_417464",
    question: "Which characteristic is shared by all members of Arthropoda and Chordata phyla?",
    options: ["mandibles", "simple eyes", "jointed limbs", "one pair of wings"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/2192",
    recordId: "MCAS_2004_9_7",
    question: "Which of the following is certain to change as a ball accelerates?",
    options: ["velocity of the ball", "mass of the ball", "force acting on the ball", "inertia of the ball"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/2193",
    recordId: "Mercury_7143080",
    question: "One year a farmer decided not to plant crops in one of his fields. During that year his farm received a greater amount of precipitation than normal. Which will most likely occur in that unplanted field as a result of the greater precipitation?",
    options: ["more carbon dioxide will be trapped in the field", "animals will dig burrows in the field", "erosion of topsoil will increase in the field", "invasive species will inhabit the field"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/2194",
    recordId: "TIMSS_2003_8_pg122",
    question: "Which group of energy sources are ALL renewable?",
    options: ["coal, oil, and natural gas", "natural gas, solar, and tidal", "solar, oil, and geothermal", "wind, solar, and tidal"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/2195",
    recordId: "TIMSS_2011_8_pg66",
    question: "What happens to the molecules of a liquid when the liquid cools?",
    options: ["They decrease in size", "They speed up.", "They slow down.", "They decrease in number"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/2196",
    recordId: "Mercury_7201758",
    question: "Some individuals are unable to digest the lactose found in the milk of cows. The digestive systems of these individuals most likely lack which?",
    options: ["an ability to produce lactose internally", "a lipid that coats lactose molecules", "an enzyme that catalyzes lactose breakdown", "a tolerance to lactose developed during childhood"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/2197",
    recordId: "MDSA_2012_8_35",
    question: "Use the information below to answer the question. The human body is composed of different systems made of specialized cells, tissues, and organs. Each of these structures has a specific function that aids in the survival of the human species. Which organs are used in reproduction?",
    options: ["mouth, stomach, and gallbladder", "ovaries, uterus, and fallopian tubes", "lungs, esophagus, and heart", "brain, spinal cord, and eyes"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/2198",
    recordId: "MCAS_2005_9_16",
    question: "Which of the following best describes the relationship between frequency and wavelength of electromagnetic waves?",
    options: ["The wavelength decreases as the frequency decreases.", "If the wavelength remains constant, the frequency increases.", "If the frequency remains constant, the wavelength increases.", "The frequency increases as the wavelength decreases."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/2199",
    recordId: "Mercury_7267855",
    question: "Which pair would be most necessary for life to develop on another planet?",
    options: ["sulfur and nitrogen", "chlorophyll and oxygen", "liquid water and carbon", "helium and hydrogen"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/2200",
    recordId: "Mercury_7037363",
    question: "How are light and sound similar?",
    options: ["They both travel at the same speed.", "They are both electromagnetic.", "They are both waves.", "They both travel through a vacuum."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/2201",
    recordId: "Mercury_406955",
    question: "When heated, mercuric oxide decomposes to form liquid mercury and oxygen. A scientist heated 10 grams (g) of mercuric oxide and formed 9.3 grams of liquid mercury. How many grams of oxygen were formed?",
    options: ["10.0 g", "9.3 g", "19.3 g", "0.7 g"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/2202",
    recordId: "TIMSS_2003_8_pg19",
    question: "When chlorine gas reacts with sodium metal, what type of substance is formed?",
    options: ["A solution", "A compound", "A mixture", "An element", "An alloy"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/2203",
    recordId: "NYSEDREGENTS_2012_8_12",
    question: "A structure that carries a single unit of hereditary information is a",
    options: ["gene", "pedigree chart", "sex cell", "tissue"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/2204",
    recordId: "MCAS_2013_8_29434",
    question: "Muscle cells need to quickly convert energy from food molecules into a usable form. For this reason, which of the following do muscle cells have in greater numbers than most other types of cells?",
    options: ["vacuoles", "chromosomes", "nuclei", "mitochondria"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/2205",
    recordId: "VASoL_2009_3_7",
    question: "Which would help conserve water?",
    options: ["Wash the car every day", "Water the lawn every day", "Turn off water while brushing teeth", "Run the dishwasher after each meal"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/2206",
    recordId: "Mercury_SC_407444",
    question: "Which of these are both supplied to Earth by the Sun?",
    options: ["heat and light", "gravity and magnetism", "friction and electricity", "coal and oil"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/2207",
    recordId: "Mercury_7001348",
    question: "A red flowered plant (RR) is crossed with a white flowered plant (WW) and produces plants with pink flowers (RW). If two pink flowered plants are crossed, what color offspring could be produced?",
    options: ["pink and red", "pink and white", "red and white", "red, white, and pink"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/2208",
    recordId: "Mercury_417569",
    question: "Which is the most accurate model to show how amino acids form proteins?",
    options: ["cars on a train", "petals on a flower", "pieces in a jigsaw puzzle", "bees in a hive"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/2209",
    recordId: "Mercury_7115098",
    question: "What is the main function of the chloroplasts in plant cells?",
    options: ["to make the cell divide", "to produce glucose", "to allow the plant to reproduce", "to keep the cell rigid"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/2210",
    recordId: "Mercury_7094815",
    question: "Gravity can be defined as a force of attraction between objects. The effects of gravity can be witnessed in many systems. Which of these actions is an example of gravity influencing other systems?",
    options: ["surface water evaporating into the atmosphere", "glaciers melting because of increasing temperatures", "planets moving around the Sun in an elliptical pattern", "groundwater moving to the surface in an artesian well"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/2211",
    recordId: "Mercury_7236058",
    question: "Which characteristic of a cold-water upwelling near the coast of Northern California results in a large concentration of marine organisms?",
    options: ["increased availability of dissolved oxygen", "loss of thermal stability", "consistent surface-current flow rate", "high nutrient concentration"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/2212",
    recordId: "Mercury_7162488",
    question: "When mountains are formed, there is an interaction between areas of Earth. Which two will interact and result in the formation of mountains?",
    options: ["asthenosphere and lithosphere", "troposphere and ionosphere", "hydrosphere and lithosphere", "hydrosphere and biosphere"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/2213",
    recordId: "Mercury_SC_401602",
    question: "A model of the Moon would be different from a model of Earth in that the Moon should",
    options: ["have a source of light inside.", "be smaller than Earth.", "have fewer impact craters on the surface.", "have a smoother surface than Earth."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/2214",
    recordId: "MCAS_2010_8_12013",
    question: "Which of the following correctly lists the structures in space from smallest to largest?",
    options: ["star, universe, solar system, galaxy", "star, galaxy, solar system, universe", "star, solar system, universe, galaxy", "star, solar system, galaxy, universe"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/2215",
    recordId: "Mercury_SC_415478",
    question: "Some changes are fast. Some changes are slow. Which of these changes is most likely the slowest?",
    options: ["landslide", "flood", "drought", "fire"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/2216",
    recordId: "Mercury_179113",
    question: "Which of these diseases is caused by a bacterium?",
    options: ["strep throat", "chicken pox", "influenza", "rabies"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/2217",
    recordId: "Mercury_SC_415001",
    question: "When is the most energy transferred from the Sun to water in the water cycle?",
    options: ["during collection", "during precipitation", "during evaporation", "during condensation"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/2218",
    recordId: "Mercury_LBS10254",
    question: "Which of the following shows the correct sequence of inventions?",
    options: ["Doppler radar -> microphone -> telescope", "printing press -> microscope -> telephone", "airplane -> microphone -> radio", "television -> automobile -> microwave"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/2219",
    recordId: "NYSEDREGENTS_2010_4_27",
    question: "When two animals live in the same area and depend on the same organism for food, they are",
    options: ["competing", "decomposing", "germinating", "hibernating"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/2220",
    recordId: "Mercury_7142958",
    question: "Which statement describes a primary function of the cell wall of a plant cell?",
    options: ["The cell wall provides structural support.", "The cell wall stores DNA.", "The cell wall manufactures proteins.", "The cell wall performs photosynthesis."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/2221",
    recordId: "NYSEDREGENTS_2012_4_6",
    question: "Which metric units should be used to describe the mass of an object?",
    options: ["degrees Celsius", "liters", "grams", "centimeters"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/2222",
    recordId: "NYSEDREGENTS_2010_4_3",
    question: "Which form of energy is produced when a guitar string vibrates?",
    options: ["chemical", "sound", "magnetic", "light"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/2223",
    recordId: "Mercury_SC_408703",
    question: "Andre learned that plants survive through a process called photosynthesis. Which substance do plants produce during photosynthesis?",
    options: ["sugar", "nitrogen", "minerals", "soil"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/2224",
    recordId: "Mercury_7128188",
    question: "For years, scientists have classified plants according to their characteristics. Which most likely has led scientists to better identify and discover new species of plants?",
    options: ["understanding the process of mitosis", "development of the scientific method", "construction of 3-D models", "advances in the study of DNA"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/2225",
    recordId: "Mercury_SC_400177",
    question: "Which material best conducts heat and electricity?",
    options: ["metal", "wood", "rubber", "plastic"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/2226",
    recordId: "MEA_2014_8_7",
    question: "Which two characteristics affect a planet's gravitational attraction to the Sun?",
    options: ["length of day and distance from the Sun", "volume and length of day", "mass and volume", "distance from the Sun and mass"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/2227",
    recordId: "Mercury_7037380",
    question: "When a prairie ecosystem was disturbed, an invasive grass species outcompeted the native grass. The new grass had less nutritional value for the organisms living in the area. Which category of organism will be affected by this change first?",
    options: ["herbivores", "decomposers", "scavengers", "predators"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/2228",
    recordId: "Mercury_7217718",
    question: "In the 1970s, the pesticide DDT was used to kill insects that damaged fruit and vegetable crops. Most insects died from being exposed to DDT, but some survived. These surviving insects contributed to an increase in their population by",
    options: ["competing with other types of insects for food.", "migrating to habitats that had different types of crops.", "learning how to avoid being exposed to DDT.", "passing the gene for DDT resistance to their offspring."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/2229",
    recordId: "Mercury_7110303",
    question: "Binary stars orbit around the center of mass of the two stars. What causes the stars to remain together?",
    options: ["nuclear reactions in the stars", "energy released from the stars", "magnetic attraction between the stars", "gravity between the stars"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/2230",
    recordId: "Mercury_7122850",
    question: "After a star runs out of most of its hydrogen fuel, it becomes hotter and more luminous. What stage does this represent in the life cycle of a star?",
    options: ["white dwarf", "red giant", "protostar", "quasar"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/2231",
    recordId: "LEAP_2009_8_10429",
    question: "How does no-till farming help the environment?",
    options: ["It increases soil removal.", "It increases fertilizer use.", "It decreases soil erosion.", "It decreases crop yield."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/2232",
    recordId: "MCAS_2004_8_25",
    question: "In a laboratory, a sealed container with 100 g of steam is cooled until all the steam becomes a liquid. The container is then cooled further until all the water becomes a solid. Which of the following remains constant during both of these changes?",
    options: ["the mass of the water", "the position of the atoms in the container", "the total energy of the water", "the pressure in the container"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/2233",
    recordId: "MCAS_2004_5_25",
    question: "A student has decided to investigate whether the number of flowers on a plant will increase if the water supply to the plant is increased. She has five pots of geranium plants to use in her experiment. What factor in the experiment should be varied for the five plants in order to answer the student's question?",
    options: ["temperature of water", "number of hours in sunlight", "volume of water", "age of seedlings"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/2234",
    recordId: "MCAS_1999_8_10",
    question: "The energy that allows the water cycle to occur comes from",
    options: ["radioactive decay.", "the Sun.", "friction.", "electricity."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/2235",
    recordId: "Mercury_7075110",
    question: "Organisms that are classified as multicellular must have",
    options: ["identical cells.", "more than one cell.", "only one cell.", "large cells."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/2236",
    recordId: "TIMSS_2003_4_pg21",
    question: "Where does air go when a person breathes in?",
    options: ["Into the stomach", "Into the lungs", "Into the heart", "Into the liver"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/2237",
    recordId: "NCEOGA_2013_8_16",
    question: "Kudzu vines grow by climbing and wrapping around trees. Trees covered by kudzu can die because they are starved of sunlight. What type of relationship exists between the trees and the kudzu growing on them?",
    options: ["predator-prey", "mutualism", "competition", "parasitism"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/2238",
    recordId: "NCEOGA_2013_8_48",
    question: "In the United States, which is responsible for ensuring the safety of the country's drinking water?",
    options: ["Center for Disease Control (CDC)", "Food and Drug Administration (FDA)", "National Oceanic and Atmospheric Administration (NOAA)", "Environmental Protection Agency (EPA)"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/2239",
    recordId: "VASoL_2009_5_18",
    question: "A student makes a fruit drink by stirring a powdered mix into cold water. Why is the fruit drink a solution?",
    options: ["The powder dissolves in the water.", "The student stirs the water.", "The water is the proper temperature.", "The water changes color."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/2240",
    recordId: "Mercury_416468",
    question: "Which life function is the same for an amoeba as for other freshwater protists?",
    options: ["the process used to remove waste products from their cytoplasm", "the method used to obtain nutrients and energy", "the method used to detect changes in their environment", "the process used to constantly remove excess water"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/2241",
    recordId: "Mercury_7032848",
    question: "Proxima Centauri is the closest star to the Sun. Which units do astronomers most often use for the distance between Earth and Proxima Centauri?",
    options: ["meters", "miles", "astronomical units", "light years"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/2242",
    recordId: "NYSEDREGENTS_2015_8_22",
    question: "One positive effect of recycling aluminum cans to manufacture new beverage containers is",
    options: ["increasing the ozone layer", "conserving Earth's resources", "creating acid rain", "warming Earth's atmosphere"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/2243",
    recordId: "Mercury_SC_402112",
    question: "Students are conducting an investigation to see how sunlight affects the speed of plant growth. They measure the growth of the plant at the end of two weeks. What would be the best way to communicate the results of this investigation?",
    options: ["make a chart or graph", "make some notes", "tell the science teacher", "draw a picture"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/2244",
    recordId: "Mercury_412701",
    question: "The conservation of matter can be demonstrated by using chemical equations. Which chemical equation demonstrates the conservation of matter?",
    options: ["4P + 5HNO_{3} -> 5NO + 3H_{3}PO_{4}", "2Sn + 4HNO_{3} -> SnO_{2} + 4NO_{2} + H_{2}O", "I_{2} + 5Cl_{2} + 6H_{2}O -> 2HIO_{3} + 10HCl", "Cl + 4Na -> 4NaCl"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/2245",
    recordId: "Mercury_7092208",
    question: "As the amount of carbon dioxide in the atmosphere increases, which occurrence is most likely a long-term result?",
    options: ["The number of earthquakes will decrease.", "The polar ice caps will melt.", "Volcanoes will erupt more often.", "Rainforests will be unable to support animal life."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/2246",
    recordId: "ACTAAP_2011_5_6",
    question: "Which mineral, found in Arkansas, is an ore that can be used to produce aluminum?",
    options: ["bauxite", "galena", "diamond", "quartz"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/2247",
    recordId: "VASoL_2007_3_30",
    question: "A summer day begins with a clear, sunny sky. Then, dark clouds form in the afternoon. What type of weather will MOST likely happen next?",
    options: ["Sleet and snow", "Fog and wind", "Wind and snow", "Rain and thunder"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/2248",
    recordId: "Mercury_SC_401288",
    question: "Eagles have strong, sharp beaks that are most likely adapted for the eagle to eat",
    options: ["eggs.", "fish.", "flowers.", "worms."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/2249",
    recordId: "Mercury_SC_400702",
    question: "When a spoon hits a table, it makes a loud sound. When the spoon hits a soft cushion, it does not make a sound. What is the difference between the table and the cushion that accounts for the sound?",
    options: ["The table has more potential energy than the cushion.", "The table is more insulated than the cushion.", "The table is more reactive than the cushion.", "The table vibrates more than the cushion."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/2250",
    recordId: "Mercury_7182963",
    question: "When Dennis operates his lawnmower, he notices the engine makes a lot of noise. He also notices that the engine gets very hot. Which best describes the heat and noise generated from the lawnmower?",
    options: ["mechanical advantage", "an increase in entropy", "a change in phase", "thermal expansion"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/2251",
    recordId: "Mercury_SC_415773",
    question: "What objects are affected by Earth's gravity?",
    options: ["only objects that are made of metal", "only objects that are heavier than air", "only objects that have mass", "only objects that sink in water"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/2252",
    recordId: "NYSEDREGENTS_2012_8_14",
    question: "Abnormal cell division in humans may result in",
    options: ["dynamic equilibrium", "asexual reproduction", "fertilization", "cancer"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/2253",
    recordId: "MEA_2011_8_16",
    question: "A donkey and a horse can be bred to produce a mule. Which observation is evidence that donkeys and horses are two different species?",
    options: ["They have different body sizes.", "A mule does not resemble either parent.", "They are found in different environments.", "A mule is not able to reproduce."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/2254",
    recordId: "Mercury_SC_402075",
    question: "What should students use to identify the percent chance of a trait being passed down from a parent to its offspring?",
    options: ["a data table", "a flow chart", "a Punnett square", "a graph"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/2255",
    recordId: "Mercury_7270533",
    question: "Which rankings of trees would most likely useful in a scientific study of fruit production in apple trees?",
    options: ["date of flowering and the fruit yield", "taste of the fruit and smell of the flower", "fruit yield and taste of the fruit", "date of flowering and smell of the flower"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/2256",
    recordId: "Mercury_402091",
    question: "Which of the following characteristics is an acquired trait?",
    options: ["height", "hair color", "eye shape", "language"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/2257",
    recordId: "Mercury_417470",
    question: "Which stimulus causes a responding plant to demonstrate phototropism?",
    options: ["intensity of light", "direction of light", "time of day", "length of day"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/2258",
    recordId: "Mercury_7200060",
    question: "Estuaries are marine environments located in areas where fresh water from rivers flow into the ocean. Estuaries are one of the most biologically productive ecosystems. Birds, fish, turtles and many other organisms inhabit these ecosystems. Which will most likely cause changes to estuary habitats on a global scale?",
    options: ["increases in earthquakes", "increases in sea level", "decreases in volcanic eruptions", "decreases in powerful hurricanes"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/2259",
    recordId: "Mercury_SC_416107",
    question: "The trunk of a pine tree supports the tree. Which part of a daisy supports the plant the same way?",
    options: ["leaf", "root", "stem", "flower"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/2260",
    recordId: "MCAS_2004_9_5-v1",
    question: "What property of electromagnetic waves makes it possible to use these waves to transmit information between a space shuttle and NASA mission control centers on the ground?",
    options: ["Electromagnetic waves are transverse waves.", "Electromagnetic waves can travel through a vacuum.", "Electromagnetic waves are all visible to human eyes.", "Electromagnetic waves have very low velocity."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/2261",
    recordId: "MCAS_2000_4_31",
    question: "A student is investigating solar energy by cooking food in an oven powered by the Sun. On which of the following days will the food cook most quickly?",
    options: ["a warm, cloudy day", "a hot, cloudy day", "a warm, rainy day", "a warm, sunny day"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/2262",
    recordId: "ACTAAP_2013_5_13",
    question: "Which is the correct order of the planets from the Sun?",
    options: ["Mercury, Earth, Mars, Venus, Saturn, Jupiter, Neptune, Uranus", "Mercury, Venus, Mars, Earth, Jupiter, Uranus, Saturn, Neptune", "Mercury, Venus, Earth, Saturn, Uranus, Jupiter, Mars, Neptune", "Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/2263",
    recordId: "Mercury_7268205",
    question: "Which of these is the basic building block of complex organisms?",
    options: ["a cell", "a tissue", "an organ", "an organ system"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/2264",
    recordId: "NYSEDREGENTS_2010_4_20",
    question: "Which human response is most likely to occur because the air temperature is 90°F?",
    options: ["shivering", "blinking", "sweating", "salivating"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/2265",
    recordId: "Mercury_7270130",
    question: "What are the properties of the Earth's crust and mantle that are most responsible for Earth's tectonic activity?",
    options: ["They are in different states and have different temperatures.", "They are the same state and have the same temperature.", "They are in the same state but have different temperatures.", "They are in different states but have the same temperature."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/2266",
    recordId: "TAKS_2009_8_11",
    question: "When a butterfly emerges from its chrysalis, its wings are crumpled. In order to expand its wings, the butterfly hangs upside down, causing fluid to be pumped into the veins of its wings. This pumping most likely expands the wings by",
    options: ["increasing the pressure inside the wings", "increasing the temperature inside the wings", "decreasing the mass of the wings", "decreasing the density of the wings"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/2267",
    recordId: "MCAS_2010_5_11988",
    question: "Which of the following characteristics will best prevent a tree from being blown over by high winds during a storm?",
    options: ["wide leaves", "thick bark", "deep roots", "long branches"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/2268",
    recordId: "Mercury_416504",
    question: "Both prokaryotes and eukaryotes have small, free-floating organelles. The cell makes these organelles from nucleic acids and amino acids found in food. Without these organelles, the cell could not make proteins. What are these organelles called?",
    options: ["mitochondria", "chloroplasts", "ribosomes", "vesicles"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/2269",
    recordId: "Mercury_SC_402082",
    question: "Which temperature is the freezing point of water?",
    options: ["0°F", "100°F", "50°F", "32°F"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/2270",
    recordId: "Mercury_7223265",
    question: "Which statement best describes the molecules in a sample of water that was heated from a liquid to a gas?",
    options: ["The average size of the molecules decreased.", "The average kinetic energy of the molecules increased.", "The average kinetic energy of the molecules decreased.", "The average size of the molecules increased."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/2271",
    recordId: "MEA_2014_5_8",
    question: "Constellations are patterns of objects seen in the night sky from Earth. How are the objects in constellations like the Sun?",
    options: ["The objects heat the atmosphere of Earth.", "The objects are planets.", "The objects are stars.", "The objects are located in this solar system."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/2272",
    recordId: "Mercury_400396",
    question: "Which is a trait a human most directly inherits from its parents?",
    options: ["musical taste", "eye color", "interest in reading", "career choice"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/2273",
    recordId: "LEAP_2012_8_10440",
    question: "When observing a very small piece of dust in a liquid under a microscope, the dust appears to jiggle slightly. This movement results from the dust interacting with the molecules in the liquid. What property of the molecules in the liquid causes this effect?",
    options: ["The molecules frequently change shape.", "The molecules briefly form chemical bonds with nearby objects.", "The molecules are always in random motion.", "The molecules transfer an electric charge to the dust particles."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/2274",
    recordId: "TAKS_2009_5_28",
    question: "Which of the following happens in our solar system?",
    options: ["Earth revolves around the sun once per day.", "Earth revolves around the sun once per year.", "The moon revolves around Earth once per year.", "The moon revolves around Earth once per day."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/2275",
    recordId: "OHAT_2009_5_1",
    question: "On a cold day, a student felt the tires of her bike before riding it to the store. When she arrived at the store, she felt the tires again and noticed that they were warmer. What caused the temperature of the bicycle tires to change?",
    options: ["the wind blowing against the tires", "the rubbing between the ground and the tires", "the heat transferring from the rider's hands to the tire", "the air escaping from the spinning tires"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/2276",
    recordId: "MCAS_2000_8_3",
    question: "Chloroplasts in cells make it possible for the cells to",
    options: ["reproduce.", "absorb and excrete materials.", "carry out photosynthesis.", "hold their rigid shape."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/2277",
    recordId: "VASoL_2011_5_38",
    question: "Which of these is the most important product of Virginia forests?",
    options: ["Pecan trees", "Hardwood lumber", "Pine cones", "Maple leaves"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/2278",
    recordId: "Mercury_7038465",
    question: "Research in which of these areas has the greatest impact on the environment?",
    options: ["bacteria to clean up oil spills", "irradiating food", "developing larger, sweeter strawberries", "organic fertilizers"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/2279",
    recordId: "NYSEDREGENTS_2008_8_29",
    question: "The surface of Earth is covered mostly by",
    options: ["ice", "solid rock", "molten rock", "water"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/2280",
    recordId: "Mercury_7013825",
    question: "Which pair of systems is responsible for the flow of blood in the human body?",
    options: ["skeletal and excretory systems", "muscular and circulatory systems", "circulatory and skeletal systems", "respiratory and muscular systems"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/2281",
    recordId: "Mercury_7274313",
    question: "Where are the most reactive metals located on the periodic table?",
    options: ["the uppermost complete row of the table", "the column at the far left side of the table", "the rows at the bottom of the table connecting two section", "the second column from the right side of the table"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/2282",
    recordId: "Mercury_7098543",
    question: "What major and potentially catastrophic events can be predicted to occur in the Northern Hemisphere between the months of June and November?",
    options: ["tsunamis", "hurricanes", "volcanic eruptions", "asteroid impacts"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/2283",
    recordId: "Mercury_SC_400854",
    question: "The pull of gravity from Earth has the greatest effect on",
    options: ["the Moon.", "asteroids.", "the Sun.", "comets."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/2284",
    recordId: "MCAS_2004_5_21",
    question: "What is the main advantage of making a laptop computer light in weight?",
    options: ["to keep it simple to build", "to make it easy to carry", "to provide storage for an electrical cord", "to make the screen easy to read"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/2285",
    recordId: "Mercury_SC_403014",
    question: "It takes 365 days for",
    options: ["Earth to complete one orbit around the Sun.", "Earth to travel halfway around the Sun.", "the Moon to complete one orbit around Earth.", "the Moon to travel halfway around Earth."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/2286",
    recordId: "Mercury_7205923",
    question: "Some scientists once believed that Earth was solid like a marble. Which of these has been most responsible for changes in the scientific view of the structure of Earth?",
    options: ["discussions among earth scientists about new data", "a physical model of Earth showing its layers", "scientific books defining the layers of Earth", "a lead scientist explaining the structure of Earth"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/2287",
    recordId: "AKDE&ED_2012_8_4",
    question: "A student wants to organize a group of animals into two categories based on observable external features. Which display will most appropriately show the two categories of animals?",
    options: ["a data table", "a pie chart", "a timeline", "a line graph"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/2288",
    recordId: "Mercury_7228200",
    question: "Ribosomes present in a particular cell are smaller than those found in plants. In which taxonomic group or groups could the cell be classified?",
    options: ["archaea only", "fungi only", "bacteria or fungi", "bacteria or archaea"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/2289",
    recordId: "MCAS_2005_5_22",
    question: "What happens to the path of a light ray as it passes from air into water at an angle?",
    options: ["Its path becomes shorter.", "Its path widens.", "Its path continues in a straight line.", "Its path bends."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/2290",
    recordId: "Mercury_SC_400186",
    question: "Vibrations in the air caused by hitting a drum form",
    options: ["sound.", "light.", "electricity.", "radiation."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/2291",
    recordId: "MDSA_2007_8_25",
    question: "As humans grow, their bodies change. Which of these statements explains how humans grow?",
    options: ["Cells undergo cell division.", "Cells increase in size.", "Cells merge to become larger.", "Cells form a cell wall."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/2292",
    recordId: "Mercury_184240",
    question: "Which event below involves a constructive force?",
    options: ["flood", "wind storm", "earthquake", "volcanic eruption"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/2293",
    recordId: "MCAS_2012_8_23644",
    question: "Which of the following are formed when two crustal plates collide with one another?",
    options: ["hot spots", "rift valleys", "mountain ranges", "mid-ocean ridges"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/2294",
    recordId: "Mercury_7109428",
    question: "The nucleus contains DNA. Which statement best describes how DNA controls the working of the cell?",
    options: ["It codes for proteins.", "It helps in energy transformation.", "It regulates traffic in and out of the cell.", "It inhibits division of cells."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/2295",
    recordId: "MCAS_2011_8_17698",
    question: "Which of the following provides the best evidence that Earth has evolved over geologic time?",
    options: ["deposits of sediment found at the mouth of a river", "rock containing fossilized seashells found on a mountaintop", "desert sand dunes that were shaped by winds", "coral reefs that slowly changed size"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/2296",
    recordId: "Mercury_SC_407164",
    question: "The best explanation of why carnivores are dependent on plants is because they",
    options: ["use plants for shelter.", "consume other animals that eat plants.", "need to consume plant matter.", "need carbon dioxide released by plants."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/2297",
    recordId: "Mercury_7038500",
    question: "In the late 1600s, Anton van Leeuwenhoek began making observations with simple magnifying lenses that he constructed. To which scientific field is Leeuwenhoek credited with the most contributions?",
    options: ["DNA sequencing", "plant genetics", "disease control", "microbiology"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/2298",
    recordId: "Mercury_7080605",
    question: "Which section of Earth is composed primarily of liquid metal?",
    options: ["inner core", "mantle", "outer core", "crust"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/2299",
    recordId: "Mercury_417568",
    question: "One way humans store energy is by making the molecule glycogen. Clusters of which atoms are rearranged when the body digests plant sugars to make glycogen?",
    options: ["nitrogen, carbon, sulfur", "carbon, hydrogen, oxygen", "oxygen, sulfur, carbon", "hydrogen, nitrogen, carbon"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/2300",
    recordId: "Mercury_7214620",
    question: "The number of stars in the Milky Way Galaxy is best estimated as",
    options: ["one hundred million.", "one hundred billion.", "one hundred trillion.", "one hundred thousand."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/2301",
    recordId: "Mercury_7176103",
    question: "Which type of substances serves as a catalyst for reactions that break large food molecules into smaller useful molecules?",
    options: ["lipids", "nucleotides", "vitamins", "enzymes"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/2302",
    recordId: "Mercury_SC_415767",
    question: "What effect does gravity always have on an object on Earth?",
    options: ["pushes the object upward", "makes the object stay still", "pulls the object downward", "makes the object move"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/2303",
    recordId: "Mercury_7034825",
    question: "Which is the best example of a chemical reaction?",
    options: ["blocked sunlight casts a shadow", "oxygen absorbs sunlight forming ozone molecules", "sunlight evaporates water from a lake", "a prism refracts sunlight into light of different wavelengths"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/2304",
    recordId: "NYSEDREGENTS_2010_8_17",
    question: "Some one-celled organisms can reproduce by the process of",
    options: ["fertilization", "cell division", "metamorphosis", "hormone secretion"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/2305",
    recordId: "Mercury_405140",
    question: "One important use of coal is to produce energy for homes. Coal can be burned and converted to",
    options: ["electrical energy.", "wind energy.", "nuclear energy.", "solar energy."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/2306",
    recordId: "TIMSS_1995_8_M10",
    question: "Which of the following is NOT a mixture?",
    options: ["Salt", "Orange juice", "Air", "Blood"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/2307",
    recordId: "VASoL_2009_5_12",
    question: "What kind of energy do all moving objects have?",
    options: ["Renewable energy", "Kinetic energy", "Light energy", "Solar energy"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/2308",
    recordId: "Mercury_7163328",
    question: "In a forest ecosystem, the squirrels eat seeds from trees. The squirrels are then eaten by hawks, owls, and foxes. If there were no more owls present in this ecosystem, which would most likely happen in the forest?",
    options: ["The tree population would increase.", "The fox population would decrease.", "The hawk population would decrease.", "The squirrel population would increase."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/2309",
    recordId: "Mercury_190190",
    question: "Which of the following has the greatest direct influence on movement of the lithosphere?",
    options: ["Earth's core", "the Moon", "the Sun", "Earth's mantle"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/2310",
    recordId: "Mercury_400099",
    question: "When humans first began to grow crops, which of these most likely contributed to the extinction of native animal species?",
    options: ["habitat destruction", "tectonic plate motion", "pollution", "climate change"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/2311",
    recordId: "VASoL_2007_3_18",
    question: "Which of these does the MOST harm to the air?",
    options: ["Chopping down trees with an ax in the backyard", "Picking colorful wildflowers along the highway", "Collecting fall leaves", "Cutting grass with a gas-powered lawnmower"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/2312",
    recordId: "Mercury_7004498",
    question: "A scanning electron microscope is best suited for observing",
    options: ["diffraction of light.", "tectonic features on planets.", "topographical features on the ocean floor.", "the surfaces of small objects."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/2313",
    recordId: "Mercury_400608",
    question: "A bird eats a brightly-colored insect that tastes bad. The bird avoids preying on this type of insect again. This example is best described as",
    options: ["a physical characteristic.", "an adaptation.", "an inherited behavior.", "a learned behavior."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/2314",
    recordId: "VASoL_2009_5_17",
    question: "In winter, the arctic fox has white fur. In summer, its fur changes color to brown and gray. The change in fur color helps the arctic fox to ___.",
    options: ["hide", "mate", "run", "hibernate"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/2315",
    recordId: "Mercury_SC_413302",
    question: "In which ways are hills most different from mountains?",
    options: ["Hills are deeper and more level.", "Hills are taller and snowy.", "Hills are smaller and more rounded.", "Hills are steeper and rockier."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/2316",
    recordId: "NYSEDREGENTS_2015_4_27",
    question: "A bird builds a nest to",
    options: ["eliminate waste", "hibernate in winter", "shelter its offspring", "produce more feathers"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/2317",
    recordId: "Mercury_7212048",
    question: "Which statement best describes the motion of the molecules of a solid object?",
    options: ["They move around freely within a fixed volume.", "They vibrate in place and take the shape of a container.", "They move around freely and take the shape of a container.", "They vibrate in place within a fixed volume."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/2318",
    recordId: "MCAS_2002_8_7",
    question: "What happens when salt water is boiled?",
    options: ["The salt becomes a new compound.", "Both the salt and the water evaporate and leave the beaker.", "The water evaporates and the salt remains in the beaker.", "The salt will evaporate from the water and disperse into the environment."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/2319",
    recordId: "Mercury_412148",
    question: "Which set of elements has similar bonding properties?",
    options: ["Kr, Cl, and O", "K, Ca, and Sc", "Be, C, and O", "Cl, Br, and F"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/2320",
    recordId: "NCEOGA_2013_5_52",
    question: "Which body system processes foods into a useable source of energy?",
    options: ["circulatory", "digestive", "nervous", "skeletal"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/2321",
    recordId: "Mercury_SC_400164",
    question: "What is the best way for a scientist to begin an investigation on a population of deer?",
    options: ["writing facts in a field notebook", "observing the deer in their own habitat", "typing results into a computer", "intuition"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/2322",
    recordId: "NYSEDREGENTS_2012_4_11",
    question: "Which property of an object describes how easily electricity travels through it?",
    options: ["conductivity", "temperature", "reflectivity", "color"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/2323",
    recordId: "Mercury_SC_406626",
    question: "Which is a statement of fact?",
    options: ["The Sun is fun to study.", "The Sun is more interesting than the Moon.", "The Sun is larger than Earth.", "The Sun is very pretty."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/2324",
    recordId: "Mercury_SC_409143",
    question: "Sydney is learning about the sources of energy that can run out. Which energy source will run out the fastest?",
    options: ["sunlight", "flowing water", "natural gas", "wind"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/2325",
    recordId: "Mercury_7006108",
    question: "The first organisms to occupy an area after a prairie fire are known as",
    options: ["pioneer species.", "succession species.", "secondary species.", "primary species."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/2326",
    recordId: "TIMSS_2007_8_pg77",
    question: "Which of the following is caused by a virus?",
    options: ["ulcer", "malaria", "tuberculosis", "influenza"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/2327",
    recordId: "Mercury_7082075",
    question: "When a beam of light passes through a clear, convex lens, the light will mostly",
    options: ["diffract and come to a focal point.", "diffract and spread out.", "refract and come to a focal point.", "refract and spread out."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/2328",
    recordId: "Mercury_7068985",
    question: "The symptoms of strep throat infection are a red and swollen throat. What is the most likely cause of strep throat?",
    options: ["drinking lemonade", "running in cold weather", "eating raw vegetables", "invading bacteria"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/2329",
    recordId: "NYSEDREGENTS_2010_8_39",
    question: "Compared to the particles in a hardened lava sample, the particles in a liquid lava sample",
    options: ["are closer together", "have less kinetic energy", "are moving faster", "have a lower temperature"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/2330",
    recordId: "Mercury_402286",
    question: "Which characteristic do both the Moon and Earth share?",
    options: ["They both have rocky surfaces.", "They both have the same gravitational pull.", "They both have active volcanoes.", "They both have similar atmospheres."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/2331",
    recordId: "Mercury_SC_407170",
    question: "Which would be the most likely effect of a large decrease in the number of woodpeckers in a forest?",
    options: ["Temperatures would increase.", "The insect population in the forest would increase.", "The number of trees in the forest would increase.", "Precipitation would increase."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/2332",
    recordId: "NYSEDREGENTS_2010_4_17",
    question: "Which two life processes occur in both plants and humans?",
    options: ["germinating and making food", "growing and reproducing", "germinating and reproducing", "growing and making food"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/2333",
    recordId: "Mercury_SC_401276",
    question: "In order for Galileo to build a telescope, he needed to know about",
    options: ["the making of leather.", "chemical mixtures.", "metals.", "lenses."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/2334",
    recordId: "Mercury_7219520",
    question: "A birdwatcher wants to identify an eastern bluebird. What feature of a bird should the birdwatcher evaluate first to identify an eastern bluebird?",
    options: ["feather pattern", "eye position", "tail-feather length", "beak shape"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/2335",
    recordId: "Mercury_7008820",
    question: "When a neutral atom gains or loses electrons, it becomes",
    options: ["less charged.", "an ion.", "an isotope.", "more stable."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/2336",
    recordId: "Mercury_SC_416175",
    question: "Which is an effect of regular exercise?",
    options: ["weaker bones", "less energy", "stronger heart", "better hearing"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/2337",
    recordId: "Mercury_7041545",
    question: "A light year is used to measure",
    options: ["time.", "temperature.", "luminosity.", "distance."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/2338",
    recordId: "Mercury_7007438",
    question: "As an object falls, air resistance gradually increases until it is equal with the pull of gravity. This effect is called",
    options: ["final velocity.", "initial velocity.", "escape velocity.", "terminal velocity."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/2339",
    recordId: "Mercury_7007788",
    question: "All of these elements are metals except",
    options: ["gold.", "sodium.", "aluminum.", "helium."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/2340",
    recordId: "Mercury_SC_401787",
    question: "Observation and measurement are important to scientific investigations because",
    options: ["they are part of the instructions.", "they are used to test a hypothesis.", "they keep you safe during an investigation.", "they are required to make a hypothesis."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/2341",
    recordId: "Mercury_7165200",
    question: "When air rises over the open ocean, a low pressure system is formed. Which factor increases the potential of a low pressure system developing into a hurricane in the Northern Hemisphere?",
    options: ["cool ocean currents circulating towards the equator", "warm water temperatures in the tropics", "cold air moving south from the North Pole", "increased volcanic activity in the upper latitudes"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/2342",
    recordId: "Mercury_416355",
    question: "Imprints of the shells of ocean clams are often found in the rocks of the Appalachian Mountains. What do these imprint fossils most likely indicate?",
    options: ["Ocean clams evolved from mountain river clams.", "Mountain river clams evolved from ocean clams.", "These mountains were once under the ocean.", "These mountains once had a more rainy climate."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/2343",
    recordId: "Mercury_7252403",
    question: "A population of ground squirrels has established a community in the grasslands of the Great Plains. Temperatures often reach -15°C for most of the winter. What is the most likely behavior the ground squirrels use to survive these winter temperatures?",
    options: ["burrowing in tree trunks above the soil surface", "consuming roots found under the soil surface", "burrowing below the frost point of the soil surface", "consuming organisms found in the soil surface"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/2344",
    recordId: "Mercury_7271215",
    question: "Which is the lowest level of environmental organization that would include the water quality and air temperature in an area?",
    options: ["ecosystem", "community", "population", "biome"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/2345",
    recordId: "TIMSS_1995_8_I14",
    question: "When you bend your arm at the elbow, the bones and muscles in your arm are acting as a system. What simple machine does this system represent?",
    options: ["Inclined plane", "Wedge", "Pulley", "Lever"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/2346",
    recordId: "Mercury_SC_407065",
    question: "A student places a pan of water on the stove. What happens to some of the water as it is heated to a boil?",
    options: ["It gets destroyed.", "It becomes a gas.", "It becomes a solid.", "It gets new atomic bonds."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/2347",
    recordId: "Mercury_402560",
    question: "What are the parts that make up an atom?",
    options: ["neutrons, protons, and alpha particles", "electrons, neutrons, and protons", "electrons, protons, and gamma rays", "neutrons, photons, and beta particles"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/2348",
    recordId: "Mercury_SC_404974",
    question: "One end of a metal rod is placed over a flame during an investigation. A thermometer is touching the opposite end of the metal rod. Which best describes what is happening during this investigation?",
    options: ["Mechanical energy from the flame carries heat to the thermometer.", "Heat from the flame is conducted through the metal rod to the thermometer.", "Radiant energy warms the thermometer.", "Convection carries heat to the thermometer."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/2349",
    recordId: "Mercury_7001715",
    question: "Mountains are most likely formed",
    options: ["along tectonic plates.", "when land sinks.", "from earthquakes.", "when glaciers melt."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/2350",
    recordId: "AIMS_2009_8_26",
    question: "Read the information about Alice's science project then answer the question. Alice needed to design a science project. She decided that she wanted to focus her project on how an earthworm's behavior helps it survive. Alice wrote down four ideas about earthworm behavior that she wanted to test. Which idea can be tested experimentally?",
    options: ["Earthworms are happier in black dirt than red dirt.", "Earthworms like the taste of dirt better than sand.", "Earthworms will move away from direct light sources.", "Earthworms exist to decompose decaying materials."],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/2351",
    recordId: "CSZ30499",
    question: "What do the elements sulfur (S), nitrogen (N), phosphorus (P), and bromine (Br) have in common?",
    options: ["They have the same number of protons.", "They are nonmetals.", "They have the same thermal conductivity.", "They are noble (inert) gases."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/2352",
    recordId: "Mercury_416369",
    question: "Tissue plasminogen activator is a natural blood thinner. The coded sequence for the blood thinner is called PLAT , found on chromosome 8. It is used to treat people who have heart attacks and strokes. Tissue plasminogen activator can be made through genetic engineering. What is tissue plasminogen activator?",
    options: ["a DNA molecule", "a gene", "a platelet", "a protein"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/2353",
    recordId: "Mercury_400758",
    question: "Which of these groups contains only metric measurements?",
    options: ["inches, grams, ounces", "centimeters, pounds, milliliters", "inches, pounds, ounces", "centimeters, grams, milliliters"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/2354",
    recordId: "Mercury_7264163",
    question: "Scientists use large optical telescopes to obtain information about the planets in the solar system. What wavelengths of electromagnetic radiation provide this information?",
    options: ["gamma radiation", "radio waves", "infrared radiation", "visible light"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/2355",
    recordId: "Mercury_7032148",
    question: "Which scientist is credited for the development of the polio vaccine?",
    options: ["Jacques Cousteau", "Jonas Salk", "Neil Armstrong", "Albert Einstein"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/2356",
    recordId: "Mercury_7187250",
    question: "When a volcano erupts, new lava is deposited on the slopes of the volcano. After the lava cools and hardens, which types of organisms will most likely be the first to live on the new material?",
    options: ["small birds and mammals", "bushes and vines", "mosses and lichens", "large reptiles and amphibians"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/2357",
    recordId: "Mercury_SC_416164",
    question: "Ella waves good-bye from the bus. What body system pulls on bones to let Ella wave her arm?",
    options: ["digestive system", "muscular system", "circulatory system", "nervous system"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/2358",
    recordId: "Mercury_416378",
    question: "Coral reefs are found in shallow tropical ocean waters. A coral reef is a diverse ecosystem that is supported by the photosynthesis of marine plants and the algae that live within the tissues of the coral. Given this information, when would the waters in a coral reef likely have the highest dissolved oxygen concentration?",
    options: ["midnight", "9 p.m.", "7 a.m.", "2 p.m."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/2359",
    recordId: "Mercury_401603",
    question: "What keeps the planets in orbit around the Sun?",
    options: ["tides", "electricity", "magnetism", "gravity"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/2360",
    recordId: "Mercury_SC_408709",
    question: "As seen from Earth, the appearance of the Moon changes throughout the month. What causes the appearance of the Moon to change?",
    options: ["Earth revolving around the Sun", "Earth rotating on its axis", "the Moon rotating on its axis", "the Moon revolving around Earth"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/2361",
    recordId: "MCAS_2005_8_27",
    question: "In producing an automobile, which of the 27 following is the best use of a robot?",
    options: ["to perform repetitive tasks", "to perform quality control inspections", "to determine the trunk space", "to demonstrate passenger comfort"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/2362",
    recordId: "Mercury_7009713",
    question: "The Theory of Plate Tectonics is based on",
    options: ["an analysis of soil at the plate boundaries.", "evidence of sea floor spreading.", "topographic mapping of mountain ranges.", "volcanic activity along coastlines."],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/2363",
    recordId: "MCAS_2010_5_13",
    question: "Which of the following must all plant and animal species do in order for each species to survive?",
    options: ["make food", "migrate", "reproduce", "change color"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/2364",
    recordId: "Mercury_7248255",
    question: "Which activity illustrates the main function of the motor neuron complex?",
    options: ["processing impulses within the cerebral cortex", "delivering regular impulses to the autonomic system", "receiving sensory impulses from the environment", "transferring impulses to the appropriate muscle"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/2365",
    recordId: "Mercury_7185255",
    question: "Nutrients are recycled when materials decompose in an ecosystem. Which is the best example of the decomposition process where organic material is recycled in an ecosystem?",
    options: ["a plant using nitrogen to make proteins", "bacteria feeding on dead plants", "worms tunneling through soil", "a hawk eating a mouse"],
    answerIndex: 1,
    answerLetter: "B"
  }),
  q({
    id: "ARC/2366",
    recordId: "Mercury_SC_406653",
    question: "What is one function of tree roots?",
    options: ["to make seeds", "to make food", "to absorb water", "to absorb sunlight"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/2367",
    recordId: "Mercury_7193690",
    question: "Food contains stored chemical energy. Which units of measurement can be used to compare the amounts of energy in different foods?",
    options: ["decibels", "newtons", "watts", "calories"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/2368",
    recordId: "Mercury_SC_405495",
    question: "The freezing and expanding of water in the cracks of rocks is a form of",
    options: ["weathering.", "faulting.", "erosion.", "deposition."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/2369",
    recordId: "MCAS_1999_4_25",
    question: "Which of the following is a way that everyone can help with conservation efforts?",
    options: ["camp in the woods", "visit a landfill", "use disposable plates", "use biodegradable materials"],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/2370",
    recordId: "ACTAAP_2009_7_12",
    question: "Historically, how has the compass been used?",
    options: ["for navigation", "to predict weather", "to measure temperature", "for mineral identification"],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/2371",
    recordId: "Mercury_7083458",
    question: "A cut to the skin is treated with antiseptic first to avoid",
    options: ["an allergic reaction.", "an immune response.", "bruising of tissues.", "a bacterial infection."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/2372",
    recordId: "Mercury_7030450",
    question: "Which would be a safe practice to exercise during laboratory investigations?",
    options: ["using open flames to heat all materials", "removing your safety glasses when moving from station to station", "knowing where your instructor/laboratory leader is at all times", "keeping your cell phone on the laboratory countertop"],
    answerIndex: 2,
    answerLetter: "C"
  }),
  q({
    id: "ARC/2373",
    recordId: "TIMSS_2003_8_pg101",
    question: "The shape of the moon appears to change regularly during each month. Which of the following best explains why the shape of the moon appears to change?",
    options: ["Clouds cover the Moon.", "The Moon turns on its axis.", "The Earth turns on its axis.", "The Moon orbits around the Earth."],
    answerIndex: 3,
    answerLetter: "D"
  }),
  q({
    id: "ARC/2374",
    recordId: "Mercury_7057960",
    question: "How do the nutrients necessary for plant growth get into the soil?",
    options: ["Organic matter is decayed in the soil.", "The soil absorbs sunlight.", "The soil is exposed to air.", "Water filters through the soil."],
    answerIndex: 0,
    answerLetter: "A"
  }),
  q({
    id: "ARC/2375",
    recordId: "VASoL_2009_5_34",
    question: "Which part of a sunflower plant absorbs water and nutrients?",
    options: ["Flowers", "Stems", "Roots", "Leaves"],
    answerIndex: 2,
    answerLetter: "C"
  }),
];

export function getQuestion(id: string): ArcQuestion | undefined {
  return QUESTIONS.find((question) => question.id === id);
}
