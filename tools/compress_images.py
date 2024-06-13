# OpenBlender
# Open source blender projects
# GitHub: https://www.github.com/lewisevans2007/OpenBlender
# Licence: CC-0 (Public Domain)
#
# This script compresses all images with a given directory to jpg format
# PNG files can make the page take ages to the page to load. Turning them into jpg's
# made the site transfer only 2MB of data instead of 40MB making the site way faster

import os
from PIL import Image

# Ask for directory
directory = input("Enter directory: ")

# Check if directory exists
if os.path.isdir(directory):
    # Get all files in directory
    files = os.listdir(directory)
    # Loop through all files
    for file in files:
        # Check if file is a thumbnail or screenshot
        if file == "thumbnail.png" or file.startswith("Screenshot"):
            # Open the image
            img = Image.open(directory + "/" + file)
            # Save the image as a jpg
            img = img.convert("RGB")
            img.save(directory + "/" + file.split(".")[0] + ".jpg", quality=60)
    print("Done")