<!-- TOC start (generated with https://github.com/derlin/bitdowntoc) -->

- [GridMethod: Reference Construction Lines](#gridmethod-reference-line-drawer)
    * [Key Features](#key-features)
    * [How to Use](#how-to-use)
    * [Changelog](#changelog)
    * [Sample Images](#sample-images)
        + [Output Formatting](#output-formatting)
            - [Portrait Preview](#portrait-preview)
            - [Landscape Preview](#landscape-preview)
        + [Grid Overlays](#grid-overlays)
            - [Grid 4x4](#grid-4x4)
            - [Grid 8x8](#grid-8x8)
            - [Grid 16x16](#grid-16x16)
            - [Grid 32x32](#grid-32x32)
        + [Diamond Overlays](#diamond-overlays)
            - [Basic Diamond](#basic-diamond)
            - [Diamond 4](#diamond-4)
            - [Diamond 8](#diamond-8)
            - [Diamond 16](#diamond-16)
        + [Custom Grid](#custom-grid)
            - [1cm apart](#1cm-apart)
            - [2cm apart](#2cm-apart)
            - [3cm apart](#3cm-apart)

<!-- TOC end -->

<!-- TOC --><a name="gridmethod-reference-construction-lines"></a>

# GridMethod: Reference Construction Lines

A powerful browser-based tool for artists to overlay reference lines and prepare images for printing.

This webpage allows you to upload a picture, preview it in standard paper formats (like A4, A3, etc.), add various grid and line overlays, and download a **high-resolution, print-ready** copy for use as a drawing or painting reference.

<!-- TOC --><a name="key-features"></a>

## Key Features

* **Print Format Previews:** Choose from standard paper sizes (A5, A4, A3, A2, A1) to see how your image will fit.
* **Orientation Control:** Select Portrait or Landscape orientation. The tool intelligently suggests a default based on your image's shape.
* **High-Resolution Export:** Downloads a **300 DPI** PNG file, perfect for high-quality printing.
* **Multiple Line Overlays:** Add simple grids, diagonals, and complex diamond patterns.
* **Custom CM Grid:** Create a grid with line spacing defined in centimeters, based on the image's physical dimensions.
* **Dynamic Filenames:** Downloaded files are automatically named with their format and settings (e.g., `image-A4-portrait-2cm_grid.png`).

<!-- TOC --><a name="how-to-use"></a>

## How to Use

1. **Select a file:** Upload your source image.
2. **Choose an Output Format:**
    * Use the dropdown menu to select a paper size (e.g., A4). The preview will show how your image fits in that aspect ratio.
    * If the format is not "Original", orientation controls (Portrait/Landscape) will appear, allowing you to choose how the image is framed.
3. **Add Reference Lines:**
    * Click the image buttons to add pre-defined grids or diamond patterns.
    * To add a custom grid, enter a value in centimeters into the "Grid spacing (cm)" field and click "Apply Grid".
4. **Download Your Image:**
    * Click the "Download Image" button.
    * The tool will generate a high-resolution 300 DPI file in the background and start the download. If the process is slow, the button will display "Generating..." to provide feedback.

<!-- TOC --><a name="changelog"></a>

## Changelog

**v 0.5**

- **Output Formatting:** Added ability to select A-series paper sizes and orientation.
- **High-Resolution Export:** Download now generates a 300 DPI print-quality PNG.
- **State Management:** Users can now stack multiple line commands (e.g., a grid and a diamond).
- **Dynamic Filenames:** Files are downloaded with descriptive names.
- **UI Overhaul:** Added format selection, orientation controls, and a "Generating..." download indicator.

**v 0.4b**

- retrieval of the image physical dimensions by calculating the conversion pixels to cms
- Added the option to create a regular grid with each line separated by user-input cms
- Fixes and Improvements

<!-- TOC --><a name="sample-images"></a>

## Sample Images

<!-- TOC --><a name="output-formatting"></a>

### Output Formatting

This feature allows you to see how an image fits within a standard paper size before printing.

<!-- TOC --><a name="portrait-preview"></a>

#### Portrait Preview

A square image previewed in an A4 Portrait format.

<img src="https://github.com/FranGarc/GridMethod/blob/main/screenshots/small-image-to-A4-portrait.png?raw=true" alt="A4 Portrait Preview" width="400">

<!-- TOC --><a name="landscape-preview"></a>

#### Landscape Preview

A square image previewed in an A4 Landscape format.

<img src="https://github.com/FranGarc/GridMethod/blob/main/screenshots/small-image-to-A4-landscape.png?raw=true" alt="A4 Landscape Preview" width="400">

<!-- TOC --><a name="grid-overlays"></a>

### Grid Overlays

<!-- TOC --><a name="grid-4x4"></a>

#### Grid 4x4

![4x4 Grid](https://github.com/FranGarc/GridMethod/blob/main/screenshots/lucifer-grid4.png?raw=true)


<!-- TOC --><a name="grid-8x8"></a>

#### Grid 8x8

![8x8 Grid](https://github.com/FranGarc/GridMethod/blob/main/screenshots/lucifer-grid8.png?raw=true)


<!-- TOC --><a name="grid-16x16"></a>

#### Grid 16x16

![16x16 Grid](https://github.com/FranGarc/GridMethod/blob/main/screenshots/lucifer-grid16.png?raw=true)


<!-- TOC --><a name="grid-32x32"></a>

#### Grid 32x32

![32x32 Grid](https://github.com/FranGarc/GridMethod/blob/main/screenshots/lucifer-grid32.png?raw=true)


<!-- TOC --><a name="diamond-overlays"></a>

### Diamond Overlays

<!-- TOC --><a name="basic-diamond"></a>

#### Basic Diamond

![Diamond](https://github.com/FranGarc/GridMethod/blob/main/screenshots/lucifer-diamond.png?raw=true)


<!-- TOC --><a name="diamond-4"></a>

#### Diamond 4

![Diamond](https://github.com/FranGarc/GridMethod/blob/main/screenshots/lucifer-diamond4.png?raw=true)


<!-- TOC --><a name="diamond-8"></a>

#### Diamond 8

![Diamond](https://github.com/FranGarc/GridMethod/blob/main/screenshots/lucifer-diamond8.png?raw=true)


<!-- TOC --><a name="diamond-16"></a>

#### Diamond 16

![Diamond](https://github.com/FranGarc/GridMethod/blob/main/screenshots/lucifer-diamond16.png?raw=true)


<!-- TOC --><a name="custom-grid"></a>

### Custom Grid

<!-- TOC --><a name="1cm-apart"></a>

#### 1cm apart

![1cm](https://github.com/FranGarc/GridMethod/blob/main/screenshots/lucifer-1cm.png?raw=true)


<!-- TOC --><a name="2cm-apart"></a>

#### 2cm apart

![2cm](https://github.com/FranGarc/GridMethod/blob/main/screenshots/lucifer-2cm.png?raw=true)


<!-- TOC --><a name="3cm-apart"></a>

#### 3cm apart

![3cm](https://github.com/FranGarc/GridMethod/blob/main/screenshots/lucifer-3cm.png?raw=true)
