import { Container, Row, Col } from 'react-bootstrap';

const FormContainer = ({ children }) => {
  return (
    <Container style={{marginTop:'30px'}}>
      <Row >
        <Col xs={12} md={12} >
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default FormContainer;
