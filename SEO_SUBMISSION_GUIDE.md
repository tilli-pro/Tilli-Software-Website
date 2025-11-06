# SEO & Search Engine Submission Guide for Tilli Software

## Quick Reference
- **Primary Domain**: https://tillisoftware.com
- **Alternate Domain**: https://tilli.pro
- **Sitemap**: https://tillisoftware.com/sitemap.xml
- **Robots.txt**: https://tillisoftware.com/robots.txt

---

## 1. Google Search Console

### Setup Steps:
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Click **"Add Property"**
3. Enter: `https://tillisoftware.com`
4. **Verify Ownership** (choose one method):
   - **HTML Tag** (easiest): Add meta tag to `<head>` of index.html
   - **DNS Verification**: Add TXT record to your domain
   - **Google Analytics**: If already installed
5. Submit Sitemap:
   - Go to **Sitemaps** in left menu
   - Enter: `sitemap.xml`
   - Click **Submit**

### Additional URLs to Submit:
- `https://tilli.pro` (add as separate property)
- Request indexing for key pages:
  - `/signup`
  - `/demos`
  - `/tillix`
  - `/nudge`
  - `/tillipay`

---

## 2. Bing Webmaster Tools

### Setup Steps:
1. Go to [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. **Import from Google** (easiest):
   - Sign in with Google account
   - Automatically imports sites from Google Search Console
3. OR **Manual Setup**:
   - Add site: `https://tillisoftware.com`
   - Verify ownership (meta tag or file upload)
4. Submit Sitemap:
   - Go to **Sitemaps**
   - Add: `https://tillisoftware.com/sitemap.xml`
   - Click **Submit**

---

## 3. Yahoo Search (via Bing)

Yahoo search results are powered by Bing. Once you submit to Bing, you're automatically covered for Yahoo!

---

## 4. Yandex Webmaster

### Setup Steps:
1. Go to [Yandex Webmaster](https://webmaster.yandex.com)
2. Click **"Add Site"**
3. Enter: `https://tillisoftware.com`
4. Verify ownership (meta tag or HTML file)
5. Submit sitemap in **Indexing > Sitemap files**

---

## 5. Baidu Webmaster Tools (Optional - for Chinese market)

1. Go to [Baidu Webmaster Tools](https://ziyuan.baidu.com)
2. Requires Chinese phone number for verification
3. Submit sitemap after verification

---

## 6. AI Search Engines & Agents

### A. OpenAI (ChatGPT / SearchGPT)

**robots.txt already configured** ✅
- `GPTBot`, `ChatGPT-User`, `OAI-SearchBot`, `SearchGPT` allowed

**Additional Steps**:
1. Ensure high-quality, structured content
2. Use clear headings and semantic HTML
3. Include detailed product descriptions
4. **No manual submission needed** - crawlers will find you

### B. Anthropic Claude

**robots.txt already configured** ✅
- `anthropic-ai`, `Claude-Web` allowed

**Optimization**:
- Clear, well-structured content
- Proper heading hierarchy
- Detailed explanations
- **No manual submission needed**

### C. Perplexity AI

**robots.txt already configured** ✅
- `PerplexityBot` allowed

**Optimization**:
- Focus on factual, up-to-date content
- Use lists and structured data
- Include statistics and data points
- **No manual submission needed**

### D. Microsoft Copilot

**robots.txt already configured** ✅
- `Copilot`, `Bingbot-AI` allowed

**Additional Steps**:
1. Ensure Bing indexing is complete (see section 2)
2. Copilot uses Bing's index
3. **No separate submission needed**

### E. Google Gemini / Bard

**robots.txt already configured** ✅
- `Gemini`, `Google-Extended` allowed

**Additional Steps**:
1. Ensure Google indexing is complete (see section 1)
2. Gemini uses Google's index
3. **No separate submission needed**

### F. X.AI Grok

**robots.txt already configured** ✅
- `Grok`, `Grokbot`, `x-ai` allowed

**Optimization**:
- Clear, conversational content
- Real-time data where applicable
- **No manual submission needed** - will crawl automatically

### G. Meta AI

**robots.txt already configured** ✅
- `Meta-ExternalAgent`, `MetaAI` allowed

**No manual submission** - Meta's AI uses its own crawlers

---

## 7. Alternative Search Engines

All configured in robots.txt ✅:
- **DuckDuckGo**: Uses Bing results + its own crawler (`DuckDuckBot`)
- **Kagi**: Premium search (`KagiBot`)
- **You.com**: AI search (`YouBot`)
- **Brave Search**: Independent index (`Brave-Inspector`)
- **Neeva**: Privacy-focused search

---

## 8. Structured Data (Schema.org) Implementation

### Already Implemented on Site:
✅ Organization Schema
✅ LocalBusiness Schema
✅ Product Schema (tilliX, Nudge, tilliPay)
✅ WebSite Schema with SearchAction
✅ BreadcrumbList Schema

### Validate Your Schema:
1. Go to [Google Rich Results Test](https://search.google.com/test/rich-results)
2. Enter: `https://tillisoftware.com`
3. Check for errors and fix if needed

### Schema.org Validator:
1. Go to [Schema.org Validator](https://validator.schema.org/)
2. Enter your URL
3. Verify all structured data is valid

---

## 9. Monitoring & Analytics

### Set Up:
1. **Google Analytics** - Already installed ✅
2. **Vercel Analytics** - Already installed ✅
3. **RB2B Tracking** - Already installed ✅

### Monitor Rankings:
- Google Search Console: Track impressions, clicks, CTR
- Bing Webmaster: Monitor Bing/Yahoo performance
- Third-party tools:
  - [Ahrefs](https://ahrefs.com)
  - [SEMrush](https://www.semrush.com)
  - [Moz](https://moz.com)

---

## 10. Social Media Optimization

### Open Graph Tags:
✅ Already implemented on all pages
- `og:title`
- `og:description`
- `og:image`
- `og:url`
- `og:type`

### Twitter Cards:
✅ Already implemented
- `twitter:card`
- `twitter:site`
- `twitter:image`

### Test Your Social Cards:
1. **Facebook**: [Sharing Debugger](https://developers.facebook.com/tools/debug/)
2. **Twitter**: [Card Validator](https://cards-dev.twitter.com/validator)
3. **LinkedIn**: [Post Inspector](https://www.linkedin.com/post-inspector/)

---

## 11. Performance Optimization

### Core Web Vitals:
1. Test with [PageSpeed Insights](https://pagespeed.web.dev/)
2. Enter: `https://tillisoftware.com`
3. Aim for green scores (90+)

### Mobile Optimization:
1. Test with [Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)
2. Ensure all pages are responsive

---

## 12. Local SEO (Optional)

If you have a physical office:
1. Create **Google Business Profile**
2. Add business to local directories
3. Include NAP (Name, Address, Phone) consistently

---

## 13. Content Optimization Checklist

For each page, ensure:
- [ ] Unique, descriptive `<title>` tag (50-60 chars)
- [ ] Compelling meta description (150-160 chars)
- [ ] One H1 tag per page
- [ ] Proper heading hierarchy (H1 → H2 → H3)
- [ ] Alt text for all images
- [ ] Internal links to related pages
- [ ] External links to authoritative sources
- [ ] Mobile-responsive design
- [ ] Fast page load (< 3 seconds)
- [ ] HTTPS enabled ✅
- [ ] Canonical tags set
- [ ] Structured data implemented
- [ ] Social sharing tags (OG, Twitter)

---

## 14. Submission Timeline

### Immediate (Week 1):
- ✅ Submit to Google Search Console
- ✅ Submit to Bing Webmaster Tools
- ✅ Validate structured data
- ✅ Test social cards

### Week 2-3:
- Monitor crawl activity in Search Console
- Request indexing for key pages
- Fix any crawl errors

### Month 1-2:
- Begin appearing in search results
- Monitor rankings and traffic
- Adjust content based on performance

### Ongoing:
- Update sitemap when adding new pages
- Monitor Core Web Vitals
- Create fresh, high-quality content
- Build backlinks from authoritative sites

---

## 15. Key Metrics to Track

1. **Organic Search Traffic**: Google Analytics
2. **Keyword Rankings**: Search Console, Ahrefs
3. **Click-Through Rate (CTR)**: Search Console
4. **Bounce Rate**: Google Analytics
5. **Page Load Speed**: PageSpeed Insights
6. **Core Web Vitals**: Search Console
7. **Backlinks**: Ahrefs, Moz
8. **Indexed Pages**: Search Console

---

## 16. Quick Wins for Better Rankings

1. **Add FAQ Schema** to product pages
2. **Create blog content** targeting long-tail keywords:
   - "best payment processing for utilities"
   - "customer self-service portal software"
   - "automated billing and payments"
3. **Build backlinks**:
   - Guest posts on industry blogs
   - Directory submissions
   - Partner/vendor pages
4. **Optimize page speed**:
   - Compress images
   - Minify CSS/JS
   - Enable caching
5. **Update content regularly**:
   - Add new case studies
   - Publish blog posts
   - Update product features

---

## Support & Resources

- **Google SEO Guide**: https://developers.google.com/search/docs
- **Bing SEO Guide**: https://www.bing.com/webmasters/help/webmasters-guidelines-30fba23a
- **Schema.org Documentation**: https://schema.org/docs/gs.html
- **Moz Beginner's Guide to SEO**: https://moz.com/beginners-guide-to-seo

---

## Contact for SEO Support

For advanced SEO strategy and implementation:
- Email: marketing@tillisoftware.com
- Consider hiring an SEO agency for:
  - Link building campaigns
  - Content strategy
  - Technical SEO audits
  - Competitor analysis

---

**Last Updated**: November 6, 2025
**Next Review**: December 6, 2025
