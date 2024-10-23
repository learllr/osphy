import React from "react";

export default function Footer() {
  return (
    <footer
      className="text-white px-36 text-sm bg-zinc-900"
    >
      <div className="flex justify-between items-center p-11">
        <div className="flex space-x-4 text-gray-400">
          {/* Facebook */}
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/icons/facebook.svg"
              alt="Facebook"
              className="w-8 h-8 hover:opacity-75"
            />
          </a>

          {/* Instagram */}
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/icons/instagram.svg"
              alt="Instagram"
              className="w-8 h-8 hover:opacity-75"
            />
          </a>

          {/* TikTok */}
          <a
            href="https://www.tiktok.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/icons/tiktok.svg"
              alt="TikTok"
              className="w-8 h-8 hover:opacity-75"
            />
          </a>
        </div>

        <div className="flex space-x-4 text-gray-400">
          <p className="text-sm text-white">
            © 2024 OsteoLog. Tous droits réservés.
          </p>
          <a href="/mentions-legales" className="hover:underline">
            Mentions légales
          </a>
          <a href="/politique-de-confidentialite" className="hover:underline">
            Politique de confidentialité
          </a>
          <a href="/cookies" className="hover:underline">
            Gestion des cookies
          </a>
        </div>
      </div>
    </footer>
  );
}