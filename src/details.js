import {
    addHabit,
    selectHabitList,
    useHabitListDetails,
    editHabitStatusAccordingToDate
  } from '../src/features/habits_list/habitListSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getDates } from './App';
import  Button  from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { DONE, NOT_DONE, NONE } from './App';

export default function Details(){
    const dispatch = useDispatch();
    const [tableHeaderList, setTableHeaderList] = useState([]);
    const [tableBodyList, setTableBodyList] = useState([]);
    const [multiple, setMultiple] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [updateObj, setUpdateObj] = useState({});
    let { id } = useParams();
    const mSelectHabitList = useSelector(selectHabitList);
    const mSelectHabitListDetails = useHabitListDetails(id);

    //function for updating status state
    const setUpdateStatusFunc = (event) => {
      setUpdateObj(prevState => {
        return { ...prevState, status: event.target.value }
      });
    }

    // function to populate the table header and table body list data
    useEffect(() => {
        const daysArray = getDates(multiple);
        const daysTableHeader = daysArray.map((data) =>
            <td key={data}>{data}</td>
        );
        const daysTableBody = daysArray.map((date) =>{
            const getStatus = mSelectHabitListDetails.statusDaysGiven.filter(i => i.date == date);
            let statusBtn = "";
            if(getStatus.length == 0){
                statusBtn = <Button variant="danger" onClick={updateStatusModal} value={JSON.stringify({status:NONE, habitId:mSelectHabitListDetails.id, dateValue:date})}>None</Button>;
            }
            else{
                if(getStatus[0].status == DONE){
                    statusBtn = <Button variant="success" onClick={updateStatusModal} value={JSON.stringify({status:DONE, habitId:mSelectHabitListDetails.id, dateValue:date})}>Done</Button>;
                }
                else if(getStatus[0].status == NOT_DONE){
                    statusBtn = <Button variant="warning" onClick={updateStatusModal} value={JSON.stringify({status:NOT_DONE, habitId:mSelectHabitListDetails.id, dateValue:date})}>Not done</Button>;
                }
                else{
                    statusBtn = <Button variant="danger" onClick={updateStatusModal} value={JSON.stringify({status:NONE, habitId:mSelectHabitListDetails.id, dateValue:date})}>None</Button>;
                }
            }
            return <td key={date}>{statusBtn}</td>
        });
        setTableHeaderList(daysTableHeader);
        setTableBodyList(daysTableBody);
    },[multiple, mSelectHabitListDetails]);

    // function to open the select status modal
    const updateStatusModal = (e) => {
        let dataJsonToUpdate = JSON.parse(e.target.value);
        setUpdateObj(dataJsonToUpdate);
        setShowModal(true);
               
    }

    // function to handle habit status update
    const handleUpdate = () => {
      setShowModal(false);
      
      console.log(updateObj);
       dispatch(editHabitStatusAccordingToDate(updateObj));
       setUpdateObj({});
    }
    
    return (
        <div>
          {/* Modal for updating habit status */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Update habit status</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {/* Update form */}
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Update status</Form.Label>
                    {/* update status form */}
                    <Form.Select value={updateObj.status} onChange={setUpdateStatusFunc}>
                      <option value={DONE}>Done</option>
                      <option value={NOT_DONE}>Not done</option>
                      <option value={NONE}>None</option>
                    </Form.Select>
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                {/* close and save update modal form buttons */}
                <Button variant="danger" onClick={() => setShowModal(false)}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleUpdate}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
            {/* table to show date wise status of a specific habit */}
          <Table bordered hover responsive>
            <thead>
              <tr><td colSpan={7}>Habit title: {mSelectHabitListDetails.title}</td></tr>
              <tr>
                {tableHeaderList}
              </tr>
            </thead>
            <tbody>
            <tr>
                {tableBodyList}
              </tr>
            </tbody>
          </Table>
          {/* prev and next btns to alternate between dates */}
          <div className='prev-next-div'>
            <Button variant='primary' style={{color:'white'}} onClick={() => setMultiple((prevState) => prevState+1)}>Previous</Button>
            <Button variant='primary' style={{color:'white'}} onClick={() => setMultiple((prevState) => prevState-1)}>Next</Button>
          </div>
          
        </div>
    );
}