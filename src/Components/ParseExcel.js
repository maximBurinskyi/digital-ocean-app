import React, { useState } from 'react';
import { read, utils, writeFileXLSX } from "xlsx";
import { Col, Label, Row, Table } from "react-bootstrap";


const ParseExcel = () => {

    const [fileName, setFileName] = useState(null);
    const [allFile, setAllFile] = useState(null);
    const [other, setOther] = useState(null);

    const [sheetData, setSheetData] = useState([]);
    const [sheet, setSheet] = useState(null);

    const [columns, setColumns] = useState([]);
    const [body, setBody] = useState([]);

    const handleFile = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setFileName(file.name);
        setAllFile(file);
        console.log(file);

        const data = await file.arrayBuffer();
        console.log(data);
        const workbook = read(data);
        setOther(workbook.Sheet);
        console.log(workbook.Sheet);

        const worksheet = workbook.Sheets[workbook.SheetNames[0]]
        console.log(worksheet);
        const jsonData = utils.sheet_to_json(worksheet, {
          blankrows: "",
          header: 1
        })

        setSheet(Object.keys(e)[0]);
        // e.stopPropagation(); e.preventDefault();
        // const f = e.dataTransfer.files[0];
        // /* f is a File */
        // const data = await f.arrayBuffer();
        // /* data is an ArrayBuffer */
        // const workbook = utils.sheet_to_json(data);
        setSheetData(jsonData);

        setColumns(jsonData[0]);
        setBody(jsonData.shift());
        
        console.log(jsonData);
    }
  return (
    <div>
      <h1>Parse Excel</h1>
      {!fileName && <div>Пожалуйста, загрузите файл.</div>}
      {fileName && (
        <p>
            File name: <span>{fileName}</span>
        </p>
      )}

      {
        other
      }
      <input type="file" onChange={(e) => handleFile(e)} />
      <Row>
        <Col md={12}>
          <Table bordered className='border'>
            <thead className='text-primary table-header'>
              <tr>

              
              {/* {sheetData[0].map(h => <td>{h}</td>)} */}
              {columns.map(c => (
            // <div key={c}>{c}</div>
            <td key={c}>{c}</td>
          ))}

              {/* {sheetData} */}

            {/* {sheet.map(h => <td>{h}</td>)} */}
            </tr>
            </thead>
            <tbody className='table-body'>
              {/* <tr> */}
              {sheetData.slice(1).map((row) => (
            // <div key={c}>{c}</div>
            <tr >
              {row.map(c => <td>{c} </td> )}
            </tr>
          ))}

              {/* </tr> */}
            </tbody>
          </Table>
          
        </Col>
      </Row>
    </div>
  )
}

export default ParseExcel
