# La Reunión Community Center Website

A modern, responsive website for La Reunión, a community center providing social services, food assistance, after-school programs, and community activities.

## Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern UI**: Built with Next.js 14, TypeScript, and Shadcn UI components
- **Accessibility**: Semantic HTML and ARIA labels
- **Performance**: Optimized with Next.js App Router and React Server Components
- **SEO Ready**: Meta tags and structured content

## Pages

- **Home**: Overview of services and mission
- **About**: Organization history, mission, and values
- **Services**: Detailed information about programs offered
- **Volunteer**: Opportunities and how to get involved
- **Contact**: Contact information and form
- **Donate**: Ways to support the organization

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: Shadcn UI + Radix UI
- **Icons**: Lucide React
- **Deployment**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd la-reunion-site
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── about/            # About page
│   ├── services/         # Services page
│   ├── volunteer/        # Volunteer page
│   ├── contact/          # Contact page
│   ├── donate/           # Donate page
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Homepage
├── components/            # Reusable components
│   ├── ui/               # Base UI components
│   ├── layout/           # Layout components
│   └── sections/         # Page sections
└── lib/                  # Utility functions
```

## Customization

### Colors
The site uses a custom orange color palette defined in `tailwind.config.ts`. You can modify these colors to match your brand.

### Content
Update the content in each page component to reflect your organization's specific information, services, and contact details.

### Logo
Replace the placeholder logo in the navigation with your actual logo file.

## Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect Next.js and deploy
3. Set environment variables if needed

### Other Platforms
The site can be deployed to any platform that supports Next.js static export or server-side rendering.

## Future Enhancements

- **Content Management**: Integration with a headless CMS for easy content updates
- **Donation System**: Secure online donation processing
- **Event Calendar**: Community events and program scheduling
- **Newsletter Signup**: Email marketing integration
- **Social Media Integration**: Facebook and other platform connections
- **Multi-language Support**: Spanish language options

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For questions about the website or La Reunión's services, contact info@la-reunion.org.

---

Built with ❤️ for the La Reunión community.
