
const Total = (props) => {

    return (
        <div>
            <p>
                <b>total of {
                    props.parts.reduce((acc, part) => (
                        acc + part['exercises']
                    ), 0)} exercises</b>
            </p>
        </div>
    );
}

export default Total;