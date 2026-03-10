import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Pizza } from "../types/Pizza";
import apiClient, { BACKEND_URL } from "../api/apiClient";
import { toast } from "react-toastify";
import { Button, Card, Col, Container, Row } from "react-bootstrap";

const AllPizza = () => {
  const navigate = useNavigate();
  const [pizzak, setPizzak] = useState<Array<Pizza>>([]);
  const [kosar, setKosar] = useState<Array<number>>(
    JSON.parse(localStorage.getItem("kosar") ?? "[]"),
  );

  useEffect(() => {
    apiClient
      .get("/pizzak")
      .then((res) => {
        setPizzak(res.data);
        toast.success("sikeres");
      })
      .catch(() => toast.error("gatya"));
  }, []);

  useEffect(() => {
    localStorage.setItem("kosar", JSON.stringify(kosar));
  }, kosar);

  const generateCard = (p: Pizza) => {
    return (
      <Col>
        <Card style={{ width: "18rem" }}>
          <Card.Img src={`${BACKEND_URL}/kepek/${p.imageUrl}`} width={200}/>   
          <Card.Body>
            <Card.Title>{p.nev}</Card.Title>
            <Card.Text>{p.leiras}</Card.Text>
          </Card.Body>
          <Card.Footer>
            <Button onClick={() => navigate(`/pizza/${p.id}`)}>
              megtekintes
            </Button>
            <Button
              onClick={() => {
                toast.success("kosarba benne");
                setKosar([...kosar, Number(p.id)]);
              }}
            >
              kosarba
            </Button>
          </Card.Footer>
        </Card>
      </Col>
    );
  };

  return (
    <Container>
      <Row>{pizzak.map((i) => generateCard(i))}</Row>
    </Container>
  );
};
export default AllPizza;
