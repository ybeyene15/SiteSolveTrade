# Deployment Guide

Complete step-by-step guide for deploying this website to production.

---

## Prerequisites Checklist

Before deploying, ensure you have:

- [ ] GitHub account created
- [ ] Vercel or Netlify account created
- [ ] Supabase project URL and keys ready
- [ ] Web3Forms access key (if using contact forms)
- [ ] Stripe account configured (if using payments)
- [ ] Custom domain purchased (optional)

---

## Step 1: Export from Bolt to GitHub

### Option A: Direct Download Method

1. **Download Project from Bolt**
   - Click menu icon (three lines) in Bolt
   - Select "Download as ZIP" or "Export Project"
   - Save ZIP file to your computer
   - Extract ZIP to a folder

2. **Prepare for GitHub**
   - Open terminal/command prompt
   - Navigate to extracted folder:
     ```bash
     cd path/to/your/project
     ```

3. **Initialize Git Repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit from Bolt"
   ```

4. **Create GitHub Repository**
   - Go to github.com/new
   - Repository name: `your-project-name`
   - Visibility: Private (recommended)
   - Do NOT initialize with README
   - Click "Create repository"

5. **Push to GitHub**
   ```bash
   git remote add origin https://github.com/yourusername/your-project-name.git
   git branch -M main
   git push -u origin main
   ```

### Option B: Using Git Commands in Bolt Terminal

If Bolt has terminal access:

```bash
git init
git add .
git commit -m "Initial commit"
```

Then follow steps 4-5 from Option A above.

---

## Step 2: Deploy to Vercel (Recommended)

### Why Vercel?
- Best for React/Vite projects
- Automatic framework detection
- Zero configuration needed
- Free SSL certificates
- Generous free tier

### Deployment Steps

1. **Sign Up for Vercel**
   - Go to vercel.com
   - Click "Sign Up"
   - Choose "Continue with GitHub" (easiest option)

2. **Import Your Project**
   - Click "Add New" → "Project"
   - Select "Import Git Repository"
   - Find and select your GitHub repository
   - Click "Import"

3. **Configure Project**
   - Framework: Vite (auto-detected)
   - Root Directory: `./` (default)
   - Build Command: `npm run build` (auto-detected)
   - Output Directory: `dist` (auto-detected)
   - Install Command: `npm install` (auto-detected)

4. **Add Environment Variables**
   - Click "Environment Variables" section
   - Add each variable from your `.env` file:

   ```
   VITE_SUPABASE_URL = https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY = your_anon_key_here
   VITE_WEB3FORMS_ACCESS_KEY = your_web3forms_key_here
   ```

   - Make sure to add them for all environments (Production, Preview, Development)

5. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes for build to complete
   - Your site will be live at: `your-project.vercel.app`

6. **Verify Deployment**
   - Click the deployment URL
   - Test all pages load correctly
   - Test user authentication
   - Test form submissions
   - Check browser console for errors

### Configure Custom Domain (Optional)

1. **Add Domain to Vercel**
   - Go to Project Settings → Domains
   - Click "Add Domain"
   - Enter your domain: `yourdomain.com`

2. **Update DNS Settings**
   - Go to your domain registrar (Namecheap, GoDaddy, etc.)
   - Update nameservers OR add A/CNAME records
   - Vercel will show you exact DNS records to add

3. **Wait for DNS Propagation**
   - Usually takes 10 minutes to 48 hours
   - Vercel auto-provisions SSL certificate
   - Your site will be live at your custom domain

---

## Step 3: Deploy to Netlify (Alternative)

### Why Netlify?
- Excellent for static sites
- Great form handling
- Simple interface
- Generous free tier

### Deployment Steps

1. **Sign Up for Netlify**
   - Go to netlify.com
   - Click "Sign Up"
   - Choose "GitHub" for easy connection

2. **Import Your Project**
   - Click "Add new site" → "Import an existing project"
   - Select "Deploy with GitHub"
   - Authorize Netlify to access GitHub
   - Select your repository

3. **Configure Build Settings**
   - Branch to deploy: `main`
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Click "Show advanced" for environment variables

4. **Add Environment Variables**
   - Click "New variable"
   - Add each variable from your `.env` file:

   ```
   VITE_SUPABASE_URL = https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY = your_anon_key_here
   VITE_WEB3FORMS_ACCESS_KEY = your_web3forms_key_here
   ```

5. **Deploy**
   - Click "Deploy site"
   - Wait 2-3 minutes for build
   - Your site will be live at: `random-name.netlify.app`

6. **Change Site Name (Optional)**
   - Go to Site Settings → General → Site details
   - Click "Change site name"
   - Choose a better name: `yourproject.netlify.app`

### Configure Custom Domain (Optional)

1. **Add Domain to Netlify**
   - Go to Site Settings → Domain management
   - Click "Add custom domain"
   - Enter your domain: `yourdomain.com`

2. **Update DNS Settings**
   - Netlify will show you DNS records to add
   - Go to your domain registrar
   - Add the DNS records shown by Netlify

3. **Enable HTTPS**
   - Netlify automatically provisions SSL
   - Wait for certificate to be issued (few minutes)

---

## Step 4: Configure Supabase for Production

### Update Supabase Settings

1. **Add Production URL to Allowed Origins**
   - Go to Supabase dashboard
   - Navigate to Authentication → URL Configuration
   - Add your production URL:
     - `https://your-project.vercel.app`
     - `https://yourdomain.com` (if using custom domain)

2. **Update Site URL**
   - Set Site URL to your production domain
   - Update Redirect URLs if needed

3. **Test Database Connection**
   - Visit your deployed site
   - Try to sign up/login
   - Check if data saves to database
   - Review Supabase logs for any errors

### Deploy Edge Functions (If Using)

1. **List Existing Functions**
   - Check `supabase/functions/` directory
   - Verify all functions are deployed in Supabase dashboard

2. **Redeploy if Needed**
   - Functions should already be deployed from Bolt
   - If not, use Supabase CLI or redeploy manually

---

## Step 5: Set Up Continuous Deployment

### Automatic Deployments

Both Vercel and Netlify automatically deploy when you push to GitHub:

1. **Make Changes Locally**
   ```bash
   git add .
   git commit -m "Updated homepage content"
   git push
   ```

2. **Automatic Build Triggers**
   - Platform detects push to `main` branch
   - Automatically builds and deploys
   - Usually takes 2-3 minutes

3. **Monitor Deployment**
   - Check deployment status in dashboard
   - View build logs if errors occur
   - Test deployed site after build completes

### Preview Deployments

Both platforms create preview deployments for branches:

1. **Create New Branch**
   ```bash
   git checkout -b feature/new-feature
   git push origin feature/new-feature
   ```

2. **Preview URL Created**
   - Platform creates unique preview URL
   - Test changes before merging to main
   - Share with team for review

---

## Step 6: Post-Deployment Checklist

### Functionality Testing

- [ ] Homepage loads correctly
- [ ] All navigation links work
- [ ] Images and assets load
- [ ] Forms submit successfully
- [ ] User authentication works (signup/login)
- [ ] Protected routes redirect correctly
- [ ] Payment integration works (if applicable)
- [ ] Mobile responsiveness verified
- [ ] SSL certificate is active (https://)

### Performance Testing

- [ ] Page load time under 3 seconds
- [ ] Lighthouse score above 90
- [ ] No console errors
- [ ] Images optimized
- [ ] Fonts loading correctly

### SEO Setup

- [ ] Add meta descriptions
- [ ] Configure Open Graph tags
- [ ] Submit sitemap to Google
- [ ] Set up Google Analytics (optional)
- [ ] Verify structured data

---

## Step 7: Transfer Ownership to Client

### Transfer GitHub Repository

1. Go to repository Settings
2. Scroll to "Danger Zone"
3. Click "Transfer ownership"
4. Enter client's GitHub username
5. Client accepts transfer

### Transfer Vercel Project

1. Go to Project Settings
2. Navigate to "Advanced" section
3. Find "Transfer Project"
4. Enter client's email or username
5. Client accepts transfer

### Transfer Netlify Site

1. Go to Site Settings
2. Navigate to "General" → "Transfer site"
3. Enter client's email
4. Client accepts transfer via email

### Transfer Supabase Project (If Needed)

1. Go to Supabase Project Settings
2. Navigate to "General" → "Transfer Project"
3. Enter client's email
4. Client creates Supabase account to accept
5. Update environment variables in Vercel/Netlify

---

## Troubleshooting Common Issues

### Build Fails on Deployment

**Problem**: Build succeeds locally but fails on platform

**Solutions**:
- Check Node.js version matches (18.x recommended)
- Ensure all dependencies in `package.json`
- Review build logs for specific errors
- Verify environment variables are set

### Environment Variables Not Working

**Problem**: App can't connect to Supabase or services

**Solutions**:
- Verify all variables start with `VITE_` prefix
- Check variables are set in deployment platform
- Ensure no typos in variable names
- Redeploy after adding variables

### 404 Errors on Refresh

**Problem**: Pages work on initial load but 404 on refresh

**Solutions**:

For Vercel: Add `vercel.json`:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

For Netlify: Add `netlify.toml`:
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Slow Page Loads

**Problem**: Site loads slowly

**Solutions**:
- Optimize images (compress, use WebP)
- Enable lazy loading for images
- Check bundle size with `npm run build`
- Consider code splitting
- Enable caching headers

### Database Connection Issues

**Problem**: Can't connect to Supabase

**Solutions**:
- Verify Supabase URL and keys are correct
- Check RLS policies allow access
- Review Supabase logs for errors
- Ensure production URL added to allowed origins

---

## Monitoring and Maintenance

### Set Up Monitoring

1. **Vercel Analytics** (if using Vercel)
   - Enable in Project Settings
   - Track page views and performance

2. **Netlify Analytics** (if using Netlify)
   - Enable in Site Settings
   - Paid feature but very useful

3. **Supabase Monitoring**
   - Check database usage
   - Monitor API calls
   - Review error logs

### Regular Maintenance

- Update dependencies monthly: `npm update`
- Check for security vulnerabilities: `npm audit`
- Monitor error logs weekly
- Backup database regularly
- Review and optimize performance

---

## Support and Resources

### Platform Documentation

- Vercel: https://vercel.com/docs
- Netlify: https://docs.netlify.com
- Supabase: https://supabase.com/docs

### Useful Commands

```bash
# Update dependencies
npm update

# Check for security issues
npm audit fix

# Build for production
npm run build

# Preview production build
npm run preview

# Type check
npm run typecheck
```

### Getting Help

1. Check deployment platform logs
2. Review browser console errors
3. Check Supabase logs
4. Search platform documentation
5. Contact support if needed

---

## Cost Breakdown

### Free Tier Limits

**Vercel Free:**
- 100GB bandwidth/month
- Unlimited sites
- Automatic SSL
- Edge Functions included

**Netlify Free:**
- 100GB bandwidth/month
- 300 build minutes/month
- Unlimited sites
- Automatic SSL

**Supabase Free:**
- 500MB database
- 1GB file storage
- 2GB bandwidth
- 50,000 monthly active users

### When to Upgrade

Upgrade when you exceed:
- Bandwidth limits (high traffic)
- Database size (lots of data)
- Build minutes (frequent deployments)
- Edge function execution time

---

## Conclusion

Your project is now deployed and ready for production use. The setup enables:

- Automatic deployments from GitHub
- Professional hosting with SSL
- Scalable database with Supabase
- Easy content updates and maintenance
- Full ownership transfer capability

For any issues, refer to the troubleshooting section or consult the platform documentation.
