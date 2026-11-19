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
  <title>Proposal &amp; Quotation: Organic Search &amp; GEO Growth Package - Finanthropist</title>
  <style>
    @page {
      size: A4;
      margin: 15mm 16mm 15mm 16mm;
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
      font-size: 9.2pt;
      line-height: 1.48;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    .page {
      page-break-after: always;
      position: relative;
      min-height: 266mm;
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
      padding-bottom: 12px;
      border-bottom: 1px solid #e2e8f0;
      margin-bottom: 18px;
    }

    .doc-header .logo-container img {
      height: 34px;
      object-fit: contain;
    }

    .doc-header .header-meta {
      text-align: right;
    }

    .doc-header .header-meta .doc-type {
      font-size: 8pt;
      font-weight: 700;
      color: #475569;
      letter-spacing: 0.8px;
      text-transform: uppercase;
    }

    .doc-header .header-meta .doc-ref {
      font-size: 7.5pt;
      color: #94a3b8;
      margin-top: 1px;
    }

    /* Document Title Block */
    .title-block {
      margin-bottom: 16px;
    }

    .title-block .meta-label {
      font-size: 7.5pt;
      font-weight: 700;
      color: #b45309;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      margin-bottom: 4px;
      display: inline-block;
    }

    .title-block h1 {
      font-size: 19pt;
      font-weight: 800;
      color: #0f172a;
      letter-spacing: -0.4px;
      line-height: 1.25;
      margin-bottom: 6px;
    }

    .title-block p.subtitle {
      font-size: 9.5pt;
      color: #475569;
      line-height: 1.45;
    }

    /* Target Client Card */
    .client-card {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr;
      gap: 12px;
      padding: 10px 14px;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      margin-bottom: 16px;
      font-size: 8.5pt;
    }

    .client-card-item .label {
      font-size: 7pt;
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
      padding: 2px 7px;
      border-radius: 4px;
      font-size: 7pt;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.4px;
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

    /* Section Headings */
    .section-title {
      font-size: 11pt;
      font-weight: 700;
      color: #0f172a;
      margin-bottom: 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #f1f5f9;
      padding-bottom: 4px;
    }

    .section-desc {
      font-size: 8.8pt;
      color: #475569;
      margin-bottom: 10px;
      line-height: 1.45;
    }

    /* Tables */
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 6px;
      margin-bottom: 14px;
      font-size: 8.5pt;
    }

    th {
      background: #f8fafc;
      color: #475569;
      text-align: left;
      padding: 7px 10px;
      font-weight: 700;
      font-size: 7.5pt;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      border-top: 1px solid #e2e8f0;
      border-bottom: 1px solid #e2e8f0;
    }

    td {
      padding: 7px 10px;
      border-bottom: 1px solid #f1f5f9;
      color: #1e293b;
      vertical-align: middle;
    }

    tr:last-child td {
      border-bottom: 1px solid #e2e8f0;
    }

    /* Callout & Detail Boxes */
    .box {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      padding: 10px 12px;
      margin-bottom: 12px;
    }

    .box-title {
      font-size: 9.5pt;
      font-weight: 700;
      color: #0f172a;
      margin-bottom: 4px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .box-desc {
      font-size: 8.5pt;
      color: #334155;
      line-height: 1.42;
    }

    .grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }

    /* Pricing Card */
    .pricing-card {
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      padding: 12px 14px;
      background: #ffffff;
      position: relative;
    }

    .pricing-card.recommended {
      border: 1.5px solid #0f172a;
      background: #f8fafc;
    }

    .pricing-card .tier-tag {
      font-size: 7.5pt;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #64748b;
      margin-bottom: 4px;
    }

    .pricing-card.recommended .tier-tag {
      color: #b45309;
    }

    .pricing-card .price {
      font-size: 16pt;
      font-weight: 800;
      color: #0f172a;
      margin-bottom: 6px;
    }

    .pricing-card .price-term {
      font-size: 8pt;
      font-weight: 500;
      color: #64748b;
    }

    ul.clean-list {
      list-style: none;
      padding-left: 0;
      margin: 6px 0;
    }

    ul.clean-list li {
      position: relative;
      padding-left: 14px;
      margin-bottom: 4px;
      font-size: 8.2pt;
      color: #334155;
    }

    ul.clean-list li::before {
      content: "✓";
      color: #059669;
      position: absolute;
      left: 0;
      font-weight: bold;
      font-size: 7.5pt;
    }

    /* Footer */
    .doc-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid #e2e8f0;
      padding-top: 8px;
      font-size: 7.5pt;
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
          <div class="doc-ref">Commercial Proposal • Ref: FIN-SEO-2026</div>
        </div>
      </div>

      <div class="title-block">
        <span class="meta-label">Organic Growth &amp; AI Citation Package</span>
        <h1>Organic Search &amp; Generative AI (GEO) Growth Strategy</h1>
        <p class="subtitle">
          Comprehensive project proposal to establish Finanthropist Educare as the top search result
          and AI-recommended authority for Marathi stock market education.
        </p>
      </div>

      <div class="client-card">
        <div class="client-card-item">
          <div class="label">Target Client</div>
          <div class="val">Finanthropist Educare Pvt Ltd (https://finanthropist.com)</div>
        </div>
        <div class="client-card-item">
          <div class="label">Core Market</div>
          <div class="val">Maharashtra (Marathi-speaking)</div>
        </div>
        <div class="client-card-item">
          <div class="label">Target Timeline</div>
          <div class="val">10–14 Business Days</div>
        </div>
      </div>

      <div class="section-title">
        <span>1. Context: Why This Growth Package Is Required</span>
        <span class="badge badge-success">Phase 1 Complete</span>
      </div>
      <p class="section-desc">
        We recently completed <strong>Phase 1: Technical &amp; Compliance Foundation</strong> on your live website.
        We corrected the server configuration, enabled OpenAI Searchbot crawlers, launched live XML sitemaps,
        and injected core Schema.org data. This ensures your platform is 100% compliant and accessible to search bots.
      </p>
      <p class="section-desc">
        However, to win high-intent searches like <strong>"best share market class in marathi"</strong>,
        <strong>"share market course in marathi"</strong>, or <strong>"trading classes in nashik"</strong>,
        Google and ChatGPT require <strong>search-intent content depth</strong>. Currently, your site has only one
        general homepage and a single generic course page. Search engines prioritize websites with dedicated,
        specialized landing pages and structured Q&amp;A repositories.
      </p>

      <div class="section-title" style="margin-top: 14px;">
        <span>2. High-Intent Target Search Queries</span>
        <span class="badge badge-neutral">Keyword Focus</span>
      </div>
      <table>
        <thead>
          <tr>
            <th style="width: 38%;">Target User Query</th>
            <th style="width: 32%;">User Search Intent</th>
            <th style="width: 30%;">Winning Platform Asset</th>
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
            <td>Maharashtra / Nashik City Page + Local SEO</td>
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
            <td>Search Authority Comparison &amp; Guide Suite</td>
          </tr>
        </tbody>
      </table>

      <div class="section-title" style="margin-top: 10px;">
        <span>3. Deliverable Overview Matrix</span>
      </div>
      <div class="grid-2">
        <div class="box">
          <div class="box-title">Module A: Exact-Match Landing Pages</div>
          <div class="box-desc">3 custom, high-converting Next.js pages targeting specific courses and locations.</div>
        </div>
        <div class="box">
          <div class="box-title">Module B: Interactive FAQ &amp; Rich Snippets</div>
          <div class="box-desc">Accordion Q&amp;A answering top learner doubts with Google FAQPage Schema.</div>
        </div>
        <div class="box">
          <div class="box-title">Module C: AI &amp; Search Authority Suite</div>
          <div class="box-desc">3 cornerstone comparison &amp; educational guides to trigger ChatGPT citations.</div>
        </div>
        <div class="box">
          <div class="box-title">Module D: Google Business Profile Blueprint</div>
          <div class="box-desc">Local SEO strategy to win the top 3-pack on Google Maps for local searches.</div>
        </div>
      </div>
    </div>

    <div class="doc-footer">
      <div>Finanthropist Educare Pvt Ltd • Proposal &amp; Quotation</div>
      <div class="confidential">Confidential Commercial Document</div>
      <div>Page 1 of 3</div>
    </div>
  </div>

  <!-- PAGE 2: DETAILED SCOPE OF WORK -->
  <div class="page">
    <div>
      <div class="doc-header">
        <div class="logo-container">
          <img src="data:image/png;base64,${logoBase64}" alt="Finanthropist Logo" />
        </div>
        <div class="header-meta">
          <div class="doc-type">TECHNICAL SPECIFICATIONS</div>
          <div class="doc-ref">Scope of Work Breakdown</div>
        </div>
      </div>

      <div class="section-title">
        <span>Module 1: Dedicated Search-Intent Landing Pages</span>
        <span class="badge badge-success">3 Dedicated Pages</span>
      </div>
      <p class="section-desc">
        We will design, develop, and publish three dedicated landing pages directly inside your Next.js application.
        Unlike a generic homepage, each page is engineered to convert visitors seeking a specific solution:
      </p>

      <div class="box">
        <div class="box-title">
          <span>Page 1: /share-market-course-in-marathi</span>
          <span class="badge badge-neutral">Primary Target</span>
        </div>
        <div class="box-desc">
          <strong>Target Query:</strong> "Best share market course in Marathi", "Learn stock market from basics in Marathi".<br />
          <strong>Features:</strong> Full syllabus (Equity, Technical Analysis, Wealth Psychology), Marathi teaching highlights,
          lifetime family support breakdown, student testimonials, and embedded Google <code>Course</code> Schema.
        </div>
      </div>

      <div class="box">
        <div class="box-title">
          <span>Page 2: /options-trading-course-marathi</span>
          <span class="badge badge-neutral">High-Ticket Topic</span>
        </div>
        <div class="box-desc">
          <strong>Target Query:</strong> "Options trading classes in Marathi", "Futures &amp; Options course Maharashtra".<br />
          <strong>Features:</strong> Practical F&amp;O module breakdown, risk management framework, live market chart reading,
          trading psychology, and clear SEBI-safe educational disclaimers.
        </div>
      </div>

      <div class="box">
        <div class="box-title">
          <span>Page 3: /share-market-classes-nashik</span>
          <span class="badge badge-neutral">Local &amp; Regional Target</span>
        </div>
        <div class="box-desc">
          <strong>Target Query:</strong> "Best share market classes in Nashik", "Stock market institute near me".<br />
          <strong>Features:</strong> Local Nashik office details, regional credibility, Sammeer Sarang's 23+ years banking background,
          and embedded <code>LocalBusiness</code> Schema with exact geographic coordinates.
        </div>
      </div>

      <div class="section-title" style="margin-top: 14px;">
        <span>Module 2: Interactive FAQ Hub &amp; Google Rich Snippets</span>
        <span class="badge badge-gold">Search Visibility Booster</span>
      </div>
      <p class="section-desc">
        We will build a responsive, branded FAQ accordion on your Home and Course pages answering the top 10 questions
        potential students ask (fees, Marathi-English medium, beginner eligibility, recordings, refund policy).
      </p>
      <div class="box">
        <div class="box-desc">
          <strong>Google Rich Snippet Integration:</strong> Coded with Google's official <code>FAQPage</code> JSON-LD schema.
          When people search for your courses, Google displays expandable question-and-answer accordions directly beneath
          your search snippet, occupying 2x more visual space on mobile search results.
        </div>
      </div>

      <div class="section-title" style="margin-top: 14px;">
        <span>Module 3: AI &amp; Search Authority Guide Suite (3 Articles)</span>
        <span class="badge badge-neutral">GEO Engine</span>
      </div>
      <p class="section-desc">
        ChatGPT Search recommends service providers that have authoritative, educational articles published on their domain.
        We will activate your blog architecture and publish three comprehensive, formatted cornerstone guides:
      </p>
      <ul class="clean-list">
        <li><strong>Guide 1:</strong> <em>"How to Choose the Best Share Market Class in Marathi (Complete Guide for Beginners)"</em></li>
        <li><strong>Guide 2:</strong> <em>"Top 5 Things to Check Before Enrolling in a Stock Market Institute in Maharashtra"</em></li>
        <li><strong>Guide 3:</strong> <em>"Basics of Share Market in Marathi: A Step-by-Step Starter Roadmap for Families"</em></li>
      </ul>

      <div class="section-title" style="margin-top: 14px;">
        <span>Module 4: Google Business Profile (Local SEO) Blueprint</span>
        <span class="badge badge-neutral">Local Pack</span>
      </div>
      <p class="section-desc">
        A step-by-step optimization blueprint for your Google Business Profile (Maps) to rank in the top 3 results for local
        searches in Nashik and surrounding regions, including service category alignment and a keyword review template.
      </p>
    </div>

    <div class="doc-footer">
      <div>Finanthropist Educare Pvt Ltd • Proposal &amp; Quotation</div>
      <div class="confidential">Confidential Commercial Document</div>
      <div>Page 2 of 3</div>
    </div>
  </div>

  <!-- PAGE 3: INVESTMENT, TIMELINE & TERMS -->
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
        <span>Investment Packages</span>
        <span class="badge badge-neutral">Fixed Commercials</span>
      </div>
      <p class="section-desc">
        Select the package that best aligns with your immediate growth objectives. Both packages include complete
        development, styling, schema markup, and live deployment.
      </p>

      <div class="grid-2" style="margin-bottom: 16px;">
        <!-- Option 1 -->
        <div class="pricing-card">
          <div class="tier-tag">Option 1: Core Search Sprint</div>
          <div class="price">₹24,000 <span class="price-term">/ one-time</span></div>
          <p style="font-size: 8pt; color: #475569; margin-bottom: 8px;">
            Essential foundation for targeting high-volume Marathi search queries and Google rich snippets.
          </p>
          <ul class="clean-list">
            <li><strong>2 Dedicated Landing Pages:</strong><br />• Marathi Share Market Course<br />• Stock Market Classes Nashik</li>
            <li><strong>Interactive FAQ Hub:</strong> 10 targeted Q&amp;As</li>
            <li><strong>Google FAQPage Rich Snippet</strong> Schema</li>
            <li><strong>Page-Specific Metadata &amp; OpenGraph</strong></li>
            <li><strong>Full Testing &amp; Production Deployment</strong></li>
          </ul>
        </div>

        <!-- Option 2 -->
        <div class="pricing-card recommended">
          <span class="badge badge-gold" style="position: absolute; top: 12px; right: 12px;">Recommended</span>
          <div class="tier-tag">Option 2: Comprehensive GEO Suite</div>
          <div class="price">₹38,500 <span class="price-term">/ one-time</span></div>
          <p style="font-size: 8pt; color: #475569; margin-bottom: 8px;">
            Full-scale package engineered to win both Google Search rankings and ChatGPT recommendations.
          </p>
          <ul class="clean-list">
            <li><strong>All Features of Option 1</strong>, PLUS:</li>
            <li><strong>3rd Landing Page:</strong> Options &amp; F&amp;O Trading in Marathi</li>
            <li><strong>3 Search Authority Articles</strong> (Blog Setup &amp; Publishing)</li>
            <li><strong>Article &amp; Author JSON-LD Schema</strong></li>
            <li><strong>Google Business Profile (Local SEO) Blueprint</strong></li>
            <li><strong>30-Day Post-Launch Indexing Audit</strong> &amp; Report</li>
          </ul>
        </div>
      </div>

      <div class="section-title">
        <span>Realistic Search Timelines &amp; Ranking Methodology</span>
        <span class="badge badge-neutral">Transparency &amp; Governance</span>
      </div>
      <div class="box">
        <ul class="clean-list">
          <li><strong>Competitive Landscape:</strong> Stock market education in Maharashtra includes well-funded institutes and legacy brands. Ranking is an algorithmic evaluation of content depth, user engagement, and entity credibility.</li>
          <li><strong>Maturation Timeline:</strong> Technical development and deployment will be completed within <strong>10 to 14 business days</strong>. Search engines (Google &amp; ChatGPT) typically require <strong>60 to 120 days</strong> to fully crawl, evaluate, and establish positions for competitive terms.</li>
          <li><strong>Zero False Guarantees:</strong> No legitimate engineering firm can guarantee a fixed "#1 rank on day one." Our methodology rigorously implements 100% of the proven technical, architectural, and semantic factors that maximize your probability of winning top spots.</li>
        </ul>
      </div>

      <div class="section-title" style="margin-top: 14px;">
        <span>Commercial Terms &amp; Next Steps</span>
      </div>
      <div class="grid-2" style="font-size: 8.5pt; color: #334155; margin-bottom: 16px;">
        <div>
          <strong>Payment Structure:</strong><br />
          • 50% Advance on project initiation.<br />
          • 50% Upon staging review, deployment, and live verification.
        </div>
        <div>
          <strong>Next Steps to Initiate:</strong><br />
          1. Confirm your preferred package (Option 1 or Option 2).<br />
          2. We begin layout templating and keyword drafting immediately.
        </div>
      </div>

      <!-- Signoff Box -->
      <div style="border-top: 1px solid #e2e8f0; padding-top: 12px; display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div>
          <div style="font-size: 7.5pt; color: #64748b; text-transform: uppercase; font-weight: 700; margin-bottom: 18px;">Prepared By:</div>
          <div style="font-size: 9pt; font-weight: 700; color: #0f172a;">Engineering &amp; Growth Team</div>
          <div style="font-size: 8pt; color: #475569;">Technical SEO &amp; Next.js Architecture</div>
        </div>
        <div>
          <div style="font-size: 7.5pt; color: #64748b; text-transform: uppercase; font-weight: 700; margin-bottom: 18px;">Accepted &amp; Approved By:</div>
          <div style="font-size: 9pt; font-weight: 700; color: #0f172a;">Finanthropist Educare Pvt Ltd</div>
          <div style="font-size: 8pt; color: #475569;">Authorized Signatory / Date</div>
        </div>
      </div>
    </div>

    <div class="doc-footer">
      <div>Finanthropist Educare Pvt Ltd • Proposal &amp; Quotation</div>
      <div class="confidential">Confidential Commercial Document</div>
      <div>Page 3 of 3</div>
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

  console.log(`Quotation PDF successfully generated: ${outputPath}`);
}

generateQuotationPdf().catch(console.error);
