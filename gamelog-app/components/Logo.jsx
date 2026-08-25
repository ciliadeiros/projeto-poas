import styles from "./Logo.module.css";

/**
 * Logo em texto do GameLog (GAME + LOG em destaque).
 * O export do Figma original usava uma imagem (image.png) que não
 * veio no zip — troquei por um logo em texto/CSS para não depender
 * de um arquivo que falta. Se vocês tiverem o PNG/SVG oficial da
 * marca, podem trocar o conteúdo deste componente por um <Image />
 * apontando pra ele.
 */
export function Logo({ className = "" }) {
  return (
    <div className={`${styles.logo} ${className}`}>
      <span className={styles.game}>GAME</span>
      <span className={styles.log}>LOG</span>
    </div>
  );
}

export function LogoGamelog({ className = "" }) {
  return <Logo className={className} />;
}
