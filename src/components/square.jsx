import "./board.css";

const Square = ({ color, children }) => {
    const className = `square ${color}`;

    return <div className={className}>{children}</div>;
};

export default Square;
