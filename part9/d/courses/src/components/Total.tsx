import { CoursePart } from "../types";

const Total = ({ parts }: { parts: CoursePart[] }) => {
    const t = parts;
    return (
        <div>
            <h3>
                Number of exercises {t.reduce((carry, part) => carry + part.exerciseCount, 0)}
            </h3>
        </div>
    );
}

export default Total;