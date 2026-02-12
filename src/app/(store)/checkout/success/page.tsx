import { SuccessContent } from '@/components/checkout/SuccessContent';

interface SuccessPageProps {
  searchParams: Promise<{
    order?: string;
  }>;
}

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const params = await searchParams;
  const orderId = params.order;

  return <SuccessContent orderId={orderId} />;
}
