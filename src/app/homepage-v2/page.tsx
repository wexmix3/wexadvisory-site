import { Archivo, Outfit, JetBrains_Mono } from "next/font/google";
import ScrollcraftPage from "./ScrollcraftPage";

const archivo = Archivo({ subsets: ["latin"], weight: ["500", "600", "700"] });
const outfit = Outfit({ subsets: ["latin"], weight: ["400", "500", "600"] });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"] });

export default function Page() {
  return (
    <ScrollcraftPage
      displayFont={archivo.style.fontFamily}
      textFont={outfit.style.fontFamily}
      monoFont={mono.style.fontFamily}
    />
  );
}
