function Loader({ screenHeight, screenWidth, height, width }) {
    return (
        <div className={` flex items-center justify-center ${screenWidth} ${screenHeight}`}>
            <div className={`border-4 border-[var(--button-color)] border-t-transparent rounded-full animate-spin ${width} ${height}`}></div>
        </div>
    );
}

export default Loader