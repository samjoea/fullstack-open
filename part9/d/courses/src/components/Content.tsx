import { assertNever } from "../helperFunc";
import { CoursePart } from "../types";

const Content = ({ parts }: { parts: CoursePart[] }) => {
    return (
        <div>
            {
                parts.map((part, i) => {
                    switch (part.kind) { 
                        case "basic":
                            return (
                                <div key={i}>
                                    <h2>{part.name} {part.exerciseCount}</h2>
                                    <p>{part.description}</p>
                                </div>
                            )
                        case "group":
                            return (
                                <div key={i}>
                                    <h2>{part.name} {part.exerciseCount}</h2>
                                    <p>{part.description}</p>
                                    <p>project exercises {part.groupProjectCount}</p>
                                </div>
                            )
                        case "special":
                            return (
                                <div key={i}>
                                    <h2>{part.name} {part.exerciseCount}</h2>
                                    <p>{part.description}</p>
                                    <p>required skills: {part.requirements.join(", ")}</p>
                                </div>
                            )
                        case "background":
                            return (
                                <div key={i}>
                                    <h2>{part.name} {part.exerciseCount}</h2>
                                    <p>{part.description}</p>
                                    <p>submit to {part.backgroundMaterial}</p>
                                </div>
                            )
                        default: assertNever(part);
                    }
                })
            }
        </div>
    );
}

export default Content;