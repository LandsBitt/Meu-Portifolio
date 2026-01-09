import "./globals.css";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata = {
  title: "Roland Bittencourt | Desenvolvedor & Técnico em TI",
  description:
    "Portfólio de Roland dos Santos - Desenvolvedor Front-End e Back-End, especialista em montagem e manutenção de computadores.",
  keywords: [
    "portfólio",
    "desenvolvimento web",
    "HTML",
    "CSS",
    "JavaScript",
    "Java",
    "Python",
    "manutenção de computadores",
    "Roland",
  ],
  authors: [{ name: "Roland dos Santos" }],
  icons: {
    icon: "/Imagens/Icon.png",
    shortcut: "/Imagens/Icon.png",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br" className={poppins.variable}>
      <head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
        />
        <link
          rel="stylesheet"
          href="https://unpkg.com/aos@2.3.1/dist/aos.css"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
        />
        <link rel="preload" href="/Imagens/Perfil.png" as="image" />
      </head>
      <body>
        <div id="particles-js" aria-hidden="true"></div>
        {children}
      </body>
    </html>
  );
}
