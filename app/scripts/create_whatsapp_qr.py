from pathlib import Path

from PIL import Image, ImageDraw, ImageFont
from reportlab.graphics.barcode.qr import QrCodeWidget


URL = "https://wa.me/442046155575"
OUT = Path("public/assets/digioverse-whatsapp-qr.png")


def centered_text(draw, canvas_width, text, y, font, fill):
    bbox = draw.textbbox((0, 0), text, font=font)
    draw.text(((canvas_width - (bbox[2] - bbox[0])) / 2, y), text, font=font, fill=fill)


def main():
    qr = QrCodeWidget(URL, barLevel="H")
    qr.qr.make()

    module_count = qr.qr.getModuleCount()
    quiet_zone = 4
    module_size = 20
    qr_size = (module_count + quiet_zone * 2) * module_size

    dark = "#0d0520"
    accent = "#6a00ff"

    qr_img = Image.new("RGB", (qr_size, qr_size), "white")
    qr_draw = ImageDraw.Draw(qr_img)

    for row in range(module_count):
        for col in range(module_count):
            if qr.qr.isDark(row, col):
                x = (col + quiet_zone) * module_size
                y = (row + quiet_zone) * module_size
                qr_draw.rectangle((x, y, x + module_size - 1, y + module_size - 1), fill=dark)

    canvas = Image.new("RGB", (1200, 1320), "white")
    draw = ImageDraw.Draw(canvas)
    draw.rounded_rectangle((40, 40, 1160, 1280), radius=56, outline=accent, width=18)
    draw.rounded_rectangle((76, 76, 1124, 1244), radius=42, outline="#ddd0f4", width=4)

    resized = qr_img.resize((940, 940), Image.Resampling.NEAREST)
    canvas.paste(resized, ((1200 - 940) // 2, 118))

    try:
        font_big = ImageFont.truetype("arialbd.ttf", 54)
        font_small = ImageFont.truetype("arial.ttf", 34)
    except OSError:
        font_big = ImageFont.load_default()
        font_small = ImageFont.load_default()

    centered_text(draw, 1200, "Scan to WhatsApp Digioverse", 1088, font_big, dark)
    centered_text(draw, 1200, "+44 20 4615 5575", 1155, font_small, accent)
    centered_text(draw, 1200, URL, 1205, font_small, "#53445f")

    OUT.parent.mkdir(parents=True, exist_ok=True)
    canvas.save(OUT, quality=100)
    print(OUT.resolve())


if __name__ == "__main__":
    main()
