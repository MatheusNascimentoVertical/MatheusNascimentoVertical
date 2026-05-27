import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BrandTicker } from "@/components/brand/BrandTicker";

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <BrandTicker />
      <main className="pt-20 flex-1">{children}</main>
      <Footer />
    </>
  );
}
