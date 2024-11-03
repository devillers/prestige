// components/Footer.js
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white  mt-1 pt-10 pb-20">
      <div className="container mx-auto px-4 opacity-50">
        <div className="flex justify-between items-center flex-wrap">
          {/* Footer Navigation */}
          <div className="w-full sm:w-auto mb-6 sm:mb-0">
            <nav className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6">
              <Link href="/" className="">
                Accueil
              </Link>

              <Link href="/#about" className="text-white">
                A propos
              </Link>

              <Link href="/#prestations" className="text-white">
                Prestations
              </Link>

              {/* <Link href="/#tarifs" className="text-white">
                Tarifs
              </Link> */}
              <Link href="/#contact" className="text-white">
                Contact
              </Link>
            </nav>
          </div>

          {/* Social Media Links */}
          <div className="w-full sm:w-auto flex space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.75 2h8.5A5.25 5.25 0 0121.5 7.25v8.5A5.25 5.25 0 0116.25 21h-8.5A5.25 5.25 0 012.5 15.75v-8.5A5.25 5.25 0 017.75 2zm7.75 5.25a.75.75 0 100 1.5.75.75 0 000-1.5zM12 8.75A3.25 3.25 0 1112 15.25 3.25 3.25 0 0112 8.75z"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
