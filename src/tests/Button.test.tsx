import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Button from '../components/ui/Button';

describe('Button Component', () => {
    test('the button is rendered with the proper text', () => {
        render(<Button text="save" variant="primary" size="md" />);
        const buttonElement = screen.getByRole('button');
        expect(buttonElement).toBeInTheDocument();
        expect(buttonElement).toHaveTextContent('save');
    });

    test('the button calls the onClick function', async () => {
        const mockOnClick = vi.fn();

        render(<Button text="Kattints" variant="primary" size="md" onClick={mockOnClick} />);
        const buttonElement = screen.getByRole('button', { name: /kattints/i });

        await userEvent.click(buttonElement);
        expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    test("the button isn't clickable in the disabled state", async () => {
        const mockOnClick = vi.fn();

        render(<Button text="Tiltott" variant="primary" size="md" onClick={mockOnClick} disabled={true} />);
        const buttonElement = screen.getByRole('button', { name: /tiltott/i });

        expect(buttonElement).toBeDisabled();

        await userEvent.click(buttonElement);

        expect(mockOnClick).not.toHaveBeenCalled();
    });

    test('in isLoading state the button shows the spinner icon, rather than the regular one', () => {
        render(
            <Button
                text="Küldés"
                variant="primary"
                size="md"
                icon={faEnvelope}
                isLoading={true}
            />
        );

        const buttonElement = screen.getByRole('button', { name: /küldés/i });

        const spinnerIcon = buttonElement.querySelector('.fa-spinner');
        expect(spinnerIcon).toBeInTheDocument();

        const envelopeIcon = buttonElement.querySelector('.fa-envelope');
        expect(envelopeIcon).not.toBeInTheDocument();
    });

    test("if the button isn't in the isLoading state, but it has an icon prop, then it shows the icon", () => {
        render(
            <Button
                text="Levél"
                variant="primary"
                size="md"
                icon={faEnvelope}
                isLoading={false}
            />
        );

        const buttonElement = screen.getByRole('button', { name: /levél/i });
        const envelopeIcon = buttonElement.querySelector('.fa-envelope');

        expect(envelopeIcon).toBeInTheDocument();
    });
});