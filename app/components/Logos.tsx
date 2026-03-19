import Image from "next/image";
import vector from "../../public/Vector.png";

export default function Logos() {
  return (
    <div className="section flex justify-around opacity-50">
      <Image src={vector} alt="vec"/>
      <Image src={vector} alt="vec"/>
      <Image src={vector} alt="vec"/>
      <Image src={vector} alt="vec"/>
      
    </div>
  );
}