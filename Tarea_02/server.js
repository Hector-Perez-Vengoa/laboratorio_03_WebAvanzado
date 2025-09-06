// Importar el módulo http nativo de Node.js
const http = require("http");
const ExcelJS = require("exceljs");

// Definir el puerto del servidor
const PORT = 3000;

// Crear el servidor
const server = http.createServer(async (req, res) => {
    if (req.url === "/") {
        res.statusCode = 200;
        res.end("<h1>Para descargar el reporte ingresa a /reporte</h1>");
    } else if (req.url === "/reporte") {
        try {
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet("Ventas");

            worksheet.columns = [
                { header: "Producto", key: "producto", width: 20 },
                { header: "Cantidad", key: "cantidad", width: 10 },
                { header: "Precio", key: "precio", width: 10 }
            ];

            for (let i = 1; i <= 20; i++) {
                worksheet.addRow({
                    producto: `Producto ${i}`,
                    cantidad: Math.floor(Math.random() * 100) + 1,
                    precio: (Math.random() * 100).toFixed(2)
                });
            }

            res.writeHead(200, {
                "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                "Content-Disposition": "attachment; filename=reporte_ventas.xlsx"
            });

            await workbook.xlsx.write(res);
            res.end();
        } catch (error) {
            res.statusCode = 500;
            res.end("<h1>500 Error interno del servidor</h1>");
        }
    } else if (req.url === "/error") {
        res.statusCode = 500;
        res.end("<h1>500 Error interno del servidor</h1>");
    } else {
        res.statusCode = 404;
        res.end("<h1>404 Página no encontrada</h1>");
    }
    
});
// Iniciar el servidor
server.listen(PORT, () => {
console.log(`Servidor corriendo en http://localhost:${PORT}`);
});