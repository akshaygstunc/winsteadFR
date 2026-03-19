import Image from "next/image";
import image1 from "../../public/Subtract.png";

const images = [
  image1,
  image1,
  image1,
  image1,
  image1,
  image1,
  
];
export default function Blogs() {

  return (
    <div className="section">
      <h2 className="text-3xl mb-6">Our Latest Blogs</h2>

      <div className="grid grid-cols-4 gap-4">
        {[1,2,3,4].map(i => (
          <div key={i}>
            <Image src={images[i-1]} alt="image"/>
            <h4>Defining Modern Luxury Living</h4>
            <p className="text-sm">Read Now</p>
          </div>
        ))}
      </div>
    </div>
  );
}