import Graph from "@/components/atoms/Graph";

export default function Kewl() {
  return (
    <main className="min-h-screen bg-black text-slate-100 p-8">
      <section className="max-w-5xl mx-auto space-y-6">
        <h1 className="text-4xl font-bold">
          My Hobbies, Visualized
        </h1>

        <p className="text-slate-400 max-w-2xl">
          Here's a cool way I found to show all my various interests in a fun manner.
          The graph is made using the 'd3' package. Nodes can be dragged and you can hover over them to see a tooltip.
        </p>

        <Graph />
      </section>
    </main>
  );
}
