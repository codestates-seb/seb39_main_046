const calcRem = (size) => `${size / 16}rem`;

const fontSizes = {
    xxs: calcRem(10),
    xs: calcRem(12),
    small: calcRem(14),
    base: calcRem(16),
    lg: calcRem(18),
    xl: calcRem(20),
    xxl: calcRem(22),
    xxxl: calcRem(24),
    titleSize: calcRem(36),
};

const paddings = {
    small: calcRem(8),
    base: calcRem(10),
    lg: calcRem(12),
    xl: calcRem(14),
    xxl: calcRem(16),
    xxxl: calcRem(18),
};

const margins = {
    small: calcRem(8),
    base: calcRem(10),
    lg: calcRem(12),
    xl: calcRem(14),
    xxl: calcRem(16),
    xxxl: calcRem(18),
};

const interval = {
    base: calcRem(50),
    lg: calcRem(100),
    xl: calcRem(150),
    xxl: calcRem(200),
};

const verticalInterval = {
    base: `${calcRem(10)} 0 ${calcRem(10)} 0`,
};

const deviceSizes = {
    mobile: "450px",
    tablet: "768px",
    laptop: "1024px",
    laptopL: "1280px",
};

const colors = {
    White: "hsl(0, 0%, 100%)",
    Gray_010: "#F2F2F2",
    Gray_020: "#C6C6C6",
    Gray_030: "#AEAEB2",
    Gray_040: "#8E8E93",
    Gray_050: "#636366",
    Gray_060: "#48484A",
    Gray_070: "#363639",
    Gray_080: "#2C2C2E",
    Gray_090: "#1C1C1E",
    Blue_010: "#E9F1FF",
    Blue_020: "#CADEFF",
    Blue_030: "#437BEC",
    Blue_040: "#185DE8",
    Blue_050: "#0946BF",
    Orange_030: "#FDA94F",
    Orange_040: "#F88408",
    Yellow_030: "#E9F34D",
    Yellow_040: "#C1CD0D",
    "7-ELEVEN": "#58B774;",
    CU: "#9753C9;",
    GS25: "#3691F1;",
};

const device = {
    mobile: `only screen and (max-width: ${deviceSizes.mobile})`,
    tablet: `only screen and (max-width: ${deviceSizes.tablet})`,
    laptop: `only screen and (max-width: ${deviceSizes.laptop})`,
    laptopL: `only screen and (max-width: ${deviceSizes.laptopL})`,
};
const radius = {
    small: calcRem(10),
    base: calcRem(20),
    lg: calcRem(30),
};
const theme = {
    fontSizes,
    colors,
    deviceSizes,
    device,
    paddings,
    margins,
    interval,
    verticalInterval,
    radius,
};

export default theme;
