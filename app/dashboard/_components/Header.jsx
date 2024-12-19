import { Button } from '@/components/ui/button';
import { UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const Header = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [label, setLabel] = useState('Dashboard');
  const router = useRouter();

  const handleNavigate = (path, name) => {
    setLabel(name);
    setDropdownVisible(false);
    router.push(path);
  };

  return (
    <div className="p-1 px-5 flex items-center justify-between shadow-md">
      <div className="flex gap-3 items-center">
        <Image src="/logo.png" alt="logo" width={50} height={50} />
        <h2 className="font-bold text-md">Ai Short Video</h2>
      </div>
      <div className="flex gap-3 items-center relative">
        {/* Button hidden on md and larger screens */}
        <Button
          className="md:hidden"
          onClick={() => setDropdownVisible(!dropdownVisible)}
        >
          {label}
        </Button>
        {dropdownVisible && (
          <div className="absolute top-full right-0 mt-2 bg-white shadow-lg rounded w-48">
            <ul>
              <li>
                <button
                  className="block px-4 py-2 w-full text-left hover:bg-gray-200"
                  onClick={() => handleNavigate('/dashboard', 'Dashboard')}
                >
                  Dashboard
                </button>
              </li>
              <li>
                <button
                  className="block px-4 py-2 w-full text-left hover:bg-gray-200"
                  onClick={() => handleNavigate('/dashboard/create-new', 'Create Video')}
                >
                  Create Video
                </button>
              </li>
              <li>
                <button
                  className="block px-4 py-2 w-full text-left hover:bg-gray-200"
                  onClick={() => handleNavigate('/dashboard/image-generator', 'Create Image')}
                >
                  Create Image
                </button>
              </li>
            </ul>
          </div>
        )}
        <UserButton />
      </div>
    </div>
  );
};

export default Header;
