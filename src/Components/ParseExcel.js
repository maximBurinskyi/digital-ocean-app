import React, { useState, useRef } from 'react';
import { read, utils, writeFileXLSX } from "xlsx";
import { Col, Label, Row, Table } from "react-bootstrap";
import CloseButton from 'react-bootstrap/CloseButton';



const ParseExcel = () => {

    const acceptableFileName = ["xlsx", "xls"];

    const [file, setFile] = useState(null)
    const [fileName, setFileName] = useState(null);
    const fileRef = useRef();
    const [allFile, setAllFile] = useState(null);
    const [other, setOther] = useState(null);

    const [sheetData, setSheetData] = useState([]);
    const [sheetData2, setSheetData2] = useState([]);

    const [sheet, setSheet] = useState(null);

    const [columns, setColumns] = useState([]);
    const [body, setBody] = useState([]);


    const checkFileName = (name) => {
      return acceptableFileName.includes(name.split(".")[1]);
    }

    
    const handleFile = async (e) => {
        const myFile = e.target.files[0];
        if (!myFile) return;

        if (!checkFileName(myFile.name)) {
          alert("Invalid File Type");
          return; 
        }

        setFile(myFile);

        setFileName(myFile.name);
        setAllFile(myFile);
        console.log(myFile);

        const data = await myFile.arrayBuffer();
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

        const jsonData2 = utils.sheet_to_json(worksheet)

        setSheet(Object.keys(e)[0]);
        // e.stopPropagation(); e.preventDefault();
        // const f = e.dataTransfer.files[0];
        // /* f is a File */
        // const data = await f.arrayBuffer();
        // /* data is an ArrayBuffer */
        // const workbook = utils.sheet_to_json(data);
        setSheetData(jsonData);
        setSheetData2(jsonData2);


        setColumns(jsonData[0]);
        setBody(jsonData.shift());
        
        console.log(jsonData);
        console.log(jsonData2);
    }

    const handleRemove = () => {
      setFile(null);
      setFileName(null);
      fileRef.current.value = "";
      setSheetData([])
      setColumns([])
    }
    const handleChange = (e) => {
      const { name, checked } = e.target
      alert('hello selected')
      console.log(name)
      if (name === 'allselect') {
        const checkedValue = sheetData2.map((row) => {
          return {...row, reject: true}
        })
        console.log(checkedValue)
        setSheetData2(checkedValue)
      } else {
        console.log(name)
        const checkedValue = sheetData2.map( (row) => 
        row.??????????Rhino
        === name? {...row, reject: checked}: row)
        console.log(checkedValue)
        setSheetData2(checkedValue)
      }
      

    }
  return (
    <div>
      <h1>Parse Excel</h1>
      {!fileName && <div className='filename'>????????????????????, ?????????????????? ????????.</div>}
      {fileName && (
        <p>
            File name: <span className='filename'>{fileName}</span>
        </p>
      )}

      {
        other
      }
      <input className='filename' 
      ref={fileRef}
      type="file"  accept='xlsx, xls' 
      multiple={false} 
      onChange={(e) => handleFile(e)} />
      { fileName && 
      <i
      className='now-ui-icon ui-1_simple-remove align-middle'
      onClick={handleRemove}
      >
        <div className="bg-gray  p-3">
      <CloseButton variant="black" />
      {/* <CloseButton variant="white" disabled /> */}
    </div>
      </i>
      
      }

      <Row>
        <Col md={12}>
          <Table bordered className='border'>
            <thead className='text-primary table-header'>
              <tr>
                <th>
                  <input type="checkbox" name='allselect' checked={ !sheetData2.some( (row) => row.reject !== true)} onChange={handleChange}  />
                </th>
                <th>????????</th>
                <th>????????????????????????</th>
                <th>??????????Rhino</th>
                <th>???????????????????????? ??????????</th>
                <th>???????? ???? ????????????</th>
                <th>???????? ????????????????</th>
                <th>???????? ?? ????????????????????????</th>
                <th>???????? ????????????</th>





              
              {/* {sheetData[0].map(h => <td>{h}</td>)} */}

               {/* comented to check */}

              {/* {columns.map(c => (
            // <div key={c}>{c}</div>
            <td key={c}>{c}</td>
          ))} */}

              {/* {sheetData} */}

            {/* {sheet.map(h => <td>{h}</td>)} */}
            </tr>
            </thead>

            <tbody>
              { sheetData2.map( (getusers, index)=>(         
            <tr  key={index}>
            <th> <input type="checkbox" name={ getusers.??????????Rhino
            } checked={getusers?.reject|| false } onChange={ handleChange }  /></th>
            <td>{ index+1} </td>
            <td>{ getusers.????????} </td>
            <td>{ getusers.????????????????????????} </td>
             <td>{ getusers.??????????Rhino} </td> 
             <td>{getusers.??????????????????????????????????}</td>
            <td><button className="btn btn-danger">Delete</button></td>
            </tr>
              ))
            }
   
            </tbody>



            {/* <tbody className='table-body'> */}
              {/* <tr> */}
              {/* {sheetData.slice(1).map((row) => ( */}
             {/* <div key={c}>{c}</div> */}
            {/* <tr > */}
              {/* <th> <input type='checkbox'   onChange={handleChange}/> </th> */}
              {/* {row.map(c => <td>{c} </td> )} */}
            {/* </tr> */}
          {/* ))} */}

              {/* </tr> */}
            {/* </tbody> */}


            

          </Table>
          
        </Col>
      </Row>
    </div>
  )
}

export default ParseExcel
