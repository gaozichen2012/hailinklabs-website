"""Regenerate static English PDFs and bilingual CSVs from public template data.
Requires reportlab only for authoring; production/build/CI serve checked-in files.
Use deterministic metadata, Letter paper and ample blank writing space.
"""
import csv
import hashlib
import json
from pathlib import Path
from xml.sax.saxutils import escape
from reportlab import rl_config
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
rl_config.invariant = 1
ROOT = Path(__file__).resolve().parents[1]
source = ROOT / 'src/data/templates.json'
items = json.loads(source.read_text())
output = ROOT / 'public/downloads'
output.mkdir(parents=True, exist_ok=True)
assets = []
for item in items:
    slug = item['slug']
    pdf = output / (slug + '.pdf')
    heading = ParagraphStyle('heading', fontName='Helvetica-Bold', fontSize=20, leading=24, textColor=colors.HexColor('#17191b'), spaceAfter=16)
    body = ParagraphStyle('body', fontName='Helvetica', fontSize=10, leading=15, alignment=TA_LEFT, spaceAfter=12)
    label = ParagraphStyle('label', parent=body, fontName='Helvetica-Bold', fontSize=9, leading=13, spaceAfter=0)
    story = [Paragraph('HAILINK LABS / FREE RECORD SHEET', label), Spacer(1, 14), Paragraph(escape(item['title'][0]), heading), Paragraph(escape(item['description'][0]), body)]
    rows = [[Paragraph('Field', label), Paragraph('Your record', label)]]
    rows += [[Paragraph(escape(field[0]), label), ''] for field in item['fields']]
    table = Table(rows, colWidths=[190, 326], rowHeights=[26] + [34]*len(item['fields']))
    table.setStyle(TableStyle([('GRID',(0,0),(-1,-1),0.5,colors.HexColor('#b8bdb8')),('BACKGROUND',(0,0),(-1,0),colors.HexColor('#f0f5f1')),('VALIGN',(0,0),(-1,-1),'MIDDLE'),('LEFTPADDING',(0,0),(-1,-1),10),('RIGHTPADDING',(0,0),(-1,-1),10)]))
    story += [table, Spacer(1, 18), Paragraph(escape(item['note'][0]), body), Paragraph('Use a new sheet for each record. For itemized work or additional entries, attach another clearly identified sheet.', body)]
    def footer(canvas, doc):
        canvas.setFont('Helvetica', 8)
        canvas.setFillColor(colors.HexColor('#626269'))
        canvas.drawString(48, 28, 'hailinklabs.com/templates/' + slug)
        canvas.drawRightString(564, 28, 'Updated ' + item['updatedAt'] + ' / ' + str(doc.page))
    SimpleDocTemplate(str(pdf), pagesize=letter, rightMargin=48,leftMargin=48,topMargin=40,bottomMargin=48,title=item['title'][0],author='Hailink Labs').build(story,onFirstPage=footer,onLaterPages=footer)
    for lang, suffix in [(0,''),(1,'-zh')]:
        path = output / (slug+suffix+'.csv')
        with path.open('w', encoding='utf-8-sig', newline='') as f:
            writer=csv.writer(f, lineterminator='\n')
            writer.writerow([field[lang] for field in item['fields']])
            writer.writerows([['']*len(item['fields']) for _ in range(10)])
    for path in [pdf, output/(slug+'.csv'), output/(slug+'-zh.csv')]:
        assets.append({'file':'/downloads/'+path.name,'sha256':hashlib.sha256(path.read_bytes()).hexdigest(),'bytes':path.stat().st_size})
manifest={'sourceSha256':hashlib.sha256(source.read_bytes()).hexdigest(),'assets':assets}
(ROOT/'src/data/template-assets.json').write_text(json.dumps(manifest,indent=2)+'\n')
print(f'Generated {len(items)} PDFs and {len(items)*2} CSVs.')
