import CVIDemo from "@/components/cvi/CVIDemo";

export default function HealthcareDemoPage() {
  return (
    <main className="section">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Healthcare AI Assistant Demo
            </h1>
            <p className="text-xl text-gray-300">
              Experience our AI video agent specialized for healthcare
            </p>
          </div>
          
          <div className="aspect-video bg-black/60 border border-white/10 rounded-xl overflow-hidden">
            <CVIDemo vertical="healthcare" autoStart />
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-gray-300 mb-4">
              This demo showcases our healthcare AI capabilities.
            </p>
            <div className="flex gap-4 justify-center">
              <a href="/pricing" className="btn btn-primary">Get Started</a>
              <a href="/demos" className="btn btn-secondary">More Demos</a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
