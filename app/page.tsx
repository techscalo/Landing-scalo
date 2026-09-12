import { redirect } from "next/navigation";

// A/B test: cada visita a "/" cae aleatoriamente en la landing A o B.
// force-dynamic evita el prerender para que el sorteo sea por request.
export const dynamic = "force-dynamic";

export default function Home() {
  redirect(Math.random() < 0.5 ? "/a" : "/b");
}
