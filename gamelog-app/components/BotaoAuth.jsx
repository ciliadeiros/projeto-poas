import Link from "next/link";
import styles from "./BotaoAuth.module.css";

/**
 * Botão de autenticação reutilizável (login/cadastro), usado nas telas
 * "cad" e "pagina-inicial". Também não veio no zip exportado do Figma.
 *
 * - text: texto do botão
 * - href: se passado, renderiza como <Link> (navegação)
 * - type: se "submit", renderiza como <button type="submit"> (útil dentro de forms)
 * - onClick: handler opcional
 * - className / divClassName: mantidos para bater com os nomes que o
 *   Figma já gerava (className no wrapper, divClassName no texto interno)
 */
export function BotaoAuth({
  text = "ENTRAR",
  href,
  type = "button",
  onClick,
  disabled = false,
  className = "",
  divClassName = "",
}) {
  const content = <span className={`${styles.texto} ${divClassName}`}>{text}</span>;

  if (href) {
    return (
      <Link href={href} className={`${styles.botao} ${className}`}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${styles.botao} ${className}`}
    >
      {content}
    </button>
  );
}
