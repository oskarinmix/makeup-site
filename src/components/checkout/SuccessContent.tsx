'use client';

import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useTranslation } from '@/i18n';

interface SuccessContentProps {
  orderId?: string;
}

export function SuccessContent({ orderId }: SuccessContentProps) {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardContent className="p-12 text-center space-y-6">
            <div className="flex justify-center">
              <div className="rounded-full bg-green-100 p-6">
                <CheckCircle className="h-16 w-16 text-green-600" />
              </div>
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl font-bold">{t('success.title')}</h1>
              <p className="text-muted-foreground">
                {t('success.thankYou')}
              </p>
            </div>

            {orderId && (
              <div className="bg-muted rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-1">{t('success.orderId')}</p>
                <p className="font-mono font-semibold">{orderId}</p>
              </div>
            )}

            <div className="space-y-4 pt-6">
              <p className="text-sm text-muted-foreground">
                {t('success.verificationNote')}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild>
                  <Link href="/products">{t('cart.continueShopping')}</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/">{t('success.backToHome')}</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
