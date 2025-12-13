# Mieter-Selbstauskunft Generator

A premium, conversion-optimized tenant self-disclosure form generator for the German rental market. Built with Next.js 15, TypeScript, Tailwind CSS, and Stripe.

## Features

- 🎨 **Premium Design**: High-quality UI with Tailwind CSS custom design system
- 📝 **6-Step Form**: Guided multi-step form with validation
- 📄 **PDF Generation**: Client-side PDF generation with React-PDF
- 💳 **Stripe Integration**: Secure payment processing
- 🔒 **Privacy-First**: No data storage, GDPR-compliant
- 📱 **Responsive**: Mobile-first design, works on all devices
- ⚡ **Fast**: Optimized performance with Next.js 15
- 🎯 **SEO-Ready**: Optimized metadata and structured data

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Form Management**: React Hook Form + Zod
- **State Management**: Zustand
- **PDF Generation**: @react-pdf/renderer
- **Payments**: Stripe
- **UI Components**: Radix UI + Custom components
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn
- Stripe account (for payments)

### Installation

1. **Clone the repository**
   ```bash
   cd mieter-selbstauskunft
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Copy the `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

   Then edit `.env.local` and add your Stripe keys:
   - Get your Stripe keys from https://dashboard.stripe.com/apikeys
   - Use test mode keys for development (sk_test_... and pk_test_...)

4. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (marketing)/       # Marketing pages (homepage, legal)
│   ├── (generator)/       # Generator pages (form, preview, success)
│   └── api/               # API routes (Stripe checkout, webhook)
├── components/
│   ├── ui/                # Reusable UI components
│   ├── form/              # Form-specific components
│   ├── pdf/               # PDF generation components
│   └── marketing/         # Landing page sections
├── lib/
│   ├── validators/        # Zod schemas
│   ├── pdf/               # PDF utilities
│   ├── stripe.ts          # Stripe client
│   ├── utils.ts           # Utility functions
│   └── constants.ts       # App constants
├── hooks/                 # Custom React hooks
├── types/                 # TypeScript type definitions
└── styles/                # Global styles
```

## Key Pages

- `/` - Landing page with Hero, Features, FAQ, etc.
- `/formular` - Multi-step form (6 steps)
- `/vorschau` - PDF preview before payment
- `/erfolg` - Success page with PDF download
- `/datenschutz` - Privacy policy
- `/impressum` - Legal imprint (required in Germany)

## Configuration

### Stripe Setup

1. Create a Stripe account at https://stripe.com
2. Get your API keys from the Dashboard
3. For local development, use test mode keys
4. Set up webhook endpoint for production:
   - URL: `https://yourdomain.com/api/webhook`
   - Events to listen for: `checkout.session.completed`, `payment_intent.succeeded`

### Price Configuration

The PDF price is set in `src/lib/constants.ts`:
```typescript
export const PDF_PRICE = 900; // in cents (9.00 EUR)
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Environment Variables for Production

Make sure to set these in your deployment platform:
- `NEXT_PUBLIC_APP_URL` - Your production URL
- `STRIPE_SECRET_KEY` - Your production Stripe secret key
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Your production Stripe publishable key
- `STRIPE_WEBHOOK_SECRET` - Your Stripe webhook secret

## Development

### Run development server
```bash
npm run dev
```

### Build for production
```bash
npm run build
```

### Start production server
```bash
npm start
```

### Lint code
```bash
npm run lint
```

## Features Roadmap

### Current (MVP)
- ✅ Multi-step form with validation
- ✅ PDF generation
- ✅ Stripe payment integration
- ✅ Landing page with marketing sections
- ✅ Basic legal pages

### Future Enhancements
- [ ] Email receipts (Resend integration)
- [ ] English version
- [ ] WG-Selbstauskunft variant
- [ ] Bundle offers
- [ ] Analytics integration
- [ ] A/B testing for pricing
- [ ] Abandoned cart recovery
- [ ] SEO blog content
- [ ] Programmatic SEO pages (city-specific)

## Legal Requirements (Germany)

This project includes placeholder legal pages that **MUST** be customized:

- **Impressum** (`/impressum`) - Required by German law (§ 5 TMG)
- **Datenschutzerklärung** (`/datenschutz`) - Privacy policy (GDPR)
- **AGB** - Terms and conditions (recommended)

⚠️ **Important**: Consult with a lawyer to ensure legal compliance for the German market.

## Support

For questions or issues:
- Email: [Your support email]
- GitHub Issues: [Your repo URL]/issues

## License

[Your chosen license]

## Credits

Built with ❤️ using:
- Next.js
- Tailwind CSS
- Stripe
- React-PDF
- And many other great open-source libraries

---

**Note**: This is a production-ready MVP. Customize the legal pages, set up proper error monitoring, and add analytics before launching to production.
