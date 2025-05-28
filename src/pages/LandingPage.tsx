
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Lock, Calendar, Star, Sparkles, Mail, Users, Shield, Zap, Heart, Clock, Camera, FileText, Paintbrush, Share2, Globe, Gift } from "lucide-react";

const LandingPage = () => {
  const features = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Notifications",
      description: "Get notified when your time capsule is ready to open, bringing joy to your future self."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Privacy Control",
      description: "Keep your memories private or share them with the world. You're in complete control."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Share & Connect",
      description: "Share your unlocked capsules with friends and family, creating connections across time."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Instant Creation",
      description: "Create capsules in seconds with our intuitive interface and powerful tools."
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Public Gallery",
      description: "Explore public capsules from around the world and get inspired by others' stories."
    },
    {
      icon: <Gift className="w-6 h-6" />,
      title: "Surprise Yourself",
      description: "Rediscover forgotten moments and see how much you've grown over time."
    }
  ];

  const contentTypes = [
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Text Messages",
      description: "Write letters to your future self, capture thoughts, dreams, and goals."
    },
    {
      icon: <Camera className="w-8 h-8" />,
      title: "Photos & Images",
      description: "Upload pictures, screenshots, or any visual memories you want to preserve."
    },
    {
      icon: <Paintbrush className="w-8 h-8" />,
      title: "Digital Drawings",
      description: "Create artwork, sketches, or doodles using our built-in drawing canvas."
    }
  ];

  const useCases = [
    {
      title: "Personal Growth",
      description: "Track your journey and see how your perspectives change over time.",
      badge: "Self-Reflection"
    },
    {
      title: "Special Occasions",
      description: "Save birthday wishes, anniversary messages, or holiday memories.",
      badge: "Celebrations"
    },
    {
      title: "Goal Setting",
      description: "Write down your aspirations and open them when you've achieved them.",
      badge: "Achievement"
    },
    {
      title: "Time Travel",
      description: "Send messages from today to specific dates in the future.",
      badge: "Future Self"
    },
    {
      title: "Memory Preservation",
      description: "Keep important moments safe and rediscover them years later.",
      badge: "Nostalgia"
    },
    {
      title: "Surprise Gifts",
      description: "Create surprise messages for friends and family to open later.",
      badge: "Friendship"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative px-4 py-20 sm:px-6 lg:px-8 overflow-hidden">
        {/* Floating decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-4 h-4 bg-lavender-300 rounded-full animate-float opacity-60"></div>
          <div className="absolute top-40 right-20 w-3 h-3 bg-peach-300 rounded-full animate-float delay-1000 opacity-60"></div>
          <div className="absolute bottom-40 left-20 w-5 h-5 bg-skyblue-300 rounded-full animate-float delay-2000 opacity-60"></div>
          <Star className="absolute top-32 right-40 w-6 h-6 text-lavender-400 animate-sparkle delay-500" />
          <Sparkles className="absolute bottom-60 right-10 w-5 h-5 text-peach-400 animate-sparkle delay-1500" />
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <Badge variant="outline" className="mb-4 border-lavender-300 text-lavender-700">
            ✨ Create Digital Time Capsules
          </Badge>
          
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-800 mb-6 animate-fade-in-up">
            Lock Away Today,
            <br />
            <span className="bg-gradient-to-r from-lavender-600 to-skyblue-600 bg-clip-text text-transparent">
              Rediscover Tomorrow
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl text-slate-600 mb-8 max-w-2xl mx-auto animate-fade-in-up delay-200">
            Create beautiful digital time capsules filled with your thoughts, photos, and drawings. 
            Lock them away and let time work its magic. Experience the joy of rediscovering your past self.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fade-in-up delay-400">
            <Button 
              asChild 
              size="lg"
              className="bg-gradient-to-r from-lavender-500 to-skyblue-500 hover:from-lavender-600 hover:to-skyblue-600 text-white px-8 py-3 text-lg font-medium"
            >
              <Link to="/create" className="flex items-center gap-2">
                <Lock className="w-5 h-5" />
                Create Your Capsule
              </Link>
            </Button>
            
            <Button 
              asChild 
              variant="outline" 
              size="lg"
              className="border-lavender-300 text-lavender-700 hover:bg-lavender-50 px-8 py-3 text-lg"
            >
              <Link to="/gallery">Explore Gallery</Link>
            </Button>
          </div>

          {/* Visual Walkthrough */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto animate-fade-in-up delay-600">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-lavender-400 to-lavender-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-float">
                <Lock className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-slate-800 mb-2">Create</h3>
              <p className="text-slate-600">Write a message, upload a photo, or draw something special</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-skyblue-400 to-skyblue-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-float delay-1000">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-slate-800 mb-2">Lock</h3>
              <p className="text-slate-600">Choose when your capsule unlocks - days, months, or years from now</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-peach-400 to-peach-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-float delay-2000">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-slate-800 mb-2">Rediscover</h3>
              <p className="text-slate-600">Receive a magical notification when your memory is ready to open</p>
            </div>
          </div>
        </div>
      </section>

      {/* Content Types Section */}
      <section className="px-4 py-16 sm:px-6 lg:px-8 bg-gradient-to-br from-lavender-50 to-skyblue-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl font-bold text-slate-800 mb-4">
              Multiple Ways to Capture Memories
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Express yourself through different mediums and create rich, meaningful time capsules
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contentTypes.map((type, index) => (
              <Card key={index} className="border-lavender-200 hover:shadow-lg transition-all duration-300 bg-white/80">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-lavender-100 to-peach-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="text-lavender-600">
                      {type.icon}
                    </div>
                  </div>
                  <CardTitle className="text-xl">{type.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 text-center">{type.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-16 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl font-bold text-slate-800 mb-4">
              Why Choose Lock The Day?
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Powerful features designed to make your time capsule experience magical and secure
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-lavender-200 hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-lavender-100 to-skyblue-100 rounded-lg flex items-center justify-center">
                        <div className="text-lavender-600">
                          {feature.icon}
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-serif text-lg font-semibold mb-2">{feature.title}</h3>
                      <p className="text-slate-600 text-sm">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="px-4 py-16 sm:px-6 lg:px-8 bg-gradient-to-br from-peach-50 to-lavender-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl font-bold text-slate-800 mb-4">
              Perfect for Every Moment
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Whether it's personal growth, special occasions, or future planning - there's a perfect use case for everyone
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((useCase, index) => (
              <Card key={index} className="border-lavender-200 hover:shadow-lg transition-all duration-300 bg-white/80">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{useCase.title}</CardTitle>
                    <Badge variant="secondary" className="bg-lavender-100 text-lavender-700">
                      {useCase.badge}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-600">
                    {useCase.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-4 py-16 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl font-bold text-slate-800 mb-4">
              Join Thousands of Time Travelers
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-lavender-600 mb-2">10K+</div>
              <div className="text-slate-600">Capsules Created</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-skyblue-600 mb-2">5K+</div>
              <div className="text-slate-600">Happy Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-peach-600 mb-2">2K+</div>
              <div className="text-slate-600">Capsules Unlocked</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-lavender-600 mb-2">500+</div>
              <div className="text-slate-600">Memories Shared</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="px-4 py-16 sm:px-6 lg:px-8 bg-gradient-to-br from-skyblue-50 to-lavender-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl font-bold text-slate-800 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-slate-600">
              Creating your time capsule is simple and intuitive
            </p>
          </div>
          
          <div className="space-y-8">
            <div className="flex items-center space-x-6">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-lavender-500 to-lavender-600 rounded-full flex items-center justify-center text-white font-bold">
                1
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">Sign Up & Get Started</h3>
                <p className="text-slate-600">Create your free account in seconds and start your time travel journey.</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-skyblue-500 to-skyblue-600 rounded-full flex items-center justify-center text-white font-bold">
                2
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">Create Your Capsule</h3>
                <p className="text-slate-600">Add text, photos, or drawings. Choose whether to keep it private or share with the world.</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-peach-500 to-peach-600 rounded-full flex items-center justify-center text-white font-bold">
                3
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">Set Your Unlock Date</h3>
                <p className="text-slate-600">Choose when you want to rediscover your memory - from tomorrow to decades in the future.</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-lavender-500 to-peach-500 rounded-full flex items-center justify-center text-white font-bold">
                4
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">Receive & Rediscover</h3>
                <p className="text-slate-600">Get notified when your capsule unlocks and experience the magic of rediscovering your past.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-16 sm:px-6 lg:px-8 bg-gradient-to-br from-lavender-600 via-skyblue-600 to-peach-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-3xl font-bold mb-6">
            Start Your Time Journey Today
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Your future self is waiting to rediscover the beautiful moments you create today. 
            What memory will you lock away? Join thousands of time travelers already on this magical journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild 
              size="lg"
              className="bg-white text-lavender-700 hover:bg-gray-50 px-10 py-4 text-lg font-medium"
            >
              <Link to="/create" className="flex items-center gap-2">
                <Star className="w-5 h-5" />
                Create My First Capsule
              </Link>
            </Button>
            <Button 
              asChild 
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-lavender-700 px-10 py-4 text-lg font-medium"
            >
              <Link to="/gallery" className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Explore Gallery
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
