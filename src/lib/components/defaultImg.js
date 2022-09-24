const DefaultImg = (name) => {
    const bgColors = [
        "#1f53d7",
        "#FFE040",
        "#DC143C",
        "#8B008B",
        "#2F4F4F",
        "#696969",
        "#800000"
    ];
    let randomBg = bgColors[Math.floor(Math.random() * 1)];
    let text = String(name?.name)?.slice(0, 2)
    return(
        <>
            <div 
                style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                objectFit: "cover",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#FFFFFF",
                backgroundColor: randomBg}}
            >
                {text}
            </div>
        </>
    );
};

export default DefaultImg;