
const Content = (props) => {
    return (
        <div>
            <div>
                {props.parts.map(part => (
                    <Part key={part.id} part={part['name']} exercises={part['exercises']} />
                ))}
                
            </div>
        </div>
    );
}

const Part = (props) => {

    return (
        <div>
            <div>
                <p>
                    {props.part} {props.exercises}
                </p>
            </div>
        </div>
    );
}

export default Content;