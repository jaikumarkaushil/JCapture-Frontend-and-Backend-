import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Spinner() {
    return (
        <>
            <h2>Loading may take a moment as we rely on free resources. Your patience is appreciated.</h2>
            <FontAwesomeIcon
                className="fa-spin text-gray-400 text-2xl m-3"
                icon={["fas", "spinner"]}
            />
        </>
    );
}
