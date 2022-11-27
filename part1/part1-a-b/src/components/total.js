
const Total = (props) => {
    const t = props.parts;
    return (
        <div>
            <div>
                <p>Number of exercises {t[0]['exercises'] + t[1]['exercises'] + t[2]['exercises']} </p>
            </div>
        </div>
    );
}

export default Total;