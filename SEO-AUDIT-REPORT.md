# COMPREHENSIVE SEO AUDIT REPORT
## livingtrust-attorneys.com - Glendale Keyword Rankings Optimization

**Date:** November 29, 2025
**Focus:** Improve rankings for Glendale-specific keywords (currently position 70-90)
**Primary Goal:** Achieve top 10 rankings for local Glendale legal services keywords

---

## PHASE 1: TECHNICAL AUDIT FINDINGS

### 1.1 SITEMAP.XML ANALYSIS

**Status:** ✓ GOOD - Sitemap exists and is properly formatted

**Current Glendale Pages in Sitemap:**
1. `/locations/glendale` - Priority: 0.6, Last Modified: 2025-01-15
2. `/estate-planning-attorney-glendale` - Priority: 0.9, Last Modified: 2025-01-15
3. `/probate-attorney-glendale` - Priority: 0.9, Last Modified: 2025-01-15
4. `/trust-administration-attorney-glendale` - Priority: 0.9, Last Modified: 2025-11-27

**ISSUES FOUND:**

❌ **CRITICAL:** `/locations/glendale` has lower priority (0.6) than other Glendale pages (0.9)
  - **Fix Required:** Increase priority to 0.9 as this should be the primary Glendale page

❌ **ISSUE:** Outdated lastmod dates (2025-01-15) don't reflect recent content updates
  - **Fix Required:** Update to current date (2025-11-29)

❌ **MISSING PAGES:** New service pages not yet created
  - `/conservatorship-attorney-glendale` - NOT IN SITEMAP
  - `/guardianship-attorney-glendale` - NOT IN SITEMAP
  - `/trust-litigation-attorney-glendale` - NOT IN SITEMAP

**SITEMAP RECOMMENDATIONS:**
- Increase `/locations/glendale` priority from 0.6 to 0.9
- Update all Glendale page lastmod dates to 2025-11-29
- Add 3 new Glendale service pages when created
- Submit updated sitemap to Google Search Console

---

### 1.2 ROBOTS.TXT ANALYSIS

**Status:** ✓ GOOD - No blocking issues

**Current Configuration:**
```
User-agent: *
Allow: /
Disallow: /client-portal
Disallow: /*thank-you*
Sitemap: https://livingtrust-attorneys.com/sitemap.xml
```

**No Issues Found** - All Glendale pages are crawlable

---

### 1.3 DUPLICATE CONTENT & KEYWORD CANNIBALIZATION ANALYSIS

**Status:** ❌ CRITICAL ISSUE - Multiple pages competing for same keywords

**PROBLEM:** Three pages targeting similar Glendale keywords:

1. **`/locations/glendale`**
   - Title: "Affordable Living Trust Attorney Glendale CA | $575"
   - Focus: Living trusts + general estate planning
   - Word Count: ~3,500 words
   - Schema: ✓ LocalBusiness, ✓ FAQPage, ✓ Breadcrumb, ✓ OfferCatalog

2. **`/estate-planning-attorney-glendale`**
   - Title: "Affordable Estate Planning Attorney Glendale CA | Trusts from $575"
   - Focus: Estate planning + living trusts (OVERLAPS with /locations/glendale)
   - Word Count: Est. 2,500-3,000 words
   - Schema: ✓ LocalBusiness, Partial FAQPage

3. **`/probate-attorney-glendale`**
   - Title: "Probate Attorney Glendale CA | We Advance All Costs"
   - Focus: Probate services (DISTINCT - should remain separate)
   - Word Count: Est. 2,500+ words
   - Schema: ✓ FAQPage

**CANNIBALIZATION IMPACT:**

Both `/locations/glendale` and `/estate-planning-attorney-glendale` target:
- "Glendale estate planning attorney"
- "living trust attorney Glendale"
- "estate planning Glendale"
- "living trusts Glendale CA"

**This creates:**
- Google confusion about which page to rank
- Split link equity between two similar pages
- Diluted ranking signals
- Lower rankings for BOTH pages

**RECOMMENDATION:**

✅ **SOLUTION 1 (RECOMMENDED):** 301 Redirect `/estate-planning-attorney-glendale.html` → `/locations/glendale.html`
  - **Pros:** Consolidates all link equity, eliminates cannibalization, strengthens primary page
  - **Cons:** Loses one indexed page (minimal impact if done with 301 redirect)

❌ **SOLUTION 2 (NOT RECOMMENDED):** Keep both pages but dramatically differentiate
  - **Pros:** Maintains two pages
  - **Cons:** Difficult to differentiate estate planning vs. living trusts, continues cannibalization

**DECISION REQUIRED:** Proceed with 301 redirect strategy?

---

### 1.4 INTERNAL LINKING ANALYSIS

**Status:** ⚠️ NEEDS IMPROVEMENT

**Internal Links Found:** 178 total references to Glendale pages across site

**Breakdown by Page:**
- Links to `/probate-attorney-glendale`: Most common
- Links to `/estate-planning-attorney-glendale`: Moderate
- Links to `/locations/glendale`: FEWEST (problem!)

**ISSUES IDENTIFIED:**

❌ **Problem 1:** `/locations/glendale` receives fewer internal links than secondary pages
  - Should be reversed - main page should have most links

❌ **Problem 2:** Missing cross-links between Glendale service pages
  - Pages don't link to each other with keyword-rich anchor text

❌ **Problem 3:** Homepage likely doesn't prominently link to `/locations/glendale`
  - Need to verify and add if missing

❌ **Problem 4:** Blog posts not linking to Glendale pages
  - Need to add contextual links from relevant blog content

**INTERNAL LINKING FIXES REQUIRED:**

1. Add prominent link from homepage to `/locations/glendale` with anchor: "Glendale trust attorney"
2. Add cross-links between all Glendale pages in a "Related Services" section
3. Add internal links from blog posts mentioning Glendale, trusts, probate, conservatorship
4. Use keyword-rich anchor text (not "click here" or generic text)

---

### 1.5 SCHEMA MARKUP ANALYSIS

**Status:** ✓ MOSTLY GOOD - But inconsistencies exist

#### `/locations/glendale` Schema:
- ✅ LocalBusiness/Attorney schema
- ✅ FAQPage schema (4 questions)
- ✅ BreadcrumbList schema
- ✅ OfferCatalog schema (pricing)
- **Grade: A**

#### `/estate-planning-attorney-glendale` Schema:
- ✅ LocalBusiness/Attorney schema
- ❌ NO FAQPage schema (page has FAQs but no schema markup)
- ❌ NO BreadcrumbList schema
- ✅ OfferCatalog schema
- **Grade: C+ (needs FAQPage and Breadcrumb schema)**

#### `/probate-attorney-glendale` Schema:
- ✅ FAQPage schema (8 questions - excellent!)
- ❌ NO LocalBusiness schema (MISSING!)
- ❌ NO BreadcrumbList schema
- **Grade: C (critical LocalBusiness schema missing)**

#### `/trust-administration-attorney-glendale` Schema:
- ✅ Exists and has been recently updated (2025-11-27)
- Schema details not yet reviewed in full

**SCHEMA FIXES REQUIRED:**

1. Add LocalBusiness schema to `/probate-attorney-glendale`
2. Add FAQPage schema to `/estate-planning-attorney-glendale`
3. Add BreadcrumbList schema to ALL Glendale pages
4. Ensure consistent schema across all pages
5. Add schema to new pages when created

---

### 1.6 MISSING KEYWORDS ANALYSIS

**CRITICAL FINDING:** Target keywords NOT FOUND in existing content

Searched all Glendale pages for these exact phrases from Search Console:

❌ **NOT FOUND ON SITE:**
- "Glendale trust attorney" (position 87.6) - EXACT phrase not used
- "Glendale trusts lawyer" (position 76.7) - EXACT phrase not used
- "Glendale trust lawyer" (position 90.6) - EXACT phrase not used
- "Glendale probate and trusts lawyer" (position 85.8) - EXACT phrase not used
- "Glendale probate and trusts attorney" (position 85.7) - EXACT phrase not used
- "Glendale probate litigation lawyer" (position 71.7) - NO page exists!
- "Glendale probate litigation attorney" (position 79.3) - NO page exists!
- "Glendale conservatorship lawyers" (position 63.6) - NO page exists!
- "Glendale wills attorney" (position 91.4) - Not emphasized enough

**WHY THIS MATTERS:**

Google needs to see the EXACT keyword phrases users are searching for. While pages have variations like:
- "Living trust attorney in Glendale" ✓ (found)
- "Glendale living trust attorney" ✓ (found)

They're missing the exact phrases people actually search for:
- "Glendale trust attorney" ❌ (NOT found as exact phrase)
- "Glendale trust lawyer" ❌ (NOT found)

**FIX REQUIRED:** Add these exact keyword phrases naturally throughout content in:
- Title tags
- H1 and H2 headings
- First 100 words of body content
- Naturally throughout body (3-5 times each for primary keywords)
- Image alt text
- Meta descriptions

---

### 1.7 MISSING SERVICE PAGES

**CRITICAL SEO OPPORTUNITY:**

Users are searching for services that DON'T HAVE dedicated pages:

❌ **Missing Page #1:** Conservatorship Attorney Glendale
- "glendale conservatorship lawyer" - Position 63.6
- "glendale conservatorship attorney" - Likely similar position
- **Impact:** Losing traffic and clients searching for this specific service

❌ **Missing Page #2:** Guardianship Attorney Glendale
- Searches detected but no dedicated Glendale page
- General guardianship page exists but lacks local focus

❌ **Missing Page #3:** Trust Litigation Attorney Glendale
- "glendale probate litigation lawyer" - Position 71.7
- "glendale probate litigation attorney" - Position 79.3
- "california trust litigation" - Position 85.0
- **Impact:** No page to capture this high-value practice area

❌ **Missing Page #4:** Enhanced Trust Administration Attorney Glendale
- Page exists but needs keyword optimization
- Missing "california trust administration checklist" (Position 44.5)
- Missing "trust administration checklist california"
- This keyword is closest to page 1 - LOW-HANGING FRUIT!

---

## PHASE 1 AUDIT SUMMARY

### Critical Issues (Must Fix Immediately):
1. ❌ **Keyword cannibalization** between /locations/glendale and /estate-planning-attorney-glendale
2. ❌ **Missing exact keyword phrases** that people are actually searching for
3. ❌ **Missing service pages** for conservatorship, litigation, enhanced guardianship
4. ❌ **Incomplete schema markup** on some pages
5. ❌ **Weak internal linking** to primary Glendale page

### Priority Fixes:
1. **Immediate:** Add missing keywords to existing pages
2. **Immediate:** Fix keyword cannibalization (301 redirect)
3. **High Priority:** Create 4 missing service pages
4. **High Priority:** Complete schema markup on all pages
5. **Medium Priority:** Improve internal linking structure
6. **Medium Priority:** Update sitemap.xml

### Expected Impact:
- **Timeline:** 30-60 days to see ranking improvements after fixes
- **Target:** Move from position 70-90 to position 10-30 within 60 days
- **Goal:** Achieve top 10 rankings within 90-120 days

---

## NEXT STEPS

**PHASE 2:** Fix keyword cannibalization (requires decision on 301 redirect)
**PHASE 3:** Add missing keywords to existing pages
**PHASE 4:** Create 4 new Glendale service pages
**PHASE 5:** Complete schema markup implementation
**PHASE 6:** Implement internal linking improvements
**PHASE 7:** Optimize all meta tags
**PHASE 8:** Update sitemap.xml
**PHASE 9:** Submit to Google Search Console
**PHASE 10:** Generate final deliverables report

---

**Report Prepared By:** Claude (AI SEO Audit)
**For:** Law Offices of Rozsa Gyene
**Website:** livingtrust-attorneys.com
**Date:** November 29, 2025
