'use client';

import { Heart, Sparkles, ShieldCheck } from 'lucide-react';
import { useTranslation } from '@/i18n';

export function WhyChooseUsSection() {
  const { t } = useTranslation();

  return (
    <section className="bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            {t('home.whyChooseUs')} 💎
          </h2>
          <p className="text-muted-foreground text-lg">
            {t('home.yourBeautyOurPassion')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="group text-center p-8 rounded-2xl bg-card border-2 border-border hover:border-primary hover:shadow-xl transition-all duration-300">
            <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <Heart className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-semibold text-xl mb-2">{t('home.premiumQuality')}</h3>
            <p className="text-muted-foreground">
              {t('home.premiumQualityDesc')}
            </p>
          </div>

          <div className="group text-center p-8 rounded-2xl bg-card border-2 border-border hover:border-primary hover:shadow-xl transition-all duration-300">
            <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-semibold text-xl mb-2">{t('home.expertSelection')}</h3>
            <p className="text-muted-foreground">
              {t('home.expertSelectionDesc')}
            </p>
          </div>

          <div className="group text-center p-8 rounded-2xl bg-card border-2 border-border hover:border-primary hover:shadow-xl transition-all duration-300">
            <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <ShieldCheck className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-semibold text-xl mb-2">{t('home.customerCare')}</h3>
            <p className="text-muted-foreground">
              {t('home.customerCareDesc')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
