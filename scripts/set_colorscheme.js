var colorschemeList = {
    "nino": {
        '--color-foreground-1': '#F8F8F2',
        '--color-foreground-2': '#B9BBCB',
        '--color-background-1': '#44475A',
        '--color-background-2': '#282A36',
        '--color-background-3': '#21222C',
        '--color-accent-1': '#EC6D8E',
        '--color-accent-2': '#EC6D8E33',
        '--color-shadow-1': '#21222C',
        '--color-shadow-2': '#FDC2C4',
		'--button-inactive': 'invert(25%) sepia(9%) saturate(1455%) hue-rotate(194deg) brightness(93%) contrast(82%)',
		'--button-active': 'invert(70%) sepia(15%) saturate(1400%) hue-rotate(300deg) brightness(106%) contrast(88%)',
		'image': 'static/images/nino.webp',
    },
	"raiden": {
        '--color-foreground-1': '#FDF4EE',
        '--color-foreground-2': '#9B969C',
        '--color-background-1': '#322F54',
        '--color-background-2': '#282644',
        '--color-background-3': '#23202E',
        '--color-accent-1': '#C8ACF8',
        '--color-accent-2': '#C8ACF833',
        '--color-shadow-1': '#252123',
        '--color-shadow-2': '#5756A1',
		'--button-inactive': 'invert(35%) sepia(9%) saturate(1455%) hue-rotate(194deg) brightness(93%) contrast(82%)',
		'--button-active': 'invert(68%) sepia(92%) saturate(2532%) hue-rotate(213deg) brightness(101%) contrast(103%)',
		'image': 'static/images/raiden.webp',
    },
    "acheron": {
        '--color-foreground-1': '#22242C',
        '--color-foreground-2': '#18191E',
        '--color-background-1': '#ECEDEC',
        '--color-background-2': '#C3C2C0',
        '--color-background-3': '#AFAFAE',
        '--color-accent-1': '#DB334F',
        '--color-accent-2': '#DB334F33',
        '--color-shadow-1': '#8E8A93',
        '--color-shadow-2': '#E1E1E0',
		'--button-inactive': 'invert(30%) sepia(10%) saturate(225%) hue-rotate(191deg) brightness(92%) contrast(88%)',
		'--button-active': 'invert(30%) sepia(50%) saturate(2532%) hue-rotate(320deg) brightness(101%) contrast(103%)',
		'image': 'static/images/acheron.webp',
    },
    "edge": {
        '--color-foreground-1': '#F8F8F8',
        '--color-foreground-2': '#B9B9B9',
        '--color-background-1': '#6B6B6B',
        '--color-background-2': '#3B3B3B',
        '--color-background-3': '#2B2B2B',
        '--color-accent-1': '#C9C9C9',
        '--color-accent-2': '#9B9B9B33',
        '--color-shadow-1': '#2B2B2B',
        '--color-shadow-2': '#B9B9B9',
		'--button-inactive': 'invert(44%) sepia(1%) saturate(0%) hue-rotate(105deg) brightness(93%) contrast(95%)',
		'--button-active': 'invert(83%) sepia(3%) saturate(26%) hue-rotate(41deg) brightness(104%) contrast(80%)',
		'image': 'static/images/img2.webp',
    },
    "gruvbox": {
        '--color-foreground-1': '#D4BE98',
        '--color-foreground-2': '#DDC7A1',
        '--color-background-1': '#3c3836',
        '--color-background-2': '#504945',
        '--color-background-3': '#282828',
        '--color-accent-1': '#E78A4E',
        '--color-accent-2': '#E78A4E33',
        '--color-shadow-1': '#1d2021',
        '--color-shadow-2': '#A89984',
		'--button-inactive': 'invert(7%) sepia(10%) saturate(402%) hue-rotate(156deg) brightness(94%) contrast(96%)',
		'--button-active': 'invert(60%) sepia(75%) saturate(483%) hue-rotate(332deg) brightness(95%) contrast(90%)',
    }
};

function changeColorScheme() {
    var root = document.documentElement;
    var colorscheme = document.getElementById("colorscheme-selector");
    var selectedScheme = colorschemeList[colorscheme.value];

    for (var property in selectedScheme) {
        if (property === 'image') {
            continue;
        }
        root.style.setProperty(property, selectedScheme[property]);
    }

    // Set the image
    const imageElement = document.getElementById("image-display");
    if (selectedScheme.image && imageElement) {
        imageElement.src = selectedScheme.image;
    }

    localStorage.setItem("selectedColorscheme", colorscheme.value);
}

function loadSavedColorscheme() {
    var savedColorscheme = localStorage.getItem("selectedColorscheme");
    var colorscheme = document.getElementById("colorscheme-selector");

    if (savedColorscheme) {
        colorscheme.value = savedColorscheme;
    } else {
        colorscheme.value = Object.keys(colorschemeList)[0];;
    }

    changeColorScheme();
}

document.addEventListener("DOMContentLoaded", function () {
    loadSavedColorscheme();
});