'use client'
import { SignIn } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  return (
    <div className="h-screen bg-gradient-to-r from-purple-500 to-blue-500 flex flex-col justify-center items-center py-16 overflow-hidden">
      <div className="max-w-4xl w-full bg-white p-8 rounded-lg shadow-lg flex flex-col md:flex-row">
        {/* Image Section */}
        <div className="w-full md:w-1/2 flex justify-center items-center mb-8 md:mb-0">
          <Image
            className="w-full object-contain rounded-lg"
            src={"/login.png"} // Your login image
            alt="Login"
            width={800}
            height={900}
          />
        </div>

        {/* SignIn Section */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center">
          <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">
            Sign In to Your Account
          </h2>

          {/* SignIn Component */}
          <SignIn />

          {/* Redirect Button */}
          <div className="mt-6">
            
              <button onClick={()=> router.push('/')} className="text-blue-500 hover:text-blue-700 text-lg font-semibold">
                Back to Homepage
              </button>
            
          </div>
        </div>
      </div>
    </div>
  );
}
