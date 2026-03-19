export default function Blogs() {
    const images = [
  "/subtract.png",
  "/subtract.png",
  "/subtract.png",
  "/subtract.png",
  "/subtract.png",
  "/subtract.png",
];
  return (
    <div className="section">
      <h2 className="text-3xl mb-6">Our Latest Blogs</h2>

      <div className="grid grid-cols-4 gap-4">
        {[1,2,3,4].map(i => (
          <div key={i}>
            <img src={images[i-1]} />
            <h4>Defining Modern Luxury Living</h4>
            <p className="text-sm">Read Now</p>
          </div>
        ))}
      </div>
    </div>
  );
}