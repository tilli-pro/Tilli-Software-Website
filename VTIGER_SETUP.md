# Vtiger CRM Integration Setup for Tilli Website

## Overview
This integration automatically creates leads in your Vtiger CRM instance at https://utilliadmin.com/crm when users submit the demo request form.

## Setup Instructions

### 1. Get Your Vtiger Access Key

1. Log into Vtiger at: https://utilliadmin.com/crm
2. Click on your profile icon (top right)
3. Go to **My Preferences**
4. Navigate to **User Advanced Options**
5. Copy your **Webservice Access Key**

### 2. Deploy the Backend API

You have several options for deploying the backend API:

#### Option A: Deploy to Vercel (Recommended)

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. From the project directory, run:
   ```bash
   vercel
   ```

3. Set environment variables in Vercel dashboard:
   ```
   VTIGER_URL=https://utilliadmin.com/crm
   VTIGER_USERNAME=admin
   VTIGER_ACCESS_KEY=crsogur4p4yvzyur
   NOTIFICATION_EMAIL=sales@tilli.pro
   ```

4. Update `vtiger-integration.js` with your Vercel function URL:
   ```javascript
   API_URL: 'https://your-vercel-app.vercel.app/api/vtiger'
   ```

#### Option B: Deploy to Netlify Functions

1. Create `netlify.toml` in project root:
   ```toml
   [functions]
     directory = "api"
   ```

2. Deploy to Netlify
3. Set environment variables in Netlify dashboard
4. Update the API_URL to your Netlify function endpoint

#### Option C: Use Your Existing Backend

1. Copy the logic from `api/vtiger.js` to your backend
2. Create an endpoint at `/api/vtiger`
3. Ensure CORS is configured to allow requests from your website

### 3. Configure the Frontend

1. Update `vtiger-integration.js` with your API endpoint:
   ```javascript
   const VTIGER_CONFIG = {
       API_URL: 'https://your-api-endpoint.com/api/vtiger',
       VTIGER_URL: 'https://utilliadmin.com/crm',
   };
   ```

### 4. Test the Integration

1. Open your website
2. Fill out the demo request form
3. Submit the form
4. Check Vtiger CRM for the new lead
5. Verify email notification (if configured)

## Security Considerations

1. **Never expose your Vtiger Access Key in client-side code**
2. Always use the backend API proxy approach
3. Implement rate limiting (already included in the API)
4. Use HTTPS for all communications
5. Consider adding CAPTCHA for additional spam protection

## Troubleshooting

### Form submission fails
- Check browser console for errors
- Verify API endpoint is accessible
- Check CORS configuration

### Lead not created in Vtiger
- Verify Vtiger credentials are correct
- Check that Web Services are enabled in Vtiger
- Ensure the Leads module is accessible via API
- Check API logs for error messages

### CORS errors
- Add your website domain to CORS allowed origins
- Ensure preflight requests are handled

## Lead Mapping

The form data is mapped to Vtiger as follows:

| Form Field | Vtiger Field | Notes |
|------------|--------------|-------|
| firstName | firstname | Required |
| lastName | lastname | Required |
| email | email | Required |
| company | company | Optional |
| phone | phone | Optional |
| message | description | Included in lead description |

All leads are automatically:
- Set as **Lead Source**: "Website"
- Set as **Lead Status**: "Hot" (demo requests are hot leads)
- Assigned to the API user

## Monitoring

Consider setting up monitoring for:
- API endpoint availability
- Form submission success rate
- Lead creation rate in Vtiger
- Error logging

## Support

For issues with:
- Vtiger API: Check Vtiger documentation or contact Vtiger support
- Website integration: Contact your development team
- Form submissions: Check the browser console and API logs