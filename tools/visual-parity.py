"""Review paired screenshots and layout observations; never silently accept a layout regression."""
import json
from pathlib import Path
from PIL import Image, ImageChops, ImageStat
root = Path('evidence/parity')
rows = json.loads((root/'browser.json').read_text())
for row in rows:
    a, b = row['golden'], row['migration']
    row['geometryDifferences'] = [{'golden':x,'nift':y} for x,y in zip(a['elements'],b['elements']) if x != y]
    row['elementCountMatches'] = len(a['elements']) == len(b['elements'])
    row['viewportMatches'] = a['viewport'] == b['viewport']
    p = root/'screenshots'/f"{row['page']}-golden-{row['width']}.jpg"
    q = root/'screenshots'/f"{row['page']}-nift-{row['width']}.jpg"
    im, jm = Image.open(p).convert('RGB'), Image.open(q).convert('RGB')
    row['imageDimensionsMatch'] = im.size == jm.size
    if im.size == jm.size:
        delta = ImageChops.difference(im,jm)
        row['pixels'] = {'meanChannelDifference':sum(ImageStat.Stat(delta).mean)/3,'fractionOver16':sum(max(x)>16 for x in delta.get_flattened_data())/(im.width*im.height)}
        if row['pixels']['meanChannelDifference'] > 1: delta.save(root/'screenshots'/f"{row['page']}-diff-{row['width']}.png")
    row['classification'] = 'exact measured geometry/typography' if row['viewportMatches'] and row['elementCountMatches'] and not row['geometryDifferences'] else 'requires review'
    print(row['page'],row['width'],len(row['geometryDifferences']),row.get('pixels'))
(root/'visual.json').write_text(json.dumps(rows,indent=2)+'\n')
