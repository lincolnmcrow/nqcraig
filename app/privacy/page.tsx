import { LegalPage, LegalSection } from "@/components/legal-page";

export default function PrivacyNotice() {
  return <LegalPage title="Privacy notice" intro="How application and testimonial information is handled.">
    <LegalSection title="Information collected"><p>The mentorship application collects your name, email, Discord username, experience, goals, challenges, reason for applying, and required acknowledgments. The testimonial form collects your display name, private verification contact, optional experience label, testimonial, and publication permissions.</p></LegalSection>
    <LegalSection title="How information is used"><p>Application information is used to review program fit and contact you through Discord or email. Testimonial information is used to verify, review, and—only with permission—prepare a student story for possible publication.</p></LegalSection>
    <LegalSection title="Private delivery"><p>Submissions are sent through a server-side endpoint and an email delivery provider to a private inbox controlled by nqcraig. Provider credentials and the destination address are not exposed publicly.</p></LegalSection>
    <LegalSection title="Sharing and Discord"><p>Application and direct mentorship information is treated as confidential and is not published without permission. Community activity on Discord is subject to Discord&apos;s own terms and privacy practices, and nqcraig cannot guarantee the conduct of every group participant.</p></LegalSection>
    <LegalSection title="Retention and updates"><p>nqcraig should retain personal information only as long as reasonably necessary for the stated purpose, legal obligations, and dispute prevention. A specific retention schedule and privacy contact details require confirmation from the business before public launch. Once confirmed, requests to access, correct, or delete information should use those contact details.</p></LegalSection>
  </LegalPage>;
}
