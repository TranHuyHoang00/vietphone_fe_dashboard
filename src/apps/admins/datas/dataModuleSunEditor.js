import katex from "katex";
import "katex/dist/katex.min.css";
const moduleSunEditor = {
    height: 225,
    buttonList: [
        ["bold", "underline", "italic", "formatBlock"],
        ["fontColor", "hiliteColor"],
        ["align"],
        ["table", "link", "image"],
        ["codeView"],
    ],
    katex: katex,
    fontSize: [12, 14, 16, 18, 20],
    formats: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p'],
    colorList: [
        [
            "#828282",
            "#FF5400",
            "#676464",
            "#F1F2F4",
            "#FF9B00",
            "#F00",
            "#fa6e30",
            "#000",
            "rgba(255, 153, 0, 0.1)",
            "#FF6600",
            "#0099FF",
            "#74CC6D",
            "#FF9900",
            "#CCCCCC"
        ]
    ],
};
export {
    moduleSunEditor
}