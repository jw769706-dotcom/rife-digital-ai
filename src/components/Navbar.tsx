function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <h1 className="text-xl font-bold text-white">
          Rife <span className="text-yellow-500">Digital AI</span>
        </h1>

        <nav className="hidden gap-8 text-sm text-gray-300 md:flex">
          <a href="#">Features</a>
          <a href="#">Pricing</a>
          <a href="#">FAQ</a>
        </nav>

        <button className="rounded-lg bg-yellow-500 px-5 py-2 font-semibold text-black transition hover:bg-yellow-400">
          Login
        </button>
      </div>
    </header>
  );
}

export default Navbar;