"use client";

import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button"; // Import ShadCN Button
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { cn } from "@/lib/utils"; // If you want to add custom utilities with ShadCN

export default function Home() {
  const { user } = useUser();
  const router = useRouter(); // Initialize the router

  useEffect(() => {
    if (user) {
      // Redirect to the dashboard if the user is signed in
      router.push("/dashboard");
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#6a3aec] to-[#8338ec] text-white">
      {/* Hero Section */}
      <header className="w-full py-20 text-center">
        <h1 className="text-6xl font-extrabold tracking-tight mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#ff7c7c] to-[#ff9c00]">
          AI Video Generator
        </h1>
        <p className="text-lg mb-8 opacity-90">
          Create stunning videos in seconds with AI. Let's start your creative journey now!
        </p>

        {/* Conditional Rendering based on User Authentication */}
        <div>
          {!user && (
            <div className="flex justify-center gap-6 mt-6">
              <Button
                onClick={() => {
                  // Navigate to the sign-in page
                  router.push("/sign-in");
                }}
                className={cn(
                  "bg-white text-[#6a3aec] py-3 px-8 rounded-lg shadow-lg transition-all duration-500 ease-in-out transform hover:bg-[#6a3aec] hover:text-white hover:scale-105"
                )}
              >
                Sign In
              </Button>
              <Button
                onClick={() => {
                  // Navigate to the sign-up page
                  router.push("/sign-up");
                }}
                className={cn(
                  "bg-white text-[#8338ec] py-3 px-8 rounded-lg shadow-lg transition-all duration-500 ease-in-out transform hover:bg-[#8338ec] hover:text-white hover:scale-105"
                )}
              >
                Sign Up
              </Button>
            </div>
          )}
        </div>
      </header>

      {/* About Section */}
      <section className="py-20 bg-white text-black">
        <div className="max-w-screen-xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-semibold text-[#6a3aec] mb-6">About AI Video Generator</h2>
          <p className="text-lg mb-8">
            The AI Video Generator leverages advanced AI technology to create stunning videos in just seconds. Whether you're creating a promotional video, tutorial, or social media content, our tool gives you fast and customizable options to bring your vision to life effortlessly.
          </p>
          <p className="text-lg mb-8">
            Powered by cutting-edge AI, our platform continuously improves video quality and editing options, ensuring that you can create personalized, impactful videos without any technical expertise.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white text-black">
        <div className="max-w-screen-xl mx-auto px-6">
          <h2 className="text-4xl font-semibold text-center mb-12 text-[#6a3aec]">
            Why Choose AI Video Generator?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center transition-all duration-300 ease-in-out hover:scale-105 hover:text-[#6a3aec]">
              <Image
                src="/logo1.jpeg"
                alt="Feature 1"
                width={200} // Increased image size
                height={200} // Increased image size
                className="mx-auto mb-6 transform hover:rotate-12"
              />
              <h3 className="text-2xl font-semibold mb-3">Fast Video Generation</h3>
              <p>
                Generate high-quality videos in just a few seconds using AI technology.
              </p>
            </div>
            <div className="text-center transition-all duration-300 ease-in-out hover:scale-105 hover:text-[#6a3aec]">
              <Image
                src="/logo2.jpeg"
                alt="Feature 2"
                width={200} // Increased image size
                height={200} // Increased image size
                className="mx-auto mb-6 transform hover:rotate-12"
              />
              <h3 className="text-2xl font-semibold mb-3">Customizable Options</h3>
              <p>
                Choose video length, style, and content to create the perfect video for your needs.
              </p>
            </div>
            <div className="text-center transition-all duration-300 ease-in-out hover:scale-105 hover:text-[#6a3aec]">
              <Image
                src="/logo3.jpeg"
                alt="Feature 3"
                width={200} // Increased image size
                height={200} // Increased image size
                className="mx-auto mb-6 transform hover:rotate-12"
              />
              <h3 className="text-2xl font-semibold mb-3">AI-Driven Creativity</h3>
              <p>
                Let AI suggest creative elements and ideas for your videos to enhance their impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 text-center bg-[#6a3aec] text-white">
        <h2 className="text-4xl font-semibold mb-6">Start Creating Videos Now!</h2>
        <p className="text-xl mb-8 opacity-90">
          Experience the future of video creation. Sign up and get started today.
        </p>
        <div>
          <Button
            onClick={() => {
              router.push("/sign-up");
            }}
            className={cn(
              "bg-white text-[#6a3aec] py-3 px-8 rounded-lg shadow-xl transition-all duration-500 ease-in-out transform hover:bg-[#6a3aec] hover:text-white hover:scale-105"
            )}
          >
            Get Started
          </Button>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="py-10 text-center bg-[#8338ec] text-white">
        <p className="text-sm opacity-80">&copy; 2024 AI Video Generator. All rights reserved.</p>
      </footer>
    </div>
  );
}
