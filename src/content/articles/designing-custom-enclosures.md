---
title: "Designing custom enclosures: from Fusion 360 to finished product"
description: "A practical guide to designing 3D-printed enclosures for electronics projects, from CAD to post-processing."
date: 2026-01-10
category: "3D Printing"
readTime: "6 min read"
image: "https://images.unsplash.com/photo-1611505908502-5b67e53e3a76?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
---

Every electronics project reaches the same inflection point: the breadboard prototype works, but now you need to put it in something. You could buy an off-the-shelf enclosure and spend an afternoon modifying it, or you could design exactly what you need and print it in an afternoon. I've been doing the latter for three years and I won't go back.

## Starting in Fusion 360

Fusion 360 is free for personal use and it's the right tool for enclosures. Parametric modeling means you can change a wall thickness or PCB dimensions and the entire design updates. I keep a library of parametric components — USB-C cutouts, M3 standoffs, ventilation grilles — that I drag into new designs.

The workflow I've settled on:

1. **Measure first** — caliper every component before touching CAD
2. **Model the PCB** — import the actual board or model it from measurements
3. **Design around it** — the enclosure exists to serve the electronics, not the other way around
4. **Add 0.3–0.5mm tolerance** — FDM prints aren't precise to the tenth

## Print settings that actually matter

Not all settings are equal. For enclosures, I've found:

- **Layer height**: 0.2mm for most surfaces, 0.15mm for visible faces
- **Walls**: 3 perimeters minimum for anything structural
- **Infill**: 20% gyroid for boxes, 40%+ for anything load-bearing
- **Material**: PETG for most projects — it's tougher than PLA and more heat-resistant

Temperature and print speed matter less than people think if your first layer is dialed in. Spend time on bed leveling and Z-offset before tweaking anything else.

## Post-processing for a professional finish

Raw FDM prints have layer lines. For internal components, that's fine. For anything people will see or hold:

**Sanding**: 220 → 400 → 800 grit wet sanding. It takes 30 minutes and transforms the surface.

**Priming and painting**: Automotive filler primer is better than any "3D print primer." Two thin coats, 400 grit between coats, then your topcoat.

**Heat inserts**: For any threaded connection that will be assembled and disassembled, use M3 brass heat inserts. They last forever and give your project a product-quality feel.

## The iteration advantage

The reason I design custom enclosures instead of buying them isn't that it's cheaper (it isn't, initially). It's that iteration is fast. I can design, print, test fit, and have a revised version printing in under two hours. By the third revision, the fit is perfect and the design is exactly what the project needs.

That's what 3D printing gives you: the ability to make something specific instead of something approximate.
