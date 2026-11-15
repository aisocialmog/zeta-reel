"""Contact sheet with Instagram Reels safe-zone guides: side crop on tall phones (x<97, x>983), header (y<150),
right button column (x>930, y 1000-1720), caption/username zone (y>1560). Red = outside the safe area."""
import sys, glob
from PIL import Image, ImageDraw
src, out, cols = sys.argv[1], sys.argv[2], int(sys.argv[3]) if len(sys.argv) > 3 else 10
fs = sorted(glob.glob(src + '/*.jpg'), key=lambda f: float(f.split('/t')[-1][:-4]))
tw, th = 216, 384; rows = (len(fs) + cols - 1) // cols; sheet = Image.new('RGB', (cols * tw, rows * (th + 18)), 'white'); d0 = ImageDraw.Draw(sheet)
for i, f in enumerate(fs):
    im = Image.open(f).convert('RGB'); ov = Image.new('RGBA', im.size, (0, 0, 0, 0)); d = ImageDraw.Draw(ov)
    for box in [(0, 0, 97, 1920), (983, 0, 1080, 1920), (0, 0, 1080, 150), (930, 1000, 1080, 1720), (0, 1560, 1080, 1920)]: d.rectangle(box, fill=(255, 0, 0, 70))
    im = Image.alpha_composite(im.convert('RGBA'), ov).convert('RGB').resize((tw, th))
    x, y = (i % cols) * tw, (i // cols) * (th + 18); sheet.paste(im, (x, y + 18)); d0.text((x + 4, y + 2), f.split('/t')[-1][:-4], fill='black')
sheet.save(out); print(out, len(fs))
