#!/usr/bin/env python3
# coding=utf-8
"""Author + verify the mock-server answer set (development tool).

Rebuilds `_reference/fixtures/mock-answers.json`:

  * `compliant` responses - hand-authored answers to selected real IFEval
    prompts, each asserted to PASS the vendored checker strictly;
  * `garbage` responses - deliberately non-compliant answers to the same
    prompts, each asserted to FAIL the vendored checker strictly;
  * `genericGarbage` - the single fallback answer for every unmapped prompt
    in `--garbage` mode.

The script asserts the outcome of every entry with `harness/grader.py` before
writing the fixture, so the mock end-to-end runs are driven by verified data.

Run: python scripts/build-mock-answers.py
(Not used at pack runtime; the JSON fixture it writes is what the mock reads.)
"""

import hashlib
import json
import os
import sys

sys.dont_write_bytecode = True  # keep the pack tree free of __pycache__

REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.join(REPO_ROOT, "harness"))

import grader  # noqa: E402

DATASET = os.path.join(REPO_ROOT, "data", "ifeval.jsonl")
OUT = os.path.join(REPO_ROOT, "_reference", "fixtures", "mock-answers.json")

REPEAT = "Write a blog post about the most interesting things you have seen or ridden on public transportation."

LONG_300 = " ".join(
    ["The hammock swings between two trees and the afternoon slows down."] * 6
)  # ~78 words

LONG_200 = " ".join(
    ["The digital photo frame connects to social accounts and shows your pictures."] * 5
)  # ~65 words


def long_text(sentence, words_at_least):
    """Repeat a sentence until the tokenized word count reaches a threshold."""
    words = sentence.split()
    repeats = 1
    while len(words) * repeats < words_at_least:
        repeats += 1
    return " ".join([sentence] * repeats)


# id -> (compliant, garbage)
ANSWERS = {
    "IFEval/1": (  # punctuation:no_comma
        "Thy journey shall unfold through Kyoto and Nara where temples whisper of olden days.",
        "Thy journey shall unfold through Kyoto, Nara, and Osaka.",
    ),
    "IFEval/4": (  # change_case:english_lowercase
        "what do the two young boys with toy guns and horns plan to do next?",
        "WHAT DO THE TWO YOUNG BOYS WITH TOY GUNS AND HORNS PLAN TO DO NEXT?",
    ),
    "IFEval/5": (  # detectable_format:number_bullet_lists (exactly 3)
        "Ball gown:\n* velvet and dramatic\nSweats:\n* cotton and comfortable\nTogether:\n* a comic mismatch",
        "Ball gown: velvet and dramatic. Sweats: cotton and comfortable. Together: a comic mismatch.",
    ),
    "IFEval/11": (  # detectable_format:json_format
        '{"advertisement": "Soft diapers, so comfortable your baby forgets they are wearing one."}',
        "Here is the ad: soft diapers that keep babies comfortable all day long.",
    ),
    "IFEval/14": (  # length_constraints:number_words (less than 300)
        "Sleeping in a hammock gently rocks you into a deeper rest. The fabric cradles your spine. "
        "Outdoor air cools the skin and the sway slows a racing mind. Campers wake up lighter and happier.",
        long_text("A hammock is a fine place to rest after a long day outdoors.", 320),
    ),
    "IFEval/16": (  # combination:two_responses
        "Yahweh. ****** Allah.",
        "God is a name that people use for the divine.",
    ),
    "IFEval/21": (  # startend:end_checker
        "The sentiment of the sentence is negative. Is there anything else I can help with?",
        "The sentiment of the sentence is negative. I hope that answers your question.",
    ),
    "IFEval/24": (  # detectable_format:multiple_sections (Section, 4)
        "Section 1\nPhil Larkin is a professional clown.\n"
        "Section 2\nHe has performed at two hundred birthday parties.\n"
        "Section 3\nHe studied physical comedy in Chicago.\n"
        "Section 4\nHe brings balloons to every single show.",
        "Phil Larkin is a professional clown who has performed at two hundred birthday parties "
        "and studied physical comedy in Chicago.",
    ),
    "IFEval/38": (  # length_constraints:number_words (less than 151)
        "Meet the Frame. It links to your social accounts and turns your camera roll into a moving gallery. "
        "Photos drift across the glass like memories on a wall. Set it on a shelf and let your year play on.",
        long_text("The frame shows your photos and connects to every social account you own.", 200),
    ),
    "IFEval/40": (  # startend:quotation
        '"The internet began as a research project and grew into the place where teenagers now live."',
        "The internet began as a research project and grew into the place where teenagers now live.",
    ),
    "IFEval/46": (  # detectable_content:postscript (P.P.S)
        "A product description in the form of a poem:\nSoft as a cloud and warm as a hug.\nP.P.S. Ask about our sizes.",
        "A product description in the form of a poem: soft as a cloud and warm as a hug. Ask about our sizes.",
    ),
    "IFEval/63": (  # detectable_format:title
        "<<kotlin versus java>>\nKotlin is concise while Java is everywhere.",
        "Kotlin is concise while Java is everywhere.",
    ),
    "IFEval/78": (  # keywords:frequency (synonyms, at least 3)
        "Using two names for one thing has pros and cons. Synonyms can clarify a topic. "
        "Synonyms can also confuse a reader. Choose synonyms with care.",
        "Using two names for one thing has pros and cons, and the choice depends on the audience.",
    ),
    "IFEval/88": (  # combination:repeat_prompt
        REPEAT + "\n\nOnce I watched a violinist play for a carriage of tired commuters.",
        "A blog post about public transportation would start with the seats and end with the delays.",
    ),
    "IFEval/116": (  # keywords:forbidden_words (station)
        "The bus glided into the terminal with a theatrical hiss.",
        "The bus arrived at the station with a theatrical hiss.",
    ),
    "IFEval/122": (  # change_case:english_capital
        "SHELDON IS A BRILLIANT MIND AND A LOYAL FRIEND TO EVERYONE AROUND HIM.",
        "Sheldon is a brilliant mind and a loyal friend.",
    ),
    "IFEval/138": (  # keywords:frequency (replied, at least 2)
        'Once a princess met a dragon. "Good morning," she replied. The dragon replied with a puff of smoke.',
        "Once a princess met a dragon and they slowly became friends.",
    ),
    "IFEval/143": (  # detectable_format:number_highlighted_sections (at least 1)
        "*Summers in the Countryside*\n\nThe fields were gold and the river was cold.",
        "A song about summers in the countryside, titled Summers in the Countryside.",
    ),
    "IFEval/203": (  # keywords:letter_frequency (letter l, at least 6)
        "Lovely little llamas gallop lightly along the rolling hills.",
        "Many pandas eat bamboo shoots every single day.",
    ),
    "IFEval/205": (  # detectable_content:number_placeholders (at least 1)
        "My accountant [name] says the IRS really stands for It's Really Slow.",
        "My accountant says the IRS really stands for It's Really Slow.",
    ),
    "IFEval/229": (  # length_constraints:nth_paragraph_first_word
        "Check the seat belt routing before anything else.\n\n"
        "Tighten the base until it does not move.\n\n"
        "Keep the straps flat against the child.\n\n"
        "Elm trees shade the driveway while you finish the install.",
        "Car seat installation starts with the base and ends with the straps.",
    ),
    "IFEval/234": (  # detectable_format:constrained_response
        "My answer is maybe.",
        "That is a tricky question about dog sizes.",
    ),
    "IFEval/298": (  # keywords:existence (finale, less)
        "Training a dog with kids should feel like a game with a grand finale, and it needs less pressure and more praise.",
        "Training a dog with kids should feel like a game with plenty of praise.",
    ),
    "IFEval/355": (  # change_case:capital_word_frequency (at least 2)
        "There once was a guy from NANTUCKET who carried his lunch in a BUCKET.",
        "There once was a guy from Nantucket who carried his lunch in a bucket.",
    ),
}

GENERIC_GARBAGE = (
    "Sorry, but this answer does not address the request in any useful way, and it is not even a "
    "reply to the founding question, because the founding document is missing. "
    "We can talk about the field, the issue, the key, the room, the night, the name, the station, "
    "the computer, the project, the proposal, the science, the university, the money, the tax, "
    "the economy, the culture, the education, and the supply, but no real facts appear here. "
    "Our results make no sense, and our approach is a parody of a real reply. "
    "You can check the steps, the demand, the mileage, the fuel, and the result, or you can run "
    "a test, but the truth is that we have no idea. "
    "The kid, the man, the woman, the person, the president, and the collaborator who asked are "
    "still waiting. "
    "Thanks for the message, and please reschedule, rename, or divide the review for another day. "
    "The song, the beauty, the peace of mind, and the storytelling are missing here. "
    "The free sample, the fresh fruit, the rich dessert, and the slow ride are all sold out. "
    "The dead battery, the drowned phone, the flea collar, and the flea market are closed. "
    "The nursery, the killings, the invasion, the revolution, the lawsuit, and the tax are not "
    "part of this reply. "
    "The computer can rename the file, but the file is empty, and the key is lost. "
    "We occupy the room, we slaughter the clock, we sleep instead, and we feed the cat. "
    "The startup, the capsule, the jock, the youngins, the damn crazy yo, and the prehistoric "
    "dupage glassworks in karlovy vary are irrelevant, und heute ist alles schlau, "
    "nourriture comprise. "
    "The moser collection, the blizzard warning, the dade county sheriff, and the icefrog patch "
    "notes are also irrelevant. "
    "Antibodies, enzymes, and other biology terms do not belong here either. "
    "The swift parody, the taylor parody, and the together parody are all absent. "
    "Do not use this text at all, because no correct answer, no beautiful prose, and no useful "
    "json payload appear in it. "
    "In short, nothing here is correct, and the request remains unanswered."
)

# The single fixed fallback answer for unmapped prompts in --garbage mode cannot fail every
# dataset constraint (several are mutually exclusive for one fixed text: "use the letter q
# fewer than 5 times" vs "at least 4 times", "fewer than 4 words in all caps" vs "at least 20",
# "fewer than 30 words" vs "at least 300 words"). The authoring script asserts this cap.
MAX_GENERIC_ACCIDENTAL_PASSES = 10


def main():
    with open(DATASET, "r", encoding="utf-8") as dataset_file:
        records = [json.loads(line) for line in dataset_file if line.strip()]
    by_index = {"IFEval/%d" % index: record for index, record in enumerate(records)}

    entries = []
    failures = []
    for scenario_id, (compliant, garbage) in sorted(
        ANSWERS.items(), key=lambda item: int(item[0].split("/")[1])
    ):
        record = by_index.get(scenario_id)
        if record is None:
            failures.append("%s: not in the dataset" % scenario_id)
            continue
        strict = grader.grade_case(
            record["prompt"], compliant, record["instruction_id_list"], record["kwargs"]
        )
        noncompliant = grader.grade_case(
            record["prompt"], garbage, record["instruction_id_list"], record["kwargs"]
        )
        if not strict["strict"]:
            failures.append(
                "%s: compliant response does NOT pass strictly (%s)" % (scenario_id, strict)
            )
        if noncompliant["strict"]:
            failures.append("%s: garbage response still passes strictly" % scenario_id)
        entries.append(
            {
                "id": scenario_id,
                "key": record["key"],
                "instructionIds": record["instruction_id_list"],
                "compliant": compliant,
                "garbage": garbage,
                "verified": {
                    "compliantStrict": strict["strict"],
                    "compliantLoose": strict["loose"],
                    "garbageStrict": noncompliant["strict"],
                    "garbageLoose": noncompliant["loose"],
                },
            }
        )
        print(
            "[ok ] %-12s compliant strict/loose=%s/%s | garbage strict/loose=%s/%s  %s"
            % (
                scenario_id,
                strict["strict"],
                strict["loose"],
                noncompliant["strict"],
                noncompliant["loose"],
                record["instruction_id_list"][0],
            )
        )

    # Measure the generic fallback against every prompt: in --garbage mode the unmapped
    # scenarios receive it, so its accidental strict passes are the floor of that run.
    accidental = []
    for scenario_id, record in by_index.items():
        if scenario_id in ANSWERS:
            continue
        result = grader.grade_case(
            record["prompt"], GENERIC_GARBAGE, record["instruction_id_list"], record["kwargs"]
        )
        if result["strict"]:
            accidental.append(scenario_id)
    print(
        "\ngenericGarbage: %d words, accidentally compliant for %d/%d unmapped scenarios %s"
        % (len(GENERIC_GARBAGE.split()), len(accidental), len(by_index), accidental)
    )
    if len(accidental) > MAX_GENERIC_ACCIDENTAL_PASSES:
        failures.append(
            "genericGarbage accidentally passes %d scenarios (cap is %d)"
            % (len(accidental), MAX_GENERIC_ACCIDENTAL_PASSES)
        )

    with open(DATASET, "rb") as dataset_file:
        dataset_sha256 = hashlib.sha256(dataset_file.read()).hexdigest()

    payload = {
        "$comment": (
            "Generated by scripts/build-mock-answers.py: verified compliant/garbage answers for "
            "mock end-to-end runs. Each 'compliant' response passes the vendored IFEval checker "
            "strictly; each 'garbage' response fails it strictly. 'genericGarbage' is the single "
            "fallback answer for unmapped prompts; its accidentally-compliant scenario ids are "
            "recorded in 'genericGarbageAccidentalPasses'."
        ),
        "datasetSha256": dataset_sha256,
        "genericGarbage": GENERIC_GARBAGE,
        "genericGarbageWords": len(GENERIC_GARBAGE.split()),
        "genericGarbageAccidentalPasses": accidental,
        "answers": entries,
    }

    if failures:
        print("\nFAILED:")
        for failure in failures:
            print("  - %s" % failure)
        return 1

    with open(OUT, "w", encoding="utf-8") as out_file:
        json.dump(payload, out_file, indent=2, ensure_ascii=False)
        out_file.write("\n")
    print(
        "\nmock-answers: %d mapped scenarios, all verified (compliant=strict pass, garbage=strict fail)"
        % len(entries)
    )
    print("wrote: %s" % OUT)
    return 0


if __name__ == "__main__":
    sys.exit(main())
