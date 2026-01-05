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
  description: "An online art marketplace built to empower artists and connect them with art lovers around the world.",
};

const AboutPage = () => {
  return (
    <div>
      {/* Hero Section - Pastel Background */}
      <section className="relative bg-white py-24">
        <div className="max-w-5xl mx-auto px-4 text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-pink-100 border border-pink-200 rounded-full text-pink-700 font-medium text-sm mb-8">
            <SparklesIcon className="size-4" />
            <span>Empowering Artists Worldwide</span>
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-bold mb-8 text-black">
            About Us
          </h1>
          
          <p className="text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We are an online art marketplace built to empower artists and connect them with art lovers around the world. Our platform is a space where creativity is valued, originality is celebrated, and artists can confidently showcase and sell their work.
          </p>
        </div>
      </section>

      {/* Stats Section - Pastel Background */}
      <section className="py-16 bg-neutral-100 border-y">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl lg:text-5xl font-bold text-black">500+</p>
              <p className="text-muted-foreground mt-2">Artists</p>
            </div>
            <div>
              <p className="text-4xl lg:text-5xl font-bold text-black">10K+</p>
              <p className="text-muted-foreground mt-2">Art Prints</p>
            </div>
            <div>
              <p className="text-4xl lg:text-5xl font-bold text-black">50+</p>
              <p className="text-muted-foreground mt-2">Countries</p>
            </div>
            <div>
              <p className="text-4xl lg:text-5xl font-bold text-black">98%</p>
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
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">Our Belief</h2>
              <div className="space-y-4 text-lg text-muted-foreground">
                <p>
                  We believe <span className="text-foreground font-medium">every artist deserves visibility and fair opportunities</span>. Whether you are an emerging creator or an established professional, our platform helps you reach a global audience—without the traditional barriers of galleries or middlemen.
                </p>
                <p>
                  We support a wide range of artistic expressions, creating a space where talent can thrive and connect directly with those who appreciate it.
                </p>
                <p>
                  For collectors and buyers, we offer a curated selection of authentic artworks sourced directly from artists. Every purchase supports independent talent, creative passion, and sustainable art practices.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <Card className="overflow-hidden border-2">
                <div className="aspect-square bg-pink-50 flex items-center justify-center">
                  <PaletteIcon className="size-32 text-pink-300" strokeWidth={1.5} />
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-white border-y">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">Our Mission</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
            To democratize art by making high-quality prints accessible to everyone while empowering independent artists to build sustainable creative careers.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="size-16 bg-pink-100 border-2 border-pink-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <GlobeIcon className="size-8 text-pink-600" strokeWidth={2} />
                </div>
                <CardTitle className="text-xl">All India Reach</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Connecting artists and collectors across every corner of India.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="size-16 bg-blue-100 border-2 border-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <AwardIcon className="size-8 text-blue-600" strokeWidth={2} />
                </div>
                <CardTitle className="text-xl">Premium Quality</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  High-quality prints crafted with care using premium materials.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="size-16 bg-green-100 border-2 border-green-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <TruckIcon className="size-8 text-green-600" strokeWidth={2} />
                </div>
                <CardTitle className="text-xl">Fast Delivery</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Carefully packaged and shipped to your doorstep in days.
                </p>
              </CardContent>
            </Card>
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
            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="p-3 bg-pink-100 border-2 border-pink-200 rounded-xl">
                  <PaletteIcon className="size-6 text-pink-600" strokeWidth={2} />
                </div>
                <div>
                  <CardTitle className="text-xl">Artist-First Approach</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We handle the logistics so artists can focus on creating. Our platform is designed to amplify artist voices, not diminish them, giving creators the visibility they deserve.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="p-3 bg-blue-100 border-2 border-blue-200 rounded-xl">
                  <ShieldCheckIcon className="size-6 text-blue-600" strokeWidth={2} />
                </div>
                <div>
                  <CardTitle className="text-xl">Uncompromising Quality</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Every print is produced using premium materials and quality printing techniques. We require high-resolution uploads to ensure stunning results that last a lifetime.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="p-3 bg-green-100 border-2 border-green-200 rounded-xl">
                  <HeartIcon className="size-6 text-green-600" strokeWidth={2} />
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

            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="p-3 bg-purple-100 border-2 border-purple-200 rounded-xl">
                  <UsersIcon className="size-6 text-purple-600" strokeWidth={2} />
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

      {/* CTA Section - Pastel Pink Background */}
      <section className="py-24 bg-pink-50 border-y">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-black mb-6">
            Ready to discover amazing art?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Browse our curated collection of prints from talented artists around the world.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-pink-400 border-2 border-black text-black hover:bg-pink-500 text-lg px-8">
              <Link href="/">
                Browse Shop
                <ArrowRightIcon className="ml-2 size-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-2 border-black hover:bg-black hover:text-white text-lg px-8">
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
