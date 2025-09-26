export default function Footer() {
  return (
    <footer id="contact" className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          {/* Brand */}
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-6">
            TutorSnap
          </h2>
          
          {/* Contact */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Kontakt</h3>
            <div className="flex items-center justify-center space-x-2 text-lg">
              <span className="text-2xl">📞</span>
              <a href="tel:530421473" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">
                530 421 473
              </a>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-800 pt-8">
            <p className="text-gray-400">
              © 2024 TutorSnap. Wszystkie prawa zastrzeżone.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
