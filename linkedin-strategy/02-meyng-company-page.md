# MEYNG LinkedIn Company Page — Setup Guide

## Step-by-Step Creation

1. Go to: https://www.linkedin.com/company/setup/new/
2. Fill in the following:

---

### Basic Information

| Field                   | Value                                |
| ----------------------- | ------------------------------------ |
| **Name**                | MEYNG                                |
| **LinkedIn public URL** | linkedin.com/company/meyng           |
| **Website**             | https://meyng.com                    |
| **Industry**            | Technology, Information and Internet |
| **Organization size**   | 2-10 employees                       |
| **Organization type**   | Privately Held                       |
| **Year founded**        | 2023                                 |

---

### Tagline (120 characters max)

```
AI That Matters — Building accessible AI products for underserved communities worldwide.
```

---

### Description (copy-paste ready)

```
MEYNG is an AI company dedicated to building products that fight for accessibility — bridging gaps in language, education, food sustainability, and community development for those left behind.

We believe AI should be a force for equity, not exclusion. Every product we build tackles a specific barrier that keeps underserved communities from reaching their potential.

OUR PRODUCTS:

SangoAI — The first AI-powered language platform for Sango, the national language of the Central African Republic spoken by 5M+ people. Real-time translation, conversational AI, interactive learning, and a developer API.

Obetrack — An AI-powered mobile app helping households and businesses reduce food waste through smart inventory tracking, expiry predictions, and intelligent notifications.

eNdara — An SMS-based learning platform delivering quality education to students without internet access. AI-personalized lessons via basic text messaging — no smartphone needed.

ConnectZ — A collaborative portal for NGOs and municipalities to manage projects, track outcomes, and improve impact reporting with AI-generated insights.

WHAT DRIVES US:

- AI-First: Every product harnesses artificial intelligence to solve real problems
- Accessibility-First: We design for the hardest constraints — no internet, no smartphone, no literacy
- Impact-Driven: We measure success in barriers removed and lives improved

Founded in 2023 and based in Paris, France.

Learn more: https://meyng.com
Contact: contact@meyng.com
```

---

### Visual Assets

**Logo:**

- Use your MEYNG logo (the one from meyng.com)
- Recommended size: 300 x 300 px, PNG with transparent background
- File location: `C:\meyng-website\public\images\logo-icon.png` or crop from `logo-full.png`

**Cover Image:**

- Recommended size: 1128 x 191 px
- Create on Canva:
  1. New design > Custom size: 1128 x 191
  2. Dark gradient background (#0a0a1a to #1a0a2e) matching MEYNG brand
  3. Add text: "AI That Matters" in white Montserrat font
  4. Optionally add the 4 product icons (Languages, Leaf, Book, Users)

---

### Specialties (add all)

- Artificial Intelligence
- Machine Learning
- Natural Language Processing
- Language Technology
- Education Technology
- Food Sustainability
- Social Impact
- Accessibility
- Cloud Computing
- API Development

---

### Locations

```
Paris, France (Headquarters)
```

---

### Hashtags to follow (for the page)

- #AIforGood
- #TechForGood
- #LanguageTechnology
- #EdTech
- #FoodWaste
- #SocialImpact
- #Accessibility

---

## After Creation — First Actions

1. **Invite connections** to follow the page (but be selective — invite AI/tech/impact people, not Atos colleagues)
2. **Post the first 5 pieces of content** (see next document)
3. **Add the page URL** to your meyng.com footer and about page
4. **Update the website** footer LinkedIn link from your personal profile to the company page

---

## Update meyng.com LinkedIn Link

The current footer links to your personal LinkedIn. Update to the MEYNG company page:

File: `src/components/Footer.tsx` — Change:

```
href="https://linkedin.com/company/meyng"
```

(This is already set correctly!)

Also update in `src/components/Navbar.tsx` if LinkedIn is linked there.
