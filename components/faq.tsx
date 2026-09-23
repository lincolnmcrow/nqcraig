"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function Faq({ items }: { items: readonly (readonly [string, string])[] }) {
  return (
    <Accordion className="border-t border-white/10" multiple>
      {items.map(([question, answer], index) => (
        <AccordionItem key={question} value={`item-${index}`} className="border-white/10">
          <AccordionTrigger className="py-6 text-left text-lg font-bold hover:no-underline sm:text-xl">
            {question}
          </AccordionTrigger>
          <AccordionContent className="max-w-3xl pb-7 text-base leading-7 text-[#aebfdd]">
            {answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
