'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from '@/i18n';
import { Mail, Sparkles } from 'lucide-react';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate newsletter signup
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: `💄 ${t('newsletter.successTitle')}`,
      description: t('newsletter.successDesc'),
    });

    setEmail('');
    setLoading(false);
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-accent to-primary p-1">
      <div className="relative rounded-xl bg-background p-8 md:p-12">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-primary/10 blur-2xl" />
        <div className="absolute bottom-0 left-0 -mb-4 -ml-4 h-32 w-32 rounded-full bg-accent/10 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-2xl text-center">
          <div className="mb-4 inline-flex items-center justify-center rounded-full bg-primary/10 p-3">
            <Mail className="h-6 w-6 text-primary" />
          </div>

          <h2 className="mb-3 text-3xl md:text-4xl font-bold">
            {t('newsletter.title')} 💅
          </h2>

          <p className="mb-6 text-muted-foreground text-lg">
            {t('newsletter.subtitle')}{' '}
            {t('newsletter.discount')} <span className="font-semibold text-primary">{t('newsletter.discountAmount')}</span> {t('newsletter.discountSuffix')}
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <div className="relative flex-1">
              <Input
                type="email"
                placeholder={t('newsletter.placeholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 pr-4"
              />
            </div>
            <Button
              type="submit"
              size="lg"
              disabled={loading}
              className="h-12 px-8 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
            >
              {loading ? (
                t('newsletter.subscribing')
              ) : (
                <>
                  {t('newsletter.subscribe')} <Sparkles className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          <p className="mt-4 text-xs text-muted-foreground">
            ✨ {t('newsletter.noSpam')}
          </p>
        </div>
      </div>
    </div>
  );
}
