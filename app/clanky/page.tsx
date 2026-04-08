import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Články | PHMarket",
  description:
    "Články a novinky ze světa pohonných hmot, čerpacích stanic a úspor při tankování.",
};

export default function ArticlesPage() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-dark">Články</h1>
        <div className="mt-12 rounded-2xl bg-gray-50 border-2 border-dashed border-gray-300 py-20 px-8">
          <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
          </svg>
          <p className="text-xl font-semibold text-gray-400">Připravujeme</p>
          <p className="mt-2 text-gray-400">
            Články a novinky budou brzy k dispozici.
          </p>
        </div>
      </div>
    </section>
  );
}
