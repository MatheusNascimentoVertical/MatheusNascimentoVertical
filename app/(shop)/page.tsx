import { HeroCopa } from "@/components/hero/HeroCopa";
import { CategoriesGrid } from "@/components/sections/CategoriesGrid";
import { BestSellers } from "@/components/sections/BestSellers";
import { CopaSection } from "@/components/sections/CopaSection";
import { AtacadoBanner } from "@/components/sections/AtacadoBanner";
import { LojaFisica } from "@/components/sections/LojaFisica";

export default function HomePage() {
  return (
    <>
      <HeroCopa />
      <CategoriesGrid />
      <BestSellers />
      <CopaSection />
      <AtacadoBanner />
      <LojaFisica />
    </>
  );
}
