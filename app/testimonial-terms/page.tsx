import { LegalPage, LegalSection } from "@/components/legal-page";

export default function TestimonialTerms() {
  return <LegalPage title="Testimonial terms" intro="What happens when a student shares an experience.">
    <LegalSection title="Honest experience"><p>By submitting, you confirm that the testimonial reflects your honest experience and that any factual statement is accurate to the best of your knowledge.</p></LegalSection>
    <LegalSection title="Your permission choices"><p>You choose whether nqcraig has permission to review the testimonial, display your selected name, and edit for length or clarity without changing the meaning. A submission is never published automatically.</p></LegalSection>
    <LegalSection title="Review and verification"><p>nqcraig may contact you privately to verify the submission, request clarification, accept it, edit it within your permission, or decline to publish it. Submission does not guarantee publication.</p></LegalSection>
    <LegalSection title="Performance context"><p>A published testimonial must explain that an individual experience is not indicative of future performance or success. Profit claims, selective results, or unverifiable figures may be declined or removed.</p></LegalSection>
    <LegalSection title="Compensation"><p>If a testimonial is paid, discounted, rewarded, or otherwise incentivized, that relationship must be disclosed clearly when the testimonial appears.</p></LegalSection>
  </LegalPage>;
}
