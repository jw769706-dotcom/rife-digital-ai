function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#080808]">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Logo */}
          <div>
            <h2 className="text-2xl font-bold text-yellow-500">
              Rife Digital AI
            </h2>

            <p className="mt-4 text-sm leading-7 text-gray-400">
              Bangun produk digital, buat konten promosi, dan kembangkan
              bisnismu lebih cepat dengan bantuan Artificial Intelligence.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">
              Product
            </h3>

            <ul className="space-y-3 text-gray-400">
              <li>
                <a href="#features" className="hover:text-yellow-500 transition">
                  Features
                </a>
              </li>

              <li>
                <a href="#pricing" className="hover:text-yellow-500 transition">
                  Pricing
                </a>
              </li>

              <li>
                <a href="#faq" className="hover:text-yellow-500 transition">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">
              Company
            </h3>

            <ul className="space-y-3 text-gray-400">
              <li>
                <a href="#" className="hover:text-yellow-500 transition">
                  About Us
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-yellow-500 transition">
                  Contact
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-yellow-500 transition">
                  Privacy Policy
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-yellow-500 transition">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">
              Contact
            </h3>

            <ul className="space-y-3 text-gray-400">
              <li>Email: ttputrasatu@gmail.com</li>
              <li>WhatsApp: 082335952469</li>
              <li>Indonesia</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Rife Digital AI. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;