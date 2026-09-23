import { LegalPage, LegalSection } from "@/components/legal-page";

export default function RiskDisclosure() {
  return <LegalPage title="Risk disclosure" intro="Read this before applying for or participating in the mentorship.">
    <LegalSection title="Substantial risk of loss"><p>Futures and commodity trading involves substantial risk of loss and is not suitable for everyone. You can lose some or all of the money committed to trading, and leverage can magnify losses.</p></LegalSection>
    <LegalSection title="Education, not advice"><p>nqcraig provides education and mentorship. Nothing on this website or in the program is personalized financial, investment, tax, or legal advice. Craig does not execute trades, manage student accounts, or act as a brokerage through this website.</p></LegalSection>
    <LegalSection title="No promises"><p>No outcome, income, profitability, or lifestyle result is guaranteed. Every trader&apos;s circumstances, decisions, risk tolerance, capital, and results differ.</p></LegalSection>
    <LegalSection title="Past results and testimonials"><p>Past results are not necessarily indicative of future results. Testimonials describe individual experiences and are not indicative of future performance or success. Any compensated or incentivized testimonial must be identified before publication.</p></LegalSection>
    <LegalSection title="Your responsibility"><p>You are responsible for your own trading decisions and for deciding whether futures trading is appropriate for you. Consider obtaining independent professional advice before risking capital.</p></LegalSection>
  </LegalPage>;
}
