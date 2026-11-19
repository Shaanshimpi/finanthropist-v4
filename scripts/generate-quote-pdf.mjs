import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

async function generateQuotationPdf() {
  const logoBase64 = fs.readFileSync('public/static-media/logo.png').toString('base64');

  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Proposal &amp; Quotation: Organic Search, GEO &amp; Lead Growth Package - Finanthropist</title>
  <style>
    @page {
      size: A4;
      margin: 12mm 15mm 12mm 15mm;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      background: #ffffff;
      color: #0f172a;
      font-size: 8.7pt;
      line-height: 1.42;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    .page {
      page-break-after: always;
      position: relative;
      min-height: 260mm;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .page:last-child {
      page-break-after: avoid;
    }

    /* Minimal Header */
    .doc-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 10px;
      border-bottom: 1px solid #e2e8f0;
      margin-bottom: 14px;
    }

    .doc-header .logo-container img {
      height: 32px;
      object-fit: contain;
    }

    .doc-header .header-meta {
      text-align: right;
    }

    .doc-header .header-meta .doc-type {
      font-size: 7.6pt;
      font-weight: 700;
      color: #475569;
      letter-spacing: 0.8px;
      text-transform: uppercase;
    }

    .doc-header .header-meta .doc-ref {
      font-size: 7.1pt;
      color: #94a3b8;
      margin-top: 1px;
    }

    /* Document Title Block */
    .title-block {
      margin-bottom: 12px;
    }

    .title-block .meta-label {
      font-size: 7.3pt;
      font-weight: 700;
      color: #b45309;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      margin-bottom: 3px;
      display: inline-block;
    }

    .title-block h1 {
      font-size: 17pt;
      font-weight: 800;
      color: #0f172a;
      letter-spacing: -0.4px;
      line-height: 1.25;
      margin-bottom: 4px;
    }

    .title-block p.subtitle {
      font-size: 8.9pt;
      color: #475569;
      line-height: 1.4;
    }

    /* Target Client Card */
    .client-card {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr;
      gap: 12px;
      padding: 8px 12px;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      margin-bottom: 12px;
      font-size: 8.2pt;
    }

    .client-card-item .label {
      font-size: 6.6pt;
      font-weight: 700;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 2px;
    }

    .client-card-item .val {
      font-weight: 600;
      color: #0f172a;
    }

    /* Badges */
    .badge {
      display: inline-block;
      padding: 1.5px 6px;
      border-radius: 4px;
      font-size: 6.8pt;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.35px;
      white-space: nowrap;
    }

    .badge-success {
      background: #ecfdf5;
      color: #047857;
      border: 1px solid #a7f3d0;
    }

    .badge-neutral {
      background: #f1f5f9;
      color: #475569;
      border: 1px solid #cbd5e1;
    }

    .badge-gold {
      background: #fef3c7;
      color: #92400e;
      border: 1px solid #fde68a;
    }

    .badge-danger {
      background: #fef2f2;
      color: #b91c1c;
      border: 1px solid #fecaca;
    }

    /* Section Headings */
    .section-title {
      font-size: 10pt;
      font-weight: 700;
      color: #0f172a;
      margin-bottom: 5px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #f1f5f9;
      padding-bottom: 3px;
    }

    .section-desc {
      font-size: 8.3pt;
      color: #475569;
      margin-bottom: 7px;
      line-height: 1.4;
    }

    /* Tables */
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 3px;
      margin-bottom: 9px;
      font-size: 7.9pt;
    }

    th {
      background: #f8fafc;
      color: #475569;
      text-align: left;
      padding: 5px 7px;
      font-weight: 700;
      font-size: 7pt;
      text-transform: uppercase;
      letter-spacing: 0.4px;
      border-top: 1px solid #e2e8f0;
      border-bottom: 1px solid #e2e8f0;
    }

    td {
      padding: 4.5px 7px;
      border-bottom: 1px solid #f1f5f9;
      color: #1e293b;
      vertical-align: middle;
    }

    tr:last-child td {
      border-bottom: 1px solid #e2e8f0;
    }

    /* Comparison Table Compact Overrides */
    .comparison-table {
      font-size: 7.3pt;
      margin-top: 2px;
      margin-bottom: 6px;
    }

    .comparison-table th {
      padding: 4px 6px;
      font-size: 6.8pt;
    }

    .comparison-table td {
      padding: 2.8px 6px;
      line-height: 1.25;
    }

    /* Callout & Detail Boxes */
    .box {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      padding: 7px 10px;
      margin-bottom: 7px;
    }

    .box-title {
      font-size: 8.6pt;
      font-weight: 700;
      color: #0f172a;
      margin-bottom: 2px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .box-desc {
      font-size: 8pt;
      color: #334155;
      line-height: 1.36;
    }

    .grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
    }

    .banner-stat {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      margin-bottom: 7px;
    }

    .stat-card {
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      padding: 7px 10px;
      background: #f8fafc;
    }

    .stat-card.active {
      border: 1.5px solid #0f172a;
      background: #f8fafc;
    }

    .stat-card .label {
      font-size: 6.9pt;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #64748b;
      margin-bottom: 2px;
    }

    .stat-card.active .label {
      color: #b45309;
    }

    .stat-card .value {
      font-size: 12pt;
      font-weight: 800;
      color: #0f172a;
      margin-bottom: 2px;
    }

    .stat-card .desc {
      font-size: 7.5pt;
      color: #475569;
      line-height: 1.3;
    }

    /* Pricing Card */
    .pricing-card {
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      padding: 10px 12px;
      background: #ffffff;
      position: relative;
    }

    .pricing-card.recommended {
      border: 1.5px solid #0f172a;
      background: #f8fafc;
    }

    .pricing-card .tier-tag {
      font-size: 7.2pt;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #64748b;
      margin-bottom: 2px;
    }

    .pricing-card.recommended .tier-tag {
      color: #b45309;
    }

    .pricing-card .price {
      font-size: 15pt;
      font-weight: 800;
      color: #0f172a;
      margin-bottom: 4px;
    }

    .pricing-card .price-term {
      font-size: 7.6pt;
      font-weight: 500;
      color: #64748b;
    }

    ul.clean-list {
      list-style: none;
      padding-left: 0;
      margin: 3px 0;
    }

    ul.clean-list li {
      position: relative;
      padding-left: 13px;
      margin-bottom: 3px;
      font-size: 7.7pt;
      color: #334155;
      line-height: 1.34;
    }

    ul.clean-list li.check::before {
      content: "✓";
      color: #059669;
      position: absolute;
      left: 0;
      font-weight: bold;
      font-size: 7.3pt;
    }

    ul.clean-list li.cross {
      color: #94a3b8;
    }

    ul.clean-list li.cross::before {
      content: "✕";
      color: #cbd5e1;
      position: absolute;
      left: 0;
      font-weight: bold;
      font-size: 7.3pt;
    }

    /* Footer */
    .doc-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid #e2e8f0;
      padding-top: 6px;
      font-size: 7pt;
      color: #94a3b8;
    }

    .doc-footer .confidential {
      color: #64748b;
      font-weight: 500;
    }
  </style>
</head>
<body>

  <!-- PAGE 1: STRATEGIC CONTEXT & OBJECTIVES -->
  <div class="page">
    <div>
      <div class="doc-header">
        <div class="logo-container">
          <img src="data:image/png;base64,${logoBase64}" alt="Finanthropist Logo" />
        </div>
        <div class="header-meta">
          <div class="doc-type">PROPOSAL &amp; SCOPE OF WORK</div>
          <div class="doc-ref">Commercial Proposal • Ref: FIN-SEO-2026-V2</div>
        </div>
      </div>

      <div class="title-block">
        <span class="meta-label">Organic Growth, AI Citation &amp; Conversion Suite</span>
        <h1>Organic Search, GEO &amp; Lead Growth Package</h1>
        <p class="subtitle">
          Comprehensive project proposal to position Finanthropist Educare as the top search result,
          AI-recommended authority, and high-conversion platform for Marathi stock market education.
        </p>
      </div>

      <div class="client-card">
        <div class="client-card-item">
          <div class="label">Target Client</div>
          <div class="val">Finanthropist Educare Pvt Ltd (https://finanthropist.com)</div>
        </div>
        <div class="client-card-item">
          <div class="label">Prepared By</div>
          <div class="val">Firefist Solutions</div>
        </div>
        <div class="client-card-item">
          <div class="label">Target Timeline</div>
          <div class="val">10–14 Business Days</div>
        </div>
      </div>

      <div class="section-title">
        <span>1. Context: Moving from Technical Foundation to Market Dominance</span>
        <span class="badge badge-success">Phase 1 Complete</span>
      </div>
      <p class="section-desc">
        We recently completed <strong>Phase 1: Technical &amp; Compliance Foundation</strong> on your live website.
        We corrected server routing, allowed OpenAI SearchBot, deployed live XML sitemaps, and configured initial schemas.
        Your platform is now 100% compliant and accessible to search bots.
      </p>
      <p class="section-desc">
        However, to win high-intent queries like <strong>"best share market class in marathi"</strong>,
        <strong>"share market course in marathi"</strong>, or <strong>"trading classes in nashik"</strong>,
        Google and ChatGPT require <strong>search-intent content depth and conversion mechanisms</strong>.
        Search engines rank websites with dedicated course landing pages, rich structured FAQs, authoritative guides,
        and high student engagement. This package builds the complete search and enrollment engine.
      </p>

      <div class="section-title" style="margin-top: 9px;">
        <span>2. High-Intent Target Queries &amp; Asset Mapping</span>
        <span class="badge badge-neutral">Keyword Focus</span>
      </div>
      <table>
        <thead>
          <tr>
            <th style="width: 36%;">Target User Query</th>
            <th style="width: 32%;">User Search Intent</th>
            <th style="width: 32%;">Winning Platform Asset</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>"best share market course in marathi"</strong></td>
            <td>Learner seeking Marathi-medium training</td>
            <td>Dedicated Marathi Course Landing Page</td>
          </tr>
          <tr>
            <td><strong>"share market classes in nashik / pune"</strong></td>
            <td>Local investor seeking regional institute</td>
            <td>Nashik / Maharashtra Regional Landing Page</td>
          </tr>
          <tr>
            <td><strong>"futures &amp; options trading class in marathi"</strong></td>
            <td>Advanced student searching F&amp;O module</td>
            <td>Dedicated F&amp;O &amp; Options Landing Page</td>
          </tr>
          <tr>
            <td><strong>"share market course fees &amp; validity in marathi"</strong></td>
            <td>Buyer researching pricing &amp; credibility</td>
            <td>Interactive FAQ Hub + Google Rich Snippet</td>
          </tr>
          <tr>
            <td><strong>"who is the best share market teacher in maharashtra"</strong></td>
            <td>ChatGPT prompt seeking recommendations</td>
            <td>Authority Comparison &amp; Educational Suite</td>
          </tr>
          <tr>
            <td><strong>"direct contact / whatsapp for share market class"</strong></td>
            <td>High-intent visitor seeking quick inquiry</td>
            <td>Direct WhatsApp Quick-Inquiry System</td>
          </tr>
        </tbody>
      </table>

      <div class="section-title" style="margin-top: 7px;">
        <span>3. Scope Structure &amp; Tier Overview</span>
      </div>
      <p class="section-desc">
        To address your immediate business goals, we have organized the platform deliverables into two distinct tiers:
        <strong>Option 1 (Core Search Sprint)</strong> provides the fundamental search foundation, while
        <strong>Option 2 (Comprehensive GEO &amp; Growth Engine)</strong> delivers the complete ecosystem:
        3 search landing pages, blog authority, 5 high-converting lead capture engines, and local map dominance.
      </p>
    </div>

    <div class="doc-footer">
      <div>Finanthropist Educare • Prepared by Firefist Solutions</div>
      <div class="confidential">Confidential Commercial Document</div>
      <div>Page 1 of 5</div>
    </div>
  </div>

  <!-- PAGE 2: SEARCH & CONTENT SPECIFICATIONS -->
  <div class="page">
    <div>
      <div class="doc-header">
        <div class="logo-container">
          <img src="data:image/png;base64,${logoBase64}" alt="Finanthropist Logo" />
        </div>
        <div class="header-meta">
          <div class="doc-type">TECHNICAL SPECIFICATIONS: PART 1</div>
          <div class="doc-ref">Search, GEO &amp; Schema Modules</div>
        </div>
      </div>

      <div class="section-title">
        <span>Module 1: Dedicated Search-Intent Landing Pages</span>
        <span class="badge badge-neutral">3 Targeted Pages</span>
      </div>
      <p class="section-desc">
        We will design, develop, and publish dedicated landing pages directly inside your Next.js application,
        each engineered to match specific high-volume Google searches and convert visitors into enrolled students:
      </p>

      <div class="box">
        <div class="box-title">
          <span>Page 1: /share-market-course-in-marathi</span>
          <span class="badge badge-success">Included in Option 1 &amp; Option 2</span>
        </div>
        <div class="box-desc">
          <strong>Target Query:</strong> "Best share market course in Marathi", "Learn stock market from basics in Marathi".<br />
          <strong>Features:</strong> Full syllabus (Equity, Technical Analysis, Wealth Psychology), Marathi teaching highlights,
          lifetime family support breakdown, student testimonials, and embedded Google <code>Course</code> Schema.
        </div>
      </div>

      <div class="box">
        <div class="box-title">
          <span>Page 2: /share-market-classes-nashik</span>
          <span class="badge badge-success">Included in Option 1 &amp; Option 2</span>
        </div>
        <div class="box-desc">
          <strong>Target Query:</strong> "Best share market classes in Nashik", "Stock market institute near me".<br />
          <strong>Features:</strong> Local Nashik office details, regional credibility, Sammeer Sarang's 23+ years banking background,
          and embedded <code>LocalBusiness</code> Schema with exact geographic coordinates.
        </div>
      </div>

      <div class="box" style="border-left: 3px solid #b45309;">
        <div class="box-title">
          <span>Page 3: /options-trading-course-marathi</span>
          <span class="badge badge-gold">Option 2 Exclusive ★</span>
        </div>
        <div class="box-desc">
          <strong>Target Query:</strong> "Options trading classes in Marathi", "Futures &amp; Options course Maharashtra".<br />
          <strong>Features:</strong> Practical F&amp;O module breakdown, risk management framework, live market chart reading,
          trading psychology, and clear SEBI-safe educational disclaimers. <em>(High-ticket course driver: ₹15,000–₹25,000 tuition).</em>
        </div>
      </div>

      <div class="section-title" style="margin-top: 9px;">
        <span>Module 2: Interactive FAQ Hub &amp; Google Rich Snippets</span>
        <span class="badge badge-success">Included in Option 1 &amp; Option 2</span>
      </div>
      <p class="section-desc">
        We will build a responsive, branded FAQ accordion on your Home and Course pages answering the top 10 questions
        potential students ask (fees, Marathi-English medium, beginner eligibility, recordings, refund policy).
      </p>
      <div class="box">
        <div class="box-desc">
          <strong>Google Rich Snippet Integration:</strong> Coded with Google's official <code>FAQPage</code> JSON-LD schema.
          When people search for your courses, Google displays expandable question-and-answer accordions directly beneath
          your search snippet, occupying 2x more visual space on mobile search results and boosting click-through rates.
        </div>
      </div>

      <div class="section-title" style="margin-top: 9px;">
        <span>Module 3: AI &amp; Search Authority Guide Suite (3 Articles)</span>
        <span class="badge badge-gold">Option 2 Exclusive ★</span>
      </div>
      <p class="section-desc">
        ChatGPT Search recommends service providers that have authoritative, educational articles published on their domain.
        We will activate your blog architecture and publish three comprehensive, formatted cornerstone guides:
      </p>
      <ul class="clean-list">
        <li class="check"><strong>Guide 1:</strong> <em>"How to Choose the Best Share Market Class in Marathi (Complete Guide for Beginners)"</em></li>
        <li class="check"><strong>Guide 2:</strong> <em>"Top 5 Things to Check Before Enrolling in a Stock Market Institute in Maharashtra"</em></li>
        <li class="check"><strong>Guide 3:</strong> <em>"Basics of Share Market in Marathi: A Step-by-Step Starter Roadmap for Families"</em></li>
      </ul>

      <div class="section-title" style="margin-top: 9px;">
        <span>Module 4: Google Business Profile (Local SEO) Blueprint</span>
        <span class="badge badge-gold">Option 2 Exclusive ★</span>
      </div>
      <p class="section-desc">
        A step-by-step optimization blueprint for your Google Business Profile (Maps) to rank in the top 3 results for local
        searches in Nashik and surrounding regions, including service category alignment and a keyword review template.
      </p>
    </div>

    <div class="doc-footer">
      <div>Finanthropist Educare • Prepared by Firefist Solutions</div>
      <div class="confidential">Confidential Commercial Document</div>
      <div>Page 2 of 5</div>
    </div>
  </div>

  <!-- PAGE 3: CONVERSION & LEAD ENGINE -->
  <div class="page">
    <div>
      <div class="doc-header">
        <div class="logo-container">
          <img src="data:image/png;base64,${logoBase64}" alt="Finanthropist Logo" />
        </div>
        <div class="header-meta">
          <div class="doc-type">TECHNICAL SPECIFICATIONS: PART 2</div>
          <div class="doc-ref">Conversion &amp; Sales Capture Modules</div>
        </div>
      </div>

      <div class="title-block" style="margin-bottom: 9px;">
        <span class="meta-label">Conversion Engine</span>
        <h2 style="font-size: 13pt; font-weight: 800; color: #0f172a;">Module 5: High-Conversion Lead Capture Engine</h2>
        <p class="subtitle">
          Generating website traffic is only half the battle. To turn search visitors into paying students,
          we deploy a specialized 5-part conversion engine directly into the platform.
        </p>
      </div>

      <div class="box">
        <div class="box-title">
          <span>1. Direct WhatsApp Quick-Inquiry System</span>
          <span class="badge badge-success">Included in Option 1 &amp; Option 2</span>
        </div>
        <div class="box-desc">
          In Maharashtra, 80%+ of prospective students prefer inquiring on WhatsApp rather than filling out web forms.<br />
          <strong>Implementation:</strong> Floating branded WhatsApp button with pulse animation and smart pre-filled Marathi/English greeting:
          <em>"Namaskar Sammeer Sir! I saw your website and want to know details about the upcoming Marathi share market batch."</em>
          Passes current page URL and traffic attribution seamlessly.
        </div>
      </div>

      <div class="box" style="border-left: 3px solid #b45309;">
        <div class="box-title">
          <span>2. 'Download Course Syllabus' Lead Magnet System</span>
          <span class="badge badge-gold">Option 2 Exclusive ★</span>
        </div>
        <div class="box-desc">
          Most first-time visitors are not ready to pay ₹9,912 immediately. If the only option is "Enroll Now", they bounce.<br />
          <strong>Implementation:</strong> A high-converting modal offering <em>"Download Detailed 12-Topic Syllabus &amp; Trading Roadmap (PDF)"</em>.
          The visitor enters Name &amp; WhatsApp number; the PDF downloads instantly while the lead is captured into Payload Admin.
        </div>
      </div>

      <div class="box" style="border-left: 3px solid #b45309;">
        <div class="box-title">
          <span>3. Native Free Webinar Registration Page (/webinar)</span>
          <span class="badge badge-gold">Option 2 Exclusive ★</span>
        </div>
        <div class="box-desc">
          Currently, the "Attend Free Webinar" button redirects users away from <code>finanthropist.com</code> to an external subdomain,
          losing valuable SEO link equity and dropping conversions by 40%+.<br />
          <strong>Implementation:</strong> A dedicated, on-domain <code>/webinar</code> landing page with live countdown timer, masterclass
          takeaways, Sammeer Sir's bio, and instant registration form logging directly into your database.
        </div>
      </div>

      <div class="box" style="border-left: 3px solid #b45309;">
        <div class="box-title">
          <span>4. Student Video Testimonials &amp; Success Hub (/reviews)</span>
          <span class="badge badge-gold">Option 2 Exclusive ★</span>
        </div>
        <div class="box-desc">
          In stock market education, overcoming skepticism is the #1 sales factor. Real Marathi video reviews from working professionals,
          housewives, and beginners close deals faster than any text.<br />
          <strong>Implementation:</strong> A dedicated <code>/reviews</code> page embedding student YouTube shorts and testimonials,
          filterable by topic, backed by verified Google 5.0★ badges and official Schema.org <code>Review</code> markup.
        </div>
      </div>

      <div class="box" style="border-left: 3px solid #b45309;">
        <div class="box-title">
          <span>5. Instant Sales Team Alert System</span>
          <span class="badge badge-gold">Option 2 Exclusive ★</span>
        </div>
        <div class="box-desc">
          When a student submits an inquiry or downloads the syllabus, an instant webhook/email alert hits the sales team's
          phones with the student's Name, Phone, and Source (<code>chatgpt.com</code> / <code>google</code>).
          Enables sub-5-minute follow-up while the student's interest is at peak.
        </div>
      </div>
    </div>

    <div class="doc-footer">
      <div>Finanthropist Educare • Prepared by Firefist Solutions</div>
      <div class="confidential">Confidential Commercial Document</div>
      <div>Page 3 of 5</div>
    </div>
  </div>

  <!-- PAGE 4: MASTER DELIVERABLES COMPARISON MATRIX -->
  <div class="page">
    <div>
      <div class="doc-header">
        <div class="logo-container">
          <img src="data:image/png;base64,${logoBase64}" alt="Finanthropist Logo" />
        </div>
        <div class="header-meta">
          <div class="doc-type">COMPREHENSIVE AUDIT &amp; COMPARISON</div>
          <div class="doc-ref">Module Distinction Matrix</div>
        </div>
      </div>

      <div class="title-block" style="margin-bottom: 8px;">
        <span class="meta-label">Side-by-Side Comparison</span>
        <h2 style="font-size: 13.5pt; font-weight: 800; color: #0f172a;">Master Services &amp; Deliverables Matrix</h2>
        <p class="subtitle">
          Detailed itemization of all 15 platform modules, services, and conversion engines comparing Option 1 vs. Option 2.
        </p>
      </div>

      <div class="banner-stat">
        <div class="stat-card">
          <div class="label">Option 1: Core Search Sprint</div>
          <div class="value">5 of 15 Services <span style="font-size: 8.5pt; font-weight: normal; color: #64748b;">(33% Coverage)</span></div>
          <div class="desc">Covers primary Google crawling, 2 landing pages, basic FAQ snippet, and standard WhatsApp button.</div>
        </div>
        <div class="stat-card active">
          <div class="label">Option 2: Comprehensive GEO Engine ★</div>
          <div class="value">15 of 15 Services <span style="font-size: 8.5pt; font-weight: bold; color: #059669;">(100% Complete)</span></div>
          <div class="desc">Full-scale engine: 3 landing pages, blog authority, 5 lead capture engines, local maps &amp; post-launch audit.</div>
        </div>
      </div>

      <table class="comparison-table">
        <thead>
          <tr>
            <th style="width: 32%;">Module &amp; Exact Deliverable</th>
            <th style="width: 17%; text-align: center;">Option 1<br /><span style="font-size: 6.6pt; font-weight: normal; text-transform: none; color: #64748b;">(₹32,000)</span></th>
            <th style="width: 18%; text-align: center; background: #f1f5f9;">Option 2 ★<br /><span style="font-size: 6.6pt; font-weight: bold; text-transform: none; color: #b45309;">(₹45,000 - Best)</span></th>
            <th style="width: 33%;">Strategic Impact &amp; Why It Matters</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>1. /share-market-course-in-marathi</strong></td>
            <td style="text-align: center;"><span class="badge badge-success">✓ Included</span></td>
            <td style="text-align: center; background: #fafafa;"><span class="badge badge-success">✓ Included</span></td>
            <td>Ranks for primary beginner &amp; family queries in Marathi</td>
          </tr>
          <tr>
            <td><strong>2. /share-market-classes-nashik</strong></td>
            <td style="text-align: center;"><span class="badge badge-success">✓ Included</span></td>
            <td style="text-align: center; background: #fafafa;"><span class="badge badge-success">✓ Included</span></td>
            <td>Captures high-intent local Nashik &amp; regional students</td>
          </tr>
          <tr>
            <td><strong>3. /options-trading-course-marathi</strong></td>
            <td style="text-align: center;"><span class="badge badge-danger">✕ Excluded</span></td>
            <td style="text-align: center; background: #fafafa;"><span class="badge badge-gold">✓ Included ★</span></td>
            <td>Captures high-ticket F&amp;O traders (₹15,000+ tuition)</td>
          </tr>
          <tr>
            <td><strong>4. Interactive FAQ Hub (10 Q&amp;As)</strong></td>
            <td style="text-align: center;"><span class="badge badge-success">✓ Included</span></td>
            <td style="text-align: center; background: #fafafa;"><span class="badge badge-success">✓ Included</span></td>
            <td>Resolves learner doubts on fees, language &amp; timings</td>
          </tr>
          <tr>
            <td><strong>5. Google FAQPage Rich Snippets</strong></td>
            <td style="text-align: center;"><span class="badge badge-success">✓ Included</span></td>
            <td style="text-align: center; background: #fafafa;"><span class="badge badge-success">✓ Included</span></td>
            <td>Occupies 2x vertical search space on mobile Google</td>
          </tr>
          <tr>
            <td><strong>6. Blog Setup &amp; Custom Styling (/posts)</strong></td>
            <td style="text-align: center;"><span class="badge badge-danger">✕ Excluded</span></td>
            <td style="text-align: center; background: #fafafa;"><span class="badge badge-gold">✓ Included ★</span></td>
            <td>Establishes content hub for ongoing topical authority</td>
          </tr>
          <tr>
            <td><strong>7. 3x Authority Articles (ChatGPT GEO)</strong></td>
            <td style="text-align: center;"><span class="badge badge-danger">✕ Excluded</span></td>
            <td style="text-align: center; background: #fafafa;"><span class="badge badge-gold">✓ Included ★</span></td>
            <td>Directly triggers AI search engine recommendations</td>
          </tr>
          <tr>
            <td><strong>8. Article &amp; Author JSON-LD Schema</strong></td>
            <td style="text-align: center;"><span class="badge badge-danger">✕ Excluded</span></td>
            <td style="text-align: center; background: #fafafa;"><span class="badge badge-gold">✓ Included ★</span></td>
            <td>Validates Sammeer Sarang as verified financial author</td>
          </tr>
          <tr>
            <td><strong>9. WhatsApp Quick-Inquiry Widget</strong></td>
            <td style="text-align: center;"><span class="badge badge-success">✓ Included</span></td>
            <td style="text-align: center; background: #fafafa;"><span class="badge badge-success">✓ Included</span></td>
            <td>Instant 1-tap chats for visitors ready to connect</td>
          </tr>
          <tr>
            <td><strong>10. 'Download Syllabus' Lead Magnet</strong></td>
            <td style="text-align: center;"><span class="badge badge-danger">✕ Excluded</span></td>
            <td style="text-align: center; background: #fafafa;"><span class="badge badge-gold">✓ Included ★</span></td>
            <td>Captures 5x more leads from undecided first-time visitors</td>
          </tr>
          <tr>
            <td><strong>11. Native Webinar Registration (/webinar)</strong></td>
            <td style="text-align: center;"><span class="badge badge-danger">✕ Excluded</span></td>
            <td style="text-align: center; background: #fafafa;"><span class="badge badge-gold">✓ Included ★</span></td>
            <td>Prevents visitor leakage to external subdomains</td>
          </tr>
          <tr>
            <td><strong>12. Student Video Review Hub (/reviews)</strong></td>
            <td style="text-align: center;"><span class="badge badge-danger">✕ Excluded</span></td>
            <td style="text-align: center; background: #fafafa;"><span class="badge badge-gold">✓ Included ★</span></td>
            <td>Provides video proof &amp; official Schema Review markup</td>
          </tr>
          <tr>
            <td><strong>13. Instant Sales Alert Webhook</strong></td>
            <td style="text-align: center;"><span class="badge badge-danger">✕ Excluded</span></td>
            <td style="text-align: center; background: #fafafa;"><span class="badge badge-gold">✓ Included ★</span></td>
            <td>Sales team calls leads in under 5 minutes for 4x closure</td>
          </tr>
          <tr>
            <td><strong>14. Google Business Profile Blueprint</strong></td>
            <td style="text-align: center;"><span class="badge badge-danger">✕ Excluded</span></td>
            <td style="text-align: center; background: #fafafa;"><span class="badge badge-gold">✓ Included ★</span></td>
            <td>Local SEO framework to rank in Google Maps 3-Pack</td>
          </tr>
          <tr>
            <td><strong>15. 30-Day Indexing &amp; Ranking Audit</strong></td>
            <td style="text-align: center;"><span class="badge badge-danger">✕ Excluded</span></td>
            <td style="text-align: center; background: #fafafa;"><span class="badge badge-gold">✓ Included ★</span></td>
            <td>Post-launch monitoring to ensure rapid bot indexing</td>
          </tr>
        </tbody>
      </table>

      <div class="box" style="background: #f8fafc; border: 1.5px solid #0f172a; margin-top: 3px;">
        <div class="box-title" style="color: #0f172a;">
          <span>Why Option 2 Delivers Unmatched Commercial Value</span>
          <span class="badge badge-gold">Only ₹13,000 Difference</span>
        </div>
        <div class="box-desc" style="font-size: 7.7pt; color: #334155;">
          For an incremental investment of just ₹13,000 (+40%), Option 2 delivers <strong>10 additional modules</strong>:
          the high-ticket Options page, 3 blog articles, the Syllabus lead magnet, on-site webinar booking, student video review hub,
          instant phone alerts for your sales team, and Google Maps blueprint.
          <strong>Enrolling just 1 to 2 additional students from these assets fully covers the entire difference.</strong>
        </div>
      </div>
    </div>

    <div class="doc-footer">
      <div>Finanthropist Educare • Prepared by Firefist Solutions</div>
      <div class="confidential">Confidential Commercial Document</div>
      <div>Page 4 of 5</div>
    </div>
  </div>

  <!-- PAGE 5: COMMERCIAL PACKAGES, TERMS & SIGN-OFF -->
  <div class="page">
    <div>
      <div class="doc-header">
        <div class="logo-container">
          <img src="data:image/png;base64,${logoBase64}" alt="Finanthropist Logo" />
        </div>
        <div class="header-meta">
          <div class="doc-type">INVESTMENT &amp; COMMERCIALS</div>
          <div class="doc-ref">Pricing Options &amp; Execution Terms</div>
        </div>
      </div>

      <div class="section-title">
        <span>Commercial Investment Packages</span>
        <span class="badge badge-neutral">Turnkey Deployment</span>
      </div>
      <p class="section-desc">
        Select the package that best fits your immediate growth strategy. Both tiers represent turnkey Next.js development,
        professional copywriting integration, schema validation, and live production deployment.
      </p>

      <div class="grid-2" style="margin-bottom: 11px;">
        <!-- Option 1 -->
        <div class="pricing-card">
          <div class="tier-tag">Option 1: Core Search Sprint</div>
          <div class="price">₹32,000 <span class="price-term">/ one-time</span></div>
          <p style="font-size: 7.6pt; color: #475569; margin-bottom: 5px;">
            Targeted search foundation for high-volume Marathi terms and instant WhatsApp inquiries.
          </p>
          <ul class="clean-list">
            <li class="check"><strong>2 Dedicated Landing Pages:</strong><br />• /share-market-course-in-marathi<br />• /share-market-classes-nashik</li>
            <li class="check"><strong>Interactive FAQ Hub</strong> (10 targeted Q&amp;As)</li>
            <li class="check"><strong>Google FAQPage Rich Snippet</strong> Schema</li>
            <li class="check"><strong>Direct WhatsApp Quick-Inquiry System</strong></li>
            <li class="check"><strong>Page Metadata, Canonicals &amp; OpenGraph</strong></li>
            <li class="cross">Options Trading Course Landing Page (Excluded)</li>
            <li class="cross">3x AI/ChatGPT Authority Articles (Excluded)</li>
            <li class="cross">Syllabus Lead Magnet &amp; Webinar Page (Excluded)</li>
            <li class="cross">Student Video Reviews Hub (Excluded)</li>
            <li class="cross">Instant Sales Alert Webhook (Excluded)</li>
            <li class="cross">Google Business Profile Blueprint (Excluded)</li>
          </ul>
        </div>

        <!-- Option 2 -->
        <div class="pricing-card recommended">
          <span class="badge badge-gold" style="position: absolute; top: 10px; right: 10px;">Recommended</span>
          <div class="tier-tag">Option 2: Comprehensive GEO &amp; Growth Engine</div>
          <div class="price">₹45,000 <span class="price-term">/ one-time</span></div>
          <p style="font-size: 7.6pt; color: #475569; margin-bottom: 5px;">
            Full-scale growth package engineered to win Google rankings, ChatGPT citations, and maximize course enrollments.
          </p>
          <ul class="clean-list">
            <li class="check"><strong>All Features Included in Option 1</strong>, PLUS:</li>
            <li class="check"><strong>3rd Landing Page:</strong> /options-trading-course-marathi</li>
            <li class="check"><strong>3 Authority Search Articles</strong> (Blog Setup &amp; Publishing)</li>
            <li class="check"><strong>Article &amp; Author JSON-LD Schema</strong></li>
            <li class="check"><strong>'Download Course Syllabus' Lead Magnet System</strong></li>
            <li class="check"><strong>Native Free Webinar Registration Page (/webinar)</strong></li>
            <li class="check"><strong>Student Video Testimonials Hub (/reviews)</strong></li>
            <li class="check"><strong>Instant Sales Team Lead Alert System</strong></li>
            <li class="check"><strong>Google Business Profile (Local SEO) Blueprint</strong></li>
            <li class="check"><strong>30-Day Post-Launch Indexing Audit</strong> &amp; Report</li>
          </ul>
        </div>
      </div>

      <div class="section-title">
        <span>Search Maturation Timeline &amp; Governance</span>
        <span class="badge badge-neutral">Realistic Transparency</span>
      </div>
      <div class="box">
        <ul class="clean-list">
          <li class="check"><strong>Competitive Dynamics:</strong> Share market education in Maharashtra features well-funded institutes. Search engines rank pages based on structural relevance, user engagement, and entity trust.</li>
          <li class="check"><strong>Execution &amp; Ranking Timelines:</strong> Complete development and deployment will be achieved within <strong>10 to 14 business days</strong>. Search algorithms (Google &amp; ChatGPT) typically require <strong>60 to 120 days</strong> to fully index and consolidate keyword positions.</li>
          <li class="check"><strong>Zero False Guarantees:</strong> No genuine engineering agency can guarantee a fixed "#1 rank on day one." Our methodology rigorously implements 100% of the proven technical, architectural, and semantic factors that put Finanthropist in the strongest position to win top rankings.</li>
        </ul>
      </div>

      <div class="section-title" style="margin-top: 7px;">
        <span>Commercial Terms &amp; Authorization</span>
      </div>
      <div class="grid-2" style="font-size: 7.8pt; color: #334155; margin-bottom: 10px;">
        <div>
          <strong>Payment Schedule:</strong><br />
          • 50% Advance on project kickoff.<br />
          • 50% Upon staging review, deployment, and live verification.
        </div>
        <div>
          <strong>Next Steps:</strong><br />
          1. Confirm preferred package (Option 1: ₹32,000 or Option 2: ₹45,000).<br />
          2. We begin layout templating and content drafting immediately.
        </div>
      </div>

      <!-- Signoff Box -->
      <div style="border-top: 1px solid #e2e8f0; padding-top: 7px; display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div>
          <div style="font-size: 6.8pt; color: #64748b; text-transform: uppercase; font-weight: 700; margin-bottom: 11px;">Prepared By:</div>
          <div style="font-size: 8.3pt; font-weight: 700; color: #0f172a;">Firefist Solutions</div>
          <div style="font-size: 7.3pt; color: #475569;">Engineering &amp; Growth Team • Technical SEO</div>
        </div>
        <div>
          <div style="font-size: 6.8pt; color: #64748b; text-transform: uppercase; font-weight: 700; margin-bottom: 11px;">Accepted &amp; Approved By:</div>
          <div style="font-size: 8.3pt; font-weight: 700; color: #0f172a;">Finanthropist Educare Pvt Ltd</div>
          <div style="font-size: 7.3pt; color: #475569;">Authorized Signatory / Date</div>
        </div>
      </div>
    </div>

    <div class="doc-footer">
      <div>Finanthropist Educare • Prepared by Firefist Solutions</div>
      <div class="confidential">Confidential Commercial Document</div>
      <div>Page 5 of 5</div>
    </div>
  </div>

</body>
</html>
  `;

  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage();
  await page.setContent(htmlContent, { waitUntil: 'networkidle' });

  const outputPath = 'Finanthropist_SEO_Growth_Proposal.pdf';
  await page.pdf({
    path: outputPath,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '0mm',
      bottom: '0mm',
      left: '0mm',
      right: '0mm',
    },
  });

  await browser.close();

  // Also copy to artifact directory
  const artifactDir = 'C:\\Users\\Lenovo\\.gemini\\antigravity\\brain\\d05d6bfb-634e-4c91-b7f7-e4f9ced40e80';
  if (fs.existsSync(artifactDir)) {
    fs.copyFileSync(outputPath, path.join(artifactDir, outputPath));
  }

  console.log(`Updated 5-Page Quotation PDF successfully generated: ${outputPath}`);
}

generateQuotationPdf().catch(console.error);
