import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { DatePipe } from "@angular/common"; // Asegúrate de tenerlo instalado y disponible

(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

const generatePDF = (
  wines: any[],
  userName: string,
  fecha: string,
  wineName: string,
  winePredictions: any[],
  logoBase64: string
) => {
  const datePipe = new DatePipe('en-US'); // Puedes usar 'es-ES' si prefieres

  const tableBody = [
    [
      { text: "Date Created", style: "tableHeader" },
      { text: "Name", style: "tableHeader" },
      { text: "Last Quality Predicted", style: "tableHeader" },
    ],
    ...wines.map((wine) => {
      // Asegurarse de que winePredictions tiene un tipo adecuado
      const mostRecentPrediction = wine.winePredictions
        .sort((a: { dateCreated: string }, b: { dateCreated: string }) => 
          new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime())[0];
      
      // Obtener la calidad del objeto más reciente
      const quality = mostRecentPrediction ? mostRecentPrediction.quality : 'N/A';

      return [
        datePipe.transform(wine.dateCreated, 'dd/MM/yyyy') || '',
        wine.name || '',
        quality != null ? quality.toString() : 'N/A'
      ];
    }),
  ];

  const predictions = [
    [
     
      { text: "Fixed Acidity", style: "tableHeader" },
      { text: "Free sulfurDioxide", style: "tableHeader" },
      { text: "Redisual Sugar", style: "tableHeader" },
      { text: "Sulphates", style: "tableHeader" },
    
      { text: "Ph", style: "tableHeader" },
      { text: "Chlorides", style: "tableHeader" },
      { text: "Density", style: "tableHeader" },
      { text: "Alcohol", style: "tableHeader" },
      { text: "quality", style: "tableHeader" },
    ],
    ...winePredictions.map((winePrediciton) => {

      return [
       
        winePrediciton.fixedAcidity || '',
        winePrediciton.freeSulfurDioxide || '',
        winePrediciton.residualSugar || '',
        winePrediciton.sulphates || '',
       
        winePrediciton.ph || '',
        winePrediciton.chlorides || '',
        winePrediciton.density || '',
        winePrediciton.alcohol || '',
        winePrediciton.quality || '',
        
      ];
    }),
  ];

  const content: any[] = [];

  content.push({
    columns: [
      {
        image: logoBase64,
        width: 100,
        height: 100,
        alignment: 'left',
      },
      {
        stack: [
          { text: `Wine factory:  ${userName}`, style: "header" },
          { text: `Date: ${fecha}`, style: "subheader" },
        ],
        alignment: "center",
      },
    ],
  });

  content.push({ text: "\n" });



  content.push({
    table: {
      headerRows: 1,
      widths: ["*", "*", "*"],
      body: tableBody,
    },
    layout: "lightHorizontalLines",
    margin: [0, 10, 0, 10],
  });



  content.push({ text: "\n" });
  content.push({ text: "\n" });
  content.push({ text: "\n" });
  content.push({ text: "\n" });

  content.push({
    columns: [
      {
        stack: [
          { text: `Wine Name:  ${wineName}`, style: "header" },
          { text: `Wine Predictions`, style: "subheader" },
        ],
        alignment: "center",
      },
    ],
  });

  content.push({ text: "\n" });
  content.push({ text: "\n" });
  content.push({ text: "\n" });
  content.push({ text: "\n" });

  content.push({
    table: {
      headerRows: 1,
      widths: Array(9).fill("*"),
      body: predictions,
    },
    layout: "lightHorizontalLines",
    margin: [0, 10, 0, 10],
  });




  const styles = {
    header: {
      fontSize: 14,
      bold: true,
    },
    subheader: {
      fontSize: 12,
      margin: [0, 5, 0, 5],
    },
    tableHeader: {
      bold: true,
      fontSize: 12,
      color: "black",
      fillColor: "#eeeeee",
      alignment: "center",
    },
    total: {
      fontSize: 12,
      bold: true,
    },
  };

  const docDefinition: any = {
    content,
    styles,
    defaultStyle: {
      fontSize: 10,
    },
    pageOrientation: 'landscape'
  };

  pdfMake.createPdf(docDefinition).download(`Report-${wineName}-${fecha}.pdf`);
};

export default generatePDF;
