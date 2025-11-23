# Course Page Implementation Plan

## Overview
This document outlines the plan for creating a `/course` page that displays comprehensive course details based on `courseDetails.md`, following the UI design patterns and structure of the home page.

## Page Structure

### Route
- **Path**: `/finanthropist/src/app/(frontend)/course/page.tsx`
- **URL**: `/course`
- **Type**: Static page with content from `courseDetails.md`

---

## Section Breakdown

### 1. **Hero Section** (`CourseHeroSection.tsx`)
**Design Pattern**: Similar to `HeroSection.tsx` from home page

**Content**:
- Badge: "Best Stock Market Education in Marathi"
- Headline Primary: "Basics to Advance Trading & Investing in Market"
- Headline Accent: "For Maharashtra's Growth"
- Pricing Display:
  - Current Price: ₹9,912 (highlighted)
  - Original Price: ₹28,320 (strikethrough)
  - Discount Badge: "65% OFF"
- CTA Buttons:
  - Primary: "Enroll Now" (links to enrollment/contact)
  - Secondary: "Attend Free Webinar" (links to `/webinar`)

**Visual Elements**:
- Instructor image (sameer-fist.png) on right side (desktop)
- Gradient background matching home page style
- Grid layout: 2 columns on desktop, stacked on mobile

---

### 2. **Topics Covered Section** (`TopicsSection.tsx`)
**Design Pattern**: Similar to `FeaturesSection.tsx` with card-based layout

**Content** (from courseDetails.md):
- Section Badge: "TOPICS COVERED"
- Title: "What You'll Master"
- Topics List:
  1. Equity, Futures & Derivatives, Index & Stock Options
  2. Commodity & Currency (Forex)
  3. Technical & Fundamental Analysis
  4. IPO study, F&O study, Price Action
  5. Gann Theory, Candlesticks & Line Charts
  6. Pivot, Swing etc.
  7. Live Chart Reading & Multi-timeframe Trading
  8. Trading Strategies, Wealth Creation Skills
  9. Trading & Life Psychology
  10. Self-Portfolio & Account Management
  11. Demat Account Live Training
  12. Course Material & Free Apps

**Visual Design**:
- Card-based layout with numbered badges (similar to FeaturesSection)
- Each card displays one topic
- Hover effects with gradient animations
- Progress indicators
- Image on left side (optional: instructor or market charts)

---

### 3. **What You'll Learn Section** (`LearningOutcomesSection.tsx`)
**Design Pattern**: Grid layout with icon cards

**Content**:
- Section Badge: "WHAT WILL YOU LEARN IN THE COURSE?"
- Four main learning areas:
  1. **Investing**
     - Share Market, Mutual Fund & All other investments
  2. **Trading**
     - Equity, Futures, Options, Commodity & Currency (Forex)
  3. **Analysis Skills**
     - Technically & Fundamentally clear about Selecting Stocks
     - Entry & Exit points, Risk & Reward
  4. **Trading Rules**
     - Rules based trading will result into Small profits, Big Profits, Small Losses

**Visual Design**:
- 2x2 grid on desktop, stacked on mobile
- Each card with icon, title, and description
- Gradient borders on hover
- Matching color scheme (red/yellow gradients)

---

### 4. **How It Will Help You Earn Section** (`EarningSection.tsx`)
**Design Pattern**: Timeline or step-by-step layout

**Content**:
- Section Badge: "HOW IT WILL HELP ME TO EARN"
- Main Message: "Success is Depend on Your Willingness to Become Successful"
- Key Points:
  - Course Duration: 2 hrs daily for 8-10 days
  - After Course - Trader Path: Daily 1-2 hours will help you become Trader
  - After Course - Investor Path: Weekly 1 hour will help you become Investor
  - No Share Market background required
  - Teaching in simple Marathi language
  - You & your family can attend Live or Recording Both

**Visual Design**:
- Timeline or step-by-step visual flow
- Icons for each point
- Highlighted time commitments
- Family-friendly messaging

---

### 5. **Free Support Section** (`SupportSection.tsx`)
**Design Pattern**: Feature cards with icons

**Content**:
- Section Badge: "FREE SUPPORT FOR LIFETIME"
- Subtitle: "FOR ENTIRE FAMILY FOR LIFETIME"
- Support Features:
  1. Daily Live Market Analysis Sessions
  2. Live Q&A sessions after every topic
  3. Live Trading Sessions with Technical Team Support
  4. Live Demat Account Trading Sessions
  5. All Sessions Recordings for Lifetime
  6. Call & Message Support for All
  7. Access to exclusive tools and notes
  8. Guidance to help you create your own trading plan

**Visual Design**:
- Grid layout (3 columns on desktop, 2 on tablet, 1 on mobile)
- Each feature as a card with icon
- Lifetime badge prominently displayed
- Family emphasis with special styling

---

### 6. **Pricing & CTA Section** (`PricingSection.tsx`)
**Design Pattern**: Centered, prominent pricing card

**Content**:
- Large pricing display:
  - Current Price: ₹9,912 (large, bold)
  - Original Price: ₹28,320 (strikethrough, smaller)
  - Discount: "65% OFF" (badge)
- CTA Button: "Enroll Now" (primary action)
- Secondary CTA: "Contact Us" or "Call Now"

**Visual Design**:
- Centered card with gradient background
- Large, prominent pricing
- Animated discount badge
- Multiple CTA options
- Trust indicators (guarantee, refund policy)

---

### 7. **Contact Section** (`ContactSection.tsx`)
**Design Pattern**: Simple, clear contact information

**Content**:
- Section Badge: "CONTACT US"
- Phone Numbers:
  - 7066 33 4499
  - 7066 33 7676
  - 9359 99 8294
- Click-to-call functionality
- Website: www.finanthropist.com

**Visual Design**:
- Clean, minimal design
- Large, clickable phone numbers
- Icons for phone/contact methods
- Social proof or trust indicators

---

## Component Architecture

### Main Page Component
```
course/
  ├── page.tsx (main page component)
  ├── page.client.tsx (client-side interactions)
  └── components/
      ├── CourseHeroSection.tsx
      ├── TopicsSection.tsx
      ├── LearningOutcomesSection.tsx
      ├── EarningSection.tsx
      ├── SupportSection.tsx
      ├── PricingSection.tsx
      └── ContactSection.tsx
```

### Content File
```
src/content/
  └── courseContent.ts (structured course data)
```

---

## Design System Consistency

### Colors
- Primary Red: `#C71C22`
- Accent Yellow: `#FCC22F`
- Background: Dark slate (`#0f172a`, `slate-900`, `slate-800`)
- Text: White with gradient accents

### Typography
- Headlines: Large, bold, gradient text for accents
- Body: Clean, readable white text
- Badges: Small, rounded, with backdrop blur

### Layout Patterns
- Full-height sections (`100vh`) with snap scrolling (desktop)
- Grid layouts: 2 columns on desktop, stacked on mobile
- Container: `container mx-auto px-4 lg:px-8`
- Spacing: Consistent padding and margins

### Animations
- GSAP animations for scroll-triggered effects
- Hover effects on cards
- Gradient animations
- Smooth transitions

---

## Responsive Design

### Desktop (lg: 1024px+)
- Full-height sections with snap scrolling
- 2-column grid layouts
- Side-by-side content and images
- Advanced animations and effects

### Mobile (< 1024px)
- Stacked sections
- Single column layouts
- Simplified animations
- Touch-friendly interactions
- Mobile-optimized images

---

## Content Data Structure

### TypeScript Types
```typescript
export type CourseContent = {
  hero: {
    badge: string
    headlinePrimary: string
    headlineAccent: string
    pricing: {
      current: string
      original: string
      discount: string
    }
    ctas: CTA[]
  }
  topics: {
    badge: string
    title: string
    items: string[]
  }
  learningOutcomes: {
    badge: string
    items: Array<{
      title: string
      description: string
    }>
  }
  earning: {
    badge: string
    mainMessage: string
    points: Array<{
      title: string
      description: string
    }>
  }
  support: {
    badge: string
    subtitle: string
    features: string[]
  }
  pricing: {
    current: string
    original: string
    discount: string
    ctas: CTA[]
  }
  contact: {
    badge: string
    phoneNumbers: string[]
    website: string
  }
}
```

---

## Implementation Steps

### Phase 1: Setup
1. Create `/course` route directory
2. Create `courseContent.ts` with structured data
3. Set up TypeScript types
4. Create main page component structure

### Phase 2: Hero Section
1. Create `CourseHeroSection.tsx`
2. Implement pricing display
3. Add CTA buttons
4. Style with home page patterns

### Phase 3: Content Sections
1. Create `TopicsSection.tsx` (card-based layout)
2. Create `LearningOutcomesSection.tsx` (grid layout)
3. Create `EarningSection.tsx` (timeline/step layout)
4. Create `SupportSection.tsx` (feature cards)

### Phase 4: Pricing & Contact
1. Create `PricingSection.tsx` (prominent pricing)
2. Create `ContactSection.tsx` (contact info)
3. Add click-to-call functionality

### Phase 5: Animations & Polish
1. Add GSAP animations (desktop)
2. Implement scroll triggers
3. Add hover effects
4. Mobile responsiveness
5. Performance optimization

### Phase 6: Testing
1. Test all sections
2. Verify responsive design
3. Test CTAs and links
4. Cross-browser testing
5. Accessibility check

---

## Key Features

### Interactive Elements
- Click-to-call phone numbers
- Smooth scroll to sections
- Animated pricing display
- Hover effects on cards
- CTA button animations

### Visual Elements
- Instructor images
- Market-related icons/illustrations
- Gradient backgrounds
- Card-based layouts
- Progress indicators

### User Experience
- Clear information hierarchy
- Prominent pricing display
- Easy contact methods
- Mobile-friendly design
- Fast loading times

---

## Content Mapping from courseDetails.md

| Section in MD | Component | Key Content |
|--------------|-----------|-------------|
| "Basics to Advance Trading & Investing in Market" | Hero | Main headline |
| "TOPICS COVERED" | TopicsSection | All 12 topics |
| "WHAT WILL YOU LEARN IN THE COURSE?" | LearningOutcomesSection | 4 learning areas |
| "HOW IT WILL HELP ME TO EARN" | EarningSection | Time commitments & benefits |
| "FREE SUPPORT FOR LIFETIME" | SupportSection | 8 support features |
| "ONLY 9,912 / 28,320" | PricingSection | Pricing with discount |
| "CONTACT US" | ContactSection | Phone numbers & website |

---

## Notes

- Follow the exact same design patterns as home page for consistency
- Use the same color scheme and typography
- Maintain the same animation style and timing
- Ensure mobile experience matches home page quality
- All content should be in Marathi-friendly format (simple language)
- Emphasize family-friendly aspects throughout
- Highlight lifetime support prominently
- Make pricing and contact information easily accessible

---

## Future Enhancements (Optional)

- Course curriculum timeline/roadmap
- Student testimonials specific to course
- FAQ section
- Enrollment form integration
- Video preview/trailer
- Course comparison table
- Success stories/metrics
- Interactive course preview

