
const moduleQuills = {
    toolbar: [
        [{ 'font': [] }],
        [{ 'size': ['small', 'large', 'huge'] }],

        ['bold', 'italic', 'underline', 'strike', 'blockquote'],

        ['link', 'image', 'video'],

        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],

        [{ 'script': 'sub' }, { 'script': 'super' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],

        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        [{ 'color': [] }, { 'background': [] }],
        [{ 'align': [] }],

        ['clean']
    ],
    clipboard: {
        matchVisual: false,
    }
}
const formatQuills = [
    'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'link', 'image', 'video',
    'header', 'indent', 'script',
    'color', 'background', 'align', 'clean'
]
export {
    moduleQuills, formatQuills
}