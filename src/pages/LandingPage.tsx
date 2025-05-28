
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Lock, Calendar, Star, Sparkles, Mail, Users } from "lucide-react";

const LandingPage = () => {
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
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-800 mb-6 animate-fade-in-up">
            Lock Away Today,
            <br />
            <span className="bg-gradient-to-r from-lavender-600 to-skyblue-600 bg-clip-text text-transparent">
              Rediscover Tomorrow
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl text-slate-600 mb-8 max-w-2xl mx-auto animate-fade-in-up delay-200">
            Create beautiful digital time capsules filled with your thoughts, photos, and drawings. 
            Lock them away and let time work its magic.
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
              <Link to="/gallery">View Gallery</Link>
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
              <h3 className="font-serif text-xl font-semibold text-slate-800 mb-2">Open</h3>
              <p className="text-slate-600">Receive a magical notification when your memory is ready to rediscover</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-16 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-3xl font-bold text-center text-slate-800 mb-12">
            Why Lock The Day?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-lavender-200 hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6 text-center">
                <Mail className="w-12 h-12 text-lavender-500 mx-auto mb-4" />
                <h3 className="font-serif text-xl font-semibold mb-3">Email Notifications</h3>
                <p className="text-slate-600">Get notified when your time capsule is ready to open, bringing joy to your future self.</p>
              </CardContent>
            </Card>
            
            <Card className="border-lavender-200 hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6 text-center">
                <Lock className="w-12 h-12 text-skyblue-500 mx-auto mb-4" />
                <h3 className="font-serif text-xl font-semibold mb-3">Privacy Control</h3>
                <p className="text-slate-600">Keep your memories private or share them with the world. You're in complete control.</p>
              </CardContent>
            </Card>
            
            <Card className="border-lavender-200 hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6 text-center">
                <Users className="w-12 h-12 text-peach-500 mx-auto mb-4" />
                <h3 className="font-serif text-xl font-semibold mb-3">Share & Connect</h3>
                <p className="text-slate-600">Share your unlocked capsules with friends and family, creating connections across time.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-3xl font-bold text-slate-800 mb-6">
            Start Your Time Journey Today
          </h2>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
            Your future self is waiting to rediscover the beautiful moments you create today. 
            What memory will you lock away?
          </p>
          <Button 
            asChild 
            size="lg"
            className="bg-gradient-to-r from-lavender-500 to-peach-500 hover:from-lavender-600 hover:to-peach-600 text-white px-10 py-4 text-lg font-medium"
          >
            <Link to="/create" className="flex items-center gap-2">
              <Star className="w-5 h-5" />
              Create My First Capsule
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
