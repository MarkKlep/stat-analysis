import { useState, useEffect, useContext } from "react";
import { FileDataContext } from "../providers/FileProvider";
import "../styles/ValidationTable.scss"

function VariationTable() {
  const [variationList, setVariationList] = useState([]);

  const { fileData } = useContext(FileDataContext);

  useEffect(() => {
    fileData.sort((a, b) => a - b);

    const frequencyMap = {};

    fileData.forEach((value) => {
      if (frequencyMap[value]) {
        frequencyMap[value]++;
      } 
      else {
        frequencyMap[value] = 1;
      }
    });
    
    const variants = [...new Set(fileData)];
    const N = fileData.length;

    const ecdf = function(value) {
      return fileData.filter((item) => item <= value).length / N;
    }

    setVariationList( 
      variants.map(value => (
        {
          value,
          frequency: frequencyMap[value], 
          relativeFrequency: parseFloat((frequencyMap[value]) / N).toFixed(4),
          ECDF: parseFloat(ecdf(value)).toFixed(4)
        }
      ))
    );
  }, [fileData]);

  return (
    <div style={{maxHeight: '800px', overflow: 'scroll'}}>

      <table>
        <thead>
          <tr>
            <td colSpan='5'>Варіаційний ряд</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Номер варіанти</td>
            <td>Варіанта</td>
            <td>Частота</td>
            <td>Відносна частота</td>
            <td>Значення емпіричної ф-ї розподілу</td>
          </tr>
        </tbody>
        <tfoot>
          {
            variationList.map((variant, index) => 
              <tr key={index}>
                <td>&#8470; {index + 1}</td>
                <td>{variant.value}</td>
                <td>{variant.frequency}</td>
                <td>{variant.relativeFrequency}</td>
                <td>{variant.ECDF}</td>
              </tr>
            )
          }
        </tfoot>
      </table>
    </div>
  );
}

export default VariationTable;
