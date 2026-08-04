import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  User,
  Search,
  ChevronDown,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { Crown } from "lucide-react";

import { ShoppingBag } from "lucide-react";
function Navbar() {
  const navigate = useNavigate();

  const { cart } = useCart();

  const [showMenu, setShowMenu] = useState(false);

  const [search, setSearch] = useState("");

  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const isLoggedIn =
    localStorage.getItem("isLoggedIn") === "true";

  const userName =
    localStorage.getItem("userName");

  const userRole =
    localStorage.getItem("userRole");

  function handleLogout() {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("adminLoggedIn");
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRole");

    navigate("/");

    window.location.reload();
  }

  function handleSearch(e) {

  if (e.key === "Enter") {

    if (search.trim() === "") return;

    navigate(`/search?q=${encodeURIComponent(search)}`);

  }

}

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">

      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

        {/* Logo */}
        <Link
    to="/"
    className="flex items-center gap-4 group"
>

    <div
        className="w-14 h-14 rounded-full
        border-2 border-yellow-500
        bg-gradient-to-br
        from-black
        via-gray-900
        to-black
        flex
        items-center
        justify-center
        shadow-xl
        group-hover:rotate-12
        transition"
    >

        <Crown
            size={28}
            className="text-yellow-400"
            strokeWidth={2.2}
        />

    </div>

    <div>

        <h1
            className="logo-title
            text-4xl
            font-bold
            leading-none"
        >

            <span className="text-yellow-500">
                <span class="heading1">B</span>
    <span class="heading1">R</span>
    <span class="heading1">Y</span>
   
            </span>

            <span className="text-black">
               <span class="heading1">N</span>
    <span class="heading1">O</span>
            </span>

        </h1>

        <p
            className="logo-subtitle
            text-[10px]
            text-gray-500
            uppercase"
        >
Discover. Compare. Save
        </p>

    </div>

</Link>
        {/* Search */}
        <div className="hidden md:flex items-center w-1/3">

          <div className="relative w-full">

            <input
  type="text"
  placeholder="Search products or categories..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  onKeyDown={handleSearch}
  className="w-full border rounded-lg py-2 pl-10 pr-4"
/>

           <Search
  size={18}
  className="absolute left-3 top-3 text-gray-500 cursor-pointer"
  onClick={() => {

    if (search.trim() !== "") {

      navigate(`/search?q=${encodeURIComponent(search)}`);

    }

  }}
/>

          </div>

        </div>

        {/* Right Side */}
        <div className="flex items-center gap-6">

          <Link
            to="/"
            className="hover:text-blue-600"
          >
            Home
          </Link>

          <Link
            to="/wishlist"
            className="hover:text-blue-600"
          >
            Wishlist
          </Link>

          {/* Cart */}
          <Link
            to="/cart"
            className="relative"
          >
            <ShoppingCart size={26} />

            {totalItems > 0 && (

              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">

                {totalItems}

              </span>

            )}

          </Link>

          {/* Login / User Menu */}

          {!isLoggedIn ? (

            <Link
              to="/login"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            >
              Login
            </Link>

          ) : (

            <div className="relative">

              <button
                onClick={() => setShowMenu(!showMenu)}
                className="flex items-center gap-2"
              >

                <User size={24} />

                <span className="font-semibold">
                  {userName}
                </span>

                <ChevronDown size={18} />

              </button>

              {showMenu && (

                <div className="absolute right-0 mt-3 w-56 bg-white rounded-lg shadow-lg border overflow-hidden">

                  <Link
                    to="/profile"
                    className="block px-4 py-3 hover:bg-gray-100"
                    onClick={() => setShowMenu(false)}
                  >
                    👤 My Profile
                  </Link>

                  <Link
                    to="/wishlist"
                    className="block px-4 py-3 hover:bg-gray-100"
                    onClick={() => setShowMenu(false)}
                  >
                    ❤️ Wishlist
                  </Link>

                  <Link
                    to="/my-orders"
                    className="block px-4 py-3 hover:bg-gray-100"
                    onClick={() => setShowMenu(false)}
                  >
                    📦 My Orders
                  </Link>

                  {userRole === "admin" && (

                    <Link
                      to="/admin"
                      className="block px-4 py-3 hover:bg-gray-100"
                      onClick={() => setShowMenu(false)}
                    >
                      ⚙ Admin Panel
                    </Link>

                  )}

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50"
                  >
                    🚪 Logout
                  </button>

                </div>

              )}

            </div>

          )}

        </div>

      </div>

    </nav>
  );
}

export default Navbar;