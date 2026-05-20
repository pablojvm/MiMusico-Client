import IdentificationBanner from "../components/IdentificationBanner";

function IdentificationPage() {
  return (
    <section id="primerIdentification" className="identification-section">
      <div className="identification-overlay">
        <h1 className="identification-headline">
          Compra y vende instrumentos de segunda mano o contrata al mejor
          grupo para tu próxima ocasión.
        </h1>
        <p className="identification-subheadline">
          Únete a la comunidad MiMusico y dale banda sonora a tu vida.
        </p>
      </div>
      <div className="identification-form-wrapper">
        <IdentificationBanner />
      </div>
    </section>
  );
}

export default IdentificationPage;
