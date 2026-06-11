import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { TagProps } from "../../core/interfaces";
import Box from "./Box";

export default function Tag({variant, value, removeTag, index}:TagProps) {
    return(
        <Box variant={variant} padding="sm" customClasses={["mr-1 mb-1 flex items-center justify-between text-xs"]}>
            <span className="mr-0.5">{value}</span>

            <FontAwesomeIcon onClick={()=>removeTag(index)} icon="circle-xmark" className="cursor-pointer"/>
        </Box>
    );
}