import { zodResolver } from "@hookform/resolvers/zod";
import { bookingSchema } from "@/lib/schemas/booking";

export default zodResolver(bookingSchema);
