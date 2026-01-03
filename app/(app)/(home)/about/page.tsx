import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  PaletteIcon, 
  HeartIcon, 
  UsersIcon, 
  ShieldCheckIcon,
  SparklesIcon,
  GlobeIcon,
  TruckIcon,
  AwardIcon,
  ArrowRightIcon
} from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "About | Colorwall",
  description: "Discover the story behind Colorwall - a marketplace for high-quality art prints and posters.",
};

const AboutPage = () => {
  return (
    <div>
      {/* Hero Section - Full Width with Gradient */}
      <section className="relative bg-gradient-to-br from-pink-50 via-white to-purple-50 py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(236,72,153,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(147,51,234,0.1),transparent_50%)]" />
        
        <div className="max-w-5xl mx-auto px-4 text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-pink-100 rounded-full text-pink-700 font-medium text-sm mb-8">
            <SparklesIcon className="size-4" />
            <span>Curated Art Marketplace</span>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-bold mb-8 bg-gradient-to-r from-gray-900 via-pink-800 to-purple-800 bg-clip-text text-transparent">
            Bringing Art to Your Walls
          </h1>
          
          <p className="text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Colorwall is where passionate artists meet discerning collectors. We believe that beautiful art should be accessible to everyone, and that every artist deserves a platform to share their vision with the world.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-black text-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl lg:text-5xl font-bold text-pink-400">500+</p>
              <p className="text-muted-foreground mt-2">Artists</p>
            </div>
            <div>
              <p className="text-4xl lg:text-5xl font-bold text-pink-400">10K+</p>
              <p className="text-muted-foreground mt-2">Art Prints</p>
            </div>
            <div>
              <p className="text-4xl lg:text-5xl font-bold text-pink-400">50+</p>
              <p className="text-muted-foreground mt-2">Countries</p>
            </div>
            <div>
              <p className="text-4xl lg:text-5xl font-bold text-pink-400">98%</p>
              <p className="text-muted-foreground mt-2">Happy Customers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">Our Story</h2>
              <div className="space-y-4 text-lg text-muted-foreground">
                <p>
                  We started Colorwall with a simple belief: <span className="text-foreground font-medium">everyone deserves to have beautiful art in their home or workspace</span>. But finding quality prints from independent artists shouldn&apos;t be complicated or expensive.
                </p>
                <p>
                  Too often, talented artists struggle to reach their audience, while art lovers settle for mass-produced prints that lack soul. We saw an opportunity to bridge this gap.
                </p>
                <p>
                  Today, Colorwall connects thousands of artists with art enthusiasts around the world. Every print on our platform is carefully curated and produced at the highest quality standards, ensuring your walls get the masterpiece they deserve.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-pink-200 to-purple-200 rounded-3xl" />
              <div className="absolute inset-4 bg-gradient-to-br from-pink-400 to-purple-400 rounded-2xl flex items-center justify-center">
                <PaletteIcon className="size-32 text-white opacity-50" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-neutral-50">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">Our Mission</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
            To democratize art by making high-quality prints accessible to everyone while empowering independent artists to build sustainable creative careers.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 bg-white rounded-2xl border shadow-sm">
              <div className="size-16 bg-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <GlobeIcon className="size-8 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Global Reach</h3>
              <p className="text-muted-foreground">
                Connecting artists and collectors across 50+ countries worldwide.
              </p>
            </div>
            
            <div className="p-8 bg-white rounded-2xl border shadow-sm">
              <div className="size-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <AwardIcon className="size-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Premium Quality</h3>
              <p className="text-muted-foreground">
                Museum-grade prints using archival inks and premium papers.
              </p>
            </div>
            
            <div className="p-8 bg-white rounded-2xl border shadow-sm">
              <div className="size-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <TruckIcon className="size-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Fast Delivery</h3>
              <p className="text-muted-foreground">
                Carefully packaged and shipped to your doorstep in days.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-center">What We Stand For</h2>
          <p className="text-xl text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            These core values guide everything we do at Colorwall.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-2 hover:border-pink-300 transition-colors">
              <CardHeader className="flex flex-row items-start gap-4">
                <div className="p-3 bg-pink-100 rounded-xl">
                  <PaletteIcon className="size-6 text-pink-600" />
                </div>
                <div>
                  <CardTitle className="text-xl">Artist-First Approach</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Artists keep 70% of every sale. We handle printing, packaging, shipping, and customer service so they can focus on creating. Our platform is designed to amplify artist voices, not diminish them.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-blue-300 transition-colors">
              <CardHeader className="flex flex-row items-start gap-4">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <ShieldCheckIcon className="size-6 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-xl">Uncompromising Quality</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Every print is produced using premium materials and museum-grade printing techniques. We require high-resolution uploads to ensure stunning results that last a lifetime.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-green-300 transition-colors">
              <CardHeader className="flex flex-row items-start gap-4">
                <div className="p-3 bg-green-100 rounded-xl">
                  <HeartIcon className="size-6 text-green-600" />
                </div>
                <div>
                  <CardTitle className="text-xl">Genuine Passion</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our team is made up of art lovers, collectors, and creators. We don&apos;t just sell art—we live it. Every curation decision is made with love and intention.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-purple-300 transition-colors">
              <CardHeader className="flex flex-row items-start gap-4">
                <div className="p-3 bg-purple-100 rounded-xl">
                  <UsersIcon className="size-6 text-purple-600" />
                </div>
                <div>
                  <CardTitle className="text-xl">Community Driven</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We&apos;re building more than a marketplace—we&apos;re fostering a community where artists and art lovers inspire each other. Your feedback shapes our platform.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-pink-400 to-purple-500">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to discover amazing art?
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Browse our curated collection of prints from talented artists around the world.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="bg-white text-black hover:bg-white/90 text-lg px-8">
              <Link href="/">
                Browse Shop
                <ArrowRightIcon className="ml-2 size-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8">
              <Link href="/sign-up">
                Become an Artist
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
