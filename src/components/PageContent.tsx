import { PropsWithChildren } from "react";
import { IonContent } from "@ionic/react";
import { menuItems } from "./PageWithSearch";
import { APPSTORE_URL, PLAYSTORE_URL, SASSYWARES_URL } from "@/config";

type Props = PropsWithChildren<{ className?: string }>;

export function PageContent({ children, ...props }: Props) {
  return (
    <IonContent {...props} fullscreen>
      {children}
      <footer className="hidden lg:block mt-20 p-content bg-tertiary-shade">
        {/* Nav Items */}
        <ul className="flex p-content gap-content container">
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
        {/* End Nav Items */}
        <div className="container p-content flex items-center sm:flex-row flex-col text-tertiary-contrast">
          <h2 className="flex-shrink-0">Grape! 🍇</h2>
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
        </div>
      </footer>
    </IonContent>
  );
}
