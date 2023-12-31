import { menuItems } from "./PageWithSearch";
import {
  APPSTORE_URL,
  APP_NAME,
  PLAYSTORE_URL,
  SASSYWARES_URL,
} from "@/config";

export function Footer() {
  return (
    <footer className="hidden lg:block mt-20 p-content bg-tertiary-shade">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between container">
        {/* Copyright */}
        <div className="flex items-center sm:flex-row flex-col">
          <h2 className="flex-shrink-0">{APP_NAME}</h2>
          <p className="text-lg sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0">
            © {new Date().getFullYear()}{" "}
            <a
              target="_blank"
              className="fancy"
              href={SASSYWARES_URL}
              rel="noopener noreferrer"
            >
              Sassywares
            </a>
          </p>
        </div>
        {/* End Copyright */}
        {/* Nav Items */}
        <ul className="flex gap-content">
          {menuItems.map(({ label, href, className = "" }) => (
            <li key={label} className={`text-sm ${className}`}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline focus:underline"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      {/* End Header */}
      {/* End Nav Items */}
      {/* The following is hidden cuz it's not relevant yet, we don't have store listings */}
      {/* <div className="container p-content flex items-center sm:flex-row flex-col text-tertiary-contrast !hidden">
        <h2 className="flex-shrink-0">{APP_NAME}</h2>
        <p className="text-lg sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0">
          © {new Date().getFullYear()}{" "}
          <a
            target="_blank"
            className="fancy"
            href={SASSYWARES_URL}
            rel="noopener noreferrer"
          >
            Sassywares
          </a>
        </p>
        <span className="sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start hidden desktop:flex">
          <a
            target="_blank"
            href={PLAYSTORE_URL}
            rel="noopener noreferrer"
            className="ml-3 max-w-[200px] hover:scale-95 focus:scale-95 transition-transform"
          >
            <img
              src="/get-play-store.png"
              alt="Download on Play Store"
              className="w-full h-auto object-contain"
            />
          </a>
          <a
            target="_blank"
            href={APPSTORE_URL}
            rel="noopener noreferrer"
            className="ml-3 max-w-[200px] hover:scale-95 focus:scale-95 transition-transform"
          >
            <img
              src="/get-app-store.png"
              alt="Download on App Store"
              className="w-full h-auto object-contain"
            />
          </a>
        </span>
      </div> */}
    </footer>
  );
}
