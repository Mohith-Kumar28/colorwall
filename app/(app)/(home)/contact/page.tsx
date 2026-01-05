"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MailIcon, MapPinIcon, ClockIcon, Loader2Icon } from "lucide-react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      toast.success("Message sent successfully! We'll get back to you soon.");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl lg:text-5xl font-bold mb-6">
          Get in Touch
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Have a question about your order, interested in selling your art, or just want to say hello? We&apos;d love to hear from you.
        </p>
      </div>

      {/* Main Content - Two Column Layout */}
      <div className="grid lg:grid-cols-2 gap-8 mb-16">
        {/* Left Column - Contact Info */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
          
          <Card className="border-2">
            <CardHeader className="flex flex-row items-center gap-4 pb-4">
              <div className="p-3 bg-pink-100 border-2 border-pink-200 rounded-xl">
                <MailIcon className="size-6 text-pink-600" strokeWidth={2} />
              </div>
              <div>
                <CardTitle className="text-lg">Email Us</CardTitle>
                <p className="text-sm text-muted-foreground">For general inquiries</p>
              </div>
            </CardHeader>
            <CardContent>
              <a 
                href="mailto:hello@colorwall.in" 
                className="text-pink-600 hover:underline font-medium"
              >
                hello@colorwall.in
              </a>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader className="flex flex-row items-center gap-4 pb-4">
              <div className="p-3 bg-blue-100 border-2 border-blue-200 rounded-xl">
                <ClockIcon className="size-6 text-blue-600" strokeWidth={2} />
              </div>
              <div>
                <CardTitle className="text-lg">Support Hours</CardTitle>
                <p className="text-sm text-muted-foreground">We&apos;re here to help</p>
              </div>
            </CardHeader>
            <CardContent>
              <p className="font-medium">Monday - Friday</p>
              <p className="text-muted-foreground">9:00 AM - 6:00 PM IST</p>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader className="flex flex-row items-center gap-4 pb-4">
              <div className="p-3 bg-green-100 border-2 border-green-200 rounded-xl">
                <MapPinIcon className="size-6 text-green-600" strokeWidth={2} />
              </div>
              <div>
                <CardTitle className="text-lg">Location</CardTitle>
                <p className="text-sm text-muted-foreground">Our headquarters</p>
              </div>
            </CardHeader>
            <CardContent>
              <p className="font-medium">Kochi, India</p>
            
            </CardContent>
          </Card>
        </div>


        {/* Right Column - Contact Form */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="text-2xl">Send us a message</CardTitle>
            <p className="text-muted-foreground">
              Fill out the form below and we&apos;ll get back to you within 24 hours.
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Name *
                  </label>
                  <Input 
                    id="name" 
                    placeholder="Your name"
                    className="border-2"
                    value={formData.name}
                    onChange={handleChange}
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email *
                  </label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="you@example.com"
                    className="border-2"
                    value={formData.email}
                    onChange={handleChange}
                    required 
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">
                  Subject *
                </label>
                <Input 
                  id="subject" 
                  placeholder="How can we help?"
                  className="border-2"
                  value={formData.subject}
                  onChange={handleChange}
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message *
                </label>
                <Textarea 
                  id="message" 
                  placeholder="Tell us more about your inquiry..."
                  className="border-2"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  required 
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-pink-400 border-2 border-black text-black hover:bg-pink-500"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2Icon className="size-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* FAQ Section - Compact Grid */}
      <div className="border-t pt-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Common Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-base">How do I track my order?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                You&apos;ll receive a tracking link via email once your order ships.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-base">Can I sell my art on Colorwall?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Yes! Sign up as a seller and start uploading your artwork today.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-base">What&apos;s your return policy?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                We offer a 30-day money-back guarantee on all prints. If you&apos;re not satisfied, we&apos;ll make it right.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-base">Do you ship across India?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Yes, we ship to all locations across India. Shipping costs and delivery times vary by location.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
