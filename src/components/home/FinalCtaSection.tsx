'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/i18n';

export function FinalCtaSection() {
  const { t } = useTranslation();

  return (
    <section className="bg-gradient-to-r from-primary via-accent to-primary py-16">
      <div className="container mx-auto px-4 text-center text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          {t('home.readyToGlow')} ✨
        </h2>
        <p className="text-xl mb-8 opacity-90">
          {t('home.startYourJourney')}
        </p>
        <Button size="lg" variant="secondary" asChild className="h-14 px-8 text-lg">
          <Link href="/products">
            {t('home.exploreAllProducts')}
          </Link>
        </Button>
      </div>
    </section>
  );
}
