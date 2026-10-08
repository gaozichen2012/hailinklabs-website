"""Generate deterministic task-specific PDFs and bilingual multi-record CSVs."""
import csv, hashlib, json
from pathlib import Path
from xml.sax.saxutils import escape
from reportlab import rl_config
from reportlab.lib import colors
from reportlab.lib.pagesizes import letter, A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak
rl_config.invariant = 1
ROOT=Path(__file__).resolve().parents[1]
source=ROOT/'src/data/templates.json'
items=json.loads(source.read_text())
output=ROOT/'public/downloads'
output.mkdir(parents=True,exist_ok=True)
assets=[]
heading=ParagraphStyle('heading',fontName='Helvetica-Bold',fontSize=18,leading=22,spaceAfter=10,keepWithNext=True,textColor=colors.HexColor('#174c35'))
body=ParagraphStyle('body',fontName='Helvetica',fontSize=9,leading=13,spaceAfter=10)
section_heading=ParagraphStyle('section',parent=heading,fontSize=13,leading=17,spaceAfter=8)
label=ParagraphStyle('label',parent=body,fontName='Helvetica-Bold',fontSize=9,leading=12,spaceAfter=0)
def cell(value): return Paragraph(escape(str(value)),body)
def make_pdf(item,suffix,paper,filled=False,sections=None):
    path=output/(item['slug']+suffix+'.pdf')
    sections=sections or item['sections']
    story=[Paragraph('HAILINK LABS / FREE TEMPLATE',label),Spacer(1,12),Paragraph(escape(item['title'][0]),heading),cell(item['description'][0])]
    if filled: story += [Paragraph('DEMONSTRATION DATA - NOT AN APP EXPORT',label),Spacer(1,12)]
    width=paper[0]-80
    for section in sections:
        story += [Paragraph(escape(section['title'][0]),section_heading)]
        columns=section['columns']
        rows=[[Paragraph(escape(c[0]),label) for c in columns]]
        rows += [[cell(v) for v in row] for row in section['exampleRows']] if filled else ([[cell(row[0]),''] for row in section['exampleRows']] if len(columns)==2 else [['']*len(columns) for _ in range(section['blankRows'])])
        widths=[width/len(columns)]*len(columns)
        if len(columns)==2: widths=[width*.38,width*.62]
        table=Table(rows,colWidths=widths,repeatRows=1,minRowHeights=[24]*len(rows))
        table.setStyle(TableStyle([('GRID',(0,0),(-1,-1),.4,colors.HexColor('#bccbc0')),('BACKGROUND',(0,0),(-1,0),colors.HexColor('#edf5ef')),('VALIGN',(0,0),(-1,-1),'TOP'),('LEFTPADDING',(0,0),(-1,-1),7),('RIGHTPADDING',(0,0),(-1,-1),7),('TOPPADDING',(0,0),(-1,-1),4),('BOTTOMPADDING',(0,0),(-1,-1),4)]))
        story += [table,Spacer(1,16)]
    story += [cell(item['note'][0])]
    if item['app']=='tmproof' and not filled:
        story += [PageBreak(),Paragraph('Continuation sheet',heading),cell('Ticket / project / date / page reference: ______________________________')]
        rows=[[cell(v) for v in ['Category','Item / person','Quantity / unit','Rate / currency','Notes']]]+[['']*5 for _ in range(12)]
        table=Table(rows,colWidths=[width/5]*5,rowHeights=[38]+[36]*12,repeatRows=1)
        table.setStyle(TableStyle([('GRID',(0,0),(-1,-1),.4,colors.HexColor('#bccbc0')),('VALIGN',(0,0),(-1,-1),'TOP')]))
        story += [table,Spacer(1,12),cell('Acknowledgment scope / signer / role / date / signature: __________________________')]
    def footer(canvas,doc):
        canvas.setFont('Helvetica',7)
        canvas.drawString(40,24,'hailinklabs.com/templates/'+item['slug'])
        canvas.drawRightString(paper[0]-40,24,'2026-10-08 / '+str(doc.page))
    SimpleDocTemplate(str(path),pagesize=paper,leftMargin=40,rightMargin=40,topMargin=36,bottomMargin=42,title=item['title'][0],author='Hailink Labs').build(story,onFirstPage=footer,onLaterPages=footer)
    return path
for item in items:
    generated=[make_pdf(item,'',letter),make_pdf(item,'-a4',A4),make_pdf(item,'-example',letter,True)]
    if item['app']=='gearproof': generated += [make_pdf(item,'-handoff',letter,sections=item['sections'][:2]),make_pdf(item,'-ledger',letter,sections=item['sections'][2:])]
    for lang,suffix in [(0,''),(1,'-zh')]:
        path=output/(item['slug']+suffix+'.csv')
        with path.open('w',encoding='utf-8-sig',newline='') as f:
            writer=csv.writer(f,lineterminator='\n')
            writer.writerow([field[lang] for field in item['fields']])
            writer.writerows([['']*len(item['fields']) for _ in range(20)])
        generated.append(path)
    for path in generated: assets.append({'file':'/downloads/'+path.name,'sha256':hashlib.sha256(path.read_bytes()).hexdigest(),'bytes':path.stat().st_size})
for path in sorted(output.glob('*.xlsx')): assets.append({'file':'/downloads/'+path.name,'sha256':hashlib.sha256(path.read_bytes()).hexdigest(),'bytes':path.stat().st_size})
(ROOT/'src/data/template-assets.json').write_text(json.dumps({'sourceSha256':hashlib.sha256(source.read_bytes()).hexdigest(),'assets':assets},indent=2)+'\n')
print(f'Generated {len(assets)} static resources.')
