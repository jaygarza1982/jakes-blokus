interface GridProps {
    width: number;
    height: number;
    gridSize: number;
}

const Grid: React.FC<GridProps> = ({ width, height, gridSize }) => {
    const gridLines: JSX.Element[] = [];

    for (let x = 0; x <= width; x += gridSize) {
        gridLines.push(
            <line
                key={`v-${x}`}
                x1={x}
                y1={0}
                x2={x}
                y2={height}
                stroke="#ccc"
                strokeWidth={1}
            />
        );
    }

    for (let y = 0; y <= height; y += gridSize) {
        gridLines.push(
            <line
                key={`h-${y}`}
                x1={0}
                y1={y}
                x2={width}
                y2={y}
                stroke="#ccc"
                strokeWidth={1}
            />
        );
    }

    return <g>{gridLines}</g>;
};

export default Grid;