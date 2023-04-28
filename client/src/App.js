import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, ListGroup } from 'react-bootstrap';
import axios from 'axios';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const fetchTodos = async () => {
    const res = await axios.get('http://localhost:5000/todos');
    setTodos(res.data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleInputChange = (e) => {
    setNewTodo(e.target.value);
  };

  const handleAddTodo = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/todos', { title: newTodo });
    setNewTodo('');
    fetchTodos();
  };

  const handleDeleteTodo = async (id) => {
    await axios.delete(`http://localhost:5000/todos/${id}`);
    fetchTodos();
  };

  const handleCompleteTodo = async (id, completed) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !completed };
      }
      return todo;
    });
    setTodos(updatedTodos);
    await axios.patch(`http://localhost:5000/todos/${id}`, {
      completed: !completed,
    });
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1 className="my-4">Todo List</h1>
          <Form onSubmit={handleAddTodo}>
            <Form.Group controlId="formBasicEmail">
              <Row>
                <Col sm={10}>
                  <Form.Control
                    type="text"
                    placeholder="Add a new todo"
                    value={newTodo}
                    onChange={handleInputChange}
                  />
                </Col>
                <Col sm={2}>
                  <Button variant="primary" type="submit" block>
                    Add
                  </Button>
                </Col>
              </Row>
            </Form.Group>
          </Form>

          <hr />
          <ListGroup>
            {todos.map((todo, index) => (
              <ListGroup.Item
                key={todo.id}
                variant={todo.completed ? 'success' : ''}
              >
                <Row>
                  <Col xs={1}>
                    <span>{index + 1}.</span>
                  </Col>
                  <Col xs={9}>
                    <Form.Check
                      type="checkbox"
                      label={todo.title}
                      checked={todo.completed}
                      onChange={() => handleCompleteTodo(todo.id, todo.completed)}
                    />
                  </Col>
                  <Col xs={2}>
                    <Button
                      variant="danger"
                      className="float-right"
                      onClick={() => handleDeleteTodo(todo.id)}
                    >
                      Delete
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default TodoList;
