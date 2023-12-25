import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  Row,
  Container,
  Col,
  Form,
  InputGroup,
} from "react-bootstrap";

const Problem2 = () => {
  const [showModal, setShowModal] = useState(false);
  const [contact, setContact] = useState(null);
  const [evencontact, setEvencontact] = useState("");
  const [search, setSearch] = useState("");
  const [title, setTitle] = useState();
  const [pageSize, setPageSize] = useState(8);
  const [even, setEven] = useState(false);

  const baseURL =
    "https://contact.mediusware.com/api/contacts/?page=1&page_size=";
  const baseURL2 =
    "https://contact.mediusware.com/api/country-contacts/United%20States/?page=1&page_size=";

  const callAxios = async (val) => {
    if (val === "all") {
      axios
        .get(`${baseURL}${pageSize}`)
        .then((response) => {
          const getContact = response.data.results;
          setContact(getContact);
        })
        .catch((er) => console.log(er));
    } else if (val === "usa") {
      axios.get(`${baseURL2}${pageSize}`).then((response) => {
        const getContact = response.data.results;
        setContact(getContact);
      });
    }
  };

  const handleEven = () => {
    if (even) {
      setEvencontact(false);
    } else {
      setEvencontact(true);
    }
  };

  const handleCheck = () => {
    setEven(!even);
    handleEven();
  };

  const handleModal = (val) => {
    setShowModal(!showModal);

    if (val === "all") {
      setTitle("All Contacts");
      callAxios("all");
    } else if (val === "us") {
      callAxios("usa");
    }
  };

  const handleAll = (e) => {
    setTitle("All Contacts");
    callAxios("all");
  };

  const handleUs = (e) => {
    setTitle("Contacts from US");
    callAxios("usa");
  };

  useEffect(() => {
    setTitle("All Contacts");
    callAxios("all");
  }, []);

  if (!contact) return null;

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-2</h4>

        <div className="d-flex justify-content-center gap-3">
          <button
            className="btn btn-lg btn-outline-primary"
            type="button"
            onClick={() => handleModal("all")}
          >
            All Contacts
          </button>
          <button
            className="btn btn-lg btn-outline-secondary"
            type="button"
            onClick={() => handleModal("us")}
          >
            US Contacts
          </button>
        </div>
      </div>

      <Modal show={showModal} onHide={handleModal}>
        <Modal.Header>
          <Modal.Title>
            <strong>{title}</strong>
          </Modal.Title>
          <Button variant="outline-danger" size="sm" onClick={handleModal}>
            Close
          </Button>
        </Modal.Header>
        <Modal.Body className="justify-content-end">
          <InputGroup size="sm" className="d-flex my-2">
            <Form.Control
              placeholder="Search..."
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button variant="outline-secondary" id="button-addon2">
              Search
            </Button>
          </InputGroup>
          <div>
            {even ? (
              <div>
                {contact
                  .filter((item) => {
                    if (item.id % 2 === 0) {
                      return (evencontact === true) &
                        (search.toLowerCase() === "")
                        ? item
                        : item.country.name.toLowerCase().includes(search) ||
                            item.phone.toLowerCase().includes(search);
                    }
                  })
                  .map((item) => {
                    const { id, phone, country } = item;
                    return (
                      <>
                        <Container>
                          <Row className="d-flex justify-content-center gap-2">
                            <Col className="d-flex justify-content-center">
                              <InputGroup.Text className="d-flex justify-content-center">
                                Contact ID
                                <br />
                                {id}
                              </InputGroup.Text>
                            </Col>
                            <Col xs={8}>
                              <div key={id}>
                                <p>
                                  <strong>Telephone : </strong>
                                  {phone}
                                </p>
                                <p>
                                  <strong>Country : </strong>
                                  {country.name}
                                </p>
                              </div>
                            </Col>
                          </Row>
                          <hr />
                        </Container>
                      </>
                    );
                  })}
              </div>
            ) : (
              <div>
                {contact
                  .filter((item) => {
                    return search.toLowerCase() === ""
                      ? item
                      : item.country.name.toLowerCase().includes(search) ||
                          item.phone.toLowerCase().includes(search);
                  })
                  .map((item) => {
                    const { id, phone, country } = item;
                    return (
                      <>
                        <Container>
                          <Row className="d-flex justify-content-center gap-2">
                            <Col className="d-flex justify-content-center">
                              <InputGroup.Text className="d-flex justify-content-center">
                                Contact ID
                                <br />
                                {id}
                              </InputGroup.Text>
                            </Col>
                            <Col xs={8}>
                              <div key={id}>
                                <p>
                                  <strong>Telephone : </strong>
                                  {phone}
                                </p>
                                <p>
                                  <strong>Country : </strong>
                                  {country.name}
                                </p>
                              </div>
                            </Col>
                          </Row>
                          <hr />
                        </Container>
                      </>
                    );
                  })}
              </div>
            )}
          </div>
          {/* <Button
            variant="outline-primary"
            size="sm"
            onChange={() => {
              setPageSize(pageSize + 1);
              callAxios("all");
              callAxios("usa");
            }}
          >
            Load...
          </Button> */}
        </Modal.Body>
        <Modal.Footer>
          <Container>
            <Row>
              <Col>
                <Form.Check
                  label="Only even"
                  name="group1"
                  checked={even}
                  onChange={handleCheck}
                />
              </Col>
              <Col className="d-flex justify-content-end gap-2">
                <Button variant="outline-primary" size="sm" onClick={handleAll}>
                  All Contacts
                </Button>
                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={handleUs}
                >
                  US Contacts
                </Button>
              </Col>
            </Row>
          </Container>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Problem2;
