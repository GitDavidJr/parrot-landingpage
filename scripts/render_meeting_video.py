#!/usr/bin/env python3
import math
import os
import sys
from PIL import Image, ImageDraw, ImageFont

W, H = 1920, 1080

def get_font(size, bold=False):
    font_paths = [
        "/System/Library/Fonts/HelveticaNeue.ttc",
        "/System/Library/Fonts/SFNS.ttf",
        "/System/Library/Fonts/SFCompact.ttf",
        "/Library/Fonts/Arial.ttf"
    ]
    for p in font_paths:
        if os.path.exists(p):
            try:
                index = 1 if (bold and p.endswith(".ttc")) else 0
                return ImageFont.truetype(p, size, index=index)
            except Exception:
                try:
                    return ImageFont.truetype(p, size)
                except Exception:
                    pass
    return ImageFont.load_default()

def draw_rounded_rect(draw, bbox, radius, fill=None, outline=None, width=1):
    draw.rounded_rectangle(bbox, radius=radius, fill=fill, outline=outline, width=width)

def render_frame(t_sec, frame_idx=0):
    img = Image.new("RGB", (W, H), "#111215")
    draw = ImageDraw.Draw(img)
    
    font_title = get_font(21, bold=True)
    font_sub = get_font(15, bold=False)
    font_tag = get_font(16, bold=True)
    font_hud_title = get_font(24, bold=True)
    font_hud_badge = get_font(14, bold=True)
    font_label = get_font(13, bold=True)
    font_orig = get_font(20, bold=False)
    font_trans = get_font(23, bold=True)
    
    # 1. Google Meet Top Bar
    draw_rounded_rect(draw, (30, 16, W - 30, 68), 12, fill="#1c1e22", outline="#2b2d32", width=1)
    
    # Top Bar Left: Meet Indicator + Title
    draw.ellipse((48, 36, 60, 48), fill="#10b981")
    draw.text((72, 32), "Google Meet  •  Sync de Arquitetura Global  [San Francisco ↔ São Paulo]", fill="#f8fafc", font=font_title)
    
    # Top Bar Right: Status badges
    draw_rounded_rect(draw, (W - 470, 26, W - 270, 58), 10, fill="#25282e", outline="#353840", width=1)
    draw.text((W - 455, 33), "● 1080p HD  •  180ms Latência", fill="#10b981", font=font_sub)
    
    draw_rounded_rect(draw, (W - 255, 26, W - 140, 58), 10, fill="#25282e", outline="#353840", width=1)
    draw.text((W - 240, 33), "2 Participantes", fill="#e2e8f0", font=font_sub)
    
    time_str = "10:45 AM"
    draw.text((W - 115, 33), time_str, fill="#94a3b8", font=font_sub)
    
    # Dialogue state determination based on t_sec
    active_speaker = None
    orig_text = ""
    trans_text = ""
    speaker_name = ""
    speaker_initials = ""
    speaker_country = ""
    avatar_bg = "#3b82f6"
    orig_lang = ""
    trans_lang = ""
    
    if 0.8 <= t_sec < 5.8:
        active_speaker = "sarah"
        speaker_name = "Sarah Jenkins"
        speaker_initials = "SJ"
        speaker_country = "EUA • INGLÊS"
        avatar_bg = "#ec4899"
        orig_lang = "INGLÊS (FALADO)"
        trans_lang = "PORTUGUÊS (TRADUÇÃO AO VIVO)"
        full_orig = "Hi David! How does Parrot translate our meeting in real time?"
        full_trans = "Oi David! Como o Parrot traduz nossa reunião em tempo real?"
        progress = min(1.0, (t_sec - 0.8) / 3.4)
        orig_text = full_orig[:int(len(full_orig) * min(1.0, progress * 1.15))]
        trans_text = full_trans[:int(len(full_trans) * max(0.0, progress))]
    elif 6.5 <= t_sec < 14.1:
        active_speaker = "david"
        speaker_name = "David Junior"
        speaker_initials = "DJ"
        speaker_country = "BRASIL • PORTUGUÊS"
        avatar_bg = "#2563eb"
        orig_lang = "PORTUGUÊS (FALADO)"
        trans_lang = "ENGLISH (LIVE TRANSLATION)"
        full_orig = "O driver CoreAudio isola o áudio em dois canais com 180ms e sem bots."
        full_trans = "The CoreAudio driver isolates audio into two clean channels with 180ms latency."
        progress = min(1.0, (t_sec - 6.5) / 5.2)
        orig_text = full_orig[:int(len(full_orig) * min(1.0, progress * 1.15))]
        trans_text = full_trans[:int(len(full_trans) * max(0.0, progress))]
    elif 14.8 <= t_sec < 20.2:
        active_speaker = "sarah"
        speaker_name = "Sarah Jenkins"
        speaker_initials = "SJ"
        speaker_country = "EUA • INGLÊS"
        avatar_bg = "#ec4899"
        orig_lang = "INGLÊS (FALADO)"
        trans_lang = "PORTUGUÊS (TRADUÇÃO AO VIVO)"
        full_orig = "Incredible! Both of us can speak naturally in our own languages."
        full_trans = "Incrível! Nós dois podemos falar naturalmente no nosso próprio idioma."
        progress = min(1.0, (t_sec - 14.8) / 3.6)
        orig_text = full_orig[:int(len(full_orig) * min(1.0, progress * 1.15))]
        trans_text = full_trans[:int(len(full_trans) * max(0.0, progress))]
    elif 20.8 <= t_sec < 26.8:
        active_speaker = "david"
        speaker_name = "David Junior"
        speaker_initials = "DJ"
        speaker_country = "BRASIL • PORTUGUÊS"
        avatar_bg = "#2563eb"
        orig_lang = "PORTUGUÊS (FALADO)"
        trans_lang = "ENGLISH (LIVE TRANSLATION)"
        full_orig = "Exatamente! 100% nativo no macOS e com total privacidade."
        full_trans = "Exactly! 100% native on macOS and with complete privacy."
        progress = min(1.0, (t_sec - 20.8) / 3.8)
        orig_text = full_orig[:int(len(full_orig) * min(1.0, progress * 1.15))]
        trans_text = full_trans[:int(len(full_trans) * max(0.0, progress))]
    else:
        orig_text = "Aguardando áudio da chamada..."
        trans_text = "Parrot conectado ao CoreAudio • Bidirecional ativo"
        speaker_name = "Sistema Parrot"
        speaker_initials = "PT"
        speaker_country = "COREAUDIO • PRONTO"
        avatar_bg = "#10b981"
        orig_lang = "STATUS"
        trans_lang = "MOTOR DE ÁUDIO"
    
    # 2. Participant Video Tiles (With smooth rounded masking!)
    tile_y1, tile_y2 = 82, 690
    tile_w = 905
    tile_h = tile_y2 - tile_y1
    
    # Mask for smooth rounded corners
    tile_mask = Image.new("L", (tile_w, tile_h), 0)
    tile_draw_mask = ImageDraw.Draw(tile_mask)
    tile_draw_mask.rounded_rectangle((0, 0, tile_w, tile_h), radius=16, fill=255)
    
    # Female Tile (Sarah)
    f_idx = (int(t_sec * 30) % 360) + 1
    f_path = f"/tmp/parrot_frames_female/{f_idx:04d}.jpg"
    if os.path.exists(f_path):
        f_im = Image.open(f_path).resize((tile_w, tile_h), Image.Resampling.LANCZOS)
        img.paste(f_im, (35, tile_y1), mask=tile_mask)
    
    sarah_active = (active_speaker == "sarah")
    if sarah_active:
        draw_rounded_rect(draw, (35, tile_y1, 35 + tile_w, tile_y2), 16, outline="#10b981", width=4)
    else:
        draw_rounded_rect(draw, (35, tile_y1, 35 + tile_w, tile_y2), 16, outline="#2c2d30", width=2)
        
    # Sarah Tag Pill
    draw_rounded_rect(draw, (55, tile_y2 - 54, 400, tile_y2 - 16), 12, fill="#0a0c10")
    draw_rounded_rect(draw, (65, tile_y2 - 47, 102, tile_y2 - 23), 6, fill="#3b82f6")
    draw.text((71, tile_y2 - 45), "EN", fill="#ffffff", font=get_font(12, bold=True))
    draw.text((114, tile_y2 - 45), "Sarah Jenkins  •  VP Product (SF)", fill="#ffffff", font=font_tag)
    
    # Male Tile (David)
    m_idx = (int(t_sec * 30) % 303) + 1
    m_path = f"/tmp/parrot_frames_male/{m_idx:04d}.jpg"
    if os.path.exists(m_path):
        m_im = Image.open(m_path).resize((tile_w, tile_h), Image.Resampling.LANCZOS)
        img.paste(m_im, (980, tile_y1), mask=tile_mask)
        
    david_active = (active_speaker == "david")
    if david_active:
        draw_rounded_rect(draw, (980, tile_y1, 980 + tile_w, tile_y2), 16, outline="#3b82f6", width=4)
    else:
        draw_rounded_rect(draw, (980, tile_y1, 980 + tile_w, tile_y2), 16, outline="#2c2d30", width=2)
        
    # David Tag Pill
    draw_rounded_rect(draw, (1000, tile_y2 - 54, 1340, tile_y2 - 16), 12, fill="#0a0c10")
    draw_rounded_rect(draw, (1010, tile_y2 - 47, 1047, tile_y2 - 23), 6, fill="#10b981")
    draw.text((1017, tile_y2 - 45), "PT", fill="#ffffff", font=get_font(12, bold=True))
    draw.text((1058, tile_y2 - 45), "David Junior  •  Tech Lead (SP)", fill="#ffffff", font=font_tag)
    
    # 3. Floating Parrot HUD Card (Mac Glassmorphism White Theme)
    hud_x1, hud_x2 = 120, W - 120
    hud_y1, hud_y2 = 712, 975
    
    # Soft drop shadow
    draw_rounded_rect(draw, (hud_x1 - 3, hud_y1 - 3, hud_x2 + 3, hud_y2 + 3), 22, fill="#050811")
    draw_rounded_rect(draw, (hud_x1, hud_y1, hud_x2, hud_y2), 20, fill="#ffffff", outline="#e2e8f0", width=2)
    
    # Parrot Card Header Bar (y = 712 to 770)
    draw_rounded_rect(draw, (hud_x1, hud_y1, hud_x2, 770), 20, fill="#f8fafc")
    draw.line((hud_x1, 770, hud_x2, 770), fill="#e2e8f0", width=1)
    
    # Parrot Logo
    icon_path = "/Users/davidjunior/dev/parrot/app/assets/icon.png"
    if os.path.exists(icon_path):
        p_icon = Image.open(icon_path).resize((42, 42), Image.Resampling.LANCZOS)
        img.paste(p_icon, (hud_x1 + 24, hud_y1 + 8), p_icon if p_icon.mode == 'RGBA' else None)
    
    draw.text((hud_x1 + 78, hud_y1 + 14), "Parrot", fill="#0f172a", font=font_hud_title)
    draw.text((hud_x1 + 162, hud_y1 + 20), "•  Tradução de Áudio Nativa em Tempo Real", fill="#64748b", font=font_sub)
    
    # Badges on HUD Header
    draw_rounded_rect(draw, (W // 2 - 140, hud_y1 + 12, W // 2 + 140, hud_y1 + 46), 10, fill="#ecfdf5", outline="#a7f3d0", width=1)
    draw.text((W // 2 - 120, hud_y1 + 19), "EN ↔ PT  •  Bidirecional Nativo", fill="#065f46", font=font_hud_badge)
    
    draw_rounded_rect(draw, (hud_x2 - 320, hud_y1 + 12, hud_x2 - 24, hud_y1 + 46), 10, fill="#eff6ff", outline="#bfdbfe", width=1)
    draw.text((hud_x2 - 305, hud_y1 + 19), "● CoreAudio Isolado  •  180ms", fill="#1d4ed8", font=font_hud_badge)
    
    # HUD Body Content
    # Left: Speaker Avatar / Info
    draw_rounded_rect(draw, (hud_x1 + 24, 785, hud_x1 + 250, 955), 14, fill="#f1f5f9")
    
    # Circular Avatar
    draw.ellipse((hud_x1 + 44, 796, hud_x1 + 104, 856), fill=avatar_bg)
    draw.text((hud_x1 + 58, 810), speaker_initials, fill="#ffffff", font=get_font(22, bold=True))
    
    draw.text((hud_x1 + 116, 804), speaker_name, fill="#0f172a", font=get_font(17, bold=True))
    draw.text((hud_x1 + 116, 830), speaker_country, fill="#64748b", font=get_font(12, bold=True))
    
    status_label = "● FALANDO AGORA" if active_speaker else "AGUARDANDO"
    status_color = "#10b981" if active_speaker == "sarah" else ("#3b82f6" if active_speaker == "david" else "#64748b")
    draw_rounded_rect(draw, (hud_x1 + 44, 895, hud_x1 + 230, 925), 6, fill=status_color)
    draw.text((hud_x1 + 60, 903), status_label, fill="#ffffff", font=get_font(12, bold=True))
    
    # Center: Transcript & Translation Blocks
    text_x = hud_x1 + 275
    draw_rounded_rect(draw, (text_x, 785, hud_x2 - 230, 860), 12, fill="#f8fafc", outline="#e2e8f0", width=1)
    draw.text((text_x + 16, 792), f"ORIGINAL  [{orig_lang}]", fill="#64748b", font=font_label)
    draw.text((text_x + 16, 816), orig_text, fill="#334155", font=font_orig)
    
    draw_rounded_rect(draw, (text_x, 872, hud_x2 - 230, 955), 12, fill="#f0fdf4", outline="#bbf7d0", width=1)
    draw.text((text_x + 16, 880), f"TRADUÇÃO AO VIVO  [{trans_lang}]", fill="#15803d", font=font_label)
    draw.text((text_x + 16, 906), trans_text, fill="#0f172a", font=font_trans)
    
    # Right: Animated Audio Waveform Spectrum
    wave_x = hud_x2 - 200
    draw_rounded_rect(draw, (wave_x, 785, hud_x2 - 24, 955), 14, fill="#f8fafc", outline="#e2e8f0", width=1)
    draw.text((wave_x + 28, 796), "AUDIO STREAM", fill="#64748b", font=get_font(12, bold=True))
    
    num_bars = 8
    bar_w = 10
    bar_gap = 6
    start_bx = wave_x + 24
    for b in range(num_bars):
        if active_speaker:
            val = math.sin(t_sec * 14 + b * 0.8) * 0.5 + 0.5
            bar_h = int(18 + val * 65)
        else:
            bar_h = 6
        bx = start_bx + b * (bar_w + bar_gap)
        by = 920 - bar_h
        b_color = "#10b981" if active_speaker == "sarah" else ("#3b82f6" if active_speaker == "david" else "#cbd5e1")
        draw_rounded_rect(draw, (bx, by, bx + bar_w, 920), 4, fill=b_color)
        
    draw.text((wave_x + 24, 932), "CoreAudio Direct", fill="#94a3b8", font=get_font(11, bold=True))
    
    # 4. Google Meet Bottom Control Bar
    bar_y = 1022
    controls = [
        ("mic", True, "#282a2d"),
        ("cam", True, "#282a2d"),
        ("cc", True, "#10b981"),
        ("react", False, "#282a2d"),
        ("share", False, "#282a2d"),
        ("leave", True, "#ea4335")
    ]
    total_ctrl_w = len(controls) * 52 + (len(controls) - 1) * 14
    start_cx = (W - total_ctrl_w) // 2
    
    for idx, (name, active, color) in enumerate(controls):
        cx = start_cx + idx * (52 + 14)
        r = 22
        draw.ellipse((cx, bar_y - r, cx + r * 2, bar_y + r), fill=color)
        if name == "leave":
            draw.text((cx + 15, bar_y - 10), "✕", fill="#ffffff", font=get_font(16, bold=True))
        elif name == "cc":
            draw.text((cx + 12, bar_y - 9), "CC", fill="#ffffff", font=get_font(14, bold=True))
        elif name == "mic":
            draw.text((cx + 14, bar_y - 9), "MIC", fill="#ffffff", font=get_font(11, bold=True))
        elif name == "cam":
            draw.text((cx + 14, bar_y - 9), "CAM", fill="#ffffff", font=get_font(11, bold=True))
        else:
            draw.text((cx + 16, bar_y - 9), "•", fill="#ffffff", font=get_font(16, bold=True))
            
    return img

if __name__ == "__main__":
    t = float(sys.argv[1]) if len(sys.argv) > 1 else 9.0
    out = sys.argv[2] if len(sys.argv) > 2 else "/tmp/preview_motion_david.png"
    im = render_frame(t)
    im.save(out)
    print(f"Saved preview frame to {out}")
