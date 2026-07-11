import { site } from "@/data/portfolio";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink px-5 py-8 text-white/45 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm">
          © {new Date().getFullYear()} {site.name}
        </p>
        <p className="text-sm">Built with Next.js</p>
      </div>
    </footer>
  );
}
