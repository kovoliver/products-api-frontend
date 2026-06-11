import type { TagInputProps } from "../../core/interfaces";
import Box from "./Box";
import Tag from "./Tag";

export default function TagInput({ boxVariant = "white", tagVariant = "main", tags, addTag, removeTag, placeholder }: TagInputProps) {
    const createTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === "Backspace" 
            && e.currentTarget.value === "" 
            && tags.length !== 0
        ) {
            removeTag(tags.length - 1);
            return;
        }

        if (e.key !== "Enter") return;

        e.preventDefault();

        const tag = e.currentTarget.value.trim();

        e.currentTarget.value = "";

        if (tag.length === 0 || tags.includes(tag)) return;

        addTag(tag);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.value.endsWith(",")) return;

        const tag = e.currentTarget.value.trim().replaceAll(",", "");

        e.currentTarget.value = "";

        if (tag.length === 0 || tags.includes(tag)) return;

        addTag(tag);
    }

    const handleInput = (e: React.InputEvent<HTMLInputElement>) => {
        const nativeEvent = e.nativeEvent as InputEvent;

        if (e.currentTarget.value === ""
            && tags.length !== 0 &&
            nativeEvent.inputType === "deleteContentBackward") {
            removeTag(tags.length - 1);
        }
    };

    return (
        <Box variant={boxVariant} padding="sm" customClasses={['flex flex-wrap']}>
            <div className="flex flex-wrap">
                {
                    tags.map((t, i) =>
                        <Tag key={t}
                            removeTag={removeTag}
                            variant={tagVariant}
                            value={t}
                            index={i}
                        />
                    )
                }

                <input type="text" placeholder={placeholder} onChange={handleChange} onInput={handleInput}
                className="bg-white outline-none rounded-sm p-1 max-w-25 text-xs" onKeyDown={createTag} />
            </div>
            
        </Box>
    );
};