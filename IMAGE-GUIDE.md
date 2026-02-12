# Adding Images to Your Products

## Current Setup ✅

Your app now has a beautiful rose-themed placeholder image that will show for any product without images!

## How to Add Images in Airtable

### Option 1: Manual Upload (Recommended)

1. **Open your Airtable base**
2. **Go to the Products table**
3. **Add an "Images" field** (if it doesn't exist):
   - Click the **+** button to add a new field
   - Name: `Images`
   - Type: **Attachment**
   - Allow multiple attachments: **Yes**

4. **Add images to each product**:
   - Click on a product's Images cell
   - Drag and drop image files, or click to upload
   - You can add multiple images per product
   - The first image will be the main product image

### Option 2: Upload via URL

If you have images hosted online:

1. Click on the Images field for a product
2. Click "Add attachment" → "From URL"
3. Paste the image URL
4. Click "Add"

## Image Recommendations

### For Best Results:
- **Format**: JPG or PNG
- **Size**: 800x800px or larger (square works best)
- **File size**: Keep under 2MB for fast loading
- **Quality**: High resolution for product detail views

### Product Photography Tips:
- Use good lighting
- White or neutral background
- Show product from multiple angles
- Include close-ups of important details (for makeup: texture, color swatches)

## Where to Find Free Product Images

For testing/demo purposes:

1. **Unsplash**: https://unsplash.com/s/photos/makeup
2. **Pexels**: https://www.pexels.com/search/cosmetics/
3. **Pixabay**: https://pixabay.com/images/search/makeup/

## Image Display in Your App

- **Product Cards**: Shows the first image from the Images field
- **Product Detail Page**: Shows the first image large, with thumbnails for additional images
- **No Image**: Shows the rose-themed placeholder SVG automatically

## Example Product Image Setup

For a "Velvet Matte Lipstick - Ruby Red" product, you might add:
1. Main product shot (lipstick in tube)
2. Swatch on skin/paper
3. Close-up of the bullet/tip
4. Product in packaging

The app will display the first image as the main image, and show thumbnails for the rest on the detail page.

## Testing

After adding images:
1. Refresh your browser
2. Images should appear immediately
3. If images don't show, check:
   - Field name is exactly "Images" (case-sensitive)
   - Field type is "Attachment"
   - Images are successfully uploaded in Airtable

---

**Note**: The placeholder image (`/placeholder-product.svg`) is automatically used when a product has no images, so your store always looks professional! 🎨
