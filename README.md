# Day Dream v2

A creative image mosaic generator that creates stunning photo composites by analyzing colors and combining images intelligently.

## Overview

Day Dream v2 is a web-based application that transforms a main image into a mosaic by replacing segments of the image with the most color-matched sub-images. It's a visual art tool that creates beautiful compositions by analyzing and matching colors.

## How It Works

### Step 1: Input Collection
- **Canvas Image**: Upload a main/background image that will serve as the base for your mosaic
- **Sub-Images**: Upload multiple images that will be used as "tiles" in the final mosaic composition

### Step 2: Color Analysis of Sub-Images
For each uploaded sub-image, the application:
1. Calculates the **average/dominant color** by analyzing all pixels in the image
2. Converts the RGB color to a single luminance value for easier color matching
3. Stores this color information for later matching

### Step 3: Grid Division
The canvas image is divided into a uniform grid of blocks (default block size: 10 units):
- Each block represents a section of the canvas image
- The entire 500×500px canvas is divided into 50×50 blocks

### Step 4: Color Extraction from Canvas
For each grid block in the canvas image:
1. Extracts the pixel data from that block
2. Calculates the **average/dominant color** of that block
3. Converts the RGB values to luminance for comparison

### Step 5: Color Matching & Replacement
For each canvas block:
1. Compares its dominant color against all sub-image colors
2. Finds the sub-image with the **closest color match** (smallest difference in luminance)
3. Replaces the block with the matched sub-image, scaled to fit the block size

### Step 6: Output
The final result is a mosaic where:
- Each block of the original canvas image is replaced with a piece of a color-matched sub-image
- The overall composition maintains the colors and patterns of the original canvas image
- The result can be downloaded as a PNG image

## Features

- **Interactive UI**: Clean and intuitive interface for uploading images
- **Real-time Preview**: See thumbnail previews of your selected images
- **Color Visualization**: Visual indicators showing the dominant color of each sub-image
- **High-Quality Output**: Generates 5000×5000px output canvas for detailed results
- **Responsive Design**: Works on desktop and mobile devices
- **Easy Download**: Download your finished mosaic in one click

## Technical Details

### Color Matching Algorithm
The application uses a **luminance-based color matching system**:
- Converts RGB colors to perceived brightness using: `L = 0.2126×R + 0.7152×G + 0.0722×B`
- Finds the sub-image with the closest luminance value to each canvas block
- Uses absolute difference as the distance metric

### Image Processing
- Canvas image size: 500×500 pixels
- Output canvas size: 5000×5000 pixels
- Block scaling: Each block is scaled 10x in the output
- Supported formats: PNG, JPG, GIF, WebP (any format your browser supports)

## File Structure

```
daydreamv2/
├── index.html          # Main HTML structure
├── style.css           # Styling and layout
├── main.js             # Core application logic
├── README.md           # This file
└── assets/
    └── gallery.png     # Placeholder icon
```

## Usage

### Basic Steps

1. **Upload Canvas Image**
   - Click "Choose a canvas image"
   - Select your main image (ideally 500×500px or will be scaled)

2. **Upload Sub-Images**
   - Click "Choose multiple images to combine"
   - Select multiple images with different prominent colors
   - Recommended: Use 3-10 images for best results

3. **View Color Information**
   - Small color boxes appear under each sub-image
   - These show the dominant color detected in each image

4. **Render**
   - Click the "Render" button
   - Wait for the processing to complete
   - View the generated mosaic in real-time

5. **Download**
   - Click on the final mosaic image to download

### Tips for Best Results

- **Variety in Colors**: Use sub-images with distinctly different dominant colors
- **Image Quality**: Use clear, well-lit images for better color detection
- **Number of Images**: 5-10 sub-images usually produce good results
- **Canvas Image**: Use images with good color variation (landscapes work well)
- **Block Size**: Adjust block size for more or less detail (not currently exposed in UI)

## Technologies Used

- **Frontend Framework**: Bootstrap 5.1.3
- **JavaScript Library**: jQuery 3.6.0
- **Canvas API**: For image processing and rendering
- **HTML5**: File input API for image upload

## Browser Compatibility

- Chrome/Chromium (recommended)
- Firefox
- Safari
- Edge
- Any modern browser with HTML5 Canvas support

## Performance Notes

- Processing time depends on the number of blocks and sub-images
- Large images may take longer to process
- Output is rendered on a 5000×5000px canvas
- Downloaded image is a PNG file

## Code Organization

### main.js Functions

- **Image Input**: `readURL()`, `readMultipleFiles()`
- **Color Analysis**: `getAverageRGB()`, `calculateSubColor()`, `getColorVal()`
- **Processing**: `extractRGB()`, `outputImage()`, `processImage()`
- **UI Management**: `createImageBox()`, `triggerFileInput()`, `renderPreview()`

### style.css

- Bootstrap utility classes for responsive layout
- Custom styling for image boxes and buttons
- Responsive design for mobile devices
- Smooth transitions and hover effects

## Known Limitations

- Canvas processing is single-threaded (may block UI for large images)
- Color matching is based on luminance only (could be enhanced with RGB distance)
- Block size is fixed in code (not user-configurable via UI)
- Cross-origin images may have security restrictions

## Future Enhancement Ideas

- Configurable block size slider
- Multiple color matching algorithms (RGB Euclidean distance, LAB, etc.)
- Real-time preview of mosaic
- Web Worker for non-blocking processing
- Save/load configurations
- History of generated mosaics
- Different artistic styles and filters

## Author

Created by Shijin Raj

## License

Open source - Feel free to use and modify

---

**Enjoy creating beautiful mosaics with Day Dream v2!** ✨
