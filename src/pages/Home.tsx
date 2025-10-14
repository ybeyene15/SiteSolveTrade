import { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Approach from '../components/Approach';
import Benefits from '../components/Benefits';
import CTA from '../components/CTA';
import QuoteForm from '../components/QuoteForm';

interface HomeProps {
  setQuoteFormTrigger: (trigger: (() => void) | null) => void;
}

export default function Home({ setQuoteFormTrigger }: HomeProps) {
  const [isQuoteFormOpen, setIsQuoteFormOpen] = useState(false);

  useEffect(() => {
    setQuoteFormTrigger(() => () => setIsQuoteFormOpen(true));
    return () => setQuoteFormTrigger(null);
  }, [setQuoteFormTrigger]);

  return (
    <>
      <Hero onGetQuote={() => setIsQuoteFormOpen(true)} />
      <Services />
      <Approach />
      <Benefits />
      <CTA onGetQuote={() => setIsQuoteFormOpen(true)} />
      <QuoteForm isOpen={isQuoteFormOpen} onClose={() => setIsQuoteFormOpen(false)} />
    </>
  );
}
