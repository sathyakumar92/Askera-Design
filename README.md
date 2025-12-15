# ASKera Design - Website Documentation

## 📁 Project Structure

```
ASKera Design/
│
├── index.html              # Home page
├── pricing.html            # Pricing page
├── uiux.html              # Case studies page
│
├── style.css              # Main stylesheet
├── pricing-styles.css     # Pricing page specific styles
├── responsive.css         # Responsive media queries
├── fixes.css              # Bug fixes and optimizations
│
├── script.js              # Main JavaScript functionality
├── hamburger.js           # Mobile menu functionality
│
├── favicon.png            # Site favicon (AK logo)
│
└── assets/
    ├── askera brand.mp4   # Hero background video
    ├── case studies/      # Case study images
    └── clients/           # Client review images
```

## ✨ Features Implemented

### 1. **Modern Logo & Branding**
- ✅ "ASKera Design" logo with Orbitron font
- ✅ Gradient effect (Cyan → Purple → Pink)
- ✅ Hover animations
- ✅ Favicon for browser tabs
- ✅ Consistent across all pages

### 2. **Responsive Design**
- ✅ Desktop Large (1440px+)
- ✅ Desktop (1200px - 1439px)
- ✅ Laptop (1024px - 1199px)
- ✅ Tablet Landscape (992px - 1023px)
- ✅ Tablet Portrait (768px - 991px)
- ✅ Mobile Landscape (576px - 767px)
- ✅ Mobile Portrait (480px - 575px)
- ✅ Small Mobile (375px - 479px)
- ✅ Extra Small Mobile (<375px)

### 3. **Hamburger Menu**
- ✅ Smooth 3-line to X animation
- ✅ Gradient colors
- ✅ Slide-in from right
- ✅ Backdrop overlay with blur
- ✅ Close on link click
- ✅ Close on overlay click
- ✅ Close on ESC key
- ✅ Auto-close on resize
- ✅ ARIA accessibility

### 4. **Contact Form (Web3Forms)**
- ✅ API Key: `f04efbf8-e6a1-4784-9d88-3885f0374d82`
- ✅ Email: sathya92.kumar28@gmail.com
- ✅ Success/error notifications
- ✅ Loading states
- ✅ Form validation
- ✅ Auto-reset after submission

### 5. **Contact Information**
- ✅ Email: sathya92.kumar28@gmail.com
- ✅ Phone: +91 90421 71585
- ✅ Location: Tamil Nadu, India
- ✅ Business Hours: Mon - Sat, 9 AM - 8 PM IST

### 6. **Social Media Links**
- ✅ Facebook: https://www.facebook.com/sklogosera
- ✅ Instagram: https://www.instagram.com/askeradesign/
- ✅ LinkedIn: https://www.linkedin.com/in/sathya-kumar-3278a7263/
- ✅ WhatsApp: +91 9042171585
- ✅ 360° rotation animation
- ✅ Platform-specific colors
- ✅ Tooltips on hover

### 7. **Pricing Page Features**
- ✅ Indian/International toggle
- ✅ Currency switch animation
- ✅ 3D card hover effects
- ✅ Gold, Platinum, Diamond tiers
- ✅ Logo Design packages
- ✅ Brand Identity packages
- ✅ Smooth transitions

### 8. **Case Studies Page**
- ✅ Modern vibrant design
- ✅ Orange/Teal/Purple color scheme
- ✅ Inter, Space Grotesk, Poppins fonts
- ✅ Project overview cards
- ✅ Detailed case sections
- ✅ Challenge & Solution
- ✅ Results showcase
- ✅ Client testimonials
- ✅ Scroll animations

### 9. **Performance Optimizations**
- ✅ Lazy loading images
- ✅ Smooth scroll behavior
- ✅ Debounced scroll events
- ✅ Optimized animations
- ✅ Will-change properties
- ✅ Backface visibility hidden
- ✅ Hardware acceleration

### 10. **Accessibility Features**
- ✅ ARIA labels
- ✅ Keyboard navigation
- ✅ Focus states
- ✅ Reduced motion support
- ✅ High contrast mode
- ✅ Screen reader friendly
- ✅ Touch target sizes (48px min)

## 🧪 Testing Checklist

### Desktop Testing
- [ ] Open in Chrome/Firefox/Safari/Edge
- [ ] Test navigation links
- [ ] Test hover effects on services/pricing
- [ ] Test 3D carousel rotation
- [ ] Submit contact form
- [ ] Click social media links
- [ ] Test back-to-top button
- [ ] Verify pricing toggle

### Mobile Testing
- [ ] Open on iPhone/Android
- [ ] Click hamburger menu
- [ ] Test menu overlay close
- [ ] Navigate between pages
- [ ] Test form submission
- [ ] Verify touch targets
- [ ] Test landscape orientation
- [ ] Check scroll performance

### Tablet Testing
- [ ] Test on iPad/Android tablet
- [ ] Verify 2-column layouts
- [ ] Test hamburger menu
- [ ] Check pricing cards
- [ ] Test case study layout

### Browser Compatibility
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari
- [ ] Chrome Mobile

## 🐛 Known Issues & Fixes

### Issue 1: Menu not closing on mobile
**Fix:** Implemented multiple close methods (overlay, ESC key, link click)

### Issue 2: Pricing toggle animation glitch
**Fix:** Added smooth transition with icon rotation

### Issue 3: Form submission not working
**Fix:** Properly configured Web3Forms API with correct key

### Issue 4: Horizontal scroll on mobile
**Fix:** Added `overflow-x: hidden` to body

### Issue 5: Font loading flash
**Fix:** Using font-display: swap in Google Fonts

## 📱 Responsive Breakpoints

```css
/* Desktop Large */
@media (min-width: 1440px) { }

/* Desktop */
@media (max-width: 1439px) { }

/* Laptop */
@media (max-width: 1199px) { }

/* Tablet Landscape */
@media (max-width: 1023px) { }

/* Tablet Portrait & Mobile Menu Trigger */
@media (max-width: 991px) {
    .hamburger { display: flex; }
}

/* Mobile Landscape */
@media (max-width: 767px) { }

/* Mobile Portrait */
@media (max-width: 575px) { }

/* Small Mobile */
@media (max-width: 479px) { }

/* Extra Small Mobile */
@media (max-width: 374px) { }
```

## 🎨 Color Palette

### Home Page (Dark Theme)
- Navy Deep: `#0A1929`
- Navy Light: `#152238`
- Copper: `#D4A574`
- Copper Light: `#E6C39A`
- Cream: `#F5F1E8`

### Case Studies (Vibrant Theme)
- Primary Orange: `#FF6B35`
- Primary Teal: `#00D4AA`
- Primary Purple: `#9B5DE5`
- Primary Pink: `#F15BB5`
- Dark Navy: `#0D1B2A`

## 🔧 Maintenance Tips

### Adding New Case Study
1. Add project image to `/case studies/` folder
2. Copy existing `.project-card` HTML block
3. Update image src, title, description, and meta info
4. Add to filter category if needed

### Updating Pricing
1. Open `pricing.html`
2. Find the pricing tier to update
3. Modify amount in both Indian and International sections
4. Update features list if needed

### Adding New Service
1. Open `index.html`
2. Find `.services-grid` section
3. Copy `.service-card` block
4. Update icon, title, and description

## 📞 Support Contacts

**Developer:** Sathya Kumar A
**Email:** sathya92.kumar28@gmail.com
**Phone:** +91 90421 71585
**Location:** Tamil Nadu, India

## 📄 License

© 2025 ASKera Design. All Rights Reserved.

---

## 🚀 Quick Start Guide

1. **Open Website:**
   - Double-click `index.html` to open in browser
   - Or use: File → Open → Browse to index.html

2. **Test Features:**
   - Resize browser to test responsive design
   - Click hamburger menu on mobile widths
   - Fill and submit contact form
   - Test social media links

3. **Deploy:**
   - Upload all files to web server
   - Ensure proper file structure is maintained
   - Test on live server

## ✅ Pre-Deployment Checklist

- [ ] All images optimized
- [ ] Links tested (social media, navigation)
- [ ] Forms tested (Web3Forms working)
- [ ] Responsive design verified
- [ ] Cross-browser tested
- [ ] Performance optimized
- [ ] Accessibility checked
- [ ] SEO meta tags verified
- [ ] Analytics tracking configured
- [ ] Favicon displays correctly

---

**Last Updated:** December 15, 2025
**Version:** 2.0.0
**Status:** Production Ready ✅
