import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {
    addHabit,
    selectHabitList,
} from './habitListSlice';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { DONE, NOT_DONE, NONE } from '../../App';
import { getTodayDate } from '../../App';
  

export function HabitsList() {
    
  const mSelectHabitList = useSelector(selectHabitList);
    const dispatch = useDispatch();
    const [habitListTable, setHabitListTable] = useState([]);
    const [habitTitleToAdd, setHabitTitleToAdd] = useState("");

    // setting up the habit list table view
    useEffect(() => {
      const habitListLi = mSelectHabitList.map((data) =>
        <tr key={data.id}>
          <td>{data.title}</td>
          <td>{data.started_date}</td>
          <td><Button variant='success'><Link style={{color:'white'}} class="link" to={"details/"+data.id}>Details</Link></Button></td>
        </tr>
        
      );
      setHabitListTable(habitListLi);
    }, [mSelectHabitList]);

    //function handling the add habit submit
    const handleSubmit = (e) => {
      e.preventDefault();
      
      let objToAdd = {title: habitTitleToAdd, 
        id: Math.floor((Math.random() * 10000) + 100), 
        status: NONE, 
        started_date: getTodayDate(),
        statusDaysGiven:[]
      };
      dispatch(addHabit(objToAdd))
      setHabitTitleToAdd("");
    }

    // function handling the title change from the add habit form
    const handleChange = (e) => {
      setHabitTitleToAdd(e.target.value);
    }
  
    return (
      <div>
        {/* table to show habit list with their title, started date and link to their details page */}
          <Table bordered hover responsive>
            <thead>
              <tr>
                <th>Habit list</th>
                <th>Started date</th>
                <th>Details page</th>
              </tr>
            </thead>
            <tbody>
              {habitListTable}
            </tbody>
          </Table>
          {/* Form to add */}
          <Form id='habit-add-form' onSubmit={handleSubmit}>
            <FloatingLabel
              controlId="floatingInput"
              label="Enter habit title"
              className="mb-3">
              {/* add habit title */}
              <Form.Control
                value={habitTitleToAdd} 
                onChange={handleChange}
                placeholder="Enter habit title"
              />
            </FloatingLabel>
            <Form.Group className="mb-3">
              <Button variant="primary" type="submit">Add</Button>
            </Form.Group>
            
        </Form>
      </div>
    );
  }

  