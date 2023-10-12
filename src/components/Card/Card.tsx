import { Hotel } from "@/types/getHotelList.type";
import { motion } from "framer-motion";
interface CardProps {
  hotel: Hotel | null;
}

const Card = ({ hotel }: CardProps) => {
  return hotel ? (
    <motion.div
      className="absolute bottom-6 left-0 right-0 mx-auto my-0 w-80"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
    >
      <div className="flex gap-2 p-2 rounded-lg shadow-xl bg-zinc-800 text-white">
        <div className="grow">
          <h1 className="font-bold">{hotel.name}</h1>
        </div>
      </div>
    </motion.div>
  ) : null;
};
export default Card;
