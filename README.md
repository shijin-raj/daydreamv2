# Day Dream v2

A creative image mosaic generator that creates stunning photo composites by analyzing colors and combining images intelligently.

## Overview

Day Dream v2 is a web-based application that transforms a main image into a mosaic by replacing segments of the image with the most color-matched sub-images. It's a visual art tool that creates beautiful compositions by analyzing and matching colors.

## 🚀 Try the Demo

**Live Demo**: https://shijin-raj.github.io/daydreamv2/

Click the link above to try Day Dream v2 right now - no installation needed!

## How It Works

Day Dream v2 creates a beautiful mosaic by:

1. **Analyzing Your Canvas Image** - Divides your main image into a grid of blocks
2. **Analyzing Your Sub-Images** - Extracts the dominant color from each image you upload (automatically normalizes all images to 500×500px)
3. **Intelligent Matching** - Uses Euclidean distance in RGB color space to find the sub-image with the closest matching color for each block
4. **Creating the Mosaic** - Replaces each block with the color-matched sub-image to create the final artistic composition

The result is a stunning mosaic where the overall image matches your canvas, but is made up of pieces of your uploaded images!

## Features

- **Interactive UI**: Clean and intuitive interface for uploading images
- **Real-time Preview**: See thumbnail previews of your selected images
- **Color Visualization**: Visual indicators showing the dominant color of each sub-image
- **High-Quality Output**: Generates 5000×5000px output canvas for detailed results
- **Smart Image Handling**: Automatically normalizes sub-images to 500×500px (handles any image dimensions)
- **Intelligent Color Matching**: Uses RGB Euclidean distance for accurate color-to-image matching
- **Smart Button State**: Render button enables only when canvas image and sub-images are uploaded
- **Responsive Design**: Works on desktop and mobile devices
- **Easy Download**: Download your finished mosaic in one click

## Technical Details

### Image Processing Specs
- Canvas image processing resolution: 500×500 pixels
- Output mosaic resolution: 5000×5000 pixels (high quality for downloading)
- Supported formats: PNG, JPG, GIF, WebP (any format your browser supports)

## File Structure

```
daydreamv2/
├── index.html          # Main HTML structure
├── style.css           # Styling and layout
├── main.js             # Core application logic
├── README.md           # This file
└── assets/
    └── gallery.svg     # Placeholder icon
```

## Usage

### Basic Steps

1. **Upload Canvas Image**
   - Click "Select Your Canvas"
   - Choose your main image

2. **Upload Sub-Images**
   - Click "Collect Your Colors"
   - Select 3-10 images with different colors
   - Each will contribute a unique color to your mosaic

3. **Create Your Mosaic**
   - Click "✨ Create Magic ✨" button
   - Watch the mosaic generate in real-time

4. **Download**
   - Click the "⬇️ Download Full Resolution" button
   - Save your finished mosaic as a PNG

### Tips for Best Results

- **Variety in Colors**: Use sub-images with distinctly different dominant colors
- **Image Quality**: Use clear, well-lit images for better color detection
- **Number of Images**: 5-10 sub-images usually produce good results
- **Canvas Image**: Use images with good color variation (landscapes work well)
- **Image Dimensions**: Sub-images of any size work - they're automatically normalized to 500×500px
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
