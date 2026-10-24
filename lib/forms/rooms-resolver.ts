import { zodResolver } from "@hookform/resolvers/zod";
import { roomInquirySchema } from "@/lib/schemas/rooms";

export default zodResolver(roomInquirySchema);
