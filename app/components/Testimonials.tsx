export default function Testimonials() {
  return (
    <div className="section">
      <h2 className="text-3xl mb-6">Stories from Our Clients</h2>

      <div className="flex gap-6">
        {[1,2,3,4].map(i => (
          <div key={i} className="bg-gray-900 p-6 rounded-xl">
            <h3>Alexa Washington</h3>
            <p className="text-sm">
              Their understanding of real estate business needs...
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}