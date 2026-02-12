'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Star, ShieldCheck, Truck } from 'lucide-react';
import { useTranslation } from '@/i18n';

export function HeroSection() {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 dark:from-rose-950 dark:via-pink-950 dark:to-purple-950">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -ml-48 -mb-48" />

      <div className="container relative z-10 mx-auto px-4 py-16 md:py-24">
        <div className="mx-auto max-w-4xl text-center space-y-8">
          {/* Announcement Badge */}
          <div className="animate-bounce">
            <Badge className="bg-gradient-to-r from-primary to-accent text-white border-0 px-4 py-2 text-sm">
              ✨ {t('home.newCollection')}
            </Badge>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight">
            {t('home.heroTitle')}
            <span className="block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              {t('home.heroTitleHighlight')} ✨
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t('home.heroSubtitle')} 💄
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button size="lg" asChild className="text-lg h-14 px-8 bg-gradient-to-r from-primary to-accent hover:opacity-90">
              <Link href="/products">
                <Sparkles className="mr-2 h-5 w-5" />
                {t('home.shopNow')}
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-lg h-14 px-8 border-2">
              <Link href="#categories">
                {t('home.browseCategories')}
              </Link>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-6 pt-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
              <span>4.9/5 {t('home.rating')}</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-green-500" />
              <span>{t('home.verifiedProducts')}</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-primary" />
              <span>{t('home.freeShippingOver')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" className="w-full h-12 md:h-20 fill-background">
          <path d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
        </svg>
      </div>
    </section>
  );
}
