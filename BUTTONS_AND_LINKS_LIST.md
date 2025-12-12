# Complete List of Buttons and Links Across the Site

## 📋 HEADER NAVIGATION (Desktop & Mobile)

### Desktop Navigation
- **Home** → `/`
- **Course** → `/course`
- **About** → `/about`
- **Contact** → `/contact`
- **Enroll Now** (CTA Button) → `/course`

### Mobile Navigation Menu
- **Home** → `/`
- **Course** → `/course`
- **About** → `/about`
- **Contact** → `/contact`
- **Enroll Now** (CTA Button) → `/course`

---

## 🏠 HOME PAGE SECTIONS

### Hero Section (Desktop & Mobile)
- **"Attend Free Webinar"** (Primary CTA) → `https://conference.finanthropist.com/webinar-registration`
- **"Explore Course"** (Secondary CTA) → `/course`

### Webinar Section (Desktop & Mobile)
- **"Register for Live Webinar"** (Primary CTA) → `https://conference.finanthropist.com/webinar-registration`
- **"Watch Recorded Webinar"** (Secondary CTA) → `https://youtu.be/nNXCL7Eh7eo?si=6i-mAlFQX98X8XZD`

### Welcome Section (Desktop & Mobile)
- **"Know More About Us"** (Primary CTA) → `/course`
- **"Call Now"** (Secondary CTA) → `/contact` (triggers call modal on mobile)

---

## 📚 COURSE PAGE (`/course`)

### Hero Section
- **"Enroll Now"** (Primary CTA) → `https://rzp.io/l/JtEgnUYW` (Razorpay payment link)
- **"Learn More"** (Secondary CTA) → `#details` (anchor link to details section on same page)

### CTA Section (Mid-page)
- **"Contact Us Now"** (Primary CTA) → `#contact` (anchor link to contact section on same page)
- **"Get More Information"** (Secondary CTA) → `#contact` (anchor link to contact section on same page)

### Contact Section
- Phone numbers are clickable → `tel:+917066334499` and `tel:+917066337676`

---

## 👨‍🏫 INSTRUCTOR PAGE (`/instructor`)

- **"Enroll Now"** (Primary CTA) → `https://conference.finanthropist.com/webinar-registration`
- **"Join Free Webinar"** (Secondary CTA) → `https://conference.finanthropist.com/webinar-registration`

---

## 📞 CONTACT PAGE (`/contact`)

### Contact Information Links
- Phone Numbers → `tel:+917066334499` and `tel:+917066337676`
- Email Address → `mailto:hello@finanthropist.in`

### Form
- **"Send Message"** (Submit Button) → Form submission (no href, form action)

---

## 🔗 FOOTER LINKS

### Explore Section
- **Home** → `/`
- **Course** → `/course`
- **Instructor** → `/instructor`

### Resources Section
- **About Us** → `/about`
- **Contact** → `/contact`

### Connect Section
- **Email** → `mailto:hello@finanthropist.in`
- **Phone Numbers** → `tel:+917066334499` and `tel:+917066337676`
- **Instagram** → `https://www.instagram.com/`
- **YouTube** → `https://www.youtube.com/`
- **Telegram** → `https://www.telegram.org/`

### Bottom Links
- **Privacy Policy** → `/privacy`
- **Terms & Conditions** → `/terms`

---

## 📄 OTHER PAGES

### About Page (`/about`)
- No buttons/links (content-only page)

### Privacy Policy (`/privacy`)
- No buttons/links (content-only page)

### Terms & Conditions (`/terms`)
- No buttons/links (content-only page)

### 404 Not Found Page
- **"Go home"** → `/`

---

## 📊 SUMMARY BY DESTINATION

### Internal Routes (`/`)
- `/` - Home (Header, Footer)
- `/course` - Course page (Header, Footer, Hero CTA, Welcome CTA, Enroll Now buttons)
- `/about` - About page (Header, Footer)
- `/contact` - Contact page (Header, Footer, Welcome CTA)
- `/instructor` - Instructor page (Footer)
- `/privacy` - Privacy Policy (Footer)
- `/terms` - Terms & Conditions (Footer)

### External Links
- `https://conference.finanthropist.com/webinar-registration` - Webinar registration (Hero, Webinar, Instructor)
- `https://youtu.be/nNXCL7Eh7eo?si=6i-mAlFQX98X8XZD` - YouTube recorded webinar (Webinar section)
- `https://rzp.io/l/JtEgnUYW` - Razorpay payment (Course page)
- `https://www.instagram.com/` - Instagram (Footer)
- `https://www.youtube.com/` - YouTube (Footer)
- `https://www.telegram.org/` - Telegram (Footer)

### Anchor Links (Same Page)
- `#details` - Course page details section
- `#contact` - Course page contact section

### Action Links
- `tel:+917066334499` - Phone call (Contact page, Footer, Course page)
- `tel:+917066337676` - Phone call (Contact page, Footer, Course page)
- `mailto:hello@finanthropist.in` - Email (Contact page, Footer)

---

## ⚠️ INCONSISTENCIES FOUND

1. **Course Page "Enroll Now"** → Links to Razorpay (`https://rzp.io/l/JtEgnUYW`) instead of `/course` or webinar registration
2. **Instructor Page** → Both buttons link to webinar registration (could have one link to `/course`)
3. **Welcome Section "Call Now"** → Links to `/contact` but should trigger phone call on mobile

---

## ✅ RECOMMENDATIONS

1. **Standardize "Enroll Now" buttons**: Consider making all "Enroll Now" buttons link to `/course` for consistency
2. **Instructor Page**: Consider making "Enroll Now" link to `/course` and keeping "Join Free Webinar" for webinar registration
3. **Course Page**: The "Enroll Now" button links directly to payment - this is fine, but consider if it should go to `/course` first
4. **Welcome Section**: The "Call Now" button behavior is correct (links to contact page, triggers modal on mobile)


