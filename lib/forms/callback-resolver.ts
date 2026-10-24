import { zodResolver } from "@hookform/resolvers/zod";
import { callbackSchema } from "@/lib/schemas/callback";

export default zodResolver(callbackSchema);
