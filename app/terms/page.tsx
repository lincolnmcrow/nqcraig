import { LegalPage, LegalSection } from "@/components/legal-page";

export default function Terms() {
  return <LegalPage title="Mentorship terms" intro="The basic conditions for using this site and participating in the program.">
    <LegalSection title="Education only"><p>The website and mentorship provide education only. They do not provide personalized financial advice, investment advice, tax advice, or legal advice.</p></LegalSection>
    <LegalSection title="No brokerage or account management"><p>nqcraig does not act as a brokerage through this website, execute orders for you, hold customer funds, or manage your account. You remain responsible for every trading decision.</p></LegalSection>
    <LegalSection title="Program access"><p>The program is presented as lifetime access to the mentorship and community, subject to program terms, community rules, platform availability, appropriate conduct, and the continued operation of the program. “Lifetime” does not mean the lifetime of an individual participant or guarantee that any third-party service will operate forever.</p></LegalSection>
    <LegalSection title="Community conduct and confidentiality"><p>Members are expected to treat others respectfully and protect confidential community information. nqcraig may restrict participation for conduct that harms the group, but cannot guarantee another member&apos;s conduct or the privacy of third-party platforms.</p></LegalSection>
    <LegalSection title="Business details and review"><p>The business&apos;s legal identity, jurisdiction, formal contact information, payment terms, refund policy, and any registration disclosures must be confirmed from actual business records and reviewed by qualified counsel before these terms are used for a public commercial launch.</p></LegalSection>
  </LegalPage>;
}
