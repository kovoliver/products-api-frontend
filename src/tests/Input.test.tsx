import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Input from "../components/ui/Input";

describe("Input komponens", () => {
    test("Input is rendered with the proper type", () => {
        render(<Input type="text" placeholder="-" />);

        const inputElement = screen.getByRole("textbox");

        expect(inputElement).toBeInTheDocument();
        expect(inputElement).toHaveAttribute("type", "text");
    });

    test("Input is rendered with the proper placeholder", ()=> {
        render(<Input type="text" placeholder="hello multiverse" />);
        const inputElement = screen.getByRole("textbox");

        expect(inputElement).toHaveAttribute("placeholder", "hello multiverse");
    });

    test("Input is rendered with the proper name attribute", ()=> {
        render(<Input type="text" name="brand" placeholder="hello multiverse" />);
        const inputElement = screen.getByRole("textbox");

        expect(inputElement).toHaveAttribute("name", "brand");
    });

    test("Input is rendered with the proper value attribute", ()=> {
        render(<Input type="text" value="brand" placeholder="hello multiverse" />);
        const inputElement = screen.getByRole("textbox");

        expect(inputElement).toHaveAttribute("value", "brand");
    });

    test("Input is rendered with the proper id attribute", ()=> {
        render(<Input type="text" id="brand" placeholder="hello multiverse" />);
        const inputElement = screen.getByRole("textbox");

        expect(inputElement).toHaveAttribute("id", "brand");
    });

    test("OnChange function is attached to the input element", async () => {
        const mockChange = vi.fn();

        render(<Input type="text" onChange={mockChange} placeholder="hello multiverse" />);
        const inputElement = screen.getByRole("textbox");

        await userEvent.type(inputElement, "teszt");

        expect(mockChange).toHaveBeenCalledTimes(5);
    });

    test("renders a textarea tag when type is 'textarea'", () => {
        render(<Input type="textarea" placeholder="Write a lot..." />);
        
        const element = screen.getByPlaceholderText("Write a lot...");
        
        expect(element.tagName).toBe("TEXTAREA");
    });

    test("renders an input tag when type is 'text'", () => {
        render(<Input type="text" placeholder="Simple text..." />);
        
        const element = screen.getByPlaceholderText("Simple text...");
        
        expect(element.tagName).toBe("INPUT");
    });
});