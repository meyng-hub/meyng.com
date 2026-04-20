---
title: "Building NLP for a Language with Zero Digital Resources: The Sango Story"
author: "Michel WENEZOUI"
role: "Founder & Engineer at MEYNG"
date: "2026-04-02"
tags:
  ["nlp", "sango", "low-resource-languages", "open-source", "african-languages"]
description: "How we built the first open-source NLP toolkit for Sango, a language spoken by 5 million people but invisible to modern AI."
---

# Building NLP for a Language with Zero Digital Resources: The Sango Story

When people talk about the "digital divide," they usually mean internet access. But there is a deeper divide that rarely gets discussed: the languages that AI simply does not speak.

Sango is the national language of the Central African Republic. Over 5 million people use it daily. It is a lingua franca across the country, used in markets, schools, radio broadcasts, and everyday conversation. And yet, before we started this project, there was no tokenizer for Sango. No language model. No structured dataset. No NLP pipeline of any kind.

Try typing a Sango sentence into any translation service. You will get nothing, or worse, you will get a confidently wrong French translation because the system confused Sango diacritics with French accents.

This post is about building `@meyng/sango-nlp`, the first open-source NLP toolkit for Sango, and the dataset we published alongside it. It is not a story about breakthroughs in deep learning. It is a story about the unglamorous foundational work that has to happen before any of that is possible.

## What makes Sango difficult for existing NLP tools

Sango is a creole language with roots in Ngbandi, heavily influenced by French, and carrying structural features that do not map cleanly onto the assumptions baked into most NLP libraries.

**Tonal orthography.** Sango uses diacritics to mark tone, but not the same way French does. Circumflex marks high tone (â, ê, î, ô, û), diaeresis marks mid tone (ä, ë, ï, ö, ü). The word "fa" means "to show." The word "fâ" means "to kill." Standard Unicode normalization can destroy this distinction, and most tokenizers treat these as equivalent characters.

**Nasal consonant clusters.** Sango has consonant combinations that are phonologically single units but look like multi-character sequences to a tokenizer: `mb`, `nd`, `ng`, `ngb`, `nz`, `nj`, `ndr`. The word "ngû" (water) starts with what is effectively one consonant. Splitting on character boundaries here produces garbage.

**Hyphenated compounds.** Sango forms compound words with hyphens that should remain single tokens. "Balë-ôko" (ten, literally "hands-one") is one lexical unit. A tokenizer that splits on hyphens will break it into fragments that lose meaning.

**Isolating morphology with productive affixation.** Sango is largely isolating -- words do not inflect much. But it does have a small, productive set of affixes. The prefix `wa-` marks an agent ("wandë" = foreigner, from "ndë"). The suffix `-ngö` nominalizes verbs ("längö" = sleep/sleeping, from "lä"). A stemmer for Sango needs to know these patterns without over-applying them.

## The toolkit: @meyng/sango-nlp

We built four core modules. Each one forced us to make decisions about Sango linguistics that, as far as we can tell, had never been formalized in code before.

### Tokenizer

The tokenizer splits Sango text into typed tokens while preserving diacritics and keeping hyphenated compounds intact.

```typescript
import { tokenize } from "@meyng/sango-nlp";

const tokens = tokenize("Bara âla, tongana nye?");
// [
//   { text: "Bara",     type: "word",        offset: 0 },
//   { text: "âla",      type: "word",        offset: 5 },
//   { text: ",",        type: "punctuation", offset: 8 },
//   { text: "tongana",  type: "word",        offset: 10 },
//   { text: "nye",      type: "word",        offset: 18 },
//   { text: "?",        type: "punctuation", offset: 21 },
// ]
```

The key design decision was the character class. We defined a regex that explicitly includes every diacritical variant used in Sango orthography, and we match words as sequences of these characters, optionally joined by hyphens:

```typescript
const SANGO_LETTER = /[a-zA-ZàâäáãèéêëìîïíòóôöùúûüñçÀÂÄÁÃÈÉÊËÌÎÏÍÒÓÔÖÙÚÛÜÑÇ]/;

const WORD_PATTERN = new RegExp(
  `${SANGO_LETTER.source}+(?:-${SANGO_LETTER.source}+)*`,
  "u",
);
```

The tokenizer also identifies Sango grammatical particles -- function words like "na" (and/with), "ti" (possessive marker), "ngba" (but), "ndo" (or) -- which matters for downstream tasks like parsing and translation.

### Language detection

How do you detect a language that no detection library supports? We built a 3-signal algorithm that combines word frequency matching, character pattern analysis, and morphological heuristics.

```typescript
import { detectLanguage } from "@meyng/sango-nlp";

detectLanguage("Bara âla, tongana nye?");
// { language: "sg", confidence: 0.92,
//   scores: { sg: 0.92, fr: 0.05, en: 0.03, unknown: 0 } }
```

The three signals, weighted and combined:

1. **Word matching (50% weight)** -- We compare against curated word lists for Sango, French, and English. The Sango list includes particles, pronouns, common verbs, greetings, and nouns chosen specifically because they do not overlap with French or English.

2. **Character patterns (30% weight)** -- Sango-specific diacritics and consonant clusters are strong indicators. The presence of characters like ë, ö, ü (diaeresis vowels) or clusters like `ngb`, `ndr`, `ndz` strongly signal Sango over French, which uses a different subset of diacritics.

3. **Morphological analysis (20% weight)** -- Sango words tend to be short (3-5 characters) and end in vowels. We measure the vowel-ending ratio and average word length as additional discriminators.

For short texts (fewer than 3 words), confidence is capped at 0.7 because there genuinely is not enough signal to be certain. This is an honest design choice -- we would rather report low confidence than hallucinate certainty.

### Stemmer and normalizer

The stemmer strips known Sango affixes to approximate base forms. It is deliberately conservative: one prefix and one suffix per word, with a minimum stem length of 2 characters, and an exception list for particles and short words that would be destroyed by stemming.

```typescript
import { stem, normalize } from "@meyng/sango-nlp";

stem("längö"); // "lä"    -- strips nominalizer -ngö
stem("wandë"); // "ndë"   -- strips agentive wa-
stem("nzoni"); // "nzoni" -- no known affixes, left alone
stem("na"); // "na"    -- exception: particle, never stemmed
```

The normalizer strips diacritics for search and comparison without losing the ability to work with tonal forms:

```typescript
normalize("nzônî"); // "nzoni"
normalize("längö"); // "lango"
```

This is critical for user-facing search. A user looking up a word might not type the tone marks. The dictionary needs to find "nzoni" when someone searches for "nzônî" and vice versa.

### Dictionary with fuzzy matching

The dictionary module provides exact, normalized, and fuzzy lookup across Sango, French, and English. It ships with built-in vocabulary and supports runtime extension.

```typescript
import { SangoDictionary } from "@meyng/sango-nlp";

const dict = new SangoDictionary();

// Diacritic-insensitive lookup
dict.lookup("nzoni");
// { sango: "Nzoni", french: "Bon/Bien", english: "Good/Well", ... }

// Fuzzy search handles typos
dict.search("nzni", { maxDistance: 2 });
// [{ entry: {...}, distance: 1, matchedField: "sango" }]

// Cross-language search
dict.search("water");
// [{ entry: { sango: "Ngû", english: "Water", ... }, distance: 0 }]
```

Fuzzy matching uses Levenshtein distance computed on normalized forms, so diacritic differences do not inflate the edit distance. Searching for "koli" will find "Kôlï" (brother) at distance 0 because after normalization, they are identical.

## The dataset

Code without data is infrastructure without a road. We compiled and published a trilingual vocabulary dataset on Hugging Face as `meyng/sango-vocabulary`:

- **431 vocabulary entries** with Sango, French, and English translations
- **360 translation pairs** for training and evaluation
- Organized by category (greetings, numbers, family, verbs, food, time, nature, body)
- Difficulty levels (beginner through expert)
- Pronunciation guides for key words

We chose the **CC-BY-SA-4.0** license deliberately. Language data for endangered and underrepresented languages should be a commons, not a proprietary asset. The share-alike clause ensures that anyone who builds on this dataset must keep their derivatives open. For a language with zero existing digital resources, locking data behind restrictive licenses would be actively harmful.

The dataset is small by NLP standards. That is the point. There is no massive Sango corpus sitting in an archive somewhere waiting to be digitized. Every entry was curated by hand, verified by speakers, and structured for machine consumption.

## Challenges unique to low-resource languages

Building NLP for Sango exposed problems that you simply do not encounter when working with English, French, or Mandarin.

**No reference corpus.** When you build a tokenizer for English, you can validate it against millions of documents. For Sango, our test suite is the most comprehensive collection of structured Sango text processing tests that exists. There is no benchmark to compare against because we are creating the benchmark.

**Orthographic variation.** Sango spelling is not fully standardized. Different writers use different conventions for tone marking. Some texts use diacritics consistently, others omit them entirely, and a third group uses them partially. Our normalizer exists specifically because of this reality -- you cannot require users to input perfectly marked text.

**Pervasive code-switching.** Most Sango speakers are bilingual with French. Real-world Sango text frequently mixes both languages within a single sentence. Our language detector had to handle graceful degradation on mixed-language input rather than forcing a binary classification.

**No transfer learning shortcut.** For many African languages, you can bootstrap NLP by transfer learning from a related, better-resourced language. Sango's situation is unusual: it is a creole that emerged from Ngbandi but has diverged significantly, absorbing French loanwords and developing its own morphological patterns. You cannot just fine-tune a French model or a Ngbandi model (which does not exist either) and expect reasonable results.

## What comes next

The toolkit and dataset are foundations. Here is what we are working toward:

**Fine-tuning a small language model.** We published our first Sango language model, [MEYNG/sango-tinyllama-lora](https://huggingface.co/MEYNG/sango-tinyllama-lora), on HuggingFace -- a LoRA fine-tune trained on our Sango translation pairs. It is not GPT-scale, but a focused model that handles the specific patterns of Sango-French-English trilingual text. We are continuing to improve it as our dataset grows.

**Crowdsourcing native speaker audio.** Our language learning platform at sangoai.sbs currently disables its pronunciation feature in production because it was using French text-to-speech as a proxy for Sango -- which teaches incorrect pronunciation. We need recordings from native speakers for each vocabulary entry. This is a community effort, not a technical one.

**SMS-based learning.** We built an SMS learning pipeline using Africa's Talking, with a lesson engine and fuzzy matching. In the Central African Republic, smartphone penetration is low but basic mobile phone ownership is widespread. This SMS interface for vocabulary learning reaches communities that a web app never will. The NLP toolkit runs server-side precisely because we anticipated this use case -- the processing happens where the compute is, not on the client device.

## Try it

```bash
npm install @meyng/sango-nlp
```

The source is at [github.com/meyng-hub/sango-nlp](https://github.com/meyng-hub/sango-nlp). The dataset is at [huggingface.co/datasets/meyng/sango-vocabulary](https://huggingface.co/datasets/meyng/sango-vocabulary). Both are open source.

If you work on low-resource language NLP, or if you speak Sango and want to contribute vocabulary, pronunciation recordings, or orthographic expertise, reach out at contact@meyng.com.

Every language deserves to exist in the digital world. We are building the tools to make that possible for Sango.

---

_Michel WENEZOUI is the founder and lead engineer at [MEYNG](https://meyng.com), building technology for underrepresented languages. SangoAI is live at [sangoai.sbs](https://sangoai.sbs)._
