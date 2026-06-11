import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Select from "../components/ui/Select";

describe("Select component", () => {
    const stringOptions = ["Apple", "Banana", "Orange"];
    const objectOptions = [
        { id: "1", value: "Option One" },
        { id: "2", value: "Option Two" }
    ];

    test("renders correctly with a simple string array", () => {
        render(<Select options={stringOptions} value="Banana" />);
        
        const selectElement = screen.getByRole("combobox") as HTMLSelectElement;
        expect(selectElement).toBeInTheDocument();
        expect(selectElement.value).toBe("Banana");

        const options = screen.getAllByRole("option");
        expect(options).toHaveLength(3);
        expect(options[0]).toHaveTextContent("Apple");
        expect(options[0]).toHaveAttribute("value", "Apple");
    });

    test("renders correctly with an object array containing id and value keys", () => {
        render(<Select options={objectOptions} value="2" />);
        
        const selectElement = screen.getByRole("combobox") as HTMLSelectElement;
        expect(selectElement).toBeInTheDocument();
        expect(selectElement.value).toBe("2");

        const options = screen.getAllByRole("option");
        expect(options).toHaveLength(2);
        expect(options[0]).toHaveTextContent("Option One");
        expect(options[0]).toHaveAttribute("value", "1");
    });

    test("triggers onChange function when a new option is selected", async () => {
        const mockChange = vi.fn();
        render(<Select options={stringOptions} onChange={mockChange} value="Apple" />);
        
        const selectElement = screen.getByRole("combobox");
        
        await userEvent.selectOptions(selectElement, "Orange");
        
        expect(mockChange).toHaveBeenCalledTimes(1);
    });

    test("applies HTML attributes correctly", () => {
        render(<Select options={stringOptions} name="fruits" id="fruit-select" />);
        
        const selectElement = screen.getByRole("combobox");
        
        expect(selectElement).toHaveAttribute("name", "fruits");
        expect(selectElement).toHaveAttribute("id", "fruit-select");
    });
});