#!/bin/bash

# Script to compress images in the images/ folder
# Reduces quality to 75% and resizes if larger than 1200px

echo "Compressing images..."

magick mogrify -quality 75 -resize '1200x1200>' images/*.jpg images/*.jpeg images/*.png

echo "Compression completed."

# Check sizes
echo "New sizes:"
ls -lh images/ | grep -E '\.(jpg|jpeg|png)$'
