import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MailIcon, MapPinIcon, ClockIcon } from "lucide-react";

export const metadata = {
  title: "Contact | Colorwall",
  description: "Get in touch with the Colorwall team. We're here to help with any questions about art, orders, or becoming an artist.",
};

const ContactPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl lg:text-5xl font-bold mb-6">
          Get in Touch
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Have a question about your order, interested in selling your art, or just want to say hello? We&apos;d love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        {/* Contact Info Cards */}
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto p-3 bg-pink-100 rounded-full w-fit mb-2">
              <MailIcon className="size-6 text-pink-600" />
            </div>
            <CardTitle className="text-lg">Email Us</CardTitle>
            <CardDescription>For general inquiries</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <a 
              href="mailto:hello@colorwall.art" 
              className="text-pink-600 hover:underline font-medium"
            >
              hello@colorwall.art
            </a>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto p-3 bg-blue-100 rounded-full w-fit mb-2">
              <ClockIcon className="size-6 text-blue-600" />
            </div>
            <CardTitle className="text-lg">Support Hours</CardTitle>
            <CardDescription>We&apos;re here to help</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="font-medium">Mon - Fri</p>
            <p className="text-muted-foreground">9:00 AM - 6:00 PM IST</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto p-3 bg-green-100 rounded-full w-fit mb-2">
              <MapPinIcon className="size-6 text-green-600" />
            </div>
            <CardTitle className="text-lg">Location</CardTitle>
            <CardDescription>Our headquarters</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="font-medium">Bangalore, India</p>
            <p className="text-muted-foreground">Remote-first team</p>
          </CardContent>
        </Card>
      </div>

      {/* Contact Form */}
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Send us a message</CardTitle>
          <CardDescription>
            Fill out the form below and we&apos;ll get back to you within 24 hours.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Name
                </label>
                <Input 
                  id="name" 
                  placeholder="Your name" 
                  required 
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="you@example.com" 
                  required 
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="subject" className="text-sm font-medium">
                Subject
              </label>
              <Input 
                id="subject" 
                placeholder="How can we help?" 
                required 
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">
                Message
              </label>
              <Textarea 
                id="message" 
                placeholder="Tell us more about your inquiry..." 
                rows={5}
                required 
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-pink-400 text-black hover:bg-pink-500"
            >
              Send Message
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* FAQ Section */}
      <div className="mt-16 text-center">
        <h2 className="text-2xl font-semibold mb-4">Common Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left max-w-2xl mx-auto">
          <div>
            <h3 className="font-medium mb-2">How do I track my order?</h3>
            <p className="text-sm text-muted-foreground">
              You&apos;ll receive a tracking link via email once your order ships.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Can I sell my art on Colorwall?</h3>
            <p className="text-sm text-muted-foreground">
              Yes! Sign up as a seller and start uploading your artwork today.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">What&apos;s your return policy?</h3>
            <p className="text-sm text-muted-foreground">
              We offer a 30-day money-back guarantee on all prints.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Do you ship internationally?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, we ship to most countries worldwide.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
