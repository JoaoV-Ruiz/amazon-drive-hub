import sys
import subprocess
import glob

try:
    from PIL import Image, ImageChops
except ImportError:
    subprocess.check_call([sys.executable, "-m", "pip", "install", "Pillow"])
    from PIL import Image, ImageChops

def trim(im):
    # Convert to RGB to ignore alpha differences if any
    rgb_im = im.convert("RGB")
    bg = Image.new("RGB", rgb_im.size, rgb_im.getpixel((0,0)))
    diff = ImageChops.difference(rgb_im, bg)
    diff = ImageChops.add(diff, diff, 2.0, -100)
    bbox = diff.getbbox()
    if bbox:
        return im.crop(bbox)
    return im

def make_transparent(im):
    im = im.convert("RGBA")
    datas = im.getdata()
    newData = []
    for item in datas:
        # If pixel is very light gray/white, make it transparent
        if item[0] > 235 and item[1] > 235 and item[2] > 235:
            newData.append((255, 255, 255, 0))
        else:
            newData.append(item)
    im.putdata(newData)
    return im

for file in glob.glob("public/cars/*.png"):
    print(f"Processing {file}...")
    img = Image.open(file)
    # Make background transparent
    img = make_transparent(img)
    # Trim empty space
    trimmed = trim(img)
    trimmed.save(file, "PNG")

print("Done processing images!")
