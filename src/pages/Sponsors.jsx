import Navbar from "../components/navbar";
import Footer from "../components/footer";
import SponsorHeader from "../components/SponsorHeader";
import ImpactStats from "../components/ImpactStats";
import SponsorshipTiers from "../components/SponsorshipTiers";
import Partnerships from "../components/Partnerships";
import SponsorCTA from "../components/SponsorCTA";

function Sponsors() {
  return (
    <>
      <Navbar />
      <main>
        <SponsorHeader />
        <ImpactStats />
        <SponsorshipTiers />
        <Partnerships />
        <SponsorCTA />
      </main>
      <Footer />
    </>
  );
}

export default Sponsors;