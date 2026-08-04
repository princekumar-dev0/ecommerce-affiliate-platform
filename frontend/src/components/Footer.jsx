import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaGithub,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Logo */}
          <div>
            <h2 className="text-3xl font-bold text-orange-500">
              ShopHub
            </h2>

            <p className="mt-4 text-gray-400">
              Discover the best products from trusted online stores.
              Compare prices and shop smarter.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">
              Quick Links
            </h3>

            <ul className="space-y-3">
              <li>
                <a href="/" className="hover:text-orange-500">
                  Home
                </a>
              </li>

              <li>
                <a href="/" className="hover:text-orange-500">
                  Products
                </a>
              </li>

              <li>
                <a href="/" className="hover:text-orange-500">
                  Categories
                </a>
              </li>

              <li>
                <a href="/" className="hover:text-orange-500">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">
              Categories
            </h3>

            <ul className="space-y-3">
              <li>Electronics</li>
              <li>Fashion</li>
              <li>Gaming</li>
              <li>Books</li>
              <li>Home & Kitchen</li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">
              Follow Us
            </h3>

            <div className="flex gap-5 text-2xl">

              <a href="#">
                <FaFacebook className="hover:text-blue-500" />
              </a>

              <a href="#">
                <FaInstagram className="hover:text-pink-500" />
              </a>

              <a href="#">
                <FaTwitter className="hover:text-sky-500" />
              </a>

              <a href="#">
                <FaGithub className="hover:text-white" />
              </a>

            </div>
          </div>

        </div>

        <hr className="my-8 border-gray-700" />

        <div className="text-center text-gray-500">
          © {new Date().getFullYear()} ShopHub. All Rights Reserved.
        </div>

      </div>
    </footer>
  );
}

export default Footer;