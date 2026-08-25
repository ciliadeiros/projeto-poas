import "./styles/base.css";
import { AuthProvider } from "@/context/AuthContext";

export const metadata = {
  title: "GameLog",
  description:
    "GameLog - organize, avalie e acompanhe sua biblioteca de jogos.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
