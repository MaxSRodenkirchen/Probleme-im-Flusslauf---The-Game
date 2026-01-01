// Zeichnet ein Koordinatensystem mit Raster
export function drawGrid(p, gridSize = 50) {
    p.push(); // Speichere aktuellen Zeichenzustand

    // Raster-Linien (grau, dünn)
    p.stroke(200);
    p.strokeWeight(1);

    // Vertikale Linien (von 0 nach links und rechts)
    for (let x = 0; x <= p.width; x += gridSize) {
        p.line(x, -p.height, x, p.height);   // Rechts von 0
        if (x !== 0) {
            p.line(-x, -p.height, -x, p.height); // Links von 0
        }
    }

    // Horizontale Linien (von 0 nach oben und unten)
    for (let y = 0; y <= p.height; y += gridSize) {
        p.line(-p.width, y, p.width, y);     // Unten von 0
        if (y !== 0) {
            p.line(-p.width, -y, p.width, -y); // Oben von 0
        }
    }

    // Koordinatenachsen (rot/grün, dicker)
    p.strokeWeight(2);

    // X-Achse (rot)
    p.stroke(255, 0, 0);
    p.line(-p.width, 0, p.width, 0);

    // Y-Achse (grün)
    p.stroke(0, 255, 0);
    p.line(0, -p.height, 0, p.height);

    // Ursprung markieren (blauer Kreis)
    p.fill(0, 0, 255);
    p.noStroke();
    p.circle(0, 0, 10);

    // Beschriftungen
    p.fill(0);
    p.textAlign(p.LEFT, p.TOP);
    p.textSize(12);
    p.text('(0, 0)', 5, 5);

    p.pop(); // Stelle vorherigen Zeichenzustand wieder her
}
