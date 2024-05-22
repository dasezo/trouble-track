import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface FAQProps {
  question: string;
  answer: string;
  value: string;
}

const FAQList: FAQProps[] = [
  {
    question: 'Is this Serivce free?',
    answer:
      'Yes. It is a free as a prerealase for now, we will have paid offers soon.',
    value: 'item-1',
  },
  {
    question: 'How does the tracking system work?',
    answer:
      "well, it's like a doctor job, we put something inside your websites which will gives us informations that you need.",
    value: 'item-2',
  },
  {
    question: 'Can I use this service for my personal website?',
    answer:
      'For sure, you have the ability to add many projects, feel free to add any of your websites you want to track.',
    value: 'item-3',
  },
];

export const FAQ = () => {
  return (
    <section id="faq" className="container py-24 sm:py-32">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Frequently Asked <span className="text-blue-500">Questions</span>
      </h2>

      <Accordion type="single" collapsible className="w-full AccordionRoot">
        {FAQList.map(({ question, answer, value }: FAQProps) => (
          <AccordionItem key={value} value={value}>
            <AccordionTrigger className="text-left">
              {question}
            </AccordionTrigger>

            <AccordionContent>{answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};
