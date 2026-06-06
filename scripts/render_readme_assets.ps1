$ErrorActionPreference = "Stop"
New-Item -ItemType Directory -Force -Path "screenshots" | Out-Null
@'
from PIL import Image, ImageDraw, ImageFont
W,H=1280,720
bg=(5,8,18); panel=(13,23,39); text=(244,241,234); muted=(168,179,199); cyan=(37,215,239); green=(88,240,179); pink=(255,114,182); violet=(157,140,255)
try:
    title=ImageFont.truetype('C:/Windows/Fonts/segoeuib.ttf', 62)
    body=ImageFont.truetype('C:/Windows/Fonts/segoeui.ttf', 25)
    small=ImageFont.truetype('C:/Windows/Fonts/consolab.ttf', 18)
    serif=ImageFont.truetype('C:/Windows/Fonts/georgiab.ttf', 48)
except Exception:
    title=body=small=serif=ImageFont.load_default()
im=Image.new('RGB',(W,H),bg); d=ImageDraw.Draw(im)
d.rounded_rectangle([48,48,1232,672], radius=28, fill=panel, outline=cyan, width=2)
d.text((96,106),'PROPTECH VALUATION DRIFT MONITOR',font=small,fill=green)
d.text((96,178),'Valuation gaps become visible',font=serif,fill=text)
d.text((96,238),'before investor confidence moves.',font=serif,fill=text)
d.text((96,332),'Comps freshness, rent-roll variance, cap-rate movement,',font=body,fill=muted)
d.text((96,372),'and listing mismatches resolve into one repricing posture.',font=body,fill=muted)
for i,(label,val) in enumerate([('PORTFOLIO GAP','$10.3M'),('AVERAGE DRIFT','76.8'),('REPRICE ASSETS','2'),('TOP ASSET','urban mixed')]):
    x=96+i*272
    d.rounded_rectangle([x,490,x+240,604],radius=18,fill=(16,28,48),outline=(40,48,66),width=1)
    d.text((x+20,528),label,font=small,fill=muted)
    d.text((x+20,562),val,font=title if i < 3 else small,fill=text)
im.save('screenshots/01-overview-proof.png')

def card(draw, xy, size, outline, label, heading, lines, metric):
    x,y=xy; w,h=size
    draw.rounded_rectangle([x,y,x+w,y+h], radius=22, fill=panel, outline=outline, width=2)
    draw.text((x+28,y+34), label, font=small, fill=cyan)
    yy=y+82
    for line in heading:
        draw.text((x+28, yy), line, font=body, fill=text)
        yy += 34
    yy += 18
    for line in lines:
        draw.text((x+28, yy), line, font=body, fill=muted)
        yy += 31
    draw.text((x+28, y+h-86), metric, font=title, fill=text)
im=Image.new('RGB',(W,H),bg); d=ImageDraw.Draw(im)
d.text((64,70),'Asset drift lanes',font=serif,fill=text)
card(d,(64,150),(360,430),pink,'REPRICE',['urban mixed-use','12'],['Retail concessions','and stale comps are','now board-visible.'],'100.0')
card(d,(464,150),(360,430),violet,'REPRICE',['multifamily','sunbelt 8'],['Lease-up pace and','cap-rate sensitivity','need one story.'],'89.9')
card(d,(864,150),(360,430),green,'WATCH',['industrial flex','west'],['Evidence is usable','with owner-visible','listing follow-up.'],'40.6')
im.save('screenshots/02-drift-proof.png')
'@ | python -
