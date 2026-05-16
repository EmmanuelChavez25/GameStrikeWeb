const fs = require('fs');

async function procesarHTML() {
    try {
        console.log("Leyendo archivo 'index_viejo.html'...");
        
        // Lee tu archivo index_viejo.html donde tenés pegados los miles de juegos
        const html = fs.readFileSync('index_viejo.html', 'utf8');
        
        const juegos = [];
        
        // Rastrilla de forma masiva los nombres, las imágenes de archive y las URLs
        const regex = /<img[^>]*src="([^"]+)"[^>]*alt="([^"]+)"[\s\S]*?onclick="iniciarJuego\('([^']+)'\)"/g;
        let match;
        
        while ((match = regex.exec(html)) !== null) {
            let urlOriginal = `https://archive.org/embed/${match[3].replace(/\s+/g, '')}`;
            
            juegos.push({
                nombre: match[2].trim(),
                url: urlOriginal,
                imagen: match[1].trim(),
                consola: "Retro"
            });
        }
        
        // Guarda el archivo JSON final limpio de etiquetas HTML estáticas
        fs.writeFileSync('all_roms.json', JSON.stringify(juegos, null, 2), 'utf8');
        console.log(`\n¡GOLAZO! Se encontraron y convirtieron ${juegos.length} juegos con éxito a all_roms.json.\n`);

    } catch (err) {
        console.log("\n[!] Error: Asegurate de que tu archivo con los miles de juegos esté renombrado exactamente como 'index_viejo.html' y ubicado en la misma carpeta que este script.\n");
        console.error(err.message);
    }
}

procesarHTML();