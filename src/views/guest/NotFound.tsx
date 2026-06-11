import { Link } from 'react-router-dom';
import { BoxSecondary } from '../../components/ui/Boxes';

function NotFound() {
    return (
        <BoxSecondary customClasses={["max-w-4xl", "mx-auto", "p-2", "text-center"]}>
            <h1 className="text-danger text-2xl">404 - Az oldal nem található</h1>
            <p className="text-warning">Sajnáljuk, a keresett oldal nem létezik.</p>
            <Link className="text-primary" to="/">Vissza a főoldalra</Link>
        </BoxSecondary>
    );
}

export default NotFound;