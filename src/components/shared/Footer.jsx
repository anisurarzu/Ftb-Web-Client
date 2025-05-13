import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="bg-gray-900 text-white">
      {/* Top Section */}
      <footer className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 py-12 px-6">
        {/* Discover Section */}
        <div>
          <h6 className="text-lg font-semibold mb-4">Discover</h6>
          <ul className="space-y-2">
            <li>
              <Link href="#" className="text-gray-400 hover:text-teal-400">
                Home
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-400 hover:text-teal-400">
                Terms
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-400 hover:text-teal-400">
                Talent & Culture
              </Link>
            </li>
          </ul>
        </div>

        {/* Policies Section */}
        <div>
          <h6 className="text-lg font-semibold mb-4">Policies</h6>
          <ul className="space-y-2">
            <li>
              <Link href="#" className="text-gray-400 hover:text-teal-400">
                Refund Policy
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-400 hover:text-teal-400">
                EMI Policy
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-400 hover:text-teal-400">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Payment Methods Section */}
        <div>
          <h6 className="text-lg font-semibold mb-4">Payment Methods</h6>
          <div className="flex items-center gap-4">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
              alt="Visa"
              className="w-12 h-auto"
            />
            {/* Add other payment method icons here */}
          </div>
        </div>

        {/* Contact Section */}
        <div>
          <h6 className="text-lg font-semibold mb-4">Need Help?</h6>
          <p className="text-sm text-gray-400 mb-4">
            We’re here for you 24/7. Reach out to us through Messenger or call
            anytime, day or night, for the support you need.
          </p>
          <div className="space-y-2">
            <p className="text-sm text-gray-400">
              {`Experience Center:
N.H.A Building No- 09, Kolatoli, Cox's Bazar-4700.`}
            </p>
            <p className="text-sm text-gray-400">
              Email: fasttrackbookingbd@gmail.com
            </p>
            <p className="text-sm text-gray-400">Phone: +880 1811-822421</p>
          </div>
        </div>
      </footer>

      {/* Bottom Section */}
      <footer className="bg-gray-800 py-6 px-6">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
          {/* Copyright */}
          <div className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Fast Track Booking BD. All rights
            reserved.
          </div>

          {/* Social Media */}
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-teal-400">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-teal-400">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
