# IndexNow Integration Documentation

## Overview

IndexNow is a protocol that allows websites to instantly notify search engines when content is created, updated, or deleted. This integration enables instant indexing notifications to Bing, Yandex, and other participating search engines.

## Benefits

- ✅ **Instant Indexing**: URLs are crawled and indexed much faster than traditional methods
- ✅ **Multiple Search Engines**: One submission notifies all participating engines
- ✅ **Reduced Server Load**: Search engines know exactly what to crawl
- ✅ **Better SEO**: Faster indexing means faster appearance in search results
- ✅ **Free Service**: No cost to use IndexNow protocol

## Setup

### 1. API Key

Your IndexNow API key has been generated and saved:

**API Key**: `1476537f7ffc172d64fa567c74b5e96fa2d4e6c5d31695017b75363b261bf5a1`

**Verification File**: `1476537f7ffc172d64fa567c74b5e96fa2d4e6c5d31695017b75363b261bf5a1.txt`

This file must be accessible at:
`https://livingtrust-attorneys.com/1476537f7ffc172d64fa567c74b5e96fa2d4e6c5d31695017b75363b261bf5a1.txt`

### 2. Files Created

- **indexnow-submit.js** - Manual submission script
- **indexnow-auto.js** - Automated submission based on git changes
- **[api-key].txt** - API key verification file

## Usage

### Manual Submission

Submit all HTML files to IndexNow:

```bash
npm run indexnow
```

Or submit specific URLs:

```bash
node indexnow-submit.js https://livingtrust-attorneys.com/page1.html https://livingtrust-attorneys.com/page2.html
```

### Automated Submission

Submit only modified HTML files (based on last git commit):

```bash
npm run indexnow:auto
```

Submit all HTML files automatically:

```bash
npm run indexnow:all
```

### Integration with Git Workflow

Add to your deployment script or Git hooks to automatically notify search engines:

```bash
# After git push
git push origin main && npm run indexnow:auto
```

Or create a post-commit hook (`.git/hooks/post-commit`):

```bash
#!/bin/bash
npm run indexnow:auto
```

## How It Works

1. **Generate API Key**: A unique 32-byte hexadecimal key identifies your site
2. **Create Verification File**: Search engines verify ownership by accessing the key file
3. **Submit URLs**: POST request to IndexNow API with list of URLs
4. **Search Engines Crawl**: Bing, Yandex, etc. receive notification and crawl URLs
5. **Faster Indexing**: URLs appear in search results much faster

## API Response Codes

- **200 OK**: URLs submitted successfully
- **202 Accepted**: URLs received and queued for processing
- **400 Bad Request**: Invalid format or parameters
- **403 Forbidden**: Invalid API key or verification failed
- **422 Unprocessable**: URLs not accepted (may be invalid)
- **429 Too Many Requests**: Rate limit exceeded (wait and retry)

## Best Practices

### When to Submit

✅ **DO submit when**:
- Publishing new content
- Updating existing pages
- Fixing errors or broken links
- Making significant content changes

❌ **DON'T submit when**:
- Making minor CSS/styling changes
- Updating analytics or tracking codes
- Content hasn't actually changed
- Submitting too frequently (wait at least a few hours between submissions)

### Submission Limits

- **Max URLs per request**: 10,000
- **Recommended frequency**: Once per day for unchanged content
- **File size**: Keep verification file under 10KB

## Participating Search Engines

IndexNow is supported by:
- **Bing** (Microsoft)
- **Yandex** (Russia)
- **Seznam.cz** (Czech Republic)
- **Naver** (South Korea)
- More engines joining regularly

**Note**: Google does not currently support IndexNow. Continue using Google Search Console for Google indexing.

## Verification

To verify your integration is working:

1. **Check API Key File**:
   ```bash
   curl https://livingtrust-attorneys.com/1476537f7ffc172d64fa567c74b5e96fa2d4e6c5d31695017b75363b261bf5a1.txt
   ```

2. **Test Submission**:
   ```bash
   npm run indexnow
   ```

3. **Monitor Bing Webmaster Tools**:
   - Go to https://www.bing.com/webmasters
   - Check "URL Inspection" tool
   - Verify URLs are being crawled

## Troubleshooting

### Error: 403 Forbidden

**Cause**: API key verification failed

**Solution**:
- Ensure the `.txt` file is publicly accessible
- Verify the filename matches the API key exactly
- Check that the file contains only the API key (no extra characters)

### Error: 422 Unprocessable

**Cause**: URLs are invalid or not accepted

**Solution**:
- Verify URLs are publicly accessible
- Check for HTTPS (some search engines prefer HTTPS)
- Ensure URLs belong to your domain

### No Response / Timeout

**Cause**: Network issues or IndexNow API temporarily unavailable

**Solution**:
- Check your internet connection
- Retry after a few minutes
- Verify no firewall is blocking outbound HTTPS requests

## Example Output

```
IndexNow Submission Script
=========================

Found 65 HTML files to submit.

URLs to submit:
  1. https://livingtrust-attorneys.com/index.html
  2. https://livingtrust-attorneys.com/living-trusts.html
  3. https://livingtrust-attorneys.com/probate.html
  ... and 62 more

Submitting to IndexNow API...

✅ Success!
Status: 200 - URLs submitted successfully

Submitted 65 URL(s) to:
  • Bing
  • Yandex
  • Other IndexNow participating search engines

Search engines will crawl and index the submitted URLs.
```

## Additional Resources

- **IndexNow Official Documentation**: https://www.indexnow.org/documentation
- **Bing Webmaster Tools**: https://www.bing.com/webmasters
- **Yandex Webmaster**: https://webmaster.yandex.com/
- **IndexNow FAQ**: https://www.indexnow.org/faq

## Security Notes

- The API key is not a secret (it's publicly accessible in the .txt file)
- The key file proves domain ownership
- Never share your hosting credentials or Webmaster Tools API keys
- The IndexNow key can be regenerated if needed

## License

This integration uses the open IndexNow protocol. No license restrictions apply.

---

**Last Updated**: December 3, 2025
**Integration Version**: 1.0.0
**Domain**: livingtrust-attorneys.com
