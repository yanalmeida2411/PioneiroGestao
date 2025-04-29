import BuyComponent from "@/components/BuyComponent/BuyComponent";
import Register from "@/components/Register/Register";
import SellComponent from "@/components/SellComponent/SellComponent";
import '@/app/global.css'

export default function Home() {
  return (
    <div className="all-content-body">
      <Register />
      <BuyComponent />
      <SellComponent />
    </div>
  );
}
