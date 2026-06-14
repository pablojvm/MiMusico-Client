import IdentificationBanner from "../components/IdentificationBanner";

function IdentificationPage() {
  return (
    <section className="identification-section page-fade">
      <div className="identification-overlay">
        <span className="identification-eyebrow">Únete a MiMusico</span>
        <h1 className="identification-headline">
          Compra, vende y <em>contrata</em> música en un solo lugar.
        </h1>
        <p className="identification-subheadline">
          Conecta con músicos y compradores de toda España. Crear cuenta es
          gratis y solo te lleva un minuto.
        </p>
      </div>
      <div className="identification-form-wrapper">
        <IdentificationBanner />
      </div>
    </section>
  );
}

export default IdentificationPage;
