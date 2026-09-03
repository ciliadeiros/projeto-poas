import styles from "./Logo.module.css";

/**
 * Logo oficial do GameLog — usa o arquivo public/images/logo.png.
 * (O componente antes desenhava "GAME"/"LOG" em texto porque esse PNG
 * não tinha vindo no primeiro zip enviado; agora que ele está na
 * pasta public/images, a logo de verdade entra no lugar do texto.)
 */
export function Logo({ className = "" }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/images/logo.png"
      alt="GameLog"
      className={`${styles.logo} ${className}`}
    />
  );
}

export function LogoGamelog({ className = "" }) {
  return <Logo className={className} />;
}
