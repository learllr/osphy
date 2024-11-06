import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";
import { Separator } from "@/components/ui/separator";

const sections = [
  {
    title: "Outil pour ostéopathes",
    links: [
      { name: "Aperçu", href: "#" },
      { name: "Tarification", href: "#" },
      { name: "Fonctionnalités", href: "#" },
    ],
  },
  {
    title: "Entreprise",
    links: [
      { name: "À propos", href: "#" },
      { name: "Équipe", href: "#" },
    ],
  },
  {
    title: "Ressources",
    links: [
      { name: "FAQ", href: "#" },
      { name: "Contact", href: "/contact" },
    ],
  },
];

export default function Footer() {
  return (
    <section className="py-6 bg-white text-gray-800">
      <div className="container mx-auto max-w-6xl px-4">
        <footer className="text-center md:text-left">
          <Separator className="my-14 mx-auto max-w-xs md:max-w-full" />
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {sections.map((section, sectionIdx) => (
              <div key={sectionIdx} className="flex flex-col items-center">
                <h3 className="mb-4 font-bold text-lg text-gray-900">
                  {section.title}
                </h3>
                <ul className="space-y-4 text-gray-600">
                  {section.links.map((link, linkIdx) => (
                    <li
                      key={linkIdx}
                      className="font-medium hover:text-primary transition-colors duration-200 text-center"
                    >
                      <a href={link.href}>{link.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="flex flex-col items-center">
              {" "}
              <h3 className="mb-4 font-bold text-lg text-gray-900">Légal</h3>
              <ul className="space-y-4 text-gray-600 text-center">
                <li className="font-medium hover:text-primary transition-colors duration-200">
                  <a href="#">Conditions d'utilisation</a>
                </li>
                <li className="font-medium hover:text-primary transition-colors duration-200">
                  <a href="#">Politique de confidentialité</a>
                </li>
              </ul>
            </div>
          </div>
          <ul className="flex justify-center items-center space-x-6 text-gray-600 mt-8">
            <li className="text-primary hover:text-primary/80">
              <a href="#">
                <FaFacebook className="w-6 h-6" />
              </a>
            </li>
            <li className="text-primary hover:text-primary/80">
              <a href="#">
                <FaInstagram className="w-6 h-6" />
              </a>
            </li>
            <li className="text-primary hover:text-primary/80">
              <a href="#">
                <FaTiktok className="w-6 h-6" />
              </a>
            </li>
          </ul>
          <Separator className="my-14 mx-auto max-w-xs md:max-w-full" />
          <p className="text-sm text-gray-500">
            © 2024 Osteolog. Tous droits réservés.
          </p>
        </footer>
      </div>
    </section>
  );
}
