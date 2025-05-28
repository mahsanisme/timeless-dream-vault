
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Star, Heart, Clock, Lock, Sparkles, Mail } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      {/* Floating decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <Star className="absolute top-20 right-10 w-4 h-4 text-lavender-400 animate-sparkle" />
        <Sparkles className="absolute top-40 left-20 w-5 h-5 text-peach-400 animate-sparkle delay-1000" />
        <div className="absolute bottom-40 right-40 w-3 h-3 bg-skyblue-300 rounded-full animate-float delay-2000 opacity-60"></div>
        <Heart className="absolute top-60 right-20 w-4 h-4 text-peach-300 animate-float delay-500" />
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-slate-800 mb-6">
            About Lock The Day
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            In our fast-paced digital world, meaningful moments often slip by unnoticed. 
            Lock The Day helps you capture, preserve, and rediscover the beauty of today for tomorrow.
          </p>
        </div>

        {/* Story Section */}
        <Card className="border-lavender-200 mb-8">
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <Clock className="w-12 h-12 text-lavender-500 mx-auto mb-4" />
              <h2 className="font-serif text-2xl font-semibold text-slate-800">The Story Behind the Magic</h2>
            </div>
            <div className="prose prose-slate max-w-none space-y-4 text-slate-700">
              <p>
                Imagine finding a letter you wrote to yourself years ago, or rediscovering a photo that brings back 
                flooding memories of a perfect day you'd almost forgotten. There's something magical about time - 
                how it transforms ordinary moments into precious treasures.
              </p>
              <p>
                Lock The Day was born from the simple yet profound idea that our present selves have gifts to give 
                our future selves. By intentionally capturing and time-locking our thoughts, photos, and creative 
                expressions, we create bridges across time that connect who we are today with who we'll become.
              </p>
              <p>
                Every capsule you create is a love letter to your future self - a reminder of dreams, hopes, 
                silly moments, and profound realizations that deserve to be remembered and celebrated.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* How It Works Timeline */}
        <div className="mb-12">
          <h2 className="font-serif text-2xl font-semibold text-center text-slate-800 mb-8">How It Works</h2>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-lavender-400 to-lavender-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold">1</span>
              </div>
              <div>
                <h3 className="font-serif text-xl font-semibold text-slate-800 mb-2">Capture Your Moment</h3>
                <p className="text-slate-600">
                  Write a heartfelt message, upload a meaningful photo, or create a drawing that represents this moment in your life. 
                  Let your creativity flow and capture what matters most to you right now.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-skyblue-400 to-skyblue-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold">2</span>
              </div>
              <div>
                <h3 className="font-serif text-xl font-semibold text-slate-800 mb-2">Choose Your Journey</h3>
                <p className="text-slate-600">
                  Select when you'd like your capsule to unlock - in a month, a year, or even a decade. 
                  Decide if you want to keep it private or share it with the world when it opens.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-peach-400 to-peach-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold">3</span>
              </div>
              <div>
                <h3 className="font-serif text-xl font-semibold text-slate-800 mb-2">Experience the Magic</h3>
                <p className="text-slate-600">
                  When your unlock date arrives, you'll receive a gentle notification. Open your capsule to rediscover 
                  your past self and experience the joy of time-delayed reflection.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Card className="border-lavender-200">
            <CardContent className="p-6 text-center">
              <Mail className="w-10 h-10 text-lavender-500 mx-auto mb-4" />
              <h3 className="font-serif text-lg font-semibold mb-2">Email Notifications</h3>
              <p className="text-slate-600 text-sm">
                Receive beautiful email reminders when your time capsules are ready to open, 
                bringing unexpected joy to ordinary days.
              </p>
            </CardContent>
          </Card>

          <Card className="border-lavender-200">
            <CardContent className="p-6 text-center">
              <Lock className="w-10 h-10 text-skyblue-500 mx-auto mb-4" />
              <h3 className="font-serif text-lg font-semibold mb-2">Privacy Control</h3>
              <p className="text-slate-600 text-sm">
                Your memories are yours to control. Keep them private or share them publicly - 
                you decide who gets to witness your journey through time.
              </p>
            </CardContent>
          </Card>

          <Card className="border-lavender-200">
            <CardContent className="p-6 text-center">
              <Heart className="w-10 h-10 text-peach-500 mx-auto mb-4" />
              <h3 className="font-serif text-lg font-semibold mb-2">Emotional Connection</h3>
              <p className="text-slate-600 text-sm">
                More than just storage - Lock The Day creates meaningful connections between 
                your past, present, and future selves.
              </p>
            </CardContent>
          </Card>

          <Card className="border-lavender-200">
            <CardContent className="p-6 text-center">
              <Sparkles className="w-10 h-10 text-lavender-500 mx-auto mb-4" />
              <h3 className="font-serif text-lg font-semibold mb-2">Beautiful Experience</h3>
              <p className="text-slate-600 text-sm">
                Every interaction is designed to feel magical, from creating your capsule to 
                the moment of unlock and rediscovery.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-br from-lavender-50 to-peach-50 rounded-2xl p-8">
          <h2 className="font-serif text-2xl font-semibold text-slate-800 mb-4">
            Start Your Time Journey
          </h2>
          <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
            Your future self is waiting. What moment from today would you like to rediscover tomorrow?
          </p>
          <Button 
            asChild 
            size="lg"
            className="bg-gradient-to-r from-lavender-500 to-peach-500 hover:from-lavender-600 hover:to-peach-600 text-white px-8 py-3"
          >
            <Link to="/create" className="flex items-center gap-2">
              <Star className="w-5 h-5" />
              Create Your First Capsule
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default About;
