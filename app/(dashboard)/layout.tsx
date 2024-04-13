import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Nav } from "@/components/nav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <Nav />
      <div className="flex grow justify-center">{children}</div>
      <Footer />
    </div>
  );
}
