import { Layout } from '@/components/layout/Layout';

export default function LayoutCore({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Layout>{children}</Layout>;
}
