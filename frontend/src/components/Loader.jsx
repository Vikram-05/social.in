function Loader({ screenHeight, screenWidth, height, width ,border,borderColor}) {
    return (
        <div className={` flex items-center justify-center ${screenWidth} ${screenHeight}`}>
            <div className={`  ${border} ${borderColor} border-t-transparent rounded-full animate-spin ${width} ${height}`}></div>
        </div>
    );
}

export default Loader